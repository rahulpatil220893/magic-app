import { connect } from "react-redux";
import ResponsiveWrapper from "../../app/components/ResponsiveWrapper";
import { widthChange } from "../actions";

const mapStateToProps = (state, ownProps) => {
  return {
    name: ownProps.name,
    breakpoints: {
      small: [0, 639],
      medium: [640, 896],
      large: [897, "~"],
    },
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onResize: (data) => {
      dispatch(widthChange(data));
    },
  };
};

const ResponsiveContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ResponsiveWrapper);

export default ResponsiveContainer;
