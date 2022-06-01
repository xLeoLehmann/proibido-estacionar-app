import * as React from 'react';
import { StyleSheet } from 'react-native';
import Report from './Report';
import Profile from './Profile';
import History from './History';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Report"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'black',
        tabBarActiveBackgroundColor: '#daa520',
        tabBarInactiveTintColor:'white',
        tabBarInactiveBackgroundColor: '#000080',
        tabBarHideOnKeyboard:true
      }}
    >
      <Tab.Screen
        name="Reportar"
        component={Report}
        options={{
          tabBarLabel: 'Reportar',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="car-emergency" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Histórico"
        component={History}
        options={{
          tabBarLabel: 'Histórico',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="history" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}