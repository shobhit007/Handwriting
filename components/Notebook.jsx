import React from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';

const {width, height} = Dimensions.get('window');
// "M43.9931 2C40.5151 6.28713 40.544 14.355 39.3789 19.3337C36.649 30.9988 38.4668 44.5623 38.7197 56.4085C38.9464 67.0279 45.9936 84.2712 57.1765 90.8352C64.5094 95.1394 70.9266 99.3502 80.3206 100.585C83.9144 101.058 90.4396 102.928 94.09 101.428C96.8151 100.308 98.859 98.4187 102 98.4187M2 19.3337H80.3206"
const Notebook = ({lines, gap, children}) => {
  return (
    <View style={styles.row}>
      {Array.from({length: lines}, (_, i) => {
        return (
          <View
            key={i}
            style={{
              width: width,
              borderWidth: StyleSheet.hairlineWidth,
              borderColor: 'red',
              marginTop: i > 0 ? gap : 0,
            }}></View>
        );
      })}
      {children}
    </View>
  );
};

export default Notebook;

const styles = StyleSheet.create({
  row: {
    position: 'relative',
  },
});
