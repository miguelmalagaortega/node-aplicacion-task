const proyectosHome = (req, res) => {
  res.render("index", {
    nombrePagina: "Proyectos",
  });
};

module.exports = {
  proyectosHome,
};
