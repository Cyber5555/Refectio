import React, { Component } from "react";
import { SafeAreaView, Keyboard, View, Image, Text, ImageBackground, TouchableOpacity, TextInput, ScrollView, StyleSheet, Modal } from "react-native";
import ArrowGrayComponent from "../../assets/image/ArrowGray";
import { AuthContext } from "../AuthContext/context";
import BlueButton from "../Component/Buttons/BlueButton";
import DesignerPageNavComponent from "./DesignerPageNav";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class MyAccauntComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      keyboardOpen: false,
      VipiskaModal: false,

      phone: '',

      chcngeName: '',
      chcngeSurname: '',
      chcngeNameModal: false
    }
  }

  static contextType = AuthContext

  componentDidMount() {

    const { navigation } = this.props;
    this.getAuthUserProfile()


    this.focusListener = navigation.addListener("focus", () => {

      this.getAuthUserProfile()

    });


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

  getAuthUserProfile = async () => {
    let myHeaders = new Headers();
    let userToken = await AsyncStorage.getItem('userToken');
    let AuthStr = 'Bearer ' + userToken;
    myHeaders.append("Authorization", AuthStr);
    myHeaders.append("Content-Type", "multipart/form-data");
    await fetch('http://80.78.246.59/Refectio/public/api/AuthUserProfile', {
      method: 'GET',
      headers: myHeaders
    })
      .then(response => response.json())
      .then(res => {
        console.log(res);
        this.setState({
          phone: res.data[0].phone,
          chcngeName: res.data[0].name,
          chcngeSurname: res.data[0].surname,

        })
        console.log(this.state.logo);
      })
  }

  chcngeName = async () => {
    const { chcngeName, chcngeSurname } = this.state

    let myHeaders = new Headers();
    let userToken = await AsyncStorage.getItem('userToken')
    let AuthStr = "Bearer " + userToken
    myHeaders.append("Authorization", AuthStr);

    let formdata = new FormData();
    formdata.append("name", chcngeName);
    formdata.append("surname", chcngeSurname);

    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    fetch("http://80.78.246.59/Refectio/public/api/UpdateProfileNameSurnameDesigner", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        if (result.status === true) {
          this.setState({
            chcngeName: '',
            chcngeSurname: '',
            chcngeNameModal: false
          })
        }
      })
      .catch(error => console.log('error', error));
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
            onPress={() => this.props.navigation.navigate('DesignerPage')}
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


          <Modal visible={this.state.chcngeNameModal}>
            <ImageBackground source={require('../../assets/image/blurBg.png')} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <View style={{ width: '90%', backgroundColor: '#fff', borderRadius: 20, position: 'relative' }}>
                <TouchableOpacity style={{ position: 'absolute', right: 18, top: 18 }} onPress={() => this.setState({ chcngeNameModal: false })}>
                  <Image
                    source={require('../../assets/image/ixs.png')}
                    style={{ width: 22.5, height: 22.5, }}
                  />
                </TouchableOpacity>

                <View style={{ marginTop: 70, marginLeft: 25 }}>

                  <Text style={{ fontFamily: 'Poppins_500Medium', }}>Изменение имени</Text>
                  <TextInput
                    style={{
                      marginTop: 7,
                      width: '90%',
                      height: 50,
                      borderWidth: 1,
                      borderColor: '#F5F5F5',
                      borderRadius: 6,
                      padding: 10,
                    }}
                    placeholder={this.state.chcngeSurname}
                    value={this.state.chcngeName}
                    onChangeText={(value) => this.setState({ chcngeName: value })}
                  />
                </View>
                <View style={{ marginTop: 12, marginLeft: 25 }}>

                  <Text style={{ fontFamily: 'Poppins_500Medium', }}>Изменение фамилии</Text>
                  <TextInput
                    style={{
                      marginTop: 7,
                      width: '90%',
                      height: 50,
                      borderWidth: 1,
                      borderColor: '#F5F5F5',
                      borderRadius: 6,
                      padding: 10,
                    }}
                    placeholder={this.state.chcngeSurname}
                    value={this.state.chcngeSurname}
                    onChangeText={(value) => this.setState({ chcngeSurname: value })}
                  />
                </View>
                <TouchableOpacity style={{ alignSelf: 'center', marginTop: 50, marginBottom: 54 }} onPress={() => { this.chcngeName() }}>
                  <BlueButton name='Сохранить' />
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </Modal>


          <ScrollView style={{ flex: 1, position: 'relative' }}>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 27, }}>
              <Text style={{ fontSize: 20, fontFamily: 'Poppins_500Medium', }}>{this.state.chcngeName} {this.state.chcngeSurname}</Text>
              <TouchableOpacity onPress={() => this.setState({ chcngeNameModal: true })}>
                <Image
                  source={require('../../assets/image/ep_edit.png')}
                  style={{
                    width: 22,
                    height: 22
                  }}
                />
              </TouchableOpacity>
            </View>


            <View style={{ marginTop: 27 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                <Text style={{ fontFamily: 'Poppins_500Medium', }}>Номер телефона</Text>
                <TouchableOpacity onPress={() => {
                  this.props.navigation.navigate('EditPhoneNumberDesigner')
                }}>
                  <Image
                    source={require('../../assets/image/ep_edit.png')}
                    style={{
                      width: 22,
                      height: 22,
                      marginLeft: 6.28
                    }}
                  />
                </TouchableOpacity>
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
                placeholder={this.state.phone}
                editable={false}
              />
            </View>

            <View style={{ marginTop: 12 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                <Text style={{ fontFamily: 'Poppins_500Medium', }}>Пароль</Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('EditPasswordDesigner')}>
                  <Image
                    source={require('../../assets/image/ep_edit.png')}
                    style={{
                      width: 22,
                      height: 22,
                      marginLeft: 25.86
                    }}
                  />
                </TouchableOpacity>
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
                placeholder="*************"
                editable={false}
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


            <TouchableOpacity
              onPress={async () => {
                let foundUser = {
                  userToken: this.state.userToken,
                  userRole: this.state.role_id
                }
                this.context.signOut(foundUser);
              }}

              style={{
                width: 165,
                height: 38,
                backgroundColor: '#B5D8FE',
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                marginBottom: 40,
                marginTop: 100
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 18,
                  fontFamily: 'Poppins_500Medium',
                }}>
                Выйти
              </Text>
            </TouchableOpacity>

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