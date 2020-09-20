import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import SplashScreen from './components/screens/SplashScreen';
import HomeScreen from './components/screens/HomeScreen';
import WebviewScreen from './components/screens/WebviewScreen';
import DataScreen from './components/screens/DataScreen';

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="root">
        <Scene key="homeScreen" initial hideNavBar={true} component={HomeScreen} />
        <Scene key="dataScreen" hideNavBar={true} component={DataScreen} />
        <Scene key="webviewScreen" hideNavBar={true} component={WebviewScreen} />
        <Scene key="splashScreen" hideNavBar={true}component={SplashScreen} />
      </Scene>
    </Router>
  );
};

export default RouterComponent;
