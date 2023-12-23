const UserVerification = (req, res) => {
  console.log(req.body, "Verification");
  res.send(req.body);
};
module.exports = { UserVerification };
