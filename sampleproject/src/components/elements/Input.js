import React, { Component } from 'react';
import { Text,View, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

class Input extends Component {

  getHeigth(){
    let size = this.props.size;
    return size ? (size === 'small' ? 40 : 45) : 60;
  }

  getFontSize(){
    let size = this.props.size;
    return size ? (size === 'small' ? 12 : 14) : 13;
  }

  getIconSize(){
    let size = this.props.iconSize;
    return size ? (size === 'small' ? 18 : 24) : 13;
  }

  render() {
    return (
      <View
        style={[
          this.props.style,
          {
            opacity: this.props.disabled ? 0.7 : 1,
            height: this.getHeigth(),
            borderRadius: this.props.borderRadius,
            backgroundColor:this.props.backgroundColor,
            borderColor: this.props.borderColor,
            borderWidth: this.props.isborder ? 1 : 0,
            flexDirection: 'row',
          }
        ]}
      >
        {this.props.leftIcon &&
          <TouchableOpacity
            onPress={this.props.onPressLeftIcon}
            style={{
              flex: 0.5,
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 10
            }}
          >

          <Icon
            name={this.props.leftIcon}
            color={this.props.iconColor}
            size={this.getIconSize()}
          />
          </TouchableOpacity>
        }
        <TextInput
          placeholder={this.props.placeholder}
          placeholderTextColor={this.props.placeholderTextColor}
          underLineColorAndroid={this.props.underLineColorAndroid}
          secureTextEntry={this.props.secureTextEntry}
          keyboardType={this.props.keyboardType}
          value={this.props.value}
          multiline={this.props.multiline || false}
          numberOfLines={this.props.numberOfLines}
          onChangeText={this.props.onChangeText}
          style={[
            this.props.textStyle,
            {
              fontSize: this.getFontSize(),
              color: this.props.color
            }
          ]}
        />
          {this.props.rightIcon &&
            <TouchableOpacity
              onPress= {this.props.onPressRightIcon}
              style={{
                flex: 0.5,
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 10
              }}
            >
            <Ionicons
              name={this.props.rightIcon}
              color={this.props.iconColor}
              size={this.getIconSize()}
            />
            </TouchableOpacity>
          }
      </View>
    );
  }
}

export default Input;
