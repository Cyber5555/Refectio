import React, { Component } from "react";
import { SafeAreaView, View, Image, Text, Touchable, TouchableOpacity, TextInput, ScrollView, StyleSheet, Modal } from "react-native";
import ArrowGrayComponent from "../../assets/image/ArrowGray";
import Svg, { Path, Rect } from "react-native-svg";
import BlueButton from "../../components/Component/Buttons/BlueButton"


export default class ConfirmTelCustomerComponent extends Component {
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


  goToCustomerPage = () => {
    this.props.navigation.navigate('CustomerMainPage');
    this.setState({ modalVisible: false })
  }
  render() {
    const { pin1, pin2, pin3, pin4, } = this.state
    return (
      <SafeAreaView
        style={{
          backgroundColor: 'white',
          flex: 1,
        }}
      >
        <View style={{ flex: 1, paddingHorizontal: 25 }}>

          <Modal
            visible={this.state.modalVisible}>
            <View style={styles.modalVisible}>
              <View
                style={{
                  marginTop: 174,

                }}>
                <Svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <Path d="M40 75C59.33 75 75 59.33 75 40C75 20.67 59.33 5 40 5C20.67 5 5 20.67 5 40C5 59.33 20.67 75 40 75Z" fill="#B5D8FE" />
                  <Path d="M57.6667 24.3333L35 47L25.6667 37.6667L21 42.3333L35 56.3333L62.3333 29L57.6667 24.3333Z" fill="white" />
                </Svg>
              </View>
              <Text
                style={{
                  color: '#2D9EFB',
                  textAlign: 'center',
                  fontSize: 25,
                  marginTop: 27,
                  fontFamily: 'Poppins_500Medium'
                }}>
                Вы успешно{'\n'}зарегистрировались
              </Text>
              <TouchableOpacity
                style={{
                  marginTop: 170
                }}
                onPress={() => { this.goToCustomerPage() }}>
                <BlueButton name="Войти" />
              </TouchableOpacity>
            </View>
          </Modal>


          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('RegistrationManufacturer')}
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
                Подтверждение {'\n'}Тел. Номера
              </Text>
            </View>

            <View>
              <Text
                style={{
                  color: '#52A8EF',
                  marginTop: 25,
                  lineHeight: 17.61,
                  fontFamily: 'Raleway_500Medium'
                }}>
                На ваш номер телефона осуществлён звонок,
                Пожалуйста введите последние 4 цыфры
              </Text>
            </View>

            <View>
              <Text
                style={{
                  textAlign: 'center',
                  marginTop: 16,
                  color: '#2D9EFB',
                  fontSize: 15,
                  fontFamily: 'Raleway_500Medium'
                }}>
                01:00
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
                  fontFamily: 'Raleway_500Medium'
                }}>
                Отправить код повторно
              </Text>
            </View>
            <View
              style={{
                alignItems: 'center',
                marginTop: 36
              }}>
              <TouchableOpacity
                onPress={() => this.setState({ modalVisible: true })}
              >
                <BlueButton name="Подтвердить" />
              </TouchableOpacity>
            </View>
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
    marginTop: 16
  },
  modalVisible: {
    flex: 1,
    alignItems: 'center',
  }
})