import { useNavigation } from '@react-navigation/native';
import { deleteDoc, doc } from 'firebase/firestore';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { DataTable, IconButton } from "react-native-paper";
import FirebaseConfig from '../../../FirebaseConfig';

const TablaUsuario2 = ({ datosuser, obtenerdatos }) => {
  const bd = FirebaseConfig.db;
  const navigation = useNavigation();

  const eliminarUsuario = async (id) => {
    try {
      const docRef = doc(bd, "users", id);
      await deleteDoc(docRef);
      console.log("Documento eliminado con ID:", id);
      obtenerdatos();
    } catch (e) {
      console.error("Error eliminando documento: ", e);
    }
  };

  return (
    <DataTable style={styles.table}>
      <DataTable.Header>
        <DataTable.Title>Nombre</DataTable.Title>
        <DataTable.Title>Email</DataTable.Title>
        <DataTable.Title>Perfil</DataTable.Title>
        <DataTable.Title numeric>Acción</DataTable.Title>
      </DataTable.Header>

      {datosuser.map((item) => (
        <DataTable.Row key={item.id}>
          <DataTable.Cell>{item.nombre}</DataTable.Cell>
          <DataTable.Cell>{item.email}</DataTable.Cell>
          <DataTable.Cell>{item.perfil}</DataTable.Cell>
          <DataTable.Cell>
            <View style={styles.iconContainer}>
              <IconButton
                size={20}
                icon="square-edit-outline"
                color="#FF6F61"
                onPress={() => navigation.navigate('EditarUser', { userId: item.id })}
              />
              <IconButton
                size={20}
                icon="trash-can-outline"
                color="#FF6F61"
                onPress={() => eliminarUsuario(item.id)}
              />
              <IconButton
                size={20}
                icon="eye"
                color="#FF6F61"
                onPress={() => navigation.navigate('Detalles', { userId: item.id })}
              />
            </View>
          </DataTable.Cell>
        </DataTable.Row>
      ))}
    </DataTable>
  );
};

export default TablaUsuario2;

const styles = StyleSheet.create({
  table: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
