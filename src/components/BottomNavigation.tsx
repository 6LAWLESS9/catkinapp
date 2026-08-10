import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useApp } from '../context/AppContext';
import { colors } from '../theme/colors';
import { Home, ClipboardList, Bell, User } from 'lucide-react-native';

export const BottomNavigation: React.FC = () => {
  const { activeBottomTab, setActiveBottomTab, setActiveScreen, unreadNotificationCount, setSelectedComplaintId } = useApp();

  interface TabItem {
    key: 'HOME' | 'MY_COMPLAINTS' | 'NOTIFICATIONS' | 'PROFILE';
    label: string;
    screen: any;
    icon: any;
    badge?: number;
  }

  const tabs: TabItem[] = [
    { key: 'HOME', label: 'Home', screen: 'HOME', icon: Home },
    { key: 'MY_COMPLAINTS', label: 'My Complaints', screen: 'MY_COMPLAINTS', icon: ClipboardList },
    { key: 'NOTIFICATIONS', label: 'Notifications', screen: 'NOTIFICATIONS', icon: Bell, badge: unreadNotificationCount },
    { key: 'PROFILE', label: 'Profile', screen: 'PROFILE', icon: User },
  ];

  return (
    <View style={styles.container}>
      {tabs.map(tab => {
        const isActive = activeBottomTab === tab.key;
        const IconComponent = tab.icon;
        return (
          <TouchableOpacity
            key={tab.key}
            style={styles.tabItem}
            onPress={() => {
              setActiveBottomTab(tab.key as any);
              if (tab.key === 'MY_COMPLAINTS') {
                setSelectedComplaintId(null);
              }
              setActiveScreen(tab.screen as any);
            }}
            activeOpacity={0.8}
          >
            <View style={styles.iconWrapper}>
              <IconComponent
                size={22}
                color={isActive ? colors.primary : colors.textMuted}
              />
              {!!tab.badge && tab.badge > 0 && (
                <View style={styles.badgeCircle}>
                  <Text style={styles.badgeText}>{tab.badge}</Text>
                </View>
              )}
            </View>
            <Text style={[styles.label, isActive && styles.labelActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.bgCard,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingVertical: 10,
    paddingHorizontal: 12,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    flex: 1,
  },
  iconWrapper: {
    position: 'relative',
  },
  badgeCircle: {
    position: 'absolute',
    top: -4,
    right: -8,
    backgroundColor: colors.primary,
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  label: {
    fontSize: 11,
    color: colors.textMuted,
    fontWeight: '500',
  },
  labelActive: {
    color: colors.primary,
    fontWeight: '700',
  },
});
