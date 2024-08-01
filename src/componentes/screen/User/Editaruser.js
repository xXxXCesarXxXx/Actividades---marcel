import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import FirebaseConfig from "../../../FirebaseConfig";

const Editaruser = ({ route, navigation }) => {
  const { userId, obtenerdatos } = route.params;
  const bd = FirebaseConfig.db;

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [usuario, setUsuario] = useState("");
  const [perfil, setPerfil] = useState("");
  const [password, setPassword] = useState("123456");

  useEffect(() => {
    const obtenerUsuario = async () => {
      try {
        const docRef = doc(bd, "users", userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setNombre(userData.nombre);
          setEmail(userData.email);
          setUsuario(userData.usuario);
          setPerfil(userData.perfil);
        } else {
          console.log("No such document!");
        }
      } catch (e) {
        console.error("Error fetching document: ", e);
      }
    };

    obtenerUsuario();
  }, [userId]);

  const actualizarUsuario = async () => {
    try {
      const docRef = doc(bd, "users", userId);
      await updateDoc(docRef, {
        nombre: nombre,
        email: email,
        usuario: usuario,
        perfil: perfil,
        password: password,
      });
      console.log("Document updated with ID: ", userId);
      Alert.alert("Usuario actualizado");
      obtenerdatos();
      navigation.goBack();
    } catch (e) {
      console.error("Error updating document: ", e);
    }
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
          icon="content-save"
          mode="contained"
          onPress={actualizarUsuario}
          style={styles.button}
        >
          Guardar
        </Button>
        <Button
          icon="cancel"
          mode="contained"
          onPress={() => navigation.goBack()}
          style={styles.button}
        >
          Cancelar
        </Button>
      </View>
    </View>
  );
};

export default Editaruser;

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
