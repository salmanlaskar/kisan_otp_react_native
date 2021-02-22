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
import Ionicons from 'react-native-vector-icons/Ionicons';
import _ from "lodash";
const window = Dimensions.get('window');
const contactlist = [
  {
    index: 0,
    name: 'Carolyn Colon',
  },
  {
    index: 1,
    name: 'Compton Luna',
  },
  {
    index: 2,
    name: 'Michelle Vasquez',
  },
  {
    index: 3,
    name: 'Slater Holland',
  },
  {
    index: 4,
    name: 'Parrish Bowman',
  },
  {
    index: 5,
    name: 'Enid Fowler',
  },
  {
    index: 6,
    name: 'Twila Price',
  },
  {
    index: 7,
    name: 'Hawkins Mills',
  },
  {
    index: 8,
    name: 'Eileen Roth',
  },
  {
    index: 9,
    name: 'Eve Mullen',
  },
  {
    index: 10,
    name: 'Bryant Olsen',
  },
  {
    index: 11,
    name: 'Ramos Bauer',
  },
  {
    index: 12,
    name: 'Beach Crane',
  },
  {
    index: 13,
    name: 'Cathryn Pearson',
  },
  {
    index: 14,
    name: 'Kent Haney',
  },
  {
    index: 15,
    name: 'Sawyer Kramer',
  },
  {
    index: 16,
    name: 'Mitchell Sanchez',
  },
  {
    index: 17,
    name: 'Mcconnell Burns',
  },
  {
    index: 18,
    name: 'Marci Hickman',
  },
  {
    index: 19,
    name: 'Lenora Ellis',
  },
  {
    index: 20,
    name: 'Hahn Hoffman',
  },
  {
    index: 21,
    name: 'Lindsey Parks',
  },
  {
    index: 22,
    name: 'Garner Fitzgerald',
  },
  {
    index: 23,
    name: 'Chrystal Watson',
  },
  {
    index: 24,
    name: 'Effie Mcknight',
  },
  {
    index: 25,
    name: 'Queen Molina',
  },
  {
    index: 26,
    name: 'Weber Howe',
  },
  {
    index: 27,
    name: 'Berry Watkins',
  },
  {
    index: 28,
    name: 'Leonard Lester',
  },
  {
    index: 29,
    name: 'Mcneil Newman',
  },
  {
    index: 30,
    name: 'Whitney Mullins',
  },
  {
    index: 31,
    name: 'Shannon Marshall',
  },
  {
    index: 32,
    name: 'Boone Mcgee',
  },
  {
    index: 33,
    name: 'Denise Booth',
  },
  {
    index: 34,
    name: 'Audrey Milli',
  },
  {
    index: 35,
    name: 'Austin Jack',
  },
  {
    index: 36,
    name: 'Amda Hells',
  },
];

const ContactScreen = ({navigation}) => {
  const [contacts, setContacts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [flag, setFlag] = useState(false);

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
        return item.name[0].toUpperCase() === currChar;
      });
      if (currContacts.length > 0) {
        currContacts.sort((a, b) => a.name.localeCompare(b.name));
        obj.data = currContacts;
        contactsArr.push(obj);
      }
    }
    return contactsArr;
  };
  useEffect(() => {
    setContacts(getData(contactlist));
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
      var n = item.name.toLowerCase();
      var m = item.name.toLowerCase();
      if (n.includes(formattedQuery) || m.includes(formattedQuery)) {
        temp.push(item);
      }
    });
    //logger("set the follower list according to search results", "info");
    setContacts(getData(temp));
  };
  return (
    <View style={[styles.container]}>
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
          onChangeText={(text) => handleSearch(text)}
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
            <Text style={styles.name}>{item.name}</Text>
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
      <Ionicons
        name="md-add-circle-sharp"
        color="#2a2e43"
        size={42}
        style={{position: 'absolute', bottom: 20, right: 20}}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignSelf: 'stretch',
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
