import React, { Component } from 'react';
import { StyleSheet, View, Image, Dimensions, ScrollView, Pressable } from 'react-native';

const width = Dimensions.get('window').width - 25




export default class Slider extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      imgActive: 0,
      urlImage: 'http://80.78.246.59/Refectio/storage/app/uploads/',
      img: []
    }


  }
  change = (nativeEvent) => {
    const slider = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
    if (slider !== this.state.imgActive) {
      this.setState({ imgActive: slider })
    }

  }




  componentDidMount() {
    let images = this.props.slid;
    this.setState({ img: images })
  }

  render() {
    return (
      <View>
        <ScrollView
          horizontal={true}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={styles.wrap}
          onScroll={({ nativeEvent }) => this.change(nativeEvent)}
        >
          {
            this.state.img.map((item, index) => {
              console.log(this.state.urlImage + item.image)
              return (
                <Image
                  source={{uri: this.state.urlImage + item.image}}
                  style={{ height: '100%', width, resizeMode: "cover" }}
                  key={index}
                />
              )
            })
          }
        </ScrollView>
        <View style={styles.wrapDot}>
          {
            this.state.img.map((dots, index) => {
              return (
                <Pressable
                  style={this.state.imgActive == index ? styles.dotActive : styles.dot}
                  key={index}>
                </Pressable>
              )
            })
          }
        </View>
      </View>
    )
  }
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
});


