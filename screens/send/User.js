import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
const UserScreen = ({navigation,route}) => {
  console.log(route.params)
  return (
    <View style={styles.container}>
      <Text style={styles.text}>User</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingVertical: 14,
  },
  text: {
    fontSize: 80,
    color: '#3acce1',
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
  },
});
export default UserScreen;
