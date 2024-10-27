const adminAuth = (req, res, next) => {
  const token = "xyz";
  const isAdminAuthorized = token === "xyz";
  console.log("auth middleware");
  if (!isAdminAuthorized) {
    res.status(401).send("Unauthorized request");
  } else {
    next();
  }
};

const userAuth = (req, res, next) => {
  const token = "xyz";
  const isAdminAuthorized = token === "xyz";
  console.log("user middleware");
  if (!isAdminAuthorized) {
    res.status(401).send("Unauthorized request");
  } else {
    next();
  }
};

module.exports = { adminAuth, userAuth };
