import React, { Component } from "react";
import { SafeAreaView, View, Image, Text, Touchable, TouchableOpacity, TextInput, ScrollView, StyleSheet, Modal, ImageBackground, ActivityIndicator } from "react-native";
import Svg, { Path, Rect } from "react-native-svg";
import Slider from "../slider/Slider";
import GhostNavComponent from "./GhostNav";
import BlueButton from "../Component/Buttons/BlueButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Slider2 from "../slider/Slider2";




export default class GhostPageTwoComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      bronyModal: false,

      changed: '',
      sOpenCityDropDown: false,
      active: 0,

      user: [],
      user_category_for_product: [],
      city_for_sales_user: [],
      products: [],

      categorySelect: false,

      praizvaditelSelect: false,

      getPraizvaditel: [],

      getPraizvaditelMap: [
        {
          proizvodtel_name: '',
          proizvodtel_id: '',
          proizvoditel_price: '',
          drobdown_is_open: false
        },
      ],

      praizvaditel_name: '',

      urlImage: 'http://80.78.246.59/Refectio/storage/app/uploads/',


      category_name: '',
      category_name_error: false,

      change_category_loaded: false,
      pressCategory: true,


    }
  }






  getObjectData = async () => {
    let userID = this.props.user_id


    await fetch('http://80.78.246.59/Refectio/public/api/getOneProizvoditel/user_id=' + userID, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(res => {
        this.setState({
          user: res.data.user,
          user_category_for_product: res.data.user_category_for_product,
          city_for_sales_user: res.data.city_for_sales_user,
         
        })

      })
  }

  updateProduct = async (category_name) => {

    await this.setState({
      change_category_loaded: true,
    })

    let userID = this.props.user_id

    let myHeaders = new Headers();
    let userToken = await AsyncStorage.getItem('userToken')
    myHeaders.append("Authorization", "Bearer " + userToken);


    let formdata = new FormData();
    formdata.append("category_name", category_name);
    formdata.append("user_id", userID);

    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };


    fetch("http://80.78.246.59/Refectio/public/api/filtergetOneProizvoditel", requestOptions)
      .then(response => response.json())
      .then(res => {

        if (res.status === false) {

          this.setState({
            products: [],
            // show_plus_button: false
            change_category_loaded: false
          })

          return false;
        }

        let data = res.data;
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
          // user: data.user,
          // user_bonus_for_designer: res.data.user_bonus_for_designer,
          // user_category_for_product: res.data.user_category_for_product,
          // city_for_sales_user: res.data.city_for_sales_user,
          products: data.products,
          // show_plus_button: false,
          // extract: data.user[0].extract,
          // whatsapp: res.data.user[0].watsap_phone
          change_category_loaded: false
        })
      })
      .catch(error => console.log('error', error));


  }



  updateProductAfterClickToCategory = async (category_name, index) => {
    await this.setState({
      change_category_loaded: true,
    })


    if (this.state.pressCategory) {
      this.setState({
        pressCategory: false,
        active: index
      })


        await this.setState({
          change_category_loaded: true,
        })

        let userID = this.props.user_id

        let myHeaders = new Headers();
        let userToken = await AsyncStorage.getItem('userToken')
        myHeaders.append("Authorization", "Bearer " + userToken);


        let formdata = new FormData();
        formdata.append("category_name", category_name);
        formdata.append("user_id", userID);

        let requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: formdata,
          redirect: 'follow'
        };


        fetch("http://80.78.246.59/Refectio/public/api/filtergetOneProizvoditel", requestOptions)
          .then(response => response.json())
          .then(res => {


            if (res.status === false) {

              this.setState({
                products: [],
                // show_plus_button: false
                change_category_loaded: false
              })

              return false;
            }

            let data = res.data;
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
              // user: data.user,
              // user_bonus_for_designer: res.data.user_bonus_for_designer,
              // user_category_for_product: res.data.user_category_for_product,
              // city_for_sales_user: res.data.city_for_sales_user,
              products: data.products,
              // show_plus_button: false,
              // extract: data.user[0].extract,
              // whatsapp: res.data.user[0].watsap_phone
              change_category_loaded: false,
              pressCategory: true
            })
          })
      // }

    }

    // this.setState({ active: index })



  }

  loadedDataAfterLoadPage = async () => {
    await this.getObjectData()
    await this.updateProduct(this.state.user_category_for_product[0].category_name)
    await this.setState({ changed: this.state.city_for_sales_user[0].city_name })
    await this.setState({ active: 0 })
  }


  componentDidMount() {
    const { navigation } = this.props;

    this.focusListener = navigation.addListener("focus", () => {

      this.loadedDataAfterLoadPage()

    });
  }

  componentWillUnmount() {
    // Remove the event listener
    if (this.focusListener) {
      this.focusListener();
    }
  }



  render() {
    return (
      <SafeAreaView style={{ flex: 1, }}>
        <View style={styles.main}>
          <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 15 }}>
            <View style={styles.campaign}>
              {
                this.state.user.length > 0 &&
                <View style={styles.infoCompanyMain}>
                  <Image
                    source={{ uri: this.state.urlImage + this.state.user[0].logo }}
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
                        {this.state.user[0].company_name}
                      </Text>
                      <Text
                        style={{
                          fontSize: 16,
                          color: "#A8A8A8",
                          fontFamily: 'Raleway_500Medium',
                        }}>
                        {this.state.user[0].made_in}
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          marginTop: 4
                        }}>
                        {
                          this.state.user[0].saite !== null &&
                          <TouchableOpacity onPress={() => {
                            this.props.navigation.navigate('Modal')
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
                          this.state.user[0].saite == null &&
                          <View style={{ height: 24 }}>

                          </View>
                        }
                        {
                          this.state.user[0].telegram !== null &&
                          <TouchableOpacity onPress={() => {
                            this.props.navigation.navigate('Modal')
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
                          this.state.user[0].extract !== null &&
                          <TouchableOpacity onPress={() => {
                            this.props.navigation.navigate('Modal')
                          }}>
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
                  </View>
                </View>
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
                  this.state.user.length > 0 &&
                  <View style={styles.checkBox}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                      <Text style={{
                        fontSize: 13,
                        marginRight: 5,
                        fontFamily: 'Raleway_400Regular',
                      }}>
                        ????????????
                      </Text>
                      <View>
                        {this.state.user[0].show_room == null &&
                          <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Rect x="0.2" y="0.2" width="19.6" height="19.6" rx="3.8" stroke="#52A8EF" stroke-width="0.4" />
                          </Svg>
                        }
                        {this.state.user[0].show_room == '????' &&
                          <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path d="M4 11.4L7.52941 15.4L16 5" stroke="#52A8EF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <Rect x="0.2" y="0.2" width="19.6" height="19.6" rx="3.8" stroke="#52A8EF" stroke-width="0.4" />
                          </Svg>
                        }
                      </View>
                    </View>
                  </View>
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
                <TouchableOpacity style={[styles.info, { borderRightWidth: 2, borderRightColor: '#EEEEEE' }]}
                  onPress={() => { this.props.navigation.navigate('Modal') }}>
                  <Image
                    source={require('../../assets/image/la_percent.png')}
                    style={{
                      width: 30,
                      height: 30,
                      resizeMode: 'contain',
                    }} />
                  <Text style={styles.infoText}>????????????????????????????</Text>
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
                  <Text style={styles.infoText}>????????????{'\n'}??????????????????</Text>
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
                  <Text style={styles.infoText}>??????????????????????</Text>
                </TouchableOpacity>
              </View>



              <View style={{ marginBottom: 15, zIndex: -1, marginTop: 8 }}>
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
                            await this.updateProductAfterClickToCategory(item.category_name)
                            this.setState({ active: index })
                          }}
                          style={this.state.active === index ? styles.categoriesButtonActive : styles.categoriesButton}
                        >
                          <Text style={this.state.active === index ? styles.categoriesNameActive : styles.categoriesName}>{item.category_name}</Text>

                        </TouchableOpacity>
                      )
                    })
                  }
                </ScrollView>

              </View>



              {this.state.change_category_loaded &&
                <View style={{ marginTop: 200 }}>
                  <ActivityIndicator size={100} color={'#2D9EFB'} />
                </View>
              }


              {
                !this.state.change_category_loaded && this.state.products.map((item, index) => {
                  return (
                    <View key={index} style={{ marginTop: 18 }}>
                      <Slider2 slid={item.product_image} />
                      <Text style={{ fontFamily: 'Raleway_600SemiBold', fontSize: 13, marginTop: 5, marginBottom: 4 }}>{item.name}</Text>
                      {
                        item.facades &&
                        <Text style={{ fontFamily: 'Raleway_400Regular', }}>???????????? : {item.facades}</Text>
                      }
                      {
                        item.frame &&
                        <Text style={{ fontFamily: 'Raleway_400Regular', }}>????????????:  {item.frame}</Text>
                      }
                      {
                        item.tabletop &&
                        <Text style={{ fontFamily: 'Raleway_400Regular', }}>????????????????????: {item.tabletop}</Text>
                      }
                      {
                        item.length &&
                        <Text style={{ fontFamily: 'Raleway_400Regular', }}>??????????: {item.length} ????????????*</Text>
                      }
                      {
                        item.price &&
                        <Text style={{ fontFamily: 'Raleway_400Regular', }}>????????: {item.price} ??????.</Text>
                      }
                      {
                        item.height &&
                        <Text style={{ fontFamily: 'Raleway_400Regular', }}>????????????: {item.height} ????????????*</Text>
                      }
                      {
                        item.material &&
                        <Text style={{ fontFamily: 'Raleway_400Regular', }}>????????????????: {item.material}</Text>
                      }
                      {
                        item.description &&
                        <Text style={{ fontFamily: 'Raleway_400Regular', }}>????????????????: {item.description}</Text>
                      }
                      {
                        item.inserciones &&
                        <Text style={{ fontFamily: 'Raleway_400Regular', }}>????????????????: {item.inserciones}</Text>
                      }
                    </View>
                  )
                })
              }
            </View>
          </ScrollView>
        </View>
        <GhostNavComponent active_page={'??????????????'} navigation={this.props.navigation} />
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