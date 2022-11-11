import React from "react";
import StickyNote from "./StickyNote";
import PropTypes from "prop-types";

class StickyNotes extends React.Component {
  constructor(props) {
    super(props);
    this._droppableConatiner = null;
    this.depth = 1;
  }

  setDepth = () => {
    this.depth += 1;
  };

  getDepth = () => {
    return this.depth;
  };

  _getElement = () => this._droppableConatiner;

  render() {
    const {
      count,
      limit,
      maxChar,
      currentLangData,
      currentTab,
      currentSubTab,
      markCompletedActivity,
      responsive,
    } = this.props;
    const items = [];
    const maxItems = Math.min(count, limit);
    for (let i = 0; i < maxItems; i++) {
      items.push(
        <StickyNote
          key={i}
          maxChar={maxChar}
          wrapperStyle={{ top: i ? 100 * i + 30 : 30 }}
          droppableConatiner={this._getElement}
          index={i}
          depth={this.depth}
          setDepth={this.setDepth}
          getDepth={this.getDepth}
          currentLangData={currentLangData}
          currentTab={currentTab}
          currentSubTab={currentSubTab}
          markCompletedActivity={markCompletedActivity}
          responsive={responsive}
        />
      );
    }
    return (
      items.length > 0 && (
        <div
          ref={(el) => (this._droppableConatiner = el)}
          className="vl-droppable-container"
        >
          {items}
        </div>
      )
    );
  }
}

StickyNotes.propTypes = {
  count: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  maxChar: PropTypes.number,
};

StickyNotes.defaultProps = {
  count: 0,
  limit: 3,
};

export default StickyNotes;
