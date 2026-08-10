import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useApp } from '../context/AppContext';
import { colors } from '../theme/colors';
import { ComplaintStatus } from '../types';
import { Inbox, PlusCircle, ChevronRight, Navigation } from 'lucide-react-native';

export const MyComplaintsScreen: React.FC = () => {
  const { complaints, setSelectedComplaintId, setActiveScreen } = useApp();
  const [filterStatus, setFilterStatus] = useState<ComplaintStatus | 'ALL'>('ALL');

  const filtered = filterStatus === 'ALL'
    ? complaints
    : complaints.filter(c => c.status === filterStatus);

  const statuses: Array<ComplaintStatus | 'ALL'> = ['ALL', 'Pending', 'Rider Assigned', 'In Progress', 'Completed'];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Complaints</Text>
        <Text style={styles.headerSub}>Track all your submitted complaints and rider status.</Text>
      </View>

      {/* Filter Tabs */}
      <View style={styles.pillsRow}>
        {statuses.map(st => {
          const isActive = filterStatus === st;
          return (
            <TouchableOpacity
              key={st}
              style={[styles.pill, isActive && styles.pillActive]}
              onPress={() => setFilterStatus(st)}
            >
              <Text style={[styles.pillText, isActive && styles.pillTextActive]}>
                {st}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {filtered.length === 0 ? (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconCircle}>
            <Inbox size={32} color={colors.textMuted} />
          </View>
          <Text style={styles.emptyTitle}>No complaints yet</Text>
          <Text style={styles.emptySub}>You have not submitted any complaints in this category.</Text>
          <TouchableOpacity
            style={styles.newBtn}
            onPress={() => setActiveScreen('SUBMIT')}
          >
            <PlusCircle size={16} color="#FFFFFF" />
            <Text style={styles.newBtnText}>Submit Complaint</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => {
            const statusConf = colors.status[item.status];
            return (
              <TouchableOpacity
                style={styles.card}
                onPress={() => {
                  setSelectedComplaintId(item.id);
                  setActiveScreen('DETAILS');
                }}
                activeOpacity={0.85}
              >
                <View style={styles.cardHeader}>
                  <Text style={styles.cardId}>{item.id}</Text>
                  <View style={[styles.statusBadge, { backgroundColor: statusConf.bg, borderColor: statusConf.border }]}>
                    <Text style={[styles.statusText, { color: statusConf.text }]}>{item.status}</Text>
                  </View>
                </View>

                <Text style={styles.cardDesc} numberOfLines={2}>
                  {item.description}
                </Text>

                <View style={styles.cardFooter}>
                  <Text style={styles.cardDate}>{item.submissionDate}</Text>
                  {item.rider ? (
                    <View style={styles.riderPill}>
                      <Navigation size={12} color={colors.primaryLight} />
                      <Text style={styles.riderPillText}>{item.rider.name}</Text>
                    </View>
                  ) : (
                    <ChevronRight size={16} color={colors.textMuted} />
                  )}
                </View>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgDark,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  headerSub: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  pillsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  pill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: colors.bgCard,
    borderWidth: 1,
    borderColor: colors.border,
  },
  pillActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primaryLight,
  },
  pillText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  pillTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  listContent: {
    padding: 16,
    gap: 12,
  },
  card: {
    backgroundColor: colors.bgCard,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardId: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.primaryLight,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    borderWidth: 1,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  cardDesc: {
    fontSize: 13,
    color: colors.textPrimary,
    lineHeight: 18,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  cardDate: {
    fontSize: 11,
    color: colors.textMuted,
  },
  riderPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(20, 184, 166, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  riderPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primaryLight,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    gap: 12,
  },
  emptyIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.bgCard,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  emptySub: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  newBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.primary,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 8,
  },
  newBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
});
