import React, { Component } from 'react';
import { Text,View, TouchableOpacity, Picker , StyleSheet, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';


class Pickerselect extends Component {

  getHeigth(){
    let size = this.props.size;
    return size ? (size === 'small' ? 40 : 45) : 120;
  }

  getFontSize(){
    let size = this.props.size;
    return size ? (size === 'small' ? 12 : 14) : 13;
  }

  render() {
    return (
      <View>
        <TouchableOpacity
          onPress={this.props.onPress}
          style={[
            this.props.style,
            {
              opacity: this.props.disabled ? 0.7 : 1,
              height: this.getHeigth(),
              borderRadius: this.props.borderRadius,
              backgroundColor:this.props.backgroundColor,
              borderColor: this.props.borderColor,
              borderWidth: this.props.isborder ? 1 : 0,
              alignItems: 'center',
              flexDirection: 'row',
              flex:1
            }
          ]}
          >
           <Text
             style={[
               this.props.textStyle,
               {
                 flex:1,
                 textAlign:'left',
                 fontSize: this.getFontSize(),
                 color: this.props.color
               }
             ]}
            >
            {this.props.pickerTitle}
           </Text>
           <View
             style={{
                 flex:1,
                 alignItems: 'flex-end',
                 marginRight: 10,
                 opacity: 0.4
               }}
            >
             <Ionicons
               name={'chevron-down-outline'}
               color={'#5d5d5d'}
               size={20}
              />
           </View>
        </TouchableOpacity>
        <Modal
          backdropColor={'#000'}
          backdropTransitionInTiming={500}
          backdropTransitionOutTiming={500}
          onBackdropPress={this.props.closeModal}
          onSwipeComplete={this.props.closeModal}
          animationIn='slideInUp'
          swipeDirection={['up', 'left', 'right', 'down']}
          isVisible={this.props.isVisible}
          style={{ justifyContent: 'center', marginHorizontal: 10}}
        >
          <View style={styles.modalStyle}>
            <Text style={{ textAlign: 'left' ,color: '#4c4b4b', fontWeight: 'bold'}}>
              {this.props.listTitle}
            </Text>
            {this.props.getList}
          </View>
        </Modal>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  modalStyle:{
     backgroundColor: 'white',
     paddingVertical: 30,
     justifyContent: 'center',
     alignItems: 'center',
     borderRadius: 4,
     borderColor: 'rgba(0, 0, 0, 0.1)',
     flexWrap:'wrap',
  },
});
export default Pickerselect;
