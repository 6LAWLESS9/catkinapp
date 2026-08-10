import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useApp } from '../context/AppContext';
import { colors } from '../theme/colors';
import { ComplaintStatus } from '../types';
import { PlusCircle, Clock, Navigation, CheckCircle2, ChevronRight, AlertCircle } from 'lucide-react-native';

export const HomeScreen: React.FC = () => {
  const { user, complaints, setActiveScreen, setSelectedComplaintId, setActiveBottomTab } = useApp();

  const pendingCount = complaints.filter(c => c.status === 'Pending').length;
  const riderAssignedCount = complaints.filter(c => c.status === 'Rider Assigned').length;
  const inProgressCount = complaints.filter(c => c.status === 'In Progress').length;
  const completedCount = complaints.filter(c => c.status === 'Completed').length;

  const recentComplaints = complaints.slice(0, 3);

  const handleComplaintPress = (id: string) => {
    setSelectedComplaintId(id);
    setActiveScreen('DETAILS');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Catkin Corporate Brand Header */}
      <View style={styles.catkinHeaderBar}>
        <View style={styles.catkinBrandRow}>
          <Text style={styles.catkinTitle}>Catkin</Text>
          <View style={styles.isoTag}>
            <Text style={styles.isoTagText}>ISO 9001:2015</Text>
          </View>
        </View>
        <Text style={styles.catkinSubTitle}>Engineering Sale & Services (Pvt) Ltd. | IT Solutions</Text>
      </View>

      {/* User Welcome Banner */}
      <View style={styles.userBanner}>
        <View style={styles.userLeft}>
          <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
          <View>
            <Text style={styles.welcomeSub}>Welcome back 👋</Text>
            <Text style={styles.userName}>{user.name}</Text>
          </View>
        </View>

        {/* Primary Action Button: Submit Complaint */}
        <TouchableOpacity
          style={styles.submitBtn}
          onPress={() => setActiveScreen('SUBMIT')}
          activeOpacity={0.85}
        >
          <PlusCircle size={18} color="#FFFFFF" />
          <Text style={styles.submitBtnText}>Submit Complaint</Text>
        </TouchableOpacity>
      </View>

      {/* Complaint Summary Counters (Pending, Rider Assigned, In Progress, Completed) */}
      <Text style={styles.sectionHeader}>Complaint Status Summary</Text>
      <View style={styles.summaryGrid}>
        <TouchableOpacity
          style={[styles.summaryCard, { borderColor: colors.status['Pending'].border }]}
          onPress={() => {
            setActiveBottomTab('MY_COMPLAINTS');
            setActiveScreen('MY_COMPLAINTS');
          }}
        >
          <View style={[styles.statusIconCircle, { backgroundColor: colors.status['Pending'].bg }]}>
            <Clock size={18} color={colors.status['Pending'].text} />
          </View>
          <Text style={[styles.summaryCount, { color: colors.status['Pending'].text }]}>{pendingCount}</Text>
          <Text style={styles.summaryLabel}>Pending</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.summaryCard, { borderColor: colors.status['Rider Assigned'].border }]}
          onPress={() => {
            setActiveBottomTab('MY_COMPLAINTS');
            setActiveScreen('MY_COMPLAINTS');
          }}
        >
          <View style={[styles.statusIconCircle, { backgroundColor: colors.status['Rider Assigned'].bg }]}>
            <Navigation size={18} color={colors.status['Rider Assigned'].text} />
          </View>
          <Text style={[styles.summaryCount, { color: colors.status['Rider Assigned'].text }]}>{riderAssignedCount}</Text>
          <Text style={styles.summaryLabel}>Rider Assigned</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.summaryCard, { borderColor: colors.status['In Progress'].border }]}
          onPress={() => {
            setActiveBottomTab('MY_COMPLAINTS');
            setActiveScreen('MY_COMPLAINTS');
          }}
        >
          <View style={[styles.statusIconCircle, { backgroundColor: colors.status['In Progress'].bg }]}>
            <AlertCircle size={18} color={colors.status['In Progress'].text} />
          </View>
          <Text style={[styles.summaryCount, { color: colors.status['In Progress'].text }]}>{inProgressCount}</Text>
          <Text style={styles.summaryLabel}>In Progress</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.summaryCard, { borderColor: colors.status['Completed'].border }]}
          onPress={() => {
            setActiveBottomTab('MY_COMPLAINTS');
            setActiveScreen('MY_COMPLAINTS');
          }}
        >
          <View style={[styles.statusIconCircle, { backgroundColor: colors.status['Completed'].bg }]}>
            <CheckCircle2 size={18} color={colors.status['Completed'].text} />
          </View>
          <Text style={[styles.summaryCount, { color: colors.status['Completed'].text }]}>{completedCount}</Text>
          <Text style={styles.summaryLabel}>Completed</Text>
        </TouchableOpacity>
      </View>

      {/* Recent Complaints Feed */}
      <View style={styles.recentHeaderRow}>
        <Text style={styles.sectionHeader}>Recent Complaints</Text>
        <TouchableOpacity
          onPress={() => {
            setActiveBottomTab('MY_COMPLAINTS');
            setActiveScreen('MY_COMPLAINTS');
          }}
          style={styles.viewAllBtn}
        >
          <Text style={styles.viewAllText}>View All</Text>
          <ChevronRight size={16} color={colors.primaryLight} />
        </TouchableOpacity>
      </View>

      {recentComplaints.map(item => {
        const statusConf = colors.status[item.status];
        return (
          <TouchableOpacity
            key={item.id}
            style={styles.complaintCard}
            onPress={() => handleComplaintPress(item.id)}
            activeOpacity={0.85}
          >
            <View style={styles.complaintHeader}>
              <Text style={styles.complaintId}>{item.id}</Text>
              <View style={[styles.badge, { backgroundColor: statusConf.bg, borderColor: statusConf.border }]}>
                <Text style={[styles.badgeText, { color: statusConf.text }]}>{item.status}</Text>
              </View>
            </View>

            <Text style={styles.complaintDesc} numberOfLines={2}>
              {item.description}
            </Text>

            <View style={styles.complaintFooter}>
              <Text style={styles.complaintDate}>{item.submissionDate}</Text>
              {item.rider && (
                <Text style={styles.riderAssignedTag}>Rider: {item.rider.name}</Text>
              )}
            </View>
          </TouchableOpacity>
        );
      })}
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
  catkinHeaderBar: {
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 4,
  },
  catkinBrandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  catkinTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: '#FFFFFF',
    fontStyle: 'italic',
    letterSpacing: 0.5,
  },
  isoTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  isoTagText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  catkinSubTitle: {
    fontSize: 11,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  userBanner: {
    backgroundColor: colors.bgCard,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 14,
  },
  userLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 2,
    borderColor: colors.primaryLight,
  },
  welcomeSub: {
    fontSize: 12,
    color: colors.textMuted,
  },
  userName: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  submitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 12,
  },
  submitBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  summaryCard: {
    flex: 1,
    minWidth: 140,
    backgroundColor: colors.bgCard,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 6,
  },
  statusIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryCount: {
    fontSize: 22,
    fontWeight: '900',
  },
  summaryLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  recentHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  viewAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewAllText: {
    fontSize: 13,
    color: colors.primaryLight,
    fontWeight: '600',
  },
  complaintCard: {
    backgroundColor: colors.bgCard,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 8,
  },
  complaintHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  complaintId: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.primaryLight,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    borderWidth: 1,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  complaintDesc: {
    fontSize: 13,
    color: colors.textPrimary,
    lineHeight: 18,
  },
  complaintFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  complaintDate: {
    fontSize: 11,
    color: colors.textMuted,
  },
  riderAssignedTag: {
    fontSize: 11,
    color: colors.primaryLight,
    fontWeight: '600',
  },
});
