const models = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.get = async (req, res) => {
  const accounts = await models.accounts.findAll();
  res.send(accounts);
};

exports.post = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(7);
    req.body.password = bcrypt.hashSync(req.body.password, salt);
    const response = await models.accounts.create(req.body);
    res.send(response);
  } catch (err) {
    res.send(err);
  }
};

exports.delete = async (req, res) => {
  try {
    const response = await models.accounts.findByPk(req.params.id);
    response.destroy();
    res.send("Success");
  } catch (err) {
    res.send(err);
  }
};

exports.put = async (req, res) => {
  try {
    const accounts = await models.accounts.findByPk(req.params.id);
    await accounts.update({
      name: req.body.name
    });
    res.send("update success");
  } catch (err) {
    res.send(err);
  }
};

exports.login = async (req, res) => {
  //find account
  const account = await models.accounts.findOne({
    where: { email: req.body.email }
  });

  if (account === null) return res.send("Account not found");
  //compare password
  const validPassword = await bcrypt.compare(
    req.body.password,
    account.password
  );
  if (!validPassword) return res.send("Password is not valid");

  const token = jwt.sign(
    { id: account.id, email: account.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
  res.send({
    message: "You are logged in!",
    token: token
  });
};
