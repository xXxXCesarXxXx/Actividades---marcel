import { child, get, getDatabase, ref, update } from "firebase/database";
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import FirebaseConfig from "../../../FirebaseConfig";

const ScreenLuces = () => {
    const [luzCocina, setLuzCocina] = useState(null);

    useEffect(() => {
        obtenerDatos();
    }, []);

    const obtenerDatos = async () => {
        const db = getDatabase(FirebaseConfig.app);
        const dbRef = ref(db);

        try {
            const snapshot = await get(child(dbRef, "CASA/Luz/Cocina"));
            if (snapshot.exists()) {
                const datosObtenidos = snapshot.val();
                setLuzCocina(datosObtenidos.status);
            } else {
                console.log("No se encontraron datos para la luz de la cocina");
            }
        } catch (error) {
            console.error("Error obteniendo datos:", error);
        }
    };

    const cambiarEstadoLuz = async () => {
        const nuevoEstado = luzCocina === 1 ? 0 : 1;
        const db = getDatabase(FirebaseConfig.app);
        const referencia = ref(db, "CASA/Luz/Cocina");

        try {
            await update(referencia, { status: nuevoEstado });
            console.log("Estado de la luz actualizado correctamente");
            setLuzCocina(nuevoEstado);
        } catch (error) {
            console.error("Error actualizando estado de la luz:", error);
        }
    };

    return (
        <View style={styles.container}>
            {luzCocina !== null ? (
                <>
                    <Text style={styles.text}>Luz Cocina: {luzCocina === 1 ? "Encendida" : "Apagada"}</Text>
                    <Button
                        icon={luzCocina === 1 ? "lightbulb-on" : "lightbulb-off"}
                        mode={luzCocina === 1 ? "contained" : "outlined"}
                        onPress={cambiarEstadoLuz}
                        style={styles.button}
                    >
                        {luzCocina === 1 ? "Apagar" : "Encender"} Luz Cocina
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

export default ScreenLuces;

