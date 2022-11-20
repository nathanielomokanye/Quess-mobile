import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { useFormikContext } from 'formik';
import { Feather } from '@expo/vector-icons';

import ErrorMessage from './ErrorMessage';
import { AppText } from '../AppText';
import colors from '../../config/colors';

export default function HiddenFormField ({ name, title, ...otherProps }) {
  const [secureText, setSecureText] = useState(true);
  const [icon, setIcon] = useState('eye-off');
  const { setFieldTouched, handleChange, errors, touched } = useFormikContext();

  const onPress = () => {
    if (icon === 'eye-off') {
      setIcon('eye');
    } else {
      setIcon('eye-off');
    }
  };
  const handleOnPress = () => {
    if (secureText === true) {
      setSecureText(false);
    } else {
      setSecureText(true);
    }
  };

  return (
    <View style={styles.container}>
      <AppText style={{ marginBottom: 10 }}>{title}</AppText>
      <View style={{ backgroundColor: colors.white, borderRadius: 10 }}>
        <View style={styles.inputFieldContainer}>
          <TextInput
            style={styles.inputField}
            onBlur={() => setFieldTouched(name)}
            onChangeText={handleChange(name)}
            placeholderTextColor='#a1a1a1'
            secureTextEntry={secureText}
            {...otherProps}
          />
          <Pressable
            style={{ padding: 5 }}
            onPress={() => {
              onPress();
              handleOnPress();
            }}
          >
            <Feather name={icon} size={24} color='#5f6368' />
          </Pressable>
        </View>
      </View>
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: 30
  },
  inputField: {
    backgroundColor: colors.white,
    width: '100%',
    marginLeft: 3,
    paddingVertical: 10,
    borderRadius: 9,
    paddingHorizontal: 15
  },
  inputFieldContainer: {
    flexDirection: 'row',
    width: '90%',
    alignItems: 'center'
  }
});
