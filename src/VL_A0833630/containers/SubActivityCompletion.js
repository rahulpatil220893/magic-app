import { connect } from "react-redux";
import SubActivityCompletion from "../../app/components/SubActivityCompletionPopup";

const mapState = (state) => ({
  popupMessage: state.popupMessage,
});

export default connect(mapState)(SubActivityCompletion);
