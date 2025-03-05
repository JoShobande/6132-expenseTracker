import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TransactionContext } from '../context/TransactionContext';
import { Colors, Sizing, Typography } from '../theme';

export default function TransactionDetailScreen({ route }) {
  const { getTransactionById } = useContext(TransactionContext);
  const { transactionId } = route.params;

  const transaction = getTransactionById(transactionId);

  if (!transaction) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Transaction not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Transaction Details</Text>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Date:</Text>
          <Text style={styles.value}>{transaction.date}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Amount:</Text>
          <Text style={[styles.value, { color: Colors.accent }]}>
            ${transaction.amount.toFixed(2)}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Description:</Text>
          <Text style={styles.value}>{transaction.description}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Location:</Text>
          <Text style={styles.value}>{transaction.location}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Transaction Type:</Text>
          <Text style={styles.value}>{transaction.transactionType}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Category:</Text>
          <Text style={styles.value}>{transaction.category}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Sizing.base,
  },
  card: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 8,
    padding: Sizing.base * 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 3,
    elevation: 2,
  },
  errorText: {
    ...Typography.fontRegular,
    fontSize: 18,
    color: Colors.error,
    textAlign: 'center',
    marginTop: Sizing.base * 2,
  },
  title: {
    ...Typography.fontBold,
    fontSize: 20,
    marginBottom: Sizing.base * 2,
    color: Colors.textDark,
    textAlign: 'center',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Sizing.base,
  },
  label: {
    ...Typography.fontSemiBold,
    color: '#555',
    fontSize: 16,
  },
  value: {
    ...Typography.fontRegular,
    color: Colors.textDark,
    fontSize: 16,
  },
});
