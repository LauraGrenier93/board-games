const mainController = {
/**
* Method for fetching information from the homepage
* @param {Express.Request} req - the object representing the request
* @param {Express.Response} res - the object representing the response
*/
  init: async (req, res) => {
    try {
    
      res.redirect("http://localhost:3000/api-docs#/")
      
    } catch (error) {
      console.trace('Erreur dans la méthode init du mainController :', error);
      res.status(500).json(error);
    }
  },
};

module.exports = mainController;

















// ici un exemple de documentation de swagger pour une méthode : getCadex: (request, response) => {},
//--------------------------------------------------------------------
/* 
/**
     * Middleware chargé de générer un cadavre exquis
     * L'utilisateur peut fournir des morceaux dans la query string
     * @param {Express.Request} request - l'objet représentant la requête
     * @param {Express.Response} response - l'objet représentant la réponse
     */ 

    
    //getCadex: (request, response) => {},
//--------------------------------------------------------------------
