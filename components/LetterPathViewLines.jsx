import React, {useState, useEffect, useRef} from 'react';
import {Animated, Button} from 'react-native';
import {Svg, Path, G, Defs, Line, ClipPath, Polyline} from 'react-native-svg';
import {TextToSpeech} from '../functions/text-to-speech';
import Sound from 'react-native-sound';

const AnimatedPath = Animated.createAnimatedComponent(Path);
const LetterPathViewLines = ({showLines, selectedLetter}) => {
  const SVG_WIDTH = 309;
  const SVG_HEIGHT = 300;
  const lineStrokWidth = 3;

  const [baseLine, setBaseLine] = useState(0);
  const [secondLine, setSecondLine] = useState(0);
  const [fourLine, setFourLine] = useState(0);
  const [totalLength, setTotalLength] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [audioPlayer, setAudioPlayer] = useState(null);
  const [translateY, setTranslateY] = useState(false);
  const [dimensions, setDimensions] = useState(null);
  const [audioSrc, setAudioSrc] = useState(null);
  const pathRef = useRef();
  const baseLineRef = useRef();
  const secondLineRef = useRef();
  const animation = useRef(new Animated.Value(0)).current;
  const [allSvgPathCoordinates, setAllSvgPathCoordinates] = useState(null);
  const [polyPoints, setPolyPoints] = useState(null);
  const [breakPointsCoordinates, setBreakPointsCoordinates] = useState([]);
  const [animationPathLength, setAnimaitonPathLength] = useState(30);

  useEffect(() => {
    if (allSvgPathCoordinates) {
      const points = allSvgPathCoordinates
        .map(point => `${point.x},${point.y}`)
        .join(' ');
      setPolyPoints(points);
    }
  }, [allSvgPathCoordinates]);

  const getTotalPathLength = () => {
    if (pathRef.current) {
      return pathRef.current.getTotalLength();
    }
    return 0;
  };

  // Function to find position of a point along the path
  const getPositionAlongPath = distance => {
    if (pathRef.current) {
      return pathRef.current.getPointAtLength(distance);
    }
    return null;
  };

  // Function to find the distance between two points along the SVG path
  const distanceBetweenTwoPoints = (point1, point2) => {
    const totalLength = getTotalPathLength();
    if (totalLength === 0) return 0;

    let distance1 = 0;
    let distance2 = 0;

    for (let i = 0; i < totalLength; i++) {
      const position = getPositionAlongPath(i);
      if (
        position.x === breakPointsCoordinates[0].x &&
        position.y === breakPointsCoordinates[0].y
      ) {
        distance1 = i;
      }
      if (
        position.x === breakPointsCoordinates[1].x &&
        position.y === breakPointsCoordinates[1].y
      ) {
        distance2 = i;
      }
    }

    console.log(
      'Math.abs(distance2 - distance1)',
      Math.abs(distance2 - distance1),
    );
  };

  useEffect(() => {
    if (pathRef.current && selectedLetter) {
      const textScript =
        'flowing motion that begins with a small upward curve from the baseline. As you continue, create a rounded loop towards the top left, maintaining a fluid movement. At the apex of the loop, form a small counter-clockwise loop, giving the a its characteristic elegance. Then, gently curve back down to the baseline, ensuring a smooth transition. Finally, complete the a with a subtle hook or flick to the right, adding a finishing touch to its graceful form. Practice with a light touch, allowing your pen to glide effortlessly, until you achieve the desired fluidity and beauty in your cursive a';

      TextToSpeech({setAudioSrc, audioUrl: selectedLetter?.audioUrl});
      const newdimensions = getPathDimensions();
      setDimensions(newdimensions);
      // setAudioSrc(selectedLetter?.audioUrl);
    }
  }, [selectedLetter]);

  const playAudio = () => {
    console.log('inside the playAudio');
    if (audioPlayer) {
      audioPlayer.play(success => {
        if (success) {
          console.log('Successfully finished playing');
        } else {
          console.log('Playback failed due to audio decoding errors');
        }
      });
    }
  };

  useEffect(() => {
    if (audioSrc) {
      console.log('check audioSrc=', audioSrc);
      const sound = new Sound(audioSrc, '', error => {
        if (error) {
          console.log('Failed to load sound', error);
          return;
        }
        const duration = sound.getDuration();
        setAudioDuration(duration + 16300);
        console.log('check audio duration', duration);
      });
      setAudioPlayer(sound);
    }
  }, [audioSrc]);

  useEffect(() => {
    return () => {
      if (audioPlayer) {
        audioPlayer.release();
      }
    };
  }, []);

  const getPathDimensions = () => {
    if (pathRef.current) {
      const pathLength = pathRef.current.getTotalLength();
      const pathCoordinates = Array.from({length: pathLength}, (_, i) =>
        pathRef.current.getPointAtLength(i),
      );
      setAllSvgPathCoordinates(pathCoordinates);
      // console.log('check path of svg coordinates', pathCoordinates);
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
    if (selectedLetter && audioDuration) {
      // Reset animation value back to 0
      // playAudio();
      animation.setValue(0);

      Animated.timing(animation, {
        toValue: 1,
        duration: audioDuration,
        useNativeDriver: true,
      }).start();
    }
  }, [selectedLetter, audioDuration]);
  const strokeDashoffset = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [204, 144],
  });

  const getNearestPoint = (x, y) => {
    let minDistance = Infinity;
    let nearestPoint = null;

    allSvgPathCoordinates.forEach(point => {
      const distance = Math.sqrt(
        Math.pow(point.x - x, 2) + Math.pow(point.y - y, 2),
      );
      if (distance < minDistance) {
        minDistance = distance;
        nearestPoint = point;
      }
    });

    return nearestPoint;
  };

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
      <Button title={'Play Audio'} onPress={playAudio} />
      <Button title={'Svg Length'} onPress={distanceBetweenTwoPoints} />

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
            scale={2}
          />
        )}
        {translateY ? (
          <AnimatedPath
            ref={pathRef}
            d={selectedLetter?.path}
            stroke={'white'}
            strokeDasharray={144}
            strokeDashoffset={strokeDashoffset}
            translateY={27}
            scale={2}
          />
        ) : (
          <AnimatedPath
            ref={pathRef}
            d={selectedLetter?.path}
            stroke={'white'}
            strokeDasharray={144}
            strokeDashoffset={strokeDashoffset}
            scale={2}
          />
        )}
        {polyPoints && (
          <Polyline
            onPress={event => {
              const {
                nativeEvent: {locationX, locationY},
              } = event;
              const nearestPoint = getNearestPoint(locationX, locationY);
              setBreakPointsCoordinates(pre => {
                return [...pre, nearestPoint];
              });
              console.log('nearestPointnearestPointnearestPoint', nearestPoint);
            }}
            points={polyPoints}
            fill="none"
            stroke="black"
            strokeWidth="3"
            scale={2}
            strokeDasharray="10,10" // This creates a dotted line
          />
        )}
      </Svg>
    </React.Fragment>
  );
};

export default LetterPathViewLines;
