import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Dimensions, ScrollView, Pressable, TouchableOpacity, Modal, Text, ActivityIndicator } from 'react-native';
import Swiper from 'react-native-swiper';

// const width = Dimensions.get('window').width - 25
const full_height = Dimensions.get('window').height





export default function Slider2(props) {
  let urlImage = 'http://80.78.246.59/Refectio/storage/app/uploads/';
  const [img, setImg] = useState([])
  const [sliderModal, setSliderModal] = useState(false)
  const [showSlider, setShowSlider] = useState(false)




  useEffect(() => {
    let images = props.slid;
    setImg(images)
    setShowSlider(true)
  }, [props])



  return (
    <View>
      <Modal visible={sliderModal}>
        <View style={styles.sliderModal}>

          <TouchableOpacity onPress={() => {
            setSliderModal(false)
          }}
            style={{ position: 'absolute', right: 18, top: 18, zIndex: 50 }}>
            <Image source={require('../../assets/image/whiteIxs.png')} style={{ width: 30, height: 30 }} />
          </TouchableOpacity>

          {
            sliderModal === true &&
            <Swiper style={{ height: full_height, }} dotStyle={styles.dot} activeDotStyle={styles.dotActive}>
              {
                img.map((item, index) => {
                  return (
                    <Image
                      key={index}
                      source={{ uri: urlImage + item.image }}
                      style={{ height: '100%', resizeMode: "contain" }}
                    />
                  )
                })
              }
            </Swiper>

          }

        </View>
      </Modal>





      {showSlider ?
        <Swiper style={styles.wrap} dotStyle={styles.dot} activeDotStyle={styles.dotActive} loadMinimal={true} loadMinimalLoader={<ActivityIndicator />}>
          {
            img.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.8}
                  onPress={() => setSliderModal(true)}>
                  <Image
                    source={{ uri: urlImage + item.image }}
                    style={{ height: '100%', resizeMode: "cover" }}
                  />
                </TouchableOpacity>
              )
            })
          }
        </Swiper>

        :

        <View style={{ width: '100%', height: 100, justifyContent: 'center', alignItems: 'center' }}>

          <ActivityIndicator />
        </View>

      }


    </View>
  )

}



const styles = StyleSheet.create({
  wrap: {
    // width: width,
    height: 176,
    resizeMode: 'cover',
  },
  dot: {
    marginBottom: -30,
    marginHorizontal: 3,
    width: 10,
    height: 5,
    backgroundColor: "#fff",
    borderRadius: 3,

  },
  dotActive: {
    marginBottom: -30,
    marginHorizontal: 3,
    width: 30,
    height: 5,
    backgroundColor: "#1571F0",
    borderRadius: 3
  },
  sliderModal: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },

});