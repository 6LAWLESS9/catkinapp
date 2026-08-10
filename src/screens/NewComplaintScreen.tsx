import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useApp } from '../context/AppContext';
import { colors } from '../theme/colors';
import {
  FilePlus,
  User,
  Mail,
  Phone,
  Paperclip,
  Check,
  AlertCircle,
  HelpCircle,
} from 'lucide-react-native';

export type Category = 'BILLING' | 'TECH_SUPPORT' | 'PRODUCT' | 'DELIVERY' | 'SERVICE' | 'OTHER';
export type Priority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';

export const NewComplaintScreen: React.FC = () => {
  const { submitComplaint, setSelectedComplaintId, setActiveScreen } = useApp();

  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [category, setCategory] = useState<Category>('BILLING');
  const [priority, setPriority] = useState<Priority>('MEDIUM');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [attachment, setAttachment] = useState<string | null>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const categories: Array<{ id: Category; label: string }> = [
    { id: 'BILLING', label: 'Billing & Invoice' },
    { id: 'TECH_SUPPORT', label: 'Technical Support' },
    { id: 'PRODUCT', label: 'Product Defect' },
    { id: 'DELIVERY', label: 'Shipping & Delivery' },
    { id: 'SERVICE', label: 'Customer Service' },
    { id: 'OTHER', label: 'General Enquiry' },
  ];

  const priorities: Array<{ id: Priority; label: string; desc: string }> = [
    { id: 'LOW', label: 'Low', desc: 'SLA: 48 Hours' },
    { id: 'MEDIUM', label: 'Medium', desc: 'SLA: 36 Hours' },
    { id: 'HIGH', label: 'High', desc: 'SLA: 24 Hours' },
    { id: 'URGENT', label: 'Urgent', desc: 'SLA: 12 Hours' },
  ];

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!customerName.trim()) errs.customerName = 'Customer name is required';
    if (!customerEmail.trim() || !customerEmail.includes('@')) errs.customerEmail = 'Valid email is required';
    if (!title.trim() || title.length < 5) errs.title = 'Subject title must be at least 5 characters';
    if (!description.trim() || description.length < 15) errs.description = 'Please provide detailed complaint explanation (min 15 chars)';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const newId = submitComplaint(
      `${title} - ${description}`,
      attachment ? [attachment] : []
    );

    setSelectedComplaintId(newId);
    setActiveScreen('MY_COMPLAINTS');
  };

  const handleSimulateAttachment = () => {
    setAttachment('receipt_invoice_proof.pdf (2.4 MB)');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={styles.headerIconCircle}>
          <FilePlus size={22} color={colors.primary} />
        </View>
        <View>
          <Text style={styles.headerTitle}>File a Customer Complaint</Text>
          <Text style={styles.headerSub}>
            Submit your feedback or issue. Our support team will investigate and respond within SLA targets.
          </Text>
        </View>
      </View>

      {/* Customer Info Form */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>1. Customer Details</Text>

        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Full Name *</Text>
          <View style={styles.inputWrapper}>
            <User size={16} color={colors.textMuted} />
            <TextInput
              style={styles.input}
              placeholder="e.g. Eleanor Vance"
              placeholderTextColor={colors.textMuted}
              value={customerName}
              onChangeText={setCustomerName}
            />
          </View>
          {errors.customerName && <Text style={styles.errorMsg}>{errors.customerName}</Text>}
        </View>

        <View style={styles.rowTwoCols}>
          <View style={[styles.fieldGroup, { flex: 1 }]}>
            <Text style={styles.fieldLabel}>Email Address *</Text>
            <View style={styles.inputWrapper}>
              <Mail size={16} color={colors.textMuted} />
              <TextInput
                style={styles.input}
                placeholder="eleanor@example.com"
                placeholderTextColor={colors.textMuted}
                keyboardType="email-address"
                value={customerEmail}
                onChangeText={setCustomerEmail}
              />
            </View>
            {errors.customerEmail && <Text style={styles.errorMsg}>{errors.customerEmail}</Text>}
          </View>

          <View style={[styles.fieldGroup, { flex: 1 }]}>
            <Text style={styles.fieldLabel}>Phone Number (Optional)</Text>
            <View style={styles.inputWrapper}>
              <Phone size={16} color={colors.textMuted} />
              <TextInput
                style={styles.input}
                placeholder="+1 (555) 000-0000"
                placeholderTextColor={colors.textMuted}
                keyboardType="phone-pad"
                value={customerPhone}
                onChangeText={setCustomerPhone}
              />
            </View>
          </View>
        </View>
      </View>

      {/* Classification Form */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>2. Complaint Classification</Text>

        <Text style={styles.fieldLabel}>Select Category *</Text>
        <View style={styles.categoriesGrid}>
          {categories.map(cat => {
            const isSelected = category === cat.id;
            return (
              <TouchableOpacity
                key={cat.id}
                style={[styles.categoryOption, isSelected && styles.categoryOptionSelected]}
                onPress={() => setCategory(cat.id)}
                activeOpacity={0.8}
              >
                <Text style={[styles.categoryOptionText, isSelected && styles.categoryOptionTextSelected]}>
                  {cat.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={[styles.fieldLabel, { marginTop: 14 }]}>Select Priority Level *</Text>
        <View style={styles.prioritiesGrid}>
          {priorities.map(p => {
            const isSelected = priority === p.id;
            return (
              <TouchableOpacity
                key={p.id}
                style={[styles.priorityOption, isSelected && styles.priorityOptionSelected]}
                onPress={() => setPriority(p.id)}
                activeOpacity={0.8}
              >
                <Text style={[styles.priorityOptionTitle, isSelected && styles.priorityOptionTitleSelected]}>
                  {p.label}
                </Text>
                <Text style={styles.priorityOptionDesc}>{p.desc}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Complaint Details Form */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>3. Complaint Issue Details</Text>

        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Subject Summary / Title *</Text>
          <TextInput
            style={styles.textInputFull}
            placeholder="e.g. Overcharged on invoice #INV-9021"
            placeholderTextColor={colors.textMuted}
            value={title}
            onChangeText={setTitle}
          />
          {errors.title && <Text style={styles.errorMsg}>{errors.title}</Text>}
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Detailed Explanation *</Text>
          <TextInput
            style={[styles.textInputFull, styles.textArea]}
            placeholder="Describe what happened, expected behavior, dates, order numbers, and any relevant details..."
            placeholderTextColor={colors.textMuted}
            multiline
            numberOfLines={5}
            value={description}
            onChangeText={setDescription}
          />
          {errors.description && <Text style={styles.errorMsg}>{errors.description}</Text>}
        </View>

        {/* Attachment Simulator */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Attach Supporting Evidence (Images, Receipts)</Text>
          {attachment ? (
            <View style={styles.attachmentPill}>
              <Paperclip size={14} color={colors.primaryLight} />
              <Text style={styles.attachmentName}>{attachment}</Text>
              <TouchableOpacity onPress={() => setAttachment(null)}>
                <Text style={styles.removeAttachment}>Remove</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity style={styles.uploadBox} onPress={handleSimulateAttachment}>
              <Paperclip size={18} color={colors.textMuted} />
              <Text style={styles.uploadText}>Click to Attach Screenshot or Receipt Document</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        style={styles.submitBtn}
        onPress={handleSubmit}
        activeOpacity={0.85}
      >
        <Check size={18} color="#FFFFFF" />
        <Text style={styles.submitBtnText}>Submit Complaint Ticket</Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.bgCard,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  headerIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(99, 102, 241, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  headerSub: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
    maxWidth: 320,
    lineHeight: 16,
  },
  sectionCard: {
    backgroundColor: colors.bgCard,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  fieldGroup: {
    gap: 6,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.bgDark,
    borderRadius: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: colors.border,
    height: 42,
    gap: 8,
  },
  input: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 13,
  },
  rowTwoCols: {
    flexDirection: 'row',
    gap: 12,
  },
  errorMsg: {
    fontSize: 11,
    color: '#EF4444',
    marginTop: 2,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryOption: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: colors.bgDark,
    borderWidth: 1,
    borderColor: colors.border,
  },
  categoryOptionSelected: {
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
    borderColor: colors.primary,
  },
  categoryOptionText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  categoryOptionTextSelected: {
    color: colors.primaryLight,
    fontWeight: '700',
  },
  prioritiesGrid: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  priorityOption: {
    flex: 1,
    minWidth: 110,
    backgroundColor: colors.bgDark,
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  priorityOptionSelected: {
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
    borderColor: colors.primary,
  },
  priorityOptionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  priorityOptionTitleSelected: {
    color: colors.primaryLight,
  },
  priorityOptionDesc: {
    fontSize: 10,
    color: colors.textMuted,
    marginTop: 2,
  },
  textInputFull: {
    backgroundColor: colors.bgDark,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: colors.textPrimary,
    fontSize: 13,
    borderWidth: 1,
    borderColor: colors.border,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  uploadBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.border,
    backgroundColor: colors.bgDark,
  },
  uploadText: {
    fontSize: 12,
    color: colors.textMuted,
  },
  attachmentPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(99, 102, 241, 0.15)',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  attachmentName: {
    fontSize: 12,
    color: colors.textPrimary,
    fontWeight: '600',
    flex: 1,
  },
  removeAttachment: {
    fontSize: 11,
    color: '#EF4444',
    fontWeight: '700',
  },
  submitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 4,
    marginBottom: 24,
  },
  submitBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
