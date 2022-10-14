import React, { Component } from "react";
import { SafeAreaView, View, Image, Text, Touchable, TouchableOpacity, TextInput, ScrollView, StyleSheet, Pressable, ImageBackground } from "react-native";
import Svg, { Path, Rect } from "react-native-svg";
import { Modal } from "react-native";
import Slider from "../slider/Slider";
import BlueButton from "../Component/Buttons/BlueButton";
import DesignerPageNavComponent from "./DesignerPageNav";

export default class DesignerPageTwoComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: false,
      categories: [
        { catalog: 'Кухни', id: 1 },
        { catalog: 'Прихожие', id: 2 },
        { catalog: 'Гостиные', id: 3 },
        { catalog: 'Детские', id: 4 },
        { catalog: 'Кухни', id: 6 },
        { catalog: 'Кухни', id: 7 },
        { catalog: 'Кухни', id: 8 }
      ],

      checked: false,
      sOpenCityDropDown: false,
      cityItems: [
        { label: 'Краснознаменск', value: 'Краснознаменск' },
        { label: 'Домодедово', value: 'Домодедово' },
        { label: 'Коломна', value: 'Коломна' },
        { label: 'Королёв', value: 'Королёв' },
        { label: 'Одинцово', value: 'Одинцово' },
        { label: 'Нижний Новгород', value: 'Нижний Новгород' },
        { label: 'Городец', value: 'Городец' },
        { label: 'Саров', value: 'Саров' },
      ],
      selectedCity: null,
      selectedCityLabel: '',
      RewardModal: false,
      DesignerBroniFilter: false,
      options: [
        { items: 'Краснознаменск', value: 1 },
        { items: 'moskva', value: 2 },
        { items: 'Краснознаменск', value: 3 },
        { items: 'Краснознаменск', value: 4 },
        { items: 'Chine', value: 5 },
        { items: 'Armenia', value: 6 }
      ],
      active: 0
    }
  }






  modalState = async () => {
    await this.setState({
      DesignerBroniFilter: true
    })
  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1, }}>
        <View style={styles.main}>

          <Modal visible={this.state.DesignerBroniFilter} animationType='slide'>
            <ImageBackground
              source={require('../../assets/image/blurBg.png')}
              style={styles.background}>
              <View style={styles.broniMain}>
                <Pressable
                  style={styles.Xbutton}
                  onPress={() => this.setState({ DesignerBroniFilter: false })}>
                  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M1.02377 2.35127C0.936609 2.26411 0.867467 2.16063 0.820293 2.04674C0.77312 1.93286 0.74884 1.81079 0.74884 1.68752C0.74884 1.56425 0.77312 1.44219 0.820293 1.32831C0.867467 1.21442 0.936609 1.11094 1.02377 1.02377C1.11094 0.936609 1.21442 0.867467 1.32831 0.820293C1.44219 0.77312 1.56425 0.74884 1.68752 0.74884C1.81079 0.74884 1.93286 0.77312 2.04674 0.820293C2.16063 0.867467 2.26411 0.936609 2.35127 1.02377L12 10.6744L21.6488 1.02377C21.7359 0.936609 21.8394 0.867467 21.9533 0.820293C22.0672 0.77312 22.1893 0.74884 22.3125 0.74884C22.4358 0.74884 22.5579 0.77312 22.6717 0.820293C22.7856 0.867467 22.8891 0.936609 22.9763 1.02377C23.0634 1.11094 23.1326 1.21442 23.1798 1.32831C23.2269 1.44219 23.2512 1.56425 23.2512 1.68752C23.2512 1.81079 23.2269 1.93286 23.1798 2.04674C23.1326 2.16063 23.0634 2.26411 22.9763 2.35127L13.3256 12L22.9763 21.6488C23.0634 21.7359 23.1326 21.8394 23.1798 21.9533C23.2269 22.0672 23.2512 22.1893 23.2512 22.3125C23.2512 22.4358 23.2269 22.5579 23.1798 22.6717C23.1326 22.7856 23.0634 22.8891 22.9763 22.9763C22.8891 23.0634 22.7856 23.1326 22.6717 23.1798C22.5579 23.2269 22.4358 23.2512 22.3125 23.2512C22.1893 23.2512 22.0672 23.2269 21.9533 23.1798C21.8394 23.1326 21.7359 23.0634 21.6488 22.9763L12 13.3256L2.35127 22.9763C2.26411 23.0634 2.16063 23.1326 2.04674 23.1798C1.93286 23.2269 1.81079 23.2512 1.68752 23.2512C1.56425 23.2512 1.44219 23.2269 1.32831 23.1798C1.21442 23.1326 1.11094 23.0634 1.02377 22.9763C0.936609 22.8891 0.867467 22.7856 0.820293 22.6717C0.77312 22.5579 0.74884 22.4358 0.74884 22.3125C0.74884 22.1893 0.77312 22.0672 0.820293 21.9533C0.867467 21.8394 0.936609 21.7359 1.02377 21.6488L10.6744 12L1.02377 2.35127Z" fill="black" />
                  </Svg>
                </Pressable>
                <Text
                  style={{
                    textAlign: 'center',
                    marginTop: 65,
                    fontSize: 22,
                    fontFamily: 'Poppins_500Medium',
                    color: '#2D9EFB'
                  }}>
                  Забронировать клиента
                </Text>
                <ScrollView style={{ borderRadius: 20 }}>
                  <View>
                    <Text
                      style={{
                        fontFamily: 'Poppins_500Medium',
                        lineHeight: 23,
                        fontSize: 15,
                        color: '#5B5B5B',
                        marginLeft: 25,
                        marginTop: 27,
                        marginBottom: 5
                      }}
                    >
                      *Номер телефона
                    </Text>
                    <TextInput
                      underlineColorAndroid="transparent"
                      keyboardType="phone-pad"
                      style={{
                        borderWidth: 1,
                        borderColor: '#F5F5F5',
                        padding: 10,
                        width: '85%',
                        borderRadius: 5,
                        marginLeft: 25
                      }}
                    />
                  </View>

                  <View>
                    <Text
                      style={{
                        fontFamily: 'Poppins_500Medium',
                        lineHeight: 23,
                        fontSize: 15,
                        color: '#5B5B5B',
                        marginLeft: 25,
                        marginTop: 27,
                        marginBottom: 5
                      }}
                    >
                      Доп. номер телефона (необязательно)
                    </Text>
                    <TextInput
                      underlineColorAndroid="transparent"
                      keyboardType="phone-pad"
                      style={{
                        borderWidth: 1,
                        borderColor: '#F5F5F5',
                        padding: 10,
                        width: '85%',
                        borderRadius: 5,
                        marginLeft: 25
                      }}
                    />
                  </View>

                  <View>
                    <Text
                      style={{
                        fontFamily: 'Poppins_500Medium',
                        lineHeight: 23,
                        fontSize: 15,
                        color: '#5B5B5B',
                        marginLeft: 25,
                        marginTop: 27,
                        marginBottom: 5
                      }}
                    >
                      *ФИО
                    </Text>
                    <TextInput
                      underlineColorAndroid="transparent"
                      keyboardType="phone-pad"
                      style={{
                        borderWidth: 1,
                        borderColor: '#F5F5F5',
                        padding: 10,
                        width: '85%',
                        borderRadius: 5,
                        marginLeft: 25
                      }}
                    />
                  </View>

                  <View>
                    <Text
                      style={{
                        fontFamily: 'Poppins_500Medium',
                        lineHeight: 23,
                        fontSize: 15,
                        color: '#5B5B5B',
                        marginLeft: 25,
                        marginTop: 27,
                        marginBottom: 5
                      }}
                    >
                      Доп. ФИО(необязательно)
                    </Text>
                    <TextInput
                      underlineColorAndroid="transparent"
                      keyboardType="phone-pad"
                      style={{
                        borderWidth: 1,
                        borderColor: '#F5F5F5',
                        padding: 10,
                        width: '85%',
                        borderRadius: 5,
                        marginLeft: 25
                      }}
                    />
                  </View>

                  <View>
                    <Text
                      style={{
                        fontFamily: 'Poppins_500Medium',
                        lineHeight: 23,
                        fontSize: 15,
                        color: '#5B5B5B',
                        marginLeft: 25,
                        marginTop: 27,
                        marginBottom: 5
                      }}
                    >
                      *Город
                    </Text>
                    <TextInput
                      underlineColorAndroid="transparent"
                      keyboardType="phone-pad"
                      style={{
                        borderWidth: 1,
                        borderColor: '#F5F5F5',
                        padding: 10,
                        width: '85%',
                        borderRadius: 5,
                        marginLeft: 25
                      }}
                    />
                  </View>

                  {/* dropDown  start*/}

                  <View style={{ position: 'relative' }}>
                    <Text
                      style={{
                        fontFamily: 'Poppins_500Medium',
                        lineHeight: 23,
                        fontSize: 15,
                        color: '#5B5B5B',
                        marginLeft: 25,
                        marginTop: 27,
                        marginBottom: 5
                      }}
                    >
                      *Категория
                    </Text>
                    <TouchableOpacity
                      style={{
                        borderWidth: 1,
                        borderColor: '#F5F5F5',
                        padding: 10,
                        width: '85%',
                        borderRadius: 5,
                        marginLeft: 25,
                        position: 'relative',
                        height: 45
                      }}
                      onPress={() => !this.state.dropDown ? this.setState({ dropDown: true }) : this.setState({ dropDown: false })}
                    >
                      <Text style={{ fontFamily: 'Poppins_500Medium', }}>{this.state.value}</Text>
                      <View style={{ position: 'absolute', right: 17, bottom: 18 }}>
                        {!this.state.dropDown &&
                          <Svg width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path d="M1 1L9 9L17 1" stroke="#888888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                          </Svg>
                        }
                        {this.state.dropDown &&
                          <Svg width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path d="M1 9L9 1L17 9" stroke="#888888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                          </Svg>
                        }

                      </View>
                    </TouchableOpacity>
                    <View
                      style={this.state.dropDown ? styles.dropDownActive : styles.dropDown}>
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
                                onPress={() => this.setState({ value: item.items, dropDown: false })}
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

                  <View style={styles.manufacturer}>
                    <Text
                      style={{
                        fontFamily: 'Poppins_500Medium',
                        lineHeight: 23,
                        fontSize: 15,
                        color: '#5B5B5B',
                        marginBottom: 5
                      }}>
                      Прозводитель
                    </Text>
                  </View>
                  <View style={{ alignItems: 'center', marginTop: 50 }}>
                    <TouchableOpacity
                    // onPress={() => this.goToMyBroni()}
                    >
                      <BlueButton name="Забронировать" />
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              </View>
            </ImageBackground>
          </Modal>


          <Modal visible={this.state.RewardModal}>
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
                  onPress={() => this.setState({ RewardModal: false })}>
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
                    marginTop: 70,
                    textAlign: 'center',
                    fontFamily: 'Poppins_500Medium',
                  }}>
                  Вознаграждение
                </Text>
                <View style={[styles.Reward, { marginTop: 38 }]}>
                  <Text>
                    от 0 до 1.000.000
                  </Text>
                  <Text>
                    9 %
                  </Text>
                </View>
              </View>

            </ImageBackground>
          </Modal>




          <ScrollView showsVerticalScrollIndicator={false} style={{ paddingTop: 15 }}>
            <View style={styles.campaign}>
              <View style={styles.infoCompanyMain}>
                <Image
                  source={require('../../assets/image/logoCompany.png')}
                  style={{
                    width: 100,
                    height: 100,
                    marginRight: 12,
                    borderColor: '#C8C8C8',
                    borderWidth: 1,
                    resizeMode: "cover",
                    borderRadius: 10,
                  }}
                />
                <View style={styles.infoCompany}>
                  <View>
                    <Text
                      style={{
                        fontSize: 22,
                        fontFamily: 'Raleway_500Medium',
                        lineHeight: 26,
                      }}>
                      Лайт Кухни
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        color: "#A8A8A8",
                        fontFamily: 'Raleway_500Medium',
                      }}>
                      Италия
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: 8
                      }}>
                      <TouchableOpacity>
                        <Image
                          source={require('../../assets/image/globus.png')}
                          style={{
                            width: 24,
                            height: 24,
                            marginRight: 14,
                          }}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Image
                          source={require('../../assets/image/telegram.png')}
                          style={{
                            width: 24,
                            height: 24,
                            marginRight: 14,
                          }}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Image
                          source={require('../../assets/image/sidebar.png')}
                          style={{
                            width: 18,
                            height: 24,
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <TouchableOpacity>
                    <Image
                      source={require('../../assets/image/heartHast.png')}
                      style={{
                        width: 24,
                        height: 21.43,
                        tintColor: '#333333',
                        marginTop: 5,
                      }} />
                  </TouchableOpacity>
                </View>
              </View>

              {/* dropDown  start*/}

              <View
                style={{
                  position: 'relative',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 9,
                  justifyContent: "space-between"
                }}>
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    borderColor: '#F5F5F5',
                    padding: 2,
                    width: '50%',
                    borderRadius: 5,
                    position: 'relative',
                    height: 24,
                    paddingLeft: 5,
                  }}
                  onPress={() => !this.state.sOpenCityDropDown ? this.setState({ sOpenCityDropDown: true }) : this.setState({ sOpenCityDropDown: false })}
                >
                  <Text style={{ fontFamily: 'Raleway_400Regular', }}>{this.state.value}</Text>
                  <View style={{ position: 'absolute', right: 17, bottom: 6 }}>
                    {!this.state.sOpenCityDropDown &&
                      <Svg width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M1 1L9 9L17 1" stroke="#888888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      </Svg>
                    }
                    {this.state.sOpenCityDropDown &&
                      <Svg width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M1 9L9 1L17 9" stroke="#888888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      </Svg>
                    }

                  </View>
                </TouchableOpacity>
                <View
                  style={this.state.sOpenCityDropDown ? styles.sOpenCityDropDownActive : styles.sOpenCityDropDown}>
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
                            onPress={() => this.setState({ value: item.items, sOpenCityDropDown: false })}
                          >
                            <Text style={{ textAlign: 'left', paddingVertical: 10, fontFamily: 'Raleway_400Regular', }}>
                              {item.items}
                            </Text>

                          </TouchableOpacity>
                        )

                      })
                    }
                  </ScrollView>
                </View>
                <View style={styles.checkBox}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => { this.setState({ checked: !this.state.checked }) }}>
                    <Text style={{
                      fontSize: 13,
                      marginRight: 5,
                      fontFamily: 'Raleway_400Regular',
                    }}>
                      Шоурум
                    </Text>
                    <View>
                      {!this.state.checked &&
                        <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <Rect x="0.2" y="0.2" width="19.6" height="19.6" rx="3.8" stroke="#52A8EF" stroke-width="0.4" />
                        </Svg>
                      }
                      {this.state.checked &&
                        <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <Path d="M4 11.4L7.52941 15.4L16 5" stroke="#52A8EF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                          <Rect x="0.2" y="0.2" width="19.6" height="19.6" rx="3.8" stroke="#52A8EF" stroke-width="0.4" />
                        </Svg>

                      }
                    </View>
                  </View>
                </View>
              </View>







              <View style={{
                width: "100%",
                height: 58,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 14,
                marginBottom: 19,
                zIndex: -1
              }}>
                <TouchableOpacity
                  style={[
                    styles.info,
                    {
                      borderRightWidth: 2,
                      borderRightColor: '#EEEEEE'
                    }]}
                  onPress={() => { this.setState({ RewardModal: true }) }}
                >
                  <Image
                    source={require('../../assets/image/la_percent.png')}
                    style={{
                      width: 30,
                      height: 30,
                      resizeMode: 'contain',
                    }} />
                  <Text style={styles.infoText}>Вознаграждение</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.info, { borderRightWidth: 2, borderRightColor: '#EEEEEE' }]}>
                  <Image
                    source={require('../../assets/image/clarity_ruble-line.png')}
                    style={{
                      width: 30,
                      height: 30,
                      resizeMode: 'contain',
                    }} />
                  <Text style={styles.infoText}>Запрос{'\n'}стоимости</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.info} onPress={() => this.modalState()}>
                  <Image
                    source={require('../../assets/image/pcichka.png')}
                    style={{
                      width: 30,
                      height: 30,
                      resizeMode: 'contain',
                    }} />
                  <Text style={styles.infoText}>Бронировать</Text>
                </TouchableOpacity>
              </View>
              <View style={{ marginBottom: 15, zIndex: -1 }}>
                <ScrollView
                  horizontal={true}
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                >
                  {
                    this.state.categories.map((category, index) => {
                      return (
                        <TouchableOpacity
                          onPress={() => this.setState({ active: index })}
                          key={index}
                          style={this.state.active === index ? styles.categoriesButtonActive : styles.categoriesButton} >
                          <Text style={this.state.active === index ? styles.categoriesNameActive : styles.categoriesName}>{category.catalog}</Text>
                        </TouchableOpacity>
                      )
                    })
                  }
                </ScrollView>
              </View>
              <View>
                <Slider />
                <Text style={{ fontFamily: 'Raleway_700Bold', fontSize: 13, marginTop: 6 }}>Кухня ЛРАЙ145 МДФ ПВХ Сатин Бежевый/СИСТЕМА</Text>
                <Text style={styles.zakazInfo}>Фасады : эмаль</Text>
                <Text style={styles.zakazInfo}>Корпус: ДСП</Text>
                <Text style={styles.zakazInfo}>Столешница: Камень</Text>
                <Text style={styles.zakazInfo}>Длина: 8 метров*</Text>
                <Text style={styles.zakazInfo}>Цена: 1.200.000 руб.</Text>
              </View>
              <View style={{ marginTop: 18 }}>
                <Slider />
                <Text style={{ fontFamily: 'Raleway_700Bold', fontSize: 13, marginTop: 6 }}>Кухня ЛРАЙ145 МДФ ПВХ Сатин Бежевый/СИСТЕМА</Text>
                <Text style={styles.zakazInfo}>Фасады : эмаль</Text>
                <Text style={styles.zakazInfo}>Корпус: ДСП</Text>
                <Text style={styles.zakazInfo}>Столешница: Камень</Text>
                <Text style={styles.zakazInfo}>Длина: 8 метров*</Text>
                <Text style={styles.zakazInfo}>Цена: 1.200.000 руб.</Text>
              </View>
              <View style={{ marginTop: 18 }}>
                <Slider />
                <Text style={{ fontFamily: 'Raleway_700Bold', fontSize: 13, marginTop: 6 }}>Кухня ЛРАЙ145 МДФ ПВХ Сатин Бежевый/СИСТЕМА</Text>
                <Text style={styles.zakazInfo}>Фасады : эмаль</Text>
                <Text style={styles.zakazInfo}>Корпус: ДСП</Text>
                <Text style={styles.zakazInfo}>Столешница: Камень</Text>
                <Text style={styles.zakazInfo}>Длина: 8 метров*</Text>
                <Text style={styles.zakazInfo}>Цена: 1.200.000 руб.</Text>
              </View>
              <View style={{ marginTop: 18 }}>
                <Slider />
                <Text style={{ fontFamily: 'Raleway_700Bold', fontSize: 13, marginTop: 6 }}>Кухня ЛРАЙ145 МДФ ПВХ Сатин Бежевый/СИСТЕМА</Text>
                <Text style={styles.zakazInfo}>Фасады : эмаль</Text>
                <Text style={styles.zakazInfo}>Корпус: ДСП</Text>
                <Text style={styles.zakazInfo}>Столешница: Камень</Text>
                <Text style={styles.zakazInfo}>Длина: 8 метров*</Text>
                <Text style={styles.zakazInfo}>Цена: 1.200.000 руб.</Text>
              </View>
              <View style={{ marginTop: 18 }}>
                <Slider />
                <Text style={{ fontFamily: 'Raleway_700Bold', fontSize: 13, marginTop: 6 }}>Кухня ЛРАЙ145 МДФ ПВХ Сатин Бежевый/СИСТЕМА</Text>
                <Text style={styles.zakazInfo}>Фасады : эмаль</Text>
                <Text style={styles.zakazInfo}>Корпус: ДСП</Text>
                <Text style={styles.zakazInfo}>Столешница: Камень</Text>
                <Text style={styles.zakazInfo}>Длина: 8 метров*</Text>
                <Text style={styles.zakazInfo}>Цена: 1.200.000 руб.</Text>
              </View>
            </View>
          </ScrollView>
        </View >
        <DesignerPageNavComponent navigation={this.props.navigation} />
      </SafeAreaView >
    )
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    position: "relative"
  },
  campaign: {
    width: '100%',
    marginBottom: 34,
  },
  infoCompanyMain: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoCompany: {
    width: '67%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoriesName: {
    fontSize: 14,
    fontFamily: 'Raleway_600SemiBold',
  },
  categoriesNameActive: {
    fontSize: 14,
    fontFamily: 'Raleway_600SemiBold',
    color: '#fff',
  },
  categoriesButton: {
    paddingHorizontal: 16,
    paddingTop: 9,
    paddingBottom: 11,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    marginRight: 6
  },
  categoriesButtonActive: {
    paddingHorizontal: 16,
    paddingTop: 9,
    paddingBottom: 11,
    backgroundColor: '#94D8F4',
    borderRadius: 8,
    marginRight: 6
  },
  info: {
    width: '33.3%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',

  },
  infoText: {
    fontSize: 10,
    textAlign: 'center',
    fontFamily: 'Raleway_500Medium',
  },
  Reward: {
    flexDirection: 'row',
    marginHorizontal: 20,
    justifyContent: 'space-between',
    borderWidth: 1,
  },
  background: {
    width: '100%',
    height: '100%',
    flex: 1,
    zIndex: 10,
    // position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover',
  },
  broniMain: {
    width: '90%',
    height: '90%',
    backgroundColor: '#fff',
    borderRadius: 20,
    position: "relative",
    paddingBottom: 54
  },
  Xbutton: {
    position: 'absolute',
    top: 21.75,
    right: 21.75,
  },
  dropDown: {
    width: '85%',
    height: 0,
    left: 25,
    position: 'absolute',
    top: '100%',
    zIndex: 100
  },
  dropDownActive: {
    width: '85%',
    height: 120,
    left: 25,
    position: 'absolute',
    top: '100%',
    elevation: 2,
    borderColor: '#F5F5F5',
    paddingVertical: 10,
    paddingHorizontal: 5,
    zIndex: 100,
    backgroundColor: '#fff'
  },
  manufacturer: {
    borderWidth: 1,
    width: '85%',
    height: 260,
    marginLeft: 25,
    marginTop: 13
  },
  sOpenCityDropDown: {
    width: '50%',
    height: 0,
    left: 0,
    position: 'absolute',
    top: '100%',
    zIndex: 100
  },
  sOpenCityDropDownActive: {
    width: '50%',
    height: 120,
    left: 0,
    position: 'absolute',
    top: '100%',
    elevation: 2,
    borderColor: '#F5F5F5',
    paddingVertical: 10,
    paddingHorizontal: 5,
    zIndex: 100,
    backgroundColor: '#fff'
  },
  zakazInfo: {
    fontSize: 14,
    fontFamily: 'Raleway_400Regular',
    // marginTop: 5
  },
})