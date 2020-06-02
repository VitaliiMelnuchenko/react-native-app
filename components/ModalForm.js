import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from "react-native";

const win = Dimensions.get('window');

const ModalForm = (props) => {
  const onSubmit = async () => {
    try {
      await fetch('https://ks3fd1rdfb.execute-api.us-west-2.amazonaws.com/default/set_name', {
        method: 'POST',
        body: JSON.stringify({
          user_id: props.userId,
          username: props.name,
        })
      });
      await props.updateData();
      props.closeModal();
    } catch(err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity onPress={props.closeModal}>
              <Text style={styles.closeIcon}>X</Text>
            </TouchableOpacity>
            
            <Text style={styles.modalText}>Enter name</Text>
            <TextInput
              placeholder='Name'
              style={styles.input}
              defaultValue={props.name}
              onChangeText={props.handleNameChange}
            />
            <TouchableHighlight
              style={styles.submitButton}
              onPress={onSubmit}
            >
              <Text style={styles.textStyle}>Set Name</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 0,
  },
  modalView: {
    margin: 20,
    width: win.width / 1.2,
    backgroundColor: "white",
    borderRadius: 6,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  submitButton: {
    backgroundColor: "#35bdb2",
    borderRadius: 8,
    padding: 10,
    elevation: 2,
    marginHorizontal: 40,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    textAlign: "center",
    fontSize: 16,
    opacity: .6,
  },
  input: {
    textAlign: 'center',
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 40,
    borderRadius: 8,
    padding: 5,
    fontSize: 18,
    backgroundColor: 'rgba(230, 230, 230, 0.7)',
    opacity: .8,
  },
  closeIcon: {
    textAlign: 'right',
    opacity: .5,
    padding: 5,
  }
});

export default ModalForm;
