import React, { Component } from 'react';
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

class SplashScreen extends Component {

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <LinearGradient colors={['#3e3e3e', '#d2d2d2', '#f5f5f5']} style={styles.backgroundContainer}>
          <View>
            <Text style={styles.title}>Setur</Text>
          </View>
        </LinearGradient>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    opacity: 0.8,
    justifyContent:'center',
    alignItems: 'center',
  },
  title: {
    color: '#8b8682',
    fontSize: 25
  },
});


export default SplashScreen;
