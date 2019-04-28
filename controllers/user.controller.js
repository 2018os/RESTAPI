const models = require("../models");

exports.index = (req, res) => {
  models.user.findAll().then(result => {
    res.json(result);
  });
};

exports.show = (req, res) => {
  const id = parseInt(req.params.id);
  if (!id && id !== 0) {
    return res.status(400).json({ error: "Incorrect id" });
  }
  models.user.findByPk(id).then(result => {
    if (result === null) {
      return res.status(404).json({ error: "UnKnown User" });
    }
    res.json(result);
  });
};

exports.destroy = (req, res) => {
  const id = parseInt(req.params.id);
  if (!id && id !== 0) {
    return res.status(400).json({ error: "Incorrect id" });
  }

  models.user
    .destroy({
      where: {
        id: id
      }
    })
    .then(result => {
      res.status(204).json({ message: "삭제 되었습니다." });
    })
    .catch(error => {
      res.status(400).json({ error: error });
    });
};

exports.create = (req, res) => {
  const name = req.body.name || "";
  const password = req.body.password || "";
  if (!name.length || !password.length) {
    return res.status(400).json({ error: "Incorrenct name or password" });
  }
  const newUser = {
    name: name,
    password: password
  };
  models.user.create(newUser).then(result => {
    return res.status(201).json(result);
  });
};
