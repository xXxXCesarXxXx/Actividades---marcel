// src/componentes/screen/Login/Logginp2.js
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Button, PaperProvider, Text, TextInput } from "react-native-paper";
import FirebaseConfig from "../../../FirebaseConfig";

const Logginp2 = () => {
    const navigation = useNavigation();
    const auth = getAuth(FirebaseConfig.app);

    const [user, onChangeUser] = React.useState("");
    const [Password, onChangePass] = React.useState("");
    const [verpassword, SetVerPassword] = React.useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setIsAuthenticated(!!user);
        });
        return unsubscribe;
    }, [auth]);

    const crearcuenta = () => {
        createUserWithEmailAndPassword(auth, user, Password)
            .then((UserCredential) => {
                console.log("Cuenta creada exitosamente");
                Alert.alert("Cuenta creada");
                navigation.replace("Dash");
            })
            .catch((error) => {
                console.log("Error al crear cuenta:", error);
                let errorMessage = "Ha ocurrido un error durante la creación de la cuenta.";
                switch (error.code) {
                    case 'auth/invalid-email':
                        errorMessage = "El correo electrónico proporcionado no es válido.";
                        break;
                    case 'auth/email-already-in-use':
                        errorMessage = "Ya existe una cuenta con este correo electrónico.";
                        break;
                    case 'auth/weak-password':
                        errorMessage = "La contraseña debe tener al menos 6 caracteres.";
                        break;
                    default:
                        errorMessage = error.message;
                        break;
                }
                Alert.alert("Error al crear cuenta", errorMessage);
            });
    };

    const loggin = () => {
        signInWithEmailAndPassword(auth, user, Password)
            .then((UserCredential) => {
                console.log("Inicio de sesión exitoso");
                const user = UserCredential.user;
                Alert.alert("Haz iniciado sesión", user.email);
                navigation.replace("Dash");
            })
            .catch((error) => {
                console.log("Error al iniciar sesión:", error);
                let errorMessage = "Ha ocurrido un error durante el inicio de sesión.";
                switch (error.code) {
                    case 'auth/invalid-email':
                        errorMessage = "El correo electrónico proporcionado no es válido.";
                        break;
                    case 'auth/user-not-found':
                        errorMessage = "No hay ningún usuario registrado con este correo electrónico.";
                        break;
                    case 'auth/wrong-password':
                        errorMessage = "La contraseña proporcionada es incorrecta.";
                        break;
                    default:
                        errorMessage = error.message;
                        break;
                }
                Alert.alert("Error de inicio de sesión", errorMessage);
            });
    };

    const funverpassword = () => {
        SetVerPassword(!verpassword);
    };

    return (
        <PaperProvider>
            <View style={styles.container}>
                <Text style={styles.title}>Bienvenido</Text>
                <Text style={styles.subtitle}>Inicia sesión</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        label="Correo"
                        onChangeText={onChangeUser}
                        keyboardType="email-address"
                        value={user}
                        style={styles.input}
                    />
                    <TextInput
                        style={styles.input}
                        label="Contraseña"
                        onChangeText={onChangePass}
                        secureTextEntry={verpassword}
                        value={Password}
                        right={<TextInput.Icon icon="eye" onPress={funverpassword} />}
                    />
                    <Button
                        theme={{ colors: { primary: "#FF6F61" } }}
                        style={styles.button}
                        icon="login"
                        mode="contained"
                        onPress={loggin}
                    >
                        Ingresar
                    </Button>
                    <Button
                        theme={{ colors: { primary: "#FF6F61" } }}
                        style={styles.button}
                        icon="login"
                        mode="contained"
                        onPress={crearcuenta}
                    >
                        Registrarse
                    </Button>
                </View>
            </View>
        </PaperProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        flex: 1,
        backgroundColor: "#F9F9F9"
    },
    title: {
        textAlign: "center",
        fontSize: 30,
        color: "#333333"
    },
    subtitle: {
        textAlign: "center",
        fontSize: 20,
        color: "#555555"
    },
    inputContainer: {
        padding: 15,
    },
    input: {
        marginTop: 15,
        backgroundColor: "white",
        padding: 10,
        borderRadius: 10
    },
    button: {
        marginTop: 20,
        backgroundColor: "#FF6F61"
    }
});

export default Logginp2;
