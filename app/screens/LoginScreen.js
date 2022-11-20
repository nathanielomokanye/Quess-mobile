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
  password: yup
    .string()
    .required('This field is required')
});

export default function LoginScreen () {
  const [loading, setLoading] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);
  const authContext = useContext(AuthContext);

  const handleOnSubmit = async ({ name, password }) => {
    setLoading(true);
    await storage.removeToken();
    await storage.removeUser();
    await storage.removeWallet();

    const result = await auth.login(name, password);
    if (!result.ok) return (setLoginFailed(true), setLoading(false));
    await storage.storeToken(result.data.token);
    await storage.storeUser(result.data.user);

    const getResponse = await auth.getWallet();
    if (!getResponse.ok) return (setLoginFailed(true), setLoading(false));
    await storage.storeWallet(getResponse.data);

    setLoading(false);
    await authContext.setUser(true);
  };

  return (
    <Screen style={styles.container}>
      {loading && <ActivityIndicator visible={loading} />}
      <AppForm
        initialValues={{ name: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleOnSubmit}
      >
        <View style={{ width: '90%' }}>
          <ErrorMessage error='Login Failed' visible={loginFailed} />
          <AppFormField
            title='Name'
            name='name'
            autoCapitalize='none'
          />
          <AppFormField
            title='Password'
            name='password'
            autoCapitalize='none'
          />
        </View>
        <View style={{ width: '90%' }}>
          <SubmitButton title='Login' />
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
