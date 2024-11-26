// SvgSlider.js
import React, {useState, useRef, useEffect} from 'react';
import {View, PanResponder, StyleSheet, Dimensions} from 'react-native';
import Svg, {Path, Circle} from 'react-native-svg';
import {svgPathProperties} from 'svg-path-properties';

const {width: screenWidth} = Dimensions.get('window');

const movementScale = 0.2; // Adjust this value between 0 and 1

const SvgSlider = ({
  width = screenWidth - 40,
  height = 100,
  min = 0,
  max = 100,
  initialValue = 0,
  pathData,
}) => {
  const [value, setValue] = useState(initialValue);
  const [maxValueReached, setMaxValueReached] = useState(initialValue);
  const properties = useRef(new svgPathProperties(pathData));
  const [svgLayout, setSvgLayout] = useState(null);
  const svgRef = useRef(null);

  const sliderLength = properties.current.getTotalLength();

  useEffect(() => {
    properties.current = new svgPathProperties(pathData);
  }, [pathData]);

  const onLayout = () => {
    if (svgRef.current) {
      svgRef.current.measure((x, y, width, height, pageX, pageY) => {
        setSvgLayout({x: pageX, y: pageY, width, height});
      });
    }
  };

  // Function to find the closest point along the path to the touch point
  const getClosestPointLength = (x, y, numSamples = 100) => {
    let closestLength = 0;
    let minDistance = Infinity;

    for (let i = 0; i <= numSamples; i++) {
      const length = (i / numSamples) * sliderLength;
      const point = properties.current.getPointAtLength(length);
      const dx = point.x - x;
      const dy = point.y - y;
      const distance = dx * dx + dy * dy; // squared distance

      if (distance < minDistance) {
        minDistance = distance;
        closestLength = length;
      }
    }

    return closestLength;
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => svgLayout !== null,
    onMoveShouldSetPanResponder: () => svgLayout !== null,
    onPanResponderMove: (evt, gestureState) => {
      const x = evt.nativeEvent.pageX;
      const y = evt.nativeEvent.pageY;

      if (svgLayout) {
        const touchX = x - svgLayout.x;
        const touchY = y - svgLayout.y;

        const svgWidth = svgLayout.width;
        const svgHeight = svgLayout.height;

        const viewBoxWidth = 51;
        const viewBoxHeight = 50;

        const scaleX = viewBoxWidth / svgWidth;
        const scaleY = viewBoxHeight / svgHeight;

        const svgX = touchX * scaleX;
        const svgY = touchY * scaleY;

        const closestLength = getClosestPointLength(svgX, svgY);
        const ratio = closestLength / sliderLength;
        const targetValue = min + ratio * (max - min);

        // Apply movement scaling factor
        const deltaValue = (targetValue - value) * movementScale;
        const newValue = value + deltaValue;

        if (newValue > maxValueReached) {
          setValue(newValue);
          setMaxValueReached(newValue);
        } else if (newValue >= value) {
          setValue(newValue);
        }
      }
    },
  });

  const valueToPosition = ((value - min) / (max - min)) * sliderLength;
  const {x: cx, y: cy} = properties.current.getPointAtLength(valueToPosition);

  const progress = (value - min) / (max - min);
  const dashOffset = sliderLength - sliderLength * progress;

  const scale = 2;

  return (
    <View style={styles.container} onLayout={onLayout}>
      <Svg
        ref={svgRef}
        width={51 * scale}
        height={50 * scale}
        viewBox="0 0 51 50"
        {...panResponder.panHandlers}>
        <Path d={pathData} stroke="grey" strokeWidth="4" fill="none" />
        <Path
          d={pathData}
          stroke="white"
          strokeWidth="4"
          fill="none"
          strokeDasharray={sliderLength}
          strokeDashoffset={dashOffset}
        />
        <Circle cx={cx} cy={cy} r={6} fill="blue" />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // Adjusted the container to wrap content
    // This ensures the SVG is displayed correctly
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SvgSlider;
