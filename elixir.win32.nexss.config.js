let languageConfig = Object.assign({}, require("../config.win32"));
languageConfig.title = "Elixir";
languageConfig.description =
  "Elixir is a dynamic, functional language designed for building scalable and maintainable applications.";
languageConfig.url = "https://elixir-lang.org/";
languageConfig.extensions = [".exs", ".ex"];
languageConfig.builders = {};
languageConfig.compilers = {
  elixir: {
    install: "scoop install erlang elixir",
    // Cpp does not have possibility to compile and run on the fly. We need to save it as a exe file first.
    command: "mix",
    args: "run <file>",
    help: ``
  }
};
languageConfig.errors = require("./nexss.elixir.errors");
languageConfig.languagePackageManagers = {
  mix: {
    installation: "installed.",
    rebar3: `Powershell -File ${__dirname}/install/installRebar3.ps1`,
    messageAfterInstallation: "",
    installed: "mix escript",
    search: "mix hex.search",
    install: "mix archive.install hex",
    uninstall: "mix remove",
    help: "mix",
    version: "mix version",
    init: () => {
      if (
        !require("fs").existsSync(
          require("path").join(process.cwd(), "mix.exs")
        )
      ) {
        require("child_process").execSync("mix new .", { stdio: "inherit" });
        console.log("initialized mix project.");
      } else {
        console.log("mix already initialized.");
      }
    },
    // if command not found in specification
    // run directly on package manager
    else: "composer <default> <args>"
  }
};

module.exports = languageConfig;
