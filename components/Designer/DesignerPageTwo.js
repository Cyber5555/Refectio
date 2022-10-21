import React, { Component } from "react";
import { SafeAreaView, View, Image, Text, Modal, TouchableOpacity, TextInput, ScrollView, StyleSheet, ImageBackground, Pressable } from "react-native";
import Svg, { Path, Rect } from "react-native-svg";
import Slider from "../slider/Slider";
import DesignerPageNavComponent from "./DesignerPageNav";
import BlueButton from "../../components/Component/Buttons/BlueButton";


export default class DesignerPageTwoComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      RewardModal: false,

      bronyModal: true,

      changed: '',
      sOpenCityDropDown: false,
      active: 0,

      user: [],
      user_bonus_for_designer: [],
      user_category_for_product: [],
      city_for_sales_user: [],
      products: [],

      categorySelect: false,

      urlImage: 'http://80.78.246.59/Refectio/storage/app/uploads/',
      valid_error: false,

      categoryItems: [],

      phone: '',
      name: '',
      dubl_phone: '',
      dubl_name: '',
      city: '',
      category_id: '',
      category_name: '',
      proizvaditel_info: [],
      // '2^just code^10000,5^dghhd^5000'


    }
  }


  componentDidMount() {
    const { navigation } = this.props;
    this.getObjectData()
    this.getCategory()
    this.focusListener = navigation.addListener("focus", () => {
      this.getCategory()

      this.getObjectData()

    });
  }

  componentWillUnmount() {
    // Remove the event listener
    if (this.focusListener) {
      this.focusListener();
      console.log(' END')
    }
  }

  // stexic sharunakel


  getObjectData = async () => {
    let userID = this.props.user_id
    await fetch('http://80.78.246.59/Refectio/public/api/getOneProizvoditel/user_id=' + userID + '/limit=2', {
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

  getCategory = async () => {
    let requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    await fetch("http://80.78.246.59/Refectio/public/api/GetProductCategory", requestOptions)
      .then(response => response.json())
      .then(result => {
        this.setState({ categoryItems: result.data.city })
      })
      .catch(error => console.log('error', error));
  }


  DesignerAddBook = () => {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYzQyZmFhNGZlNDA0OTM5ODkzN2EzZDQzYmY5ZjYzZmYzN2E1MzM3ODkyYTUyNjNjOTMyM2FlYmRmODMzYjgwZTNhMTBmODU0NjZjZDdjMjkiLCJpYXQiOjE2NjU0MDM5MzAuNjYyMTU4LCJuYmYiOjE2NjU0MDM5MzAuNjYyMTY2LCJleHAiOjE2OTY5Mzk5MzAuNjU0MzY5LCJzdWIiOiI3OSIsInNjb3BlcyI6W119.XwipiJIsm8hC-ZLQJPA_TeKKq5voUpfJfI5iOFd66Jz92YuWXH1x_8UaF6pdfoYJT9LjifonMamYqSfIHA_KLxQSKkMc3_7E85StKwmGzlHbGe1taukklO25OpQxwXf2qy8fx2nYEcTrO7hVq29bCTqc0oxaD8UcJ3TYidXOaQfgieyC6fRJk8xDD_55bUhevBeLIS2Zf6X2WDBdRGAUV9x3GuXMXFQvBrrQ5H0_h_whT84tJNXbOv5yNn5pFhlrnWFheksvO2xe7rSgovd_a0tUYpNQszuFyhX7VjfY2c1CTGckTpwr14HfF3A0UzzRSnXs0c3SqsYl58DzVIbywdL2Am3kN9nJleg6-xvuDtYTdNWOT35I-RsWRpv91mpZYucBCatO5vpgjinQAB6xcLQS3-vOyfJdNucBDKzgDN9Ja4bLjUXN7WOQWaTDX3RP1gXG3fXHWAGJrER6LYp9zJGxZjU1_auX-xaMoGhNujvAh430U2Sdq1gAXUfcFlG7ChYoFi4XwSs7o2LpVF2jf0SBA-eaD5nT9a2ZeUzI8W8AQ_Me51k1AiUwgtYxFUa7NxbbkiTmonUtPq2F3v_hn3IoPgIGXHTsa3v24Cwlj5UxO7iEV72-jvm_9_GOnujxi728P8ByDYgCtxxdCRcig7Nb1Q24BZDj9_-_gQkwgaI");

    let formdata = new FormData();
    formdata.append("phone", "0930735884");
    formdata.append("name", "asfd");
    formdata.append("dubl_phone", "98769846341");
    formdata.append("dubl_name", "sghdnlkjsan");
    formdata.append("city", "erevan");
    formdata.append("category_id", "1");
    formdata.append("category_name", "Жилая мебель");
    formdata.append("proizvaditel_info[]", "2^just code^10000,5^dghhd^5000");

    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    fetch("http://80.78.246.59/Refectio/public/api/DesignerAddBook", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, }}>
        <View style={styles.main}>


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




                < View style={styles.DesignerRemunerationPercentageParent} >
                  {
                    this.state.user_bonus_for_designer.map((item, index) => {
                      return (
                        <View style={styles.DesignerRemunerationPercentage} key={index}>

                          <Text style={styles.procentText}>От</Text>

                          <TextInput
                            editable={false}
                            keyboardType={'number-pad'}
                            style={styles.procentInput}
                            value={item.start_price}
                          />
                          {console.log(item)}
                          <View style={styles.rubli}>
                            <Svg width="11" height="15" viewBox="0 0 11 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <Path d="M6.285 8.99997C7.37392 9.02686 8.42909 8.62091 9.21919 7.8711C10.0093 7.1213 10.4699 6.08881 10.5 4.99997C10.4699 3.91113 10.0093 2.87865 9.21919 2.12884C8.42909 1.37904 7.37392 0.973087 6.285 0.999974H2C1.86739 0.999974 1.74021 1.05265 1.64645 1.14642C1.55268 1.24019 1.5 1.36737 1.5 1.49997V7.99997H0.5C0.367392 7.99997 0.240215 8.05265 0.146447 8.14642C0.0526785 8.24019 0 8.36736 0 8.49997C0 8.63258 0.0526785 8.75976 0.146447 8.85353C0.240215 8.9473 0.367392 8.99997 0.5 8.99997H1.5V9.99997H0.5C0.367392 9.99997 0.240215 10.0527 0.146447 10.1464C0.0526785 10.2402 0 10.3674 0 10.5C0 10.6326 0.0526785 10.7598 0.146447 10.8535C0.240215 10.9473 0.367392 11 0.5 11H1.5V14.5C1.5 14.6326 1.55268 14.7598 1.64645 14.8535C1.74021 14.9473 1.86739 15 2 15C2.13261 15 2.25979 14.9473 2.35355 14.8535C2.44732 14.7598 2.5 14.6326 2.5 14.5V11H7C7.13261 11 7.25979 10.9473 7.35355 10.8535C7.44732 10.7598 7.5 10.6326 7.5 10.5C7.5 10.3674 7.44732 10.2402 7.35355 10.1464C7.25979 10.0527 7.13261 9.99997 7 9.99997H2.5V8.99997H6.285ZM2.5 1.99997H6.285C7.10839 1.9743 7.90853 2.27531 8.51083 2.83733C9.11313 3.39935 9.46872 4.17677 9.5 4.99997C9.47001 5.82362 9.11483 6.60182 8.51223 7.16412C7.90964 7.72642 7.10875 8.02698 6.285 7.99997H2.5V1.99997Z" fill="#888888" />
                            </Svg>
                          </View>

                          <Text style={styles.procentText}>До</Text>

                          <TextInput
                            keyboardType="number-pad"
                            style={styles.procentInput}
                            editable={false}
                            value={item.before_price}
                          />

                          <View style={styles.rubli}>
                            <Svg width="11" height="15" viewBox="0 0 11 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <Path d="M6.285 8.99997C7.37392 9.02686 8.42909 8.62091 9.21919 7.8711C10.0093 7.1213 10.4699 6.08881 10.5 4.99997C10.4699 3.91113 10.0093 2.87865 9.21919 2.12884C8.42909 1.37904 7.37392 0.973087 6.285 0.999974H2C1.86739 0.999974 1.74021 1.05265 1.64645 1.14642C1.55268 1.24019 1.5 1.36737 1.5 1.49997V7.99997H0.5C0.367392 7.99997 0.240215 8.05265 0.146447 8.14642C0.0526785 8.24019 0 8.36736 0 8.49997C0 8.63258 0.0526785 8.75976 0.146447 8.85353C0.240215 8.9473 0.367392 8.99997 0.5 8.99997H1.5V9.99997H0.5C0.367392 9.99997 0.240215 10.0527 0.146447 10.1464C0.0526785 10.2402 0 10.3674 0 10.5C0 10.6326 0.0526785 10.7598 0.146447 10.8535C0.240215 10.9473 0.367392 11 0.5 11H1.5V14.5C1.5 14.6326 1.55268 14.7598 1.64645 14.8535C1.74021 14.9473 1.86739 15 2 15C2.13261 15 2.25979 14.9473 2.35355 14.8535C2.44732 14.7598 2.5 14.6326 2.5 14.5V11H7C7.13261 11 7.25979 10.9473 7.35355 10.8535C7.44732 10.7598 7.5 10.6326 7.5 10.5C7.5 10.3674 7.44732 10.2402 7.35355 10.1464C7.25979 10.0527 7.13261 9.99997 7 9.99997H2.5V8.99997H6.285ZM2.5 1.99997H6.285C7.10839 1.9743 7.90853 2.27531 8.51083 2.83733C9.11313 3.39935 9.46872 4.17677 9.5 4.99997C9.47001 5.82362 9.11483 6.60182 8.51223 7.16412C7.90964 7.72642 7.10875 8.02698 6.285 7.99997H2.5V1.99997Z" fill="#888888" />
                            </Svg>
                          </View>

                          <View style={styles.procent}>
                            <TextInput
                              keyboardType="number-pad"
                              editable={false}
                              value={item.percent}
                            />
                            <Text>%</Text>
                          </View>
                        </View>
                      )
                    })
                  }
                </View >
              </View>
            </ImageBackground>
          </Modal>


          <Modal visible={this.state.bronyModal}>
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
                  height: '90%',
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
                  onPress={() => this.setState({ bronyModal: false })}>
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
                  Забронировать клиента
                </Text>

                <ScrollView>
                  <View style={{ paddingHorizontal: 25 }}>

                    <View>
                      <Text
                        style={[{
                          fontFamily: 'Poppins_500Medium',
                          lineHeight: 23,
                          fontSize: 15,
                          marginTop: 27,
                          marginBottom: 5
                        }, this.state.made_in_error ? { color: 'red' } : { color: '#5B5B5B' }]}
                      >
                        *Номер телефона
                      </Text>
                      <TextInput
                        underlineColorAndroid="transparent"
                        style={[{
                          borderWidth: 1,
                          padding: 10,
                          width: '100%',
                          borderRadius: 5,
                        }, this.state.made_in_error ? { borderColor: 'red' } : { borderColor: '#F5F5F5' }]}
                        value={this.state.made_in}
                        onChangeText={(value) => { this.setState({ made_in: value }) }}
                      />
                    </View>

                    <View>
                      <Text
                        style={[{
                          fontFamily: 'Poppins_500Medium',
                          lineHeight: 23,
                          fontSize: 15,
                          marginTop: 27,
                          marginBottom: 5
                        }, this.state.made_in_error ? { color: 'red' } : { color: '#5B5B5B' }]}
                      >
                        Доп. номер телефона (необязательно)
                      </Text>
                      <TextInput
                        underlineColorAndroid="transparent"
                        style={[{
                          borderWidth: 1,
                          padding: 10,
                          width: '100%',
                          borderRadius: 5,
                        }, this.state.made_in_error ? { borderColor: 'red' } : { borderColor: '#F5F5F5' }]}
                        value={this.state.made_in}
                        onChangeText={(value) => { this.setState({ made_in: value }) }}
                      />
                    </View>

                    <View>
                      <Text
                        style={[{
                          fontFamily: 'Poppins_500Medium',
                          lineHeight: 23,
                          fontSize: 15,
                          marginTop: 27,
                          marginBottom: 5
                        }, this.state.made_in_error ? { color: 'red' } : { color: '#5B5B5B' }]}
                      >
                        *ФИО
                      </Text>
                      <TextInput
                        underlineColorAndroid="transparent"
                        style={[{
                          borderWidth: 1,
                          padding: 10,
                          width: '100%',
                          borderRadius: 5,
                        }, this.state.made_in_error ? { borderColor: 'red' } : { borderColor: '#F5F5F5' }]}
                        value={this.state.made_in}
                        onChangeText={(value) => { this.setState({ made_in: value }) }}
                      />
                    </View>

                    <View>
                      <Text
                        style={[{
                          fontFamily: 'Poppins_500Medium',
                          lineHeight: 23,
                          fontSize: 15,
                          marginTop: 27,
                          marginBottom: 5
                        }, this.state.made_in_error ? { color: 'red' } : { color: '#5B5B5B' }]}
                      >
                        Доп. ФИО(необязательно)
                      </Text>
                      <TextInput
                        underlineColorAndroid="transparent"
                        style={[{
                          borderWidth: 1,
                          padding: 10,
                          width: '100%',
                          borderRadius: 5,
                        }, this.state.made_in_error ? { borderColor: 'red' } : { borderColor: '#F5F5F5' }]}
                        value={this.state.made_in}
                        onChangeText={(value) => { this.setState({ made_in: value }) }}
                      />
                    </View>

                    <View>
                      <Text
                        style={[{
                          fontFamily: 'Poppins_500Medium',
                          lineHeight: 23,
                          fontSize: 15,
                          marginTop: 27,
                          marginBottom: 5
                        }, this.state.made_in_error ? { color: 'red' } : { color: '#5B5B5B' }]}
                      >
                        *Город
                      </Text>
                      <TextInput
                        underlineColorAndroid="transparent"
                        style={[{
                          borderWidth: 1,
                          padding: 10,
                          width: '100%',
                          borderRadius: 5,
                        }, this.state.made_in_error ? { borderColor: 'red' } : { borderColor: '#F5F5F5' }]}
                        value={this.state.made_in}
                        onChangeText={(value) => { this.setState({ made_in: value }) }}
                      />
                    </View>





                    <View
                      style={{
                        position: 'relative',
                        // marginTop: 9,
                      }}>
                      <Text style={{
                        fontFamily: 'Poppins_500Medium',
                        lineHeight: 23,
                        fontSize: 15,
                        marginTop: 27,
                        marginBottom: 5,
                      }}>
                        Категория продукта
                      </Text>
                      <TouchableOpacity
                        style={{
                          borderWidth: 1,
                          padding: 10,
                          width: '100%',
                          borderRadius: 5,
                          position: 'relative',
                        }}
                        onPress={() => this.setState({ categorySelect: !this.state.categorySelect })}
                      >
                        <Text
                          style={{
                            height: 25,
                            width: '100%',
                            borderRadius: 5,
                            fontFamily: 'Poppins_500Medium',
                            color: '#5B5B5B',
                          }}>
                          {this.state.category_name}
                        </Text>
                        <View style={{ position: 'absolute', right: 17, bottom: 18 }}>
                          {!this.state.categorySelect &&
                            <Svg width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <Path d="M1 1L9 9L17 1" stroke="#888888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </Svg>
                          }
                          {this.state.categorySelect &&
                            <Svg width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <Path d="M1 9L9 1L17 9" stroke="#888888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </Svg>
                          }

                        </View>
                      </TouchableOpacity>
                      <View
                        style={this.state.categorySelect ? styles.categorySelectActive : styles.categorySelect}>
                        <ScrollView nestedScrollEnabled={true} >
                          {console.log(this.state.categorySelect)}
                          {
                            this.state.categoryItems.map((item, index) => {
                              return (
                                <TouchableOpacity
                                  key={index}
                                  style={{
                                    width: '100%',
                                    justifyContent: 'center',
                                    textAlign: 'left',
                                  }}
                                  onPress={() => {
                                    this.setState({ category_name: item.name })
                                  }}
                                >
                                  <Text style={{ textAlign: 'left', paddingVertical: 7, fontFamily: 'Poppins_500Medium', borderBottomWidth: 1, borderBottomColor: '#F5F5F5' }}>
                                    {item.name}
                                  </Text>
                                </TouchableOpacity>
                              )
                            })
                          }
                        </ScrollView>
                      </View>
                    </View>
                  </View>

                </ScrollView>



              </View>
            </ImageBackground>
          </Modal>


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
                            }
                            {
                              item.saite == null &&
                              <View style={{ height: 24 }}>

                              </View>
                            }
                            {
                              item.telegram !== null &&
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
                            {item.show_room == 'Нет' &&
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
                <TouchableOpacity
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
                </TouchableOpacity>
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
                <TouchableOpacity style={styles.info} onPress={() => this.setState({ bronyModal: true })}>
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
                          onPress={() => this.setState({ active: index })}
                          style={this.state.active == index ? styles.categoryButtonActive : styles.categoryButton}
                        >
                          <Text style={this.state.active == index ? styles.categoriesNameActive : styles.categoriesName}>{item.category_name}</Text>
                        </TouchableOpacity>
                      )
                    })
                  }
                </ScrollView>
              </View>
              {
                this.state.products.map((item, index) => {
                  <Slider slid={item.product_image} />
                  return (
                    <View key={index} style={{ marginTop: 18 }}>
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
    marginBottom: 20
  },
  procentText: {
    fontSize: 14,
    fontFamily: 'Poppins_500Medium',
    color: '#888888',
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
    fontFamily: 'Poppins_500Medium',
    color: '#888888',
  },
  zakazInfo: {
    fontSize: 14,
    fontFamily: 'Raleway_400Regular',
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
  procentInput: {
    borderWidth: 1,
    borderColor: '#F5F5F5',
    borderRadius: 6,
    width: '22%',
    height: '100%',
    paddingLeft: 5,
    fontSize: 14,
    fontFamily: 'Poppins_500Medium',
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
  categorySelectActive: {
    width: '100%',
    height: 120,
    left: 0,
    elevation: 2,
    borderColor: '#F5F5F5',
    paddingVertical: 10,
    paddingHorizontal: 5,
    zIndex: 100,
    backgroundColor: '#fff',
    borderWidth: 1
  },
  categorySelect: {
    width: '50%',
    height: 0,
    left: 0,
    position: 'absolute',
    top: '100%',
    zIndex: 100
  }

})