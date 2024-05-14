import React, {useState, useEffect, useRef} from 'react';
import {Animated} from 'react-native';
import {Svg, Path, G, Defs, Line, ClipPath} from 'react-native-svg';
import Sound from 'react-native-sound';
import {TextToSpeech} from '../functions/text-to-speech';

const AnimatedPath = Animated.createAnimatedComponent(Path);
const LetterPathViewLines = ({showLines, selectedLetter}) => {
  const SVG_WIDTH = 309;
  const SVG_HEIGHT = 200;
  const lineStrokWidth = 3;

  const [baseLine, setBaseLine] = useState(0);
  const [secondLine, setSecondLine] = useState(0);
  const [fourLine, setFourLine] = useState(0);
  const [totalLength, setTotalLength] = useState(0);
  const [translateY, setTranslateY] = useState(false);
  const [dimensions, setDimensions] = useState(null);
  const [audioSrc, setAudioSrc] = useState(null);
  const pathRef = useRef();
  const baseLineRef = useRef();
  const secondLineRef = useRef();
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (audioSrc) {
      console.log('check audioUrl for playing audio', audioSrc);
      const sound = new Sound(audioSrc, null, error => {
        if (error) {
          console.log('Failed to load the sound', error);
          return;
        }
        // Loaded successfully, play the sound
        sound.play();
      });

      // Release the sound resource when the component is unmounted
      return () => {
        if (sound) {
          sound.release();
        }
      };
    }
  }, [audioSrc]);

  useEffect(() => {
    if (pathRef.current && selectedLetter) {
      TextToSpeech({setAudioSrc});
      const newdimensions = getPathDimensions();
      setDimensions(newdimensions);
    }
  }, [selectedLetter]);
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
    // console.log('check audio src ', audioSrc);
  }, [audioSrc]);
  useEffect(() => {
    if (selectedLetter) {
      // Reset animation value back to 0
      animation.setValue(0);

      Animated.timing(animation, {
        toValue: 1,
        duration: 10000,
        useNativeDriver: true,
      }).start();
    }
  }, [selectedLetter]);
  const strokeDashoffset = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [793, 0],
  });
  useEffect(() => {
    if (baseLineRef.current && secondLineRef.current) {
      const {y: baseLineY} = baseLineRef.current.getBBox();
      const {y: secondLineY} = secondLineRef.current.getBBox();
      setFourLine(baseLineY + secondLineY);
    }
  }, [baseLineRef.current, secondLineRef.current]);
  useEffect(() => {
    if (dimensions) {
      const letterMaxHeight = dimensions.maxY + dimensions.height;
      console.log();
      if (
        selectedLetter?.type === 'descender' ||
        selectedLetter?.type === 'baseline'
      ) {
        setTranslateY(true);
      } else {
        setTranslateY(false);
      }
      setBaseLine(54);
      setSecondLine(27);
    }
  }, [dimensions]);
  return (
    <React.Fragment>
      <Svg
        fill={'none'}
        width={SVG_WIDTH}
        height={SVG_HEIGHT}
        viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}>
        {/* first */}
        {showLines && (
          <Line
            stroke={'grey'}
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
          stroke={'grey'}
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
          stroke={'grey'}
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
            d={selectedLetter?.path}
            stroke={'gray'}
            opacity={0.5}
            translateY={27}
          />
        ) : (
          <Path
            ref={pathRef}
            d={selectedLetter?.path}
            stroke={'gray'}
            opacity={0.5}
          />
        )}
        {translateY ? (
          <AnimatedPath
            ref={pathRef}
            d={selectedLetter?.path}
            stroke={'white'}
            strokeDasharray={793}
            strokeDashoffset={strokeDashoffset}
            translateY={27}
          />
        ) : (
          <AnimatedPath
            ref={pathRef}
            d={selectedLetter?.path}
            stroke={'white'}
            strokeDasharray={793}
            strokeDashoffset={strokeDashoffset}
          />
        )}
      </Svg>
    </React.Fragment>
  );
};

export default LetterPathViewLines;
