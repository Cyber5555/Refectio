import React, { Component } from "react";
import { StyleSheet, SafeAreaView, TouchableOpacity, View, Text, ScrollView } from "react-native";
import ArrowGrayComponent from "../../assets/image/ArrowGray";
import CustomerMainPageNavComponent from "./CustomerMainPageNav";


export default class CheckDesignerComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      designers: [
        {
          name: 'Алексей',
          pakupk: 'Покупки',
          pakupkTiv: 14,
          kalichestva: 'Брони',
          obshiy: '(Общее количество)',
          mesyac: '(За 3 месяца)',
          kalichestvaTiv: 17,
          mesyacTiv: 3,
          stoyimost: 'Средная стоимость',
          stoyimostTiv: '300.000р',
          vsevo: 'Всего покупок',
          rubli: '2,000,000 руб'
        },
        {
          name: 'Сергей',
          pakupk: 'Покупки',
          pakupkTiv: 14,
          kalichestva: 'Брони',
          obshiy: '(Общее количество)',
          mesyac: '(За 3 месяца)',
          kalichestvaTiv: 17,
          mesyacTiv: 3,
          stoyimost: 'Средная стоимость',
          stoyimostTiv: '300.000р',
          vsevo: 'Всего покупок',
          rubli: '2,000,000 руб'
        },
        {
          name: 'Алексей',
          pakupk: 'Покупки',
          pakupkTiv: 14,
          kalichestva: 'Брони',
          obshiy: '(Общее количество)',
          mesyac: '(За 3 месяца)',
          kalichestvaTiv: 17,
          mesyacTiv: 3,
          stoyimost: 'Средная стоимость',
          stoyimostTiv: '300.000р',
          vsevo: 'Всего покупок',
          rubli: '2,000,000 руб'
        },
        {
          name: 'Сергей',
          pakupk: 'Покупки',
          pakupkTiv: 14,
          kalichestva: 'Брони',
          obshiy: '(Общее количество)',
          mesyac: '(За 3 месяца)',
          kalichestvaTiv: 17,
          mesyacTiv: 3,
          stoyimost: 'Средная стоимость',
          stoyimostTiv: '300.000р',
          vsevo: 'Всего покупок',
          rubli: '2,000,000 руб'
        },
        {
          name: 'Алексей',
          pakupk: 'Покупки',
          pakupkTiv: 14,
          kalichestva: 'Брони',
          obshiy: '(Общее количество)',
          mesyac: '(За 3 месяца)',
          kalichestvaTiv: 17,
          mesyacTiv: 3,
          stoyimost: 'Средная стоимость',
          stoyimostTiv: '300.000р',
          vsevo: 'Всего покупок',
          rubli: '2,000,000 руб'
        },
        {
          name: 'Сергей',
          pakupk: 'Покупки',
          pakupkTiv: 14,
          kalichestva: 'Брони',
          obshiy: '(Общее количество)',
          mesyac: '(За 3 месяца)',
          kalichestvaTiv: 17,
          mesyacTiv: 3,
          stoyimost: 'Средная стоимость',
          stoyimostTiv: '300.000р',
          vsevo: 'Всего покупок',
          rubli: '2,000,000 руб'
        },
        {
          name: 'Алексей',
          pakupk: 'Покупки',
          pakupkTiv: 14,
          kalichestva: 'Брони',
          obshiy: '(Общее количество)',
          mesyac: '(За 3 месяца)',
          kalichestvaTiv: 17,
          mesyacTiv: 3,
          stoyimost: 'Средная стоимость',
          stoyimostTiv: '300.000р',
          vsevo: 'Всего покупок',
          rubli: '2,000,000 руб'
        },
        {
          name: 'Сергей',
          pakupk: 'Покупки',
          pakupkTiv: 14,
          kalichestva: 'Брони',
          obshiy: '(Общее количество)',
          mesyac: '(За 3 месяца)',
          kalichestvaTiv: 17,
          mesyacTiv: 3,
          stoyimost: 'Средная стоимость',
          stoyimostTiv: '300.000р',
          vsevo: 'Всего покупок',
          rubli: '2,000,000 руб'
        },

      ]
    }
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.main}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('CustomerMainPage')}
            style={{
              position: 'absolute',
              top: 10,
              left: 10,
            }}>
            <ArrowGrayComponent />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 35,
              marginTop: 13,
              justifyContent: 'space-between',
              paddingBottom: 18
            }}>
            <Text
              style={{
                fontSize: 20,
                fontFamily: 'Poppins_500Medium',
                color: '#1571F0'
              }}>
              Дизайнеры
            </Text>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
              }}>
              {
                this.state.designers.map((item, index) => {
                  return (
                    <View
                      key={index}
                      style={{
                        width: '48%',
                        borderRadius: 10,
                        backgroundColor: '#F5F5F5',
                        padding: 8,
                        marginBottom: 15
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          fontSize: 15,
                          fontFamily: 'Poppins_600SemiBold',
                        }}>
                        {item.name}
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginTop: 18,
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: 12,
                            fontFamily: 'Poppins_300Light',
                          }}>
                          {item.pakupk}
                        </Text>
                        <Text
                          style={{
                            fontSize: 14,
                            fontFamily: 'Poppins_300Light',
                          }}>
                          {item.pakupkTiv}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginTop: 5,
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: 12,
                            fontFamily: 'Poppins_300Light',
                          }}>
                          {item.kalichestva}
                          <Text
                            style={{
                              fontSize: 8,
                              fontFamily: 'Poppins_300Light',
                            }}>
                            {item.obshiy}
                          </Text>
                        </Text>
                        <Text
                          style={{
                            fontSize: 14,
                            fontFamily: 'Poppins_300Light',
                          }}>
                          {item.kalichestvaTiv}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginTop: 5,
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: 12,
                            fontFamily: 'Poppins_300Light',
                          }}>
                          {item.kalichestva}
                          <Text
                            style={{
                              fontSize: 8,
                              fontFamily: 'Poppins_300Light',
                            }}>
                            {item.mesyac}
                          </Text>
                        </Text>
                        <Text
                          style={{
                            fontSize: 14,
                            fontFamily: 'Poppins_300Light',
                          }}>
                          {item.mesyacTiv}
                        </Text>
                      </View>
                      <View
                        style={{
                          marginTop: 5,
                        }}>
                        <Text
                          style={{
                            fontSize: 12,
                            fontFamily: 'Poppins_300Light',
                          }}>
                          {item.stoyimost}
                        </Text>
                        <Text
                          style={{
                            fontSize: 14,
                            fontFamily: 'Poppins_500Medium',
                          }}>
                          {item.stoyimostTiv}
                        </Text>
                      </View>
                      <View
                        style={{
                          marginTop: 15,
                        }}>
                        <Text
                          style={{
                            textAlign: 'center',
                            fontSize: 12,
                            fontFamily: 'Poppins_300Light',
                          }}>
                          {item.vsevo}
                        </Text>
                        <Text
                          style={{
                            textAlign: 'center',
                            fontSize: 14,
                            color: '#1571F0',
                            marginTop: 3,
                            fontFamily: 'Poppins_500Medium',
                          }}>
                          {item.rubli}
                        </Text>
                      </View>
                    </View>
                  )
                })
              }
            </View>
          </ScrollView>
        </View>
        <CustomerMainPageNavComponent active_page={'Дизайнеры'} navigation={this.props.navigation} />
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
  }
})