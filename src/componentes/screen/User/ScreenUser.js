import { useNavigation } from '@react-navigation/native';
import { collection, getDocs } from 'firebase/firestore';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card } from 'react-native-paper';
import FirebaseConfig from '../../../FirebaseConfig';
import TablaUsuario2 from './TablaUsuario2';

const ScreenUser = () => {
  const Navegacion = useNavigation();
  const bd = FirebaseConfig.db;
  
  const [datos, setDatos] = React.useState([]);

  const obtenerdatos = async () => {
    try {
      const querySnapshot = await getDocs(collection(bd, "users"));
      const user = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        user.push({
          id: doc.id,
          nombre: data.nombre,
          email: data.email,
          usuario: data.usuario,
          perfil: data.perfil,
        });
      });
      setDatos(user);
    } catch (e) {
      console.error("Error fetching documents: ", e);
    }
  };

  React.useEffect(() => {
    obtenerdatos();
  }, []);

  const handleEdit = (userId) => {
    Navegacion.navigate("EditarUser", { userId: userId, obtenerdatos: obtenerdatos });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Button
          theme={{ colors: { primary: "#FF6F61" } }}
          style={styles.button}
          icon="account-plus"
          mode="contained"
          onPress={() => Navegacion.navigate("nuevouser", { hola: "Hola mundo", funcionobtenerdatos: obtenerdatos })}
        >
          Nuevo Usuario
        </Button>
        
        <Card style={styles.card}>
          <TablaUsuario2
            datosuser={datos}
            obtenerdatos={obtenerdatos}
            onEdit={handleEdit}
          />
        </Card>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#F9F9F9',
  },
  button: {
    marginTop: 15,
    width: '100%',
    backgroundColor: '#FF6F61',
  },
  card: {
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'white',
  },
});

export default ScreenUser;
