import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { DataTable } from 'react-native-paper';

const TablaUser = () => {
  const data = [
    { usuario: 'Jony Bravo', email: '789@gmail.com', perfil: 'Admin', act: '' },
    { usuario: 'Jose', email: '456@gmail.com', perfil: 'Admin', act: '' },
    { usuario: 'Joseph', email: '123@gmail.com', perfil: 'Admin', act: '' },
  ];

  return (
    <View style={styles.container}>
      <DataTable style={styles.table}>
        <DataTable.Header>
          <DataTable.Title>Usuario</DataTable.Title>
          <DataTable.Title>Email</DataTable.Title>
          <DataTable.Title>Perfil</DataTable.Title>
          <DataTable.Title>Act</DataTable.Title>
        </DataTable.Header>

        {data.map((item, index) => (
          <DataTable.Row key={index}>
            <DataTable.Cell>{item.usuario}</DataTable.Cell>
            <DataTable.Cell>{item.email}</DataTable.Cell>
            <DataTable.Cell>{item.perfil}</DataTable.Cell>
            <DataTable.Cell>
              <View style={styles.iconContainer}>
                <FontAwesome name="edit" size={24} color="#FF6F61" />
                <FontAwesome name="trash" size={24} color="#FF6F61" />
              </View>
            </DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </View>
  );
};

export default TablaUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  table: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
