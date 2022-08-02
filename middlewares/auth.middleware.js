module.exports = {

    isTeacher: (req, res, next) => {
        if (req.session.user.role !== 'teacher') {
            res.redirect('/users/login');
            return
        }
        next();
    },

    isAuthenticated: (req, res, next) => {
        if (!req.session.user) {
            res.redirect('/users/login')
            return
        }
        req.user = req.session.user;
        next();
    },

    setAuthUserVar: (req,res,next) => {
        res.locals.authUser = null

        if(req.session.user) {
            res.locals.authUser = req.session.user
        }  
        next()
    }

}