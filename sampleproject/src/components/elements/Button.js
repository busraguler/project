import React, { Component } from 'react';
import { Text,View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class Button extends Component {

  getHeigth(){
    let size = this.props.size;
    return size ? (size === 'small' ? 40 : 45) : 60;
  }

  getFontSize(){
    let size = this.props.size;
      return size ? (size === 'small' ? 12 : 14) : 13;
  }

  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        disabled={this.props.disabled || false}
        style={[
          this.props.style,
          {
            borderColor: this.props.borderColor,
            backgroundColor: this.props.backgroundColor,
            opacity: this.props.disabled ? 0.7 : 1,
            height: this.getHeigth(),
            borderRadius: this.props.borderRadius,
            paddingHorizontal: 10,
            borderWidth: this.props.isborder ? 1 : 0,
          }
        ]}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {this.props.icon &&
            <View
              style={{
                  marginHorizontal: 5,
                  justifyContent: 'center',
                  alignItems: 'center'
              }}
            >
              <Icon
                name={this.props.icon}
                color={this.props.color}
                size={this.getFontSize()}
              />
            </View>
          }

          <Text
            style={ [
              this.props.textStyle,
              {
                textAlign: 'center',
                fontSize: this.getFontSize(),
                color: this.props.color
              }
            ]}
          >
            {this.props.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default Button;
