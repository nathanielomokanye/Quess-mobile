import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

import CreateAccountScreen from '../screens/CreateAccountScreen';
import LoginScreen from '../screens/LoginScreen';
import { AppText } from '../components/AppText';
import colors from '../config/colors';
import routes from './routes';

const Stack = createStackNavigator();

const ButtomComponent = ({ style, color = 'darkBlue', textColor = 'white', title, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: colors[color] }, style]}
      onPress={onPress}
    >
      <AppText style={{ color: colors[textColor] }}>{title}</AppText>
    </TouchableOpacity>
  );
};

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'left'
      }}
    >
      <Stack.Screen
        options={({ navigation }) => ({
          headerRight: () => (
            <ButtomComponent onPress={() => navigation.navigate(routes.LOGIN)} title='Login' />
          )
        })}
        name='Create Account'
        component={CreateAccountScreen}
      />
      <Stack.Screen
        options={({ navigation }) => ({
          headerRight: () => (
            <ButtomComponent onPress={() => navigation.navigate(routes.CREATE_ACCOUNT)} title='Sign Up' />
          ),
          headerLeft: () => undefined
        })}
        name='Login'
        component={LoginScreen}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    width: '35%',
    alignItems: 'center',
    borderRadius: 10,
    marginRight: 10
  }
});

export default AuthNavigator;
