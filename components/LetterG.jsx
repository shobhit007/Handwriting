import React, {useState, useEffect, useRef} from 'react';
import {Animated, Pressable, Text} from 'react-native';
import {Svg, Path, Line} from 'react-native-svg';
import {Buffer} from 'buffer';
import RNFS from 'react-native-fs';
import {svgPathProperties} from 'svg-path-properties';
import {Audio} from 'expo-av';

const AnimatedPath = Animated.createAnimatedComponent(Path);
const LetterG = ({showLines, selectedLetter}) => {
  const SVG_WIDTH = 309;
  const SVG_HEIGHT = 200;
  const lineStrokWidth = 3;

  const [isPlaying, setIsPlaying] = useState(false);
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

  // step 1: load audio files
  const [audioFiles] = useState(
    selectedLetter.segments.map(segment => segment.audioBuffer),
  );
  const [segmentDurations, setSegmentDurations] = useState([]);
  const segmentLengths = [88, 315];

  const fetchAudioDuration = async audio => {
    // Buffer data provided
    const base64AudioData = audio;
    // // Decode base64 to binary buffer
    const buffer = Buffer.from(base64AudioData, 'base64');

    // // Write the buffer to a file
    const filePath = RNFS.DocumentDirectoryPath + '/dummy.mp3';
    await RNFS.writeFile(filePath, buffer.toString('base64'), 'base64');
    const {sound} = await Audio.Sound.createAsync({uri: filePath});
    const {durationMillis} = await sound.getStatusAsync();
    const duration = durationMillis / 1000;
    return duration;
  };

  useEffect(() => {
    const getSegmentDurations = async () => {
      const segments = selectedLetter.segments;
      let durations = [];
      for (let i = 0; i < segments.length; i++) {
        const segment = segments[i];
        const duration = await fetchAudioDuration(segment.audioBuffer);
        durations.push(duration);
      }
      const max = Math.max(...durations);
      const maxDurations = Array.from({length: durations.length}).map(
        (_, i) => max,
      );
      console.log('maxDurations', maxDurations);

      setSegmentDurations(maxDurations);
    };

    getSegmentDurations();
  }, []);

  useEffect(() => {
    if (segmentDurations.length > 0) {
      startAnimation();
    }
  }, [segmentDurations]);

  // basic animation
  // const startAnimation = async (duration, callback) => {
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
  //       // console.log('animation finished');
  //       callback(true);
  //     }
  //   };

  //   animationFrameRef.current = requestAnimationFrame(animate);
  // };

  // Do not remove this code
  // const startAnimation = async () => {
  //   let currentSegment = 0;

  //   const playAudioForSegment = async segment => {
  //     // Fetch and play the audio for the current segment
  //     const audioBuffer = selectedLetter.segments[segment].audioBuffer;
  //     const base64AudioData = audioBuffer;
  //     const buffer = Buffer.from(base64AudioData, 'base64');
  //     const filePath =
  //       RNFS.DocumentDirectoryPath + '/segment' + segment + '.mp3';
  //     await RNFS.writeFile(filePath, buffer.toString('base64'), 'base64');
  //     const {sound} = await Audio.Sound.createAsync({uri: filePath});
  //     await sound.playAsync();
  //     return sound;
  //   };

  //   const animate = async () => {
  //     let startTime = Date.now();

  //     const step = async () => {
  //       const elapsedTime = (Date.now() - startTime) / 1000;
  //       const duration = segmentDurations[currentSegment];
  //       let currentProgress = elapsedTime / duration;

  //       if (currentProgress >= 1) {
  //         currentProgress = 1; // Ensure the current segment completes fully
  //         setProgress(segmentLengths[currentSegment]);

  //         if (currentSegment < segmentDurations.length - 1) {
  //           currentSegment += 1;

  //           playAudioForSegment(currentSegment);
  //           startTime = Date.now(); // Reset start time for the next segment
  //           animationFrameRef.current = requestAnimationFrame(step);
  //         } else {
  //           // Animation is finished
  //           if (animationFrameRef.current) {
  //             cancelAnimationFrame(animationFrameRef.current);
  //             animationFrameRef.current = null;
  //           }
  //           return; // Exit the function to stop the animation loop
  //         }
  //       } else {
  //         if (currentSegment === 0) {
  //           setProgress(currentProgress * segmentLengths[currentSegment]);
  //         } else {
  //           setProgress(
  //             segmentLengths[currentSegment - 1] +
  //               currentProgress *
  //                 (segmentLengths[currentSegment] -
  //                   segmentLengths[currentSegment - 1]),
  //           );
  //         }
  //       }

  //       if (currentSegment < segmentDurations.length) {
  //         animationFrameRef.current = requestAnimationFrame(step);
  //       }
  //     };

  //     animationFrameRef.current = requestAnimationFrame(step);
  //   };

  //   // Start the animation loop after a delay of 500ms
  //   setTimeout(() => {
  //     animate();
  //   }, 500);

  //   // Start playing audio for the first segment immediately
  //   await playAudioForSegment(currentSegment);
  // };
  const startAnimation = async () => {
    const playAudioForSegment = async segment => {
      const audioBuffer = selectedLetter.segments[segment].audioBuffer;
      const base64AudioData = audioBuffer;
      const buffer = Buffer.from(base64AudioData, 'base64');
      const filePath =
        RNFS.DocumentDirectoryPath + '/segment' + segment + '.mp3';
      await RNFS.writeFile(filePath, buffer.toString('base64'), 'base64');
      const {sound} = await Audio.Sound.createAsync({uri: filePath});
      await sound.playAsync();
      const status = await sound.getStatusAsync();
      return {sound, duration: status.durationMillis / 1000};
    };

    const animateSegment = async (
      duration,
      segmentLengthStart,
      segmentLengthEnd,
    ) => {
      return new Promise(resolve => {
        let startTime = null;

        const animate = timestamp => {
          if (!startTime) startTime = timestamp;
          const elapsedTime = (timestamp - startTime) / 1000;
          const normalizedProgress = elapsedTime / duration;

          if (elapsedTime < duration) {
            setProgress(
              segmentLengthStart +
                normalizedProgress * (segmentLengthEnd - segmentLengthStart),
            );
            animationFrameRef.current = requestAnimationFrame(animate);
          } else {
            setProgress(segmentLengthEnd);
            resolve(); // Animation is complete
          }
        };

        // Start animation with a delay of 1 second
        setTimeout(() => {
          animationFrameRef.current = requestAnimationFrame(animate);
        }, 1000); // 1-second delay before starting the animation
      });
    };

    const playAndAnimateSegment = async segment => {
      const segmentLengthStart =
        segment === 0 ? 0 : segmentLengths[segment - 1];
      const segmentLengthEnd = segmentLengths[segment];
      const {sound, duration} = await playAudioForSegment(segment);
      await animateSegment(duration, segmentLengthStart, segmentLengthEnd);
      await sound.stopAsync();
    };

    const processSegments = async () => {
      for (
        let currentSegment = 0;
        currentSegment < segmentDurations.length;
        currentSegment++
      ) {
        await playAndAnimateSegment(currentSegment);
        // Pause for 1 second before moving to the next segment
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    };

    await processSegments();
  };

  // animation with a pause after each segment
  // const startAnimation = async () => {
  //   let currentSegment = 0;

  //   const playAudioForSegment = async segment => {
  //     // Fetch and play the audio for the current segment
  //     const audioBuffer = selectedLetter.segments[segment].audioBuffer;
  //     const base64AudioData = audioBuffer;
  //     const buffer = Buffer.from(base64AudioData, 'base64');
  //     const filePath =
  //       RNFS.DocumentDirectoryPath + '/segment' + segment + '.mp3';
  //     await RNFS.writeFile(filePath, buffer.toString('base64'), 'base64');
  //     const {sound} = await Audio.Sound.createAsync({uri: filePath});
  //     await sound.playAsync();
  //     return sound;
  //   };

  //   const animateSegment = async duration => {
  //     return new Promise(resolve => {
  //       let startTime = null;

  //       const animate = timestamp => {
  //         if (!startTime) startTime = timestamp;
  //         const elapsedTime = (timestamp - startTime) / 1000;
  //         const currentProgress = elapsedTime / duration;

  //         if (elapsedTime < duration) {
  //           if (currentSegment === 0) {
  //             setProgress(currentProgress * segmentLengths[currentSegment]);
  //           } else {
  //             setProgress(
  //               segmentLengths[currentSegment - 1] +
  //                 currentProgress *
  //                   (segmentLengths[currentSegment] -
  //                     segmentLengths[currentSegment - 1]),
  //             );
  //           }
  //           animationFrameRef.current = requestAnimationFrame(animate);
  //         } else {
  //           setProgress(segmentLengths[currentSegment]);
  //           resolve(); // Animation is complete
  //         }
  //       };

  //       // Start animation with a delay of 1 second
  //       setTimeout(() => {
  //         animationFrameRef.current = requestAnimationFrame(animate);
  //       }, 500);
  //     });
  //   };

  //   const playAndAnimateSegment = async segment => {
  //     const duration = segmentDurations[segment];
  //     const sound = await playAudioForSegment(segment);
  //     await animateSegment(duration);
  //     await sound.stopAsync();
  //   };

  //   const processSegments = async () => {
  //     for (
  //       currentSegment = 0;
  //       currentSegment < segmentDurations.length;
  //       currentSegment++
  //     ) {
  //       await playAndAnimateSegment(currentSegment);
  //       // Pause for 1 second before moving to the next segment
  //       await new Promise(resolve => setTimeout(resolve, 500));
  //     }
  //   };

  //   await processSegments();
  // };

  // useEffect(() => {
  //   if (selectedLetter) {
  //     const playAudio = async () => {
  //       try {
  //         if (soundRef.current) {
  //           await soundRef.current.unloadAsync();
  //         }

  //         if (animationFrameRef.current) {
  //           cancelAnimationFrame(animationFrameRef.current);
  //         }
  //         // Buffer data provided
  //         const base64AudioData = selectedLetter.audioUrl;
  //         // // Decode base64 to binary buffer
  //         const buffer = Buffer.from(base64AudioData, 'base64');

  //         // // Write the buffer to a file
  //         const filePath = RNFS.DocumentDirectoryPath + '/dummy.mp3';
  //         await RNFS.writeFile(filePath, buffer.toString('base64'), 'base64');
  //         const {sound} = await Audio.Sound.createAsync({uri: filePath});
  //         soundRef.current = sound;
  //         const {durationMillis} = await sound.getStatusAsync();
  //         const duration = durationMillis / 1000;
  //         console.log('duration', duration);
  //         pathRef.current = new svgPathProperties(selectedLetter.path);
  //         const segments = segmentDurations.map(
  //           (duration, index) =>
  //             (pathRef.current.getTotalLength() / segmentDurations.length) *
  //             (index + 1),
  //         );
  //         setSegmentLengths(segments);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };

  //     playAudio();
  //   }
  // }, [selectedLetter]);

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

  // useEffect(() => {
  //   if (pathRef.current) {
  //     if (
  //       selectedLetter?.type === 'descender' ||
  //       selectedLetter?.type === 'baseline'
  //     ) {
  //       setTranslateY(true);
  //     } else {
  //       setTranslateY(false);
  //     }
  //     setBaseLine(54);
  //     setSecondLine(27);

  //     let foundLength = null;
  //     const targetX = 23.0642099380493164;
  //     const targetY = 12.707684516906738;

  //     for (let i = 0; i <= pathLength; i++) {
  //       const point = pathRef.current.getPointAtLength(i);
  //       if (
  //         Math.abs(point.x - targetX) < 1 &&
  //         Math.abs(point.y - targetY) < 1
  //       ) {
  //         foundLength = i;
  //         break;
  //       }
  //     }

  //     console.log('foundLength', foundLength);
  //   }
  // }, [pathRef.current, selectedLetter, pathLength]);

  // useEffect(() => {
  //   if (baseLineRef.current && secondLineRef.current) {
  //     const {y: baseLineY} = baseLineRef.current.getBBox();
  //     const {y: secondLineY} = secondLineRef.current.getBBox();
  //     setFourLine(baseLineY + secondLineY);
  //   }
  // }, [baseLineRef.current, secondLineRef.current]);

  const dashOffset = pathLength - progress;

  return (
    <React.Fragment>
      <Pressable
        onPress={() => {
          setProgress(0);
          startAnimation();
        }}
        style={{
          backgroundColor: 'blue',
          paddingHorizontal: 25,
          paddingVertical: 12,
        }}>
        <Text style={{color: 'white'}}>Replay</Text>
      </Pressable>
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

export default LetterG;
