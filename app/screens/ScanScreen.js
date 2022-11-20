import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Pressable, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Feather } from '@expo/vector-icons';
import BarcodeMask from 'react-native-barcode-mask';
import * as yup from 'yup';

import { AppText } from '../components/AppText';
import { AppButton, IconButton } from '../components/buttons';
import colors from '../config/colors';
import Modal from 'react-native-modal';
import { AppForm, AppFormField, SubmitButton } from '../components/forms';
import routes from '../navigation/routes';
import auth from '../api/auth';
import ActivityIndicator from '../components/ActivityIndicator';

const validationSchema = yup.object().shape({
  amount: yup
    .string()
    .required('This field is required')
});

const Header = ({ handleOnPress, handleOnPressUser }) => {
  return (
    <View style={styles.header}>
      <AppText.Bold style={{ color: colors.black }}>Quess</AppText.Bold>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <IconButton handleOnPress={handleOnPress} title='Bank' icon='credit-card' color='black' />
        <Pressable onPress={handleOnPressUser} style={{ marginLeft: 10 }}>
          <Feather name='user' size={24} color={colors.black} />
        </Pressable>
      </View>
    </View>
  );
};

export default function ScanScreen ({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(true);
  const [hasPermission, setHasPermission] = useState(null);
  const [amount, setAmount] = useState(0);
  const [scanned, setScanned] = useState(true);

  const handleOnSubmit = ({ amount }) => {
    setAmount(amount);
    setModalVisible(false);
    setScanned(false);
  };

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    setLoading(true);
    await auth.chargeWallet(data, amount);
    setLoading(false);
    Alert.alert('Transaction successful');
  };

  if (hasPermission === null) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <AppText>Requesting for camera permission</AppText>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <AppText>No access to Camera</AppText>
      </View>
    );
  }

  return (
    <BarCodeScanner
      onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      style={StyleSheet.absoluteFillObject}
    >
      <View style={styles.container}>
        {loading && <ActivityIndicator visible={loading} />}
        <BarcodeMask
          width='80%'
          height='50%'
          showAnimatedLine={false}
          edgeWidth={60}
          edgeRadius={30}
          edgeHeight={60}
          edgeBorderWidth={10}
          outerMaskOpacity={0}
        />
        <Header handleOnPress={() => navigation.navigate(routes.BANK)} handleOnPressUser={() => navigation.navigate(routes.ACCOUNT)} />
        <View style={{ width: '90%', marginBottom: 10 }}>
          <AppButton onPress={() => navigation.navigate(routes.HOME)} title='Show QR' color='black' />
        </View>
        <Modal
          onBackdropPress={() => setModalVisible(false)}
          style={styles.successModal}
          isVisible={isModalVisible}
        >
          <AppText.Bold style={{ marginBottom: 10 }}>Amount</AppText.Bold>
          <AppForm
            initialValues={{ amount: 0 }}
            validationSchema={validationSchema}
            onSubmit={handleOnSubmit}
          >
            <View style={{ width: '80%' }}>
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
    </BarCodeScanner>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  header: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30
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
