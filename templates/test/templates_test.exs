defmodule TemplatesTest do
  use ExUnit.Case
  doctest Templates

  test "greets the world" do
    assert Templates.hello() == :world
  end
end
