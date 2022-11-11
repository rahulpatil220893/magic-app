import React from "react";

class NavigationButton extends React.Component {
  constructor(props) {
    super(props);
    this.totalTabs = this.props.tabsData.length - 1;
    this.state = {
      active: true,
    };
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    this.setActiveState(newProps);
    if (
      this.props.submitPopupOpened &&
      this.props.submitPopupOpened != newProps.submitPopupOpened
    ) {
      setTimeout(() => {
        this.butttonRef.focus();
      }, 200);
    }
  }

  componentDidMount() {
    this.setActiveState(this.props);
  }

  setActiveState = (props) => {
    const { tabsData, currentTab, currentSubTab } = props;

    if (tabsData[currentTab].numberOfSubTab === 0) {
      this.setState({
        active: true,
      });
    } else {
      if (currentSubTab === tabsData[currentTab].numberOfSubTab - 1) {
        this.setState({
          active: true,
        });
      } else {
        this.setState({
          active: false,
        });
      }
    }
  };

  nextTab = () => {
    const { currentTab, onChangeTab, isAllLabCompleted } = this.props;
    if (currentTab === this.totalTabs) {
      isAllLabCompleted();
    } else {
      if (this.props.disabledTabs.length) {
        for (let i = currentTab; i < this.props.tabsData.length; i++) {
          if (this.props.disabledTabs.includes(i + 1)) continue;
          onChangeTab(i + 1);
          break;
        }
      } else {
        onChangeTab(currentTab + 1);
      }
    }
  };

  onKeyDown = (e) => {
    switch (e.which) {
      case 13:
        e.preventDefault();
        e.stopPropagation();
        this.props.updateFocusTooltip();
        this.nextTab();
        break;
      default:
        break;
    }
  };

  render() {
    const { labSubmitted, currentTab, tabsData, isPopupActive, ariaHidden } =
      this.props;
    const { active } = this.state;
    const buttonText = tabsData[this.props.currentTab].footerButtonText;
    const disabled =
      (labSubmitted && currentTab === tabsData.length - 1) || isPopupActive;

    return (
      <footer className="vl-next-button-container">
        <button
          className={`vl-next-button vl-globalbutton ${active ? "active" : ""}`}
          onClick={this.nextTab}
          onKeyDown={(e) => {
            return this.onKeyDown(e);
          }}
          tabIndex={ariaHidden ? "-1" : null}
          aria-hidden={ariaHidden}
          disabled={disabled}
          aria-label={buttonText}
          ref={(button) => {
            this.butttonRef = button;
          }}
        >
          {buttonText}
        </button>
      </footer>
    );
  }
}

export default NavigationButton;
