import AsyncStorage from '@react-native-async-storage/async-storage';

const tokenKey = 'token';
const userKey = 'user';
const walletKey = 'wallet';

const storeToken = async (value) => {
  try {
    await AsyncStorage.setItem(tokenKey, value);
  } catch (e) {
    console.log('Error storing token:' + e);
  }
};

const getToken = async () => {
  try {
    return await AsyncStorage.getItem(tokenKey);
  } catch (e) {
    console.log('Error getting token:' + e);
  }
};

const removeToken = async () => {
  try {
    await AsyncStorage.removeItem(tokenKey);
  } catch (e) {
    console.log('Error removing token:' + e);
  }
};

const storeUser = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(userKey, jsonValue);
  } catch (e) {
    console.log('Error storing token:' + e);
  }
};

const getUser = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(userKey);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log('Error getting token:' + e);
  }
};

const removeUser = async () => {
  try {
    await AsyncStorage.removeItem(userKey);
  } catch (e) {
    console.log('Error removing token:' + e);
  }
};

const storeWallet = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(walletKey, jsonValue);
  } catch (e) {
    console.log('Error storing token:' + e);
  }
};

const getWallet = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(walletKey);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log('Error getting token:' + e);
  }
};

const removeWallet = async () => {
  try {
    await AsyncStorage.removeItem(walletKey);
  } catch (e) {
    console.log('Error removing token:' + e);
  }
};

export default {
  storeToken,
  getToken,
  removeToken,
  storeUser,
  getUser,
  removeUser,
  storeWallet,
  getWallet,
  removeWallet
};
