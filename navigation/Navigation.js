import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ContactScreen from '../screens/contact/Contact';
import MessageScreen from '../screens/message/Message';
import UserScreen from '../screens/send/User';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const TabScreen = () => {
  return (
    <Tab.Navigator
      initialRouteName="Contacts"
      tabBarOptions={{
        labelStyle: {fontSize: 13, fontFamily: 'Poppins-Regular'},
        indicatorStyle: {
          backgroundColor: '#444444',
          height: 1.6,
        },
        activeTintColor: '#000000',
      }}
      backBehavior="initialRoute">
      <Tab.Screen name="Contacts" component={ContactScreen} />
      <Tab.Screen name="Messages" component={MessageScreen} />
    </Tab.Navigator>
  );
};

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Tab">
        <Stack.Screen name="Tab" component={TabScreen} />
        <Stack.Screen name="User" component={UserScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
