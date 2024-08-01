import { useNavigation } from '@react-navigation/native';
import { getAuth, signOut } from "firebase/auth";
import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';

const ScreenSetting = () => {
    const navegacion = useNavigation();
    const cerrarsesion = () => {
        const auth = getAuth();
        signOut(auth)
            .then(() => {
                Alert.alert('Aviso', 'Tu sesión se ha cerrado');
                navegacion.navigate('Login');
            })
            .catch((error) => {
                console.error('Error cerrando la sesión: ', error);
            });
    };
    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Cesar Enrique Bernal Zurita</Text>
            <Button
                style={styles.button}
                icon="logout"
                mode="contained"
                onPress={() => cerrarsesion()}
            >
                Cerrar Sesión
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#F9F9F9"
    },
    headerText: {
        marginTop: 20,
        textAlign: 'center',
        fontSize: 18,
        color: "#333333"
    },
    button: {
        marginTop: 40,
        backgroundColor: "#FF6F61"
    }
});

export default ScreenSetting;
