import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useAuth } from '../AuthContext';

const HomeScreen = () => {
  const { user, logout } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {user?.name} 👋</Text>
      <Text style={styles.title}>{user?.email}</Text>
      <View style={styles.button}>
        <Button title="Logout" onPress={logout} />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: '500',
    marginBottom: 24,
    textAlign: 'center',
  },
  button: {
    width: '60%',
  },
});
