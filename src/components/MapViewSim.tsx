import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { colors } from '../theme/colors';
import { MapPin, Navigation, Compass } from 'lucide-react-native';

interface MapViewSimProps {
  riderName?: string;
  riderAvatar?: string;
  isLive?: boolean;
}

export const MapViewSim: React.FC<MapViewSimProps> = ({
  riderName = 'Assigned Rider',
  riderAvatar,
  isLive = true,
}) => {
  return (
    <View style={styles.mapContainer}>
      {/* Grid Pattern Simulating Map Streets */}
      <View style={styles.gridOverlay}>
        <View style={styles.gridHorizontal1} />
        <View style={styles.gridHorizontal2} />
        <View style={styles.gridVertical1} />
        <View style={styles.gridVertical2} />
        <View style={styles.roadLineMain} />
      </View>

      {/* Live Location Tag */}
      {isLive && (
        <View style={styles.liveBadge}>
          <View style={styles.pulseDot} />
          <Text style={styles.liveBadgeText}>LIVE LOCATION</Text>
        </View>
      )}

      {/* Compass Control */}
      <View style={styles.compassContainer}>
        <Compass size={18} color={colors.textSecondary} />
      </View>

      {/* Rider Pin Marker */}
      <View style={[styles.markerContainer, styles.riderMarkerPos]}>
        <View style={styles.riderPinPulse} />
        <View style={styles.riderPinBubble}>
          {riderAvatar ? (
            <Image source={{ uri: riderAvatar }} style={styles.riderAvatarImg} />
          ) : (
            <Navigation size={14} color="#FFFFFF" />
          )}
        </View>
        <View style={styles.riderLabelCard}>
          <Text style={styles.riderLabelName}>{riderName}</Text>
          <Text style={styles.riderLabelSub}>Rider (Moving)</Text>
        </View>
      </View>

      {/* Customer Pin Marker */}
      <View style={[styles.markerContainer, styles.customerMarkerPos]}>
        <View style={styles.customerPinBubble}>
          <MapPin size={18} color="#FFFFFF" />
        </View>
        <View style={styles.customerLabelCard}>
          <Text style={styles.customerLabelText}>Your Address</Text>
        </View>
      </View>

      {/* Distance route indicator path */}
      <View style={styles.routeDottedLine} />
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    height: 240,
    width: '100%',
    backgroundColor: '#F1F5F9',
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
    borderColor: colors.border,
  },
  gridOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#E2E8F0',
    opacity: 0.8,
  },
  gridHorizontal1: {
    position: 'absolute',
    top: '30%',
    left: 0,
    right: 0,
    height: 12,
    backgroundColor: '#FFFFFF',
  },
  gridHorizontal2: {
    position: 'absolute',
    top: '70%',
    left: 0,
    right: 0,
    height: 8,
    backgroundColor: '#FFFFFF',
  },
  gridVertical1: {
    position: 'absolute',
    left: '25%',
    top: 0,
    bottom: 0,
    width: 10,
    backgroundColor: '#FFFFFF',
  },
  gridVertical2: {
    position: 'absolute',
    left: '75%',
    top: 0,
    bottom: 0,
    width: 8,
    backgroundColor: '#FFFFFF',
  },
  roadLineMain: {
    position: 'absolute',
    left: '25%',
    top: '30%',
    right: '25%',
    bottom: '20%',
    borderWidth: 3,
    borderColor: 'rgba(0, 136, 214, 0.4)',
    borderRadius: 20,
    borderStyle: 'dashed',
  },
  liveBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.primary,
    zIndex: 10,
  },
  pulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  liveBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: 0.5,
  },
  compassContainer: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    zIndex: 10,
  },
  markerContainer: {
    position: 'absolute',
    alignItems: 'center',
    zIndex: 5,
  },
  riderMarkerPos: {
    top: '25%',
    left: '28%',
  },
  riderPinPulse: {
    position: 'absolute',
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 136, 214, 0.2)',
    top: -4,
  },
  riderPinBubble: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  riderAvatarImg: {
    width: 36,
    height: 36,
  },
  riderLabelCard: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.primary,
    marginTop: 4,
  },
  riderLabelName: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  riderLabelSub: {
    fontSize: 9,
    color: colors.primary,
  },
  customerMarkerPos: {
    bottom: '22%',
    right: '28%',
  },
  customerPinBubble: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  customerLabelCard: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.border,
    marginTop: 4,
  },
  customerLabelText: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  routeDottedLine: {
    position: 'absolute',
    top: '35%',
    left: '35%',
    width: 100,
    height: 60,
    borderColor: colors.primary,
    borderWidth: 2,
    borderRadius: 30,
    borderStyle: 'dashed',
    opacity: 0.7,
  },
});
