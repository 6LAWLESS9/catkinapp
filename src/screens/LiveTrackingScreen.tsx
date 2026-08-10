import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useApp } from '../context/AppContext';
import { colors } from '../theme/colors';
import { MapViewSim } from '../components/MapViewSim';
import { RiderInfoCard } from '../components/RiderInfoCard';
import { ArrowLeft, Shield } from 'lucide-react-native';

export const LiveTrackingScreen: React.FC = () => {
  const { selectedComplaint, setActiveScreen } = useApp();

  const rider = selectedComplaint?.rider;

  if (!selectedComplaint || !rider) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No active rider assigned to this complaint.</Text>
        <TouchableOpacity style={styles.backBtn} onPress={() => setActiveScreen('MY_COMPLAINTS')}>
          <ArrowLeft size={16} color="#FFFFFF" />
          <Text style={styles.backBtnText}>Back to Complaints</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.topHeader}>
        <TouchableOpacity style={styles.backBtn} onPress={() => setActiveScreen('DETAILS')}>
          <ArrowLeft size={18} color={colors.textPrimary} />
          <Text style={styles.backBtnText}>Back to Complaint Details</Text>
        </TouchableOpacity>

        <View style={styles.headerTag}>
          <Shield size={14} color={colors.primaryLight} />
          <Text style={styles.headerTagText}>Live Tracking</Text>
        </View>
      </View>

      {/* Main Map Screen */}
      <View style={styles.mapArea}>
        <MapViewSim
          riderName={rider.name}
          riderAvatar={rider.avatarUrl}
          isLive={true}
        />
      </View>

      {/* Bottom Rider Info Sheet */}
      <View style={styles.bottomSheet}>
        <View style={styles.dragHandle} />
        <RiderInfoCard
          rider={rider}
          estimatedArrival={selectedComplaint.estimatedArrival || '12 mins'}
          currentDistance={selectedComplaint.currentDistance || '1.4 km away'}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgDark,
    padding: 16,
    gap: 12,
  },
  errorText: {
    fontSize: 16,
    color: colors.textPrimary,
    textAlign: 'center',
    marginTop: 40,
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  backBtnText: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: '600',
  },
  headerTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(20, 184, 166, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.primaryLight,
  },
  headerTagText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primaryLight,
  },
  mapArea: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
  },
  bottomSheet: {
    backgroundColor: colors.bgCard,
    borderRadius: 20,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 8,
  },
  dragHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.border,
    alignSelf: 'center',
  },
});
