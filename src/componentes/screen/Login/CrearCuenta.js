import { StyleSheet, Text, View } from "react-native";

const CrearCuenta = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Crear Cuenta</Text>
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
    text: {
        fontSize: 18,
        color: "#333333"
    }
});

export default CrearCuenta;
