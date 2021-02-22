import {random} from 'lodash';
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
  Dimensions,
  ScrollView,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from '../../utils/axios'; //for server side api call
import {getMessage} from '../../redux';
const window = Dimensions.get('window');
import store from '../../redux/store'; //to dispatch a redux action directly

const SendMessage = ({navigation, route}) => {
  const [data, setData] = useState(route.params); //user data passed from previous screen
  const [message, setMessage] = useState(''); //state to manage addition text if user want to send along with
  const [loading, setLoading] = useState(false);
  const [width, setWidth] = useState(window.width);
  const [height, setHeight] = useState(window.height);

  const onChange = ({window}) => {
    setHeight(window.height);
    setWidth(window.width);
  };
  useEffect(() => {
    //manage screen rotation listner
    Dimensions.addEventListener('change', onChange);
    return () => {
      Dimensions.removeEventListener('change', onChange);
    };
  }, []);
  //Generates a random number between 100000 to 999999 both including
  const RandomOtp = () => {
    return random(100000, 999999);
  };
  const [otp, setOtp] = useState(RandomOtp()); //state for managing otp value

  //Function for http request to server for sending message to perticular number
  const Send = () => {
    setLoading(true);
    axios({
      url: '/message',
      method: 'POST',
      data: {id: data._id, otp, message},
    })
      .then((res) => res.data)
      .then((data) => {
        setLoading(false);
        ToastAndroid.showWithGravity(
          'Message successfully send',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
        );
        store.dispatch(getMessage());
        navigation.navigate('Messages');
      })
      .catch((e) => {
        setLoading(false);
        return ToastAndroid.showWithGravity(
          e.response.data.message || 'some error occoured',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
        );
      });
  };
  return (
    <ScrollView style={styles.container}>
      <Spinner
        visible={loading}
        textContent={'sending...'}
        textStyle={{color: '#FFF', fontSize: 12, fontFamily: 'Poppins-Medium'}}
      />
      <TouchableOpacity
        style={{width: 0.34 * width, height: 40, justifyContent: 'center'}}
        onPress={() => {
          navigation.goBack();
        }}>
        <Text style={styles.text}>Back</Text>
      </TouchableOpacity>
      <View style={{width: width * 0.8, marginHorizontal: width * 0.1}}>
        <View style={{flexDirection: 'row', marginTop: height * 0.1}}>
          <Text style={[styles.headerText, {minWidth: width * 0.4}]}>
            To :{' '}
          </Text>
          <Text
            style={[
              styles.headerText,
              {
                color: '#ff9200',
                fontFamily: 'Poppins-Regular',
                width: width * 0.5,
              },
            ]}>
            {data.firstName + ' ' + data.lastName}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.headerText, {minWidth: width * 0.4}]}>{''}</Text>
          <Text
            style={[
              styles.headerText,
              {
                color: '#ff9200',
                fontFamily: 'Poppins-Regular',
                width: width * 0.5,
              },
            ]}>
            ({data.phoneNumber})
          </Text>
        </View>
        <View style={{flexDirection: 'row', marginTop: 40}}>
          <Text style={[styles.headerText, {minWidth: width * 0.4}]}>
            Hi. Your OTP is:{' '}
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
            {otp}
          </Text>
        </View>
        <TextInput
          style={[styles.search, {width: width * 0.86}]}
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
        <Text style={[styles.max, {width: width * 0.86}]}>
          max 100 characters
        </Text>
      </View>
      <View style={[styles.bottom, {width, marginBottom: height * 0.1}]}>
        <TouchableOpacity
          style={[
            styles.button,
            {width: width * 0.55, marginVertical: height * 0.05},
          ]}
          onPress={() => Send()}>
          <Text style={[styles.text, {color: '#ffffff'}]}>Send Message </Text>
          <Ionicons name="ios-send" color="#ffffff" size={18} />
        </TouchableOpacity>
      </View>
    </ScrollView>
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
  },
  max: {
    color: '#3acce1',
    textAlign: 'right',
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    marginTop: 2,
  },
  button: {
    backgroundColor: '#ff9200',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    borderTopLeftRadius: 45,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 4,
    borderBottomLeftRadius: 3,
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
export default SendMessage;
