const User = require('../models/user');
const validator = require("email-validator");
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const randToken = require('rand-token');
const blacklist = require('express-jwt-blacklist');
blacklist.configure({
  tokenId: 'jti'
});

const jwtSecret = process.env.JWT_SECRET;

const userController = {
  /**
   * Method for retrieving information about all users
   * @param {Express.Request} req - the object representing the request
   * @param {Express.Response} res - the object representing the response
   */
  getAllUser: async (req, res) => {
    try {
      const users = await User.findAll();

      res.json(users);
    } catch (error) {
      console.trace('Erreur dans la méthode getAllUser du userController :',
        error);
      res.status(500).json(error.message);
    }
  },
  /**
   * Method for retrieving information about a user
   * @param {Express.Request} req - the object representing the request
   * @param {Express.Response} res - the object representing the response
   * @param {req.params.id} req.params.id - the number identifying a specific user
   */
  getUserbyId: async (req, res) => {
    try {
      const user = await User.findOne(req.params.id);
      res.json(user);

    } catch (error) {
      console.trace('Erreur dans la méthode getUserbyId du userController :',
        error);
      res.status(500).json(error.message);
    }
  },
  /**
   * Method for deleting user information
   * @param {Express.Request} req - the object representing the request
   * @param {Express.Response} res - the object representing the response
   * * @param {req.params.id} req.params.id - the number identifying a specific user
   */
  deleteUserById: async (req, res) => {

    try {

      const userInDb = await User.findOne(req.params.id);

      id = userInDb.id

      const user = await User.delete(id);

      res.json(user);

    } catch (error) {
      console.trace('Erreur dans la méthode DeleteUserById du userController :',
        error);
      res.status(500).json(error.message);
    }
  },
  //!------------------------GESTION DES FORMULAIRES-------------------------------------------------
 /**
 * A method that takes care of the connection of a user already registered in the DB
 *A method that checks that the user exists in the DB and compares the password with the hash in the DB via bcrypt
 *Returns a token, a true or false value for "logged" and the user's nicknamer 
 * @name handleLoginForm
 * @method handleLoginForm
 * @property {string} pseudo - the nickname that a user uses to log in, must be unique in the DB and inserted in the login form.
 * @property {string} password - the password that a user uses to log in.
 * @param {Express.Request} request - the object representing the request
 * @param {Express.Response} response - the object representing the response
 * @return {String}  - A token built via the sign method of the jsonwebtoken package
 * @return {boolean} - a connection value true or false
 */
  handleLoginForm: async (request, response) => {
    try {
      const pseudo = request.sanitize(request.body.pseudo);
      const userInDb = await User.findByPseudo(pseudo);
      console.log('user InDb => ', userInDb);
      if (typeof userInDb.id === 'undefined') {
        return response.status(404).json("Aucun utilisateur avec ce pseudo");
      }
      const {
        password
      } = request.body;
      const passwordInDb = userInDb.password;
      console.log(await bcrypt.compare(password, passwordInDb));

      if (!await bcrypt.compare(password, passwordInDb)) {
        console.log("La vérification du mot de passe a échoué !")
        return response.status(403).json({
          error: 'la vérification du mot de passe a échoué !'
        })
      }
        const jwtContent = {
          userId: userInDb.id,
          permissions: [`${userInDb.group_name}`],
          jti: userInDb.pseudo + "_" + randToken.generator({
            chars: '0-9'
          }).generate(6)
        };
        console.log("jwtContent.jti => ", jwtContent.jti);
 
        const jwtOptions = {
          algorithm: 'HS256',
          expiresIn: '3h'
        };

        response.status(200).json({
          logged: true,
          pseudo: userInDb.pseudo,
          firstname: userInDb.firstName,
          lastname: userInDb.lastName,
          email: userInDb.emailAddress,
          role: userInDb.group_name,
          id:userInDb.id,
          token: jsonwebtoken.sign(jwtContent, jwtSecret, jwtOptions),
        });
        console.log(`L'utilisateur ${userInDb.firstName} ${userInDb.lastName} a bien été authentifié. Voici son token : ${
          jsonwebtoken.sign(jwtContent, jwtSecret, jwtOptions)} `);

        request.session.user = {
          firstname: userInDb.firstName,
          lastname: userInDb.lastName,
          email: userInDb.emailAddress,
          pseudo: userInDb.pseudo,
          role: userInDb.group_name,
        };
    } catch (error) {
      console.trace('Erreur dans la méthode handleLoginForm du userController :',
        error);
      response.status(500).json(error.message);
    }

  },
  /**
   * A method that handles the registration of a user in the DB
   * A method that verifies that the user's email address does not exist in the database, verifies the validity of his email, the robustness of his password
   * Hash his password and insert all his information in the DB
   * @name handleSignupForm
   * @method handleSignupForm
   * @property {string} fisrtName - The user's firstname, which must contain at least 2 characters, without spaces.
   * @property {string} lastName - the user's lastname must contain at least 2 characters, without spaces
   * @property {string} emailAddress - the email address of a user must not already be registered in the database and must correspond to a valid format
   * @property {string} pseudo - The username a user uses to log in must not be identical to another username and must contain a minimum of 3 characters and a maximum of 40 characters, without spaces. 
   * @property {string} password - the password of a user, must have at least 8 characters, a lower case letter, an upper case letter, a number and a special character among : (@#$%^&*)
   * @property {string} passwordConfirm - must be identical to the password
   * @param {Express.Request} request - the object representing the request
   * @param {Express.Response} response - the object representing the response
   * @return {String}  - A json text informing of the entry of a new user in the DB.
   */
  handleSignupForm: async (request, response) => {
    try {
      console.log("request.body =>", request.body);
      const pseudo = request.sanitize(request.body.pseudo);
      const email = request.sanitize(request.body.emailAddress);

      console.log("request.body.emailAddress => ", email);

      if (!validator.validate(email)) {
        return response.json('Le format de l\'email est incorrect');
      }
      const userInDb = await User.findByEmail(email);

      if (userInDb.emailAddress) {
        return response.json('Cet email n\'est pas disponible');
      }

      const pseudoInDb = await User.findByPseudo(pseudo);
      if (pseudoInDb.pseudo) {

        return response.json('Ce pseudo n\'est pas disponible');
      }

      if (request.body.password !== request.body.passwordConfirm) {
        return response.json(
          'La confirmation du mot de passe est incorrecte'
        );
      }
  
      const hashedPwd = await bcrypt.hash(request.body.password, 10)
      console.log(request.body.password, 'est devenu', hashedPwd);

      const newUser = {
        pseudo: request.body.pseudo,
        emailAddress: request.body.emailAddress,
        password: hashedPwd,
        lastName: request.body.lastName,
        firstName: request.body.firstName,
      };
      console.log("newUser => ", newUser);

      const userNowInDb = new User(newUser);
      console.log("userNowInDb => ", userNowInDb);

      await userNowInDb.save();

      console.log("userNowInDb =>", userNowInDb)
      response.status(200).json({
        pseudo: userNowInDb.pseudo,
        firstName: userNowInDb.firstName,
        lastName: userNowInDb.lastName,
        message: "Votre inscription c'est bien effectuée."
      });
      console.log(`L'user ${newUser.firstName} ${newUser.lastName} est désormais enregistré dans la BDD sans que sont email soit enregistré. `);
    } catch (error) {
      console.trace(
        'Erreur dans la méthode handleSignupForm du userController :',
        error);
      response.status(500).json(error.message);
    }
  },

  /**
   * disconnection method
   * @param {string} req 
   * @param {string} res 
   */
  deconnexion: async (req, res) => {
    try {
      blacklist.revoke(req.user);
      res.status(200).json("l'utilisateur a bien été déconnecté");
    } catch (error) {
      console.trace(
        'Erreur dans la méthode deconnexion du userController :',
        error);
      response.status(500).json(error.message);
    }
  },
  /**
   * Method for updating information about a user
   * @param {Express.Request} req - the object representing the request
   * @param {Express.Response} res - the object representing the response
   * @param {req.params.id} req.params.id - the number identifying a specific user
   */
  updateUser: async (req, res) => {
    try {
      const id = req.params.id;
      const userIdinDb = await User.findOne(id);
      const pseudo = request.sanitize(request.body.pseudo);
      const emailAddress = request.sanitize(request.body.emailAddress);
      const firstName = request.sanitize(request.body.firstName);
      const lastName = request.sanitize(request.body.lastName);
      const avatar = request.sanitize(request.body.avatar);
      const {
        password,
        newPassword,
        newPasswordConfirm,
      } = req.body;
      if (!userIdinDb.id === 'undefined' && userIdinDb.emailAddress === 'undefined') {
        console.log(`Cet utilisateur n'est pas enregistré en base de données`)
        return res.status(404).json(`Cet utilisateur n'est pas enregistré en base de données`);
      }
      if (!await bcrypt.compare(password, userIdinDb.password)) {
        console.log("La vérification du mot de passe a échoué !")
        return res.status(403).json({
          error: 'L\'authentification a échoué !'
        })
      }
      if (newPassword !== newPasswordConfirm) {
        console.log("confirmation du nouveau mot de passe incorect")
        return res.json(
          'La confirmation du nouveau mot de passe est incorrecte'
        );
      }
      if (newPassword === password) {
        console.log("Le nouveau mot de passe n'a pas grand chose de nouveau..");

      }
      let updateUserInfo = {};
      updateUserInfo.id = userIdinDb.id;
      if (pseudo) {
        updateUserInfo.pseudo = pseudo;
      }
      if (firstName) {
        updateUserInfo.firstName = firstName;
      }
      if (lastName) {
        updateUserInfo.lastName = lastName;
      }
      if (avatar) {
        updateUserInfo.avatar = avatar;
      }
      if (emailAddress && validator.validate(emailAddress)) {
        updateUserInfo.emailAddress = emailAddress;
        console.log("Votre mail est modifié.");
      } else {
        console.log("Votre ancien mail est conservé.");
        updateUserInfo.emailAddress = userIdinDb.emailAddress;
      }
      if (newPassword && newPassword !== userIdinDb.password && newPassword === newPasswordConfirm) {
        console.log("le changement du mot de passe est demandé. Un nouveau mot de passe valide a été proposé")
        const hashedPwd = await bcrypt.hash(newPassword, 10);
        console.log(newPassword, 'est devenu', hashedPwd);
        updateUserInfo.password = hashedPwd;
      } else {
        console.log("l'ancien mot de passe est conservé.")
        updateUserInfo.password = userIdinDb.password;
      }
      console.log('updateUserInfo => ', updateUserInfo);
      const newUser = new User(updateUserInfo);
      await newUser.update();

     
      console.log("le newUser in DB => ", newUser);
      res.json(newUser.id, newUser.firstName, newUser.lastName, newUser.pseudo, newUser.avatar);
      console.log(`L'utilisateur avec l'id : ${newUser.id} et le pseudo ${newUser.pseudo}, a bien été modifié.`);
    } catch (error) {
      res.status(500).json(error.message);
      console.log("Erreur dans la modification d'un utilisateur : ", error);
    }
  },
}
module.exports = userController;