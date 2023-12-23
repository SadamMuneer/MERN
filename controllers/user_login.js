const UserLog = (req, res) => {
  console.log(req.body, "Login");
  res.send(req.body);
};
module.exports = { UserLog };
