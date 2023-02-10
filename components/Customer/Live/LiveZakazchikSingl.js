import React from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ArrowGrayComponent from "../../../assets/image/ArrowGray";
import CustomerMainPageNavComponent from "../CustomerMainPageNav";

export default class LiveZakazchikSinglComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      checkPraizvaditel: [1, 1, 1, 1, 1, 1]
    }
  }
  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.NameBack}>
            <TouchableOpacity
              style={styles.goBack}
              onPress={() => {
                this.props.navigation.navigate('ZakaziLive')
              }}>
              <ArrowGrayComponent />
            </TouchableOpacity>

            <Text style={styles.userName}>Александр  Зингмирдиннов</Text>

            <Image
              source={require('../../../assets/image/userIcon.png')}
              style={styles.userIcon}
            />
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>

            <View style={styles.designerNameTopParent}>
              <Text style={styles.designerNameTop}>Дизайнер Петров</Text>
            </View>

            <TouchableOpacity
              style={styles.plusPraizvaditel}
              onPress={() => {
                this.props.navigation.navigate('AddZakazi')
              }}>
              <Text style={styles.plusPraizvaditelText}>+ Товар</Text>
            </TouchableOpacity>

            <View>
              {
                this.state.checkPraizvaditel.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.mainUserContainer}
                    onPress={() => {
                      this.props.navigation.navigate('EditZakazi')
                    }}>
                    <View style={styles.mebelTypeBox}>
                      <Image source={require('../../../assets/image/slideImage.png')}
                        style={styles.imageMebel}
                      />
                      <View style={styles.mebelType}>
                        <Text style={styles.mebelName}>Шкаф «Ансамбль»</Text>

                        <View style={styles.readyShiping}>
                          <Text style={styles.readyText}>Готовность {'\n'}
                            <Text style={styles.readyDate}>20.09.2023</Text>
                          </Text>

                          <Text style={styles.readyText}>Доставка {'\n'}
                            <Text style={styles.readyDate}>20.09.2023</Text>
                          </Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))
              }
            </View>
          </ScrollView>

        </View>
        <CustomerMainPageNavComponent active_page={'Заказы'} navigation={this.props.navigation} />
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
  NameBack: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 26,
    marginBottom: 18,
    justifyContent: 'space-between'
  },
  designerNameTopParent: {
    borderBottomWidth: 1,
    borderColor: '#D0D0D0',
    paddingBottom: 8
  },
  designerNameTop: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 17,
    color: '#464849'
  },
  userName: {
    fontSize: 17,
    fontFamily: 'Poppins_600SemiBold',
    color: '#464849'
  },
  userIcon: {
    width: 40,
    height: 40
  },
  mainUserContainer: {
    marginBottom: 14,
  },
  praizvaditelName: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 18,
    color: '#060606',
    marginBottom: 8
  },
  mebelTypeBox: {
    padding: 10,
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#EBEBEB',
    flexDirection: 'row'
  },
  imageMebel: {
    width: 84,
    height: 84,
    borderRadius: 18
  },
  mebelType: {
    marginLeft: 15,
    justifyContent: 'space-between',
    width: '72%',
  },
  mebelName: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 16,
  },
  readyShiping: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  readyText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#AEAEAE',
  },
  readyDate: {
    color: '#52A8EF',
    fontFamily: 'Poppins_500Medium',
    fontSize: 14
  },
  plusPraizvaditel: {
    width: 152,
    height: 40,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 8
  },
  plusPraizvaditelText: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#969696'
  },
  goBack: {
    marginLeft: -10
  }
})