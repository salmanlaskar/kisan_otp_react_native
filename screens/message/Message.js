import React, { useEffect } from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
const MessageScreen = ({navigation}) => {
  const months = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const AllMessages=[
    {receivedMessageTimeStamp:1613961214769,
      message:"Hi. Your OTP is: 123456",
      firstName:"Salman",
      lastName:"Laskar"
    },
    {receivedMessageTimeStamp:1613071214769,
      message:"Hi. Your OTP is: 565645",
      firstName:"Salman",
      lastName:"Laskar"
    },
    {receivedMessageTimeStamp:1613171214769,
      message:"Hi. Your OTP is: 331211",
      firstName:"Salman",
      lastName:"Laskar"
    },
    {receivedMessageTimeStamp:1613271214769,
      message:"Hi. Your OTP is: 897987",
      firstName:"Salman",
      lastName:"Laskar"
    },
    {receivedMessageTimeStamp:1613371214769,
      message:"Hi. Your OTP is: 986561",
      firstName:"Salman",
      lastName:"Laskar"
    },
    {receivedMessageTimeStamp:1613471214769,
      message:"Hi. Your OTP is: 743222",
      firstName:"Salman",
      lastName:"Laskar"
    },
    {receivedMessageTimeStamp:1613431214769,
      message:"Hi. Your OTP is: 657656",
      firstName:"Salman",
      lastName:"Laskar"
    },
    {receivedMessageTimeStamp:1613451214769,
      message:"Hi. Your OTP is: 432424",
      firstName:"Salman",
      lastName:"Laskar"
    },
    {receivedMessageTimeStamp:1613461214769,
      message:"Hi. Your OTP is: 987987",
      firstName:"Salman",
      lastName:"Laskar"
    },
  ]
  AllMessages.sort(function(a,b){return b.receivedMessageTimeStamp-a.receivedMessageTimeStamp})
  const renderPost = (post,index) => {
    return (
          <View>
            {!index||new Date(post.receivedMessageTimeStamp).toDateString()!=new Date(AllMessages[index-1].receivedMessageTimeStamp).toDateString()?<View style={[styles.date,index===0?{paddingTop:20}:{}]}>
              <Text style={styles.dateText}>{new Date(post.receivedMessageTimeStamp).toDateString()==new Date().toDateString()?"Today":months[parseInt(new Date(post.receivedMessageTimeStamp).getMonth())]+" "+new Date(post.receivedMessageTimeStamp).getDate()+", "+new Date(post.receivedMessageTimeStamp).getFullYear()}</Text>
            </View>:null}
              <View style={styles.chat}>
                <Text style={[styles.mes,{fontFamily:'Poppins-Medium'}]}>{post.firstName+" "+post.lastName}</Text>
                <Text style={styles.mes}>{post.message}</Text>
                <Text style={styles.time}>{new Date(post.receivedMessageTimeStamp).toLocaleTimeString('en-US', { hour: 'numeric', hour12: true, minute: 'numeric' })}</Text>
              </View>
          </View>
    );
  };
  useEffect(()=>{
    AllMessages.sort(function(a,b){return a.receivedMessageTimeStamp-b.receivedMessageTimeStamp})
  },[])
  return (
    <View style={styles.header}>
      <FlatList
            data={AllMessages}
            renderItem={({ item,index }) => renderPost(item,index)}
            keyExtractor={(item) => item.receivedMessageTimeStamp.toString()}
            showsVerticalScrollIndicator={false}
          />
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    backgroundColor:'#ffffff',
  },
  date: {
    fontSize: 20,
    alignSelf:"center",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  dateText: {
    paddingVertical:8,
    paddingHorizontal:14,
    textAlign: "center",
    fontSize: 10,
    color: "#FFFFFF",
    fontFamily: "Poppins-Regular",
    backgroundColor: "#aaaaaa",
    borderRadius: 10,
  },
  chat: {
    backgroundColor: "#E4E4E7",
    marginLeft:16,
    marginBottom: 12,
    borderTopLeftRadius: 15,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingTop: 9,
    paddingBottom: 4,
  },
  mes: {
    color: "#4F4F4F",
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    marginRight: 24,
  },
  time: {
    fontSize: 10,
    color: "#4F4F4F",
    fontFamily: "Poppins-Regular",
    textAlign: "right",
  },
});
export default MessageScreen;
