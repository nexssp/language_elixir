const { ProgrammingLanguage } = require("../../lib/programmingLanguage");
const pl = new ProgrammingLanguage(".exs");

pl.add("title", "Elixir");
pl.add("description", `Elixir`);
// nexss-start.js
// Compiler
// If in the folder there is below files it will be run.
// First looking in the 1!project folder, then in the 2!language folder
// then 3!standard compiler
// Standard will be run: g++ myfile.cpp myarg1 myarg2..
pl.add("compiler", "elixir"); // clang++
// Custom compiler gets file as first parameter
// eg customCompiler.darwin.cpp.bat myfile.cpp myarg1 myarg2..

// warning: no 'all' option available! only win32, linux, darwin
// pl.add("customCompiler", {
//   win32: "customCompiler.win32.cpp.cmd",
//   linux: "customCompiler.linux.cpp.sh",
//   darwin: "customCompiler.darwin.cpp.sh"
// });

pl.add("compilerInstallation", {
  win32: "scoop install erlang elixir",
  linux: "apt-get install -y erlang elixir",
  darwin: "brew install erlang elixir"
});

//mix archive.install github michalmuskala/jason
// TODO: Below is link with all info
// TODO: hex is instsalled after first install of mix
// https://hexdocs.pm/mix/Mix.Tasks.Archive.Install.html
pl.add("packageManagerInstallation", {
  // TODO: install it with: mix deps.get json
  // Simply add {:json, "~> 1.2"} to your project's mix.exs file, in the dependencies list and run mix deps.get json.
  win32: "mix archive.install",
  linux: "mix archive.install",
  darwin: "mix archive.install"
});

// nexss-install.js
pl.add("packageManager", { all: "mix archive.install <package>" });
pl.add("packageManagerInit", {
  all: {
    check: () => {
      if (
        !require("fs").existsSync(
          require("path").join(process.cwd(), "mix.exs")
        )
      ) {
        require("child_process").execSync("mix new .");
        console.log("initialize mix project.");
      } else {
        console.log("mix already initialized.");
      }
    }
  }
});

// pl.add("afterPackageInstallMessage", {
//   all:
//     "Add to the top of your php file(s): require __DIR__ . '/vendor/autoload.php';"
// });

// nexss-search.js
// pl.add("packagaManagerFunctions", {
//   all: {
//     search: "mix hex.search <args>",
//     installed: "vcpkg list",
//     uninstall: "vcpkg remove <args>",
//     help: "vcpkg help <args>",
//     version: "vcpkg help <args>"
//   }
// });

pl.addError("Uncaught Error: Class '(.*?)'", {
  win32: "nexss install exs <package>",
  darwin: "nexss install exs <package>",
  linux: "nexss install exs  <package>"
});

pl.addHelp("executeCommandLine", "");
pl.addHelp("InteractiveShell", "iex");

pl.add("url", "https://elixir-lang.org");

module.exports = pl.data;
