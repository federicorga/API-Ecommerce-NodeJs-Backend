import passport from 'passport';

const githubMiddlewareLogin = passport.authenticate('github', { failureRedirect: '/login' });
const githubMiddlewareRegister = passport.authenticate('github', { scope: ['user:email'] });
const jwtMiddlewareAuthenticate = passport.authenticate('jwt', { session: false });

const authorizationRole = (roles) => { //se debe especificar el role (admin,user) para el acceso
    //verifica el role de la cuenta
    return async (req, res, next) => {
      const user  = req.user;

      if (!user) return res.status(401).send({ error: `Unauthorizad` });
      if (!roles.includes(user.role))
        return res.status(403).send({ error: `No permissions` });
      next();
    };
  }

  const passportCall = (strategy) => {
    return async (request, response, next) => {
      passport.authenticate(
        strategy,
        { session: false },
        function (error, user, info) {
          if (error) return next(error);
          if (!user)
            return response
              .status(401)
              .send({ error: info.messages ? info.messages : info.toString() });
          request.user = user;
          next();
        }
      )(request, response, next);
    };
  };
  


export{
    githubMiddlewareLogin,
    githubMiddlewareRegister,
    jwtMiddlewareAuthenticate,
    authorizationRole,
    passportCall
}