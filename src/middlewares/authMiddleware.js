import jwt from "jsonwebtoken";

export function authMiddleware(req, res, next) {
  const token = req.cookies["auth"];

  if (!token) {
    return next();
  }

  // validate token

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);

    req.user = decodedToken;
    req.isAuthenticated = true;

    next();
  } catch (err) {
    // 'TODO: Error handling'
    res.clearCookie("auth");
    res.redirect("/auth/login");
  }
}


export function isAuth(req, res, next) {
    if (!req.user) {
        return res.redirect('auth/login')
    }

    next();
}