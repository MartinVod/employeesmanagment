import 'react-native-gesture-handler';
import React from 'react';
import IndexPage from './src/pages/IndexPage';
import {Provider} from './src/context/EmployeesContext'
import UsersProvider from './src/context/UsersContext'
import ShowEmployee from './src/pages/showEmployee'
import CreateEmployee from './src/pages/CreateEmployee'
import EditEmployee from './src/pages/EditEmployee'
import { NavigationContainer } from '@react-navigation/native';
import Login from './src/pages/Login'
import Register from './src/pages/Register'
import { createStackNavigator } from '@react-navigation/stack';
import {  I18nManager } from 'react-native';



const Stack = createStackNavigator();

function Nav() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ gestureEnabled: true }}
    >
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ title: 'Login',headerStyle: {
            backgroundColor: '#8aae92',
          }, }}
      />
      <Stack.Screen
        name="Index"
        component={IndexPage}
        options={{ title: 'Employees Management',headerStyle: {
            backgroundColor: '#8aae92',
            borderColor: '#8aae92',
            borderWidth: 0,
          }, }}
      />
      <Stack.Screen
        name="ShowEmployee"
        component={ShowEmployee}
        options={{headerStyle: {
            backgroundColor: '#8aae92',
          },}}
      />
      <Stack.Screen
        name="EditEmployee"
        component={EditEmployee}
        options={{headerStyle: {
            backgroundColor: '#8aae92',
          },}}
      />
      <Stack.Screen
        name="CreateEmployee"
        component={CreateEmployee}
        options={{headerStyle: {
            backgroundColor: '#8aae92',
          },}}
      />
            <Stack.Screen
        name="Register"
        component={Register}
        options={{headerStyle: {
            backgroundColor: '#8aae92',
          },}}
      />
    </Stack.Navigator>
  );
}

   const App = ()=> {
    const ReactNative = require('react-native');
try {
    ReactNative.I18nManager.allowRTL(false);
    I18nManager.forceRTL(false);
} catch (e) {
    console.log(e);
}
      return <Provider><UsersProvider><NavigationContainer><Nav /></NavigationContainer></UsersProvider></Provider>
    }

export default App;