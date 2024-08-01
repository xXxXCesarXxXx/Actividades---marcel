import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import MenuPrincipal from "./screen/Dash/MenuPrincipal";
import ScreenLuces from "./screen/Luces/ScreenLuces";
import ScreenPuerta from "./screen/Puertas/ScreenPuerta";
import ScreenSetting from "./screen/Setting/ScreenSetting";
import Editaruser from "./screen/User/Editaruser";
import Nuevouser from "./screen/User/Nuevouser";
import ScreenUser from "./screen/User/ScreenUser";
import UserDetalles from "./screen/User/UserDetalles";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const headerStyle = {
  headerStyle: {
    backgroundColor: "#FF6F61",
  },
  headerTintColor: "#FFFFFF",
  headerTitleStyle: {
    fontWeight: 'bold',
    fontSize: 22,
  },
  headerTitleAlign: 'center',
  headerRight: () => (
    <MaterialCommunityIcons
      name="account-settings"
      size={24}
      color="#FFFFFF"
      style={{ marginRight: 15 }}
      onPress={() => console.log("Settings pressed")}
    />
  ),
};

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Usuarios"
        component={ScreenUser}
        options={{ title: "Usuarios", ...headerStyle }}
      />
      <Stack.Screen
        name="Detalles"
        component={UserDetalles}
        options={{ title: "Detalles de Usuario", ...headerStyle }}
      />
      <Stack.Screen
        name="nuevouser"
        component={Nuevouser}
        options={{ title: "Nuevo Usuario", ...headerStyle }}
      />
      <Stack.Screen
        name="EditarUser"
        component={Editaruser}
        options={{ title: "Editar Usuario", ...headerStyle }}
      />
    </Stack.Navigator>
  );
}

function Mytabs() {
  return (
    <Tab.Navigator
      initialRouteName="MenuPrincipal"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'MenuPrincipal') {
            iconName = 'menu'; // Cambia esto por el ícono que prefieras
          } else if (route.name === 'Luces') {
            iconName = 'lightbulb';
          } else if (route.name === 'Puertas') {
            iconName = 'door';
          } else if (route.name === 'User') {
            iconName = 'account-supervisor-circle';
          } else if (route.name === 'Ajustes') {
            iconName = 'cog';
          }

          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "#FF6F61",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen
        name="Menú"
        component={MenuPrincipal}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="menu" size={size} color={color} />
          ),
          ...headerStyle,
        }}
      />
      <Tab.Screen
        name="Luces"
        component={ScreenLuces}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="lightbulb" size={size} color={color} />
          ),
          ...headerStyle,
        }}
      />
      <Tab.Screen
        name="Puertas"
        component={ScreenPuerta}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="door" size={size} color={color} />
          ),
          ...headerStyle,
        }}
      />
      <Tab.Screen
        name="User"
        component={MyStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-supervisor-circle" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Ajustes"
        component={ScreenSetting}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cog" size={size} color={color} />
          ),
          ...headerStyle,
        }}
      />
    </Tab.Navigator>
  );
}

export default function Navegation() {
  return <Mytabs />;
}
