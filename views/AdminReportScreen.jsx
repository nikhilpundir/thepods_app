import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { AuthContext } from '../context/AuthContext';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
const AdminReportScreen = () => {
  const { logout } = useContext(AuthContext);
  const handleLogout = () => {
    logout();

  }

  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>Admin Reports</Text>
      <TouchableOpacity style={styles.button} onPress={handleTask1}>
        <Text style={styles.buttonText}>Generate Report 1</Text>
        <Text style={styles.buttonSubText}>Task 1 Description</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleTask2}>
        <Text style={styles.buttonText}>Generate Report 2</Text>
        <Text style={styles.buttonSubText}>Task 2 Description</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleTask3}>
        <Text style={styles.buttonText}>Generate Report 3</Text>
        <Text style={styles.buttonSubText}>Task 3 Description</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleTask4}>
        <Text style={styles.buttonText}>Generate Report 4</Text>
        <Text style={styles.buttonSubText}>Task 4 Description</Text>
      </TouchableOpacity>
      <Pressable onPress={handleLogout}>
        <View style={styles.logoutButtonContainer}>
          <Icon name="logout" size={23} color="white" />
          <Text style={styles.buttonText}>logout</Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  logoutButtonContainer: {
    borderWidth: 1,
    backgroundColor: "red",
    display: "flex",
    flexDirection: "row",
    gap: 10,
    padding: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 5,
  },
  buttonSubText: {
    color: '#ccc',
    fontSize: 14,
  },
});

export default AdminReportScreen;
