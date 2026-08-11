require "test_helper"

class AnxietyLogsControllerTest < ActionDispatch::IntegrationTest
  test "should get new" do
    get anxiety_logs_new_url
    assert_response :success
  end
end
