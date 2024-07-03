import React, {useState, useEffect, useRef} from 'react';
import {Animated} from 'react-native';
import {Svg, Path, Line} from 'react-native-svg';
import {Buffer} from 'buffer';
import RNFS from 'react-native-fs';
import {svgPathProperties} from 'svg-path-properties';
import {Audio} from 'expo-av';

const AnimatedPath = Animated.createAnimatedComponent(Path);
const LetterAnimation = ({showLines, selectedLetter}) => {
  const SVG_WIDTH = 309;
  const SVG_HEIGHT = 200;
  const lineStrokWidth = 3;

  const [baseLine, setBaseLine] = useState(0);
  const [secondLine, setSecondLine] = useState(0);
  const [fourLine, setFourLine] = useState(0);
  const [translateY, setTranslateY] = useState(false);
  const [progress, setProgress] = useState(0);
  const pathRef = useRef(new svgPathProperties(selectedLetter.path));
  const pathLength = pathRef.current.getTotalLength();

  const baseLineRef = useRef();
  const secondLineRef = useRef();
  const soundRef = useRef(null);
  const animationFrameRef = useRef(null);
  const [segmentLengths, setSegmentLengths] = useState([]);

  // basic animation
  // const startAnimation = async duration => {
  //   const startTime = Date.now();

  //   // Play the sound
  //   await soundRef.current.playAsync();

  //   const animate = () => {
  //     const elapsedTime = (Date.now() - startTime) / 1000;
  //     const currentProgress = elapsedTime / duration;
  //     setProgress(currentProgress);
  //     if (elapsedTime < duration) {
  //       animationFrameRef.current = requestAnimationFrame(animate);
  //     } else {
  //       setProgress(1);
  //       console.log('animation finished');
  //     }
  //   };
  //   animationFrameRef.current = requestAnimationFrame(animate);
  // };

  const startAnimation = async duration => {
    // Play the sound
    await soundRef.current.playAsync();

    const animate = startTime => {
      const elapsedTime = (Date.now() - startTime) / 1000;
      const currentProgress = elapsedTime / duration;

      if (elapsedTime >= 0) {
        setProgress(currentProgress);
      }

      if (elapsedTime < duration) {
        animationFrameRef.current = requestAnimationFrame(() =>
          animate(startTime),
        );
      } else {
        setProgress(1);
        console.log('animation finished');
      }
    };

    // Delay the start of the animation by 500ms
    setTimeout(() => {
      const startTime = Date.now(); // Set a new start time after the delay
      animationFrameRef.current = requestAnimationFrame(() =>
        animate(startTime),
      );
    }, 480);
  };

  // const segmentDurations = [2, 2]; // Durations for each segment in seconds

  // const startAnimation = () => {
  //   let startTime = Date.now();
  //   let currentSegment = 0;

  //   const animate = () => {
  //     const elapsedTime = (Date.now() - startTime) / 1000;
  //     const duration = segmentDurations[currentSegment];
  //     let currentProgress = elapsedTime / duration;

  //     if (currentProgress >= 1) {
  //       currentProgress = 1; // Ensure the current segment completes fully
  //       setProgress(segmentLengths[currentSegment]);

  //       if (currentSegment < segmentDurations.length - 1) {
  //         currentSegment += 1;
  //         setTimeout(() => {
  //           startTime = Date.now(); // Reset start time for the next segment
  //           animationFrameRef.current = requestAnimationFrame(animate);
  //         }, 1000); // Pause for 1 second before starting the next segment
  //         return;
  //       }
  //     } else {
  //       if (currentSegment === 0) {
  //         setProgress(currentProgress * segmentLengths[currentSegment]);
  //       } else {
  //         setProgress(
  //           segmentLengths[currentSegment - 1] +
  //             currentProgress *
  //               (segmentLengths[currentSegment] -
  //                 segmentLengths[currentSegment - 1]),
  //         );
  //       }
  //     }

  //     if (currentProgress < 1 || currentSegment < segmentDurations.length) {
  //       animationFrameRef.current = requestAnimationFrame(animate);
  //     }
  //   };

  //   animationFrameRef.current = requestAnimationFrame(animate);
  // };

  // useEffect(() => {
  //   segmentLengths.length > 0 && startAnimation();
  // }, [segmentLengths]);

  useEffect(() => {
    if (selectedLetter) {
      const playAudio = async () => {
        try {
          if (soundRef.current) {
            await soundRef.current.unloadAsync();
          }

          if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
          }
          // Buffer data provided
          const base64AudioData = selectedLetter.audioUrl;
          // // Decode base64 to binary buffer
          const buffer = Buffer.from(base64AudioData, 'base64');

          // // Write the buffer to a file
          const filePath = RNFS.DocumentDirectoryPath + '/dummy.mp3';
          await RNFS.writeFile(filePath, buffer.toString('base64'), 'base64');
          const {sound} = await Audio.Sound.createAsync({uri: filePath});
          soundRef.current = sound;
          const {durationMillis} = await sound.getStatusAsync();
          const duration = durationMillis / 1000;
          console.log('duration', duration);
          pathRef.current = new svgPathProperties(selectedLetter.path);
          // const segments = segmentDurations.map(
          //   (duration, index) =>
          //     (pathRef.current.getTotalLength() / segmentDurations.length) *
          //     (index + 1),
          // );
          // setSegmentLengths(segments);
          startAnimation(duration);
        } catch (error) {
          console.log(error);
        }
      };

      playAudio();
    }
  }, [selectedLetter]);

  useEffect(() => {
    return () => {
      if (soundRef.current) {
        const unloadSound = async () => {
          try {
            soundRef.current.unloadAsync();
          } catch (error) {
            console.log(error);
          }
        };

        unloadSound();
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (pathRef.current) {
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

      let foundLength = null;
      const targetX = 23.0642099380493164;
      const targetY = 12.707684516906738;

      for (let i = 0; i <= pathLength; i++) {
        const point = pathRef.current.getPointAtLength(i);
        if (
          Math.abs(point.x - targetX) < 1 &&
          Math.abs(point.y - targetY) < 1
        ) {
          foundLength = i;
          break;
        }
      }

      console.log('foundLength', foundLength);
    }
  }, [pathRef.current, selectedLetter, pathLength]);

  useEffect(() => {
    if (baseLineRef.current && secondLineRef.current) {
      const {y: baseLineY} = baseLineRef.current.getBBox();
      const {y: secondLineY} = secondLineRef.current.getBBox();
      setFourLine(baseLineY + secondLineY);
    }
  }, [baseLineRef.current, secondLineRef.current]);

  const dashOffset = pathLength - progress * pathLength;

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
            d={selectedLetter?.path}
            stroke={'gray'}
            opacity={0.5}
            translateY={27}
          />
        ) : (
          <Path d={selectedLetter?.path} stroke={'gray'} opacity={0.5} />
        )}
        {translateY ? (
          <AnimatedPath
            d={selectedLetter?.path}
            stroke={'white'}
            strokeDasharray={pathLength}
            strokeDashoffset={dashOffset}
            translateY={27}
          />
        ) : (
          <AnimatedPath
            d={selectedLetter?.path}
            stroke={'white'}
            strokeDasharray={pathLength}
            strokeDashoffset={dashOffset}
          />
        )}
      </Svg>
    </React.Fragment>
  );
};

export default LetterAnimation;
