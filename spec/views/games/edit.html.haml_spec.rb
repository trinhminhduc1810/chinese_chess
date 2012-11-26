require 'spec_helper'

describe "games/edit" do
  before(:each) do
    @game = assign(:game, stub_model(Game,
      :creator => "MyString",
      :visitor => "MyString"
    ))
  end

  it "renders the edit game form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form", :action => games_path(@game), :method => "post" do
      assert_select "input#game_creator", :name => "game[creator]"
      assert_select "input#game_visitor", :name => "game[visitor]"
    end
  end
end
