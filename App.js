import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MyTabs from './src/screens/MyTabs';

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}