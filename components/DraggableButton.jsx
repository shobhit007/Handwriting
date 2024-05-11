import React, {useEffect, useRef, useState} from 'react';
import {View, PanResponder, Animated, StyleSheet} from 'react-native';

const coords = [
  {x: 177.626953125, y: 272.81640625},
  {x: 173.37951141667872, y: 271.8634180364864},
];

const DraggableButton = () => {
  const pan = useRef(new Animated.ValueXY({x: 100, y: 100})).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
        pan.setValue({x: 0, y: 0});
      },
      onPanResponderMove: (evt, gestureState) => {
        pan.setValue({x: gestureState.dx, y: gestureState.dy});
      },
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
    }),
  ).current;

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          transform: [{translateX: pan.x}, {translateY: pan.y}],
        }}
        {...panResponder.panHandlers}>
        <View
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
          }}></View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  lineContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
  line: {
    position: 'absolute',
    backgroundColor: 'red',
    width: 2,
    height: 2,
  },
});

export default DraggableButton;
