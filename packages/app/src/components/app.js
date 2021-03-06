import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, View } from "react-native";

import FructoseApp from "./fructoseView";
import NavigationWrapper from "./navigation/navigationWrapper";
import { version } from "../../../../package.json";

const knobs = {
  select: () => {},
  color: () => {},
  selectV2: () => {}
};

const actions = {
  action: () => {},
  decorateAction: () => () => {}
};

const styles = StyleSheet.create({
  header: {
    color: "white",
    fontSize: 40,
    textAlign: "center"
  },
  version: {
    padding: 10,
    color: "white",
    fontSize: 20,
    textAlign: "left"
  },
  text: {
    paddingTop: 10,
    color: "white",
    fontSize: 16,
    textAlign: "center"
  },
  view: {
    backgroundColor: "lightpink",
    height: "100%",
    width: "100%",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between"
  }
});

const LoadingScreen = () => (
  <View style={styles.view}>
    <Text style={styles.text}>
      Brought to you by {"\n"} The Times Tooling Team
    </Text>
    <View>
      <Text style={styles.header}>🛠 FRUCTOSE 🛠</Text>
      <Text style={styles.text}>
        Swipe right from left edge for component menu
      </Text>
    </View>
    <Text style={styles.version}>Version: {version}</Text>
  </View>
);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      component: () => <LoadingScreen />
    };

    this.loadComponent = name => {
      const component = this.props.components[name];
      if (!component)
        throw new Error(`${name} does not exist in the componentStore`);
      this.setState({ component });
    };

    this.sendComponentList = () => {
      this.props.comms.socket.emit(
        "loaded-app-components",
        this.props.componentList
      );
    };
  }

  componentDidMount() {
    this.props.comms.events.on("load", this.loadComponent);
    this.props.comms.socket.on("load-on-device", name =>
      this.props.comms.events.emit("load", name)
    );
    this.props.comms.socket.on("get-app-components", this.sendComponentList);
    this.props.comms.socket.emit("fructose-app-ready");
  }

  componentDidUpdate() {
    this.props.comms.socket.emit("loadedOnDevice");
  }

  render() {
    return (
      <NavigationWrapper
        componentList={this.props.componentList}
        events={this.props.comms.events}
      >
        <FructoseApp
          component={this.state.component(knobs, actions)}
          events={this.props.comms.events}
        />
      </NavigationWrapper>
    );
  }
}

App.propTypes = {
  components: PropTypes.objectOf(PropTypes.func).isRequired,
  componentList: PropTypes.arrayOf(PropTypes.string).isRequired,
  comms: PropTypes.shape({
    events: PropTypes.shape({
      emit: PropTypes.func.isRequired,
      on: PropTypes.func.isRequired
    }).isRequired,
    socket: PropTypes.shape({
      emit: PropTypes.func.isRequired,
      on: PropTypes.func.isRequired
    }).isRequired
  }).isRequired
};

export default App;
