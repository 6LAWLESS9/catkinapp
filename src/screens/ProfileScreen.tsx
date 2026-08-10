import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { useApp } from '../context/AppContext';
import { colors } from '../theme/colors';
import {
  User,
  Phone,
  Mail,
  Edit3,
  ClipboardList,
  Bell,
  HelpCircle,
  Shield,
  FileText,
  LogOut,
  ChevronRight,
} from 'lucide-react-native';

export const ProfileScreen: React.FC = () => {
  const { user, setActiveScreen, setActiveBottomTab } = useApp();

  const menuOptions = [
    {
      label: 'Edit Profile',
      icon: Edit3,
      onPress: () => setActiveScreen('EDIT_PROFILE'),
    },
    {
      label: 'My Complaints',
      icon: ClipboardList,
      onPress: () => {
        setActiveBottomTab('MY_COMPLAINTS');
        setActiveScreen('MY_COMPLAINTS');
      },
    },
    {
      label: 'Notifications',
      icon: Bell,
      onPress: () => {
        setActiveBottomTab('NOTIFICATIONS');
        setActiveScreen('NOTIFICATIONS');
      },
    },
    {
      label: 'Help & Support',
      icon: HelpCircle,
      onPress: () => setActiveScreen('HELP_SUPPORT'),
    },
    {
      label: 'Privacy Policy',
      icon: Shield,
      onPress: () => Alert.alert('Privacy Policy', 'Your personal data is encrypted and secure under standard privacy laws.'),
    },
    {
      label: 'Terms & Conditions',
      icon: FileText,
      onPress: () => Alert.alert('Terms & Conditions', 'By using Catkin Customer App, you agree to our service terms.'),
    },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Profile Header */}
      <View style={styles.profileCard}>
        <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userPhone}>{user.phone}</Text>
        <Text style={styles.userEmail}>{user.email}</Text>

        <TouchableOpacity
          style={styles.editBtn}
          onPress={() => setActiveScreen('EDIT_PROFILE')}
        >
          <Edit3 size={14} color={colors.primaryLight} />
          <Text style={styles.editBtnText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Menu Options List */}
      <View style={styles.menuCard}>
        {menuOptions.map((opt, idx) => {
          const IconComp = opt.icon;
          return (
            <TouchableOpacity
              key={idx}
              style={[
                styles.menuItem,
                idx < menuOptions.length - 1 && styles.menuItemBorder,
              ]}
              onPress={opt.onPress}
              activeOpacity={0.8}
            >
              <View style={styles.menuLeft}>
                <IconComp size={18} color={colors.primaryLight} />
                <Text style={styles.menuLabel}>{opt.label}</Text>
              </View>
              <ChevronRight size={16} color={colors.textMuted} />
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Logout Option */}
      <TouchableOpacity
        style={styles.logoutBtn}
        onPress={() => {
          setOnboardingStep(0);
          setActiveScreen('SPLASH');
        }}
      >
        <LogOut size={18} color={colors.status['Pending'].border} />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      {/* Catkin Footer Branding */}
      <View style={styles.catkinFooter}>
        <Text style={styles.catkinFooterTitle}>Catkin Engineering Sale & Services (Pvt) Ltd.</Text>
        <Text style={styles.catkinFooterSub}>Catkin IT Solutions • ISO 9001:2015 Certified</Text>
      </View>
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
  profileCard: {
    backgroundColor: colors.bgCard,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    gap: 6,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 2,
    borderColor: colors.primaryLight,
    marginBottom: 4,
  },
  userName: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  userPhone: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  userEmail: {
    fontSize: 12,
    color: colors.textMuted,
  },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(20, 184, 166, 0.12)',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 8,
    borderWidth: 1,
    borderColor: colors.primaryLight,
  },
  editBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primaryLight,
  },
  menuCard: {
    backgroundColor: colors.bgCard,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSubtle,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuLabel: {
    fontSize: 14,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.status['Pending'].border,
  },
  logoutText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.status['Pending'].border,
  },
  catkinFooter: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 4,
  },
  catkinFooterTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  catkinFooterSub: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '600',
  },
});
