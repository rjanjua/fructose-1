import { AppRegistry } from "react-native";
import fructose from "../../packages/app/src";
import { loadStories } from "./components"; // eslint-disable-line import/no-unresolved

AppRegistry.registerComponent("e2eTests", () => fructose(loadStories));
