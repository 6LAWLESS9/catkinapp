import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useApp } from '../context/AppContext';
import { colors } from '../theme/colors';
import { ArrowLeft, Camera, X, Check, Info } from 'lucide-react-native';

export const SubmitComplaintScreen: React.FC = () => {
  const { submitComplaint, setActiveScreen } = useApp();

  const [description, setDescription] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [errorMsg, setErrorMsg] = useState('');

  // Sample stock images for upload simulation
  const sampleUploadPool = [
    'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400',
    'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400',
  ];

  const handleAddPicture = () => {
    if (images.length >= 2) return;
    const nextImg = sampleUploadPool[images.length];
    setImages(prev => [...prev, nextImg]);
  };

  const handleRemovePicture = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!description.trim()) {
      setErrorMsg('Please enter a description for your complaint.');
      return;
    }

    submitComplaint(description.trim(), images);
    setActiveScreen('SUBMITTED');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Top Header */}
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => setActiveScreen('HOME')}
      >
        <ArrowLeft size={18} color={colors.textPrimary} />
        <Text style={styles.backBtnText}>Back to Home</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Submit Complaint</Text>
      <Text style={styles.subtitle}>
        Please describe your issue below. You may optionally attach up to 2 photos.
      </Text>

      {/* Description Box */}
      <View style={styles.card}>
        <Text style={styles.label}>Complaint Description *</Text>
        <TextInput
          style={styles.textArea}
          placeholder="Describe your complaint..."
          placeholderTextColor={colors.textMuted}
          multiline
          numberOfLines={6}
          value={description}
          onChangeText={text => {
            setDescription(text);
            if (errorMsg) setErrorMsg('');
          }}
        />
        {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}
      </View>

      {/* Picture Upload Section (Optional max 2 pictures with preview & remove buttons) */}
      <View style={styles.card}>
        <View style={styles.pictureHeader}>
          <Text style={styles.label}>Upload Pictures (Optional)</Text>
          <Text style={styles.pictureNotice}>You can upload up to 2 pictures</Text>
        </View>

        <View style={styles.imageGrid}>
          {images.map((url, idx) => (
            <View key={idx} style={styles.imagePreviewWrapper}>
              <Image source={{ uri: url }} style={styles.imagePreview} />
              <TouchableOpacity
                style={styles.removeBtn}
                onPress={() => handleRemovePicture(idx)}
              >
                <X size={14} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          ))}

          {images.length < 2 && (
            <TouchableOpacity style={styles.uploadBtn} onPress={handleAddPicture}>
              <Camera size={24} color={colors.primaryLight} />
              <Text style={styles.uploadBtnText}>Add Photo ({images.length}/2)</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Rule Notice */}
      <View style={styles.infoBanner}>
        <Info size={16} color={colors.primaryLight} />
        <Text style={styles.infoText}>
          After submission, your complaint will be in Pending state until our admin assigns a rider.
        </Text>
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        style={styles.submitBtn}
        onPress={handleSubmit}
        activeOpacity={0.85}
      >
        <Check size={18} color="#FFFFFF" />
        <Text style={styles.submitBtnText}>Submit Complaint</Text>
      </TouchableOpacity>
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
  subtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
    marginTop: -8,
  },
  card: {
    backgroundColor: colors.bgCard,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 10,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  textArea: {
    backgroundColor: colors.bgDark,
    borderRadius: 10,
    padding: 12,
    color: colors.textPrimary,
    fontSize: 14,
    height: 120,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: colors.border,
  },
  errorText: {
    fontSize: 12,
    color: colors.status['Pending'].border,
  },
  pictureHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pictureNotice: {
    fontSize: 11,
    color: colors.textMuted,
  },
  imageGrid: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 4,
  },
  imagePreviewWrapper: {
    position: 'relative',
    width: 100,
    height: 100,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  imagePreview: {
    width: '100%',
    height: '100%',
  },
  removeBtn: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'rgba(239, 68, 68, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadBtn: {
    width: 100,
    height: 100,
    borderRadius: 12,
    backgroundColor: colors.bgDark,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  uploadBtnText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.primaryLight,
  },
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'rgba(20, 184, 166, 0.1)',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.primaryLight,
  },
  infoText: {
    fontSize: 12,
    color: colors.textSecondary,
    flex: 1,
    lineHeight: 16,
  },
  submitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 8,
  },
  submitBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
