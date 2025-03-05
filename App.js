import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from './screens/SignInScreen';
import DashboardScreen from './screens/DashboardScreen';
import AddTransactionScreen from './screens/AddTransactionScreen';
import TransactionDetailScreen from './screens/TransactionDetailScreen';
import { TransactionProvider } from './context/TransactionContext';
import { Colors } from './theme';

const Stack = createStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.background, 
    card: Colors.primary,          
    text: Colors.textDark,
    primary: Colors.primary,
  },
};

export default function App() {
  return (
    <TransactionProvider>
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator initialRouteName="SignIn">
          <Stack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{ headerShown: false }} 
          />
          <Stack.Screen
            name="Dashboard"
            component={DashboardScreen}
            options={{
              title: 'Dashboard',
              headerTitleStyle: { color: Colors.textLight },
              headerTintColor: Colors.textLight,
            }}
          />
          <Stack.Screen
            name="AddTransaction"
            component={AddTransactionScreen}
            options={{
              title: 'Add Transaction',
              headerTitleStyle: { color: Colors.textLight },
              headerTintColor: Colors.textLight,
            }}
          />
          <Stack.Screen
            name="TransactionDetail"
            component={TransactionDetailScreen}
            options={{
              title: 'Transaction Detail',
              headerTitleStyle: { color: Colors.textLight },
              headerTintColor: Colors.textLight,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </TransactionProvider>
  );
}
