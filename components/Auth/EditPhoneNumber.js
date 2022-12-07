import React, { Component } from "react";
import { SafeAreaView, View, Image, Text, Touchable, TouchableOpacity, TextInput, ScrollView, StyleSheet, Modal, KeyboardAvoidingView, } from "react-native";
import ArrowGrayComponent from "../../assets/image/ArrowGray";
import Svg, { Path, Rect } from "react-native-svg";
import BlueButton from "../Component/Buttons/BlueButton"
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaskInput from "react-native-mask-input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default class EditPhoneNumberComponent extends React.Component {
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

    await fetch("http://80.78.246.59/Refectio/public/api/newnumberProizvoditel", requestOptions)
      .then(response => response.json())
      .then(result => {

        // console.log(result);

        if (result.status === true && result.message == 'code send your phone number') {
          this.props.navigation.navigate('EditPhoneNumberConfirm', {
            params: this.state.phone
          });
        }
        else {
          this.setState({ phone_error: true })
        }
      })
      .catch(error => console.log('error', error));
  }

  goToCustomerPage = () => {
    this.props.navigation.navigate('LoginScreen');
  }
  render() {
    return (
      <SafeAreaView
        style={{ backgroundColor: 'white', flex: 1, }}
      >

        <KeyboardAwareScrollView style={{ flex: 1, paddingHorizontal: 25,position: 'relative' }}>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('CustomerMyAccaunt')}
            style={{
              position: 'absolute',
              top: 18.29,
              left: -10,
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
                autoFocus={false}
                keyboardType="phone-pad"
                placeholder="+7 (975) 991-99-99"
                style={[{ borderWidth: 1, padding: 10, width: '100%', borderRadius: 5, borderColor: '#F5F5F5' },
                this.state.login_error ? { borderColor: 'red' } : { borderColor: '#F5F5F5' }]}
                value={this.state.phone}
                onChangeText={(text, unmasked, obfuscated) => {
                  this.setState({ phone: text })
                }}
                mask={['+', '7', ' ', '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/,]}
              />
            </View>





          </View>
          <TouchableOpacity
            style={{ alignSelf: 'center', marginTop: '30%' }}
            onPress={() => {
              if (this.state.phone !== '') {
                this.sendPhoneNumber()
              }
            }}>
            <BlueButton name="Подтвердить" />
          </TouchableOpacity>
        </KeyboardAwareScrollView>

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