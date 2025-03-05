import React, { useContext, useLayoutEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';
import { TransactionContext } from '../context/TransactionContext';
import { Colors, Sizing, Typography } from '../theme';

export default function DashboardScreen({ navigation }) {
  const { transactions } = useContext(TransactionContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => {
            Alert.alert('Logout', 'Are you sure you want to logout?', [
              { text: 'Cancel', style: 'cancel' },
              {
                text: 'Yes',
                onPress: () => navigation.replace('SignIn'),
                style: 'destructive',
              },
            ]);
          }}
        >
          <Text style={styles.logoutBtnText}>Logout</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const goToAddTransaction = () => {
    navigation.navigate('AddTransaction');
  };

  const goToTransactionDetail = (id) => {
    navigation.navigate('TransactionDetail', { transactionId: id });
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.transactionCard}
        onPress={() => goToTransactionDetail(item.id)}
      >
        <View style={styles.transactionRow}>
          <Text style={styles.transactionDesc}>{item.description}</Text>
          <Text style={styles.transactionAmount}>
            ${item.amount.toFixed(2)}
          </Text>
        </View>
        <View style={styles.transactionRow}>
          <Text style={styles.transactionDate}>{item.date}</Text>
          <Text style={styles.transactionType}>{item.transactionType}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* "Add Transaction" button */}
      <TouchableOpacity style={styles.addButton} onPress={goToAddTransaction}>
        <Text style={styles.addButtonText}>+ Add New Transaction</Text>
      </TouchableOpacity>

      {/* Transaction list */}
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No transactions yet.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Sizing.base,
  },
  logoutBtn: {
    marginRight: Sizing.base,
  },
  logoutBtnText: {
    ...Typography.fontSemiBold,
    fontSize: 16,
    color: Colors.textLight,
  },
  addButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Sizing.base,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: Sizing.base,
  },
  addButtonText: {
    ...Typography.fontSemiBold,
    color: Colors.textLight,
    fontSize: 16,
  },
  listContent: {
    paddingBottom: Sizing.base * 2,
  },
  emptyText: {
    ...Typography.fontRegular,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 40,
  },
  transactionCard: {
    backgroundColor: Colors.cardBackground,
    padding: Sizing.base,
    borderRadius: 8,
    marginBottom: Sizing.base,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 3,
    elevation: 2,
  },
  transactionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  transactionDesc: {
    ...Typography.fontBold,
    fontSize: 16,
    color: Colors.textDark,
  },
  transactionAmount: {
    ...Typography.fontBold,
    fontSize: 16,
    color: Colors.accent,
  },
  transactionDate: {
    ...Typography.fontRegular,
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  transactionType: {
    ...Typography.fontRegular,
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});
