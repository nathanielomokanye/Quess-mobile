import { createStackNavigator } from '@react-navigation/stack';
import { Pressable, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import ScanScreen from '../screens/ScanScreen';
import BankScreen from '../screens/BankScreen';
import AccountScreen from '../screens/AccountScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import EditCardScreen from '../screens/CreateAccountScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import AddBankScreen from '../screens/AddBankScreen';
import { IconButton } from '../components/buttons';
import routes from './routes';

const Stack = createStackNavigator();

const ProfileNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerTitleAlign: 'left',
        headerLeft: () => (
          <Pressable style={{ marginLeft: 10 }} onPress={() => navigation.goBack()}>
            <Feather name='arrow-left' size={24} />
          </Pressable>
        )
      })}
    >
      <Stack.Screen
        name='Home'
        component={HomeScreen}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        options={({ navigation }) => ({
          headerRight: () => (
            <View style={{ marginRight: 10 }}>
              <IconButton title='Add Bank' icon='plus-circle' handleOnPress={() => navigation.navigate(routes.ADD_BANK)} />
            </View>
          )
        })}
        name='Bank'
        component={BankScreen}
      />
      <Stack.Screen
        name='Scan'
        component={ScanScreen}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen name='Account' component={AccountScreen} />
      <Stack.Screen name='Change Password' component={ChangePasswordScreen} />
      <Stack.Screen name='Edit Card' component={EditCardScreen} />
      <Stack.Screen name='Edit Profile' component={EditProfileScreen} />
      <Stack.Screen name='Add Bank' component={AddBankScreen} />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
