const helloRoute = (req, res) => {
  res.send("Hello");
};

const hiRoute = (req, res) => {
  res.send("Hi");
};

module.exports = {
  helloRoute,
  hiRoute
};