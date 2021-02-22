import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ContactScreen from '../screens/contact/Contact'; //All contact list
import MessageScreen from '../screens/message/Message'; //All successfull messages list
import UserScreen from '../screens/send/User'; //User info screen from perticular contact
import SendMessage from '../screens/send/SendMessage'; //Otp sending screen

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

//The two main tab which can swipe
//used material-top-tabs library for this
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
//Used stack navigator for other screens and connected with Tab screens
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
        <Stack.Screen name="Send" component={SendMessage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
