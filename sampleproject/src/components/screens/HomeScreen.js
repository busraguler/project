import React, { Component } from 'react';
import SplashScreen from './SplashScreen';
import DataScreen from './DataScreen';
import WebviewScreen from './WebviewScreen';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';

class HomeScreen extends Component {

  constructor(props){
    super(props)
    this.state = {
      currentScreen: 'SplashScreen',
      data:[],
    }
    setTimeout(() =>{
      this.setState({ currentScreen: ''})
    }, 2000)

  }

  componentWillMount() {
    fetch('https://raw.githubusercontent.com/setur/assessment-mobile-development/master/data/controls.json')
    .then((response) => response.json())
      .then((responseJson) => {
          this.setState({ data: responseJson})
      })
      .catch((error) => {
        console.log(error)
      });
  }

  render() {
    const { currentScreen } = this.state;
    if(currentScreen === 'SplashScreen'){
      return <SplashScreen />
    }
    else {
      return(
        <ScrollableTabView
          initialPage={0}
          tabBarPosition={'bottom'}
          tabBarActiveTextColor={'#cacaca'}
          tabBarBackgroundColor={'#343841'}
          tabBarInactiveTextColor={'#cacaca'}
          tabBarUnderlineStyle={{ backgroundColor: '#cacaca'}}
          tabBarTextStyle={{ fontSize: 14}}
          renderTabBar={() => <ScrollableTabBar />}
        >
          <DataScreen tabLabel="Data" data={this.state.data}/>
          <WebviewScreen tabLabel="Web"/>
        </ScrollableTabView>
      );
    }
  }
}

export default HomeScreen;
