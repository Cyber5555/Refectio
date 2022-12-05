// import React, { memo, useEffect, useState } from 'react';
// import { StyleSheet, View, Image, Dimensions, ScrollView, Pressable } from 'react-native';

// const width = Dimensions.get('window').width - 25




// export default function Slider(props) {
//   let urlImage = 'http://80.78.246.59/Refectio/storage/app/uploads/';
//   const [imgActive, setInmageActive] = useState(0)
// const [img, setImg] = useState([])



//   const change = (nativeEvent) => {
//     const slider = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
//     if (slider !== imgActive) {
//       setInmageActive(slider)
//     }
//   }



// useEffect(() => {
//   let images = props.slid;
//   setImg(images)
// }, [])



//   return (
//     <View>
//       <ScrollView
//         horizontal={true}
//         pagingEnabled
//         showsHorizontalScrollIndicator={false}
//         style={styles.wrap}
//         onScroll={({ nativeEvent }) => change(nativeEvent)}
//       >
//         {
//           img.map((item, index) => {
//             return (
//               <Image
//                 source={{ uri: urlImage + item.image }}
//                 style={{ height: '100%', width, resizeMode: "cover" }}
//                 key={index}
//               />
//             )
//           })
//         }
//       </ScrollView>
//       <View style={styles.wrapDot}>
//         {
//           img.map((dots, index) => {
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

// }



// const styles = StyleSheet.create({
//   wrap: {
//     width: width,
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
//     margin: 0,
//     marginHorizontal: 3,
//     width: 10,
//     height: 5,
//     backgroundColor: "#fff",
//     borderRadius: 3,

//   },
//   dotActive: {
//     margin: 0,
//     marginHorizontal: 3,
//     width: 30,
//     height: 5,
//     backgroundColor: "#1571F0",
//     borderRadius: 3
//   },
// });




import React, { Component, useEffect, useRef, useState } from 'react'
import { Animated, Dimensions, FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native'

// import Swiper from 'react-native-swiper'


const width = Dimensions.get('window').width - 25

export default function Slider(props) {
  let urlImage = 'http://80.78.246.59/Refectio/storage/app/uploads/';
  const [imgActive, setInmageActive] = useState(0)
  const [images, setImages] = useState([])

  // let images = useRef()
  useEffect(() => {
    setImages(props.slid)
  }, [])

  const change = (nativeEvent) => {
    const slider = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
    if (slider !== imgActive) {
      setInmageActive(slider)
    }
  }


  let sliderItem = ({ item, index }) => {
    console.log(item.image, 'imageItem');
    return (
      <View>
        <Image
          source={{ uri: urlImage + item.image }}
          style={{ height: '100%', width: width, resizeMode: "cover" }}
        />
      </View >
    )
  }

  return (
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
            <Pressable
              style={imgActive === index ? styles.dotActive : styles.dot}
              key={index}
            >
            </Pressable>
          ))
        }
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

})