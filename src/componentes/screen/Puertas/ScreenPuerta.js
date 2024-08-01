import { child, get, getDatabase, ref, update } from "firebase/database";
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import FirebaseConfig from "../../../FirebaseConfig";

const ScreenPuerta = () => {
    const [estadoPuerta, setEstadoPuerta] = useState(null);

    useEffect(() => {
        obtenerDatos();
    }, []);

    const obtenerDatos = async () => {
        const db = getDatabase(FirebaseConfig.app);
        const dbRef = ref(db);

        try {
            const snapshot = await get(child(dbRef, "CASA/Puerta"));
            if (snapshot.exists()) {
                const datosObtenidos = snapshot.val();
                setEstadoPuerta(datosObtenidos.status);
            } else {
                console.log("No se encontraron datos para la puerta");
            }
        } catch (error) {
            console.error("Error obteniendo datos:", error);
        }
    };

    const cambiarEstadoPuerta = async () => {
        const nuevoEstado = estadoPuerta === 1 ? 0 : 1;
        const db = getDatabase(FirebaseConfig.app);
        const referencia = ref(db, "CASA/Puerta");

        try {
            await update(referencia, { status: nuevoEstado });
            console.log("Estado de la puerta actualizado correctamente");
            setEstadoPuerta(nuevoEstado);
        } catch (error) {
            console.error("Error actualizando estado de la puerta:", error);
        }
    };

    return (
        <View style={styles.container}>
            {estadoPuerta !== null ? (
                <>
                    <Text style={styles.text}>Puerta: {estadoPuerta === 1 ? "Abierta" : "Cerrada"}</Text>
                    <Button
                        icon={estadoPuerta === 1 ? "door-open" : "door-closed"}
                        mode={estadoPuerta === 1 ? "contained" : "outlined"}
                        onPress={cambiarEstadoPuerta}
                        style={styles.button}
                    >
                        {estadoPuerta === 1 ? "Cerrar" : "Abrir"} Puerta
                    </Button>
                </>
            ) : (
                <Text style={styles.text}>Cargando...</Text>
            )}
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
        fontSize: 16,
        color: "#333333"
    },
    button: {
        marginTop: 20,
        backgroundColor: "#FF6F61"
    }
});

export default ScreenPuerta;
