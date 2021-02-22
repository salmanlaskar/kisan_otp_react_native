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
} from 'react-native';
import axios from '../../utils/axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import _ from "lodash";
import Spinner from 'react-native-loading-spinner-overlay';

const window = Dimensions.get('window');
const contactlist = [
  {
    index: 0,
    firstName: 'Carolyn Colon',
    phoneNumber:"+919732101010"
  },
  {
    index: 1,
    firstName: 'Compton Luna',
    phoneNumber:"+918378250534"
  },
  {
    index: 2,
    firstName: 'Michelle Vasquez',
    phoneNumber:"+918918250534"
  },
  {
    index: 3,
    firstName: 'Slater Holland',
    phoneNumber:"+918918250534"
  },
  {
    index: 4,
    firstName: 'Parrish Bowman',
    phoneNumber:"+918918250534"
  },
  {
    index: 5,
    firstName: 'Enid Fowler',
    phoneNumber:"+918918250534"
  },
  {
    index: 6,
    firstName: 'Twila Price',
    phoneNumber:"+918918250534"
  },
  {
    index: 7,
    firstName: 'Hawkins Mills',
    phoneNumber:"+918918250534"
  },
  {
    index: 8,
    firstName: 'Eileen Roth',
    phoneNumber:"+918918250534"
  },
  {
    index: 9,
    firstName: 'Eve Mullen',
    phoneNumber:"+918918250534"
  },
  {
    index: 10,
    firstName: 'Bryant Olsen',
    phoneNumber:"+918918250534"
  },
  {
    index: 11,
    firstName: 'Ramos Bauer',
    phoneNumber:"+918918250534"
  },
  {
    index: 12,
    firstName: 'Beach Crane',
    phoneNumber:"+918918250534"
  },
  {
    index: 13,
    firstName: 'Cathryn Pearson',
    phoneNumber:"+918918250534"
  },
  {
    index: 14,
    firstName: 'Kent Haney',
    phoneNumber:"+918918250534"
  },
  {
    index: 15,
    firstName: 'Sawyer Kramer',
    phoneNumber:"+918918250534"
  },
  {
    index: 16,
    firstName: 'Mitchell Sanchez',
    phoneNumber:"+918918250534"
  },
  {
    index: 17,
    firstName: 'Mcconnell Burns',
    phoneNumber:"+918918250534"
  },
  {
    index: 18,
    firstName: 'Marci Hickman',
    phoneNumber:"+918918250534"
  },
  {
    index: 19,
    firstName: 'Lenora Ellis',
    phoneNumber:"+918918250534"
  },
  {
    index: 20,
    firstName: 'Hahn Hoffman',
    phoneNumber:"+918918250534"
  },
  {
    index: 21,
    firstName: 'Lindsey Parks',
    phoneNumber:"+918918250534"
  },
  {
    index: 22,
    firstName: 'Garner Fitzgerald',
    phoneNumber:"+918918250534"
  },
  {
    index: 23,
    firstName: 'Chrystal Watson',
    phoneNumber:"+918918250534"
  },
  {
    index: 24,
    firstName: 'Effie Mcknight',
    phoneNumber:"+918918250534"
  },
  {
    index: 25,
    firstName: 'Queen Molina',
    phoneNumber:"+918918250534"
  },
  {
    index: 26,
    firstName: 'Weber Howe',
    phoneNumber:"+918918250534"
  },
  {
    index: 27,
    firstName: 'Berry Watkins',
    phoneNumber:"+918918250534"
  },
  {
    index: 28,
    firstName: 'Leonard Lester',
    phoneNumber:"+918918250534"
  },
  {
    index: 29,
    firstName: 'Mcneil Newman',
    phoneNumber:"+918918250534"
  },
  {
    index: 30,
    firstName: 'Whitney Mullins',
    phoneNumber:"+918918250534"
  },
  {
    index: 31,
    firstName: 'Shannon Marshall',
    phoneNumber:"+918918250534"
  },
  {
    index: 32,
    firstName: 'Boone Mcgee',
    phoneNumber:"+918918250534"
  },
  {
    index: 33,
    firstName: 'Denise Booth',
    phoneNumber:"+918918250534"
  },
  {
    index: 34,
    firstName: 'Audrey Milli',
    phoneNumber:"+918918250534"
  },
  {
    index: 35,
    firstName: 'Austin Jack',
    phoneNumber:"+918918250534"
  },
  {
    index: 36,
    firstName: 'Amda Hells',
    phoneNumber:"+918918250534"
  },
];

const ContactScreen = ({navigation}) => {
  const [contacts, setContacts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const[loading,setLoading]=useState(false);
  const [flag, setFlag] = useState(false);
  const[search,setSearch]=useState('');

  const [width, setWidth] = useState(window.width);
  const [height, setHeight] = useState(window.height);
  const onChange = ({window}) => {
    setHeight(window.height);
    setWidth(window.width);
  };
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
    axios({url: '/product', method: 'GET'})
    .then((res) => res.data)
    .then((data) => {
      console.log(data);
      setLoading(false);
      setContacts(getData(contactlist));
    })
    .catch((err) => {
      setLoading(false);
    });
    setRefreshing(false);
    Dimensions.addEventListener('change', onChange);
    return () => {
      Dimensions.removeEventListener('change', onChange);
    };
  }, [flag]);
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
            textStyle={{ color: '#FFF',fontSize:12,fontFamily:"Poppins-Medium"}}
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
          onChangeText={(text) => {setSearch(text);handleSearch(text)}}
          value={search}
        />
      </View>
      <SectionList
        sections={contacts}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.row}
            onPress={() => {
              navigation.navigate('User',item);
            }}>
            <Text style={styles.name}>{item.firstName}</Text>
            {search?<Text style={[styles.name,{fontSize:12}]}>{item.phoneNumber}</Text>:null}
          </TouchableOpacity>
        )}
        renderSectionHeader={({section}) => (
          <View style={styles.sectionHeader}>
            <Text style={{fontFamily: 'Poppins-Medium'}}>{section.title}</Text>
          </View>
        )}
        keyExtractor={(item) => item.index}
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
    borderRadius:20,
    height:44
  },
  search: {
    marginLeft: 6,
    zIndex: -1,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#2a2e43',
    justifyContent:'center'
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
