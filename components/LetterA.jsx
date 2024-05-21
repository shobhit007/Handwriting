import React, {useEffect, useRef, useState} from 'react';

import {
  PanResponder,
  Animated,
  Text,
  View,
  Pressable,
  ScrollView,
} from 'react-native';
import LettersPathData from './LettersPaths.json';
import LetterPathViewLines from './LetterPathViewLines';
import LetterAnimation from './LetterAnimation';

// const letterPath =
//   'M2 30C4.62368 29.672 5.34896 19.2609 7.55556 18C9.76984 16.7347 9.09393 13.4616 10.7778 11.7778C12.6416 9.91394 14.2258 7.56069 15.9444 5.55556C18.8993 2.10827 23.5513 1.73831 28 2C30.9135 2.17138 30 14.6152 30 17C30 24.2146 13.3763 32.5672 11.0556 24.4444C10.0529 20.9352 10.2625 13.0686 11.0556 9.5C12.3416 3.71274 21.3548 5 25.5 5C27.5834 5 30.4435 4.48386 32.4444 5.05556C33.7242 5.4212 33 11.6315 33 13C33 18.533 32.4629 22.9584 30.2222 28C28.3483 32.2162 28.7431 36.4625 26.5 40.5C25.833 41.7006 25.0716 45.783 25 47C24.8203 50.0549 22.8663 51.0406 21.5 53.5C20.2661 55.7211 17.8365 55 15.5 55C12.1442 55 13 52.8082 13 50C13 43.5016 14.2444 41.3601 17.2222 36C19.5391 31.8295 26.1484 27.362 30 25.2222C34.7676 22.5735 40.5642 23.2179 45 21';

const LetterA = ({top = 0, left = 0}) => {
  const [pathData, setPathData] = useState(LettersPathData);
  const [showLines, setShowLines] = useState(true);
  const [selectedLetter, setSelectedLetter] = useState(null);

  useEffect(() => {
    if (pathData) {
      const initialLetter = pathData[0];
      setSelectedLetter(initialLetter);
    }
  }, [pathData]);

  return (
    <React.Fragment>
      <View
        style={{
          flexDirection: 'row',
          marginBottom: 50,
          gap: 16,
          marginTop: 20,
        }}>
        <Pressable
          onPress={() => setShowLines(false)}
          style={{
            backgroundColor: 'blue',
            paddingHorizontal: 25,
            paddingVertical: 12,
          }}>
          <Text style={{color: 'white'}}>2-line</Text>
        </Pressable>
        <Pressable
          onPress={() => setShowLines(true)}
          style={{
            backgroundColor: 'blue',
            paddingHorizontal: 25,
            paddingVertical: 12,
          }}>
          <Text style={{color: 'white'}}>4-line</Text>
        </Pressable>
      </View>
      {/* {selectedLetter && (
        <LetterPathViewLines
          showLines={showLines}
          selectedLetter={selectedLetter}
        />
      )} */}
      {selectedLetter && (
        <LetterAnimation
          selectedLetter={selectedLetter}
          showLines={showLines}
        />
      )}
      <ScrollView
        horizontal
        contentContainerStyle={{gap: 20, paddingHorizontal: 20}}>
        {pathData?.map(item => {
          return (
            <View key={item?.letter}>
              <Pressable
                onPress={() => {
                  setSelectedLetter(item);
                }}
                style={{
                  backgroundColor: 'white',
                  paddingHorizontal: 20,
                  borderCurve: 20,
                }}>
                <Text style={{fontSize: 40, color: 'black'}}>
                  {item?.letter}
                </Text>
              </Pressable>
            </View>
          );
        })}
      </ScrollView>
    </React.Fragment>
  );
};

export default LetterA;
