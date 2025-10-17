import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Svg, {G, Path} from 'react-native-svg';
import {svgPathProperties} from 'svg-path-properties';
import {CursiveLetters} from '../us_cursive_letter';
import {PrintLetters} from '../letter';
import {CursiveLetters2} from '../us_cursive_letter_2';

const SCALE = 1.5;
ORIGINAL_SCALE = 2;

const caps = 'acdgqhijktu';
const ascenders = 'blf';
const base_mno = 'mnovwxyz';

const Animation = ({word}) => {
  const [segments, segmentsSet] = React.useState([]);
  const [segmentIndex, setSegmentIndex] = React.useState(0);
  const [svgIndex, setSvgIndex] = React.useState(0);
  const [progress, setProgress] = React.useState(0);

  const animationFrameRef = React.useRef(null);

  useEffect(() => {
    let svgSegments = [];
    for (let i = 0; i < word.length; i++) {
      const current = word[i];
      const next = word[i + 1] || '';
      const prev = word[i - 1] || '';

      let letterKey = current;

      const mergedLetters = {...CursiveLetters, ...CursiveLetters2};

      // Handle two-character ligatures first (like 'ij', 'th', etc.)
      if (next && mergedLetters[current + next]) {
        console;
        letterKey = current + next;
        const hasMoreLetters = i + 2 < word.length;

        // If there are more letters, try to use the .alt version
        if (hasMoreLetters && mergedLetters[letterKey + '.alt']) {
          letterKey = letterKey + '.alt';
        }

        console.log('ligatureKey', letterKey);

        svgSegments.push(mergedLetters[letterKey]);
        i++; // skip the next letter since we used it in the ligature
      }
      // Handle single letters with connection context
      else if (mergedLetters[current]) {
        // Determine the connection variant to use
        if (i === 0) {
          if (next) {
            if (ascenders.includes(next)) {
              letterKey = `${current}.asc`;
            } else if (caps.includes(next)) {
              letterKey = `${current}.caps`;
            } else if (next === 'e') {
              letterKey = `${current}.left.e`;
            } else if (next === 'p') {
              letterKey = `${current}.left.p`;
            } else if (base_mno.includes(next)) {
              letterKey = `${current}.left.mn`;
            } else if (next === 'r' || next === 's') {
              letterKey = `${current}.left.rs`;
            }
          }
        } else if (i === word.length - 1) {
          // Last letter - use right-connecting version
          if (prev === 'M' || prev === 'N' || prev === 'R') {
            letterKey = `M.${current}`;
          } else {
            letterKey = `${prev}.${current}`;
          }
        } else {
          // Middle letter - use connecting version from previous letter
          if (caps.includes(next)) {
            letterKey = `${prev}.${current}.caps`;
          } else if (ascenders.includes(next)) {
            letterKey = `${prev}.${current}.asc`;
          } else if (base_mno.includes(next)) {
            letterKey = `${prev}.${current}.mn`;
          } else if (next === 'e') {
            letterKey = `${prev}.${current}.e`;
          } else if (next === 'p') {
            letterKey = `${prev}.${current}.p`;
          } else if (next === 'r' || next === 's') {
            letterKey = `${prev}.${current}.rs`;
          }
        }

        console.log('letterKey', letterKey);

        // Fall back to basic letter if specific connection doesn't exist
        if (!mergedLetters[letterKey]) {
          letterKey = current;
        }

        // Only add if the letter exists in our map
        if (mergedLetters[letterKey]) {
          svgSegments.push(mergedLetters[letterKey]);
        }
      }
    }
    segmentsSet(svgSegments);
  }, [word]);

  const playAnimation = (segmentIndex, svgIndex) => {
    if (segmentIndex >= segments.length) {
      console.log('Animation completed');
      return;
    }

    const currentSegment = segments[segmentIndex];
    const currentSvg = currentSegment.svgs[svgIndex];
    const duration = currentSvg.duration || 2;
    const startTime = Date.now();

    const animate = () => {
      const elapsedTime = (Date.now() - startTime) / 1000;
      const progress = Math.min(elapsedTime / duration, 1);
      setProgress(progress);

      if (elapsedTime < duration) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        setProgress(0);
        if (svgIndex < currentSegment.svgs.length - 1) {
          setSvgIndex(svgIndex + 1);
          playAnimation(segmentIndex, svgIndex + 1);
        } else {
          setSvgIndex(0);
          setSegmentIndex(segmentIndex + 1);
          playAnimation(segmentIndex + 1, 0);
        }
      }
    };

    requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (segments.length > 0) {
      // playAnimation(segmentIndex, svgIndex);
    }
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [segments]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        position: 'relative',
        paddingHorizontal: 16,
      }}>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
          position: 'relative',
        }}>
        {segments.map((segment, segmentIdx) => {
          const previousSegments = segments.slice(0, segmentIdx + 1);
          const originalTranslationX = previousSegments.reduce(
            (acc, currSegment) => {
              return acc + (currSegment.x || 0);
            },
            0,
          );

          // Adjust for the scale change
          const translationX = (originalTranslationX / ORIGINAL_SCALE) * SCALE;
          console.log('translationX', translationX);
          return (
            <View
              key={`segment-${segmentIdx}`}
              style={{
                transform: [{translateX: translationX || 0}],
              }}>
              <Svg
                width={segment.width * SCALE}
                height={segment.height * SCALE}
                viewBox={`0 0 ${segment.width} ${segment.height}`}
                fill={'none'}>
                {segment.svgs.map((svg, index) => {
                  return (
                    <>
                      <Path
                        key={`${segmentIdx}-${index}`}
                        d={svg.path}
                        stroke="#000"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </>
                  );
                })}

                {(() => {
                  const currentSvgPath = segment.svgs[svgIndex]?.path || '';
                  const pathData = new svgPathProperties(currentSvgPath);
                  const pathLength = pathData.getTotalLength();

                  const dashOffset = pathLength * (1 - progress);

                  const isActivePath = segmentIdx === segmentIndex;

                  if (!isActivePath) {
                    return null;
                  }

                  return (
                    <Path
                      key={`active-${segmentIdx}`}
                      d={currentSvgPath}
                      stroke="red"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeDasharray={pathLength}
                      strokeDashoffset={dashOffset}
                    />
                  );
                })()}
              </Svg>
            </View>
          );
        })}
      </View>

      <Pressable
        style={{
          position: 'absolute',
          top: 20,
          right: 20,
          padding: 10,
          borderWidth: 1,
          borderRadius: 8,
        }}
        onPress={() => {
          setSegmentIndex(0);
          setSvgIndex(0);
          setProgress(0);
          playAnimation(0, 0);
        }}>
        <Text style={{color: 'black'}}>Restart</Text>
      </Pressable>
    </View>
  );
};

export default Animation;

const styles = StyleSheet.create({});
