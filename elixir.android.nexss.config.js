let languageConfig = Object.assign({}, require("./elixir.win32.nexss.config"));
const sudo = process.sudo;

languageConfig.compilers = {
  elixir: {
    install: `pkg install -y elixir`,
    command: "mix",
    args: "run <file>",
    help: ``,
  },
};


module.exports = languageConfig;
