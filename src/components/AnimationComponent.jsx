import React, {useEffect, useRef, useState, useMemo} from 'react';
import {View, Animated, Text, Pressable, StyleSheet} from 'react-native';
import {Path, Svg, G} from 'react-native-svg';
import {svgPathProperties} from 'svg-path-properties';
import {generateLetterToSVG} from '../utils/feature';
import {AlphabetLetters} from '../utils/letters';

const AnimationComponent = () => {
  const [segments, setSegments] = useState([]);

  useEffect(() => {
    const letter = 'p';
    let generatedLetters = generateLetterToSVG(letter);
    generatedLetters = ['o.alt', 'o.x.alt', 'x.alt'];
    let generatedSegments = [];
    for (let i = 0; i < generatedLetters.length; i++) {
      const currentLetter = generatedLetters[i];
      const previousLetter = generatedLetters[i - 1];
      let segment = JSON.parse(JSON.stringify(AlphabetLetters[currentLetter]));
      const previousSegment = previousLetter
        ? JSON.parse(JSON.stringify(AlphabetLetters[previousLetter]))
        : null;

      if (
        previousLetter &&
        previousLetter.includes('caps') &&
        'acdgoq'.split('').includes(currentLetter.split('.')[0])
      ) {
        console.log('caps');
        const svgs = segment.svgs.map(svg => {
          return {
            ...svg,
            attr: {
              ...svg.attr,
              translateX: svg.attr.translateX - 38,
            },
          };
        });
        segment = {svgs};
      } else if (
        previousLetter &&
        previousLetter.includes('b') &&
        (currentLetter.includes('r.alt') || currentLetter.includes('s.alt'))
      ) {
        const svgs = segment.svgs.map(svg => {
          return {
            ...svg,
            attr: {
              ...svg.attr,
              translateX: svg.attr.translateX - 14,
            },
          };
        });
        segment = {svgs};
      } else if (previousLetter && currentLetter.includes('l.alt')) {
        console.log('l.alt');
        if (previousSegment) {
          const svgs = segment.svgs.map(svg => {
            return {
              ...svg,
              attr: {
                ...svg.attr,
                translateX: svg.attr.translateX - 24,
              },
            };
          });
          segment = {svgs};
        }
      } else if (
        previousLetter &&
        previousLetter === 'a.rs.alt' &&
        (currentLetter === 'r.alt' || currentLetter === 's.alt')
      ) {
        const svgs = segment.svgs.map(svg => {
          return {
            ...svg,
            attr: {
              ...svg.attr,
              translateX: svg.attr.translateX - 14,
            },
          };
        });
        segment = {svgs};
      } else if (currentLetter === 'j.alt' || currentLetter === 'j.base') {
        const svgs = segment.svgs.map(svg => {
          return {
            ...svg,
            attr: {
              ...svg.attr,
              translateX: svg.attr.translateX - 28,
            },
          };
        });
        segment = {svgs};
      } else if (previousLetter && currentLetter === 'x.alt') {
        console.log('x.alt');
        const svgs = segment.svgs.map(svg => {
          return {
            ...svg,
            attr: {
              ...svg.attr,
              translateX: svg.attr.translateX - 12,
            },
          };
        });
        segment = {svgs};
      } else {
        console.log('all');
        const svgs = segment.svgs.map(svg => {
          return {
            ...svg,
            attr: {
              ...svg.attr,
              translateX: svg.attr.translateX - 8,
            },
          };
        });
        segment = {svgs};
      }

      generatedSegments.push(segment);
    }

    // generatedSegments = generatedSegments.map(segment => {
    //   const svgs = segment.svgs.map(svg => {
    //     if (svg.type === 'curve') {
    //       return {
    //         ...svg,
    //         attr: {...svg.attr, translateX: svg.attr.translateX - 8},
    //       };
    //     }
    //     return svg;
    //   });

    //   return {...segment, svgs};
    // });

    setSegments(generatedSegments);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          paddingHorizontal: 80,
        }}>
        <RenderSVG segments={segments} />
      </View>
    </View>
  );
};

// Initial code do not remove
// const RenderSVG = React.memo(({svgs}) => {
//   const animationFrameRef = useRef(null);
//   const [progress, setProgress] = useState(0);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [completedAnimations, setCompletedAnimations] = useState([]);

//   const animations = [3, 2, 2];

//   const playNextAnimation = index => {
//     if (index >= animations.length) {
//       console.log('all animations finished');
//       return; // All animations have been played
//     }

//     const duration = animations[index];

//     const startTime = Date.now();
//     const animate = () => {
//       const elapsedTime = (Date.now() - startTime) / 1000;
//       const currentProgress = elapsedTime / duration;
//       setProgress(currentProgress);
//       if (elapsedTime < duration) {
//         animationFrameRef.current = requestAnimationFrame(animate);
//       } else {
//         setProgress(1);
//         if (index < animations.length - 1) {
//           setCurrentIndex(index + 1);
//           setCompletedAnimations(p => [...p, index]);
//         }
//         console.log('animation finished');
//         playNextAnimation(index + 1);
//       }
//     };

//     requestAnimationFrame(animate);
//   };

//   useEffect(() => {
//     playNextAnimation(0);
//   }, []);

//   // const renderedSVGs = useMemo(() => {
//   //   return svgs.map((svg, index) => {
//   //     const {width, height, viewBox, translateX, ...otherProps} = svg.attr;
//   //     const pathLength = new svgPathProperties(svg.path).getTotalLength();
//   //     const dashOffset =
//   //       index === currentIndex ? pathLength * progress * -1 : 0;
//   //     const isCompleted = completedAnimations.includes(index);
//   //     return (
//   //       <Svg
//   //         key={index}
//   //         width={width}
//   //         height={height}
//   //         viewBox={viewBox}
//   //         fill="none"
//   //         xmlns="http://www.w3.org/2000/svg"
//   //         translateX={translateX}
//   //         style={{zIndex: svg.type === 'curve' ? 1 : 0}}
//   //         {...otherProps}>
//   //         <Path
//   //           d={svg.path}
//   //           stroke={'white'}
//   //           strokeWidth="7"
//   //           strokeLinecap="round"
//   //         />
//   //         <Path
//   //           d={svg.path}
//   //           stroke={isCompleted ? 'white' : 'gray'}
//   //           strokeWidth="7"
//   //           strokeLinecap="round"
//   //           strokeDasharray={pathLength}
//   //           strokeDashoffset={dashOffset}
//   //         />
//   //       </Svg>
//   //     );
//   //   });
//   // }, [svgs, progress, currentIndex, completedAnimations]);

//   return (
//     <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
//       {svgs.map((svg, index) => {
//         const {width, height, viewBox, translateX, ...otherProps} = svg.attr;
//         const pathLength = new svgPathProperties(svg.path).getTotalLength();
//         const dashOffset =
//           index === currentIndex ? pathLength * progress * -1 : 0;
//         const isCompleted = completedAnimations.includes(index);
//         return (
//           <Svg
//             key={index}
//             width={width}
//             height={height}
//             viewBox={viewBox}
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//             translateX={translateX}
//             style={{zIndex: svg.type === 'curve' ? 1 : 0}}
//             {...otherProps}>
//             <Path
//               d={svg.path}
//               stroke={'white'}
//               strokeWidth="7"
//               strokeLinecap="round"
//             />
//             <Path
//               d={svg.path}
//               stroke={isCompleted || index < currentIndex ? 'white' : 'gray'}
//               strokeWidth="7"
//               strokeLinecap="round"
//               strokeDasharray={pathLength}
//               strokeDashoffset={dashOffset}
//             />
//           </Svg>
//         );
//       })}
//     </View>
//   );
// });

// first version
// const RenderSVG = React.memo(({svgs}) => {
//   const animationFrameRef = useRef(null);
//   const [progress, setProgress] = useState(0);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [completedAnimations, setCompletedAnimations] = useState([]);
//   const [animationStarted, setAnimationStarted] = useState(false);

//   const animations = [2, 3, 2, 2, 0.01];

//   const playNextAnimation = index => {
//     if (index >= animations.length) {
//       console.log('All animations finished');
//       setAnimationStarted(false);
//       return; // All animations have been played
//     }

//     setAnimationStarted(true);
//     const duration = animations[index];
//     const startTime = Date.now();

//     const animate = () => {
//       const elapsedTime = (Date.now() - startTime) / 1000;
//       const currentProgress = elapsedTime / duration;
//       setProgress(currentProgress);
//       if (elapsedTime < duration) {
//         animationFrameRef.current = requestAnimationFrame(animate);
//       } else {
//         setProgress(1);
//         setCompletedAnimations(prev => [...prev, index]);
//         setProgress(0);
//         setCurrentIndex(index + 1);
//         playNextAnimation(index + 1); // Optional delay before the next animation starts
//       }
//     };

//     requestAnimationFrame(animate);
//   };

//   useEffect(() => {
//     playNextAnimation(0);

//     return () => {
//       if (animationFrameRef.current) {
//         cancelAnimationFrame(animationFrameRef.current);
//       }
//     };
//   }, []);

//   const renderedSVGs = useMemo(() => {
//     return svgs.map((svg, index) => {
//       const {width, height, viewBox, translateX, ...otherProps} = svg.attr;
//       const pathLength = new svgPathProperties(svg.path).getTotalLength();
//       const dashOffset =
//         index === currentIndex ? pathLength * progress * -1 : 0;
//       const isCompleted = completedAnimations.includes(index);
//       return (
//         <Svg
//           key={index}
//           width={width}
//           height={height}
//           viewBox={viewBox}
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//           translateX={translateX}
//           style={{zIndex: svg.type === 'curve' ? 1 : 0}}
//           {...otherProps}>
//           <Path
//             d={svg.path}
//             stroke={'white'}
//             strokeWidth="7"
//             strokeLinecap="round"
//           />
//           <Path
//             d={svg.path}
//             stroke={isCompleted || index < currentIndex ? 'white' : 'gray'}
//             strokeWidth="7"
//             strokeLinecap="round"
//             strokeDasharray={pathLength}
//             strokeDashoffset={dashOffset}
//           />
//         </Svg>
//       );
//     });
//   }, [svgs, progress, currentIndex, completedAnimations]);

//   const generateSVG = () => {
//     const str = 'Airplane';
//     const letters = generateLetterToSVG(str);
//     console.log(letters);
//   };

//   return (
//     <View>
//       <Pressable
//         // disabled={animationStarted}
//         // onPress={() => {
//         //   setCompletedAnimations([]);
//         //   setProgress(0);
//         //   setCurrentIndex(0);
//         //   playNextAnimation(0);
//         // }}
//         onPress={generateSVG}
//         style={{
//           width: 120,
//           padding: 16,
//           borderRadius: 6,
//           backgroundColor: 'blue',
//           marginBottom: 20,
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}>
//         <Text style={{fontSize: 16, color: 'white'}}>Replay</Text>
//       </Pressable>
//       <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
//         {renderedSVGs}
//       </View>
//     </View>
//   );
// });

// second version with scaling svgs
// const RenderSVG = React.memo(({segments}) => {
//   const animationFrameRef = useRef(null);
//   const [progress, setProgress] = useState(0);
//   const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0);
//   const [currentSvgIndex, setCurrentSvgIndex] = useState(0);
//   const [completedAnimations, setCompletedAnimations] = useState([]);

//   const playNextAnimation = (segmentIndex, svgIndex) => {
//     if (segmentIndex >= segments.length) {
//       console.log('All animations finished');
//       return; // All animations have been played
//     }

//     const segment = segments[segmentIndex];
//     const svg = segment.svgs[svgIndex];
//     const duration = svg.duration || 3; // Define the duration for each SVG animation

//     const startTime = Date.now();

//     const animate = () => {
//       const elapsedTime = (Date.now() - startTime) / 1000;
//       const currentProgress = elapsedTime / duration;
//       setProgress(currentProgress);

//       if (elapsedTime < duration) {
//         animationFrameRef.current = requestAnimationFrame(animate);
//       } else {
//         setProgress(1);
//         setCompletedAnimations(prev => [
//           ...prev,
//           `${segmentIndex}-${svgIndex}`,
//         ]);

//         // setTimeout(() => {
//         setProgress(0);

//         if (svgIndex < segment.svgs.length - 1) {
//           setCurrentSvgIndex(svgIndex + 1);
//           playNextAnimation(segmentIndex, svgIndex + 1);
//         } else {
//           setCurrentSegmentIndex(segmentIndex + 1);
//           setCurrentSvgIndex(0);
//           playNextAnimation(segmentIndex + 1, 0);
//         }
//         // }, 100); // Optional delay before the next animation starts
//       }
//     };

//     requestAnimationFrame(animate);
//   };

//   useEffect(() => {
//     segments.length > 0 && playNextAnimation(0, 0);

//     return () => {
//       if (animationFrameRef.current) {
//         cancelAnimationFrame(animationFrameRef.current);
//       }
//     };
//   }, [segments]);

//   const renderedSegments = useMemo(() => {
//     return segments.map((segment, segmentIndex) => {
//       const previousSegments = segments.slice(0, segmentIndex);
//       const translationX = previousSegments.reduce((acc, currSegment) => {
//         return (
//           acc +
//           (currSegment.svgs.length > 0
//             ? currSegment.svgs[currSegment.svgs.length - 1].attr.translateX
//             : 0)
//         );
//       }, 0);

//       return (
//         <View
//           key={segmentIndex}
//           style={{flexDirection: 'row', alignItems: 'flex-end'}}>
//           {segment.svgs.map((svg, index) => {
//             const {width, height, viewBox, translateX, ...otherProps} =
//               svg.attr;
//             const pathLength = new svgPathProperties(svg.path).getTotalLength();
//             const dashOffset =
//               `${segmentIndex}-${index}` ===
//               `${currentSegmentIndex}-${currentSvgIndex}`
//                 ? pathLength * progress * -1
//                 : 0;
//             const isCompleted = completedAnimations.includes(
//               `${segmentIndex}-${index}`,
//             );

//             const effectiveTranslateX = (translateX || 0) + translationX;

//             return (
//               <Svg
//                 key={index}
//                 width={width}
//                 height={height}
//                 viewBox={viewBox}
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//                 translateX={effectiveTranslateX}
//                 style={{zIndex: svg.type === 'curve' ? 1 : 0}}
//                 {...otherProps}>
//                 <Path
//                   d={svg.path}
//                   stroke={'white'}
//                   strokeWidth="8"
//                   strokeLinecap="round"
//                 />
//                 <Path
//                   d={svg.path}
//                   stroke={isCompleted ? 'white' : 'gray'}
//                   strokeWidth="8"
//                   strokeLinecap="round"
//                   strokeDasharray={pathLength}
//                   strokeDashoffset={dashOffset}
//                 />
//               </Svg>
//             );
//           })}
//         </View>
//       );
//     });
//   }, [
//     segments,
//     progress,
//     currentSegmentIndex,
//     currentSvgIndex,
//     completedAnimations,
//   ]);

//   return (
//     <View
//       style={{
//         flex: 1,
//         flexDirection: 'row',
//       }}>
//       {renderedSegments}
//     </View>
//   );
// });

// third version with scaling svgs

const STROKE_WIDTH = 8;
const RenderSVG = React.memo(({segments, scale = 1.25}) => {
  const animationFrameRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0);
  const [currentSvgIndex, setCurrentSvgIndex] = useState(0);
  const [completedAnimations, setCompletedAnimations] = useState([]);

  const playNextAnimation = (segmentIndex, svgIndex) => {
    if (segmentIndex >= segments.length) {
      console.log('All animations finished');
      return; // All animations have been played
    }

    const segment = segments[segmentIndex];
    const svg = segment.svgs[svgIndex];
    const duration = svg.duration || 3; // Define the duration for each SVG animation

    const startTime = Date.now();

    const animate = () => {
      const elapsedTime = (Date.now() - startTime) / 1000;
      const currentProgress = elapsedTime / duration;
      setProgress(currentProgress);

      if (elapsedTime < duration) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        setProgress(1);
        setCompletedAnimations(prev => [
          ...prev,
          `${segmentIndex}-${svgIndex}`,
        ]);

        // setTimeout(() => {
        setProgress(0);

        if (svgIndex < segment.svgs.length - 1) {
          setCurrentSvgIndex(svgIndex + 1);
          playNextAnimation(segmentIndex, svgIndex + 1);
        } else {
          setCurrentSegmentIndex(segmentIndex + 1);
          setCurrentSvgIndex(0);
          playNextAnimation(segmentIndex + 1, 0);
        }
        // }, 100); // Optional delay before the next animation starts
      }
    };

    requestAnimationFrame(animate);
  };

  useEffect(() => {
    // segments.length > 0 && playNextAnimation(0, 0);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [segments]);

  const renderedSegments = useMemo(() => {
    return segments.map((segment, segmentIndex) => {
      const previousSegments = segments.slice(0, segmentIndex);
      const translationX = previousSegments.reduce((acc, currSegment) => {
        return (
          acc +
          (currSegment.svgs.length > 0
            ? currSegment.svgs[currSegment.svgs.length - 1].letter
              ? 0
              : currSegment.svgs[currSegment.svgs.length - 1].attr.translateX *
                scale
            : 0)
        );
      }, 0);

      return (
        <View
          // onLayout={handleLayout}
          key={segmentIndex}
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            // borderWidth: StyleSheet.hairlineWidth,
            // borderColor: 'white',
          }}>
          {segment.svgs.map((svg, index) => {
            const {
              width,
              height,
              viewBox,
              translateX,
              translateY,
              ...otherProps
            } = svg.attr;
            const scaledWidth = width * scale;
            const scaledHeight = height * scale;
            const pathLength = new svgPathProperties(svg.path).getTotalLength();
            const dashOffset =
              `${segmentIndex}-${index}` ===
              `${currentSegmentIndex}-${currentSvgIndex}`
                ? pathLength * progress * -1
                : 0;
            const isCompleted = completedAnimations.includes(
              `${segmentIndex}-${index}`,
            );

            let effectiveTranslateX = (translateX || 0) * scale + translationX;

            let effectiveTranslateY = translateY * scale;

            console.log('effectiveTraslateX', effectiveTranslateX);

            return (
              <Svg
                key={index}
                width={scaledWidth}
                height={scaledHeight}
                viewBox={viewBox}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                translateX={effectiveTranslateX}
                translateY={effectiveTranslateY}
                // style={{zIndex: svg.type === 'curve' ? 1 : 0}}
                {...otherProps}>
                <Path
                  d={svg.path}
                  stroke={'white'}
                  // stroke={'gray'}
                  strokeWidth={STROKE_WIDTH}
                  strokeLinecap="round"
                />
                <Path
                  d={svg.path}
                  stroke={isCompleted ? 'white' : 'gray'}
                  // stroke={'gray'}
                  strokeWidth={STROKE_WIDTH}
                  strokeLinecap="round"
                  strokeDasharray={pathLength}
                  strokeDashoffset={dashOffset}
                />
              </Svg>
            );
          })}
        </View>
      );
    });
  }, [
    segments,
    progress,
    currentSegmentIndex,
    currentSvgIndex,
    completedAnimations,
  ]);

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
      }}>
      {renderedSegments}
    </View>
  );
});

export default AnimationComponent;
