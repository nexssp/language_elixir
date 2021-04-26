let languageConfig = Object.assign({}, require("./elixir.win32.nexss.config"));
const sudo = process.sudo;

const installElixir = `${__dirname}/install/installElixir.linux.sh`;
languageConfig.compilers = {
  elixir: {
    install: `${sudo}bash ${installElixir}`,
    command: "mix",
    args: "run <file>",
    help: ``,
  },
};

// TODO: Later to cleanup this config file !!
switch (process.distro) {
  case process.distros.UBUNTU:
    languageConfig.compilers.elixir.install = `${sudo}apt-get -y install wget
${sudo}wget https://packages.erlang-solutions.com/erlang-solutions_2.0_all.deb && ${sudo} dpkg -i erlang-solutions_2.0_all.deb
${sudo}apt-get -y update
${sudo}apt-get -y install esl-erlang elixir locales
mix local.hex --force
mix deps.get`;
    break;
  case "Alpine Linux":
    languageConfig.compilers.elixir.install = `${sudo}apk add elixir
mix local.hex --force
mix deps.get`;
    break;
  default:
    languageConfig.compilers.elixir.install = process.replacePMByDistro(
      `${sudo}apt update -y && ${sudo}apt install -y elixir`
    );
    break;
}

languageConfig.languagePackageManagers = {
  mix: {
    installation: `bash ${installElixir}`,
    rebar3: `${sudo}sh ${__dirname}/install/installRebar3.sh`,
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
