import { Pressable, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';

import Screen from '../components/Screen';
import { AppText } from '../components/AppText';
import { AppButton } from '../components/buttons';
import colors from '../config/colors';
import auth from '../api/auth';
import routes from '../navigation/routes';

const NoBank = ({ handleOnPress }) => {
  return (
    <View style={styles.noBank}>
      <Feather name='plus-square' size={70} color='#707070' />
      <AppText>Add a Bank to create a QR code</AppText>
      <View style={{ width: '40%', marginTop: 10 }}>
        <AppButton title='Add Bank' onPress={handleOnPress} />
      </View>
    </View>
  );
};

const BankItem = ({ item, handleOnPress }) => {
  return (
    <Pressable onPress={handleOnPress} style={styles.bankItem}>
      <AppText style={styles.bankItemText}>{item.account_number}</AppText>
      <AppText style={styles.bankItemText}>{item.bank_name}</AppText>
    </Pressable>
  );
};

export default function BankScreen ({ navigation }) {
  const [banks, setBanks] = useState({});

  const getBanksData = async () => {
    const result = await auth.getBanks();
    if (!result.ok) return setBanks(false);
    setBanks(result.data);
  };

  useEffect(() => {
    getBanksData();
  }, []);

  return (
    <Screen style={styles.container}>
      {!banks && <NoBank handleOnPress={() => navigation.navigate(routes.ADD_BANK)} />}
      {banks && <BankItem item={banks} />}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1
  },
  noBank: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 100
  },
  bankItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.darkBlue,
    width: '90%',
    alignSelf: 'center',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 50
  },
  bankItemText: {
    color: colors.white
  }
});
