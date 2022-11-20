import { Alert, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import * as yup from 'yup';

import Screen from '../components/Screen';
import { AppForm, AppFormField, SubmitButton } from '../components/forms';
import auth from '../api/auth';
import ActivityIndicator from '../components/ActivityIndicator';

const validationSchema = yup.object().shape({
  bankName: yup
    .string()
    .required('This field is required'),
  accountNumber: yup
    .string()
    .required('This field is required')
    .min(10, 'Please enter a valid account number')
    .max(10, 'Please enter a valid account number'),
  dateOfBirth: yup
    .date()
    .required('This field is required')
});

export default function EditCardScreen () {
  const [loading, setLoading] = useState(false);
  const handleOnSubmit = async ({ bankName, accountNumber, dateOfBirth }) => {
    setLoading(true);
    const result = await auth.createAccount(accountNumber, bankName, dateOfBirth);
    if (!result.ok) return (setLoading(false), Alert.alert('An error has occurred'));
    Alert.alert('Success!');
    setLoading(false);
  };

  return (
    <Screen style={styles.container}>
      {loading && <ActivityIndicator visible={loading} />}
      <AppForm
        initialValues={{ bankName: '', accountNumber: '', dateOfBirth: '' }}
        validationSchema={validationSchema}
        onSubmit={handleOnSubmit}
      >
        <View style={{ width: '90%' }}>
          <AppFormField
            title='Bank Name'
            name='bankName'
            autoCapitalize='words'
          />
          <AppFormField
            title='Account Number'
            name='accountNumber'
            autoCapitalize='none'
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
          <SubmitButton title='Add Bank' />
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
