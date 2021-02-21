import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  View,
  StatusBar,
} from 'react-native';
// import { createStackNavigator } from "@react-navigation/stack";
import {NavigationContainer} from '@react-navigation/native';
const Tab = createMaterialTopTabNavigator();

function App() {
  const HomeScreen = () => {
    return (
      <View style={styles.header}>
        <Text style={styles.text}>Home</Text>
      </View>
    );
  };
  const SettingsScreen = () => {
    return (
      <View style={styles.header}>
        <Text style={styles.text}>Setting</Text>
      </View>
    );
  };
  return (
    <NavigationContainer>
      <Tab.Navigator
      initialRouteName="Contacts"
      tabBarOptions={{
        labelStyle:{fontSize:13,fontFamily:"Poppins-Regular"},
        indicatorStyle :{
          backgroundColor:'#444444',
          height:1.6
        },
         activeTintColor:"#000000",
        // inactiveTintColor:"#272727"
      }}
      backBehavior="initialRoute">
        <Tab.Screen name="Contacts" component={HomeScreen} />
        <Tab.Screen name="Messages" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 80,
    color: '#3acce1',
    textAlign: 'center',fontFamily:"Poppins-Bold"
  },
});

export default App;
