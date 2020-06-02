import React, { useState, useEffect } from 'react';
import { Platform, StatusBar, StyleSheet, View, Text, FlatList } from 'react-native';

import Card from './components/Card';
import ModalForm from './components/ModalForm';
import useCachedResources from './hooks/useCachedResources';

import _ from 'lodash'

export default function App(props) {
  const isLoadingComplete = useCachedResources();
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');
  const [data, setData] = useState('');

  const getData = async () => {
    try {
      const res = await (await fetch('https://wd7f6u5xqi.execute-api.us-west-2.amazonaws.com/default/get_all_faces')).json();
      const data = Object.entries(_.groupBy(res, 'user_id')).map(
        ([key, value]) => _.last(value.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)))
      );
      setData(data);
    } catch (err) {
      console.log(err)
    }
  };

  useEffect(() => {
    getData();
  }, []);
  
  return (
    <View style={styles.container}>
      <StatusBar />
      <Text style={styles.header}>Security App</Text>
      <ModalForm
        modalVisible={modalVisible}
        closeModal={() => setModalVisible(false)}
        name={name}
        userId={userId}
        updateData={getData}
        handleNameChange={name => setName(name)}
      />
      <FlatList
        data={data}
        renderItem={(image) => <Card
          image={image}
          openModal={() => setModalVisible(true)}
          setName={(name) => name !== 'unknown' ? setName(name) : setName('') }
          setUserId={(userId) => setUserId(userId)}
        />}
        keyExtractor={(item) => item.user_id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(230, 230, 230, 0.7)',
  },
  header: {
    paddingTop: 20,
    height: 60,
    backgroundColor: 'black',
    color: '#ccc',
    fontSize: 18,
    textAlign: 'center',
  },
  logo: {
    width: 66,
    height: 58,
  },
});
