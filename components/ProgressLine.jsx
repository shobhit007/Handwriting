import React, {useRef, useEffect} from 'react';
import {View, Animated} from 'react-native';
import Svg, {Line} from 'react-native-svg';

const ProgressLine = ({progress, width, height, color}) => {
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: progress * width, // We directly animate to the width multiplied by the progress
      duration: 1000,
      useNativeDriver: true,
    }).start(() => console.log('Animation complete')); // Add a completion callback to verify animation completion
  }, [progress]);

  const strokeDashoffset = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [width, 0],
  });

  return (
    <View style={{alignItems: 'center'}}>
      <Svg width={width} height={height}>
        <Line
          x1="0"
          y1={height / 2}
          x2={width}
          y2={height / 2}
          stroke={color}
          strokeWidth={height}
          strokeDasharray={[width, width]}
          strokeDashoffset={animation}
        />
      </Svg>
    </View>
  );
};

export default ProgressLine;
