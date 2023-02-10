import React from "react";
import { Image, ImageBackground, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Svg, { Path, Rect } from "react-native-svg";
import ArrowGrayComponent from "../../../assets/image/ArrowGray";
import BlueButton from "../../Component/Buttons/BlueButton";
import DesignerPageNavComponent from "../DesignerPageNav";

export default class ConfirmateZakazComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cityItems: ['chuchmenia', 'hoktemberyan', 'ttvashen'],
      users: [1, 1, 1, 1,],

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
                this.props.navigation.navigate('AddZakazchikDesigner')
              }}>
              <ArrowGrayComponent />
            </TouchableOpacity>

            <Text style={styles.pageTitle}>Подтверждение</Text>

          </View>

          <ScrollView showsVerticalScrollIndicator={false}>

            <Text style={styles.text}>
              Подтвердите выбор производителей.{'\n'}
              Им придёт уведомление.
            </Text>

            <View style={styles.customersParentContainer}>
              {
                this.state.users.map((item, index) => (
                  <View key={index} style={styles.userIndex} >
                    <Image
                      source={require('../../../assets/image/slideImage.png')}
                      style={styles.userLogo}
                    />

                    <Text style={styles.customerName}>Лайт Кухни</Text>


                  </View>
                ))
              }
            </View>


            <TouchableOpacity
              style={styles.nextPage}
              onPress={() => {
                this.props.navigation.navigate('ZakaziLiveDesigner')
              }}>
              <BlueButton name="Готово" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => {
                this.props.navigation.navigate('AddZakazchikDesigner')
              }}>
              <Text style={styles.cancelButtonText}>
                Отмена
              </Text>
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
  text: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 18,
    color: '#333333',
    textAlign: 'center',
    marginTop: 20
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
  nextPage: {
    marginTop: 60,
    alignSelf: 'center',
    marginBottom: 15
  },
  cancelButton: {
    width: 285,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#B5D8FE',
    borderRadius: 20,
    alignSelf: 'center',
    marginBottom: 57
  },
  cancelButtonText: {
    fontFamily: 'Poppins_700Bold',
    color: '#B5D8FE',
    fontSize: 18,
  }
})