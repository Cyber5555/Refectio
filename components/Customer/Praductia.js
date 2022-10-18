import React, { Component } from "react";
import { StyleSheet, SafeAreaView, ScrollView, Text, TouchableOpacity, View, Image, Modal, ImageBackground } from "react-native";
import ArrowGrayComponent from "../../assets/image/ArrowGray";
import Slider from "../slider/Slider";
import CustomerMainPageNavComponent from "./CustomerMainPageNav";
import Svg, { Path, Rect } from "react-native-svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ShowMore from "../Component/Buttons/ShowMore";
import BlueButton from "../Component/Buttons/BlueButton";




export default class PraductiaComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      delateSortBy: [],

      active: null,
      getAllProducts: [],

      user: [],
      user_bonus_for_designer: [],
      user_category_for_product: [],
      city_for_sales_user: [],
      products: [],

      limit_without_cat: 2,
      limit_count_plus: 2,


      show_plus_button: false,


      delateProductModal: false
    }
  }


  showMore = async () => {
    let { limit_count_plus, limit_without_cat } = this.state;
    limit_without_cat += limit_count_plus
    await this.setState({ limit_without_cat: limit_without_cat })
    await this.getObjectData()
  }


  enterCheckBox = (id) => {
    let filterSort = this.state.delateSortBy;
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
    this.setState({ delateSortBy: filterSort })
  }

  verifyCheckBox = (id) => {
    let filterSort = this.state.delateSortBy
    let find = false
    filterSort.find((item) => {
      if (item == id) {
        find = true
      }
    })
    return find
  }


  getObjectData = async () => {
    let userID = this.props.id
    const { limit_without_cat } = this.state
    console.log(userID, 'useridddd');
    await fetch('http://80.78.246.59/Refectio/public/api/getOneProizvoditel/user_id=' + userID + '/limit=' + limit_without_cat, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(res => {

        let data = res.data.products;
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
          user: res.data.user,
          user_bonus_for_designer: res.data.user_bonus_for_designer,
          user_category_for_product: res.data.user_category_for_product,
          city_for_sales_user: res.data.city_for_sales_user,
          products: data,
          show_plus_button: true
        })
      })
  }

  delateProduct = async () => {
    let myHeaders = new Headers();
    let userToken = await AsyncStorage.getItem('userToken');
    myHeaders.append("Content-Type", "multipart/form-data");
    myHeaders.append("Authorization", 'Bearer ' + userToken)

    let formdata = new FormData();
    for (let i = 0; i < this.state.delateSortBy.length; i++) {

      formdata.append("product_id[]", this.state.delateSortBy[i]);
    }


    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    await fetch("http://80.78.246.59/Refectio/public/api/deleteAuthUserProduct", requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

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
          user: res.data.user,
          user_bonus_for_designer: res.data.data.user_bonus_for_designer,
          // user_category_for_product: res.data.user_category_for_product,
          city_for_sales_user: res.data.data.city_for_sales_user,
          products: data,
          show_plus_button: false
        })
      })
      .catch(error => console.log('error', error));


  }



  componentDidMount = () => {

    const { navigation } = this.props;

    this.getObjectData();

    this.focusListener = navigation.addListener("focus", () => {

      this.getObjectData()

    });

  }

  componentWillUnmount() {

    // Remove the event listener

    if (this.focusListener) {
      this.focusListener();
      console.log('Bum END')
    }

    // this.focusListener();

  }


  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.main}>

          <Modal visible={this.state.delateProductModal}>
            <ImageBackground
              style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}
              source={require('../../assets/image/blurBg.png')}>
              <View style={{ backgroundColor: '#FFFFFF', width: '90%', borderRadius: 20, position: 'relative' }}>
                <TouchableOpacity style={{ position: 'absolute', right: 18, top: 18 }}>
                  <Image source={require('../../assets/image/ixs.png')} style={{ width: 22.5, height: 22.5 }} />
                </TouchableOpacity>
                <Text style={{ fontFamily: 'Poppins_500Medium', fontSize: 22, textAlign: 'center', marginTop: 70, color: '#2D9EFB' }}> Удаление продукции</Text>
                <Text style={{ textAlign: 'center', fontFamily: 'Poppins_400Regular', marginTop: 30, fontSize: 16 }}>Подтвердите удаление выбранной{'\n'}продукции</Text>
                <TouchableOpacity
                  onPress={async () => {
                    await this.delateProduct()
                    await this.getObjectData()
                    this.setState({ delateProductModal: false })
                  }}
                  style={{ alignSelf: 'center', marginTop: 67 }}>
                  <BlueButton name='Подтвердить' />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ delateProductModal: false })
                  }}
                  style={{ borderWidth: 3, borderColor: '#B5D8FE', width: 285, height: 44, justifyContent: 'center', borderRadius: 20, alignSelf: 'center', marginTop: 12, marginBottom: 46 }}>
                  <Text style={{ color: '#B5D8FE', fontSize: 18, textAlign: 'center', fontFamily: 'Poppins_700Bold', }} >
                    Отменить
                  </Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </Modal>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('CustomerMyAccaunt')}
            style={{
              position: 'absolute',
              left: 15,
              top: 10,
              zIndex: 100
            }}>
            <ArrowGrayComponent />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              position: 'relative',
              marginBottom: 25
            }}>
            <Text
              style={{
                width: '100%',
                marginTop: 15,
                textAlign: 'center',
                fontSize: 17,
                fontFamily: 'Poppins_600SemiBold',
              }}>
              Продукция
            </Text>

            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('AddProduct', {
                  params: this.props.id
                })
              }}
              style={{
                position: 'absolute',
                zIndex: 100,
                right: 55,
                bottom: -5
              }}>
              <Image
                source={require('../../assets/image/plus.png')}
                style={{
                  width: 30,
                  height: 30,
                }} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.setState({ delateProductModal: true })
              }}
              style={{
                position: 'absolute',
                zIndex: 100,
                right: 15,
                bottom: -5
              }}>
              <Image
                source={require('../../assets/image/karzina.png')}
                style={{
                  width: 30,
                  height: 30,
                }} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginBottom: 23
            }}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            >
              {
                this.state.user_category_for_product.map((item, index) => {
                  return (
                    <TouchableOpacity
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
                      key={index}
                      style={this.state.active === index ? styles.slideButtonActive : styles.slideButton}
                    >
                      <Text style={this.state.active === index ? styles.slideTextActive : styles.slideText}>
                        {item.category_name}
                      </Text>
                    </TouchableOpacity>
                  )
                })
              }

            </ScrollView>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            {
              this.state.products.length === 0 ?
                <View style={{ width: '100%', marginTop: 30 }}>
                  <Text style={{ fontFamily: 'Raleway_400Regular', fontSize: 17, textAlign: 'center' }}>По выбранной категорий нет продуктов</Text>
                </View>
                :
                this.state.products.map((item, index) => {
                  return (
                    <View
                      key={item.id}
                      style={{
                        position: 'relative',
                        marginBottom: 18
                      }}>

                      <View key={item.id} style={styles.checkBox}>
                        <TouchableOpacity key={index} style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => {
                          this.enterCheckBox(item.id)
                          { console.log(item.id) }
                        }}>
                          <View >
                            {this.verifyCheckBox(item.id) === false &&
                              <Svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <Rect x="0.5" y="0.5" width="24" height="24" rx="3.5" fill="white" />
                                <Rect x="0.5" y="0.5" width="24" height="24" rx="3.5" stroke="#E5E5E5" />
                              </Svg>

                            }
                            {this.verifyCheckBox(item.id) === true &&
                              <Svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <Rect x="0.5" y="0.5" width="24" height="24" rx="3.5" fill="white" />
                                <Path d="M5 14L9.41176 19L20 6" stroke="#1571F0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <Rect x="0.5" y="0.5" width="24" height="24" rx="3.5" stroke="#E5E5E5" />
                              </Svg>
                            }
                          </View>
                        </TouchableOpacity>
                      </View>
                      <Slider slid={item.images} />
                      <Text style={{ fontFamily: 'Raleway_600SemiBold', fontSize: 13, marginTop: 5, marginBottom: 4 }}>{item.name}</Text>
                      <Text style={{ fontFamily: 'Raleway_400Regular', }}>Фасады : {item.facades}</Text>
                      <Text style={{ fontFamily: 'Raleway_400Regular', }}>Корпус:  {item.frame}</Text>
                      <Text style={{ fontFamily: 'Raleway_400Regular', }}>Столешница: {item.tabletop}</Text>
                      <Text style={{ fontFamily: 'Raleway_400Regular', }}>Длина: {item.length} метров*</Text>
                      <Text style={{ fontFamily: 'Raleway_400Regular', }}>Цена: {item.price} руб.</Text>
                    </View>
                  )
                })
            }
            {
              this.state.show_plus_button &&
              <TouchableOpacity style={{ width: '100%', alignItems: 'center', marginBottom: 20 }} onPress={() => this.showMore()}>
                <ShowMore />
              </TouchableOpacity>
            }
          </ScrollView>
        </View>
        <CustomerMainPageNavComponent navigation={this.props.navigation} />
      </SafeAreaView>
    )

  }
}


const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative',
    paddingHorizontal: 15,
  },
  checkBox: {
    position: 'absolute',
    zIndex: 100,
    right: 8,
    top: 8
  },
  slideButton: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    marginRight: 6
  },
  slideButtonActive: {
    backgroundColor: '#1571F0',
    borderRadius: 8,
    marginRight: 6
  },
  slideTextActive: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 10,
    fontFamily: 'Raleway_600SemiBold',
    color: 'white',
  },
  slideText: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 10,
    fontFamily: 'Raleway_600SemiBold',
  }
})

