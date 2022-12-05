import React, { useEffect, useState, useRef, memo } from 'react';
import { StyleSheet, View, Image, Dimensions, ScrollView, Pressable, TouchableOpacity, Modal, Text, ActivityIndicator, FlatList, Animated } from 'react-native';

import Swiper from "react-native-swiper"

const width = Dimensions.get('window').width - 25
const full_width = Dimensions.get('window').width
const full_height = Dimensions.get('window').height



export default function Slider2(props) {
  let urlImage = 'http://80.78.246.59/Refectio/storage/app/uploads/';
  const [sliderModal, setSliderModal] = useState(false)
  const [imgActive, setInmageActive] = useState(0)
  const [images, setImages] = useState([])



  // let images = useRef()

  useEffect(() => {
    setInmageActive(0)
    setImages(props.slid)
  }, [])

  const change = (nativeEvent) => {
    const slider = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
    if (slider !== imgActive) {
      setInmageActive(slider)
    }
  }


  let sliderItem = ({ item, index }) => {
    return (
      sliderModal === true ?
        <Image
          source={{ uri: urlImage + item.image }}
          style={{ height: '100%', width: width, resizeMode: "contain" }}
        />

        :

        <TouchableOpacity onPress={() => setSliderModal(true)}>
          <Image
            source={{ uri: urlImage + item.image }}
            style={{ height: '100%', width: width, resizeMode: "cover" }}
          />
        </TouchableOpacity>

    )

  }

  return (
    <View>
      <Modal visible={sliderModal}>
        <View style={styles.sliderModal}>

          <TouchableOpacity
            style={{ position: 'absolute', right: 18, top: 18, zIndex: 50 }}
            onPress={() => {
              setSliderModal(false)
            }}>
            <Image
              source={require('../../assets/image/ixs.png')}
              style={{ tintColor: 'white', width: 30, height: 30 }}
            />

          </TouchableOpacity>

          <View>
            <FlatList
              horizontal
              pagingEnabled
              style={styles.wrapper}
              showsHorizontalScrollIndicator={false}
              data={images}
              keyExtractor={(item) => item.id}
              renderItem={sliderItem}
              onScroll={({ nativeEvent }) => change(nativeEvent)}
            />
            <View style={styles.wrapDot}>
              {
                images.map((item, index) => (
                  <Animated.View
                    style={imgActive === index ? styles.dotActive : styles.dot}
                    key={index}
                  />

                ))
              }
            </View>
          </View>
        </View>
      </Modal>

      <View>
        <FlatList
          horizontal
          pagingEnabled
          style={styles.wrapper}
          showsHorizontalScrollIndicator={false}
          data={images}
          keyExtractor={(item) => item.id}
          renderItem={sliderItem}
          onScroll={({ nativeEvent }) => change(nativeEvent)}
        />
        <View style={styles.wrapDot}>
          {
            images.map((item, index) => (
              <Animated.View
                style={imgActive === index ? styles.dotActive : styles.dot}
                key={index}
              />
            ))
          }
        </View>
      </View>

    </View>
  )
}



const styles = StyleSheet.create({
  wrapper: {
    width: width,
    height: 176,
    resizeMode: 'cover'
  },
  wrapDot: {
    position: 'absolute',
    bottom: 10,
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: '#1571F0',
    zIndex: 1
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
    position: 'relative'
  },
  modalSliderStyle: {
    height: full_height,
    width: full_width,
    resizeMode: "contain"
  }
})



// const styles = StyleSheet.create({
//   wrap: {
//     // width: width,
//     height: 176,
//     resizeMode: 'cover'
//   },
//   wrapDot: {
//     position: 'absolute',
//     bottom: 10,
//     flexDirection: 'row',
//     alignSelf: 'center'
//   },
//   dot: {
//     marginBottom: -30,
//     marginHorizontal: 3,
//     width: 10,
//     height: 5,
//     backgroundColor: "#fff",
//     borderRadius: 3,

//   },
//   dotActive: {
//     marginBottom: -30,
//     marginHorizontal: 3,
//     width: 30,
//     height: 5,
//     backgroundColor: "#1571F0",
//     borderRadius: 3
//   },
//   sliderModal: {
//     flex: 1,
//     backgroundColor: 'black',
//     justifyContent: 'center',
//     alignItems: 'center',
//     position: 'relative'
//   },
//   standartSliderStyle: {
//     height: '100%',
//     width: width,
//     resizeMode: "cover"
//   },
//   modalSliderStyle: {
//     height: full_height,
//     width: full_width,
//     resizeMode: "contain"
//   }
// });



{/* <Swiper
        style={styles.wrap}
        dotStyle={styles.dot}
        activeDotStyle={styles.dotActive}
      >
        {
          sliderModal === false &&
          images.current.map((item, index) => {
            return (
              <TouchableOpacity
                key={index} activeOpacity={0.9}
                onPress={() => {
                  setSliderModal(true)
                }}>
                <Image
                  key={index}
                  source={{ uri: urlImage + item.image }}
                  style={styles.standartSliderStyle}
                />
              </TouchableOpacity>
            )
          })
        }
      </Swiper> */}

{/* <Swiper
            dotStyle={styles.dot}
            activeDotStyle={styles.dotActive}
          >
            {sliderModal === true &&
              images.current.map((item, index) => {
                return (
                  <Image
                    key={index}
                    source={{ uri: urlImage + item.image }}
                    style={styles.modalSliderStyle}
                  />
                )
              })
            }
          </Swiper> */}



// export default memo(function Slider2(props) {
//   let urlImage = 'http://80.78.246.59/Refectio/storage/app/uploads/';
//   const [sliderModal, setSliderModal] = useState(false)
//   const [showSlider, setShowSlider] = useState(false)
//   const [imgActive, setInmageActive] = useState(0)





// let images = useRef(props.slid)
//   useEffect(() => {
//     setShowSlider(true)
//   }, [images])


//   const change = (nativeEvent) => {
//     const slider = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
//     if (slider !== imgActive) {
//       setInmageActive(slider)
//     }
//   }






//   return (
//     <View>
//       <Modal visible={sliderModal}>
//         <View style={styles.sliderModal}>

//           <TouchableOpacity
//             style={{ position: 'absolute', right: 18, top: 18, zIndex: 50 }}
//             onPress={() => {
//               setSliderModal(false)

//             }}>

//             <Image
//               source={require('../../assets/image/ixs.png')}
//               style={{ tintColor: 'white', width: 30, height: 30 }}
//             />

//           </TouchableOpacity>

//           <ScrollView
//             horizontal={true}
//             pagingEnabled
//             showsHorizontalScrollIndicator={false}
//             // style={styles.wrap}
//             onScroll={({ nativeEvent }) => change(nativeEvent)}
//           >
//             {
//               images.current.map((item, index) => {
//                 return (
//                   <Image
//                     key={index}
//                     source={{ uri: urlImage + item.image }}
//                     style={styles.modalSliderStyle}
//                   />
//                 )
//               })
//             }
//           </ScrollView>
//           <View style={styles.wrapDot}>
//             {
//               images.current.map((dots, index) => {
//                 return (
//                   <Pressable
//                     style={imgActive == index ? styles.dotActive : styles.dot}
//                     key={index}>
//                   </Pressable>
//                 )
//               })
//             }
//           </View>
//         </View>

//       </Modal>





//       {showSlider ?
//         <ScrollView
//           horizontal={true}
//           pagingEnabled
//           showsHorizontalScrollIndicator={false}
//           style={styles.wrap}
//           onScroll={({ nativeEvent }) => change(nativeEvent)}
//         >
//           {sliderModal === false &&
//             images.current.map((item, index) => {
//               return (
//                 <TouchableOpacity
//                   key={index} activeOpacity={0.9}
//                   onPress={() => {
//                     setSliderModal(true)
//                   }}>
//                   <Image
//                     key={index}
//                     source={{ uri: urlImage + item.image }}
//                     style={styles.standartSliderStyle}
//                   />
//                 </TouchableOpacity>
//               )
//             })
//           }
//         </ScrollView>
//         :

//         <View style={{ width: '100%', height: 100, justifyContent: 'center', alignItems: 'center' }}>
//           <ActivityIndicator />
//         </View>
//       }

//       <View style={styles.wrapDot}>
//         {sliderModal === false &&
//           images.current.map((dots, index) => {
//             return (
//               <Pressable
//                 style={imgActive == index ? styles.dotActive : styles.dot}
//                 key={index}>
//               </Pressable>
//             )
//           })
//         }
//       </View>




//     </View>
//   )

// })
