import React from "react";
import { Image, ImageBackground, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Svg, { Path, Rect } from "react-native-svg";
import ArrowGrayComponent from "../../../assets/image/ArrowGray";
import BlueButton from "../../Component/Buttons/BlueButton";
import DesignerPageNavComponent from "../DesignerPageNav";

export default class AddZakazchikDesignerComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cityItems: [
        { name: 'Кухни' },
        { name: 'Прихожие' },
        { name: 'Мебель для ванной' },
        { name: 'Мебель для спальни' },
        { name: 'Гардеробные' },
        { name: 'Гостиные' },
        { name: 'Детские' },
        { name: 'Кабинеты' },
        { name: 'Межкомнатные перегородки' },
        { name: 'Островные павильоны' },
        { name: 'Зоны ресепшн' },
        { name: 'Выставочные стенды' },
      ],

      users: [1, 1, 1, 1,],
      allIcons: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
      iconsModal: false,
      iconItems: false,
      takeIt: false,
      OpenCityDropDown: false
    }
  }






  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>


          <Modal visible={this.state.iconsModal}>
            <ImageBackground source={require('../../../assets/image/blurBg.png')} style={styles.modalBlurBg} >

              <View style={styles.modalContainer}>

                <Text style={styles.modalTitle}>Выберите аватар заказчика</Text>

                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => {
                    this.setState({ iconsModal: false })
                  }}>
                  <Image
                    source={require('../../../assets/image/ixs.png')}
                    style={{ width: 22.5, height: 22.5 }}
                  />
                </TouchableOpacity>

                <View style={styles.iconContainer}>
                  <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.iconParent}>
                      {
                        this.state.allIcons.map((icon, index) => (
                          <TouchableOpacity
                            key={index}
                            style={[styles.iconItems,
                            this.state.iconItems === index ? { backgroundColor: '#52A8EF' } : { backgroundColor: '#F5F5F5' }]}
                            onPress={() => {
                              this.setState({ iconItems: index })
                            }}>
                            <Image source={require('../../../assets/image/ikonka.png')} style={{ width: 72.77, height: 62.78 }} />
                          </TouchableOpacity>
                        ))
                      }
                    </View>
                  </ScrollView>
                </View>

                <TouchableOpacity style={styles.saveButton}>
                  <BlueButton name="Сохранить" />
                </TouchableOpacity>
              </View>

            </ImageBackground>
          </Modal >




          <View style={styles.NameBack}>
            <TouchableOpacity
              style={styles.goBack}
              onPress={() => {
                this.props.navigation.navigate('ZakaziLiveDesigner')
              }}>
              <ArrowGrayComponent />
            </TouchableOpacity>

            <Text style={styles.pageTitle}>Новый заказчик</Text>

          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <TouchableOpacity
              style={styles.logoSvg}
              onPress={() => {
                this.setState({ iconsModal: true })
              }}>
              <Svg
                width={86}
                height={86}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <Rect width={86} height={86} rx={6} fill="#F5F5F5" />
                <Path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M64.51 64.51a12.6 12.6 0 1 1-17.82-17.82 12.6 12.6 0 0 1 17.82 17.82ZM32.28 23.88a11.2 11.2 0 1 1 15.84 15.84 11.2 11.2 0 0 1-15.84-15.84Zm-8.206 22.34a5.603 5.603 0 0 1 2.15-.42H43.72a15.334 15.334 0 0 0-3.52 9.8 15.336 15.336 0 0 0 3.389 9.64c-1.104.107-2.24.16-3.388.16-5.194 0-10.033-1.08-13.622-3.368C22.932 59.705 20.6 56.135 20.6 51.4a5.605 5.605 0 0 1 3.474-5.18ZM57 61.5a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V57h-4a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1h4v-4.5a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1V54h3.5a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H57v4.5Z"
                  fill="#8BC3F1"
                />
              </Svg>
            </TouchableOpacity>

            <View>
              <Text
                style={[styles.nazvaniaText,
                this.state.password_confirmation_error ? { color: 'red', } : { color: '#333333', }
                ]}
              >
                Фамилия
              </Text>
              <TextInput
                underlineColorAndroid="transparent"
                // placeholder="Шкаф «Ансамбль»"
                style={[styles.nazvania,
                this.state.password_confirmation_error ? { borderColor: 'red', } : { borderColor: '#F5F5F5', }
                ]}
                value={this.state.password_confirmation}
                onChangeText={(value) => { this.setState({ password_confirmation: value }) }}
              />
            </View>

            <View>
              <Text
                style={[styles.nazvaniaText,
                this.state.password_confirmation_error ? { color: 'red', } : { color: '#333333', }
                ]}
              >
                Имя
              </Text>
              <TextInput
                underlineColorAndroid="transparent"
                // placeholder="Шкаф «Ансамбль»"
                style={[styles.nazvania,
                this.state.password_confirmation_error ? { borderColor: 'red', } : { borderColor: '#F5F5F5', }
                ]}
                value={this.state.password_confirmation}
                onChangeText={(value) => { this.setState({ password_confirmation: value }) }}
              />
            </View>



            {/* dropDown city start*/}

            <View
              style={{
                position: 'relative',
              }}>
              <Text style={[styles.nazvaniaText, this.state.sales_city_error ? { color: 'red' } : { color: '#5B5B5B' }]}>
                Город
              </Text>

              <TouchableOpacity
                style={[styles.selectButton, this.state.sales_city_error ? { borderColor: 'red' } : { borderColor: '#F5F5F5' }]}
                onPress={() => {
                  this.setState({ OpenCityDropDown: !this.state.OpenCityDropDown })
                }}
              >
                <Text style={styles.selectedText}>
                  Город
                </Text>

                <View style={{ position: 'absolute', right: 17, bottom: 18 }}>
                  {
                    !this.state.OpenCityDropDown &&
                    <Svg width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <Path d="M1 1L9 9L17 1" stroke="#888888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </Svg>
                  }
                  {
                    this.state.OpenCityDropDown &&
                    <Svg width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <Path d="M1 9L9 1L17 9" stroke="#888888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </Svg>
                  }

                </View>
              </TouchableOpacity>
              <View
                style={this.state.OpenCityDropDown ? styles.OpenCityDropDownActive : styles.OpenCityDropDown}>
                <ScrollView nestedScrollEnabled={true} >
                  {
                    this.state.cityItems.map((item, index) => {
                      return (
                        <TouchableOpacity
                          key={index}
                          style={{ width: '100%', justifyContent: 'center', textAlign: 'left', }}
                          onPress={() => {
                            // this.gorod(item.name, item.id)
                          }}>

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
            {/* dropDown city end*/}

            <Text style={styles.changedCustomersTitleBox}>Производители</Text>

            <View style={styles.customersParentContainer}>
              {
                this.state.users.map((item, index) => (
                  <View key={index} style={styles.userIndex} >
                    <Image
                      source={require('../../../assets/image/slideImage.png')}
                      style={styles.userLogo}
                    />

                    <Text style={styles.customerName}>Лайт Кухни</Text>

                    <TouchableOpacity
                      style={[styles.takeItButton, this.state.takeIt === index ? { backgroundColor: '#B5D8FE', } : { backgroundColor: '#F5F5F5', }]}
                      onPress={() => {
                        this.setState({ takeIt: index })
                      }}>
                      <Text style={[styles.takeItText, this.state.takeIt === index ? { color: '#FFFFFF' } : { color: '#838383' }]}>
                        {this.state.takeIt === index ? 'Выбрано' : 'Выбрать'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))
              }
            </View>


            <TouchableOpacity
              style={styles.nextPage}
              onPress={() => {
                this.props.navigation.navigate('ConfirmateZakaz')
              }}>
              <BlueButton name="Далее" />
            </TouchableOpacity>

          </ScrollView>


        </View >
        <DesignerPageNavComponent active_page={'Заказы'} navigation={this.props.navigation} />
      </SafeAreaView >
    )
  }
}


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
  },
  NameBack: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 26,
    marginBottom: 18,
    position: 'relative',
    justifyContent: 'center'
  },
  goBack: {
    position: 'absolute',
    left: -10,
    top: 0
  },
  pageTitle: {
    fontSize: 24,
    fontFamily: 'Poppins_500Medium',
    color: '#52A8EF',
  },
  logoSvg: {
    alignSelf: 'center',
    marginTop: 14
  },
  nazvania: {
    borderWidth: 1,
    borderColor: '#F5F5F5',
    padding: 10,
    width: '100%',
    borderRadius: 5,
  },
  nazvaniaText: {
    fontFamily: 'Poppins_500Medium',
    lineHeight: 23,
    fontSize: 15,
    marginTop: 27,
    marginBottom: 5
  },
  selectButton: {
    borderWidth: 1,
    padding: 10,
    width: '100%',
    borderRadius: 5,
    position: 'relative',
  },
  selectedText: {
    padding: 5,
    width: '100%',
    borderRadius: 5,
    color: '#5B5B5B'
  },
  changedCustomersTitleBox: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 24,
    color: '#52A8EF',
    alignSelf: 'center',
    marginTop: 30
  },
  OpenCityDropDown: {
    width: '100%',
    height: 0,
    zIndex: 100
  },
  OpenCityDropDownActive: {
    width: '100%',
    height: 120,
    elevation: 2,
    borderColor: '#F5F5F5',
    paddingVertical: 5,
    paddingHorizontal: 10,
    zIndex: 100,
    backgroundColor: '#fff'
  },
  customersParentContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20
  },
  userIndex: {
    width: '48%',
    borderWidth: 1,
    borderColor: '#E6E6E6',
    borderRadius: 10,
    padding: 8,
    marginBottom: 11
  },
  userLogo: {
    width: '100%',
    height: 100,
    borderRadius: 5
  },
  customerName: {
    fontFamily: 'Poppins_600SemiBold',
    marginTop: 5,
    textAlign: 'center',
    fontSize: 15,
    color: '#333333'
  },
  takeItButton: {
    width: '100%',
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 7
  },
  takeItText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 16,
  },
  nextPage: {
    marginTop: 60,
    alignSelf: 'center',
    marginBottom: 67
  },
  modalBlurBg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContainer: {
    width: '90%',
    height: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    position: 'relative'
  },
  modalTitle: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 16,
    alignSelf: 'center',
    marginTop: 18,
    marginBottom: 29,
    color: '#333333'
  },
  closeButton: {
    position: 'absolute',
    right: 18,
    top: 18
  },
  iconContainer: {
    width: '85%',
    alignSelf: 'center',
    height: '65%',
  },
  iconParent: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  iconItems: {
    width: 88,
    height: 88,
    borderRadius: 15,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  saveButton: {
    alignSelf: 'center',
    marginTop: 55,
    // marginBottom: 50
  }
})