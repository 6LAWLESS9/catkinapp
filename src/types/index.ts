export type ComplaintStatus = 'Pending' | 'Rider Assigned' | 'In Progress' | 'Completed';

export interface Rider {
  id: string;
  name: string;
  rating: number;
  avatarUrl: string;
  phone: string;
  currentLat: number;
  currentLng: number;
}

export interface Complaint {
  id: string;
  description: string;
  images: string[]; // max 2 images
  status: ComplaintStatus;
  submissionDate: string;
  completionDate?: string;
  rider?: Rider;
  estimatedArrival?: string;
  currentDistance?: string;
  resolutionText?: string;
  customerLat?: number;
  customerLng?: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'SUBMITTED' | 'RIDER_ASSIGNED' | 'IN_PROGRESS' | 'COMPLETED';
}

export interface UserProfile {
  name: string;
  phone: string;
  email: string;
  avatarUrl: string;
}
