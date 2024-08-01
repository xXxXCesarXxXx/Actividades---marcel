import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';

const Formulariouser = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Formulario de Usuario</Text>
      <Button
        mode="contained"
        color="#FF6F61"
        style={styles.button}
        onPress={() => console.log('Formulario enviado')}
      >
        Enviar
      </Button>
    </View>
  );
};

export default Formulariouser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FF6F61',
  },
});
