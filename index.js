import 'react-native-gesture-handler';
import 'react-native-reanimated';   
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import './src/translation/i18n';
import 'intl-pluralrules';
import 'react-native-get-random-values';
import {Provider as StoreProvider} from 'react-redux';
import { store, persistor } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useOnlineManager } from './src/hooks/useOnlineManager';

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 2 } },
});

const RNRedux = () => {
  useOnlineManager();
  return (
    <StoreProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </PersistGate>
    </StoreProvider>
  );
};

AppRegistry.registerComponent(appName, () => RNRedux);
