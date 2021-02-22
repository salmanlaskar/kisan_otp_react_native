import {random} from 'lodash';
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from '../../utils/axios';
const SendMessage = ({navigation, route}) => {
  const [data, setData] = useState(route.params);
  const [message, setMessage] = useState('');
  const RandomOtp = () => {
    return random(100000, 999999);
  };
  const [otp, setOtp] = useState(RandomOtp());
  const Send = () => {
    axios({
      url: '/message',
      method: 'POST',
      data: {id: data._id, otp, message},
    })
      .then((res) => res.data)
      .then((data) => {
        return ToastAndroid.showWithGravity(
          'Message successfully send',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      })
      .catch((e) => {
        return ToastAndroid.showWithGravity(
          'some error occoured',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      });
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{width: '34%', height: 40, justifyContent: 'center'}}
        onPress={() => {
          navigation.goBack();
        }}>
        <Text style={styles.text}>Back</Text>
      </TouchableOpacity>
      <View style={{width: '80%', marginHorizontal: '10%', marginTop: '20%'}}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.headerText}>To : </Text>
          <Text
            style={[
              styles.headerText,
              {color: '#ff9200', fontFamily: 'Poppins-Regular', width: '50%'},
            ]}>
            {data.firstName + ' ' + data.lastName}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.headerText}>{''}</Text>
          <Text
            style={[
              styles.headerText,
              {color: '#ff9200', fontFamily: 'Poppins-Regular', width: '50%'},
            ]}>
            ({data.phoneNumber})
          </Text>
        </View>
        <View style={{flexDirection: 'row', marginTop: 40}}>
          <Text style={styles.headerText}>Hi. Your OTP is: </Text>
          <Text
            style={[
              styles.headerText,
              {color: '#ff9200', fontFamily: 'Poppins-Medium', width: '50%'},
            ]}>
            {otp}
          </Text>
        </View>
        <TextInput
          style={styles.search}
          placeholder={`Please add additional message`}
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => {
            setMessage(text);
          }}
          value={message}
          multiline={true}
          numberOfLines={3}
          maxLength={100}
        />
        <Text style={styles.max}>max 100 characters</Text>
      </View>
      <View style={styles.bottom}>
        <TouchableOpacity style={styles.button} onPress={() => Send()}>
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
    alignItems: 'center',
    width: '100%',
  },
  search: {
    zIndex: -1,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#2a2e43',
    justifyContent: 'center',
    borderRadius: 5,
    borderColor: '#cccccc',
    borderWidth: 0.5,
    marginTop: 12,
    width: '86%',
  },
  max: {
    color: '#3acce1',
    width: '86%',
    textAlign: 'right',
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    marginTop: 2,
  },
  button: {
    width: '55%',
    backgroundColor: '#ff9200',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    borderTopLeftRadius: 45,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 4,
    borderBottomLeftRadius: 3,
    marginTop: '15%',
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
export default SendMessage;
