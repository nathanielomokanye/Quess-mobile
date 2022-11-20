/**
 * @param name {string}
 * @param onPress {Function}
 * @param color {string}
 * @param textColor {string}
 * @param style {object}
 * @param otherProps
 */

import { StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';

import { AppText } from '../AppText';
import colors from '../../config/colors';

export default function AppButton ({
  title,
  onPress,
  color = 'primary',
  textColor = 'white',
  style,
  ...otherProps
}) {
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: colors[color] }, style]}
      onPress={onPress}
      {...otherProps}
    >
      <AppText style={{ color: colors[textColor] }}>{title}</AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    width: '100%',
    alignItems: 'center',
    borderRadius: 10
  }
});
