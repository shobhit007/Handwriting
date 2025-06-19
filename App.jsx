import {View, StyleSheet} from 'react-native';
import Animation from './components/Animation';

const App = () => {
  return (
    <View style={styles.container}>
      <Animation word={'e'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
