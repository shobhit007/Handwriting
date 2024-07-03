import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, Animated, View} from 'react-native';
import {Path, Svg, Line} from 'react-native-svg';
import {svgPathProperties} from 'svg-path-properties';
import {Audio} from 'expo-av';

const AnimatedPath = Animated.createAnimatedComponent(Path);

const letterAPath =
  'M2 29C10.0652 22.4012 16.0883 13.8006 23.4444 6.44445C27.0002 2.88874 27.8484 3 33.2222 3C38.1906 3 41.3179 4.99672 44.2222 9.11111C44.7752 9.89447 45.0258 7.46857 44.7778 7C44.1284 5.77333 42.6564 6 41.5 6C37.6975 6 35.7173 2.51327 32.0556 2.05556C20.3062 0.586885 20 8.96604 20 18.5556C20 27.6676 29.4855 34.1611 37.5 27.8889C43.2022 23.4263 41 11.438 41 4.66667C41 -2.0434 40.3249 19.2034 44.4444 24.5C47.568 28.516 48.5497 30.8686 54.3333 31C57.4027 31.0698 58 29.8579 58 27';
const letterBPath =
  'M2 54C11.6717 54 15.7209 43.6231 18.7778 35.3333C22.3018 25.7766 25 16.3521 25 6.22222C25 5.37083 25.4278 2.87221 24.7778 2.22222C24.0242 1.46861 22.0651 1.894 22 3C21.3149 14.6468 18.6209 26.2024 18 38C17.7947 41.9013 18 45.8703 18 49.7778C18 53.6673 18.0665 54 22 54C25.4494 54 26.7937 54.7128 27 51C27.1408 48.4663 27.8484 45.7292 28 43C28.1043 41.123 30.5731 36.0175 28.7778 34.2222C25.795 31.2395 25 36.3684 25 38C25 43.0225 33.8602 41 38 41';

const letterPaths = [letterAPath, letterBPath];

const SVG_WIDTH = 309;
const SVG_HEIGHT = 200;

const letterA = {
  segments: [
    {
      audioBuffer:
        'https://storage.googleapis.com/younglabs-uat.appspot.com/YLHCourses/EngPrint_HW/a/English/mainScriptSegment/Segment0/audioBlob',
    }, // replace with actual audio buffers
    {
      audioBuffer:
        'https://storage.googleapis.com/younglabs-uat.appspot.com/YLHCourses/EngPrint_HW/a/English/mainScriptSegment/Segment1/audioBlob',
    },
  ],
  segmentLengths: [60, 191.05731806466815],
  // segmentDurations: [3, 4],
};

const letterB = {
  segments: [
    {
      audioBuffer:
        'https://storage.googleapis.com/younglabs-uat.appspot.com/YLHCourses/EngPrint_HW/b/English/mainScriptSegment/Segment0/audioBlob',
    },
    {
      audioBuffer:
        'https://storage.googleapis.com/younglabs-uat.appspot.com/YLHCourses/EngPrint_HW/b/English/mainScriptSegment/Segment1/audioBlob',
    },
  ],
  segmentLengths: [64, 166.77049801805896],
  // segmentDurations: [4, 3.5],
};

const paths = [letterAPath, letterBPath];

const pathProperties = paths.map(path => new svgPathProperties(path));
const totalPathLengths = pathProperties.map(property =>
  property.getTotalLength(),
);

const useAnimation = letters => {
  const [progress, setProgress] = useState(0);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [currentSegment, setCurrentSegment] = useState(0);
  const animationFrameRef = useRef(null);

  const startAnimation = async () => {
    const playAudioForSegment = async audio => {
      const {sound} = await Audio.Sound.createAsync({uri: audio});
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

    const playAndAnimateSegment = async (segment, selectedLetter) => {
      const segmentLengthStart =
        segment === 0 ? 0 : selectedLetter.segmentLengths[segment - 1];
      const segmentLengthEnd = selectedLetter.segmentLengths[segment];
      const {sound, duration} = await playAudioForSegment(
        selectedLetter.segments[segment].audioBuffer,
      );
      await animateSegment(duration, segmentLengthStart, segmentLengthEnd);
      await sound.stopAsync();
    };

    const processLetter = async (selectedLetter, letterIndex) => {
      setCurrentLetterIndex(letterIndex); // Set the current letter
      for (
        let segment = 0;
        segment < selectedLetter.segments.length;
        segment++
      ) {
        setCurrentSegment(segment);
        await playAndAnimateSegment(segment, selectedLetter);
        // Pause for 1 second before moving to the next segment
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    };

    for (let i = 0; i < letters.length; i++) {
      await processLetter(letters[i], i);
    }
  };

  useEffect(() => {
    startAnimation(letters);
  }, []);

  return {progress, currentLetterIndex};
};

const WordFormation = () => {
  const path1 = new svgPathProperties(letterAPath);
  const path2 = new svgPathProperties(letterBPath);

  console.log('endpoints', path1.getPointAtLength(187.76680970489386));
  console.log('startpoints', path2.getPointAtLength(0));

  const letterAPathLength = path1.getTotalLength();
  const letterBPathLength = path2.getTotalLength();

  const [progress, setProgress] = useState(0);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);

  const currentLetterPathLength = new svgPathProperties(
    letterPaths[currentLetterIndex],
  ).getTotalLength();

  const animationFrameRef = useRef(null);

  const startAnimation = async letters => {
    const playAudioForSegment = async audio => {
      const {sound} = await Audio.Sound.createAsync({uri: audio});
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

    const playAndAnimateSegment = async (segment, selectedLetter) => {
      const segmentLengthStart =
        segment === 0 ? 0 : selectedLetter.segmentLengths[segment - 1];
      const segmentLengthEnd = selectedLetter.segmentLengths[segment];
      const {sound, duration} = await playAudioForSegment(
        selectedLetter.segments[segment].audioBuffer,
      );
      await animateSegment(duration, segmentLengthStart, segmentLengthEnd);
      await sound.stopAsync();
    };

    const processLetter = async (selectedLetter, letterIndx) => {
      setCurrentLetterIndex(letterIndx);
      for (
        let currentSegment = 0;
        currentSegment < selectedLetter.segments.length;
        currentSegment++
      ) {
        await playAndAnimateSegment(currentSegment, selectedLetter);
        // Pause for 1 second before moving to the next segment
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    };

    for (let i = 0; i < letters.length; i++) {
      const letter = letters[i];
      await processLetter(letter, i);
    }
  };

  useEffect(() => {
    // startAnimation([letterA, letterB]);
  }, []);

  const dashOffset =
    (currentLetterIndex === 0 ? letterAPathLength : letterBPathLength) -
    progress;

  return (
    <View>
      <Svg
        fill={'none'}
        width={SVG_WIDTH}
        height={SVG_HEIGHT}
        viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}>
        <Path d={letterAPath} stroke={'gray'} strokeWidth={3} translateY={27} />
        {/* {currentLetterIndex === 0 && (
          <AnimatedPath
            d={letterAPath}
            stroke={'white'}
            strokeWidth={3}
            translateY={27}
            strokeDasharray={letterAPathLength}
            strokeDashoffset={dashOffset}
          />
        )} */}
        <Path d="M60 27 Q 30 60, 2 10" stroke={'white'} strokeWidth={3} />
        <Path
          d={letterBPath}
          stroke={'gray'}
          strokeWidth={3}
          translateX={58.44985580444336}
        />
        {/* {currentLetterIndex === 1 && (
          <AnimatedPath
            d={letterBPath}
            stroke={'white'}
            strokeWidth={3}
            translateX={58.44985580444336}
            strokeDasharray={letterBPathLength}
            strokeDashoffset={dashOffset}
          />
        )} */}
      </Svg>
    </View>
  );
};

export default WordFormation;

const styles = StyleSheet.create({});
