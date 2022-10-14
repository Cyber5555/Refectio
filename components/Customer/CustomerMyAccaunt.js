import React from "react"
import { SafeAreaView, Keyboard, StyleSheet, View, Image, Text, Touchable, TouchableOpacity, TextInput, ScrollView, Modal, ImageBackground } from "react-native"

import ArrowGrayComponent from "../../assets/image/ArrowGray"
import CustomerMainPageNavComponent from "./CustomerMainPageNav";
import Svg, { Path, Rect } from "react-native-svg";
import AsyncStorage from "@react-native-async-storage/async-storage";








export default class CustomerMyAccauntComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      keyboardOpen: false,
      category: false,
      gorod: false,

      gorodModal: false,
      gorodArray: [1, 5, 5, 5, 5,],
      gorodFilter: false,
      count: 0,
      authUserState: [],
      options: [
        1, 2, 45,
      ],
      id: '',

      urlImage: 'http://80.78.246.59/Refectio/storage/app/uploads/',
    }
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
        this.setState({
          authUserState: res.data,
          gorodArray: res.data[0].city_of_sales_manufacturer,
          id: res.data[0].id
        })
      })
    // console.log(this.state.gorodArray);
  }


  componentDidMount() {
    this.getAuthUserProfile()
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


  enterCheckBox = (items) => {
    let filterSort = this.state.gorodArray;
    let find = true
    filterSort.find((item) => {
      if (item == items) {
        find = false
      }
    })
    if (find) {
      filterSort.push(items)
      this.setState({ count: this.state.count + 1 });
    }
    this.setState({ gorodArray: filterSort })
  }

  verifyCheckBox = (items) => {
    let filterSort = this.state.gorodArray
    let find = false
    filterSort.find((item) => {
      if (item == items) {
        find = true
      }
    })
    if (find) {
      const index = filterSort.indexOf(items);
      filterSort.splice(index, 1);
      this.setState({ count: this.state.count - 1 });
    }
    this.setState({ gorodArray: filterSort })
  }


  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.main}>

          <Modal visible={this.state.gorodModal}>
            <ImageBackground
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              source={require('../../assets/image/blurBg.png')}
            >
              <View
                style={{
                  width: '90%',
                  height: '90%',
                  backgroundColor: '#fff',
                  borderRadius: 20,
                  position: 'relative',
                  paddingHorizontal: 15,
                }}
              >
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    right: 18,
                    top: 18,
                  }}
                  onPress={() => this.setState({ gorodModal: false })}>
                  <Image
                    source={require('../../assets/image/ixs.png')}
                    style={{
                      width: 22.5,
                      height: 22.5,
                    }}
                  />
                </TouchableOpacity>

                <Text
                  style={{
                    marginTop: 70,
                    fontSize: 26,
                    textAlign: 'center',
                    color: '#2D9EFB',
                    fontFamily: 'Poppins_500Medium',
                  }}>
                  Города
                </Text>
                <View
                  style={{
                    marginTop: 41,
                    height: 50
                  }}>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}>
                    {
                      this.state.gorodArray.map((item, index) => {
                        return (
                          <View
                            key={index}
                            style={{
                              position: 'relative',
                              marginRight: 10,
                              marginTop: 10,
                            }}
                          >
                            <Text
                              style={{
                                paddingHorizontal: 16,
                                paddingVertical: 10,
                                backgroundColor: '#F5F5F5',
                                borderRadius: 8,
                                fontFamily: 'Poppins_500Medium',
                              }}>
                              {item}
                            </Text>
                            <TouchableOpacity
                              onPress={() => {
                                this.verifyCheckBox(item)

                              }}
                              style={{
                                position: 'absolute',
                                right: -5,
                                top: -5,
                                // borderWidth: 1,
                              }}>
                              <Image
                                source={require('../../assets/image/ixs.png')}
                                style={{
                                  width: 12,
                                  height: 12,
                                }}
                              />
                            </TouchableOpacity>
                          </View>
                        )
                      })
                    }
                  </ScrollView>
                </View>
                {/* dropDown  start*/}

                <View style={styles.gorodFilter}>
                  <View
                    style={{
                      flexDirection: 'row',
                      position: 'relative',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      style={{
                        borderWidth: 1,
                        borderColor: '#F5F5F5',
                        padding: 10,
                        width: '100%',
                        borderRadius: 6,
                        position: 'relative',
                        height: 45,
                        marginRight: 12

                      }}
                      onPress={() => !this.state.gorodFilter ? this.setState({ gorodFilter: true }) : this.setState({ gorodFilter: false })}
                    >
                      <Text style={{ color: "#000", fontFamily: 'Poppins_500Medium', }}>Города</Text>
                      <View style={{ position: 'absolute', right: 17, bottom: 18 }}>
                        {!this.state.gorodFilter &&
                          <Svg width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path d="M1 1L9 9L17 1" stroke="#888888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                          </Svg>
                        }
                        {this.state.gorodFilter &&
                          <Svg width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path d="M1 9L9 1L17 9" stroke="#888888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                          </Svg>
                        }

                      </View>
                    </TouchableOpacity>

                  </View>
                  <View
                    style={this.state.gorodFilter ? styles.setGorodFilterActive : styles.setGorodFilter}>
                    <ScrollView nestedScrollEnabled={true} >
                      {
                        this.state.options.map((item, index) => {
                          return (
                            <TouchableOpacity
                              key={index}
                              style={{
                                width: '100%',
                                justifyContent: 'center',
                                textAlign: 'left',
                              }}
                              onPress={(count) => {
                                this.enterCheckBox(item.city_name)

                              }}
                            >
                              <Text style={{ textAlign: 'left', paddingVertical: 10, fontFamily: 'Poppins_500Medium', }}>
                                {item.items}
                              </Text>

                            </TouchableOpacity>
                          )

                        })
                      }
                    </ScrollView>
                  </View>
                </View>

                {/* dropDown end */}
              </View>
            </ImageBackground>
          </Modal>


          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('CustomerMainPage')}
            style={{
              position: 'absolute',
              top: 10,
              left: 15,
              zIndex: 1,
            }}>
            <ArrowGrayComponent />
          </TouchableOpacity>
          <View style={styles.container}>
            <Text
              style={{
                fontSize: 17,
                fontFamily: 'Poppins_600SemiBold',
                textAlign: 'center',
                marginTop: 18.29,
              }}>
              Мой профиль
            </Text>


          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            {
              this.state.authUserState.map((item, index) => {
                return (
                  <View key={index} style={{ flexDirection: 'row', }}>
                    <Image
                      source={{ uri: this.state.urlImage + item.logo }}
                      style={{
                        width: 70,
                        height: 70,
                        borderRadius: 10,
                        marginTop: 25,
                        marginRight: 15
                      }}
                    />
                    <View
                      style={{
                        width: '75%',
                        marginTop: 25,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                      }}>
                      <View>
                        <Text style={{
                          fontSize: 18,
                          fontFamily: 'Poppins_500Medium',
                        }}>
                          {item.company_name}
                        </Text>
                        <View style={{
                          flexDirection: 'row',
                          marginTop: 6,
                        }}>
                          {
                            item.telegram !== null &&
                            <Image
                              source={require('../../assets/image/telegram.png')}
                              style={{
                                width: 24,
                                height: 24,
                                marginRight: 8,
                              }}
                            />
                          }
                          {
                            item.telegram == null &&
                            <View style={{ height: 24 }}></View>
                          }
                          {
                            item.saite !== null &&
                            <Image
                              source={require('../../assets/image/admin-site.png')}
                              style={{
                                width: 24,
                                height: 24,
                              }}
                            />
                          }
                        </View>
                      </View>
                      <TouchableOpacity>
                        <Image
                          source={require('../../assets/image/ep_edit.png')}
                          style={{
                            width: 22,
                            height: 22,
                            marginTop: 2
                          }} />
                      </TouchableOpacity>
                    </View>
                  </View>
                )
              })
            }


            {/* sharunakel stexic */}



            <View>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 30,
              }}>
                <Text
                  style={{
                    fontFamily: 'Poppins_500Medium',
                    lineHeight: 23,
                    fontSize: 16,
                    color: '#5B5B5B',
                    marginBottom: 5,
                  }}
                >
                  Страна производства
                </Text>
                <TouchableOpacity>
                  <Image
                    source={require('../../assets/image/ep_edit.png')}
                    style={{
                      width: 15,
                      height: 15,
                      marginLeft: 5,
                      marginBottom: 5
                    }}
                  />
                </TouchableOpacity>
              </View>
              <TextInput
                underlineColorAndroid="transparent"
                placeholder="Италия"
                style={{
                  borderWidth: 1,
                  borderColor: '#F5F5F5',
                  padding: 10,
                  width: '100%',
                  borderRadius: 5,
                }}
              />
            </View>
            <View>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 30,
              }}>
                <Text
                  style={{
                    fontFamily: 'Poppins_500Medium',
                    lineHeight: 23,
                    fontSize: 16,
                    color: '#5B5B5B',
                    marginBottom: 5,
                  }}
                >
                  ИНН
                </Text>
                <TouchableOpacity>
                  <Image
                    source={require('../../assets/image/ep_edit.png')}
                    style={{
                      width: 15,
                      height: 15,
                      marginLeft: 5,
                      marginBottom: 5

                    }}
                  />
                </TouchableOpacity>
              </View>
              <TextInput
                underlineColorAndroid="transparent"
                placeholder="7727563778"
                keyboardType="phone-pad"
                style={{
                  borderWidth: 1,
                  borderColor: '#F5F5F5',
                  padding: 10,
                  width: '100%',
                  borderRadius: 5,
                }}
              />
            </View>
            <View>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 30,
              }}>
                <Text
                  style={{
                    fontFamily: 'Poppins_500Medium',
                    lineHeight: 23,
                    fontSize: 16,
                    color: '#5B5B5B',
                    marginBottom: 5,
                  }}
                >
                  Номер телефона
                </Text>
                <TouchableOpacity>
                  <Image
                    source={require('../../assets/image/ep_edit.png')}
                    style={{
                      width: 15,
                      height: 15,
                      marginLeft: 5,
                      marginBottom: 5

                    }}
                  />
                </TouchableOpacity>
              </View>
              <TextInput
                underlineColorAndroid="transparent"
                placeholder="+7 (909) 099-99-99"
                keyboardType="phone-pad"
                style={{
                  borderWidth: 1,
                  borderColor: '#F5F5F5',
                  padding: 10,
                  width: '100%',
                  borderRadius: 5,
                }}
              />
            </View>

            <View>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 30,
              }}>
                <Text
                  style={{
                    fontFamily: 'Poppins_500Medium',
                    lineHeight: 23,
                    fontSize: 16,
                    color: '#5B5B5B',
                    marginBottom: 5,
                  }}
                >
                  Пароль
                </Text>
                <TouchableOpacity>
                  <Image
                    source={require('../../assets/image/ep_edit.png')}
                    style={{
                      width: 15,
                      height: 15,
                      marginLeft: 5,
                      marginBottom: 5
                    }}
                  />
                </TouchableOpacity>
              </View>
              <TextInput
                underlineColorAndroid="transparent"
                placeholder="**********"
                secureTextEntry={true}
                style={{
                  borderWidth: 1,
                  borderColor: '#F5F5F5',
                  padding: 10,
                  width: '100%',
                  borderRadius: 5,
                }}
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 34
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'Poppins_500Medium',
                  color: '#333333',
                }}>
                Продукция
              </Text>
              <TouchableOpacity
                onPress={async () => {
                  this.props.navigation.navigate('Praductia', {
                    params: this.state.id
                  })
                }}

                style={{
                  width: 165,
                  height: 38,
                  backgroundColor: '#B5D8FE',
                  borderRadius: 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 18,
                    fontFamily: 'Poppins_500Medium',
                  }}>
                  Изменить
                </Text>
              </TouchableOpacity>
            </View>


            {/* dropDown  start*/}

            <View style={styles.cityFilter}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'Poppins_500Medium',
                  marginBottom: 11,
                  color: '#333333',
                }}
              >
                Города (продажи продукции)({this.state.count})
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  position: 'relative',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    borderColor: '#F5F5F5',
                    padding: 10,
                    width: '80%',
                    borderRadius: 6,
                    position: 'relative',
                    height: 45,
                    marginRight: 12

                  }}
                  onPress={() => !this.state.gorod ? this.setState({ gorod: true }) : this.setState({ gorod: false })}
                >
                  <Text style={{ fontFamily: 'Poppins_500Medium', color: '#888888' }}>Москва</Text>
                  <View style={{ position: 'absolute', right: 17, bottom: 18 }}>
                    {!this.state.gorod &&
                      <Svg width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M1 1L9 9L17 1" stroke="#888888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      </Svg>
                    }
                    {this.state.gorod &&
                      <Svg width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M1 9L9 1L17 9" stroke="#888888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      </Svg>
                    }

                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.setState({ gorodModal: true })}>
                  <Image
                    source={require('../../assets/image/ep_edit.png')}
                    style={{
                      width: 30,
                      height: 30,
                    }} />
                </TouchableOpacity>
              </View>
              <View
                style={this.state.gorod ? styles.sOpenCityDropDownActive : styles.sOpenCityDropDown}>
                <ScrollView nestedScrollEnabled={true} >
                  {
                    this.state.options.map((item, index) => {
                      return (
                        <TouchableOpacity
                          key={index}
                          style={{
                            width: '100%',
                            justifyContent: 'center',
                            textAlign: 'left',
                          }}
                          onPress={() => this.setState({ value: item.items, gorod: false })}
                        >
                          <Text style={{ textAlign: 'left', paddingVertical: 10, fontFamily: 'Poppins_500Medium', }}>
                            {item.items}
                          </Text>

                        </TouchableOpacity>
                      )

                    })
                  }
                </ScrollView>
              </View>
            </View>

            {/* dropDown end */}

            {/* dropDown  start*/}

            <View style={styles.cityFilter}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'Poppins_500Medium',
                  marginBottom: 11,
                  color: '#333333'
                }}
              >
                Категории (8)
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  position: 'relative',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    borderColor: '#F5F5F5',
                    padding: 10,
                    width: '80%',
                    borderRadius: 6,
                    position: 'relative',
                    height: 45,
                    marginRight: 12

                  }}
                  onPress={() => !this.state.category ? this.setState({ category: true }) : this.setState({ category: false })}
                >
                  <Text style={{ fontFamily: 'Poppins_500Medium', color: '#888888' }}>Кухня</Text>
                  <View style={{ position: 'absolute', right: 17, bottom: 18 }}>
                    {!this.state.category &&
                      <Svg width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M1 1L9 9L17 1" stroke="#888888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      </Svg>
                    }
                    {this.state.category &&
                      <Svg width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M1 9L9 1L17 9" stroke="#888888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      </Svg>
                    }

                  </View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image
                    source={require('../../assets/image/ep_edit.png')}
                    style={{
                      width: 30,
                      height: 30,
                    }} />
                </TouchableOpacity>
              </View>
              <View
                style={this.state.category ? styles.sOpenCityDropDownActive : styles.sOpenCityDropDown}>
                <ScrollView nestedScrollEnabled={true} >
                  {
                    this.state.options.map((item, index) => {
                      return (
                        <TouchableOpacity
                          key={index}
                          style={{
                            width: '100%',
                            justifyContent: 'center',
                            textAlign: 'left',
                          }}
                          onPress={() => this.setState({ value: item.items, category: false })}
                        >
                          <Text style={{ textAlign: 'left', paddingVertical: 10, fontFamily: 'Poppins_500Medium', }}>
                            {item.items}
                          </Text>

                        </TouchableOpacity>
                      )

                    })
                  }
                </ScrollView>
              </View>
            </View>

            {/* dropDown end */}

          </ScrollView>
        </View>
        {this.state.keyboardOpen === false &&
          <CustomerMainPageNavComponent active_page={'Профиль'} navigation={this.props.navigation} />
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
  },
  container: {
    position: 'relative',
    paddingBottom: 3
  },
  cityFilter: {
    marginTop: 25,
    width: '100%',
  },
  sOpenCityDropDown: {
    width: '80%',
    height: 0,
  },
  sOpenCityDropDownActive: {
    width: '80%',
    height: 120,
    elevation: 2,
    borderColor: '#F5F5F5',
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: '#fff'
  },
  gorodFilter: {
    marginTop: 25,
    width: '100%',
  },
  setGorodFilter: {
    width: '100%',
    height: 0,
  },
  setGorodFilterActive: {
    width: '100%',
    height: 120,
    elevation: 2,
    borderColor: '#F5F5F5',
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: '#fff'
  }
})