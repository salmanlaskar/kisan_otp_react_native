import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList, RefreshControl} from 'react-native';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import {getMessage} from '../../redux'
const MessageScreen = ({message,getMessage}) => {
  const months = [
    'Jan',
    'Feb',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const [refreshing,setRefreshing]=useState(false)
  const renderPost = (post, index) => {
    return (
      <View>
        {!index ||
        new Date(post.receivedMessageTimeStamp).toDateString() !=
          new Date(
            message.data[index - 1].receivedMessageTimeStamp,
          ).toDateString() ? (
          <View style={[styles.date, index === 0 ? {paddingTop: 20} : {}]}>
            <Text style={styles.dateText}>
              {new Date(post.receivedMessageTimeStamp).toDateString() ==
              new Date().toDateString()
                ? 'Today'
                : months[
                    parseInt(new Date(post.receivedMessageTimeStamp).getMonth())
                  ] +
                  ' ' +
                  new Date(post.receivedMessageTimeStamp).getDate() +
                  ', ' +
                  new Date(post.receivedMessageTimeStamp).getFullYear()}
            </Text>
          </View>
        ) : null}
        <View style={styles.chat}>
          <Text style={[styles.mes, {fontFamily: 'Poppins-Medium'}]}>
            {post.firstName + ' ' + post.lastName}
          </Text>
          <Text style={[styles.mes, {fontSize: 12}]}>({post.phoneNumber})</Text>
          <Text style={styles.mes}>{post.message}</Text>
          <Text style={styles.time}>
            {new Date(post.receivedMessageTimeStamp).toLocaleTimeString(
              'en-US',
              {hour: 'numeric', hour12: true, minute: 'numeric'},
            )}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.header}>
      <Spinner
        visible={message.loading}
        textContent={'loading...'}
        textStyle={{color: '#FFF', fontSize: 12, fontFamily: 'Poppins-Medium'}}
      />
      <FlatList
        data={message.data}
        renderItem={({item, index}) => renderPost(item, index)}
        keyExtractor={(item) => item.receivedMessageTimeStamp.toString()}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            colors={['#9Bd35A', '#689F38']}
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              getMessage();
              setRefreshing(false);
            }}
          />
        }
      />
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    backgroundColor: '#ffffff',
  },
  date: {
    fontSize: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  dateText: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    textAlign: 'center',
    fontSize: 10,
    color: '#FFFFFF',
    fontFamily: 'Poppins-Regular',
    backgroundColor: '#aaaaaa',
    borderRadius: 10,
  },
  chat: {
    backgroundColor: '#E4E4E7',
    marginLeft: 16,
    marginBottom: 12,
    borderTopLeftRadius: 15,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingTop: 9,
    paddingBottom: 4,
    maxWidth: '72%',
  },
  mes: {
    color: '#4F4F4F',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    marginRight: 24,
  },
  time: {
    fontSize: 10,
    color: '#4F4F4F',
    fontFamily: 'Poppins-Regular',
    textAlign: 'right',
  },
});
const mapStateToProps = state => ({
  message: state.message
});
export default connect(mapStateToProps,{getMessage})(MessageScreen);
