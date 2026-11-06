export type UserRole = 'client' | 'admin' | 'staff';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  createdAt: string;
  referralCode?: string;
  referredBy?: string;
  loyaltyPoints?: number;
  avatarUrl?: string;
}

export interface Service {
  id: string;
  name: string;
  slug: string;
  category: 'manual' | 'visceral' | 'craneal' | 'movilidad' | 'salud';
  shortDescription: string;
  fullDescription: string;
  scopeAndBenefits: string[];
  durationMinutes: number;
  price: number;
  available: boolean;
  statusNote?: string; // e.g. "Sujeto a disponibilidad y confirmación previa"
  professionalName: string;
  imageUrl: string;
  badge?: string;
  faqs: { question: string; answer: string }[];
  featured?: boolean;
}

export type AppointmentStatus = 'confirmed' | 'pending' | 'completed' | 'cancelled';
export type PaymentStatus = 'paid' | 'unpaid' | 'bono';
export type PaymentMethod = 'efectivo' | 'tarjeta' | 'bizum' | 'bono' | 'transferencia';

export interface Appointment {
  id: string;
  clientId: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  serviceId: string;
  serviceName: string;
  date: string; // YYYY-MM-DD
  timeSlot: string; // HH:mm
  durationMinutes: number;
  price: number;
  status: AppointmentStatus;
  paymentStatus: PaymentStatus;
  paymentMethod?: PaymentMethod;
  notes?: string;
  isFirstVisit: boolean;
  createdAt: string;
  reminderSent?: boolean;
  postReviewRequested?: boolean;
}

export interface Bono {
  id: string;
  clientId: string;
  clientName: string;
  serviceId: string;
  serviceName: string;
  totalSessions: number;
  remainingSessions: number;
  pricePaid: number;
  purchaseDate: string;
  expiresAt: string;
  status: 'active' | 'exhausted' | 'expired';
}

export interface GiftCard {
  id: string;
  code: string;
  amount: number;
  balance: number;
  senderName: string;
  senderEmail: string;
  recipientName: string;
  recipientEmail: string;
  message?: string;
  issuedAt: string;
  expiresAt: string;
  isRedeemed: boolean;
}

export interface Referral {
  id: string;
  referrerClientId: string;
  referrerName: string;
  referredEmail: string;
  referredName: string;
  codeUsed: string;
  status: 'invited' | 'registered' | 'first_booking_completed';
  rewardApplied: boolean;
  rewardPointsEarned: number;
  createdAt: string;
  completedAt?: string;
}

export interface LoyaltyReward {
  id: string;
  title: string;
  description: string;
  pointsRequired: number;
  discountValue: number; // in Euros or percent
  type: 'euro_discount' | 'free_session' | 'gift_item';
  active: boolean;
}

export interface Campaign {
  id: string;
  title: string;
  code: string;
  discountPercent?: number;
  discountAmount?: number;
  startDate: string;
  endDate: string;
  targetAudience: 'todos' | 'nuevos' | 'inactivos' | 'frecuentes';
  active: boolean;
  usedCount: number;
  maxUses?: number;
  description: string;
}

export interface AutomationRule {
  id: string;
  name: string;
  triggerType: 'booking_confirmed' | 'reminder_24h' | 'post_session' | 'inactive_60d' | 'bono_expiring' | 'birthday';
  channel: 'whatsapp' | 'email' | 'push';
  messageTemplate: string;
  active: boolean;
  lastExecutedAt?: string;
  executionCount: number;
}

export interface HealthAssessmentRecord {
  id: string;
  clientId: string;
  clientName: string;
  encryptedParasanitaryNotes: string; // Stored securely separate from commercial notes
  mobilityConcerns: string;
  posturalHabits: string;
  contraindications: string;
  rgpdConsentSigned: boolean;
  consentSignedDate: string;
  updatedAt: string;
  accessAuditedBy: string;
}

export interface CommercialClientNote {
  id: string;
  clientId: string;
  date: string;
  author: string;
  content: string; // Purely commercial/logistical (e.g. "Prefiere mañanas", "Viene recomendado por Ana")
}

export interface BusinessConfig {
  name: string;
  legalName: string;
  address: string;
  city: string;
  postalCode: string;
  province: string;
  phone: string;
  whatsapp: string;
  email: string;
  openingHours: {
    weekdays: string;
    saturdays: string;
    sundays: string;
  };
  cancellationNoticeHours: number;
  referralRewardPointsReferrer: number;
  referralRewardPointsReferee: number;
}
