
/**
*Middleware that checks if a user is an administrator to have access to particular routes accessible only to administrators
* @method adminMW
* 
*/
const adminMW = (request, response, next) => {
    if (!request.session.user) {
        return response.redirect('/login');
    }
    if (request.session.user.role !== 'Administrateur') {
        return response.status(403).render('403');
    }
    next();
}

module.exports = adminMW;
