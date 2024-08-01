// src/componentes/screen/Dash/MenuPrincipal.js
import { useNavigation } from '@react-navigation/native';
import { EmailAuthProvider, getAuth, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Modal, PaperProvider, Portal, Text, TextInput } from 'react-native-paper';

const MenuPrincipal = () => {
  const navigation = useNavigation();
  const [visible, setVisible] = React.useState(false);
  const [newPassword, setNewPassword] = React.useState("");
  const [currentPassword, setCurrentPassword] = React.useState("");
  const auth = getAuth();

  const navigateToUser = () => {
    navigation.navigate('User');
  };

  const navigateToSettings = () => {
    navigation.navigate('Ajustes');
  };

  const navigateToLuces = () => {
    navigation.navigate('Luces');
  };

  const navigateToPuertas = () => {
    navigation.navigate('Puertas');
  };

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const handlePasswordChange = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const credential = EmailAuthProvider.credential(user.email, currentPassword);
        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, newPassword);
        alert("Contraseña actualizada exitosamente");
        hideModal();
      }
    } catch (error) {
      console.error(error);
      alert("Error al actualizar la contraseña. Verifica la contraseña actual e inténtalo de nuevo.");
    }
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text style={styles.title}>Menú Principal</Text>
        <Button
          mode="contained"
          onPress={navigateToUser}
          style={styles.button}
          labelStyle={styles.buttonLabel}
          contentStyle={styles.buttonContent}
        >
          Ir a Usuarios
        </Button>
        <Button
          mode="contained"
          onPress={navigateToSettings}
          style={styles.button}
          labelStyle={styles.buttonLabel}
          contentStyle={styles.buttonContent}
        >
          Ir a Ajustes
        </Button>
        <Button
          mode="contained"
          onPress={navigateToLuces}
          style={styles.button}
          labelStyle={styles.buttonLabel}
          contentStyle={styles.buttonContent}
        >
          Ir a Luces
        </Button>
        <Button
          mode="contained"
          onPress={navigateToPuertas}
          style={styles.button}
          labelStyle={styles.buttonLabel}
          contentStyle={styles.buttonContent}
        >
          Ir a Puertas
        </Button>
        <Button
          mode="contained"
          onPress={showModal}
          style={styles.button}
          labelStyle={styles.buttonLabel}
          contentStyle={styles.buttonContent}
        >
          Cambiar Contraseña
        </Button>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={styles.modalContainer}
          >
            <Text style={styles.modalTitle}>Cambiar Contraseña</Text>
            <TextInput
              label="Contraseña Actual"
              onChangeText={setCurrentPassword}
              secureTextEntry
              style={styles.input}
            />
            <TextInput
              label="Nueva Contraseña"
              onChangeText={setNewPassword}
              secureTextEntry
              style={styles.input}
            />
            <Button
              mode="contained"
              onPress={handlePasswordChange}
              style={styles.modalButton}
              labelStyle={styles.buttonLabel}
            >
              Cambiar Contraseña
            </Button>
          </Modal>
        </Portal>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#333333',
    fontWeight: 'bold',
  },
  button: {
    marginTop: 15,
    backgroundColor: '#FF6F61',
    width: '80%',
    justifyContent: 'center',
  },
  buttonLabel: {
    color: 'white',
    fontSize: 16,
  },
  buttonContent: {
    height: 50,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 20,
    color: '#333333',
    fontWeight: 'bold',
  },
  input: {
    marginTop: 15,
  },
  modalButton: {
    marginTop: 20,
    backgroundColor: '#FF6F61',
  },
});

export default MenuPrincipal;
