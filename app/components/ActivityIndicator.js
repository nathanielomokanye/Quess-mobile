import React from 'react';
import LottieView from 'lottie-react-native';
import colors from '../config/colors';

export default function ActivityIndicator ({ visible = false }) {
  if (!visible) return null;

  return (
    <LottieView
      style={{ zIndex: 1, backgroundColor: colors.backgroundColor }}
      autoPlay
      loop
      source={require('../assets/loader.json')}
    />
  );
}
