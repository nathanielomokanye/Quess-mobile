import { StyleSheet, TextInput, View } from 'react-native';
import React from 'react';
import { useFormikContext } from 'formik';

import ErrorMessage from './ErrorMessage';
import { AppText } from '../AppText';
import colors from '../../config/colors';

export default function AppFormField ({ name, title, ...otherProps }) {
  const { setFieldTouched, handleChange, errors, touched } = useFormikContext();

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputField}
        onBlur={() => setFieldTouched(name)}
        onChangeText={handleChange(name)}
        placeholder={title}
        placeholderTextColor='#a1a1a1'
        {...otherProps}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </View>
  );
}

const styles = StyleSheet.create({
  inputField: {
    backgroundColor: colors.grey,
    width: '100%',
    marginLeft: 3,
    paddingVertical: 13,
    borderRadius: 9,
    paddingHorizontal: 15
  },
  container: {
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: 30
  }
});
