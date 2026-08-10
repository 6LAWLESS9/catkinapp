import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { Rider } from '../types';
import { colors } from '../theme/colors';
import { Phone, Star, Headset } from 'lucide-react-native';

interface RiderInfoCardProps {
  rider: Rider;
  estimatedArrival?: string;
  currentDistance?: string;
  onCallRider?: () => void;
  onContactSupport?: () => void;
}

export const RiderInfoCard: React.FC<RiderInfoCardProps> = ({
  rider,
  estimatedArrival,
  currentDistance,
  onCallRider,
  onContactSupport,
}) => {
  const handleCall = () => {
    if (onCallRider) onCallRider();
    else Alert.alert('Calling Rider', `Dialing ${rider.name} at ${rider.phone}...`);
  };

  const handleSupport = () => {
    if (onContactSupport) onContactSupport();
    else Alert.alert('Support Desk', 'Connecting to Customer Support Hotline...');
  };

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <Image source={{ uri: rider.avatarUrl }} style={styles.avatar} />
        <View style={styles.infoContainer}>
          <Text style={styles.riderName}>{rider.name}</Text>
          <View style={styles.ratingRow}>
            <Star size={14} color="#FBBF24" fill="#FBBF24" />
            <Text style={styles.ratingText}>{rider.rating.toFixed(1)} Rating</Text>
            <View style={styles.dotSeparator} />
            <Text style={styles.assignedBadge}>Assigned Rider</Text>
          </View>
        </View>
      </View>

      {(estimatedArrival || currentDistance) && (
        <View style={styles.etaBox}>
          {estimatedArrival && (
            <View style={styles.etaStat}>
              <Text style={styles.etaStatLabel}>Estimated Arrival</Text>
              <Text style={styles.etaStatValue}>{estimatedArrival}</Text>
            </View>
          )}
          {currentDistance && (
            <View style={styles.etaStat}>
              <Text style={styles.etaStatLabel}>Distance</Text>
              <Text style={styles.etaStatValue}>{currentDistance}</Text>
            </View>
          )}
        </View>
      )}

      {/* Buttons: Call Rider & Contact Support (NO vehicle details as required by rule) */}
      <View style={styles.buttonsRow}>
        <TouchableOpacity
          style={styles.callButton}
          onPress={handleCall}
          activeOpacity={0.85}
        >
          <Phone size={16} color="#FFFFFF" />
          <Text style={styles.callButtonText}>Call Rider</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.supportButton}
          onPress={handleSupport}
          activeOpacity={0.85}
        >
          <Headset size={16} color={colors.textPrimary} />
          <Text style={styles.supportButtonText}>Contact Support</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.bgCard,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 14,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: colors.primaryLight,
  },
  infoContainer: {
    flex: 1,
  },
  riderName: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FBBF24',
  },
  dotSeparator: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: colors.textMuted,
  },
  assignedBadge: {
    fontSize: 11,
    color: colors.primaryLight,
    fontWeight: '600',
  },
  etaBox: {
    flexDirection: 'row',
    backgroundColor: colors.bgDark,
    borderRadius: 10,
    padding: 12,
    justifyContent: 'space-around',
    borderWidth: 1,
    borderColor: colors.border,
  },
  etaStat: {
    alignItems: 'center',
  },
  etaStatLabel: {
    fontSize: 10,
    color: colors.textMuted,
    textTransform: 'uppercase',
  },
  etaStatValue: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.textPrimary,
    marginTop: 2,
  },
  buttonsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  callButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 10,
  },
  callButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  supportButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  supportButtonText: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: '700',
  },
});
