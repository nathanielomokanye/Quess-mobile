import { StyleSheet, View } from 'react-native';
import React from 'react';
import * as yup from 'yup';

import Screen from '../components/Screen';
import { AppForm, AppFormField, SubmitButton } from '../components/forms';

const validationSchema = yup.object().shape({
  password: yup
    .string()
    .required('This field is required'),
  confirmPassword: yup
    .string()
    .required('This field is required')
    .oneOf([yup.ref('password'), null], 'Passwords must match')
});

export default function EditCardScreen () {
  const handleOnSubmit = ({ password, confirmPassword }) => {
    console.log({
      password: password,
      confirmPassword: confirmPassword
    });
  };

  return (
    <Screen style={styles.container}>
      <AppForm
        initialValues={{ password: '', confirmPassword: '' }}
        validationSchema={validationSchema}
        onSubmit={handleOnSubmit}
      >
        <View style={{ width: '90%' }}>
          <AppFormField
            title='Password'
            name='password'
            autoCapitalize='none'
          />
          <AppFormField
            title='Re-type Password'
            name='confirmPassword'
            autoCapitalize='none'
          />
        </View>
        <View style={{ width: '90%' }}>
          <SubmitButton title='Update' />
        </View>
      </AppForm>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  }
});
