// roleAuthMiddleware.js
const roleAuthMiddleware = (roles) => {
    return (req, res, next) => {
      // Check if the role is provided as a query parameter
      const roleQueryParam = req.query.role;
  
      // Check if the user has the required role
      if (roles.includes(roleQueryParam)) {
        // User has the required role, so continue to the next middleware or route
        next();
      } else {
        // User doesn't have the required role, return a 403 Forbidden response
        res.status(403).json({ message: 'Forbidden' });
      }
    };
  };
  
  module.exports = roleAuthMiddleware;
  