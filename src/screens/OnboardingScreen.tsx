import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useApp } from '../context/AppContext';
import { colors } from '../theme/colors';
import { FileText, Camera, Navigation, ArrowRight } from 'lucide-react-native';

export const OnboardingScreen: React.FC = () => {
  const { onboardingStep, setOnboardingStep, setActiveScreen } = useApp();

  const slides = [
    {
      icon: FileText,
      title: 'Submit your complaint easily',
      desc: 'Describe your issue in simple words. Our support team will process it instantly.',
    },
    {
      icon: Camera,
      title: 'Upload pictures when needed',
      desc: 'Optionally add up to 2 photo previews to show proof of the issue.',
    },
    {
      icon: Navigation,
      title: 'Track your assigned rider live',
      desc: 'Once admin assigns a rider, watch their live map location as they travel to assist you.',
    },
  ];

  const current = slides[onboardingStep];
  const IconComp = current.icon;

  const handleNext = () => {
    if (onboardingStep < 2) {
      setOnboardingStep(onboardingStep + 1);
    } else {
      setActiveScreen('LOGIN');
    }
  };

  const handleSkip = () => {
    setActiveScreen('LOGIN');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.skipBtn} onPress={handleSkip}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <IconComp size={48} color={colors.primary} />
        </View>
        <Text style={styles.title}>{current.title}</Text>
        <Text style={styles.desc}>{current.desc}</Text>

        <View style={styles.dotsRow}>
          {[0, 1, 2].map(idx => (
            <View
              key={idx}
              style={[
                styles.dot,
                idx === onboardingStep && styles.dotActive,
              ]}
            />
          ))}
        </View>
      </View>

      <TouchableOpacity
        style={styles.nextBtn}
        onPress={handleNext}
        activeOpacity={0.85}
      >
        <Text style={styles.nextBtnText}>
          {onboardingStep === 2 ? 'Get Started' : 'Next'}
        </Text>
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
    justifyContent: 'space-between',
  },
  skipBtn: {
    alignSelf: 'flex-end',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  skipText: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: 'rgba(0, 136, 214, 0.1)',
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 12,
  },
  desc: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 32,
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.border,
  },
  dotActive: {
    width: 24,
    backgroundColor: colors.primary,
  },
  nextBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 30,
  },
  nextBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
