import * as React from 'react';
import { View, Image, StyleSheet, Text, Dimensions, TouchableWithoutFeedback, LinearGradient } from 'react-native';

const photoStore = 'https://visitorsrasp.s3-us-west-2.amazonaws.com/';
const win = Dimensions.get('window');

const Card = (props) => {
  return  <TouchableWithoutFeedback
    onPress={() => {
      props.openModal();
      props.setName(props.image.item.username);
      props.setUserId(props.image.item.user_id);
    }}
  >
    <View style={styles.container} >
      <Image
        style={styles.img}
        source={{
          uri: `${photoStore}${props.image.item.filename}`
        }}
      />
      <Text style={styles.timestamp}>{props.image.item.timestamp.split('.')[0]}</Text>
      <View style={styles.wrapper}>
        <Text style={(props.image.item.username === 'unknown') ? { ...styles.header, ...styles.unknoun } : styles.header }>
          {props.image.item.username}
        </Text>
      </View>
    </View>
  </TouchableWithoutFeedback>
};

const styles = StyleSheet.create({
  container: {
    margin: 15,
    backgroundColor: '#eee',
    borderRadius: 5,
    shadowColor: "rgb(200, 0, 0)",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
  img: {
    width: win.width - 30,
    height: win.width / 1.5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  header: {
    fontSize: 24,
    fontWeight: '800',
    textTransform: 'capitalize',
    textAlign: 'center',
    color: '#35bdb2'
  },
  wrapper: {
    padding: 10,
  },
  timestamp: {
    textTransform: 'uppercase',
    fontSize: 18,
    textAlign: 'right',
    paddingRight: 5,
    color: '#eee',
    backgroundColor: '#333',
  },
  unknoun: {
    color: 'rgba(250, 0, 0, 0.6)'
  }
});

export default Card;
