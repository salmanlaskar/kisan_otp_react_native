import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
const UserScreen = ({navigation,route}) => {
  console.log(route.params)
  return (
    <View style={styles.header}>
      <Text style={styles.text}>User</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  text: {
    fontSize: 80,
    color: '#3acce1',
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
  },
});
export default UserScreen;
