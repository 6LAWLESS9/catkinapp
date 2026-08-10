export const colors = {
  // Catkin Blue & White Theme (No extra colors)
  primary: '#0088D6', // Exact Catkin Blue
  primaryLight: '#0099EE',
  primaryDark: '#0066A8',
  primaryBg: 'rgba(0, 136, 214, 0.08)',

  // Clean White Surface & Light Theme
  bgDark: '#FFFFFF', // Pure White page background
  bgCard: '#FFFFFF', // Pure White card surface
  bgCardHover: '#F8FAFC',
  bgInput: '#F8FAFC', // Light input field background
  border: '#E2E8F0', // Soft light gray border
  borderSubtle: '#F1F5F9',

  // High contrast readable text
  textPrimary: '#0F172A', // Dark Slate
  textSecondary: '#475569', // Medium Slate
  textMuted: '#94A3B8', // Light Muted Slate

  // Status colors styled strictly in Catkin Blue & White palette
  status: {
    'Pending': {
      bg: 'rgba(0, 136, 214, 0.08)',
      border: '#0088D6',
      text: '#0088D6',
    },
    'Rider Assigned': {
      bg: 'rgba(0, 136, 214, 0.16)',
      border: '#0088D6',
      text: '#0066A8',
    },
    'In Progress': {
      bg: 'rgba(0, 136, 214, 0.24)',
      border: '#0066A8',
      text: '#00558A',
    },
    'Completed': {
      bg: '#0088D6',
      border: '#0088D6',
      text: '#FFFFFF',
    },
  },
};
