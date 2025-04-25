import React, {useEffect, useRef, useState, useMemo} from 'react';
import {
  View,
  Animated,
  Text,
  PanResponder,
  Dimensions,
  Image,
} from 'react-native';
import {Path, Svg} from 'react-native-svg';
import {svgPathProperties} from 'svg-path-properties';
import {audioData, generateLetterToSVG} from '../utils/feature';
import {AlphabetLetters} from '../utils/letters';
import {Audio} from 'expo-av';
import Pencil from './Pencil';
import {formationAudios} from '../utils/formationAudios';

const {width: windowScreen} = Dimensions.get('window');

const generateSVGs = letters => {
  let generatedLetters = generateLetterToSVG(letters);
  // generatedLetters = [{letter: 'i', svgs: [{type: 'i.right'}]}];
  console.log('letters', generatedLetters);
  generatedLetters.forEach(item => console.log(item.svgs));

  const svgSegments = generatedLetters.map(l => l.svgs).flat();
  let index = 0;

  let generatedSegments = [];
  for (let i = 0; i < generatedLetters.length; i++) {
    const currentLetter = generatedLetters[i];
    const letter = currentLetter.letter;
    const letterSvgs = currentLetter.svgs;
    console.log('letterSvgs', letterSvgs);
    let segment;

    for (let j = 0; j < letterSvgs.length; j++) {
      const currentLetter = svgSegments[index].type;
      const previousLetter = svgSegments[index - 1]?.type;
      const alphabetLetter = AlphabetLetters[currentLetter];
      segment = alphabetLetter
        ? JSON.parse(JSON.stringify(alphabetLetter))
        : null;

      const previousSegment = previousLetter
        ? JSON.parse(JSON.stringify(AlphabetLetters[previousLetter]))
        : null;

      if (segment) {
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
                translateX: svg.attr.translateX,
              },
            };
          });
          segment = {svgs};
        } else if (previousLetter && currentLetter.includes('b.asc.alt')) {
          console.log('b.asc.alt');
          if (previousSegment) {
            const svgs = segment.svgs.map(svg => {
              return {
                ...svg,
                attr: {
                  ...svg.attr,
                  translateX: svg.attr.translateX - 25,
                },
              };
            });
            segment = {svgs};
          }
        } else if (
          previousLetter &&
          (previousLetter === 'a.rs.alt' ||
            previousLetter === 'z.rs.alt' ||
            previousLetter === 'q.rs.alt') &&
          (currentLetter === 'r.alt' || currentLetter === 's.alt')
        ) {
          const svgs = segment.svgs.map(svg => {
            return {
              ...svg,
              attr: {
                ...svg.attr,
                translateX: svg.attr.translateX - 10,
              },
            };
          });
          segment = {svgs};
        } else if (currentLetter === 'j.alt' || currentLetter === 'j.right') {
          const svgs = segment.svgs.map(svg => {
            return {
              ...svg,
              attr: {
                ...svg.attr,
                translateX: svg.attr.translateX - 30,
              },
            };
          });
          segment = {svgs};
        } else if (
          previousLetter &&
          (currentLetter === 'h.alt' ||
            currentLetter === 'h.right' ||
            currentLetter === 'k.alt' ||
            currentLetter === 'k.right')
        ) {
          console.log('h.alt || k.right');
          const svgs = segment.svgs.map(svg => {
            return {
              ...svg,
              attr: {
                ...svg.attr,
                translateX: svg.attr.translateX - 22,
              },
            };
          });
          segment = {svgs};
        } else if (currentLetter === 'x.alt' || currentLetter === 'x.right') {
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
        } else if (previousLetter === 'i.alt' || previousLetter === 'i.left') {
          console.log('i.alt');
          const svgs = segment.svgs.map(svg => {
            return {
              ...svg,
              attr: {
                ...svg.attr,
                translateX: svg.attr.translateX - 22,
              },
            };
          });
          segment = {svgs};
        } else if (
          previousLetter &&
          previousLetter === 'o.o.alt' &&
          (currentLetter === 'o.alt' || currentLetter === 'o.right')
        ) {
          console.log('o.o.alt');
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
        } else if (
          previousLetter &&
          previousLetter === 'z.o.alt' &&
          (currentLetter === 'o.alt' || currentLetter === 'o.right')
        ) {
          console.log('z.o.alt');
          const svgs = segment.svgs.map(svg => {
            return {
              ...svg,
              attr: {
                ...svg.attr,
                translateX: svg.attr.translateX - 15,
              },
            };
          });
          segment = {svgs};
        } else if (
          previousLetter &&
          (currentLetter === 'o.alt' || currentLetter === 'o.right')
        ) {
          console.log('o.alt');
          const svgs = segment.svgs.map(svg => {
            return {
              ...svg,
              attr: {
                ...svg.attr,
                translateX: svg.attr.translateX - 10,
              },
            };
          });
          segment = {svgs};
        } else if (
          previousLetter &&
          (currentLetter === 'z.alt' || currentLetter === 'z.right')
        ) {
          console.log('z.alt');
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
        } else if (
          previousLetter &&
          (previousLetter === 'f.alt' ||
            previousLetter === 'f.left' ||
            // previousLetter === 'f.f.alt' ||
            previousLetter === 'f.f.left')
        ) {
          console.log('f.alt');
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
        } else if (
          previousLetter &&
          (currentLetter === 'f.alt' ||
            currentLetter === 'f.right' ||
            currentLetter === 'f.f.alt')
        ) {
          console.log('f.right || f.alt');
          const svgs = segment.svgs.map(svg => {
            return {
              ...svg,
              attr: {
                ...svg.attr,
                translateX: svg.attr.translateX - 40.5,
              },
            };
          });
          segment = {svgs};
        } else if (previousLetter && previousLetter === 'desc.x.alt') {
          console.log('desc.x.a');
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

        segment.letter = letter;
        segment.type = svgSegments[index].type;

        generatedSegments.push(segment);
      } else {
        console.log('Character or connection not found ', currentLetter);
      }

      // increase index
      index++;
    }
  }

  return generatedSegments;
};

const baselineChars = 'aceimnorsuvwx';
const AnimationComponent = () => {
  const [segments, setSegments] = useState([]);
  const [segmentAudios, setSegmentAudios] = useState(null);
  const [isAllBaselineChars, setIsAllBaselineChars] = useState(false);

  const inputLetters = 'qj';

  useEffect(() => {
    // Check if all input letters are in baselineChars
    const allBaseline = inputLetters
      .split('')
      .every(letter => baselineChars.includes(letter));
    setIsAllBaselineChars(allBaseline);
  }, [inputLetters]);

  useEffect(() => {
    // replace duration of segment animation with audio duration
    const setGeneratedSVGs = async () => {
      let generatedSegments = generateSVGs(inputLetters);
      const svgSegments = [];
      // for (let segment of generatedSegments) {
      //   const svgs = segment.svgs;
      //   const letter = segment.letter;
      //   const segments = [];
      //   for (let i = 0; i < svgs.length; i++) {
      //     const svg = svgs[i];
      //     const audioUri = formationAudios[letter][i];
      //     if (audioUri?.audio) {
      //       const sound = new Audio.Sound();
      //       try {
      //         await sound.loadAsync({uri: audioUri.audio});
      //         const status = await sound.getStatusAsync();
      //         const duration = status.durationMillis / 1000; // Convert to seconds
      //         console.log('duration', duration);

      //         segments.push({
      //           ...svg,
      //           duration,
      //           audio: audioUri.audio,
      //         });
      //       } catch (error) {
      //         console.error('Error loading audio:', error);
      //         segments.push({
      //           ...svg,
      //           audio: audioUri.audio,
      //         });
      //       } finally {
      //         await sound.unloadAsync(); // Unload the audio to free up resources
      //       }
      //     }
      //   }

      //   svgSegments.push({letter, type: segment.type, svgs: segments});
      // }

      // Update generatedSegments with the modified svgSegments
      // generatedSegments = svgSegments;

      setSegments(generatedSegments);
    };

    setGeneratedSVGs();
  }, [formationAudios, inputLetters]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderColor: 'white',
          position: 'relative',
        }}>
        <RenderSVG segments={segments} />
        {/* Middle line */}
        <View
          style={{
            position: 'absolute',
            width: '100%',
            top: isAllBaselineChars ? '-64%' : '47%',
            borderTopWidth: 1,
            borderColor: 'white',
          }}></View>

        {/* Bottom line */}
        <View
          style={{
            position: 'absolute',
            width: '100%',
            bottom: isAllBaselineChars ? '-64%' : '-45%',
            borderTopWidth: 1,
            borderColor: 'white',
            zIndex: 0,
          }}></View>
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

// const playNextAnimation = (segmentIndex, svgIndex) => {
//   if (segmentIndex >= segments.length) {
//     console.log('All animations finished');
//     return; // All animations have been played
//   }

//   const segment = segments[segmentIndex];
//   const svg = segment.svgs[svgIndex];
//   const duration = svg.duration || 3; // Define the duration for each SVG animation

//   const startTime = Date.now();

//   const animate = () => {
//     const elapsedTime = (Date.now() - startTime) / 1000;
//     const currentProgress = elapsedTime / duration;
//     setProgress(currentProgress);

//     if (elapsedTime < duration) {
//       animationFrameRef.current = requestAnimationFrame(animate);
//     } else {
//       setProgress(1);
//       setCompletedAnimations(prev => [
//         ...prev,
//         `${segmentIndex}-${svgIndex}`,
//       ]);

//       // setTimeout(() => {
//       setProgress(0);

//       if (svgIndex < segment.svgs.length - 1) {
//         setCurrentSvgIndex(svgIndex + 1);
//         playNextAnimation(segmentIndex, svgIndex + 1);
//       } else {
//         setCurrentSegmentIndex(segmentIndex + 1);
//         setCurrentSvgIndex(0);
//         playNextAnimation(segmentIndex + 1, 0);
//       }
//       // }, 100); // Optional delay before the next animation starts
//     }
//   };

//   requestAnimationFrame(animate);
// };

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
const RenderSVG = React.memo(({segments, scale = 1.7}) => {
  const animationFrameRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0);
  const [currentSvgIndex, setCurrentSvgIndex] = useState(0);
  const [completedAnimations, setCompletedAnimations] = useState([]);
  const [coords, setCoords] = useState({x: 0, y: 0});

  // only with audio
  // const playNextAnimation = (segmentIndex, svgIndex) => {
  //   if (segmentIndex >= segments.length) {
  //     console.log('All animations finished');
  //     return; // All animations have been played
  //   }

  //   const segment = segments[segmentIndex];
  //   const svg = segment.svgs[svgIndex];
  //   const audio = new Audio.Sound();
  //   const duration = svg.duration; // Define the duration for each SVG animation

  //   const startAnimation = () => {
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
  //         // Wait for audio to finish before moving to the next animation
  //         audio.stopAsync().then(() => {
  //           setProgress(0);
  //           if (svgIndex < segment.svgs.length - 1) {
  //             setCurrentSvgIndex(svgIndex + 1);
  //             playNextAnimation(segmentIndex, svgIndex + 1);
  //           } else {
  //             setCurrentSegmentIndex(segmentIndex + 1);
  //             setCurrentSvgIndex(0);
  //             playNextAnimation(segmentIndex + 1, 0);
  //           }
  //         });
  //       }
  //     };
  //     requestAnimationFrame(animate);
  //   };

  //   console.log('audio', svg.audio);

  //   if (svg.audio) {
  //     audio
  //       .loadAsync({uri: svg.audio})
  //       .then(() => {
  //         audio.playAsync().then(() => {
  //           startAnimation();
  //         });
  //       })
  //       .catch(error => {
  //         console.error('Error loading audio:', error);
  //         startAnimation(); // Start animation even if audio fails to load
  //       });
  //   }

  //   return () => {
  //     if (animationFrameRef.current) {
  //       cancelAnimationFrame(animationFrameRef.current);
  //     }
  //     audio.unloadAsync(); // Clean up audio resources
  //   };
  // };

  const playNextAnimation = (segmentIndex, svgIndex) => {
    if (segmentIndex >= segments.length) {
      console.log('All animations finished');
      return; // All animations have been played
    }

    const segment = segments[segmentIndex];
    const svg = segment.svgs[svgIndex];
    const duration = svg.duration || 3; // Define the duration for each SVG animation
    const path = svg.path;
    const startTime = Date.now();

    const animate = () => {
      const elapsedTime = (Date.now() - startTime) / 1000;
      const currentProgress = elapsedTime / duration;
      const pathProperties = new svgPathProperties(path);
      const pathLength = pathProperties.getTotalLength();
      const pathPoint = pathProperties.getPointAtLength(
        pathLength * currentProgress,
      ); // Assuming progress is defined elsewhere
      setCoords({x: pathPoint.x * scale, y: pathPoint.y * scale}); // Apply scaling
      setProgress(currentProgress);

      if (elapsedTime < duration) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        setProgress(1);
        const endPoint = pathProperties.getPointAtLength(pathLength);
        setCoords({x: endPoint.x * scale, y: endPoint.y * scale});
        setCompletedAnimations(prev => [
          ...prev,
          `${segmentIndex}-${svgIndex}`,
        ]);

        setTimeout(() => {
          setProgress(0);

          if (svgIndex < segment.svgs.length - 1) {
            setCurrentSvgIndex(svgIndex + 1);
            playNextAnimation(segmentIndex, svgIndex + 1);
          } else {
            setCurrentSegmentIndex(segmentIndex + 1);
            setCurrentSvgIndex(0);
            playNextAnimation(segmentIndex + 1, 0);
          }
        }, 500); // Optional delay before the next animation starts
      }
    };

    requestAnimationFrame(animate);
  };

  // audio plus pause
  // const playNextAnimation = (segmentIndex, svgIndex) => {
  //   if (segmentIndex >= segments.length) {
  //     console.log('All animations finished');
  //     return; // All animations have been played
  //   }

  //   const segment = segments[segmentIndex];
  //   const svg = segment.svgs[svgIndex];
  //   const audio = new Audio.Sound();
  //   const duration = svg.duration; // Define the duration for each SVG animation

  //   const startAnimation = () => {
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
  //         // Wait for audio to finish before moving to the next animation
  //         audio.stopAsync().then(() => {
  //           setProgress(0);
  //           setTimeout(() => {
  //             if (svgIndex < segment.svgs.length - 1) {
  //               setCurrentSvgIndex(svgIndex + 1);
  //               playNextAnimation(segmentIndex, svgIndex + 1);
  //             } else {
  //               setCurrentSegmentIndex(segmentIndex + 1);
  //               setCurrentSvgIndex(0);
  //               playNextAnimation(segmentIndex + 1, 0);
  //             }
  //           }, 1000);
  //         });
  //       }
  //     };
  //     requestAnimationFrame(animate);
  //   };

  //   audio
  //     .loadAsync({uri: svg.audio})
  //     .then(() => {
  //       audio.playAsync().then(() => {
  //         startAnimation();
  //       });
  //     })
  //     .catch(error => {
  //       console.error('Error loading audio:', error);
  //       startAnimation(); // Start animation even if audio fails to load
  //     });

  //   return () => {
  //     if (animationFrameRef.current) {
  //       cancelAnimationFrame(animationFrameRef.current);
  //     }
  //     audio.unloadAsync(); // Clean up audio resources
  //   };
  // };

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
          key={segmentIndex}
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            position: 'relative',
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

            // if (svg.dot) {
            //   const indexOfI = segments.findIndex(s => s.letter === 'i');

            //   // Check if 'i' is the first letter
            //   let x = segments
            //     .slice(indexOfI, segments.length - 1)
            //     .reduce((acc, seg) => {
            //       let xPos = 0;
            //       for (let i = 0; i < seg.svgs.length; i++) {
            //         xPos += seg.svgs[i].attr.translateX;
            //       }
            //       return (acc += xPos);
            //     }, 0);

            //   effectiveTranslateX += x; // Combine the translations instead of overriding
            //   console.log('effX', effectiveTranslateX, segment.type);
            // }

            let effectiveTranslateY = translateY * scale;

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
                style={{zIndex: index === currentSvgIndex ? 10 : 1}}
                {...otherProps}>
                <Path
                  d={svg.path}
                  stroke={'white'}
                  strokeWidth={STROKE_WIDTH}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Path
                  d={svg.path}
                  stroke={isCompleted ? 'white' : 'gray'}
                  strokeWidth={STROKE_WIDTH}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray={pathLength}
                  strokeDashoffset={dashOffset}
                />
                {/* Add a circle that follows the current SVG path */}
                {/* {index === currentSvgIndex && (
                  <Animated.Image
                    source={require('./pencil.png')}
                    style={{
                      width: 36,
                      height: 36,
                      position: 'absolute',
                      left: coords.x - 20, // Adjust to center the image
                      top: coords.y - 18, // Adjust to center the image
                      transform: [{translateX: 0}, {translateY: 0}],
                    }}
                  />
                )} */}
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
    coords,
  ]);

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 1,
        transform: [{translateX: windowScreen * 0.2}],
      }}>
      {renderedSegments}
    </View>
  );
});

export default AnimationComponent;
