import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useApp } from '../context/AppContext';
import { colors } from '../theme/colors';
import { ShieldCheck, Check } from 'lucide-react-native';

export const OTPScreen: React.FC = () => {
  const { setActiveScreen, user, setActiveBottomTab } = useApp();
  const [otp, setOtp] = useState(['4', '8', '2', '9']);

  const handleVerify = () => {
    setActiveBottomTab('HOME');
    setActiveScreen('HOME');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconCircle}>
          <ShieldCheck size={36} color={colors.primary} />
        </View>
        <Text style={styles.title}>Enter OTP Code</Text>
        <Text style={styles.subtitle}>
          Verification code sent to <Text style={styles.boldText}>{user.phone}</Text>
        </Text>
      </View>

      <View style={styles.otpRow}>
        {otp.map((val, idx) => (
          <View key={idx} style={styles.otpBox}>
            <Text style={styles.otpText}>{val}</Text>
          </View>
        ))}
      </View>

      <View style={styles.timerRow}>
        <Text style={styles.timerText}>Resend OTP in 00:28s</Text>
      </View>

      <TouchableOpacity
        style={styles.verifyBtn}
        onPress={handleVerify}
        activeOpacity={0.85}
      >
        <Check size={18} color="#FFFFFF" />
        <Text style={styles.verifyBtnText}>Verify & Login</Text>
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
    gap: 24,
  },
  header: {
    alignItems: 'center',
    gap: 10,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(0, 136, 214, 0.1)',
    borderWidth: 1,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  boldText: {
    color: colors.textPrimary,
    fontWeight: '700',
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  otpBox: {
    width: 54,
    height: 56,
    borderRadius: 12,
    backgroundColor: colors.bgInput,
    borderWidth: 1.5,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  otpText: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  timerRow: {
    alignItems: 'center',
  },
  timerText: {
    fontSize: 13,
    color: colors.textMuted,
  },
  verifyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
  },
  verifyBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
