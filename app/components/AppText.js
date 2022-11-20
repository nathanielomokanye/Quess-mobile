/** The Text Component.
 * @param children {string}
 * @param style {object}
 * @param otherProps
 */

import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';

export const AppText = ({ children, style, ...props }) => {
  const [loaded] = useFonts({
    Poppins: require('../assets/fonts/Poppins-Medium.ttf'),
    PoppinsBold: require('../assets/fonts/Poppins-Bold.ttf')
  });

  if (!loaded) {
    return null;
  }
  return (
    <Text {...props} style={[styles.text, style]}>
      {children}
    </Text>
  );
};
// Bold Text
AppText.Bold = ({ style, ...props }) => (
  <AppText {...props} style={[style, styles.title]} />
);

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    fontFamily: 'Poppins',
    includeFontPadding: false
  },
  title: {
    fontSize: 17,
    fontFamily: 'PoppinsBold'
  }
});
