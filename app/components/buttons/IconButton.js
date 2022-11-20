import { StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { Feather } from '@expo/vector-icons';
import colors from '../../config/colors';
import { AppText } from '../AppText';

export default function IconButton ({ icon, color, title, handleOnPress }) {
  return (
    <Pressable onPress={handleOnPress} style={styles.container}>
      <Feather name={icon} size={24} color={colors[color]} />
      <AppText style={{ marginLeft: 5, color: colors[color] }}>{title}</AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});
