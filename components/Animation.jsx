import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Svg, {G, Path} from 'react-native-svg';
import {svgPathProperties} from 'svg-path-properties';
import {CursiveLetters} from '../us_cursive_letter';
import {PrintLetters} from '../letter';

const SCALE = 3;

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
      const ligature = current + next;

      // 1) If the two‐char ligature exists in your map, use that…
      if (next === 'j' && PrintLetters[ligature]) {
        svgSegments.push(PrintLetters[ligature]);
        i++; // skip the 'j' on the next loop iteration
      }
      // 2) Otherwise if the single letter exists, use that…
      else if (PrintLetters[current]) {
        svgSegments.push(PrintLetters[current]);
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
        alignItems: 'center',
        position: 'relative',
      }}>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
          position: 'relative',
          // borderWidth: 1,
          gap: 4,
        }}>
        {segments.map((segment, segmentIdx) => (
          <View
            key={segmentIdx}
            style={{
              transform: [
                {translateX: segment.x || 0 * SCALE},
                {translateY: segment.y || 0 * SCALE},
              ],
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
        ))}
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
