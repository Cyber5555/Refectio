import React from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ArrowGrayComponent from "../../../assets/image/ArrowGray";
import DesignerPageNavComponent from "../DesignerPageNav";

export default class LiveZakazchikSinglDesignerComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      checkPraizvaditel: [1, 1, 1, 1, 1,]
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
                this.props.navigation.navigate('ZakaziLiveDesigner')
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
            <View>
              {
                this.state.checkPraizvaditel.map((item, index) => (
                  <View key={index} style={styles.mainUserContainer}>
                    <Text style={styles.praizvaditelName}>mr.Doors</Text>
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
                  </View>
                ))
              }
            </View>
            <TouchableOpacity
              style={styles.plusPraizvaditel}
            >
              <Text style={styles.plusPraizvaditelText}>+ Производитель</Text>
            </TouchableOpacity>
          </ScrollView>

        </View>
        <DesignerPageNavComponent active_page={'Заказы'} navigation={this.props.navigation} />
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
    alignSelf: 'center',
    width: '100%',
    height: 45,
    borderWidth: 1,
    borderColor: '#E6E6E6',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 100
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