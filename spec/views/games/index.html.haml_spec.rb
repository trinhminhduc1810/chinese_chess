require 'spec_helper'

describe "games/index" do
  before(:each) do
    assign(:games, [
      stub_model(Game,
        :creator => "Creator",
        :visitor => "Visitor"
      ),
      stub_model(Game,
        :creator => "Creator",
        :visitor => "Visitor"
      )
    ])
  end

  it "renders a list of games" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => "Creator".to_s, :count => 2
    assert_select "tr>td", :text => "Visitor".to_s, :count => 2
  end
end
