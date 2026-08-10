import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useApp } from '../context/AppContext';
import { colors } from '../theme/colors';
import { Phone, ArrowRight } from 'lucide-react-native';

export const LoginScreen: React.FC = () => {
  const { setActiveScreen, user, updateUser } = useApp();
  const [phoneNumber, setPhoneNumber] = useState(user.phone || '');

  const handleContinue = () => {
    if (phoneNumber.trim()) {
      updateUser({ phone: phoneNumber });
    }
    setActiveScreen('OTP');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.brandTitle}>Catkin</Text>
        <Text style={styles.brandSub}>Engineering Sale & Services • IT Solutions</Text>
        <Text style={styles.title}>Customer Login</Text>
        <Text style={styles.subtitle}>Enter your phone number to receive a verification OTP code.</Text>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Phone Number</Text>
        <View style={styles.inputWrapper}>
          <Phone size={18} color={colors.textMuted} />
          <TextInput
            style={styles.input}
            placeholder="+1 (555) 000-0000"
            placeholderTextColor={colors.textMuted}
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>
      </View>

      <TouchableOpacity
        style={styles.continueBtn}
        onPress={handleContinue}
        activeOpacity={0.85}
      >
        <Text style={styles.continueBtnText}>Continue</Text>
        <ArrowRight size={18} color="#FFFFFF" />
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
    gap: 4,
  },
  brandTitle: {
    fontSize: 34,
    fontWeight: '900',
    color: colors.primary,
    fontStyle: 'italic',
  },
  brandSub: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textSecondary,
    marginBottom: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  formGroup: {
    gap: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.bgInput,
    borderRadius: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: colors.border,
    height: 50,
    gap: 10,
  },
  input: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 15,
  },
  continueBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
  },
  continueBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
