# http://sgeos.github.io/elixir/erlang/2016/01/08/single-file-elixir-programs.html

# https://elixirschool.com/en/lessons/advanced/escripts/

defmodule MyApp.Mixfile do
  use Mix.Project

  def project do
    [app: :my_app,
     version: "0.1.0",
     build_embedded: Mix.env == :prod,
     start_permanent: Mix.env == :prod,
     deps: deps()]
  end

  # Configuration for the OTP application
  #
  # Type "mix help compile.app" for more information
  def application do
    [applications: [:logger]]
  end

  # Dependencies can be Hex packages:
  #
  #   {:mydep, "~> 0.3.0"}
  #
  # Or git/path repositories:
  #
  #   {:mydep, git: "https://github.com/elixir-lang/mydep.git", tag: "0.1.0"}
  #
  # Type "mix help deps" for more examples and options
  defp deps do
    [{:json, "~> 1.2"}]
  end
  # defp escript do
  #   [main_module: ExampleApp.CLI]
  # end
end
