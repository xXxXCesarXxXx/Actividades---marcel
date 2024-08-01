import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Navegation from "../Navegation";
import MenuPrincipal from "./Dash/MenuPrincipal";
import CrearCuenta from "./Login/CrearCuenta";
import Logginp2 from "./Login/Logginp2";

const Stack = createStackNavigator();

function MyStackLogin() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Login"
                component={Logginp2}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Crearcuenta"
                component={CrearCuenta}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="MenuPrincipal"
                component={MenuPrincipal}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="Dash"
                component={Navegation}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    );
}

export default function NavegacionPrincipal() {
    return (
        <NavigationContainer>
            <MyStackLogin />
        </NavigationContainer>
    );
}
