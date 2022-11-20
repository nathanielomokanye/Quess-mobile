import { FlatList, Pressable, StyleSheet, View, Alert, ScrollView, RefreshControl } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import * as yup from 'yup';

import Screen from '../components/Screen';
import { AppText } from '../components/AppText';
import colors from '../config/colors';
import routes from '../navigation/routes';
import AuthContext from '../auth/context';
import storage from '../auth/storage';
import { AppButton } from '../components/buttons';
import auth from '../api/auth';
import { AppForm, AppFormField, SubmitButton } from '../components/forms';
import ActivityIndicator from '../components/ActivityIndicator';

const validationSchema = yup.object().shape({
  accountNumber: yup
    .string()
    .required('This field is required'),
  amount: yup
    .string()
    .required('This field is required')
});

const ButtonItem = ({ item }) => {
  return (
    <Pressable style={styles.buttonItem} onPress={item.handleOnPress}>
      <AppText>{item.title}</AppText>
      {item.icon && <Feather name={item.icon} size={24} color={colors.black} />}
    </Pressable>
  );
};

const Wallet = ({ walletAmount, handleOnPress }) => {
  return (
    <View style={styles.wallet}>
      <AppText style={{ color: 'white' }}>Balance</AppText>
      <AppText.Bold style={{ color: 'white' }}>₦{walletAmount}</AppText.Bold>
      <View style={{ width: '90%', marginTop: 20 }}>
        <AppButton onPress={handleOnPress} textColor='darkBlue' color='white' title='Fund Wallet' />
      </View>
    </View>
  );
};

export default function AccountScreen ({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [walletAmount, setWalletAmount] = useState();
  const authContext = useContext(AuthContext);

  const getWalletAmount = async () => {
    const result = await storage.getWallet();
    setWalletAmount(result.amount);
  };

  useEffect(() => {
    getWalletAmount();
  }, []);

  const handleOnPressLogout = async () => {
    await storage.removeToken();
    await storage.removeUser();
    await authContext.setUser(false);
  };

  const handleOnPressFundWallet = async ({ accountNumber, amount }) => {
    setLoading(true);
    const result = await auth.fundWallet(amount);
    if (!result.ok) return console.log(result.data);
    setModalVisible(false);
    setLoading(false);
    Alert.alert('Transaction successful');
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await storage.removeWallet();

    const response = await auth.getWallet();
    if (!response.ok) return (setRefreshing(false), console.log(response.data));

    await storage.storeWallet(response.data);

    const result = await storage.getWallet();

    setWalletAmount(result.amount);

    setRefreshing(false);
  };

  const buttons = [
    {
      id: 1,
      title: 'Edit Profile',
      icon: 'chevron-right',
      handleOnPress: () => navigation.navigate(routes.EDIT_PROFILE)
    },
    {
      id: 2,
      title: 'Change Password',
      icon: 'chevron-right',
      handleOnPress: () => navigation.navigate(routes.CHANGE_PASSWORD)
    },
    {
      id: 3,
      title: 'Logout',
      handleOnPress: handleOnPressLogout
    }
  ];
  return (
    <Screen style={styles.container}>
      {loading && <ActivityIndicator visible={loading} />}
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={{ width: '100%' }}>
          <Wallet handleOnPress={() => setModalVisible(true)} walletAmount={walletAmount} />
          <FlatList
            data={buttons}
            renderItem={({ item }) => <ButtonItem item={item} />}
            scrollEnabled={false}
          />
          <Modal
            onBackdropPress={() => setModalVisible(false)}
            style={styles.successModal}
            isVisible={isModalVisible}
          >
            <AppText.Bold style={{ marginBottom: 10 }}>Amount</AppText.Bold>
            <AppForm
              initialValues={{ accountNumber: '', amount: '' }}
              validationSchema={validationSchema}
              onSubmit={handleOnPressFundWallet}
            >
              <View style={{ width: '80%' }}>
                <AppFormField
                  name='accountNumber'
                  title='Account Number'
                  autoCapitalize='none'
                  keyboardType='number-pad'
                />
                <AppFormField
                  name='amount'
                  title='Amount'
                  autoCapitalize='none'
                  keyboardType='number-pad'
                />
                <SubmitButton title='Submit' />
              </View>
            </AppForm>
          </Modal>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1
  },
  buttonItem: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginVertical: 10
  },
  wallet: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    backgroundColor: colors.darkBlue,
    width: '90%',
    alignSelf: 'center',
    marginVertical: 10,
    borderRadius: 15
  },
  successModal: {
    backgroundColor: colors.white,
    flex: 0.6,
    top: 150,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30
  }
});
