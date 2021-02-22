import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  RefreshControl,
  Dimensions,
  SectionList,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
} from 'react-native';
import axios from '../../utils/axios'; //used for http request to server
import Ionicons from 'react-native-vector-icons/Ionicons';
import _ from 'lodash'; //provides utility functions like generate random number
import Spinner from 'react-native-loading-spinner-overlay';

const window = Dimensions.get('window');

const ContactScreen = ({navigation}) => {
  const [contacts, setContacts] = useState([]); //contacts which are to be shown(filterd list)
  const [contactlist, setcontactlist] = useState([]); //all contacts(to do filtering)
  const [refreshing, setRefreshing] = useState(false); //pull to refresh facility
  const [loading, setLoading] = useState(false); //manages loading state on api call
  const [flag, setFlag] = useState(false); //on refresh useEffect hook called by this flag
  const [search, setSearch] = useState(''); //search text

  const [width, setWidth] = useState(window.width);
  const [height, setHeight] = useState(window.height);
  const onChange = ({window}) => {
    setHeight(window.height);
    setWidth(window.width);
  };
  //Utility function to convert a normal list to alphabatical ordered list
  const getData = (list) => {
    let contactsArr = [];
    let aCode = 'A'.charCodeAt(0);
    for (let i = 0; i < 26; i++) {
      let currChar = String.fromCharCode(aCode + i);
      let obj = {
        title: currChar,
      };

      let currContacts = list.filter((item) => {
        return item.firstName[0].toUpperCase() === currChar;
      });
      if (currContacts.length > 0) {
        currContacts.sort((a, b) => a.firstName.localeCompare(b.firstName));
        obj.data = currContacts;
        contactsArr.push(obj);
      }
    }
    return contactsArr;
  };
  useEffect(() => {
    setLoading(true);
    setRefreshing(false);
    //Api call for getting all contacts from server
    axios({url: '/user', method: 'GET'})
      .then((res) => res.data)
      .then((data) => {
        setLoading(false);
        setcontactlist(data);
        setContacts(getData(data));
      })
      .catch((err) => {
        setLoading(false);
        ToastAndroid.showWithGravity(
          'Contact fetch error, please check internet connection',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
        );
      });

    //handling screen rotation (ui management)
    Dimensions.addEventListener('change', onChange);
    return () => {
      Dimensions.removeEventListener('change', onChange);
    };
  }, [flag]);

  //Utility function for searced output
  const handleSearch = (text) => {
    const formattedQuery = text.toLowerCase();
    var temp = [];
    _.filter(contactlist, (item) => {
      var n = item.firstName.toLowerCase();
      var m = item.phoneNumber.toLowerCase();
      if (n.includes(formattedQuery) || m.includes(formattedQuery)) {
        temp.push(item);
      }
    });
    setContacts(getData(temp));
  };
  return (
    <View style={styles.container}>
      <Spinner
        visible={loading}
        textContent={'loading...'}
        textStyle={{color: '#FFF', fontSize: 12, fontFamily: 'Poppins-Medium'}}
      />
      <View
        style={[
          styles.searchInput,
          {
            marginLeft: 0.1 * width,
            marginBottom: 0.018 * height,
            width: width * 0.8,
          },
        ]}>
        <Ionicons
          name="ios-search"
          size={22}
          color="#9F9FA0"
          style={{marginLeft: 0.035 * width}}
        />
        <TextInput
          style={[styles.search, {width: width * 0.7}]}
          placeholder={`Search in ${contactlist.length} Contact(s)`}
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => {
            setSearch(text);
            handleSearch(text);
          }}
          value={search}
        />
      </View>
      <SectionList
        sections={contacts}
        initialNumToRender={10}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.row}
            onPress={() => {
              navigation.navigate('User', item);
            }}>
            <Text style={styles.name}>
              {item.firstName + ' ' + item.lastName}
            </Text>
            {search ? (
              <Text style={[styles.name, {fontSize: 12}]}>
                {item.phoneNumber}
              </Text>
            ) : null}
          </TouchableOpacity>
        )}
        renderSectionHeader={({section}) => (
          <View style={styles.sectionHeader}>
            <Text style={{fontFamily: 'Poppins-Medium'}}>{section.title}</Text>
          </View>
        )}
        keyExtractor={(item) => item._id}
        refreshControl={
          <RefreshControl
            colors={['#9Bd35A', '#689F38']}
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              setFlag(!flag);
            }}
          />
        }
      />
      {/* <Ionicons
        name="md-add-circle-sharp"
        color="#2a2e43"
        size={42}
        style={{position: 'absolute', bottom: 20, right: 20}}
      /> */}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingVertical: 14,
  },
  searchInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.1,
    borderColor: '#ffffff',
    borderColor: '#cacaca',
    borderRadius: 20,
    height: 44,
  },
  search: {
    marginLeft: 6,
    zIndex: -1,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#2a2e43',
    justifyContent: 'center',
  },
  headerText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#000000',
    textAlign: 'center',
    marginBottom: 6,
  },
  row: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#ffffff',
    borderColor: '#eeeeee',
    borderWidth: 0.3,
  },
  sectionHeader: {
    backgroundColor: '#efefef',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  name: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
});

export default ContactScreen;
