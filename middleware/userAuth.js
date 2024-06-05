const isLoggedin = (req, res, next) => {
    if (req.session.user_id) {
      return next();
    } else {
      res.redirect('/login');
    }
  };
  
  const disableCacheMiddleware = (req, res, next) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next();
  };
  
  module.exports = {
    isLoggedin,
    disableCacheMiddleware
  };
  