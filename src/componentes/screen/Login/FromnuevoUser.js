import { EmailAuthProvider, getAuth, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import React from "react";
import { StyleSheet } from "react-native";
import { Button, Modal, Portal, Text, TextInput } from "react-native-paper";

const FromnuevoUser = (props) => {
    const [visible, setVisible] = React.useState(false);
    const [newPassword, setNewPassword] = React.useState("");
    const [currentPassword, setCurrentPassword] = React.useState("");
    const auth = getAuth();

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
            }
        } catch (error) {
            console.error(error);
            alert("Error al actualizar la contraseña. Verifica la contraseña actual e inténtalo de nuevo.");
        }
    };

    return (
        <>
            <Portal>
                <Modal
                    visible={visible}
                    onDismiss={hideModal}
                    contentContainerStyle={styles.containerStyle}
                >
                    <Text style={styles.text}>Cambiar Contraseña</Text>
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
                    <Button style={styles.button} onPress={handlePasswordChange}>
                        Cambiar Contraseña
                    </Button>
                </Modal>
            </Portal>
            <Button style={styles.button} onPress={showModal}>
                Cambiar Contraseña
            </Button>
        </>
    );
};

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: "white",
        padding: 20,
    },
    button: {
        marginTop: 20,
        backgroundColor: "#FF6F61",
    },
    text: {
        fontSize: 16,
        color: "#333333",
    },
    input: {
        marginTop: 15,
    },
});

export default FromnuevoUser;

