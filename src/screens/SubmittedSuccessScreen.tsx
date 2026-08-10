import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useApp } from '../context/AppContext';
import { colors } from '../theme/colors';
import { CheckCircle2, Clock, Eye, UserCheck } from 'lucide-react-native';

export const SubmittedSuccessScreen: React.FC = () => {
  const { lastSubmittedComplaint, setActiveScreen, setSelectedComplaintId, simulateAdminAssignRider } = useApp();

  if (!lastSubmittedComplaint) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No complaint submitted</Text>
        <TouchableOpacity style={styles.primaryBtn} onPress={() => setActiveScreen('HOME')}>
          <Text style={styles.primaryBtnText}>Go to Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleViewComplaint = () => {
    setSelectedComplaintId(lastSubmittedComplaint.id);
    setActiveScreen('DETAILS');
  };

  const handleSimulateAdminAssign = () => {
    simulateAdminAssignRider(lastSubmittedComplaint.id);
    setSelectedComplaintId(lastSubmittedComplaint.id);
    setActiveScreen('DETAILS');
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <CheckCircle2 size={56} color={colors.status['Completed'].text} />
      </View>

      <Text style={styles.title}>Complaint Submitted</Text>

      <View style={styles.card}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Complaint ID:</Text>
          <Text style={styles.infoValue}>{lastSubmittedComplaint.id}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Submission Date:</Text>
          <Text style={styles.infoSubValue}>{lastSubmittedComplaint.submissionDate}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Status:</Text>
          <View style={styles.statusBadge}>
            <Clock size={12} color={colors.status['Pending'].text} />
            <Text style={styles.statusText}>Pending</Text>
          </View>
        </View>

        <Text style={styles.messageText}>
          Your complaint has been submitted successfully. Please wait while our admin team reviews your complaint and assigns a rider.
        </Text>
      </View>

      {/* Buttons */}
      <TouchableOpacity
        style={styles.primaryBtn}
        onPress={handleViewComplaint}
        activeOpacity={0.85}
      >
        <Eye size={18} color="#FFFFFF" />
        <Text style={styles.primaryBtnText}>View Complaint</Text>
      </TouchableOpacity>

      {/* Quick Demo Action: Simulate Admin Assigning Rider */}
      <TouchableOpacity
        style={styles.demoAssignBtn}
        onPress={handleSimulateAdminAssign}
        activeOpacity={0.85}
      >
        <UserCheck size={16} color={colors.primaryLight} />
        <Text style={styles.demoAssignText}>Demo: Admin Assigns Rider Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgDark,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.status['Completed'].bg,
    borderWidth: 2,
    borderColor: colors.status['Completed'].border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  card: {
    width: '100%',
    backgroundColor: colors.bgCard,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 13,
    color: colors.textMuted,
  },
  infoValue: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.primaryLight,
  },
  infoSubValue: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: colors.status['Pending'].bg,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.status['Pending'].border,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.status['Pending'].text,
  },
  messageText: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 19,
    textAlign: 'center',
    marginTop: 8,
    backgroundColor: colors.bgDark,
    padding: 12,
    borderRadius: 10,
  },
  primaryBtn: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  demoAssignBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(20, 184, 166, 0.15)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primaryLight,
  },
  demoAssignText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primaryLight,
  },
});
