import React from "react";
import Carousel from "./Carousel";

class TabCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef(null);
  }
  onChangeSlide = (id) => {
    const { onChangeSubTab } = this.props;
    onChangeSubTab(id);
  };

  render() {
    const {
      currentTab,
      ariaHidden,
      isPopupActive,
      currentSubTab,
      visitedSubtabs,
      tabsWithDisabledSubtabs,
      currentLangData,
      tabIndice,
      updateAriaLiveText,
      markedActivities,
    } = this.props;
    return (
      <div className="vl-tab-carousel-container" ref={this.ref}>
        <Carousel
          currentTab={currentTab}
          ariaHidden={ariaHidden}
          currentSlide={currentSubTab}
          isPopupActive={isPopupActive}
          visitedSubtabs={visitedSubtabs}
          onChangeSlide={this.onChangeSlide}
          tabsWithDisabledSubtabs={tabsWithDisabledSubtabs}
          currentLangData={currentLangData}
          tabIndex={tabIndice}
          updateAriaLiveText={updateAriaLiveText}
          markedActivities={markedActivities}
        >
          {this.props.children}
        </Carousel>
      </div>
    );
  }
}

export default TabCarousel;

TabCarousel.defaultProps = {
  t: () => {},
};
