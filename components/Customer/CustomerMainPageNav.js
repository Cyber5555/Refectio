import React, { Component } from "react";
import { StyleSheet, SafeAreaView, View, Image, Text, Touchable, TouchableOpacity } from "react-native";
export default class CustomerMainPageNavComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      navBar: [
        { images: require('../../assets/image/home.png'), text: 'Главная', change: 'CustomerMainPage', id: 1 },
        { images: require('../../assets/image/LIVE.png'), text: 'Заказы', change: 'ZakaziLive', id: 2 },
        { images: require('../../assets/image/dizayneri.png'), text: 'Дизайнеры', change: 'CheckDesigner', id: 3 },
        { images: require('../../assets/image/broni.png'), text: 'Брони', change: 'CustomerMyBroni', id: 4 },
        { images: require('../../assets/image/carbon_user-avatar.png'), text: 'Профиль', change: 'CustomerMyAccaunt', id: 5 }
      ],
      // active: 0
    }
  }

  // CustomerRewards

  // componentDidMount = () => {

  //   const { navigation } = this.props;

  //   this.focusListener = navigation.addListener("focus", () => {

  //     console.log(this.state.active, 'active');

  //   });


  // }

  // componentWillUnmount() {

  //   // Remove the event listener

  //   if (this.focusListener) {
  //     this.focusListener();
  //     console.log('Bum END')
  //   }

  //   // this.focusListener();

  // }

  goToPages = (e) => {
    this.props.navigation.navigate(e)
  }



  render() {
    return (
      <View style={styles.navBar}>
        {
          this.state.navBar.map((item, index) => {
            return (
              <TouchableOpacity style={{ alignItems: 'center', width: '20%', }} onPress={() => this.goToPages(item.change)} key={index}>
                <Image
                  source={item.images}
                  style={[this.props.active_page == item.text ? styles.navIconsActive : styles.navIcons,
                  index === 1 ? { width: 40, height: 14, resizeMode: 'contain', marginBottom: 5, marginTop: 5 }
                    : { width: 25, height: 25 }
                  ]}
                />

                <Text key={index} style={[this.props.active_page == item.text ? styles.navTextActive : styles.navText, { fontSize: 10 }]}>{item.text}</Text>

              </TouchableOpacity>
            )
          })
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  navBar: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderTopWidth: 3,
    borderTopColor: '#00000010'
  },
  navIcons: {
    tintColor: '#44BBEB',
    // resizeMode: "center",

  },
  navIconsActive: {
    tintColor: '#52A8EF',
    // resizeMode: "center",
  },
  navText: {
    color: '#000',
    fontFamily: 'Poppins_500Medium',
  },
  navTextActive: {
    color: '#52A8EF',
    fontFamily: 'Poppins_500Medium',
  }
})