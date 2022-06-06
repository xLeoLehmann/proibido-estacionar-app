import * as React from 'react';
import { StackNavigator } from 'react-navigation'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyTabs from './src/screens/MyTabs';
import Login from './src/screens/Login';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
   // <NavigationContainer>
   //   <MyTabs />
   // </NavigationContainer>
   <NavigationContainer>
    <Stack.Navigator>
     <Stack.Screen options={{headerShown: false}} name="Login" component={Login}/>
      <Stack.Screen options={{headerShown: false}} name="Tabs" component={MyTabs}/>
    </Stack.Navigator>
   </NavigationContainer>
  // <Login/>
  );
}