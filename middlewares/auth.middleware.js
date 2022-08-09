module.exports = {

    isTeacher: (req, res, next) => {
        if (req.session.user.role !== 'teacher') {
            return res.redirect('/users/login/teacher');
        }
        next();
    },
    

    isAuthenticated: (req, res, next) => {
        if (!req.session.user) {
            res.redirect('/')
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