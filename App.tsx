import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './src/utills/rootnavigations';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
import StackNavigator from './src/navigation/StackNavigation';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <GluestackUIProvider config={config}>
      <SafeAreaProvider>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <NavigationContainer ref={navigationRef}>
          <StackNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </GluestackUIProvider>
  );
}

export default App;
