import { StyleSheet, View, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import QRCode from 'react-native-qrcode-svg';
import { Feather } from '@expo/vector-icons';

import Screen from '../components/Screen';
import { AppText } from '../components/AppText';
import colors from '../config/colors';
import { AppButton, IconButton } from '../components/buttons';
import routes from '../navigation/routes';
import storage from '../auth/storage';

const Header = ({ handleOnPress, handleOnPressUser }) => {
  return (
    <View style={styles.header}>
      <AppText.Bold style={{ color: colors.primary }}>Quess</AppText.Bold>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <IconButton title='Bank' icon='credit-card' handleOnPress={handleOnPress} />
        <Pressable style={{ marginLeft: 10 }} onPress={handleOnPressUser}>
          <Feather name='user' size={24} color={colors.black} />
        </Pressable>
      </View>
    </View>
  );
};

const NoBank = () => {
  return (
    <View style={styles.noBankContainer}>
      <AppText style={{ textAlign: 'center', paddingBottom: 10 }}>You do not have a Bank linked to this account</AppText>
      <View style={{ width: '40%', alignSelf: 'center' }}>
        <AppButton title='Link Bank' />
      </View>
    </View>
  );
};

const QrCodeBank = ({ handleOnPress, value }) => {
  return (
    <View style={styles.qrCodeContainer}>
      <View style={{ backgroundColor: colors.white, padding: 40, width: '80%', alignItems: 'center', borderRadius: 20 }}>
        <QRCode size={200} value={value} />
      </View>
      <View style={{ width: '80%', marginTop: 20 }}>
        <AppButton title='Scan' onPress={handleOnPress} />
      </View>
    </View>
  );
};

export default function HomeScreen ({ navigation }) {
  const [email, setEmail] = useState();

  const getUser = async () => {
    const result = await storage.getUser();
    setEmail(result.email);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Screen style={styles.container}>
      <Header handleOnPressUser={() => navigation.navigate(routes.ACCOUNT)} handleOnPress={() => navigation.navigate(routes.BANK)} />
      {/* <NoBank /> */}
      <QrCodeBank value={email} handleOnPress={() => navigation.navigate(routes.SCAN)} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: colors.backgroundColor
  },
  header: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10
  },
  noBankContainer: {
    marginTop: 100,
    width: '70%'
  },
  qrCodeContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 50
  },
  modal: {
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.5,
    borderRadius: 30,
    top: 150
  },
  successModal: {
    backgroundColor: colors.white,
    flex: 0.5,
    top: 150,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30
  }
});
