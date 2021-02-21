import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  StatusBar,
} from 'react-native';


const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic">
            <Text style={styles.text}>Kisan Otp</Text>
           </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  text:{
    fontSize:20,
    color:"#3acce1",
    textAlign:'center'
  }
});

export default App;
