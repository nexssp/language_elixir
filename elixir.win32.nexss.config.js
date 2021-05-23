let languageConfig = Object.assign(
  {},
  require(`../config.${process.platform}`)
);
languageConfig.title = "Elixir";
languageConfig.description =
  "Elixir is a dynamic, functional language designed for building scalable and maintainable applications.";
languageConfig.url = "https://elixir-lang.org/";
languageConfig.founders = ["José Valim"];
languageConfig.developers = [""];
languageConfig.years = ["2012"];
languageConfig.extensions = [".exs", ".ex"];
languageConfig.interactiveShell = "iex";
languageConfig.builders = {};
languageConfig.compilers = {
  elixir: {
    install: `scoop install erlang elixir`,
    command: "mix",
    args: "run <file>",
    help: ``,
  },
};
languageConfig.errors = require("./nexss.elixir.errors");
languageConfig.languagePackageManagers = {
  mix: {
    installation: "scoop install erlang elixir",
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

    else: "mix",
  },
};

const firstPM =
  languageConfig.languagePackageManagers[
    Object.keys(languageConfig.languagePackageManagers)[0]
  ];

// Just in case someone wants to use new (like elixir)
firstPM.new = firstPM.init;

module.exports = languageConfig;
