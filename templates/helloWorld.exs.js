// additional info for templates like copy extra libraries.
// in this case library needs JSON
const config = {
  files: ["mix.exs"],
  commands: [
    "IF exist src (cd src && mv mix.exs ../mix.exs && cd ..) else ( mix deps.get)"
  ],
  repos: [],
  descriptions: [
    "!!! You may see some warnings at the very first run of your Elixir program."
  ]
};

module.exports = config;