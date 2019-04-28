const users = [
  {
    id: 0,
    name: "KIM"
  },
  {
    id: 1,
    name: "LEE"
  }
];

exports.index = (req, res) => {
  return res.json(users);
};

exports.show = (req, res) => {
  const id = parseInt(req.params.id);
  if (!id && id !== 0) {
    return res.status(400).json({ error: "Incorrect id" });
  }
  const user = users.filter(user => {
    return user.id === id;
  })[0];
  if (!user) {
    return res.status(404).json({ error: "Unknown user" });
  }
  return res.json(user);
};

exports.destroy = (req, res) => {
  const id = parseInt(req.params.id);
  if (!id && id !== 0) {
    return res.status(400).json({ error: "Incorrect id" });
  }

  const userIdx = users.findIndex(user => user.id === id);
  if (userIdx === -1) {
    return res.status(404).json({ error: "Unknown user" });
  }

  users.splice(userIdx, 1);
  res.status(204).send();
};

exports.create = (req, res) => {
  const name = req.body.name || "";
  if (!name.length) {
    return res.status(400).json({ error: "Incorrenct name" });
  }
  const newUser = {
    id: users.length,
    name: name
  };
  users.push(newUser);
  return res.status(201).json(newUser);
};
