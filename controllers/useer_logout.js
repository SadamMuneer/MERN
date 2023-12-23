const UserLogout = (req, res) => {
  console.log(req.body, "client logout");
  res.send(req.body);
};
module.exports = { UserLogout };
