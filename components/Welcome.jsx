// WelcomeScreen.js
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Platform,
} from 'react-native';

const WelcomeScreen = ({navigation}) => {
  const handleGymOwnerPress = () => {
    console.log('Gym Owner selected');
    // Navigate to gym owner flow
    // navigation.navigate('GymOwnerOnboarding');
  };

  const handleClientPress = () => {
    console.log('Client selected');
    // Navigate to client flow
    // navigation.navigate('ClientOnboarding');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a2332" />

      <View style={styles.content}>
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Welcome to</Text>
          <Text style={styles.title}>FitTrack</Text>
          <Text style={styles.subtitle}>Choose your role to get started.</Text>
        </View>

        {/* Button Section */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={handleGymOwnerPress}
            activeOpacity={0.8}
            accessibilityLabel="Select Gym Owner role"
            accessibilityRole="button">
            <Text style={styles.primaryButtonText}>I am a Gym Owner</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={handleClientPress}
            activeOpacity={0.8}
            accessibilityLabel="Select Client role"
            accessibilityRole="button">
            <Text style={styles.secondaryButtonText}>I am a Client</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a2332',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  title: {
    fontSize: 48,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
    letterSpacing: -0.5,
    ...Platform.select({
      ios: {
        fontFamily: 'System',
      },
      android: {
        fontFamily: 'sans-serif',
        includeFontPadding: false,
      },
    }),
  },
  subtitle: {
    fontSize: 18,
    color: '#8b95a5',
    textAlign: 'center',
    marginTop: 16,
    letterSpacing: 0.2,
    ...Platform.select({
      android: {
        includeFontPadding: false,
      },
    }),
  },
  buttonContainer: {
    gap: 16,
  },
  button: {
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  primaryButton: {
    backgroundColor: '#2196F3',
  },
  secondaryButton: {
    backgroundColor: '#1e3a5f',
    borderWidth: 1,
    borderColor: '#2d4d73',
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    letterSpacing: 0.3,
    ...Platform.select({
      android: {
        includeFontPadding: false,
      },
    }),
  },
  secondaryButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#5a9fd4',
    letterSpacing: 0.3,
    ...Platform.select({
      android: {
        includeFontPadding: false,
      },
    }),
  },
});

export default WelcomeScreen;
