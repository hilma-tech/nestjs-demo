import Constants from 'expo-constants';
import { Platform } from 'react-native';
const { manifest } = Constants;

let localIP = Platform.select({
    web: () => `127.0.0.1`,
    default: () => `${manifest.debuggerHost.split(':').shift()}`
})();

const ENV = {
  dev: {
    apiUrl: `http://${localIP}:3000`
  },
  staging: {
    apiUrl: ""
  },
  prod: {
    apiUrl: ""
  }
};

function getEnvVars(env = "") {
  if (env === null || env === undefined || env === "") return ENV.dev;
  if (env.indexOf("dev") !== -1) return ENV.dev;
  if (env.indexOf("staging") !== -1) return ENV.staging;
  if (env.indexOf("prod") !== -1) return ENV.prod;
}

export default getEnvVars(Constants.manifest.releaseChannel);
