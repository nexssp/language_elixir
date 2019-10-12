# use Mix.Config

# config :logger, level: :debug

# config :json, log_level: :debug
# https://adamdelong.com/elixir-module-not-available/

defmodule Reader do
  def read do
    case IO.read(:stdio, :line) do
      :eof -> :ok
      {:error, reason} -> IO.puts "Error: #{reason}"
      data ->
        json = JSON.decode(data)
        # IO.iodata_to_binary(iodata)
        # json = Jason.decode!(data)
        # json["test"] => "elixir works!"
        # data = Jason.encode!(json)

        # new_bar_map =
        #     json
        #     |> Map.get(:start)
        #     |> Map.put(:baz, "new value")

        IO.write(:stdio, JSON.encode(json))
        read()
    end
  end
end

Reader.read()