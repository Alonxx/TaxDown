import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Routes} from './src/routes';
import {Login} from './src/screens';
import {useUserDataStore} from './src/stores';

const App = () => {
  const {isLogin} = useUserDataStore();

  return (
    <NavigationContainer>
      <SafeAreaProvider>{isLogin ? <Routes /> : <Login />}</SafeAreaProvider>
    </NavigationContainer>
  );
};

export default App;
