import React, { Component } from "react";
import { SafeAreaView, View, Image, Text, Touchable, TouchableOpacity, TextInput, ScrollView, StyleSheet, Modal } from "react-native";
import ArrowGrayComponent from "../../assets/image/ArrowGray";
import Svg, { Path, Rect } from "react-native-svg";
import BlueButton from "../Component/Buttons/BlueButton"
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaskInput from "react-native-mask-input";


export default class EditPhoneNumberDesignerComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      phone: '',
    };
  }

  sendPhoneNumber = async () => {
    let myHeaders = new Headers();
    let userToken = await AsyncStorage.getItem('userToken')
    let AouthStr = "Bearer " + userToken
    myHeaders.append("Content-Type", "multipart/form-data");
    myHeaders.append("Authorization", AouthStr);


    let formdata = new FormData();
    formdata.append("phone", this.state.phone);

    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    await fetch("http://80.78.246.59/Refectio/public/api/newnumberDesigner", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        console.log(this.state.phone, 'uxarkumenq')

        if (result.status === true && result.message[0] == 'code send your phone number') {
          this.props.navigation.navigate('EditPhoneNumberDesignerConfirm', {
            params: this.state.phone
          });
        }
      })
      .catch(error => console.log('error', error));
  }

  goToCustomerPage = () => {
    this.props.navigation.navigate('LoginScreen');
  }
  render() {
    return (
      <SafeAreaView style={{ backgroundColor: 'white', flex: 1, }} >
        <View style={{ flex: 1, paddingHorizontal: 25, position: 'relative' }}>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('MyAccaunt')}
            style={{
              position: 'absolute',
              top: 18.29,
              left: 15,
              zIndex: 100,
            }}>
            <ArrowGrayComponent />
          </TouchableOpacity>

          <View>
            <View
              style={{
                marginTop: 86
              }}>
              <Text
                style={{
                  fontSize: 26,
                  color: '#2D9EFB',
                  fontFamily: 'Poppins_500Medium'
                }}>
                Изменение Номера
              </Text>
            </View>

            <View>
              <Text
                style={{
                  color: '#52A8EF',
                  marginTop: 46,
                  fontFamily: 'Raleway_500Medium'
                }}>
                Чтобы изменить номер введите его ниже
              </Text>
            </View>

            <View>
              <Text
                style={{
                  fontFamily: 'Poppins_500Medium',
                  lineHeight: 23,
                  fontSize: 15,
                  marginTop: 56,
                  marginBottom: 5,
                  color: '#5B5B5B'
                }}
              >
                Новый номер телефона
              </Text>
              <MaskInput
                underlineColorAndroid="transparent"
                keyboardType="phone-pad"
                placeholder="+7 (975) 991-99-99"
                style={{
                  borderWidth: 1,
                  padding: 10,
                  width: '100%',
                  borderRadius: 5,
                  borderColor: '#F5F5F5'
                }}
                mask={['+', '7', ' ', '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/,]}
                value={this.state.phone}
                onChangeText={(value) => { this.setState({ phone: value }) }}
              />
            </View>





          </View>
          <TouchableOpacity style={{ alignSelf: 'center', position: 'absolute', bottom: '10%' }} onPress={() => this.sendPhoneNumber()}>
            <BlueButton name="Подтвердить" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  textInput: {
    width: 50,
    height: 60,
    borderRadius: 8,
    paddingHorizontal: 18,
    borderColor: '#F5F5F5',
    borderWidth: 2,
  },
  confirmView: {
    marginHorizontal: 26,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16
  },
})