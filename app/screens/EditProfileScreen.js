import { StyleSheet, View } from 'react-native';
import React from 'react';
import * as yup from 'yup';

import Screen from '../components/Screen';
import { AppForm, AppFormField, SubmitButton } from '../components/forms';

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required('This field is required'),
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('This field is required')
});

export default function EditCardScreen () {
  const handleOnSubmit = ({ name, email }) => {
    console.log({
      name: name,
      email: email
    });
  };

  return (
    <Screen style={styles.container}>
      <AppForm
        initialValues={{ name: '', email: '' }}
        validationSchema={validationSchema}
        onSubmit={handleOnSubmit}
      >
        <View style={{ width: '90%' }}>
          <AppFormField
            title='Name'
            name='name'
            autoCapitalize='words'
          />
          <AppFormField
            title='Email'
            name='email'
            autoCapitalize='none'
            keyboardType='email-address'
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
