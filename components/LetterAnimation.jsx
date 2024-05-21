import React, {useState, useEffect, useRef} from 'react';
import {Animated, Button} from 'react-native';
import {Svg, Path, G, Defs, Line, ClipPath} from 'react-native-svg';
import {TextToSpeech, convertBufferToBase64} from '../functions/text-to-speech';
import Sound from 'react-native-sound';
import {Buffer} from 'buffer';
import RNFS from 'react-native-fs';

const AnimatedPath = Animated.createAnimatedComponent(Path);
const LetterAnimation = ({showLines, selectedLetter}) => {
  const SVG_WIDTH = 309;
  const SVG_HEIGHT = 200;
  const lineStrokWidth = 3;

  const [baseLine, setBaseLine] = useState(0);
  const [secondLine, setSecondLine] = useState(0);
  const [fourLine, setFourLine] = useState(0);
  const [translateY, setTranslateY] = useState(false);
  const pathRef = useRef();
  const baseLineRef = useRef();
  const secondLineRef = useRef();
  const soundRef = useRef(null);
  const animationFrameRef = useRef(null);
  const [pathLength, setPathLength] = useState(0);
  const [progress, setProgress] = useState(0);

  const startAnimation = duration => {
    console.log('startAnimation', duration);
    const startTime = Date.now();

    // Play the sound
    soundRef.current.play(success => {
      if (!success) {
        console.log('Sound playback failed');
      }
    });

    const animate = () => {
      const elapsedTime = (Date.now() - startTime) / 1000;
      const currentProgress = elapsedTime / duration;
      setProgress(currentProgress);
      if (elapsedTime < duration) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        setProgress(1);
        console.log('animation finished');
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (selectedLetter) {
      // Buffer data provided
      const base64AudioData = selectedLetter.audioUrl;

      // Decode base64 to binary buffer
      const buffer = Buffer.from(base64AudioData, 'base64');

      // Write the buffer to a file
      const filePath = RNFS.DocumentDirectoryPath + '/dummy.mp3';
      RNFS.writeFile(filePath, buffer.toString('base64'), 'base64')
        .then(() => {
          console.log('File written successfully:', filePath);

          // Initialize sound from file path
          soundRef.current = new Sound(filePath, '', error => {
            if (error) {
              console.error('Failed to load sound', error);
              setError('Failed to load sound');
              return;
            }
            const duration = soundRef.current.getDuration();
            startAnimation(duration);
          });
        })
        .catch(error => {
          console.error('Failed to write file', error);
          setError('Failed to write file');
        });
      if (soundRef.current) {
        soundRef.current.release();
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    }
  }, [selectedLetter]);

  useEffect(() => {
    return () => {
      if (soundRef.current) {
        soundRef.current.release();
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (pathRef.current) {
      const svgPathLength = pathRef.current.getTotalLength();
      console.log('svgPathLength', svgPathLength);
      setPathLength(svgPathLength);
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
  }, [pathRef.current, selectedLetter]);

  useEffect(() => {
    if (baseLineRef.current && secondLineRef.current) {
      const {y: baseLineY} = baseLineRef.current.getBBox();
      const {y: secondLineY} = secondLineRef.current.getBBox();
      setFourLine(baseLineY + secondLineY);
    }
  }, [baseLineRef.current, secondLineRef.current]);

  const dashOffset = pathLength - pathLength * progress;

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
