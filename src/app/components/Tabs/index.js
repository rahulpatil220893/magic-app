import React from "react";
import PropTypes from "prop-types";
//import '../../stylesheets/tabs.scss';

export const Tab = ({ children, index, isSelected }) => {
  return (
    <div
      id={`tabpanel_${index}`}
      key={index}
      role="tabpanel"
      aria-labelledby={`tab_${index}`}
      aria-hidden={!isSelected() || null}
      className={
        !isSelected() ? "hide-tab-panel tab-panel" : "active tab-panel"
      }
    >
      {children}
    </div>
  );
};

class Tabs extends React.Component {
  constructor(props) {
    super(props);
    // this.tabs = props.children ? props.children : [];
    this.currentTab = props.currentTab;
    this.selectTab = this.selectTab.bind(this);
    this.previousTab = this.previousTab.bind(this);
    this.nextTab = this.nextTab.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);

    this.state = {
      tabs: props.children ? props.children : [],
    };
  }

  UNSAFE_componentWillReceiveProps(newProps, newState) {
    if (this.currentTab !== newProps.currentTab) {
      setTimeout(() => {
        this.activeLink.focus();
      });
      this.currentTab = newProps.currentTab;
    }

    if (newProps.lang !== this.props.lang) {
      this.setState({}, () => {
        this.setState({ tabs: this.props.children });
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.currentSubTab !== prevProps.currentSubTab) {
      if (this.activeLink) {
        this.activeLink.focus();
      }
    }
  }

  selectTab(tabIndex) {
    const { onChangeTab, currentTab } = this.props;

    if (currentTab !== tabIndex) {
      onChangeTab(tabIndex);
    }
  }

  previousTab(index) {
    if (index > 0) this.selectTab(index - 1);
    else if (index === 0) this.selectTab(this.state.tabs.length - 1);
  }

  nextTab(index) {
    if (index < this.state.tabs.length - 1) this.selectTab(index + 1);
    else if (index === this.state.tabs.length - 1) this.selectTab(0);
  }

  firstTab() {
    this.selectTab(0);
  }

  lastTab() {
    this.selectTab(this.state.tabs.length - 1);
  }

  handleClick(e, tabIndex) {
    e.preventDefault();
    this.selectTab(tabIndex);
  }

  handleBlur(e, tabIndex, tab) {
    const { markedActivities, t } = this.props;
    if (
      markedActivities[tabIndex]?.length ===
      this.state.tabs[tabIndex].props.subTabLength
    ) {
      this.updateLiveText(`${t(`labGloabalData.completed`)}`);
    }
  }

  handleKeydown(e, tabIndex) {
    if (
      [39, 40].includes(e.which) &&
      this.props.disabledTabs.includes(tabIndex + 1)
    ) {
      if (this.props.disabledTabs.length) {
        for (let i = tabIndex; i < this.props.tabsData.length; i++) {
          if (this.props.disabledTabs.includes(i + 1)) continue;
          this.nextTab(i);
          break;
        }
      } else {
        e.preventDefault();
        this.nextTab(tabIndex);
      }
      return;
    } else if (
      [37, 38].includes(e.which) &&
      this.props.disabledTabs.includes(tabIndex - 1)
    ) {
      if (this.props.disabledTabs.length) {
        for (let i = tabIndex; i < this.props.tabsData.length; i--) {
          if (this.props.disabledTabs.includes(i - 1)) continue;
          this.previousTab(i);
          break;
        }
      } else {
        e.preventDefault();
        this.previousTab(tabIndex);
      }
      return;
    }
    switch (e.which) {
      case 13:
        e.preventDefault();
        this.selectTab(tabIndex);
        break;
      case 35:
        e.preventDefault();
        this.lastTab(tabIndex);
        break;
      case 36:
        e.preventDefault();
        this.firstTab(tabIndex);
        break;
      case 37:
      case 38:
        e.preventDefault();
        this.previousTab(tabIndex);
        break;
      case 39:
      case 40:
        e.preventDefault();
        this.nextTab(tabIndex);
        break;
      default:
        break;
    }
  }

  updateLiveText = (altText) => {
    const { updateAriaLiveText, altTimeOut } = this.props;
    let timeout = altTimeOut ? altTimeOut : 500;
    if (updateAriaLiveText) {
      updateAriaLiveText(altText);
      setTimeout(() => {
        updateAriaLiveText(" ");
      }, timeout);
    }
  };

  render() {
    const {
      disabled,
      currentTab,
      t,
      isPopupActive,
      ariaHidden,
      tabsData,
      markedActivities,
      tabValue,
    } = this.props;
    return (
      <div className="tab-base" aria-hidden={ariaHidden}>
        <ul role="tablist" className="vl-tab-list">
          {this.state.tabs.map((tab, i) => {
            const tabIndex = i === currentTab ? (disabled ? -1 : 0) : -1;
            const _isPopupActive = isPopupActive
              ? "-1"
              : i === currentTab
              ? null
              : tabIndex;
            const isCompleted =
              markedActivities[i]?.length === tab.props.subTabLength;
            const _isCompleted = isCompleted ? "completed" : null;
            return (
              <li key={i} role="presentation">
                <button
                  id={`tab_${i}`}
                  // href={`#tabpanel_${i}`}
                  role="tab"
                  aria-controls={`tabpanel_${i}`}
                  aria-label={
                    _isCompleted
                      ? `${tabsData[i].title} ${t(`labGloabalData.completed`)}`
                      : tabsData[i].title
                  }
                  aria-selected={
                    this.props.disabledTabs.includes(currentTab)
                      ? null
                      : i === currentTab
                  }
                  className={_isCompleted}
                  tabIndex={
                    _isPopupActive ||
                    (tabValue || this.props.disabledTabs.includes(currentTab)
                      ? "-1"
                      : null)
                  }
                  aria-hidden={tabValue ? true : null}
                  onClick={(e) => {
                    return this.handleClick(e, i);
                  }}
                  onKeyDown={(e) => {
                    return this.handleKeydown(e, i);
                  }}
                  onBlur={(e) => {
                    return this.handleBlur(e, i, tabsData[i].title);
                  }}
                  ref={(link) => {
                    if (i === currentTab) this.activeLink = link;
                  }}
                  disabled={this.props.disabledTabs.indexOf(i) !== -1}
                  // title={tabsData[i].title}
                >
                  <span>
                    {tabsData[i].title}
                    {isCompleted ? <i className="fa fa-check"></i> : ""}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
        <div className="tab-panels" id="tabPanels">
          {this.state.tabs.map((tab, i) => {
            return React.cloneElement(tab, {
              key: i,
              index: i,
              isSelected: () => {
                return i === currentTab;
              },
              tabsData: tabsData,
            });
          })}
        </div>
      </div>
    );
  }
}

Tab.propTypes = {
  children: PropTypes.object.isRequired,
  index: PropTypes.number,
  isSelected: PropTypes.func,
};

Tabs.propTypes = {
  children: PropTypes.array,
  onChangeTab: PropTypes.func.isRequired,
  currentTab: PropTypes.number,
  disabled: PropTypes.bool,
  tabValue: PropTypes.bool,
  disabledTabs: PropTypes.array,
  currentSubTab: PropTypes.number.isRequired,
};

Tabs.defaultProps = {
  disabled: false,
  tabValue: false,
  currentTab: 0,
  currentSubTab: 0,
  disabledTabs: [],
};

export default Tabs;
