import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {AuthProvider, Registration, Login, createPrivateNavigator} from './Authentication';
import UserMain from './User/UserMain';
import AdminMain from './Admin/AdminMain';

const RootStack = createPrivateNavigator();
const Comps = { AdminMain, UserMain };

function App() {
  return (
    <RootStack.Navigator screenOptions={{title: "PETS ONLINE", headerTitleStyle: {textAlign: 'center'}}}>
      <RootStack.HomeScreen name="Home" component={Login} comps={Comps} />
      <RootStack.Screen name="Login" component={Login} />
      <RootStack.Screen name="Registration" component={Registration} />
    </RootStack.Navigator>
  );
}

export default function ProvidedApp() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <App />
      </NavigationContainer>
    </AuthProvider>
  )
}