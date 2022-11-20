import client from './client';
import storage from '../auth/storage';

const signUp = (name, email, password) => {
  const response = client.post(
    '/register/',
    {
      username: name,
      email: email,
      password: password
    }
  );
  return response;
};

const login = (name, password) => {
  const response = client.post(
    '/login/',
    {
      username: name,
      password: password
    },
    { headers: { 'Content-Type': 'application/json' } }
  );
  return response;
};

const logout = () => {
  const response = client.post('/logout/');
  return response;
};

const chargeWallet = async (email, amount) => {
  const token = await storage.getToken();
  const response = client.post(
    '/charge_wallet/',
    {
      wallet: email,
      amount: amount
    },
    {
      headers: { Authorization: 'Token ' + token }
    }
  );
  return response;
};

const createWallet = async () => {
  const token = await storage.getToken();
  const response = client.post(
    '/create_wallet/',
    {},
    {
      headers: { Authorization: 'Token ' + token }
    }
  );
  return response;
};

const getWallet = async () => {
  const token = await storage.getToken();
  const response = client.get(
    '/get_wallet/',
    {},
    {
      headers: { Authorization: 'Token ' + token }
    }
  );
  return response;
};

const createAccount = async (accountNumber, bank, dateOfBirth) => {
  const token = await storage.getToken();
  const response = client.post(
    '/create_account/',
    {
      account_number: accountNumber,
      bank_name: bank,
      date_of_birth: dateOfBirth
    },
    {
      headers: { Authorization: 'Token ' + token }
    }
  );
  return response;
};

const fundWallet = async (amount) => {
  const token = await storage.getToken();
  const response = client.post(
    '/fund_wallet/',
    {
      amount: amount
    },
    {
      headers: { Authorization: 'Token ' + token, 'Content-Type': 'application/json' }
    }
  );
  return response;
};

const getBanks = async () => {
  const token = await storage.getToken();
  const response = client.get(
    '/get_account/',
    {},
    {
      headers: { Authorization: 'Token ' + token }
    }
  );
  return response;
};

export default {
  signUp,
  login,
  logout,
  chargeWallet,
  createWallet,
  getWallet,
  createAccount,
  fundWallet,
  getBanks
};
