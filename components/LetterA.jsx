import React, {useEffect, useRef, useState} from 'react';
import {Svg, Path, G, Defs, Line, ClipPath} from 'react-native-svg';
import {
  PanResponder,
  Animated,
  Text,
  View,
  Pressable,
  ScrollView,
} from 'react-native';
import LettersPathData from './LettersPaths.json';

const AnimatedPath = Animated.createAnimatedComponent(Path);

// const letterPath =
//   'M2 30C4.62368 29.672 5.34896 19.2609 7.55556 18C9.76984 16.7347 9.09393 13.4616 10.7778 11.7778C12.6416 9.91394 14.2258 7.56069 15.9444 5.55556C18.8993 2.10827 23.5513 1.73831 28 2C30.9135 2.17138 30 14.6152 30 17C30 24.2146 13.3763 32.5672 11.0556 24.4444C10.0529 20.9352 10.2625 13.0686 11.0556 9.5C12.3416 3.71274 21.3548 5 25.5 5C27.5834 5 30.4435 4.48386 32.4444 5.05556C33.7242 5.4212 33 11.6315 33 13C33 18.533 32.4629 22.9584 30.2222 28C28.3483 32.2162 28.7431 36.4625 26.5 40.5C25.833 41.7006 25.0716 45.783 25 47C24.8203 50.0549 22.8663 51.0406 21.5 53.5C20.2661 55.7211 17.8365 55 15.5 55C12.1442 55 13 52.8082 13 50C13 43.5016 14.2444 41.3601 17.2222 36C19.5391 31.8295 26.1484 27.362 30 25.2222C34.7676 22.5735 40.5642 23.2179 45 21';

const SVG_WIDTH = 309;
const SVG_HEIGHT = 200;
const lineStrokWidth = 3;

const LetterA = ({top = 0, left = 0}) => {
  const [pathData, setPathData] = useState(LettersPathData);
  const [showLines, setShowLines] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [letterPath, setLetterPath] = useState(null);
  const [baseLine, setBaseLine] = useState(0);
  const [secondLine, setSecondLine] = useState(0);
  const [fourLine, setFourLine] = useState(0);
  const [totalLength, setTotalLength] = useState(0);
  const [translateY, setTranslateY] = useState(false);
  const [dimensions, setDimensions] = useState(null);
  const pathRef = useRef();
  const baseLineRef = useRef();
  const secondLineRef = useRef();
  const TwoLineRef = useRef();
  const animation = useRef(new Animated.Value(0)).current;

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
      console.log('maxY', maxY);
      console.log('minY', minY);
      const width = maxX - minX;
      const height = maxY - minY;
      console.log('minY+height', maxY + height);
      return {width, height, maxY, minY};
    }
  };

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 10000,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    if (pathData) {
      const initialLetter = pathData[0];
      setSelectedLetter(initialLetter);
    }
  }, [pathData]);

  useEffect(() => {
    if (selectedLetter) {
      setLetterPath(selectedLetter?.path);
    }
  }, [selectedLetter]);

  const strokeDashoffset = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [793, 0],
  });

  useEffect(() => {
    if (pathRef.current && selectedLetter) {
      console.log('selectedLetter', selectedLetter);
      const newdimensions = getPathDimensions();
      setDimensions(newdimensions);
    }
  }, [pathRef.current, letterPath, selectedLetter]);

  useEffect(() => {
    if (dimensions) {
      const letterMaxHeight = dimensions.maxY + dimensions.height;
      if (
        letterMaxHeight < 78 &&
        (selectedLetter?.type === 'descender' ||
          selectedLetter?.type === 'baseline')
      ) {
        setTranslateY(true);
      }
      setBaseLine(54);
      setSecondLine(27);
    }
  }, [dimensions]);

  useEffect(() => {
    if (baseLineRef.current && secondLineRef.current) {
      const {y: baseLineY} = baseLineRef.current.getBBox();
      const {y: secondLineY} = secondLineRef.current.getBBox();
      setFourLine(baseLineY + secondLineY);
    }
  }, [baseLineRef.current, secondLineRef.current]);

  return (
    <React.Fragment>
      <View style={{flexDirection: 'row', marginBottom: 50, gap: 16}}>
        <Pressable
          ref={TwoLineRef}
          onPress={() => setShowLines(false)}
          style={{
            backgroundColor: 'blue',
            paddingHorizontal: 25,
            paddingVertical: 12,
          }}>
          <Text style={{color: 'white'}}>2-line</Text>
        </Pressable>
        <Pressable
          onPress={() => setShowLines(true)}
          style={{
            backgroundColor: 'blue',
            paddingHorizontal: 25,
            paddingVertical: 12,
          }}>
          <Text style={{color: 'white'}}>4-line</Text>
        </Pressable>
      </View>
      {letterPath && (
        <Svg
          fill={'none'}
          width={SVG_WIDTH}
          height={SVG_HEIGHT}
          viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}>
          {/* first */}
          {showLines && (
            <Line
              stroke={'blue'}
              strokeWidth={2}
              x1={0}
              x2={SVG_WIDTH}
              y1={2}
              y2={2}
              strokeLinecap="round"
            />
          )}

          {/* baseline */}
          <Line
            ref={baseLineRef}
            stroke={'yellow'}
            strokeWidth={2}
            x1={0}
            x2={SVG_WIDTH}
            y1={baseLine}
            y2={baseLine}
            strokeLinecap="round"
          />
          {/* second */}
          <Line
            ref={secondLineRef}
            stroke={'orange'}
            strokeWidth={2}
            x1={0}
            x2={SVG_WIDTH}
            y1={!showLines ? 0 : secondLine}
            y2={!showLines ? 0 : secondLine}
            strokeLinecap="round"
          />

          {/* four */}
          {showLines && (
            <Line
              stroke={'gray'}
              strokeWidth={2}
              x1={0}
              x2={SVG_WIDTH}
              y1={81}
              y2={81}
              strokeLinecap="round"
            />
          )}

          {translateY ? (
            <Path
              ref={pathRef}
              d={letterPath}
              stroke={'gray'}
              opacity={0.5}
              translateY={27}
            />
          ) : (
            <Path ref={pathRef} d={letterPath} stroke={'gray'} opacity={0.5} />
          )}
          {translateY ? (
            <AnimatedPath
              ref={pathRef}
              d={letterPath}
              stroke={'white'}
              strokeDasharray={793}
              strokeDashoffset={strokeDashoffset}
              translateY={27}
            />
          ) : (
            <AnimatedPath
              ref={pathRef}
              d={letterPath}
              stroke={'white'}
              strokeDasharray={793}
              strokeDashoffset={strokeDashoffset}
            />
          )}
        </Svg>
      )}
      <ScrollView
        horizontal
        contentContainerStyle={{gap: 20, paddingHorizontal: 20}}>
        {pathData?.map(item => {
          return (
            <View key={item?.letter}>
              <Pressable
                onPress={() => {
                  setSelectedLetter(item);
                }}
                style={{
                  backgroundColor: 'white',
                  paddingHorizontal: 20,
                  borderCurve: 20,
                }}>
                <Text style={{fontSize: 40, color: 'black'}}>
                  {item?.letter}
                </Text>
              </Pressable>
            </View>
          );
        })}
      </ScrollView>
    </React.Fragment>
  );
};

// z
{
  /* <svg width="33" height="73" viewBox="0 0 33 73" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M30.6458 1.69507C29.3552 16.5368 24.2116 23.4614 20 37.5M20 37.5C18.4691 42.6031 12.5709 54.9016 11.8699 60.1595C11.5115 62.8473 9.58071 68.6283 7.55096 70.2521C3.47481 73.513 2.00456 61.3785 2.00456 58.9775M20 37.5L2.00456 1.69507" stroke="black" stroke-width="3" stroke-linecap="round"/>
</svg> */
}

// Y
{
  /* <svg width="73" height="39" viewBox="0 0 73 39" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M54.1786 15.4249C49.456 15.4249 45.6861 9.64848 41.9038 7.15073C37.7486 4.40669 32.304 1.64495 27.1741 1.51341C19.6182 1.31967 9.66419 5.27172 4.71573 11.0605C1.57922 14.7296 1.74017 18.2372 1.80615 22.7897C1.86839 27.0844 4.08073 28.8016 6.89792 31.7913C17.4574 42.9973 34.2949 33.4138 44.086 26.7904C47.4234 24.5328 50.0126 21.7405 51.7237 18.0617C52.197 17.044 54.1268 13.9126 54.1786 16.6069C54.4 28.1183 57.9511 35.0645 70.545 35.0645" stroke="black" stroke-width="3" stroke-linecap="round"/>
</svg> */
}

export default LetterA;
