import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useApp } from '../context/AppContext';
import { colors } from '../theme/colors';
import { ShieldCheck, ArrowRight, Award } from 'lucide-react-native';

export const SplashScreen: React.FC = () => {
  const { setActiveScreen } = useApp();

  return (
    <View style={styles.container}>
      <View style={styles.logoCircle}>
        <Text style={styles.catkinLogoText}>Catkin</Text>
      </View>

      <Text style={styles.companySubTitle}>Engineering Sale & Services (pvt) ltd.</Text>
      <Text style={styles.companyITText}>Catkin IT Solutions</Text>

      <View style={styles.isoBadgeContainer}>
        <Award size={14} color={colors.primary} />
        <Text style={styles.isoText}>ISO 9001:2015 Certified</Text>
      </View>

      <Text style={styles.appTagline}>Customer Complaint & Live Rider Tracking</Text>

      <TouchableOpacity
        style={styles.continueBtn}
        onPress={() => setActiveScreen('ONBOARDING')}
        activeOpacity={0.85}
      >
        <Text style={styles.continueBtnText}>Get Started</Text>
        <ArrowRight size={18} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgDark,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  logoCircle: {
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 24,
    backgroundColor: 'rgba(0, 136, 204, 0.15)',
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  catkinLogoText: {
    fontSize: 42,
    fontWeight: '900',
    color: colors.primaryLight,
    fontStyle: 'italic',
    letterSpacing: 1,
  },
  companySubTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
    textAlign: 'center',
  },
  companyITText: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.primary,
    textAlign: 'center',
    marginTop: 2,
  },
  isoBadgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(0, 136, 214, 0.08)',
    borderColor: colors.primary,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 10,
  },
  isoText: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: 0.5,
  },
  appTagline: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 18,
    textAlign: 'center',
  },
  continueBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.primary,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 30,
    marginTop: 40,
  },
  continueBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
