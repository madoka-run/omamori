require "test_helper"

class BreathingsControllerTest < ActionDispatch::IntegrationTest
  test "should get show" do
    get breathings_show_url
    assert_response :success
  end
end
