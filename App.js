import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Navegation2 from './src/componentes/screen/NavegacionPrincipal';

export default function App() {
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Navegation2/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F0F4F8"
    },
});
