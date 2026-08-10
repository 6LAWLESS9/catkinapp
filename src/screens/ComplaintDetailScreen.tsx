import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useApp } from '../context/AppContext';
import { colors } from '../theme/colors';
import { RiderInfoCard } from '../components/RiderInfoCard';
import { MapViewSim } from '../components/MapViewSim';
import {
  ArrowLeft,
  Clock,
  Navigation,
  CheckCircle2,
  AlertCircle,
  UserCheck,
} from 'lucide-react-native';

export const ComplaintDetailScreen: React.FC = () => {
  const {
    selectedComplaint,
    setSelectedComplaintId,
    setActiveScreen,
    simulateAdminAssignRider,
  } = useApp();

  if (!selectedComplaint) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Complaint not found.</Text>
        <TouchableOpacity style={styles.backBtn} onPress={() => setActiveScreen('MY_COMPLAINTS')}>
          <ArrowLeft size={16} color="#FFFFFF" />
          <Text style={styles.backBtnText}>Back to List</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const isPending = selectedComplaint.status === 'Pending';
  const isRiderAssigned = selectedComplaint.status === 'Rider Assigned';
  const isInProgress = selectedComplaint.status === 'In Progress';
  const isCompleted = selectedComplaint.status === 'Completed';

  const statusConf = colors.status[selectedComplaint.status];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Top Navigation */}
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => setActiveScreen('MY_COMPLAINTS')}
      >
        <ArrowLeft size={18} color={colors.textPrimary} />
        <Text style={styles.backBtnText}>Back to Complaints</Text>
      </TouchableOpacity>

      {/* Ticket Header & Status */}
      <View style={styles.headerCard}>
        <View style={styles.headerTop}>
          <Text style={styles.ticketId}>{selectedComplaint.id}</Text>
          <View style={[styles.statusBadge, { backgroundColor: statusConf.bg, borderColor: statusConf.border }]}>
            <Text style={[styles.statusText, { color: statusConf.text }]}>{selectedComplaint.status}</Text>
          </View>
        </View>

        <Text style={styles.submittedDate}>Submitted: {selectedComplaint.submissionDate}</Text>
      </View>

      {/* Description */}
      <View style={styles.card}>
        <Text style={styles.sectionLabel}>Complaint Description</Text>
        <Text style={styles.descText}>{selectedComplaint.description}</Text>

        {/* Uploaded Pictures if any */}
        {selectedComplaint.images && selectedComplaint.images.length > 0 && (
          <View style={styles.imagesSection}>
            <Text style={styles.subLabel}>Uploaded Photos ({selectedComplaint.images.length}):</Text>
            <View style={styles.imagesGrid}>
              {selectedComplaint.images.map((imgUrl, i) => (
                <Image key={i} source={{ uri: imgUrl }} style={styles.uploadedImg} />
              ))}
            </View>
          </View>
        )}
      </View>

      {/* State 1: PENDING (Rule: Waiting for rider assignment message. Do NOT show rider or map) */}
      {isPending && (
        <View style={styles.pendingCard}>
          <Clock size={28} color={colors.status['Pending'].border} />
          <Text style={styles.pendingTitle}>Status: Pending</Text>
          <Text style={styles.pendingMsg}>Waiting for rider assignment</Text>
          <Text style={styles.pendingSubText}>
            Our admin team is currently reviewing your complaint details and selecting an available support rider.
          </Text>

          {/* Quick Demo button to simulate admin assignment */}
          <TouchableOpacity
            style={styles.demoAssignBtn}
            onPress={() => simulateAdminAssignRider(selectedComplaint.id)}
            activeOpacity={0.85}
          >
            <UserCheck size={16} color={colors.primaryLight} />
            <Text style={styles.demoAssignText}>Demo: Admin Assigns Rider Now</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* State 2: RIDER ASSIGNED / IN PROGRESS (Rule: Basic rider info + Map live location + Track Rider button) */}
      {(isRiderAssigned || isInProgress) && selectedComplaint.rider && (
        <View style={styles.assignedSection}>
          <Text style={styles.sectionLabel}>Assigned Support Rider</Text>

          <RiderInfoCard
            rider={selectedComplaint.rider}
            estimatedArrival={selectedComplaint.estimatedArrival}
            currentDistance={selectedComplaint.currentDistance}
          />

          <Text style={[styles.sectionLabel, { marginTop: 10 }]}>Rider Live Location</Text>
          <MapViewSim
            riderName={selectedComplaint.rider.name}
            riderAvatar={selectedComplaint.rider.avatarUrl}
            isLive={true}
          />

          <TouchableOpacity
            style={styles.trackRiderBtn}
            onPress={() => setActiveScreen('LIVE_TRACKING')}
            activeOpacity={0.85}
          >
            <Navigation size={18} color="#FFFFFF" />
            <Text style={styles.trackRiderBtnText}>Track Rider Live Full Screen</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* State 3: COMPLETED */}
      {isCompleted && (
        <View style={styles.completedCard}>
          <CheckCircle2 size={32} color={colors.status['Completed'].text} />
          <Text style={styles.completedTitle}>Complaint Completed</Text>
          {selectedComplaint.completionDate && (
            <Text style={styles.completedDate}>Resolved on {selectedComplaint.completionDate}</Text>
          )}
          {selectedComplaint.resolutionText && (
            <Text style={styles.resolutionBox}>{selectedComplaint.resolutionText}</Text>
          )}
          {selectedComplaint.rider && (
            <Text style={styles.completedRider}>Assigned Rider: {selectedComplaint.rider.name}</Text>
          )}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgDark,
  },
  content: {
    padding: 16,
    gap: 16,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.bgDark,
    padding: 20,
    gap: 16,
  },
  errorText: {
    fontSize: 16,
    color: colors.textPrimary,
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
  headerCard: {
    backgroundColor: colors.bgCard,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 8,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ticketId: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.primaryLight,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
  },
  submittedDate: {
    fontSize: 12,
    color: colors.textMuted,
  },
  card: {
    backgroundColor: colors.bgCard,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 10,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  descText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  imagesSection: {
    marginTop: 8,
    gap: 8,
  },
  subLabel: {
    fontSize: 12,
    color: colors.textMuted,
    fontWeight: '600',
  },
  imagesGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  uploadedImg: {
    width: 100,
    height: 100,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  pendingCard: {
    backgroundColor: colors.status['Pending'].bg,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.status['Pending'].border,
    alignItems: 'center',
    gap: 10,
  },
  pendingTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.status['Pending'].text,
  },
  pendingMsg: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  pendingSubText: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
  },
  demoAssignBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.bgDark,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.primaryLight,
    marginTop: 6,
  },
  demoAssignText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primaryLight,
  },
  assignedSection: {
    gap: 12,
  },
  trackRiderBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 6,
  },
  trackRiderBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  completedCard: {
    backgroundColor: colors.status['Completed'].bg,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.status['Completed'].border,
    alignItems: 'center',
    gap: 10,
  },
  completedTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.status['Completed'].text,
  },
  completedDate: {
    fontSize: 12,
    color: colors.textMuted,
  },
  resolutionBox: {
    fontSize: 13,
    color: colors.textPrimary,
    textAlign: 'center',
    lineHeight: 18,
    backgroundColor: colors.bgDark,
    padding: 12,
    borderRadius: 10,
    width: '100%',
  },
  completedRider: {
    fontSize: 12,
    color: colors.primaryLight,
    fontWeight: '600',
  },
});
