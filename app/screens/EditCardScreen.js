import { StyleSheet, View } from 'react-native';
import React from 'react';
import * as yup from 'yup';

import Screen from '../components/Screen';
import { AppForm, AppFormField, SubmitButton } from '../components/forms';
import { AppButton } from '../components/buttons';

const validationSchema = yup.object().shape({
  accountName: yup
    .string()
    .required('This field is required'),
  accountNumber: yup
    .string()
    .required('This field is required')
    .min(10, 'Please enter a valid account number')
    .max(10, 'Please enter a valid account number'),
  dateOfBirth: yup
    .string()
    .required('This field is required')
});

export default function EditCardScreen () {
  const handleOnSubmit = ({ accountName, accountNumber, dateOfBirth }) => {
    console.log({
      accountName: accountName,
      accountNumber: accountNumber,
      dateOfBirth: dateOfBirth
    });
  };

  return (
    <Screen style={styles.container}>
      <AppForm
        initialValues={{ accountName: '', accountNumber: '', dateOfBirth: '' }}
        validationSchema={validationSchema}
        onSubmit={handleOnSubmit}
      >
        <View style={{ width: '90%' }}>
          <AppFormField
            title='Account Name'
            name='accountName'
            autoCapitalize='words'
          />
          <AppFormField
            title='Account Number'
            name='accountNumber'
            keyboardType='number-pad'
          />
        </View>
        <View style={{ width: '60%', alignSelf: 'flex-start', marginLeft: 20 }}>
          <AppFormField
            title='Date of Birth'
            name='dateOfBirth'
          />
        </View>
        <View style={{ width: '90%' }}>
          <SubmitButton title='Save Bank' />
        </View>
      </AppForm>
      <View style={{ width: '90%', marginTop: 30 }}>
        <AppButton title='Delete Bank' color='red' />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  }
});
