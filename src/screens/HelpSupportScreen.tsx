import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useApp } from '../context/AppContext';
import { colors } from '../theme/colors';
import { ArrowLeft, HelpCircle, Headset, AlertTriangle, ShieldCheck, ChevronRight } from 'lucide-react-native';

export const HelpSupportScreen: React.FC = () => {
  const { setActiveScreen } = useApp();

  const faqs = [
    {
      q: 'How long does it take for a rider to be assigned?',
      a: 'Rider assignment is managed by our admin team and typically occurs within 15–30 minutes of complaint submission.',
    },
    {
      q: 'Can I choose or change my assigned rider?',
      a: 'No. Rider assignment is strictly controlled by our central admin dispatch system for optimal safety and routing.',
    },
    {
      q: 'When can I see the rider live location?',
      a: 'The rider live map location becomes visible as soon as the status changes from Pending to Rider Assigned.',
    },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <TouchableOpacity style={styles.backBtn} onPress={() => setActiveScreen('PROFILE')}>
        <ArrowLeft size={18} color={colors.textPrimary} />
        <Text style={styles.backBtnText}>Back to Profile</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Help & Support</Text>

      {/* Action Cards */}
      <View style={styles.grid}>
        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => Alert.alert('Catkin Support Helpline', 'Call us at:\n+92 51 410 0081-2\n+92 51 410 0084-5')}
        >
          <Headset size={24} color={colors.primaryLight} />
          <Text style={styles.actionTitle}>Contact Support</Text>
          <Text style={styles.actionDesc}>+92 51 410 0081-2</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => setActiveScreen('SUBMIT')}
        >
          <AlertTriangle size={24} color={colors.status['Pending'].border} />
          <Text style={styles.actionTitle}>Report an Issue</Text>
          <Text style={styles.actionDesc}>Submit new complaint ticket</Text>
        </TouchableOpacity>
      </View>

      {/* Head Office Islamabad Card */}
      <View style={styles.officeCard}>
        <Text style={styles.officeHeader}>Head Office Islamabad</Text>
        <Text style={styles.officeCompany}>Catkin Engineering Sale & Services (Pvt) Ltd.</Text>
        <Text style={styles.officeCompanySub}>Catkin IT Solutions (ISO 9001:2015 Certified)</Text>
        
        <View style={styles.officeDetailRow}>
          <Text style={styles.officeDetailLabel}>📍 Address:</Text>
          <Text style={styles.officeDetailValue}>
            Plot no. 14 & 15, Hospital Boulevard, Sector - A, DHA Phase-II, Islamabad
          </Text>
        </View>

        <View style={styles.officeDetailRow}>
          <Text style={styles.officeDetailLabel}>📞 Phone:</Text>
          <Text style={styles.officeDetailValue}>+92 51 410 0081-2 / +92 51 410 0084-5</Text>
        </View>

        <View style={styles.officeDetailRow}>
          <Text style={styles.officeDetailLabel}>🕒 Operating Hours:</Text>
          <Text style={styles.officeDetailValue}>Mon-Sat: 9:00 - 17:00 | Sunday CLOSED</Text>
        </View>
      </View>

      {/* FAQs Section */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <HelpCircle size={18} color={colors.primaryLight} />
          <Text style={styles.cardHeaderTitle}>Frequently Asked Questions</Text>
        </View>

        {faqs.map((f, i) => (
          <View key={i} style={styles.faqItem}>
            <Text style={styles.faqQuestion}>Q: {f.q}</Text>
            <Text style={styles.faqAnswer}>{f.a}</Text>
          </View>
        ))}
      </View>

      {/* Safety Info */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <ShieldCheck size={18} color={colors.status['Completed'].text} />
          <Text style={styles.cardHeaderTitle}>Safety & Rider Verification</Text>
        </View>
        <Text style={styles.safetyText}>
          All assigned riders are background-checked and verified. You can always call your rider directly or contact support through the live tracking screen.
        </Text>
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
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  grid: {
    flexDirection: 'row',
    gap: 12,
  },
  actionCard: {
    flex: 1,
    backgroundColor: colors.bgCard,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 8,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  actionDesc: {
    fontSize: 11,
    color: colors.textMuted,
    lineHeight: 15,
  },
  officeCard: {
    backgroundColor: colors.bgCard,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.primary,
    gap: 8,
  },
  officeHeader: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.primaryLight,
  },
  officeCompany: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  officeCompanySub: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.primary,
  },
  officeDetailRow: {
    marginTop: 4,
    gap: 2,
  },
  officeDetailLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  officeDetailValue: {
    fontSize: 12,
    color: colors.textPrimary,
    lineHeight: 16,
  },
  card: {
    backgroundColor: colors.bgCard,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cardHeaderTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
    textTransform: 'uppercase',
  },
  faqItem: {
    backgroundColor: colors.bgDark,
    borderRadius: 10,
    padding: 12,
    gap: 6,
  },
  faqQuestion: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primaryLight,
  },
  faqAnswer: {
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 17,
  },
  safetyText: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
  },
});
