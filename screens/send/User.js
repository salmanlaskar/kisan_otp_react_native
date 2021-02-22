import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
const UserScreen = ({navigation, route}) => {
  const [data, setData] = useState(route.params);
  return (
    <View style={styles.container}>
      <View style={{width: '80%', marginHorizontal: '10%', marginTop: '20%'}}>
        <Ionicons
          name="person"
          color="#acacac"
          size={60}
          style={{marginBottom: '20%', alignSelf: 'center'}}
        />
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.headerText}>First Name : </Text>
          <Text
            style={[
              styles.headerText,
              {color: '#ff9200', fontFamily: 'Poppins-Medium', width: '50%'},
            ]}>
            {data.firstName}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.headerText}>Last Name : </Text>
          <Text
            style={[
              styles.headerText,
              {color: '#ff9200', fontFamily: 'Poppins-Medium', width: '50%'},
            ]}>
            {data.lastName}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.headerText}>Phone Number : </Text>
          <Text
            style={[
              styles.headerText,
              {color: '#ff9200', fontFamily: 'Poppins-Medium', width: '50%'},
            ]}>
            {data.phoneNumber}
          </Text>
        </View>
      </View>
      <View style={styles.bottom}>
        <TouchableOpacity
          style={{width: '46%', height: 60, justifyContent: 'center'}}
          onPress={() => {
            navigation.goBack();
          }}>
          <Text style={styles.text}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('Send', data);
          }}>
          <Text style={[styles.text, {color: '#ffffff'}]}>Send Message </Text>
          <Ionicons name="ios-send" color="#ffffff" size={18} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingVertical: 14,
  },
  bottom: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  button: {
    width: '54%',
    backgroundColor: '#acacac',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    borderTopLeftRadius: 45,
  },
  headerText: {
    marginTop: 2,
    fontSize: 18,
    color: '#444444',
    fontFamily: 'Poppins-Regular',
    minWidth: '50%',
  },
  text: {
    fontSize: 16,
    color: '#ff9200',
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
  },
});
export default UserScreen;
