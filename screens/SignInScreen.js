import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Colors, Sizing, Typography } from '../theme';

export default function SignInScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    if (username === 'admin' && password === 'admin') {
      navigation.replace('Dashboard');
    } else {
      Alert.alert('Invalid Credentials', 'Username or password is incorrect!');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.titleContainer}>
        <Text style={styles.appTitle}>ExpenseTracker</Text>
        <Text style={styles.welcomeMessage}>Sign in to continue</Text>
      </View>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#AAA"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#AAA"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    padding: Sizing.base * 2,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: Sizing.base * 3,
  },
  appTitle: {
    ...Typography.fontBold,
    fontSize: 28,
    color: Colors.primary,
    marginBottom: 8,
  },
  welcomeMessage: {
    ...Typography.fontRegular,
    fontSize: 16,
    color: Colors.textDark,
  },
  formContainer: {
    backgroundColor: Colors.cardBackground,
    padding: Sizing.base * 2,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    ...Typography.fontRegular,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 6,
    paddingHorizontal: Sizing.base,
    paddingVertical: Sizing.base / 1.2,
    marginBottom: Sizing.base * 1.5,
    fontSize: 16,
    color: Colors.textDark,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: Sizing.base,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    ...Typography.fontSemiBold,
    color: Colors.textLight,
    fontSize: 16,
  },
});
