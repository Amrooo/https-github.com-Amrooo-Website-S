import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { ShieldAlert, MapPin, Clock, ShieldCheck } from 'lucide-react-native';

const MobileApp = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Saaed Smart Services</Text>
          <Text style={styles.subtitle}>Unified Safety & Traffic Portal</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <ShieldAlert color="#e11d48" size={24} />
            <Text style={styles.cardTitle}>Report Accident</Text>
          </View>
          <Text style={styles.cardDesc}>Quickly report minor traffic incidents to authorities.</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Start Report</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Clock color="#2563eb" size={20} />
            <Text style={styles.statValue}>12 Min</Text>
            <Text style={styles.statLabel}>Avg Response</Text>
          </View>
          <View style={styles.statBox}>
            <ShieldCheck color="#059669" size={20} />
            <Text style={styles.statValue}>100%</Text>
            <Text style={styles.statLabel}>Secure</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f5',
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    marginBottom: 30,
    marginTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#09090b',
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 16,
    color: '#71717a',
    marginTop: 4,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#09090b',
  },
  cardDesc: {
    fontSize: 14,
    color: '#71717a',
    lineHeight: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#e11d48',
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 15,
    marginTop: 20,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e4e4e7',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#09090b',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#71717a',
    marginTop: 2,
  },
});

export default MobileApp;
