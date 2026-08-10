import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useApp } from '../context/AppContext';
import { colors } from '../theme/colors';
import { Bell, Navigation, CheckCircle2, Clock, Inbox } from 'lucide-react-native';

export const NotificationsScreen: React.FC = () => {
  const { notifications, markNotificationsAsRead } = useApp();

  useEffect(() => {
    markNotificationsAsRead();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Notifications</Text>
        <Text style={styles.subtitle}>Updates on your submitted complaints and assigned riders.</Text>
      </View>

      {notifications.length === 0 ? (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconCircle}>
            <Bell size={32} color={colors.textMuted} />
          </View>
          <Text style={styles.emptyTitle}>No new notifications</Text>
          <Text style={styles.emptySub}>You will receive alerts here when riders are assigned.</Text>
        </View>
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => {
            let IconComp = Bell;
            let iconColor = colors.primaryLight;
            if (item.type === 'RIDER_ASSIGNED') {
              IconComp = Navigation;
              iconColor = colors.status['Rider Assigned'].text;
            } else if (item.type === 'COMPLETED') {
              IconComp = CheckCircle2;
              iconColor = colors.status['Completed'].text;
            } else if (item.type === 'SUBMITTED') {
              IconComp = Clock;
              iconColor = colors.status['Pending'].text;
            }

            return (
              <View style={[styles.card, !item.read && styles.unreadCard]}>
                <View style={[styles.iconCircle, { backgroundColor: `${iconColor}20` }]}>
                  <IconComp size={18} color={iconColor} />
                </View>
                <View style={styles.cardContent}>
                  <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    <Text style={styles.cardTime}>{item.timestamp}</Text>
                  </View>
                  <Text style={styles.cardMsg}>{item.message}</Text>
                </View>
              </View>
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
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  listContent: {
    padding: 16,
    gap: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    backgroundColor: colors.bgCard,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  unreadCard: {
    borderColor: colors.primaryLight,
    backgroundColor: 'rgba(20, 184, 166, 0.08)',
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContent: {
    flex: 1,
    gap: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  cardTime: {
    fontSize: 11,
    color: colors.textMuted,
  },
  cardMsg: {
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 17,
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
});
