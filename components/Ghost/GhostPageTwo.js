import React, { Component } from "react";
import { SafeAreaView, View, Image, Text, Touchable, TouchableOpacity, TextInput, ScrollView, StyleSheet, Pressable } from "react-native";
import Svg, { Path, Rect } from "react-native-svg";
import Slider from "../slider/Slider";
import GhostNavComponent from "./GhostNav";




export default class GhostPageTwoComponent extends React.Component {
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
      Options: [
        { items: 'Краснознаменск', value: 1 },
        { items: 'Москва', value: 2 },
        { items: 'Краснознаменск', value: 3 },
        { items: 'Москва', value: 4 },
        { items: 'Краснознаменск', value: 5 },
        { items: 'Москва', value: 6 },
      ],
      categoryClick: 0,
      strannaChange: 'Москва',
    }
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, }}>
        <View style={styles.main}>

          <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 15 }}>
            <View style={styles.campaign}>
              <View style={styles.infoCompanyMain}>
                <Image
                  source={require('../../assets/image/logoCompany.png')}
                  style={{
                    width: 100,
                    height: 100,
                    marginRight: 16,
                    borderColor: '#C8C8C8',
                    borderWidth: 1,
                    resizeMode: "cover",
                    borderRadius: 10,
                  }}
                />
                <View style={styles.infoCompany}>
                  <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '85.5%' }}>
                      <Text
                        style={{
                          fontSize: 22,
                          fontFamily: 'Raleway_500Medium',
                          lineHeight: 26,
                        }}>
                        Лайт Кухни
                      </Text>
                      <TouchableOpacity>
                        <Image
                          source={require('../../assets/image/heartHast.png')}
                          style={{ width: 24, height: 21.43, tintColor: '#333333', marginTop: 5 }}
                        />
                      </TouchableOpacity>
                    </View>

                    <Text
                      style={{
                        fontSize: 16,
                        color: "#A8A8A8",
                        fontFamily: 'Raleway_500Medium',
                        marginBottom: 2
                      }}>
                      Италия
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
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
                    padding: 1,
                    width: '50%',
                    borderRadius: 5,
                    position: 'relative',
                    height: 26,
                    paddingLeft: 5,
                    justifyContent: 'flex-start',
                  }}
                  onPress={() => !this.state.sOpenCityDropDown ? this.setState({ sOpenCityDropDown: true }) : this.setState({ sOpenCityDropDown: false })}
                >
                  <Text style={{ fontFamily: 'Raleway_400Regular', }}>{this.state.strannaChange}</Text>
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
                      this.state.Options.map((item, index) => {
                        return (
                          <TouchableOpacity
                            key={index}
                            style={{
                              width: '100%',
                              justifyContent: 'center',
                              textAlign: 'left',
                            }}
                            onPress={() => this.setState({ strannaChange: item.items, sOpenCityDropDown: false })}
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
                  <View style={{ flexDirection: 'row', alignItems: 'flex-end', }} onPress={() => { this.setState({ checked: !this.state.checked }) }}>
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
                <TouchableOpacity style={[styles.info, { borderRightWidth: 2, borderRightColor: '#EEEEEE' }]}
                  onPress={() => { this.props.navigation.navigate('Modal') }}>
                  <Image
                    source={require('../../assets/image/la_percent.png')}
                    style={{
                      width: 30,
                      height: 30,
                      resizeMode: 'contain',
                    }} />
                  <Text style={styles.infoText}>Вознаграждение</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.info, { borderRightWidth: 2, borderRightColor: '#EEEEEE' }]}
                  onPress={() => { this.props.navigation.navigate('Modal'); }}>
                  <Image
                    source={require('../../assets/image/clarity_ruble-line.png')}
                    style={{
                      width: 30,
                      height: 30,
                      resizeMode: 'contain',
                    }} />
                  <Text style={styles.infoText}>Запрос{'\n'}стоимости</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.info}
                  onPress={() => { this.props.navigation.navigate('Modal') }}>
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


              <View style={{ marginBottom: 15, zIndex: -1, marginTop: 8 }}>
                <ScrollView
                  horizontal={true}
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                >
                  {
                    this.state.categories.map((category, index) => {
                      return (
                        <TouchableOpacity
                          onPress={() => this.setState({ categoryClick: index })}
                          key={index}
                          style={this.state.categoryClick == index ? styles.categoriesButtonActive : styles.categoriesButton}>
                          <Text style={this.state.categoryClick == index ? styles.categoriesNameActive : styles.categoriesName}>{category.catalog}</Text>
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
        </View>
        <GhostNavComponent active_page={'Главная'} navigation={this.props.navigation} />
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
  nameCompanyParent: {
    marginTop: 12,
    paddingLeft: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },

  campaign: {
    width: '100%',
    marginBottom: 34,
  },
  infoCompanyMain: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  infoCompany: {
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'space-between'
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
    paddingVertical: 10,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    marginRight: 6
  },
  categoriesButtonActive: {
    paddingHorizontal: 16,
    paddingVertical: 10,
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
    fontFamily: 'Raleway_400Regular',
  },
  zakazInfo: {
    fontSize: 14,
    fontFamily: 'Raleway_400Regular',
    // marginTop: 5
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
  }
})