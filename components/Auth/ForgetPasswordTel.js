import React, { Component } from "react";
import { SafeAreaView, View, Image, Text, Touchable, TouchableOpacity, TextInput, ScrollView, StyleSheet, Modal } from "react-native";
import ArrowGrayComponent from "../../assets/image/ArrowGray";
import Svg, { Path, Rect } from "react-native-svg";
import BlueButton from "../Component/Buttons/BlueButton";

export default class ForgetPasswordTelComponent extends Component {
  constructor(props) {
    super(props)

    this.pin1Ref = React.createRef()
    this.pin2Ref = React.createRef()
    this.pin3Ref = React.createRef()
    this.pin4Ref = React.createRef()


    this.state = {
      pin1: "",
      pin2: "",
      pin3: "",
      pin4: "",
      modalVisible: false,
      wrongVerificationMessage: false,
      sendBan: false,
      sendAgainTime: 10,
    };
  }
  goToForgetPassword = () => {
    this.props.navigation.navigate('ForgetPassword');
  }

  goToNewPassword = () => {
    this.props.navigation.navigate('NewPassword');
  }
  render() {
    const { pin1, pin2, pin3, pin4, } = this.state
    return (
      <SafeAreaView style={{ backgroundColor: 'white', flex: 1, }}>
        <View style={{ flex: 1, paddingHorizontal: 25 }}>
          <TouchableOpacity
            style={{ position: 'absolute', left: 15, top: 40 }}
            onPress={() => this.goToForgetPassword()}>
            <ArrowGrayComponent />
          </TouchableOpacity>


          <View>
            <View
              style={{
                marginTop: 102
              }}>
              <Text
                style={{
                  fontSize: 26,
                  color: '#2D9EFB',
                  fontFamily: 'Poppins_500Medium',
                }}>
                Восстановление{'\n'}аккаунта
              </Text>
            </View>

            <View>
              <Text
                style={{
                  color: '#52A8EF',
                  marginTop: 52,
                  lineHeight: 17.61,
                  fontFamily: 'Poppins_400Regular',
                }}>
                Мы отправим 4-х значный код на ваш номер{'\n'}
                телефона для подтверждения личности
              </Text>
            </View>
            <View style={styles.confirmView}>
              <TextInput
                ref={this.pin1Ref}
                value={pin1}
                style={styles.textInput}
                keyboardType="phone-pad"
                onChangeText={(pin1) => {
                  this.setState({ pin1 })
                  if (pin1.length) {
                    this.pin2Ref.current.focus()
                  } else {
                    this.pin1Ref.current.blur()
                  }
                }
                }
                maxLength={1}
              />
              <TextInput
                ref={this.pin2Ref}
                value={pin2}
                style={styles.textInput}
                keyboardType="phone-pad"
                onChangeText={(pin2) => {
                  this.setState({ pin2 })
                  if (pin2.length) {
                    this.pin3Ref.current.focus()
                  } else {
                    this.pin1Ref.current.focus()
                  }
                }
                }
                maxLength={1}
              />
              <TextInput
                ref={this.pin3Ref}
                value={pin3}
                style={styles.textInput}
                keyboardType="phone-pad"
                onChangeText={(pin3) => {
                  this.setState({ pin3 })
                  if (pin3.length) {
                    this.pin4Ref.current.focus()
                  } else {
                    this.pin2Ref.current.focus()
                  }
                }
                }
                maxLength={1}
              />
              <TextInput
                ref={this.pin4Ref}

                value={pin4}
                style={styles.textInput}
                keyboardType="phone-pad"
                onChangeText={(pin4) => {
                  this.setState({ pin4 })
                  if (pin4.length) {
                    this.pin4Ref.current.focus()
                  } else {
                    this.pin3Ref.current.focus()
                  }
                }
                }
                maxLength={1}
              />

            </View>
            <View>
              <Text
                style={{
                  fontSize: 14,
                  marginTop: 8,
                  textAlign: 'center',
                  color: '#B5D8FE',
                  textDecorationLine: 'underline',
                  textDecorationStyle: 'solid',
                  textDecorationColor: '#B5D8FE',
                  fontFamily: 'Raleway_500Medium',
                }}>
                Отправить код повторно
              </Text>
            </View>
            <TouchableOpacity
              style={{ marginTop: 35, alignSelf: 'center' }}
              onPress={() => { this.goToNewPassword() }}
            >
              <BlueButton name="Подтвердить" />
            </TouchableOpacity>
          </View>
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
    marginTop: 52
  },
  modalVisible: {
    flex: 1,
    alignItems: 'center',
  }
})