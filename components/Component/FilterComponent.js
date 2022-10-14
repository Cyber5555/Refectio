
import React, { Component } from "react";
import { SafeAreaView, View, Image, Text, Touchable, TouchableOpacity, TextInput, ScrollView, StyleSheet, Pressable } from "react-native";
import Svg, { Path, Rect } from "react-native-svg";
import { Modal } from "react-native";

export default class FilterComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      filter: true,
      view1: [
        { companyLogo: require('../../assets/image/category1.png'), filterName: 'Прихожые', size: 10, lineHeight: 12.9, id: 1 },
        { companyLogo: require('../../assets/image/category2.png'), filterName: 'Кухни', size: 10, lineHeight: 12.9, id: 2 },
        { companyLogo: require('../../assets/image/category3.png'), filterName: 'Мебель для\nванной', size: 7, lineHeight: 9.03, id: 3 },
        { companyLogo: require('../../assets/image/category4.png'), filterName: 'Межкомнатные\nперегородки', size: 7, lineHeight: 9.03, id: 4 },
        { companyLogo: require('../../assets/image/category5.png'), filterName: 'Гардеробные', size: 8, lineHeight: 10.32, id: 5 },
        { companyLogo: require('../../assets/image/category6.png'), filterName: 'Детские', size: 10, lineHeight: 12.9, id: 6 },
        { companyLogo: require('../../assets/image/category7.png'), filterName: 'Мебель для\nспальни', size: 7, lineHeight: 9.03, id: 7 },
        { companyLogo: require('../../assets/image/category8.png'), filterName: 'Кабинеты', size: 10, lineHeight: 12.9, id: 8 },
        { companyLogo: require('../../assets/image/category9.png'), filterName: 'Гостиные', size: 10, lineHeight: 12.9, id: 9 }
      ],
      view2: [
        { companyLogo: require('../../assets/image/category10.png'), filterName: 'Островные\nпавильоны', size: 8, lineHeight: 9.03, id: 10 },
        { companyLogo: require('../../assets/image/category11.png'), filterName: 'Выставочные\nстенды', size: 8, lineHeight: 9.03, id: 11 },
        { companyLogo: require('../../assets/image/category12.png'), filterName: 'Зоны\nресепшн', size: 8, lineHeight: 9.03, id: 12 },
      ],
      rubli: [
        { icon: require('../../assets/image/rubli1.png'), size: 32, id: 1 },
        { icon: require('../../assets/image/rubli2.png'), size: 41, id: 2 },
        { icon: require('../../assets/image/rubli3.png'), size: 52, id: 3 },
        { icon: require('../../assets/image/rubli4.png'), size: 64, id: 4 }
      ],

      sOpenCityDropDown: false,
      options: [
        { items: 'Краснознаменск', value: 1 },
        { items: 'moskva', value: 2 },
        { items: 'Краснознаменск', value: 3 },
        { items: 'Краснознаменск', value: 4 },
        { items: 'Chine', value: 5 },
        { items: 'Armenia', value: 6 }
      ],
      rubliActive: 0,
      filterSortBy: [],
      strana: 0
    }
  }

  enterCheckBox = (id) => {
    let filterSort = this.state.filterSortBy;
    let find = false
    filterSort.find((item) => {
      if (item == id) {
        find = true
      }
    })

    if (find) {
      const index = filterSort.indexOf(id);
      filterSort.splice(index, 1);
    }
    else {
      filterSort.push(id)
    }
    this.setState({ filterSortBy: filterSort })
  }

  verifyCheckBox = (id) => {
    let filterSort = this.state.filterSortBy
    let find = false
    filterSort.find((item) => {
      if (item == id) {
        find = true
      }
    })
    return find
  }

  getFilterData = async () => {

    // call to api


    this.props.handler(view);
    this.props.closeFilter()

  }

  render() {
    return (
      <Modal
        visible={this.state.filter}
        transparent={true}
      >

        <View style={styles.modalWindow}>
          <View style={styles.filterIX}>
            <Text style={{ fontSize: 26, color: "#333333", fontFamily: 'Poppins_500Medium', }}>Фильтр</Text>
            <Pressable onPress={() => { this.props.closeFilter() }}>
              <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path d="M1.02374 2.35124C0.936579 2.26408 0.867436 2.1606 0.820263 2.04671C0.77309 1.93283 0.74881 1.81076 0.74881 1.68749C0.74881 1.56422 0.77309 1.44216 0.820263 1.32828C0.867436 1.21439 0.936579 1.11091 1.02374 1.02374C1.11091 0.936579 1.21439 0.867436 1.32828 0.820263C1.44216 0.77309 1.56422 0.74881 1.68749 0.74881C1.81076 0.74881 1.93283 0.77309 2.04671 0.820263C2.1606 0.867436 2.26408 0.936579 2.35124 1.02374L12 10.6744L21.6487 1.02374C21.7359 0.936579 21.8394 0.867436 21.9533 0.820263C22.0672 0.77309 22.1892 0.74881 22.3125 0.74881C22.4358 0.74881 22.5578 0.77309 22.6717 0.820263C22.7856 0.867436 22.8891 0.936579 22.9762 1.02374C23.0634 1.11091 23.1326 1.21439 23.1797 1.32828C23.2269 1.44216 23.2512 1.56422 23.2512 1.68749C23.2512 1.81076 23.2269 1.93283 23.1797 2.04671C23.1326 2.1606 23.0634 2.26408 22.9762 2.35124L13.3256 12L22.9762 21.6487C23.0634 21.7359 23.1326 21.8394 23.1797 21.9533C23.2269 22.0672 23.2512 22.1892 23.2512 22.3125C23.2512 22.4358 23.2269 22.5578 23.1797 22.6717C23.1326 22.7856 23.0634 22.8891 22.9762 22.9762C22.8891 23.0634 22.7856 23.1326 22.6717 23.1797C22.5578 23.2269 22.4358 23.2512 22.3125 23.2512C22.1892 23.2512 22.0672 23.2269 21.9533 23.1797C21.8394 23.1326 21.7359 23.0634 21.6487 22.9762L12 13.3256L2.35124 22.9762C2.26408 23.0634 2.1606 23.1326 2.04671 23.1797C1.93283 23.2269 1.81076 23.2512 1.68749 23.2512C1.56422 23.2512 1.44216 23.2269 1.32828 23.1797C1.21439 23.1326 1.11091 23.0634 1.02374 22.9762C0.936579 22.8891 0.867436 22.7856 0.820263 22.6717C0.77309 22.5578 0.74881 22.4358 0.74881 22.3125C0.74881 22.1892 0.77309 22.0672 0.820263 21.9533C0.867436 21.8394 0.936579 21.7359 1.02374 21.6487L10.6744 12L1.02374 2.35124Z" fill="#333333" />
              </Svg>
            </Pressable>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.firstFilter}>
              <Text style={{ fontSize: 20, color: "#888888", fontFamily: 'Raleway_500Medium', }}>Ценовая категория</Text>
              <View style={{ flexDirection: 'row', }}>


                {
                  this.state.rubli.map((item, index) => {
                    return (
                      <TouchableOpacity
                        onPress={() => this.setState({ rubliActive: index })}
                        key={item.id}
                        style={this.state.rubliActive == index ? styles.rubliActive : styles.rubli}>
                        <Image
                          source={item.icon}
                          style={{ width: item.size, height: 17 }}
                          // resizeMode="center"
                        />


                      </TouchableOpacity>
                    )
                  })
                }
              </View>
            </View>




            <View style={styles.twoFilter}>
              <Text style={{ fontSize: 20, color: "#888888", fontFamily: 'Raleway_500Medium' }}>Категории</Text>
              <View style={{ height: 205 }}>
                <ScrollView
                  style={{
                    width: '100%'
                  }}
                  nestedScrollEnabled={true}
                  showsVerticalScrollIndicator={false}
                >
                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: '100%',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                      }}>
                      {
                        this.state.view1.map((item, index) => {
                          return (

                            <View
                              key={index}
                              style={{
                                paddingTop: 14,
                                alignContent: 'center',
                                width: '23%',

                              }}>
                              <TouchableOpacity
                                onPress={() => {
                                  this.enterCheckBox(item.id)
                                }}
                                style={{
                                  width: '100%',
                                }}>
                                <Image
                                  source={item.companyLogo}
                                  style={{
                                    width: 47,
                                    height: 45,
                                    resizeMode: 'contain',
                                    alignSelf: 'center',
                                  }} />
                                {
                                  this.verifyCheckBox(item.id) === false &&
                                  <View
                                    style={{
                                      height: 20,
                                      marginTop: 6,
                                      width: '100%',
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: item.size,
                                        color: "#888888",
                                        textAlign: "center",
                                        fontFamily: 'Poppins_400Regular',
                                        lineHeight: item.lineHeight
                                      }}>
                                      {item.filterName}
                                    </Text>
                                  </View>
                                }
                                {
                                  this.verifyCheckBox(item.id) === true &&
                                  <View
                                    style={{
                                      backgroundColor: '#52A8EF',
                                      height: 20,
                                      borderRadius: 10,
                                      marginTop: 6,
                                      width: '100%',
                                      alignItems: "center",
                                      justifyContent: "center",
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: item.size,
                                        color: "#fff",
                                        textAlign: "center",
                                        fontFamily: 'Poppins_400Regular',
                                        lineHeight: item.lineHeight,
                                      }}>
                                      {item.filterName}
                                    </Text>
                                  </View>
                                }
                              </TouchableOpacity>
                            </View>
                          )
                        })
                      }
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: '100%',
                        flexWrap: 'wrap',
                        borderTopWidth: 1,
                        borderColor: '#F5F5F5',
                        marginTop: 14,
                        position: "relative",
                      }}>
                      <Text
                        style={{
                          position: "absolute",
                          fontSize: 8,
                          top: -6,
                          left: '40%',
                          color: '#C6C6C6',
                          backgroundColor: '#fff',
                          fontFamily: 'Poppins_400Regular'
                        }}>
                        Коммерческая
                      </Text>

                      {
                        this.state.view2.map((item, index) => {
                          return (
                            <View
                              key={index}
                              style={{
                                paddingTop: 14,
                                alignContent: 'center',
                                width: '23%',
                                marginRight: '2%',
                                justifyContent: 'flex-start',
                              }}>
                              <TouchableOpacity
                                onPress={() => {
                                  this.enterCheckBox(item.id)
                                }}
                                style={{
                                  width: '100%',
                                }}>
                                <Image
                                  source={item.companyLogo}
                                  style={{
                                    width: 47,
                                    height: 45,
                                    resizeMode: 'contain',
                                    alignSelf: 'center',
                                  }} />
                                {
                                  this.verifyCheckBox(item.id) === false &&
                                  <View
                                    style={{
                                      height: 20,
                                      marginTop: 6,
                                      width: '100%',
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: item.size,
                                        color: "#888888",
                                        textAlign: "center",
                                        fontFamily: 'Poppins_400Regular',
                                        lineHeight: item.lineHeight,
                                      }}>
                                      {item.filterName}
                                    </Text>
                                  </View>
                                }
                                {
                                  this.verifyCheckBox(item.id) === true &&
                                  <View
                                    style={{
                                      backgroundColor: '#52A8EF',
                                      height: 20,
                                      borderRadius: 10,
                                      marginTop: 6,
                                      width: '100%',
                                      alignItems: "center",
                                      justifyContent: "center",
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: item.size,
                                        color: "#fff",
                                        textAlign: "center",
                                        fontFamily: 'Poppins_400Regular',
                                        lineHeight: item.lineHeight,
                                      }}>
                                      {item.filterName}
                                    </Text>
                                  </View>
                                }
                              </TouchableOpacity>
                            </View>
                          )
                        })
                      }
                    </View>
                  </View>
                </ScrollView>
              </View >
            </View >




            {/* dropDown  start*/}

            <View style={styles.cityFilter}>
              <Text
                style={{
                  fontSize: 20,
                  color: '#888888',
                  marginBottom: 11,
                  fontFamily: 'Raleway_500Medium'
                }}
              >
                Город
              </Text>
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderColor: '#F5F5F5',
                  padding: 10,
                  width: '100%',
                  borderRadius: 5,
                  position: 'relative',
                  height: 45,
                  backgroundColor: '#52A8EF'

                }}
                onPress={() => !this.state.sOpenCityDropDown ? this.setState({ sOpenCityDropDown: true }) : this.setState({ sOpenCityDropDown: false })}
              >
                <Text style={{ color: "#FFFFFF", fontFamily: 'Raleway_600SemiBold' }}>{this.state.value}</Text>
                <View style={{ position: 'absolute', right: 17, bottom: 18 }}>
                  {!this.state.sOpenCityDropDown &&
                    <Svg width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <Path d="M1 1L9 9L17 1" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </Svg>
                  }
                  {this.state.sOpenCityDropDown &&
                    <Svg width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <Path d="M1 9L9 1L17 9" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
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
                          <Text style={{ textAlign: 'left', paddingVertical: 10, fontFamily: 'Raleway_600SemiBold' }}>
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



            <View style={styles.stranaFilter}>
              <Text style={{ fontSize: 20, color: "#888888", fontFamily: 'Raleway_500Medium' }}>Страна производства</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={{ flexDirection: 'row', }}>

                  {
                    this.state.options.map((item, index) => {
                      return (
                        <TouchableOpacity
                          onPress={() => this.setState({ strana: index })}
                          key={index}
                          style={this.state.strana == index ? styles.stranaActive : styles.strana}>
                          <Text style={styles.stranaButton}>
                            {item.items}
                          </Text>
                        </TouchableOpacity>
                      )
                    })
                  }
                </View>
              </ScrollView>
            </View>
            <View style={styles.yesNoFilter}>
              <Text style={{ fontSize: 20, color: "#888888", fontFamily: 'Raleway_500Medium' }}>Наличие шоурума</Text>
              <View style={{ flexDirection: 'row', }}>
                <TouchableOpacity
                  style={{
                    paddingHorizontal: 15,
                    paddingVertical: 6,
                    backgroundColor: "#B5D8FE",
                    borderRadius: 5,
                    marginTop: 10,
                    marginRight: 10
                  }}>
                  <Text
                    style={styles.stranaButton}>
                    Да
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    paddingHorizontal: 15,
                    paddingVertical: 6,
                    backgroundColor: "#B5D8FE",
                    borderRadius: 5,
                    marginTop: 10,
                    marginRight: 10
                  }}>
                  <Text
                    style={styles.stranaButton}>
                    Нет
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                alignItems: 'center',
                marginBottom: 56
              }}>
              <TouchableOpacity
                style={{ width: 165, height: 38, backgroundColor: '#B5D8FE', justifyContent: 'center', alignItems: 'center', borderRadius: 15 }}
                onPress={() => {

                  this.getFilterData();
                }}>
                <Text style={{ fontSize: 18, color: '#FFFFFF', fontFamily: 'Poppins_500Medium' }}>
                  Применить
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View >

      </Modal >
    )
  }
}


const styles = StyleSheet.create({
  modalWindow: {
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
    paddingHorizontal: 35,
    paddingVertical: 20,
  },
  filterIX: {
    width: '100%',
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: '5%',
    paddingBottom: '2%',
  },
  firstFilter: {
    borderWidth: 1,
    borderColor: '#F5F5F5',
    marginTop: 21,
    width: '100%',
    padding: 10,
    paddingBottom: 15,
    borderRadius: 10

  },
  twoFilter: {
    borderWidth: 1,
    borderColor: '#F5F5F5',
    marginTop: 21,
    width: '100%',
    padding: 10,
    paddingBottom: 15,
    borderRadius: 10
  },
  cityFilter: {
    borderWidth: 1,
    borderColor: '#F5F5F5',
    marginTop: 21,
    width: '100%',
    padding: 10,
    borderRadius: 10,
  },

  stranaFilter: {
    borderWidth: 1,
    borderColor: '#F5F5F5',
    marginTop: 21,
    width: '100%',
    padding: 10,
    paddingBottom: 15,
    borderRadius: 10
  },
  stranaButton: {
    color: '#fff',
    fontSize: 15,
    fontFamily: 'Raleway_600SemiBold',
    padding: 0
  },
  yesNoFilter: {
    borderWidth: 1,
    borderColor: '#F5F5F5',
    marginTop: 21,
    width: '100%',
    padding: 10,
    paddingBottom: 15,
    borderRadius: 10,
    marginBottom: 60
  },
  sOpenCityDropDown: {
    width: '100%',
    height: 0,
  },
  sOpenCityDropDownActive: {
    width: '100%',
    height: 120,
    elevation: 2,
    borderColor: '#F5F5F5',
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: '#fff'
  },
  rubli: {
    paddingVertical: 8,
    backgroundColor: "#B5D8FE",
    borderRadius: 5,
    marginTop: 10,
    marginRight: 10
  },
  rubliActive: {
    paddingVertical: 8,
    backgroundColor: "#52A8EF",
    borderRadius: 5,
    marginTop: 10,
    marginRight: 10
  },
  stranaActive: {
    paddingHorizontal: 15,
    paddingTop: 4,
    paddingBottom: 8,
    backgroundColor: "#52A8EF",
    borderRadius: 5,
    marginTop: 10,
    marginRight: 10
  },
  strana: {
    paddingHorizontal: 15,
    paddingTop: 4,
    paddingBottom: 8,
    backgroundColor: "#B5D8FE",
    borderRadius: 5,
    marginTop: 10,
    marginRight: 10
  }
})