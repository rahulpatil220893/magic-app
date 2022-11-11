import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";

import ResponsiveContainer from "./containers/ResponsiveContainer";
import AppContainer from "./containers/AppContainer";
import { appDispatcher } from "./middleware/dispatcher";
import * as Tincan from "../app/tincan";

import "./stylesheets/main.scss";

import tincanData from "./data/tincan";

const store = createStore(reducers, applyMiddleware(thunk, appDispatcher));

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tincanLoaded: false,
    };
  }

  componentDidMount() {
    this.preCacheImagesHandler(() => {
      Tincan.init(tincanData, () => {
        this.setState({
          tincanLoaded: true,
        });
      });
    });
  }

  preCacheImagesHandler = (callback) => {
    const preCacheImages = window.PRECACHE_IMAGES || [];

    if (preCacheImages.length) {
      let imgCtr = 0;
      for (let i = 0; i < preCacheImages.length; i++) {
        (function (i) {
          let imageObj = new Image();
          imageObj.src = preCacheImages[i];
          imageObj.onload = () => {
            imgCtr++;
            if (imgCtr == preCacheImages.length) {
              callback();
            }
          };
          imageObj.onerror = () => {
            imgCtr++;
            if (imgCtr == preCacheImages.length) {
              callback();
            }
          };
        })(i);
      }
    } else {
      callback();
    }
  };

  render() {
    const { tincanLoaded } = this.state;

    return (
      <Provider store={store}>
        <ResponsiveContainer name={`vl`}>
          <AppContainer tincanLoaded={tincanLoaded} />
        </ResponsiveContainer>
      </Provider>
    );
  }
}

export default App;
