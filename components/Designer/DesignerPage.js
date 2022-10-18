import React, { Component } from "react";
import { SafeAreaView, View, Image, Text, Keyboard, TouchableOpacity, TextInput, ScrollView, StyleSheet, Pressable } from "react-native";
import Svg, { Path, Rect } from "react-native-svg";
import Slider from "../slider/Slider";
import FilterComponent from "../Component/FilterComponent";
import DesignerPageNavComponent from "./DesignerPageNav";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default class CustomerMainPageComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: false,
      keyboardOpen: false,
      getAllProducts: [],
      urlImage: 'http://80.78.246.59/Refectio/storage/app/uploads/',
      countMeshok: 0,
      logo: '',
      name: ''
    }


    this.handler = this.handler.bind(this)
    this.closeFilter = this.closeFilter.bind(this)
  }


  getProductsFunction = async () => {
    await fetch('http://80.78.246.59/Refectio/public/api/GetAllProduct', {
      method: 'GET',
    })
      .then(response => response.json())
      .then(res => {

        // console.log(res.data.data.data, 'res.data.data.data')
        let data = res.data.data;
        let new_data_result = [];

        for (let i = 0; i < data.length; i++) {

          if (data[i].user_product_limit1.length < 1) {
            data[i].images = [];
            continue;
          }

          let product_image = data[i].user_product_limit1[0].product_image;

          data[i].images = product_image;

        }

        // console.log(data, 'res.data.data.data');


        this.setState({
          getAllProducts: data
        })

      })
      .catch(error => console.log('error', error));
  }



  handler(data) {

    console.log('click to handler', data);

    this.setState({
      view: data
    })
  }

  closeFilter = async () => {
    await this.setState({
      filter: false
    })
    console.log('click to closeFilter');
  }

  modalState = async () => {
    await this.setState({
      filter: true
    })
  }


  formImageData = new FormData()


  componentDidMount() {
    this.getAuthUserProfile()
    this.getProductsFunction()
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
        this.setState({
          logo: res.data[0].logo,
          name: res.data[0].name,
        })
        console.log(this.state.logo);
      })
  }


  render() {
    return (
      <SafeAreaView style={{ flex: 1, }}>
        <View style={styles.main}>

          {this.state.filter &&

            <FilterComponent handler={this.handler} closeFilter={this.closeFilter} />

          }
          <View style={styles.nameCompanyParent}>
            {
              this.state.logo == null &&

              <View style={styles.user}>
                <Svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <Path d="M8.22085 9.16464C5.81524 9.16464 3.85818 7.26068 3.85818 4.92033C3.85818 2.57999 5.81524 0.676483 8.22085 0.676483C10.6265 0.676483 12.5835 2.58044 12.5835 4.92079C12.5835 7.26114 10.6265 9.16464 8.22085 9.16464ZM8.22085 1.07955C6.04421 1.07955 4.27296 2.80274 4.27296 4.92033C4.27296 7.03792 6.04421 8.76112 8.22085 8.76112C10.3975 8.76112 12.1687 7.03792 12.1687 4.92033C12.1687 2.80274 10.3975 1.07955 8.22085 1.07955ZM16.1166 16.3235H0.325064C0.270062 16.3235 0.217311 16.3023 0.178418 16.2644C0.139526 16.2266 0.117676 16.1753 0.117676 16.1218V13.5167C0.306765 10.2077 3.37114 10.0082 3.40211 10.0064L13.0269 10.0059C13.0691 10.0078 16.1345 10.2077 16.3231 13.5053L16.3236 16.1218C16.3237 16.1483 16.3184 16.1745 16.3081 16.199C16.2977 16.2235 16.2825 16.2458 16.2633 16.2646C16.244 16.2833 16.2212 16.2982 16.196 16.3083C16.1708 16.3184 16.1439 16.3236 16.1166 16.3235ZM0.532453 15.9205H15.9092V13.5167C15.7413 10.587 13.1273 10.4149 13.0161 10.409L3.41384 10.4094C3.31437 10.4154 0.700429 10.5966 0.532453 13.5276V15.9205Z" fill="black" />
                </Svg>
              </View>
            }
            {
              this.state.logo !== null &&
              <Image style={styles.user} source={{ uri: this.state.urlImage + this.state.logo }} />
            }

            <Text style={styles.myComponyName}>{this.state.name}</Text>
          </View>

          <View style={styles.searchParent}>
            <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <Path d="M15.7656 14.6895L10.6934 9.61719C11.4805 8.59961 11.9063 7.35547 11.9063 6.04688C11.9063 4.48047 11.2949 3.01172 10.1895 1.9043C9.08398 0.796875 7.61133 0.1875 6.04688 0.1875C4.48242 0.1875 3.00977 0.798828 1.9043 1.9043C0.796875 3.00977 0.1875 4.48047 0.1875 6.04688C0.1875 7.61133 0.798828 9.08398 1.9043 10.1895C3.00977 11.2969 4.48047 11.9063 6.04688 11.9063C7.35547 11.9063 8.59766 11.4805 9.61524 10.6953L14.6875 15.7656C14.7024 15.7805 14.72 15.7923 14.7395 15.8004C14.7589 15.8084 14.7797 15.8126 14.8008 15.8126C14.8218 15.8126 14.8427 15.8084 14.8621 15.8004C14.8815 15.7923 14.8992 15.7805 14.9141 15.7656L15.7656 14.916C15.7805 14.9011 15.7923 14.8835 15.8004 14.864C15.8084 14.8446 15.8126 14.8238 15.8126 14.8027C15.8126 14.7817 15.8084 14.7609 15.8004 14.7414C15.7923 14.722 15.7805 14.7043 15.7656 14.6895ZM9.14063 9.14063C8.3125 9.9668 7.21484 10.4219 6.04688 10.4219C4.87891 10.4219 3.78125 9.9668 2.95313 9.14063C2.12695 8.3125 1.67188 7.21484 1.67188 6.04688C1.67188 4.87891 2.12695 3.7793 2.95313 2.95313C3.78125 2.12695 4.87891 1.67188 6.04688 1.67188C7.21484 1.67188 8.31445 2.125 9.14063 2.95313C9.9668 3.78125 10.4219 4.87891 10.4219 6.04688C10.4219 7.21484 9.9668 8.31445 9.14063 9.14063Z" fill="black" />
            </Svg>
            <TextInput
              style={{
                width: '85%',
                height: '90%',
                borderColor: '#D9D9D9',
                borderRightWidth: 1,
                color: '#000',
                fontSize: 15,
              }}
              placeholder="Поиск"
              placeholderTextColor="#000"
            />
            <TouchableOpacity
              onPress={() => this.modalState()}>
              <Svg width="23" height="19" viewBox="0 0 23 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path d="M22.4375 3.25H19.2344C18.8438 1.45312 17.2812 0.125 15.4062 0.125C13.5312 0.125 11.9688 1.45312 11.5781 3.25H0.5625V4.8125H11.5781C11.9688 6.60938 13.5312 7.9375 15.4062 7.9375C17.2812 7.9375 18.8438 6.60938 19.2344 4.8125H22.4375V3.25ZM15.4062 6.375C14.0781 6.375 13.0625 5.35938 13.0625 4.03125C13.0625 2.70312 14.0781 1.6875 15.4062 1.6875C16.7344 1.6875 17.75 2.70312 17.75 4.03125C17.75 5.35938 16.7344 6.375 15.4062 6.375ZM0.5625 15.75H3.76562C4.15625 17.5469 5.71875 18.875 7.59375 18.875C9.46875 18.875 11.0312 17.5469 11.4219 15.75H22.4375V14.1875H11.4219C11.0312 12.3906 9.46875 11.0625 7.59375 11.0625C5.71875 11.0625 4.15625 12.3906 3.76562 14.1875H0.5625V15.75ZM7.59375 12.625C8.92188 12.625 9.9375 13.6406 9.9375 14.9688C9.9375 16.2969 8.92188 17.3125 7.59375 17.3125C6.26562 17.3125 5.25 16.2969 5.25 14.9688C5.25 13.6406 6.26562 12.625 7.59375 12.625Z" fill="black" />
              </Svg>
            </TouchableOpacity>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            {
              this.state.getAllProducts.map((item, index) => {
                let count = item.meshok
                return (
                  item.user_product_limit1.length !== 0 &&
                  <View key={index} style={styles.campaign} >
                    <TouchableOpacity
                      onPress={async () => {
                        this.props.navigation.navigate('DesignerPageTwo', {
                          params: item.id
                        })
                        console.log(item.id);
                      }}>
                      <View style={styles.infoCompanyMain}>
                        <Image
                          source={{ uri: this.state.urlImage + item.logo }}
                          style={{
                            width: 70,
                            height: 70,
                            marginRight: 12,
                            borderColor: '#C8C8C8',
                            borderWidth: 1,
                          }}
                        />
                        <View style={styles.infoCompany}>
                          <View>
                            <Text
                              style={{
                                fontSize: 20,
                                fontFamily: 'Raleway_700Bold',
                                marginBottom: 6,
                              }}>
                              {item.company_name}
                            </Text>
                            <View style={{ flexDirection: 'row' }}>
                              {[...new Array(Number(count))].map((value, i) => <Image key={i} source={require('../../assets/image/meshok.png')} style={{ width: 15, height: 20.5, marginRight: 3 }} />)}
                            </View>
                          </View>



                          <Text
                            key={index}
                            style={{
                              fontSize: 16,
                              color: "#A8A8A8",
                              fontFamily: 'Raleway_500Medium',
                              paddingTop: 5
                            }}>
                            {item.made_in}
                          </Text>


                        </View>
                      </View>
                    </TouchableOpacity>
                    <View>
                      <ScrollView
                        horizontal={true}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                      >
                        {
                          item.user_category_product.map((ite, ind) => {
                            return (
                              <Text key={ite.id} style={styles.categoriesName}>{ite.category_name}</Text>
                            )
                          })
                        }
                      </ScrollView>
                    </View>
                    <Slider slid={item.images} />
                  </View>
                )
              })
            }
          </ScrollView>
        </View >
        {
          this.state.keyboardOpen === false &&
          <DesignerPageNavComponent active_page={'Главная'} navigation={this.props.navigation} />
        }
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
    // borderColor: '#000',
    // borderWidth: 1,
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
  myComponyName: {
    fontSize: 22,
    marginLeft: 10,
    fontFamily: 'Raleway_700Bold',
  },
  searchParent: {
    marginVertical: 17,
    width: '100%',
    height: 35,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 10,
    borderRadius: 5
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
    width: '76%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  categoriesName: {
    fontSize: 13,
    fontFamily: 'Montserrat_400Regular',
    paddingHorizontal: 3,
    paddingVertical: 5,
    marginRight: 11
  },
})