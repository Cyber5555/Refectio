import AsyncStorage from "@react-native-async-storage/async-storage"
import React, { Component } from "react"
import { Image, ImageBackground, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Svg, { Path } from "react-native-svg"
import DesignerPageNavComponent from "../DesignerPageNav"


export default class ZakaziLiveDesignerComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalInfoCustomer: false
    }
  }

  clounner = [1, 1, 1, 1, 1, 1, 1,]

  // componentDidMount = () => {

  //   const { navigation } = this.props;
  //   this.showModal()
  //   this.focusListener = navigation.addListener("focus", () => {
  //     this.showModal()


  //   });
  // }

  // componentWillUnmount() {


  //   if (this.focusListener) {
  //     this.focusListener();
  //     console.log('Bum END')
  //   }
  // }


  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Modal visible={this.state.modalInfoCustomer}>
            <ImageBackground source={require('../../../assets/image/blurBg.png')} style={styles.blurBg}>
              <View style={styles.whiteBox}>
                <Text style={styles.info}>
                  В этом разделе вы сможете
                  отслеживать актуальные данные
                  по готовности и дате доставки
                  от всех производителей по
                  конкретному заказчику.
                </Text>

                <TouchableOpacity style={styles.buttonOk} onPress={() => {
                  this.setState({ modalInfoCustomer: false })
                }}>
                  <Text style={styles.textOk}>Ок</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.dontShow} onPress={() => {
                  this.setState({ modalInfoCustomer: false })
                }}>
                  <Text style={styles.dontShowText}>Больше не показывать</Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </Modal>


          <Text style={styles.pageName}>Заказы Live</Text>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 13, marginBottom: 5 }}>

            <TouchableOpacity style={styles.activePage}>
              <Text style={{
                fontFamily: 'Raleway_600SemiBold',
                color: '#fff',
                fontSize: 15
              }}>
                Активные
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.arxivePage}
              onPress={() => {
                // this.props.navigation.navigate('CustomerRewards')
              }}>
              <Text style={{ fontFamily: 'Raleway_600SemiBold', color: '#333333', fontSize: 15 }}>Архив</Text>
            </TouchableOpacity>

          </View>
          <View>
            <TouchableOpacity
              style={styles.plusBlue}
              onPress={() => {
                this.props.navigation.navigate('AddZakazchikDesigner')
              }}>
              <Svg
                width={20}
                height={20}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <Path
                  d="M10 19V1M19 10H1"
                  stroke="#388DFD"
                  strokeWidth={2}
                  strokeLinecap="round"
                />
              </Svg>
            </TouchableOpacity>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>

            {
              this.clounner.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.clounParnt}
                  onPress={() => {
                    this.props.navigation.navigate('LiveZakazchikSinglDesigner')
                  }}
                >

                  <Image
                    source={require('../../../assets/image/cloun.png')}
                    style={styles.clounImg}
                  />

                  <View style={{ paddingLeft: 10, justifyContent: 'space-between', height: 82 }}>
                    <Text style={styles.nickName}>Алекс  Зингмирдиннов</Text>

                    {/* <Text style={styles.vnestiDanniy}>Внести данные</Text> */}
                  </View>

                </TouchableOpacity>
              ))
            }
          </ScrollView>

        </View>
        <DesignerPageNavComponent active_page={'Заказы'} navigation={this.props.navigation} />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
  },
  blurBg: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  whiteBox: {
    width: '90%',
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 10,
    borderRadius: 20
  },
  info: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 18,
    textAlign: 'center',
    padding: 5,
    marginBottom: 45
  },
  buttonOk: {
    width: '80%',
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#B5D8FE',
    borderRadius: 20,
    alignSelf: 'center',
    marginBottom: 12
  },
  textOk: {
    fontFamily: 'Poppins_700Bold',
    color: '#fff',
    fontSize: 18
  },
  dontShow: {
    width: '80%',
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#B5D8FE',
    borderRadius: 20,
    alignSelf: 'center',
    marginBottom: 43
  },
  dontShowText: {
    color: '#B5D8FE',
    fontFamily: 'Poppins_700Bold',
    fontSize: 18
  },
  pageName: {
    color: '#378DFE',
    marginTop: 11,
    fontSize: 24,
    fontFamily: 'Poppins_500Medium'
  },
  activePage: {
    width: '47%',
    paddingVertical: 8,
    backgroundColor: '#378DFE',
    alignItems: 'center',
    borderRadius: 10,
    // marginRight: 10
  },
  arxivePage: {
    width: '47%',
    paddingVertical: 8,
    borderColor: '#E6E6E6',
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center'
  },
  clounImg: {
    width: 82,
    height: 82
  },
  nickName: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
  },
  vnestiDanniy: {
    color: '#52A8EF',
    fontSize: 13,
    fontFamily: 'Poppins_600SemiBold'
  },
  clounParnt: {
    flexDirection: 'row',
    height: 99,
    borderBottomWidth: 1,
    borderColor: '#EBEBEB',
    marginTop: 15,
  },
  plusBlue: {
    marginVertical: 11,
    alignSelf: 'flex-end',
    marginRight: 6
  }
})