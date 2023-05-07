# Nexss PROGRAMMER 2.0 - Elixir
# Default template for JSON Data

defmodule Reader do
  def read do
    case IO.read(:stdio, :line) do
      :eof ->
        :ok

      {:error, reason} ->
        IO.puts("Error: #{reason}")

      data ->
        {:ok, json} = JSON.decode(data)

        new_bar_map =
          json
          |> Map.put(:test, "test")

        # my_value = json
        # |> Map.get("start")
        # IO.inspect(my_value)

        {:ok, response} = JSON.encode(new_bar_map)
        IO.write(:stdio, response)
        read()
    end
  end
end

Reader.read()
