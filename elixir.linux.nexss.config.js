let languageConfig = Object.assign({}, require("./elixir.win32.nexss.config"));
const installElixir = `${__dirname}/install/installElixir.linux.sh`;
languageConfig.compilers = {
  elixir: {
    install: `bash ${installElixir}`,
    command: "mix",
    args: "run <file>",
    help: ``,
  },
};

const {
  replaceCommandByDist,
  dist,
} = require(`${process.env.NEXSS_SRC_PATH}/lib/osys`);
const distName = dist();
languageConfig.dist = distName;

// TODO: Later to cleanup this config file !!
switch (distName) {
  case "Alpine Linux":
    languageConfig.compilers.elixir.install = `apk add elixir
mix local.hex --force
mix deps.get`;
    break;
  default:
    languageConfig.compilers.elixir.install = replaceCommandByDist(
      "apt update && apt install elixir"
    );
    break;
}

languageConfig.languagePackageManagers = {
  mix: {
    installation: `bash ${installElixir}`,
    rebar3: `sh ${__dirname}/install/installRebar3.sh`,
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

module.exports = languageConfig;
