import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Dimensions, ScrollView, Pressable, TouchableOpacity, Modal, Text } from 'react-native';

const width = Dimensions.get('window').width - 25
const full_height = Dimensions.get('window').height





export default function Slider2(props) {
  let urlImage = 'http://80.78.246.59/Refectio/storage/app/uploads/';
  const [imgActive, setInmageActive] = useState(0)
  const [modalImageActive, setModalInmageActive] = useState(0)
  const [img, setImg] = useState([])
  const [sliderModal, setSliderModal] = useState(false)


  const change = (nativeEvent) => {
    const slider = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
    if (slider !== imgActive) {
      setInmageActive(slider)
    }
  }

  const changeModal = (nativeEvent) => {
    const slider = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
    if (slider !== modalImageActive) {
      setModalInmageActive(slider)
    }
  }


  useEffect(() => {
    let images = props.slid;
    setImg(images)
  }, [])



  return (
    <View>
      <Modal visible={sliderModal}>
        <View style={styles.sliderModal}>
          <TouchableOpacity onPress={() => {
            setSliderModal(false)
            setInmageActive(0)
          }}
            style={{ position: 'absolute', right: 18, top: 18, zIndex: 50 }}>
            <Image source={require('../../assets/image/whiteIxs.png')} style={{ width: 30, height: 30 }} />
          </TouchableOpacity>
          <ScrollView
            horizontal={true}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            style={styles.wrap}
            onScroll={({ nativeEvent }) => changeModal(nativeEvent)}
          >
            {
              img.map((item, index) => {
                return (
                  <Image
                    key={index}
                    source={{ uri: urlImage + item.image }}
                    style={sliderModal === true ? styles.modalSliderStyle : styles.standartSliderStyle}
                  />
                )
              })
            }
          </ScrollView>
          <View style={styles.wrapDot}>
            {
              img.map((dots, index) => {
                return (
                  <Pressable
                    style={modalImageActive == index ? styles.dotActive : styles.dot}
                    key={index}>
                  </Pressable>
                )
              })
            }
          </View>
        </View>
      </Modal>


      <ScrollView
        horizontal={true}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.wrap}
        onScroll={({ nativeEvent }) => change(nativeEvent)}
      >
        {
          img.map((item, index) => {
            return (
              <TouchableOpacity key={index} activeOpacity={0.9} onPress={() => setSliderModal(true)}>
                <Image
                  source={{ uri: urlImage + item.image }}
                  style={sliderModal === true ? styles.modalSliderStyle : styles.standartSliderStyle}
                />
              </TouchableOpacity>
            )
          })
        }
      </ScrollView>
      <View style={styles.wrapDot}>
        {
          img.map((dots, index) => {
            return (
              <Pressable
                style={imgActive == index ? styles.dotActive : styles.dot}
                key={index}>
              </Pressable>
            )
          })
        }
      </View>
    </View>
  )

}



const styles = StyleSheet.create({
  wrap: {
    width: width,
    height: 176,
    resizeMode: 'cover'
  },
  wrapDot: {
    position: 'absolute',
    bottom: 10,
    flexDirection: 'row',
    alignSelf: 'center'
  },
  dot: {
    margin: 0,
    marginHorizontal: 3,
    width: 10,
    height: 5,
    backgroundColor: "#fff",
    borderRadius: 3,

  },
  dotActive: {
    margin: 0,
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
    position: 'relative'
  },
  standartSliderStyle: {
    height: '100%',
    width,
    resizeMode: "cover"
  },
  modalSliderStyle: {
    full_height,
    width,
    resizeMode: "cover"
  }
});