import React, { Component } from "react";
import { SafeAreaView, View, Image, Text, Modal, TouchableOpacity, TextInput, ScrollView, StyleSheet, ImageBackground, Pressable, Linking, } from "react-native";
import Svg, { Path, Rect } from "react-native-svg";
import Slider from "../slider/Slider";
import CustomerMainPageNavComponent from "./CustomerMainPageNav";
import BlueButton from "../../components/Component/Buttons/BlueButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Slider2 from "../slider/Slider2";


export default class DesignerPageTwoComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      RewardModal: false,

      changed: '',
      sOpenCityDropDown: false,
      active: null,

      user: [],
      user_bonus_for_designer: [],
      user_category_for_product: [],
      city_for_sales_user: [],
      products: [],

      procentArray: [
        {
          to: '0',
          from: '',
          percent: ''
        },
      ],

      urlImage: 'http://80.78.246.59/Refectio/storage/app/uploads/',
      valid_error: false
    }
  }


  componentDidMount() {
    const { navigation } = this.props;
    this.getObjectData()
    this.setState({ active: null })

    this.focusListener = navigation.addListener("focus", () => {

      this.getObjectData()
      this.setState({ active: null })


    });
  }

  componentWillUnmount() {
    // Remove the event listener
    if (this.focusListener) {
      this.focusListener();
      console.log(' END')
    }
  }

  getObjectData = async () => {
    let userID = this.props.userID
    await fetch('http://80.78.246.59/Refectio/public/api/getOneProizvoditel/user_id=' + userID + '/limit=100', {
      method: 'GET'
    })
      .then(response => response.json())
      .then(res => {
        this.setState({
          user: res.data.user,
          user_bonus_for_designer: res.data.user_bonus_for_designer,
          user_category_for_product: res.data.user_category_for_product,
          city_for_sales_user: res.data.city_for_sales_user,
          products: res.data.products,
        })
      })
  }


  updateProduct = async (category_name) => {
    let myHeaders = new Headers();
    let userToken = await AsyncStorage.getItem('userToken')
    myHeaders.append("Authorization", "Bearer " + userToken);

    console.log("Bearer " + userToken, 'userToken');

    let formdata = new FormData();
    formdata.append("category_name", category_name);

    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    fetch("http://80.78.246.59/Refectio/public/api/GetcategoryOneuserprduct", requestOptions)
      .then(response => response.json())
      .then(res => {
        console.log(res, 'GetcategoryOneuserprduct');

        if (res.status === false) {

          this.setState({
            products: [],
            show_plus_button: false
          })

          return false;
        }

        let data = res.data.data;
        let new_data_result = [];

        for (let i = 0; i < data.length; i++) {

          if (data[i].product_image.length < 1) {
            data[i].images = [];
            continue;
          }

          let product_image = data[i].product_image;

          data[i].images = product_image;
        }


        this.setState({
          // user: data,
          user_bonus_for_designer: res.data.data.user_bonus_for_designer,
          // user_category_for_product: res.data.user_category_for_product,
          // city_for_sales_user: res.data.data.city_for_sales_user,
          products: data,
          show_plus_button: false
        })
      })
      .catch(error => console.log('error', error));


  }

  // removeInputRow = () => {

  //   let { procentArray } = this.state;

  //   console.log(procentArray, '1')
  //   procentArray.pop();

  //   this.setState({
  //     procentArray: procentArray
  //   })
  //   console.log(procentArray, '2')
  // }


  // addInputRow = () => {

  //   let { procentArray } = this.state;

  //   procentArray.push({
  //     to: '',
  //     from: '',
  //     percent: ''
  //   })
  //   console.log(procentArray, 'procentArray avel')
  //   let newProcentArray = procentArray;

  //   this.setState({
  //     procentArray: newProcentArray
  //   })

  //   console.log(newProcentArray, 'newProcentArray avel')
  // }


  // savePercont = () => {
  //   let { procentArray } = this.state;

  //   let result = [];
  //   let valid_error = false;

  //   for (let i = 0; i < procentArray.length; i++) {

  //     if (procentArray[i].to == '' || procentArray[i].from == '' || procentArray[i].percent == '') {
  //       valid_error = true;
  //       break;
  //     }

  //     let resultString = procentArray[i].to + '^' + procentArray[i].from + '^' + procentArray[i].percent
  //     result.push(resultString)
  //   }

  //   if (valid_error) {

  //     this.setState({
  //       valid_error: true
  //     })

  //     setTimeout(() => {
  //       this.setState({
  //         valid_error: false
  //       })

  //     }, 2000)

  //   } else {


  //     // stex grvuma apin


  //     // result




  //   }

  //   console.log(result);
  // }

  // changeTo = (value, index) => {
  //   let { procentArray } = this.state;
  //   procentArray[index].to = value;

  //   this.setState({
  //     procentArray: procentArray
  //   })
  // }


  // changeFrom = (value, index) => {
  //   let { procentArray } = this.state;
  //   procentArray[index].from = value;

  //   this.setState({
  //     procentArray: procentArray
  //   })
  // }


  // changePercent = (value, index) => {
  //   let { procentArray } = this.state;
  //   procentArray[index].percent = value;

  //   this.setState({
  //     procentArray: procentArray
  //   })
  // }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, }}>
        <View style={styles.main}>



          {/* <Modal visible={this.state.RewardModal}>
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
                  // height: ,
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


                {this.state.valid_error === true &&

                  <Text
                    style={{
                      color: 'red',
                      fontSize: 18,
                      marginTop: 20,
                      textAlign: 'center',
                      fontFamily: 'Poppins_500Medium',
                    }}>
                    Ошибка: заполните все поля.
                  </Text>

                }


                < View style={styles.DesignerRemunerationPercentageParent} >
                  {
                    this.state.procentArray.map((item, index) => {
                      return (
                        <View style={styles.DesignerRemunerationPercentage} key={index}>

                          <Text style={styles.procentText}>От</Text>

                          <TextInput
                            editable={index === 0 ? false : true}
                            keyboardType={'number-pad'}
                            style={styles.procentInput}
                            value={item.to}
                            onChangeText={async (value) => {

                              // await this.setState({ attttttt: value })
                              this.changeTo(value, index)
                              console.log(value)

                            }}
                          />

                          <View style={styles.rubli}>
                            <Svg width="11" height="15" viewBox="0 0 11 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <Path d="M6.285 8.99997C7.37392 9.02686 8.42909 8.62091 9.21919 7.8711C10.0093 7.1213 10.4699 6.08881 10.5 4.99997C10.4699 3.91113 10.0093 2.87865 9.21919 2.12884C8.42909 1.37904 7.37392 0.973087 6.285 0.999974H2C1.86739 0.999974 1.74021 1.05265 1.64645 1.14642C1.55268 1.24019 1.5 1.36737 1.5 1.49997V7.99997H0.5C0.367392 7.99997 0.240215 8.05265 0.146447 8.14642C0.0526785 8.24019 0 8.36736 0 8.49997C0 8.63258 0.0526785 8.75976 0.146447 8.85353C0.240215 8.9473 0.367392 8.99997 0.5 8.99997H1.5V9.99997H0.5C0.367392 9.99997 0.240215 10.0527 0.146447 10.1464C0.0526785 10.2402 0 10.3674 0 10.5C0 10.6326 0.0526785 10.7598 0.146447 10.8535C0.240215 10.9473 0.367392 11 0.5 11H1.5V14.5C1.5 14.6326 1.55268 14.7598 1.64645 14.8535C1.74021 14.9473 1.86739 15 2 15C2.13261 15 2.25979 14.9473 2.35355 14.8535C2.44732 14.7598 2.5 14.6326 2.5 14.5V11H7C7.13261 11 7.25979 10.9473 7.35355 10.8535C7.44732 10.7598 7.5 10.6326 7.5 10.5C7.5 10.3674 7.44732 10.2402 7.35355 10.1464C7.25979 10.0527 7.13261 9.99997 7 9.99997H2.5V8.99997H6.285ZM2.5 1.99997H6.285C7.10839 1.9743 7.90853 2.27531 8.51083 2.83733C9.11313 3.39935 9.46872 4.17677 9.5 4.99997C9.47001 5.82362 9.11483 6.60182 8.51223 7.16412C7.90964 7.72642 7.10875 8.02698 6.285 7.99997H2.5V1.99997Z" fill="#888888" />
                            </Svg>
                          </View>

                          <Text style={styles.procentText}>До</Text>

                          <TextInput
                            maxLength={10}
                            keyboardType="number-pad"
                            style={styles.procentInput}
                            value={item.from}
                            onChangeText={async (value) => {
                              // await this.setState({ doooooo: value })
                              console.log(value)
                              this.changeFrom(value, index)
                            }}

                          />

                          <View style={styles.rubli}>
                            <Svg width="11" height="15" viewBox="0 0 11 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <Path d="M6.285 8.99997C7.37392 9.02686 8.42909 8.62091 9.21919 7.8711C10.0093 7.1213 10.4699 6.08881 10.5 4.99997C10.4699 3.91113 10.0093 2.87865 9.21919 2.12884C8.42909 1.37904 7.37392 0.973087 6.285 0.999974H2C1.86739 0.999974 1.74021 1.05265 1.64645 1.14642C1.55268 1.24019 1.5 1.36737 1.5 1.49997V7.99997H0.5C0.367392 7.99997 0.240215 8.05265 0.146447 8.14642C0.0526785 8.24019 0 8.36736 0 8.49997C0 8.63258 0.0526785 8.75976 0.146447 8.85353C0.240215 8.9473 0.367392 8.99997 0.5 8.99997H1.5V9.99997H0.5C0.367392 9.99997 0.240215 10.0527 0.146447 10.1464C0.0526785 10.2402 0 10.3674 0 10.5C0 10.6326 0.0526785 10.7598 0.146447 10.8535C0.240215 10.9473 0.367392 11 0.5 11H1.5V14.5C1.5 14.6326 1.55268 14.7598 1.64645 14.8535C1.74021 14.9473 1.86739 15 2 15C2.13261 15 2.25979 14.9473 2.35355 14.8535C2.44732 14.7598 2.5 14.6326 2.5 14.5V11H7C7.13261 11 7.25979 10.9473 7.35355 10.8535C7.44732 10.7598 7.5 10.6326 7.5 10.5C7.5 10.3674 7.44732 10.2402 7.35355 10.1464C7.25979 10.0527 7.13261 9.99997 7 9.99997H2.5V8.99997H6.285ZM2.5 1.99997H6.285C7.10839 1.9743 7.90853 2.27531 8.51083 2.83733C9.11313 3.39935 9.46872 4.17677 9.5 4.99997C9.47001 5.82362 9.11483 6.60182 8.51223 7.16412C7.90964 7.72642 7.10875 8.02698 6.285 7.99997H2.5V1.99997Z" fill="#888888" />
                            </Svg>
                          </View>

                          <View
                            style={styles.procent}
                          >
                            <TextInput
                              keyboardType="number-pad"
                              maxLength={2}
                              value={item.percent}
                              onChangeText={async (value) => {
                                // await this.setState({ proccccc: value })
                                console.log(value)
                                this.changePercent(value, index)

                              }}
                            />
                            <Text>%</Text>
                          </View>
                        </View>
                      )
                    })
                  }



                  <View View style={{ flexDirection: "row", justifyContent: 'flex-end' }}>

                  

                    {this.state.procentArray.length > 1 &&
                      <TouchableOpacity
                        style={[styles.presoble, { marginRight: 11 }]}
                        onPress={async () => {
                          this.removeInputRow()
                        }}>
                        <Text style={styles.procentText}>Удалить</Text>
                      </TouchableOpacity>

                    }



                   



                    <TouchableOpacity
                      style={styles.presoble}
                      onPress={async () => {
                        this.addInputRow()
                      }}>
                      <Text style={styles.procentText}>Добавить</Text>
                    </TouchableOpacity>


         

                  </View >
                </View >

                <TouchableOpacity
                  style={{ alignSelf: 'center', marginTop: 93, marginBottom: 56 }}
                  onPress={() => { this.savePercont() }}>
                  <BlueButton name="Сохранить" />
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </Modal> */}

          <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 15 }}>
            <View style={styles.campaign}>
              {
                this.state.user.map((item, index) => {
                  return (
                    <View key={index} style={styles.infoCompanyMain}>
                      <Image
                        source={{ uri: this.state.urlImage + item.logo }}
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
                              fontSize: 20,
                              fontFamily: 'Raleway_500Medium',
                            }}>
                            {item.company_name}
                          </Text>
                          <Text
                            style={{
                              fontSize: 16,
                              color: "#A8A8A8",
                              fontFamily: 'Raleway_500Medium',
                            }}>
                            {item.made_in}
                          </Text>
                          <View
                            style={{
                              flexDirection: 'row',
                              marginTop: 4
                            }}>
                            {
                              item.saite !== null &&
                              <TouchableOpacity
                                onPress={() => {
                                  Linking.openURL(item.saite)
                                }}>
                                <Image
                                  source={require('../../assets/image/globus.png')}
                                  style={{
                                    width: 24,
                                    height: 24,
                                    marginRight: 14,
                                  }}
                                />
                              </TouchableOpacity>
                            }
                            {
                              item.saite == null &&
                              <View style={{ height: 24 }}>

                              </View>
                            }
                            {
                              item.telegram !== null &&
                              <TouchableOpacity
                                onPress={() => {
                                  Linking.openURL(item.telegram)
                                }}>
                                <Image
                                  source={require('../../assets/image/telegram.png')}
                                  style={{
                                    width: 24,
                                    height: 24,
                                    marginRight: 14,
                                  }}
                                />
                              </TouchableOpacity>
                            }

                            {
                              item.extract !== null &&
                              <TouchableOpacity>
                                <Image
                                  source={require('../../assets/image/sidebar.png')}
                                  style={{
                                    width: 18,
                                    height: 24,
                                  }}
                                />
                              </TouchableOpacity>
                            }
                          </View>
                        </View>
                        {/* <TouchableOpacity>
                          <Image
                            source={require('../../assets/image/heartHast.png')}
                            style={{
                              width: 24,
                              height: 21.43,
                              tintColor: '#333333',
                              marginTop: 5,
                            }} />
                        </TouchableOpacity> */}
                      </View>
                    </View>
                  )
                })
              }



              <View
                style={{
                  position: 'relative',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 9,
                  justifyContent: "space-between",
                }}>
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    borderColor: '#F5F5F5',
                    width: '50%',
                    borderRadius: 5,
                    position: 'relative',
                    height: 24,
                    paddingLeft: 5,
                  }}
                  onPress={() => this.setState({ sOpenCityDropDown: !this.state.sOpenCityDropDown })}
                >
                  <Text style={{ fontFamily: 'Raleway_400Regular', }}>{this.state.changed}</Text>
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
                  <ScrollView nestedScrollEnabled={true}>
                    {
                      this.state.city_for_sales_user.map((item, index) => {
                        return (
                          <TouchableOpacity
                            key={index}
                            style={{
                              width: '100%',
                              justifyContent: 'center',
                              textAlign: 'left',
                            }}
                            onPress={() => this.setState({ changed: item.city_name, sOpenCityDropDown: false })}
                          >
                            <Text style={{ textAlign: 'left', paddingVertical: 10, fontFamily: 'Raleway_400Regular', }}>
                              {item.city_name}
                            </Text>

                          </TouchableOpacity>
                        )

                      })
                    }
                  </ScrollView>
                </View>

                {
                  this.state.user.map((item, index) => {
                    return (
                      <View style={styles.checkBox} key={index}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                          <Text style={{
                            fontSize: 13,
                            marginRight: 5,
                            fontFamily: 'Raleway_400Regular',
                          }}>
                            Шоурум
                          </Text>
                          <View>
                            {item.show_room == null &&
                              <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <Rect x="0.2" y="0.2" width="19.6" height="19.6" rx="3.8" stroke="#52A8EF" stroke-width="0.4" />
                              </Svg>
                            }
                            {item.show_room == 'Да' &&
                              <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <Path d="M4 11.4L7.52941 15.4L16 5" stroke="#52A8EF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <Rect x="0.2" y="0.2" width="19.6" height="19.6" rx="3.8" stroke="#52A8EF" stroke-width="0.4" />
                              </Svg>

                            }
                          </View>
                        </View>
                      </View>
                    )
                  })
                }
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
                <View
                  style={[
                    styles.info,
                    {
                      borderRightWidth: 2,
                      borderRightColor: '#EEEEEE'
                    }]}
                  onPress={() => { this.setState({ RewardModal: true }) }}>
                  <Image
                    source={require('../../assets/image/la_percent.png')}
                    style={{
                      width: 30,
                      height: 30,
                      resizeMode: 'contain',
                    }} />
                  <Text style={styles.infoText}>Вознаграждение</Text>
                </View>
                <View style={[styles.info, { borderRightWidth: 2, borderRightColor: '#EEEEEE' }]}>
                  <Image
                    source={require('../../assets/image/clarity_ruble-line.png')}
                    style={{
                      width: 30,
                      height: 30,
                      resizeMode: 'contain',
                    }} />
                  <Text style={styles.infoText}>Запрос{'\n'}стоимости</Text>
                </View>
                <View style={styles.info}>
                  <Image
                    source={require('../../assets/image/pcichka.png')}
                    style={{
                      width: 30,
                      height: 30,
                      resizeMode: 'contain',
                    }} />
                  <Text style={styles.infoText}>Бронировать</Text>
                </View>
              </View>
              <View style={{ zIndex: -1 }}>
                <ScrollView
                  horizontal={true}
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                >
                  {
                    this.state.user_category_for_product.map((item, index) => {
                      return (
                        <TouchableOpacity
                          key={index}
                          onPress={async () => {
                            if (index !== this.state.active) {
                              await this.updateProduct(item.category_name)
                              this.setState({ active: index })
                            }
                            else if (index == this.state.active) {
                              this.getObjectData()
                              this.setState({ active: null })
                            }
                          }}
                          style={this.state.active === index ? styles.categoryButtonActive : styles.categoryButton}
                        >
                          <Text style={this.state.active === index ? styles.categoriesNameActive : styles.categoriesName}>{item.category_name}</Text>

                        </TouchableOpacity>
                      )
                    })
                  }
                </ScrollView>
              </View>
              {
                this.state.products.map((item, index) => {
                  return (
                    <View key={index} style={{ marginTop: 18 }}>
                      <Slider2 slid={item.product_image} />
                      <Text style={{ fontFamily: 'Raleway_700Bold', fontSize: 13, marginTop: 6 }}>{item.name}</Text>
                      <Text style={styles.zakazInfo}>Фасады : {item.facades}</Text>
                      <Text style={styles.zakazInfo}>Корпус: {item.frame}</Text>
                      <Text style={styles.zakazInfo}>Столешница: {item.tabletop}</Text>
                      <Text style={styles.zakazInfo}>Длина: {item.length} метров*</Text>
                      <Text style={styles.zakazInfo}>Цена: {item.price} руб.</Text>
                    </View>
                  )
                })
              }
            </View>
          </ScrollView>
        </View>
        <CustomerMainPageNavComponent navigation={this.props.navigation} />
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
  user: {
    width: 30,
    height: 30,
    backgroundColor: '#F3F3F3',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15
  },
  campaign: {
    width: '100%',
    marginBottom: 34,
  },
  infoCompanyMain: {
    width: '100%',
    // borderWidth: 1,
    // borderColor: '#000',
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
  categoryButton: {
    paddingHorizontal: 16,
    paddingBottom: 11,
    paddingTop: 9,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    marginRight: 6
  },
  categoryButtonActive: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    paddingTop: 8,
    backgroundColor: '#94D8F4',
    borderRadius: 8,
    marginRight: 6
  },
  DesignerRemunerationPercentageParent: {
    width: '90%',
    marginTop: 85,
    alignSelf: 'center',
  },
  DesignerRemunerationPercentage: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'space-between'
  },
  procentText: {
    fontSize: 14,
    fontFamily: 'Poppins_500Medium',
    color: '#888888',
  },
  procentInput: {
    borderWidth: 1,
    borderColor: '#F5F5F5',
    borderRadius: 6,
    width: '22%',
    height: '100%',
    paddingLeft: 5,
    fontSize: 14,
    fontWeight: '400',
    color: '#888888',
    marginRight: 10
  },
  rubli: {
    height: '100%',
    width: 21,
    backgroundColor: '#F5F5F5',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#888888',
    marginRight: 10
  },
  procent: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F5F5F5',
    borderRadius: 6,
    width: 45,
    height: '100%',
    paddingLeft: 5,
    fontSize: 14,
    fontWeight: '400',
    color: '#888888',
  },
  presoble: {
    width: 90,
    height: 32,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  zakazInfo: {
    fontSize: 14,
    fontFamily: 'Raleway_400Regular',
    // marginTop: 5
  },

  DesignerRemunerationPercentageParent: {
    width: '90%',
    marginTop: 85,
    alignSelf: 'center',
  },
  DesignerRemunerationPercentage: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'space-between'
  },
  procentText: {
    fontSize: 14,
    fontFamily: 'Poppins_500Medium',
    color: '#888888',
  },
  procentInput: {
    borderWidth: 1,
    borderColor: '#F5F5F5',
    borderRadius: 6,
    width: '22%',
    height: '100%',
    paddingLeft: 5,
    fontSize: 14,
    fontWeight: '400',
    color: '#888888',
    marginRight: 10
  },
  rubli: {
    height: '100%',
    width: 21,
    backgroundColor: '#F5F5F5',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#888888',
    marginRight: 10
  },
  procent: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F5F5F5',
    borderRadius: 6,
    width: 45,
    height: '100%',
    paddingLeft: 5,
    fontSize: 14,
    fontWeight: '400',
    color: '#888888',
  },
  presoble: {
    width: 90,
    height: 32,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
})