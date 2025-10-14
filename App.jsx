import {View, StyleSheet} from 'react-native';
import Animation from './components/Animation';
import WelcomeScreen from './components/Welcome';
import DashboardScreen from './components/Dashboard';

const App = () => {
  return (
    <View style={styles.container}>
      <Animation word={'obb'} />
      {/* <DashboardScreen /> */}
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
