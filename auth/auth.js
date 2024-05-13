module.exports = {
    authorize: function(req, res, next) {
        if(!req.user) {
            return res.redirect('/');
        }
        
        return next();
    },

    disauthorize: function(req, res, next) {
        if(!req.user) return next();

        res.redirect('/users');
    },
}