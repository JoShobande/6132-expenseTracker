import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { TransactionContext } from '../context/TransactionContext';
import { Colors, Sizing, Typography } from '../theme';

export default function AddTransactionScreen({ navigation }) {
  const { addTransaction } = useContext(TransactionContext);

  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [transactionType, setTransactionType] = useState('Credit');
  const [category, setCategory] = useState('Shopping');

  const validateFields = () => {
    if (!date || !amount || !description || !location) {
      Alert.alert('Validation Error', 'Please fill out all fields.');
      return false;
    }
    if (isNaN(amount)) {
      Alert.alert('Validation Error', 'Amount must be a numeric value.');
      return false;
    }
    return true;
  };

  const handleAddTransaction = () => {
    if (!validateFields()) return;

    const newTransaction = {
      id: Date.now(),
      date,
      amount: parseFloat(amount),
      description,
      location,
      transactionType,
      category,
    };

    addTransaction(newTransaction);
    Alert.alert('Success', 'Transaction added successfully!');
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formCard}>
        <Text style={styles.title}>Add a New Transaction</Text>

        <Text style={styles.label}>Date</Text>
        <TextInput
          style={styles.input}
          placeholder="YYYY-MM-DD"
          placeholderTextColor="#AAA"
          value={date}
          onChangeText={setDate}
        />

        <Text style={styles.label}>Amount</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. 45.67"
          placeholderTextColor="#AAA"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Grocery shopping"
          placeholderTextColor="#AAA"
          value={description}
          onChangeText={setDescription}
        />

        <Text style={styles.label}>Location</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Walmart"
          placeholderTextColor="#AAA"
          value={location}
          onChangeText={setLocation}
        />

        <Text style={styles.label}>Transaction Type</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={transactionType}
            onValueChange={setTransactionType}
          >
            <Picker.Item label="Credit" value="Credit" />
            <Picker.Item label="Debit" value="Debit" />
            <Picker.Item label="Refund" value="Refund" />
          </Picker>
        </View>

        <Text style={styles.label}>Category</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={category} onValueChange={setCategory}>
            <Picker.Item label="Shopping" value="Shopping" />
            <Picker.Item label="Travel" value="Travel" />
            <Picker.Item label="Utility" value="Utility" />
            <Picker.Item label="Other" value="Other" />
          </Picker>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleAddTransaction}>
          <Text style={styles.buttonText}>Add Transaction</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
  },
  formCard: {
    backgroundColor: Colors.cardBackground,
    margin: Sizing.base,
    padding: Sizing.base * 2,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 3,
    elevation: 2,
  },
  title: {
    ...Typography.fontBold,
    fontSize: 20,
    marginBottom: Sizing.base * 2,
    color: Colors.textDark,
    textAlign: 'center',
  },
  label: {
    ...Typography.fontSemiBold,
    fontSize: 14,
    marginTop: Sizing.base,
    marginBottom: 5,
    color: Colors.textDark,
  },
  input: {
    ...Typography.fontRegular,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 6,
    paddingHorizontal: Sizing.base,
    paddingVertical: Sizing.base / 1.2,
    fontSize: 16,
    color: Colors.textDark,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 6,
    marginBottom: Sizing.base,
  },
  button: {
    marginTop: Sizing.base * 2,
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
