const adminAuth = (req, res, next) => {
    if (req.session.adminId) {
       return next();
    } else {        
        res.redirect('/admin/login'); 
    }
};
module.exports=adminAuth;