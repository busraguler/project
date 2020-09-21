import React, { Component } from 'react';
import { View, Text, StyleSheet,Share, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SplashScreen from './SplashScreen';
import Input from '../elements/Input';
import Button from '../elements/Button';
import Pickerselect from '../elements/Pickerselect';


class DataScreen extends Component {

  constructor(props){
    super(props)
    this.state = {
      data:[],
      isVisible: false,
      option: [],
      targetIndex: 0,
      caption: '',
      multiple: '',
      string: ''
    }
  }

  componentWillMount() {
    Object.keys(this.props.data.controls).map((i)=>{
      var input = this.props.data.controls[i]
      this.setState({["input-"+i]:input.type === 'input'?'':[]})
    })
  }

  reset(){
    this.props.data.controls.map((item,key)=>{
      this.setState({ ['input-'+key]: [] });
    })

    this.setState({ multiple: '' });
    this.setState({ string: '' });
  }

  updateInputState(value,key){
    this.setState({ ['input-'+key]: value });
  }

  openModal(item,index){

    this.setState({ isVisible: true})
    this.setState({ option: item})
    this.setState({ targetIndex:index });

    this.props.data.controls.map((i,k)=>{
      if(k == index){
        this.setState({ caption: i.caption})
        this.setState({ multiple: i.multiple})
      }
    })
  }

  closeModal(){
    this.setState({ isVisible: false})
  }

  chooseValue(key) {

    var index = this.state.targetIndex;
    if(typeof this.state['input-'+ index] === 'undefined'){
      this.state['input-'+index] = [];
      this.setState({ ['input-'+index]: this.state['input-'+index] });
    }

    if(this.state['input-'+index].length === 0){
      this.state['input-'+index].push(key);
      this.setState({ ['input-'+index]: this.state['input-'+index] });
    }
    else if(this.state['input-'+index].length >= 1){

      if(this.state.multiple && this.state.multiple  == true ){
        if(this.state['input-'+index].indexOf(key) !== -1){
          this.state['input-'+index].splice(key, 1);
          this.setState({ ['input-'+index]: this.state['input-'+index] });
        }
        else{
          this.state['input-'+index].push(key);
          this.setState({ ['input-'+index]: this.state['input-'+index] });
        }
      }
      else{
        this.state['input-'+index] = [];
        this.state['input-'+index].push(key);
        this.setState({ ['input-'+index]: this.state['input-'+index] });
      }
    }
    else {

    }
  }

  chosen(key){
    var index = this.state.targetIndex;
    if(this.state['input-'+index].length > 0){
      if(this.state['input-'+index].indexOf(key) != -1){
        return(
            <Ionicons
              name={'checkmark'}
              color={'#4c4b4b'}
              size={20}
            />
        );
      }
    }
    else{
      return(
          <Ionicons
            name={'checkmark'}
            color={'#e8e8e8'}
            size={20}
          />
      );
    }
  }

  submitForm(){
    var string = "";
    var nullValue = 0;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    this.props.data.controls.map((item,key) => {
      var inputMail = this.state["input-"+key];

      if(this.state["input-"+key] == ""){
        nullValue++;
      }
      else {
        if(item.validator){
          if(inputMail.length >= 1){
            if(reg.test(inputMail) === false) {
              alert("E-posta hatalı");
            }
          }
        }
        string += item.caption + " : " + this.state["input-"+key] + "\n";
      }
    })

    if(nullValue == 0){
        return string;
    }
    else{
        alert("Lütfen tüm değerleri doldurunuz.");
    }
  }

  getList(){
    return(
      Object.entries(this.state.option).map(([key,item])=>{
        return (
          <View style={{ flexDirection: 'row', marginHorizontal: 30, marginVertical: 5 }}>
            <TouchableOpacity
              onPress={() => this.chooseValue(item)}
              style={{
                flex: 1,
                height: 40,
                paddingVertical: 30,
                flexDirection:'row',
                alignItems: 'center',
              }}>
              <View
                key={key}
                style={{
                  flex: 1,
                  alignItems: 'flex-start'
                }}
               >
                <Text style={styles.modalText}>{item}</Text>
               </View>
               <View
                 style={{
                   flex: 1,
                   alignItems: 'flex-end'
                 }}
                >
                {this.chosen(item)}
                </View>
            </TouchableOpacity>
          </View>

        )
      })
    )
  }

  getForm(){
    return(
      this.props.data.controls.map((item,key) => {
       if(item.type === 'input'){
         return(
           <Input
             value={this.state.inputValue}
             onChangeText={value => this.updateInputState(value,key)}
             backgroundColor='#D2D2D2'
             placeholder={item.caption}
             placeholderTextColor={'#5d5d5d'}
             size={'small'}
             borderRadius={3}
             color={'#5d5d5d'}
             style={{
               marginHorizontal: 20,
               marginVertical: 10
             }}
             textStyle={{
               marginHorizontal: 10,
               fontWeight: '300',
               opacity: 0.9,
             }}
           />
         )
       }
       if(item.type === 'choice'){
         return(
           <View>
             <Pickerselect
               backgroundColor='#D2D2D2'
               size={'small'}
               color={'#5d5d5d'}
               borderRadius={3}
               pickerTitle={this.state['input-'+key].length== 0 ? item.caption : this.state['input-'+key]}
               listTitle={this.state.caption + " seçimi yapınız."}
               onPress={() => this.openModal(item.items,key)}
               isVisible={this.state.isVisible}
               closeModal={() => this.closeModal()}
               getList={this.getList()}
               style={{
                 marginHorizontal: 20,
                 marginVertical: 10
               }}
               textStyle={{
                 marginHorizontal: 15,
                 fontWeight: '300',
                 opacity: 0.8,
               }}
             />
           </View>
         )
       }
     })
    )
  }

  onShare = async () => {
    var string = this.submitForm();
      try {
        if(string){
          const result = await Share.share({
            message: string
          });
          if (result.action === Share.sharedAction) {
            if (result.activityType) {

            } else {
            this.reset();
            }
          } else if (result.action === Share.dismissedAction) {

          }
        }
      } catch (error) {
        alert(error.message);
      }
  };

  render() {
    const onShare = async () => {
      var string = this.submitForm();
        try {
          if(string){
            const result = await Share.share({
              message: string
            });
            if (result.action === Share.sharedAction) {
              if (result.activityType) {

              } else {
              this.reset();
              }
            } else if (result.action === Share.dismissedAction) {

            }
          }
        } catch (error) {
          alert(error.message);
        }
    };
    return(
      <SafeAreaView style={{ flex: 1, backgroundColor:'#fff' }}>
        <View style={{ flex: 1, backgroundColor:'#fdfeff' }}>
          <View style={{ flex: 1 }}>
          </View>
          <Text
            style={{
              color: '#65605e',
              textAlign: 'center',
              fontSize: 16
            }}
          >
            ..Lütfen Formu Doldurunuz..
          </Text>
          <View style={styles.formStyle}>
            <View style={{ flex: 0.3}}>
            </View>
            <View style={{ flex: 2.4}}>
              <ScrollView>
                {this.getForm()}
                <Button
                  onPress={this.onShare}
                  backgroundColor={'#36446f'}
                  borderRadius={3}
                  size={'small'}
                  color={'#fff5ee'}
                  title={'GÖNDER'}
                  style={{
                    marginHorizontal: 20,
                    marginVertical: 10
                  }}
                  textStyle={{
                    fontWeight: '300',
                    opacity: 0.8,
                  }}
                />
              </ScrollView>
            </View>
            <View style={{ flex: 0.3}}>
            </View>
          </View>
          <View style={{ flex: 1}}>
          </View>
        </View>
      </SafeAreaView>
    );
  }

}

const styles = StyleSheet.create({
  modalStyle:{
     backgroundColor: 'white',
     paddingVertical: 40,
     justifyContent: 'center',
     alignItems: 'center',
     borderRadius: 4,
     borderColor: 'rgba(0, 0, 0, 0.1)',
     flexWrap:'wrap',
  },
  formStyle: {
    flex: 3,
    backgroundColor: '#ffffff',
    margin: 20,
    borderRadius: 10,
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    color: '#4c4b4b',
    fontSize: 12
  },
});



export default DataScreen;
