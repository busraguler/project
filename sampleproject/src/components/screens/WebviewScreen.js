import React, { Component } from 'react';
import { WebView } from 'react-native-webview';

class WebviewScreen extends Component {

  render() {
     return <WebView source={{ uri: 'https://www.setur.com.tr/' }} />;
   }
}
export default WebviewScreen;
