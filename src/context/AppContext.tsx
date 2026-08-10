import React, { createContext, useContext, useState, useMemo } from 'react';
import { Complaint, ComplaintStatus, Rider, NotificationItem, UserProfile } from '../types';
import { INITIAL_COMPLAINTS, INITIAL_NOTIFICATIONS, INITIAL_USER, MOCK_RIDERS } from '../data/mockData';

export type ScreenType =
  | 'SPLASH'
  | 'ONBOARDING'
  | 'LOGIN'
  | 'OTP'
  | 'HOME'
  | 'SUBMIT'
  | 'SUBMITTED'
  | 'MY_COMPLAINTS'
  | 'DETAILS'
  | 'LIVE_TRACKING'
  | 'NOTIFICATIONS'
  | 'PROFILE'
  | 'EDIT_PROFILE'
  | 'HELP_SUPPORT';

interface AppContextType {
  activeScreen: ScreenType;
  setActiveScreen: (screen: ScreenType) => void;
  onboardingStep: number;
  setOnboardingStep: (step: number) => void;
  
  user: UserProfile;
  updateUser: (data: Partial<UserProfile>) => void;

  complaints: Complaint[];
  selectedComplaintId: string | null;
  setSelectedComplaintId: (id: string | null) => void;
  selectedComplaint: Complaint | null;
  lastSubmittedComplaint: Complaint | null;

  notifications: NotificationItem[];
  unreadNotificationCount: number;
  markNotificationsAsRead: () => void;

  submitComplaint: (description: string, images: string[]) => string;
  simulateAdminAssignRider: (complaintId: string) => void;
  updateStatus: (complaintId: string, newStatus: ComplaintStatus) => void;

  // Bottom Navigation tab indicator
  activeBottomTab: 'HOME' | 'MY_COMPLAINTS' | 'NOTIFICATIONS' | 'PROFILE';
  setActiveBottomTab: (tab: 'HOME' | 'MY_COMPLAINTS' | 'NOTIFICATIONS' | 'PROFILE') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeScreen, setActiveScreen] = useState<ScreenType>('SPLASH');
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [activeBottomTab, setActiveBottomTab] = useState<'HOME' | 'MY_COMPLAINTS' | 'NOTIFICATIONS' | 'PROFILE'>('HOME');

  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [complaints, setComplaints] = useState<Complaint[]>(INITIAL_COMPLAINTS);
  const [selectedComplaintId, setSelectedComplaintId] = useState<string | null>(null);
  const [lastSubmittedId, setLastSubmittedId] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  const selectedComplaint = useMemo(() => {
    if (!selectedComplaintId) return null;
    return complaints.find(c => c.id === selectedComplaintId) || null;
  }, [complaints, selectedComplaintId]);

  const lastSubmittedComplaint = useMemo(() => {
    if (!lastSubmittedId) return null;
    return complaints.find(c => c.id === lastSubmittedId) || null;
  }, [complaints, lastSubmittedId]);

  const unreadNotificationCount = useMemo(() => {
    return notifications.filter(n => !n.read).length;
  }, [notifications]);

  const markNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const updateUser = (data: Partial<UserProfile>) => {
    setUser(prev => ({ ...prev, ...data }));
  };

  // Submit Complaint (Rule: max 2 pictures, no title/category field, status starts as Pending)
  const submitComplaint = (description: string, images: string[]): string => {
    const newId = `CMP-${Math.floor(8000 + Math.random() * 1000)}`;
    const now = new Date();
    const formattedDate = `${now.toLocaleString('default', { month: 'long' })} ${now.getDate()}, ${now.getFullYear()} at ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    const newComplaint: Complaint = {
      id: newId,
      description,
      images: images.slice(0, 2), // max 2
      status: 'Pending',
      submissionDate: formattedDate,
      customerLat: 37.7749,
      customerLng: -122.4194,
    };

    const newNotif: NotificationItem = {
      id: `NOTIF-${Date.now()}`,
      title: 'Complaint Submitted',
      message: `Your complaint #${newId} has been submitted successfully. Waiting for admin rider assignment.`,
      timestamp: 'Just now',
      read: false,
      type: 'SUBMITTED',
    };

    setComplaints(prev => [newComplaint, ...prev]);
    setNotifications(prev => [newNotif, ...prev]);
    setLastSubmittedId(newId);
    setSelectedComplaintId(newId);
    return newId;
  };

  // Admin assigns a rider manually
  const simulateAdminAssignRider = (complaintId: string) => {
    setComplaints(prev => prev.map(c => {
      if (c.id !== complaintId) return c;
      const assignedRider = MOCK_RIDERS[0];
      return {
        ...c,
        status: 'Rider Assigned',
        rider: assignedRider,
        estimatedArrival: '10 mins',
        currentDistance: '1.2 km away',
      };
    }));

    const newNotif: NotificationItem = {
      id: `NOTIF-${Date.now()}`,
      title: 'Rider Assigned',
      message: `A rider (${MOCK_RIDERS[0].name}) has been assigned to your complaint #${complaintId}.`,
      timestamp: 'Just now',
      read: false,
      type: 'RIDER_ASSIGNED',
    };

    setNotifications(prev => [newNotif, ...prev]);
  };

  // Update complaint status
  const updateStatus = (complaintId: string, newStatus: ComplaintStatus) => {
    setComplaints(prev => prev.map(c => {
      if (c.id !== complaintId) return c;
      const updated: Complaint = { ...c, status: newStatus };
      if (newStatus === 'Completed') {
        const now = new Date();
        updated.completionDate = `${now.toLocaleString('default', { month: 'long' })} ${now.getDate()}, ${now.getFullYear()} at ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
        updated.resolutionText = 'Complaint issue was resolved and verified by customer.';
      }
      return updated;
    }));
  };

  return (
    <AppContext.Provider
      value={{
        activeScreen,
        setActiveScreen,
        onboardingStep,
        setOnboardingStep,
        user,
        updateUser,
        complaints,
        selectedComplaintId,
        setSelectedComplaintId,
        selectedComplaint,
        lastSubmittedComplaint,
        notifications,
        unreadNotificationCount,
        markNotificationsAsRead,
        submitComplaint,
        simulateAdminAssignRider,
        updateStatus,
        activeBottomTab,
        setActiveBottomTab,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
