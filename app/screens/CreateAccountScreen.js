import { StyleSheet, View } from 'react-native';
import React, { useContext, useState } from 'react';
import * as yup from 'yup';

import Screen from '../components/Screen';
import { AppForm, AppFormField, SubmitButton, ErrorMessage } from '../components/forms';
import auth from '../api/auth';
import AuthContext from '../auth/context';
import storage from '../auth/storage';
import ActivityIndicator from '../components/ActivityIndicator';

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required('This field is required'),
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('This field is required'),
  password: yup
    .string()
    .required('This field is required')
});

export default function CreateAccountScreen () {
  const [loading, setLoading] = useState(false);
  const authContext = useContext(AuthContext);
  const [signUpFailed, setSignUpFailed] = useState(false);

  const handleOnSubmit = async ({ name, email, password }) => {
    setLoading(true);
    await storage.removeToken();
    await storage.removeUser();
    await storage.removeWallet();

    const result = await auth.signUp(name, email, password);
    if (!result.ok) return (setSignUpFailed(true), console.log('Sign Up ' + result.data));
    await storage.storeToken(result.data.token);
    await storage.storeUser(result.data.user);

    const response = await auth.createWallet();
    if (!response.ok) return (setSignUpFailed(true), console.log('Create Wallet ' + response.data));

    const getResponse = await auth.getWallet();
    if (!getResponse.ok) return (setSignUpFailed(true), console.log('Get Wallet ' + getResponse.data));
    await storage.storeWallet(getResponse.data);

    setLoading(false);
    await authContext.setUser(true);
  };

  return (
    <Screen style={styles.container}>
      {loading && <ActivityIndicator visible={loading} />}
      <AppForm
        initialValues={{ name: '', email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleOnSubmit}
      >
        <View style={{ width: '90%', marginTop: 10 }}>
          <ErrorMessage error='Sign Up Failed' visible={signUpFailed} />
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
          <AppFormField
            title='Password'
            name='password'
            autoCapitalize='none'
          />
        </View>
        <View style={{ width: '90%' }}>
          <SubmitButton title='Sign Up' />
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
