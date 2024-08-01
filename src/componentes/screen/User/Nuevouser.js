import { addDoc, collection } from "firebase/firestore";
import React from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import FirebaseConfig from "../../../FirebaseConfig";

const Nuevouser = ({ route }) => {
  const conexionbd = FirebaseConfig.db;

  const obtenerdatos = route.params.funcionobtenerdatos;
  const [nombre, setNombre] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [usuario, setUsuario] = React.useState("");
  const [perfil, setPerfil] = React.useState("");
  const [password, setPassword] = React.useState("123456");

  const AgregarUser = async () => {
    try {
      const docRef = await addDoc(collection(conexionbd, "users"), {
        nombre: nombre,
        email: email,
        usuario: usuario,
        perfil: perfil,
        password: password,
      });
      console.log("Document written with ID: ", docRef.id);
      limpiarInput();
      obtenerdatos();
      Alert.alert("Dato guardado");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const limpiarInput = () => {
    setNombre("");
    setEmail("");
    setUsuario("");
    setPerfil("");
    setPassword("");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        label="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />

      <TextInput
        style={styles.input}
        label="Email"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        label="Usuario"
        value={usuario}
        onChangeText={setUsuario}
      />

      <TextInput
        style={styles.input}
        label="Perfil"
        value={perfil}
        onChangeText={setPerfil}
      />

      <View style={styles.buttonContainer}>
        <Button
          icon="camera"
          mode="contained"
          onPress={AgregarUser}
          style={styles.button}
        >
          Registrar
        </Button>
        <Button
          icon="cancel"
          mode="contained"
          onPress={() => console.log("Pressed")}
          style={styles.button}
        >
          Cancelar
        </Button>
      </View>
    </View>
  );
};

export default Nuevouser;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#F9F9F9',
  },
  input: {
    marginTop: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#FF6F61',
  },
  buttonContainer: {
    marginTop: 20,
  },
});

