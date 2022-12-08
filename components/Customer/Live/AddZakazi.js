import React from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, TextInput, Keyboard } from "react-native";
import Svg, { Path, Rect } from "react-native-svg";
import ArrowGrayComponent from "../../../assets/image/ArrowGray";
import CustomerMainPageNavComponent from "../CustomerMainPageNav";
import BlueButton from '../../Component/Buttons/BlueButton'
import MaskInput from "react-native-mask-input";

export default class AddZakaziComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      imgBool: false,
      keyboardOpen: false
    }
  }





  componentDidMount() {
    const { navigation } = this.props;
    // this.getAuthUserProfile()


    this.focusListener = navigation.addListener("focus", () => {

      // this.getAuthUserProfile()

    });

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

    if (this.focusListener) {
      this.focusListener();
      console.log(' END')
    }
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
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.pageTitle}>Заказы Live</Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.imageEmptyParent}>
              <Text style={styles.photoText}>Фото</Text>
              {
                this.state.imgBool === false ?
                  <TouchableOpacity>
                    <Svg
                      width={85}
                      height={85}
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <Rect x={0.5} y={0.5} width={84} height={84} rx={17.5} stroke="#767676" />
                      <Path stroke="#000" d="M42.5 22v40M62 42.5H22" />
                    </Svg>
                  </TouchableOpacity>
                  :
                  <View style={styles.userIconParent}>
                    <Image
                      source={require('../../../assets/image/slideImage.png')}
                      style={styles.userIcon}
                    />

                    <TouchableOpacity style={styles.delateImg}>
                      <Svg
                        width={32}
                        height={32}
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <Rect width={32} height={32} rx={16} fill="#1571F0" />
                        <Path
                          d="M9.413 10.21a.563.563 0 0 1 .796-.796l5.79 5.79 5.789-5.79a.563.563 0 0 1 .796.797L16.794 16l5.79 5.79a.563.563 0 1 1-.796.796l-5.79-5.79-5.788 5.79a.563.563 0 1 1-.797-.797L15.203 16l-5.79-5.79Z"
                          fill="#fff"
                        />
                      </Svg>
                    </TouchableOpacity>
                  </View>
              }
            </View>

            <View>
              <Text
                style={[styles.nazvaniaText,
                this.state.password_confirmation_error ? { color: 'red', } : { color: '#333333', }
                ]}
              >
                Название
              </Text>
              <TextInput
                underlineColorAndroid="transparent"
                // placeholder="Шкаф «Ансамбль»"
                style={[styles.nazvania,
                this.state.password_confirmation_error ? { borderColor: 'red', } : { borderColor: '#F5F5F5', }
                ]}
              // value={this.state.password_confirmation}
              // onChangeText={(value) => { this.setState({ password_confirmation: value }) }}
              />
            </View>

            <View style={styles.godnastParent}>
              <View style={{ width: '47%' }}>
                <Text
                  style={[styles.nazvaniaText,
                  this.state.password_confirmation_error ? { color: 'red', } : { color: '#333333', }
                  ]}
                >
                  Дата готовности
                </Text>
                <MaskInput
                  underlineColorAndroid="transparent"
                  placeholder="22.08.2023"
                  keyboardType="number-pad"
                  style={[styles.nazvania,
                  // this.state.ready ? { borderColor: 'red', } : { borderColor: '#F5F5F5', }
                  ]}
                  mask={[/\d/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/,]}
                  value={this.state.ready}
                  onChangeText={(value) => { this.setState({ ready: value }) }}
                />
              </View>


              <View style={{ width: '47%' }}>
                <Text
                  style={[styles.nazvaniaText,
                  // this.state.password_confirmation_error ? { color: 'red', } : { color: '#333333', }
                  ]}
                >
                  Дата доставки
                </Text>
                <MaskInput
                  underlineColorAndroid="transparent"
                  placeholder="15.11.2023"
                  keyboardType="number-pad"
                  style={[styles.nazvania,
                  // this.state.shipping ? { borderColor: 'red', } : { borderColor: '#F5F5F5', }
                  ]}
                  mask={[/\d/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/,]}
                  value={this.state.shipping}
                  onChangeText={(value) => { this.setState({ shipping: value }) }}
                />
              </View>
            </View>

            <TouchableOpacity style={styles.ready}>
              <BlueButton name="Готово" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.goBack}
              onPress={() => {
                this.props.navigation.navigate('LiveZakazchikSingl')
              }}>
              <Text style={styles.goBackText}>Отмена</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
        {
          this.state.keyboardOpen === false &&
          <CustomerMainPageNavComponent active_page={'Заказы'} navigation={this.props.navigation} />
        }
      </SafeAreaView>
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
  pageTitle: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 24,
    marginTop: 11,
    color: '#378DFE'
  },
  imageEmptyParent: {
    marginTop: 15
  },
  photoText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 16,
    marginBottom: 8,
    color: '#333333'
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
  userIconParent: {
    width: 85,
    height: 85,
    position: 'relative',
  },
  userIcon: {
    width: '100%',
    height: '100%',
    borderRadius: 18
  },
  godnastParent: {
    width: '100%',
    // borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  ready: {
    alignSelf: 'center',
    marginTop: 100
  },
  goBack: {
    marginTop: 12,
    borderWidth: 3,
    borderColor: '#B5D8FE',
    height: 44,
    width: 285,
    borderRadius: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  goBackText: {
    fontFamily: 'Poppins_700Bold',
    color: '#B5D8FE',
    fontSize: 18
  },
  delateImg: {
    position: 'absolute',
    right: -10,
    top: -10
  }
})