import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from '../screens/auth/signin';
import OTPVerification from '../screens/auth/otpverification';
import Home from '../screens/home';
import DrawerNavigator from './DrawerNavigation';
import Settings from '../screens/settings';

const Stack = createNativeStackNavigator();

export default function StackNavigation() {
  return (
    <Stack.Navigator initialRouteName="SignIn" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="OTPVerification" component={OTPVerification} />
      <Stack.Screen name="Home" component={DrawerNavigator} />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
}
