import React, { Component } from "react";
import { SafeAreaView, Keyboard, View, Image, Text, ImageBackground, TouchableOpacity, TextInput, ScrollView, StyleSheet, Modal } from "react-native";
import ArrowGrayComponent from "../../assets/image/ArrowGray";
import BlueButton from "../Component/Buttons/BlueButton";
import DesignerPageNavComponent from "./DesignerPageNav";

export default class MyAccauntComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      keyboardOpen: false,
      VipiskaModal: false,

    }
  }



  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide,
    );
  }


  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow = (event) => {
    this.setState({

      keyboardOpen: true
    })

  }

  _keyboardDidHide = (event) => {
    this.setState({

      keyboardOpen: false

    })

  }


  goToDesignerMain = () => {
    this.props.navigation.navigate('DesignerPage')
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, }}>
        <View style={styles.main}>
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: 11,
              left: 15,
              zIndex: 1
            }}
            onPress={() => this.goToDesignerMain()}
          >
            <ArrowGrayComponent />
          </TouchableOpacity>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 17,
              fontFamily: 'Poppins_600SemiBold',
              marginTop: 18
            }}>
            Мой профиль
          </Text>
          <Modal visible={this.state.VipiskaModal}>
            <ImageBackground
              source={require('../../assets/image/blurBg.png')}
              style={{
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: '90%',
                  height: 389,
                  backgroundColor: '#fff',
                  borderRadius: 20,
                  position: 'relative',

                }}>

                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    width: 22.5,
                    height: 22.5,
                    right: 21.75,
                    top: 21.75,
                  }}
                  onPress={() => this.setState({ VipiskaModal: false })}>
                  <Image
                    source={require('../../assets/image/ixs.png')}
                    style={{
                      width: '100%',
                      height: '100%'
                    }}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    color: '#2D9EFB',
                    fontSize: 26,
                    marginTop: 83,
                    textAlign: 'center',
                    fontFamily: 'Poppins_600SemiBold',
                  }}>
                  Вы хотите скачать{'\n'}выписку
                </Text>
                <View style={[styles.Vipiska, { marginTop: 80 }]}>
                  <TouchableOpacity>
                    <BlueButton name='Подтвердить' />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      width: 285,
                      height: 44,
                      borderWidth: 3,
                      borderColor: '#B5D8FE',
                      borderRadius: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 12
                    }}>
                    <Text
                      style={{
                        color: '#B5D8FE',
                        fontSize: 18,
                        fontFamily: 'Poppins_700Bold',
                      }}>
                      Отменить
                    </Text>
                  </TouchableOpacity>
                </View>

              </View>

            </ImageBackground>
          </Modal>




          <ScrollView style={{ flex: 1, position: 'relative' }}>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 27, }}>
              <Text style={{
                fontSize: 20,
                fontFamily: 'Poppins_500Medium',
              }}>
                Сергей Смирнов
              </Text>
              <Image
                source={require('../../assets/image/ep_edit.png')}
                style={{
                  width: 22,
                  height: 22
                }}
              />
            </View>

            <View style={{ marginTop: 27 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                <Text style={{ fontFamily: 'Poppins_500Medium', }}>Номер телефона</Text>
                <Image
                  source={require('../../assets/image/ep_edit.png')}
                  style={{
                    width: 22,
                    height: 22,
                    marginLeft: 6.28
                  }}
                />
              </View>
              <TextInput
                style={{
                  marginTop: 7,
                  width: '100%',
                  height: 50,
                  borderWidth: 1,
                  borderColor: '#F5F5F5',
                  borderRadius: 6,
                  padding: 10,
                }}
                keyboardType="phone-pad"
                placeholder="+7 (909) 099-99-99"
              />
            </View>

            <View style={{ marginTop: 12 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                <Text style={{ fontFamily: 'Poppins_500Medium', }}>Пароль</Text>
                <Image
                  source={require('../../assets/image/ep_edit.png')}
                  style={{
                    width: 22,
                    height: 22,
                    marginLeft: 25.86
                  }}
                />
              </View>

              <TextInput
                style={{
                  marginTop: 7,
                  width: '100%',
                  height: 50,
                  borderWidth: 1,
                  borderColor: '#F5F5F5',
                  borderRadius: 6,
                  padding: 10,
                }}
                secureTextEntry={true}
                placeholder="**********"
              />
            </View>

            <View style={{ marginTop: 20 }}>
              <Text style={{ fontFamily: 'Poppins_500Medium', }}>Фото диплома/сертификата</Text>
              <Image
                source={require('../../assets/image/certificat.png')}
                style={{
                  width: 70,
                  height: 70,
                  marginTop: 9
                }}
              />

              <TouchableOpacity
                style={{
                  width: 165,
                  height: 38,
                  backgroundColor: '#B5D8FE',
                  borderRadius: 15,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 16,
                }}
                onPress={() => this.setState({ VipiskaModal: true })}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: 'Poppins_500Medium',
                    color: '#FFF'
                  }}>
                  Загрузить
                </Text>

              </TouchableOpacity>
            </View>


          </ScrollView>
        </View>
        {this.state.keyboardOpen === false &&
          <DesignerPageNavComponent active_page={'Профиль'} navigation={this.props.navigation} />
        }
      </SafeAreaView>
    )
  }
}


const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    position: 'relative'
  },
  Vipiska: {
    marginHorizontal: 20,
    alignItems: 'center',
  },
})