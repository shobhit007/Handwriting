// SvgSlider.js
import React, {useState, useCallback, useRef, useEffect} from 'react';
import {View, PanResponder, StyleSheet, Dimensions} from 'react-native';
import Svg, {Path, Circle} from 'react-native-svg';
import {svgPathProperties} from 'svg-path-properties';

const {width: screenWidth} = Dimensions.get('window');

const SvgSlider = ({
  width = screenWidth - 40,
  height = 100,
  min = 0,
  max = 100,
  initialValue = 0,
  pathData,
}) => {
  const pathRef = useRef(null);
  const [value, setValue] = useState(initialValue);
  const [maxValueReached, setMaxValueReached] = useState(initialValue);
  const sliderWidth = width - 60; // Adjusting for padding
  const circleRadius = 15;
  const speedFactor = 1;

  const properties = useRef(new svgPathProperties(pathData));

  const sliderLength = properties.current.getTotalLength();
  console.log('sliderLength', sliderLength);
  const svgParts = properties.current.getParts();
  // console.log('svgParts', svgParts);

  useEffect(() => {
    // Update the properties ref whenever the pathData changes
    properties.current = new svgPathProperties(pathData);
  }, [pathData]);

  const generateWavePath = () => {
    const amplitude = 20;
    const frequency = 0.05;
    let path = `M20 ${height / 2}`;

    for (let x = 20; x <= width - 20; x++) {
      const y = height / 2 + amplitude * Math.sin(frequency * x);
      path += ` L${x} ${y}`;
    }

    return path;
  };

  // console.log(generateWavePath());

  // Convert slider position to value
  const positionToValue = position => {
    const ratio = position / (sliderLength * speedFactor);
    return Math.min(Math.max(min + ratio * (max - min), min), max);
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      const newValue = positionToValue(gestureState.moveX);
      if (newValue > maxValueReached) {
        setValue(newValue);
        setMaxValueReached(newValue);
      } else if (newValue >= value) {
        setValue(newValue);
      }
    },
  });

  const valueToPosition = ((value - min) / (max - min)) * sliderLength;
  const {x: cx, y: cy} = properties.current.getPointAtLength(valueToPosition);

  const valueToYPosition = () => {
    const amplitude = 20;
    const frequency = 0.05;
    const x = valueToPosition + 20;
    return height / 2 + amplitude * Math.sin(frequency * x);
  };

  const progress = (value - min) / (max - min);
  const dashOffset = sliderLength - sliderLength * progress;

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <Svg width={width} height={height}>
        <Path
          // ref={pathRef}
          d={pathData}
          stroke="grey"
          strokeWidth="4"
          fill="none"
        />
        <Path
          d={pathData}
          stroke="white"
          strokeWidth="4"
          fill="none"
          strokeDasharray={sliderLength}
          strokeDashoffset={dashOffset}
        />
        <Circle cx={cx} cy={cy} r={circleRadius} fill="blue" />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SvgSlider;
