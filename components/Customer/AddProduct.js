import React, { Component } from "react";
import { SafeAreaView, View, Image, Text, Touchable, TouchableOpacity, TextInput, ScrollView, StyleSheet, Keyboard } from "react-native";
import ArrowGrayComponent from "../../assets/image/ArrowGray";
import BlueButton from "../Component/Buttons/BlueButton"
import CustomerMainPageNavComponent from "./CustomerMainPageNav";
import Svg, { Path, Rect } from "react-native-svg";
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class AddProductComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      keyboardOpen: false,
      options: [],
      category: false,
      categoryChanged: '',
      categoryId: '',
      img: null,

      name: "",
      name_error: false,

      frame: "",
      frame_error: false,

      facades: "",
      facades_error: false,

      length: "",
      length_error: false,

      height: "",
      height_error: false,

      price: "",
      price_error: false,

      tabletop: "",
      tabletop_error: false,
      all_images: [],

    }
  }
  formdata = new FormData();

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });
    if (!result.cancelled) {
      this.setState({ img: result.uri });
    }



    let all_images = [];

    await result.selected.map((element, index) => {
      console.log(element);

      // this.formdata.append("photo[]", {
      //   uri: element.uri,
      //   type: 'image/jpg',
      //   name: 'photo.jpg',
      // });

      all_images.push({
        uri: element.uri,
        type: 'image/jpg',
        name: 'photo.jpg',
      })

    })


    this.setState({
      all_images: all_images
    });


    // console.log(this.formdata);
  };

  delateSelectedImage = async (index) => {
    let { all_images } = this.state
    // all_images.find()

    // if (ind > -1) { // only splice array when item is found
    //   all_images.splice(ind, 1); // 2nd parameter means remove one item only
    // }
    // console.log(ind);

    let new_all_images = [];

    for (let i = 0; i < all_images.length; i++) {

      if (i == index) {
        continue
      }
      new_all_images.push(all_images[i]);

    }
    this.setState({
      all_images: new_all_images
    });

  }


  getProductCategory = async () => {
    await fetch("http://80.78.246.59/Refectio/public/api/GetProductCategory", {
      method: 'GET'
    })
      .then(response => response.json())
      .then((res) => {
        this.setState({ options: res.data.city })
      })
      .catch(error => error, 'error')
  }



  sendProduct = async () => {
    let { all_images } = this.state;
    let myHeaders = new Headers();
    let userToken = await AsyncStorage.getItem('userToken');
    let AuthStr = 'Bearer ' + userToken;
    myHeaders.append("Authorization", AuthStr);
    myHeaders.append("Content-Type", "multipart/form-data");


    this.formdata.append("category_id", this.state.categoryId);
    this.formdata.append("category_name", this.state.categoryChanged);
    this.formdata.append("name", this.state.name);
    this.formdata.append("frame", this.state.frame);
    this.formdata.append("facades", this.state.facades);
    this.formdata.append("length", this.state.length);
    this.formdata.append("height", "12");
    this.formdata.append("price", this.state.price);
    this.formdata.append("tabletop", this.state.tabletop);



    await all_images.map((element, index) => {

      console.log(element);

      this.formdata.append("photo[]", element);

    })


    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: this.formdata,
      redirect: 'follow'
    };

    await fetch("http://80.78.246.59/Refectio/public/api/createnewproductProizvoditel", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result, 'createnewproductProizvoditel')

        if (result.status === true) {
          this.props.navigation.navigate("Praductia", {
            params: this.props.id
          })
          console.log(this.props.id, 'this.props.id')
        }
      })
      .catch(error => console.log('error', error));


  }


  componentDidMount() {
    this.getProductCategory()
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


  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.main}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("Praductia", {
                params: this.props.id
              })
            }}
            style={{
              position: 'absolute',
              left: 11.66,
              top: 10,
              zIndex: 100
            }}>
            <ArrowGrayComponent />
          </TouchableOpacity>
          <View style={styles.container}>
            <Text
              style={{
                fontSize: 17,
                fontFamily: 'Poppins_600SemiBold',
                textAlign: 'center',
                marginTop: 15
              }}>
              Добавление продукции
            </Text>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              <Text
                style={{
                  fontFamily: 'Poppins_500Medium',
                  lineHeight: 23,
                  fontSize: 16,
                  color: '#5B5B5B',
                  marginBottom: 5,
                  marginTop: 25
                }}
              >
                Имя продукции
              </Text>
              <TextInput
                underlineColorAndroid="transparent"
                placeholder="Кухня ЛРАЙ145 МДФ ПВХ Сатин Бежевый/СИСТЕМА"
                keyboardType="default"
                style={{
                  borderWidth: 1,
                  borderColor: '#F5F5F5',
                  padding: 10,
                  width: '100%',
                  borderRadius: 5,
                }}
                value={this.state.name}
                onChangeText={(text) => this.setState({ name: text })}
              />
            </View>

            <View>
              <Text
                style={{
                  fontFamily: 'Poppins_500Medium',
                  lineHeight: 23,
                  fontSize: 16,
                  color: '#5B5B5B',
                  marginBottom: 5,
                  marginTop: 12
                }}
              >
                Категории
              </Text>
              <View
                style={{
                  position: 'relative',
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
                  onPress={() => !this.state.category ? this.setState({ category: true }) : this.setState({ category: false })}
                >
                  <Text style={{ color: "#5B5B5B", fontFamily: 'Poppins_500Medium', }}>{this.state.categoryChanged}</Text>

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
                          onPress={() => this.setState({ categoryChanged: item.name, category: false, categoryId: item.id })}
                        >
                          <Text style={{ textAlign: 'left', paddingVertical: 10, fontFamily: 'Poppins_500Medium', }}>
                            {item.name}
                          </Text>

                        </TouchableOpacity>
                      )

                    })
                  }
                </ScrollView>
              </View>
            </View>


            <View>
              <Text
                style={{
                  fontFamily: 'Poppins_500Medium',
                  lineHeight: 23,
                  fontSize: 16,
                  color: '#5B5B5B',
                  marginBottom: 5,
                  marginTop: 12
                }}
              >
                Корпус
              </Text>
              <TextInput
                underlineColorAndroid="transparent"
                placeholder="ДСП"
                keyboardType="default"
                style={{
                  borderWidth: 1,
                  borderColor: '#F5F5F5',
                  padding: 10,
                  width: '100%',
                  borderRadius: 5,
                }}
                value={this.state.frame}
                onChangeText={(text) => this.setState({ frame: text })}
              />
            </View>


            <View>
              <Text
                style={{
                  fontFamily: 'Poppins_500Medium',
                  lineHeight: 23,
                  fontSize: 16,
                  color: '#5B5B5B',
                  marginBottom: 5,
                  marginTop: 12
                }}
              >
                Столешница
              </Text>
              <TextInput
                underlineColorAndroid="transparent"
                placeholder="Камень"
                keyboardType="default"
                style={{
                  borderWidth: 1,
                  borderColor: '#F5F5F5',
                  padding: 10,
                  width: '100%',
                  borderRadius: 5,
                }}
                value={this.state.tabletop}
                onChangeText={(text) => this.setState({ tabletop: text })}
              />
            </View>


            <View>
              <Text
                style={{
                  fontFamily: 'Poppins_500Medium',
                  lineHeight: 23,
                  fontSize: 16,
                  color: '#5B5B5B',
                  marginBottom: 5,
                  marginTop: 12
                }}
              >
                Длина
              </Text>
              <TextInput
                underlineColorAndroid="transparent"
                placeholder="8 метров"
                keyboardType="number-pad"
                style={{
                  borderWidth: 1,
                  borderColor: '#F5F5F5',
                  padding: 10,
                  width: '100%',
                  borderRadius: 5,
                }}
                value={this.state.length}
                onChangeText={(text) => this.setState({ length: text })}
              />
            </View>



            <View>
              <Text
                style={{
                  fontFamily: 'Poppins_500Medium',
                  lineHeight: 23,
                  fontSize: 16,
                  color: '#5B5B5B',
                  marginBottom: 5,
                  marginTop: 12
                }}
              >
                Фасады
              </Text>
              <TextInput
                underlineColorAndroid="transparent"
                placeholder="Змаль"
                keyboardType="default"
                style={{
                  borderWidth: 1,
                  borderColor: '#F5F5F5',
                  padding: 10,
                  width: '100%',
                  borderRadius: 5,
                }}
                value={this.state.facades}
                onChangeText={(text) => this.setState({ facades: text })}
              />
            </View>

            <View>
              <Text
                style={{
                  fontFamily: 'Poppins_500Medium',
                  lineHeight: 23,
                  fontSize: 16,
                  color: '#5B5B5B',
                  marginBottom: 5,
                  marginTop: 12
                }}
              >
                Цена
              </Text>
              <View style={{ flexDirection: 'row' }}>
                <TextInput
                  underlineColorAndroid="transparent"
                  placeholder="1.000.000"
                  keyboardType="number-pad"
                  style={{
                    borderWidth: 1,
                    borderColor: '#F5F5F5',
                    padding: 10,
                    width: '90%',
                    borderRadius: 5,
                    marginRight: 5
                  }}
                  value={this.state.price}
                  onChangeText={(text) => this.setState({ price: text })}
                />
                <Image
                  source={require('../../assets/image/apranqiGin.png')}
                  style={{ width: 32, height: 50 }}
                />
              </View>
            </View>

            <Text
              style={{
                fontSize: 16,
                fontFamily: 'Poppins_500Medium',
                marginTop: 15
              }}>
              Фотографии продукта
            </Text>

            <TouchableOpacity
              onPress={() => this.pickImage()}
              style={{
                width: 165,
                height: 38,
                backgroundColor: '#B5D8FE',
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 12
              }}>
              <Text
                style={{
                  fontSize: 18,
                  color: '#fff',
                  fontFamily: 'Poppins_500Medium',
                }}>
                Загрузить
              </Text>
            </TouchableOpacity>



            {this.state.all_images.length > 0 &&
              <ScrollView horizontal={true} style={{ marginTop: 30 }} showsHorizontalScrollIndicator={false}>
                <View style={{ flexDirection: 'row', height: 120, alignItems: 'center', }}>
                  {
                    this.state.all_images.map((item, index) => {
                      return (
                        <View key={index} style={{ marginRight: 10, position: 'relative', width: 100, height: 100 }}>
                          <Image source={{ uri: item.uri }} style={{ width: '100%', height: '100%', resizeMode: 'cover' }} />

                          <TouchableOpacity onPress={() => this.delateSelectedImage(index)} style={{ width: 20, height: 20, position: 'absolute', right: 5, top: 5, backgroundColor: 'white', borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('../../assets/image/ixs.png')} style={{ width: 10, height: 10 }} />
                          </TouchableOpacity>
                        </View>
                      )
                    })
                  }

                </View>
              </ScrollView>
            }



            <TouchableOpacity
              onPress={() => {
                this.sendProduct()

              }}
              style={{
                alignSelf: 'center',
                marginTop: 60,
                marginBottom: 60,
              }}>
              <BlueButton name="Добавить" />
            </TouchableOpacity>

          </ScrollView>
        </View>
        {this.state.keyboardOpen === false &&
          <CustomerMainPageNavComponent navigation={this.props.navigation} />
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
})



