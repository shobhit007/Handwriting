import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Svg, Path, Line, Circle, Text} from 'react-native-svg';
import Notebook from './components/Notebook';
import LetterA from './components/LetterA';

const viewPortWidth = 300;
const viewPortHeight = 120;
const strokeWidth = 3;

const App = () => {
  const pathRef = useRef();
  const svgRef = useRef();
  const [pathScale, setPathScale] = useState(null);

  useEffect(() => {
    if (svgRef.current) {
      const dimensions = getPathDimensions();
      console.log('dimensions', dimensions);
      const scaleX = viewPortWidth / dimensions.width;
      const scaleY = viewPortHeight / dimensions.height;
      console.log(scaleX, scaleY);
      const scale = Math.min(scaleX, scaleY);
      setPathScale({x: scaleX, y: scaleY});
    }
  }, [svgRef.current]);

  const getPathDimensions = () => {
    if (pathRef.current) {
      const pathLength = pathRef.current.getTotalLength();
      const pathCoordinates = Array.from({length: pathLength}, (_, i) =>
        pathRef.current.getPointAtLength(i),
      );
      const minX = Math.min(...pathCoordinates.map(point => point.x));
      const minY = Math.min(...pathCoordinates.map(point => point.y));
      const maxX = Math.max(...pathCoordinates.map(point => point.x));
      const maxY = Math.max(...pathCoordinates.map(point => point.y));
      const width = maxX - minX;
      const height = maxY - minY;
      return {width, height};
    }
  };

  return (
    <View style={styles.container}>
      {/* <Notebook lines={2} gap={50}>
      </Notebook> */}
      <LetterA />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
