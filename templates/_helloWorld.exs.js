// additional info for templates like copy extra libraries.
// in this case library needs JSON
const config = {
  files: ["mix.exs"],
  commands: ["cd src && mv mix.exs ../mix.exs && cd .. && mix deps.get"],
  repos: [],
  descriptions: []
};

module.exports = config;
