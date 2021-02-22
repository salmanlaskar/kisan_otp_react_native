import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
const window = Dimensions.get('window');
const UserScreen = ({navigation, route}) => {
  const [data, setData] = useState(route.params); //user info getting by prop from previous screen
  const [width, setWidth] = useState(window.width);
  const [height, setHeight] = useState(window.height);
  const onChange = ({window}) => {
    setHeight(window.height);
    setWidth(window.width);
  };
  useEffect(() => {
    //manages screen rotation listner
    Dimensions.addEventListener('change', onChange);
    return () => {
      Dimensions.removeEventListener('change', onChange);
    };
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView
        style={{width: width * 0.8, marginHorizontal: width * 0.1}}
        showsVerticalScrollIndicator={false}>
        <Ionicons
          name="person"
          color="#acacac"
          size={60}
          style={{marginVertical: height * 0.1, alignSelf: 'center'}}
        />
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.headerText, {minWidth: width * 0.4}]}>
            First Name :{' '}
          </Text>
          <Text
            style={[
              styles.headerText,
              {
                color: '#ff9200',
                fontFamily: 'Poppins-Medium',
                width: width * 0.5,
              },
            ]}>
            {data.firstName}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.headerText, {minWidth: width * 0.4}]}>
            Last Name :{' '}
          </Text>
          <Text
            style={[
              styles.headerText,
              {color: '#ff9200', fontFamily: 'Poppins-Medium', width: '50%'},
            ]}>
            {data.lastName}
          </Text>
        </View>
        <View style={{flexDirection: 'row', marginBottom: 66}}>
          <Text style={[styles.headerText, {minWidth: width * 0.4}]}>
            Phone Number :{' '}
          </Text>
          <Text
            style={[
              styles.headerText,
              {color: '#ff9200', fontFamily: 'Poppins-Medium', width: '50%'},
            ]}>
            {data.phoneNumber}
          </Text>
        </View>
      </ScrollView>
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
  },
  text: {
    fontSize: 16,
    color: '#ff9200',
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
  },
});
export default UserScreen;
