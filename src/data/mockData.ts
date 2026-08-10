import { Complaint, Rider, NotificationItem, UserProfile } from '../types';

export const INITIAL_USER: UserProfile = {
  name: 'Alex Rivera',
  phone: '+1 (555) 382-9102',
  email: 'alex.rivera@example.com',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
};

export const MOCK_RIDERS: Rider[] = [
  {
    id: 'RIDER-101',
    name: 'Michael Scott',
    rating: 4.9,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    phone: '+1 (555) 901-2233',
    currentLat: 37.7749,
    currentLng: -122.4194,
  },
  {
    id: 'RIDER-102',
    name: 'David Vance',
    rating: 4.8,
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    phone: '+1 (555) 442-8811',
    currentLat: 37.7780,
    currentLng: -122.4150,
  },
];

export const INITIAL_COMPLAINTS: Complaint[] = [
  {
    id: 'CMP-8901',
    description: 'Water leakage near main meter connection causing low pressure in kitchen.',
    images: [
      'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400',
    ],
    status: 'Rider Assigned',
    submissionDate: 'August 10, 2026 at 10:15 AM',
    rider: MOCK_RIDERS[0],
    estimatedArrival: '12 mins',
    currentDistance: '1.4 km away',
    customerLat: 37.7749,
    customerLng: -122.4194,
  },
  {
    id: 'CMP-8899',
    description: 'Power flicker on 2nd floor circuit breaker after heavy storm.',
    images: [],
    status: 'Pending',
    submissionDate: 'August 10, 2026 at 11:45 AM',
    customerLat: 37.7755,
    customerLng: -122.4180,
  },
  {
    id: 'CMP-8850',
    description: 'Fiber internet modem optical light flashing red. Unable to connect.',
    images: [
      'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400',
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400',
    ],
    status: 'In Progress',
    submissionDate: 'August 09, 2026 at 02:30 PM',
    rider: MOCK_RIDERS[1],
    estimatedArrival: 'Arrived at site',
    currentDistance: '0.0 km',
    customerLat: 37.7760,
    customerLng: -122.4165,
  },
  {
    id: 'CMP-8720',
    description: 'Damaged outdoor security sensor box needed replacement.',
    images: [],
    status: 'Completed',
    submissionDate: 'August 07, 2026 at 09:00 AM',
    completionDate: 'August 07, 2026 at 11:30 AM',
    rider: MOCK_RIDERS[0],
    resolutionText: 'Replaced damaged junction box and re-calibrated sensor wiring.',
  },
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'NOTIF-1',
    title: 'Rider Assigned',
    message: 'A rider (Michael Scott) has been assigned to your complaint #CMP-8901. You can now track live location.',
    timestamp: '10 minutes ago',
    read: false,
    type: 'RIDER_ASSIGNED',
  },
  {
    id: 'NOTIF-2',
    title: 'Complaint Submitted',
    message: 'Your complaint #CMP-8899 has been submitted successfully. Waiting for admin rider assignment.',
    timestamp: '45 minutes ago',
    read: true,
    type: 'SUBMITTED',
  },
  {
    id: 'NOTIF-3',
    title: 'Complaint Completed',
    message: 'Complaint #CMP-8720 has been resolved by assigned rider Michael Scott.',
    timestamp: '3 days ago',
    read: true,
    type: 'COMPLETED',
  },
];
