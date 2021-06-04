const User = require('../models/user');
const validator = require("email-validator");
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
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

      if (userInDb.verifyemail) {
        console.log("La vérification du mot de passe a réussi !")
        console.log("userInDb.id => ", userInDb.id)
        console.log("userInDb.group_name =>", userInDb.group_name);
 
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
      } else {
        console.log("Accés non autorisé : Merci de vérifier votre email en cliquant sur le lien dans l'email envoyé.");

        response.status(401).json("Accés non autorisé : Merci de vérifier votre email en cliquant sur le lien dans l'email envoyé lors de l'inscription.");
      }
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
        message: "Merci de valider votre email en cliquant sur le lien envoyé avant de vous connecter."
      });
      console.log(`L'user ${newUser.firstName} ${newUser.lastName} est désormais enregistré dans la BDD sans que sont email soit enregistré. `);
 
      const jwtOptions = {
        issuer: userNowInDb.pseudo,
        audience: 'Lesgardiensdelalégende',
        algorithm: 'HS256',
        expiresIn: '24h' 
      };
      const jwtContent = {
        userId: userNowInDb.id,
        jti: userNowInDb.id + "_" + randToken.generator({
          chars: '0-9'
        }).generate(6)

      };
      const newToken = jsonwebtoken.sign(jwtContent, jwtSecret, jwtOptions);
      async function main() {
       
        const host = request.get('host');
        const link = `http://${host}/v1/verifyEmail?userId=${userNowInDb.id}&token=${newToken}`;
        console.log("req.get =>", request.get);
        console.log("ici host vaut =>", host);
        console.log("ici link vaut => ", link);
        console.log("newToken => ", newToken);
        console.log("request.body.firstName => ", request.body.firstName);
        const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true, 
          auth: {
            user: process.env.EMAIL, 
            pass: process.env.PASSWORD_EMAIL, 
          },
        });
       
        const info = await transporter.sendMail({
          from: 'lesgardiensdelalegende@gmail.com', 
          to: `${request.body.emailAddress}`,
          subject: `Les gardiens de la légende : merci de confirmer votre email`, 
          text: `Bonjour ${request.body.firstName} ${request.body.lastName}, merci de cliquer sur le lien pour vérifier votre email auprés du club de jeu Les gardiens de la légende.`, // l'envoie du message en format "plain text" ET HTML, permet plus de souplesse pour le receveur, tout le monde n'accepte pas le format html pour des raisons de sécurité sur ces boites mails, moi le premier ! 
          html: `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css"
          integrity="sha512-NmLkDIU1C/C88wi324HBc+S2kLhi08PN5GDeUVVVC/BVt/9Izdsc9SVeVfA1UZbY3sHUlDSyRXhCzHfr6hmPPw=="
          crossorigin="anonymous" />
      <style>
      h3 {
        font-size: 1.5rem;
    }
    body {
        background-color: rgb(253, 232, 175);
    }
    .background {
        display: flex
    }
    .medieval {
        border-radius: 8px;
        max-height: 500px;
        height: 300px;
        width: 1500px;
        max-width: 100%;
    }
    .montext {
        padding: 2rem 0 0 2rem;
    }
    a { 
      padding: 1rem 0 0 0;
    }
      </style>
      <body>
          <div class="background">
      
              <a href="http://localhost:8080"> <img class="medieval"
                      src="https://eapi.pcloud.com/getpubthumb?code=XZlztkZqnIb2V9qFI4z3M5DI9gDBQIu0TfX&linkpassword=undefined&size=870x217&crop=0&type=auto"
                      alt="medieval"> </a>
          </div>
                <div class="montext">
              <h3>Bonjour <span class="username"> ${newUser.firstName} ${newUser.lastName}, </span> </h3> <br>
              <p>Vous souhaitez vous inscrire au club de jeux des gardiens de la legende.</p> <br> 
              <p>Merci de cliquer sur le lien pour vérifier votre email auprés du club de jeu Les gardiens de la légende. </p> <br>
              <a href="${link}">cliquez ici pour vérifier votre email. </a> <br>
              <p>L'administrateur du site Les gardiens de la légende.</p> <br>
              <a href="http://localhost:8080"> Les gardiens de la légendes</a>
                </div>
            </body>`,
        });
        console.log("Message sent: %s", info.messageId);
        console.log(`Un email de vérification bien envoyé a ${newUser.firstName} ${newUser.lastName} via l'adresse email: ${newUser.emailAddress} : ${info.response}`);
      }
      main().catch(console.error);
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

      async function main() {
        const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true, 
          auth: {
            user: process.env.EMAIL, 
            pass: process.env.PASSWORD_EMAIL, 
          },
        });

        const info = await transporter.sendMail({
          from: 'lesgardiensdelalegende@gmail.com', 
          to: `${newUser.emailAddress}`, 
          subject: `Vos modification d'information sur le site des Gardiens de la légende à été pris en compte ! ✔`, 
          text: `Bonjour ${newUser.firstName} ${newUser.lastName},
          Vous êtes membre du club de jeux des gardiens de la legendes.
          Vous avez récemment changé vos informations personnelles dans la configuration de votre compte. 😊 
          Vos changement ont bien été pris en compte ! ✔️
          En vous remerciant et en espérant vous revoir bientôt autour d'un jeu ! 🤗
          Bonne journée.
          L'administrateur du site Les gardiens de la légende.`, 
          html: `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css"
          integrity="sha512-NmLkDIU1C/C88wi324HBc+S2kLhi08PN5GDeUVVVC/BVt/9Izdsc9SVeVfA1UZbY3sHUlDSyRXhCzHfr6hmPPw=="
          crossorigin="anonymous" />
      <style>
      h3 {
        font-size: 1.5rem;
    }
    body {
        background-color: rgb(253, 232, 175);
    }
    .background {
        display: flex
    }
    .medieval {
        border-radius: 8px;
        max-height: 500px;
        height: 300px;
        width: 1500px;
        max-width: 100%;
    }
    .montext {
        padding: 2rem 0 0 2rem;
    }
      </style>
      <body>
          <div class="background">
      
              <a href="http://localhost:8080"> <img class="medieval"
                      src="https://eapi.pcloud.com/getpubthumb?code=XZlztkZqnIb2V9qFI4z3M5DI9gDBQIu0TfX&linkpassword=undefined&size=870x217&crop=0&type=auto"
                      alt="medieval"> </a>
          </div>
                <div class="montext">
              <h3>Bonjour <span class="username"> ${newUser.firstName} ${newUser.lastName}, </span> </h3> <br>
              <p>Vous êtes membre du club de jeux des gardiens de la legendes.</p>
              <p>Vous avez récemment changé vos informations personnelles dans la configuration de votre compte. 😊 </p>
              <p> Vos
                  changement ont bien été pris en compte ! ✔️ </p> <br>
              <p>En vous remerciant et en espérant vous revoir bientôt autour d'un jeu ! 🤗</p>
              <p> Bonne journée.</p> <br>
      
              <p>L'administrateur du site Les gardiens de la légende.</p> <br>
              <a href="http://localhost:8080"> Les gardiens de la légendes</a>
      
          </div>
            </body>`, 
        });
        console.log("Message sent: %s", info.messageId);
        console.log(`Email bien envoyé a ${newUser.firstName} ${newUser.lastName} via l'adresse email: ${newUser.emailAddress} : ${info.response}`);
      }
      main().catch("Erreur lors de l'envois du mail dans la méthode updateUser", console.error);
      console.log("le newUser in DB => ", newUser);
      res.json(newUser.id, newUser.firstName, newUser.lastName, newUser.pseudo, newUser.avatar);
      console.log(`L'utilisateur avec l'id : ${newUser.id} et le pseudo ${newUser.pseudo}, a bien été modifié.`);
    } catch (error) {
      res.status(500).json(error.message);
      console.log("Erreur dans la modification d'un utilisateur : ", error);
    }
  },
  verifyEmail: async (req, res, err) => {
    try {
      const {
        userId,
        token
      } = req.query;
      console.log("userId =>", userId);
      console.log("secretCode =>", token)
      const userInDb = await User.findOne(userId);
      console.log("userInDb.emailverified =>", userInDb.verifyemail);
      const decodedToken = await jsonwebtoken.verify(token, jwtSecret, {
        audience: 'Lesgardiensdelalégende',
        issuer: `${userInDb.pseudo}`
      }, function (err, decoded) {
        if (err) {
          res.json("la validation de votre email a échoué", err)
        }
        return decoded
      });
      console.log("decode =>", decodedToken)
      console.log("userId =>", userId);
      if (userInDb.verifyemail) {
        console.log(`Le mail ${userInDb.emailAddress} à déja été authentifié avec succés !`);
        res.json(`Bonjour ${userInDb.pseudo}, votre email a déja été authentifié !`)
      } else if (!decodedToken.userId === userInDb.id && decodedToken.iss == userInDb.pseudo) {
        console.log(`une érreur est apparu =>`, err)
        res.status(401).json(`la validation de votre email a échoué`);
      } else {
        await User.emailverified(userInDb.id);
        console.log(`Le mail ${userInDb.emailAddress} à été authentifié avec succés !`);
        res.status(200).json(`Bonjour ${userInDb.pseudo}, votre mail a été authentifié avec succés ! Vous pouvez désormais fermer cette page.`)
      }
    } catch (error) {
      console.trace(
        'Erreur dans la méthode verifyEmail du userController :',
        error);
      res.status(500).json(error.message);
    }
  },
}
module.exports = userController;