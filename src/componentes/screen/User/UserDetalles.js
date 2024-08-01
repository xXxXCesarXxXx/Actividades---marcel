import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Button, Card } from 'react-native-paper';
import FirebaseConfig from '../../../FirebaseConfig';

const UserDetalles = ({ route, navigation }) => {
  const { userId } = route.params;
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const docRef = doc(FirebaseConfig.db, "users", userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (e) {
        console.error("Error fetching document: ", e);
      }
    };

    fetchUserData();
  }, [userId]);

  if (!userData) {
    return <View style={styles.container}><Text style={styles.loadingText}>Cargando...</Text></View>;
  }

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{ uri: 'https://via.placeholder.com/150' }}
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>Detalles del Usuario</Text>
          <Text style={styles.label}>Nombre:</Text>
          <Text style={styles.text}>{userData.nombre}</Text>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.text}>{userData.email}</Text>
          <Text style={styles.label}>Usuario:</Text>
          <Text style={styles.text}>{userData.usuario}</Text>
          <Text style={styles.label}>Perfil:</Text>
          <Text style={styles.text}>{userData.perfil}</Text>
        </View>
        <Button
          mode="contained"
          color="#FF6F61"
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          Volver
        </Button>
      </Card>
    </View>
  );
};

export default UserDetalles;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    padding: 15,
    justifyContent: 'center',
  },
  card: {
    borderRadius: 10,
    elevation: 4,
    padding: 15,
    backgroundColor: '#FFFFFF',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#EFEFEF',
  },
  infoContainer: {
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555555',
  },
  text: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    alignSelf: 'center',
    width: '100%',
    backgroundColor: "#FF6F61",
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#555555',
  },
});

