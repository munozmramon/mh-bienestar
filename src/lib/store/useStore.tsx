'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, 
  Service, 
  Appointment, 
  Bono, 
  GiftCard, 
  Referral, 
  LoyaltyReward, 
  Campaign, 
  AutomationRule, 
  BusinessConfig,
  CommercialClientNote,
  HealthAssessmentRecord,
  AppointmentStatus,
  PaymentStatus,
  PaymentMethod
} from '@/types';
import { 
  initialBusinessConfig, 
  initialServices, 
  initialUsers, 
  initialAppointments, 
  initialBonos, 
  initialGiftCards, 
  initialReferrals, 
  initialLoyaltyRewards, 
  initialCampaigns, 
  initialAutomationRules, 
  initialCommercialNotes, 
  initialHealthRecords 
} from './initialData';

interface AuditLogEntry {
  id: string;
  timestamp: string;
  actorEmail: string;
  action: string;
  details: string;
}

interface StoreContextType {
  currentUser: User | null;
  users: User[];
  services: Service[];
  appointments: Appointment[];
  bonos: Bono[];
  giftCards: GiftCard[];
  referrals: Referral[];
  loyaltyRewards: LoyaltyReward[];
  campaigns: Campaign[];
  automationRules: AutomationRule[];
  commercialNotes: CommercialClientNote[];
  healthRecords: HealthAssessmentRecord[];
  auditLogs: AuditLogEntry[];
  businessConfig: BusinessConfig;
  
  // Auth
  setCurrentUser: (user: User | null) => void;
  loginAs: (email: string) => boolean;
  registerClient: (name: string, email: string, phone: string, referralCodeUsed?: string) => User;
  logout: () => void;
  
  // Services CRUD
  addService: (service: Omit<Service, 'id'>) => Service;
  updateService: (id: string, updates: Partial<Service>) => void;
  deleteService: (id: string) => void;
  
  // Appointments
  isSlotAvailable: (date: string, timeSlot: string, excludeAppointmentId?: string) => boolean;
  bookAppointment: (data: {
    clientName: string;
    clientEmail: string;
    clientPhone: string;
    serviceId: string;
    date: string;
    timeSlot: string;
    notes?: string;
    referralCode?: string;
    couponCode?: string;
    paymentMethod?: PaymentMethod;
  }) => { success: boolean; appointment?: Appointment; message: string };
  cancelAppointment: (id: string, reason?: string) => { success: boolean; message: string };
  rescheduleAppointment: (id: string, newDate: string, newTimeSlot: string) => { success: boolean; message: string };
  updateAppointmentStatus: (id: string, status: AppointmentStatus, paymentStatus?: PaymentStatus, paymentMethod?: PaymentMethod) => void;

  // Bonos & Gift Cards
  purchaseBono: (clientId: string, serviceId: string, sessions: number, price: number) => Bono;
  redeemBonoSession: (bonoId: string) => boolean;
  purchaseGiftCard: (data: {
    amount: number;
    senderName: string;
    senderEmail: string;
    recipientName: string;
    recipientEmail: string;
    message?: string;
  }) => GiftCard;
  verifyAndApplyGiftCard: (code: string) => { valid: boolean; balance?: number; message: string };

  // Loyalty & Referrals
  redeemLoyaltyReward: (clientId: string, rewardId: string) => { success: boolean; message: string };
  
  // Marketing & Campaigns
  validateCoupon: (code: string, currentTotal: number) => { valid: boolean; discountAmount: number; campaign?: Campaign; message: string };
  addCampaign: (campaign: Omit<Campaign, 'id' | 'usedCount'>) => void;
  toggleCampaign: (id: string) => void;

  // Automations
  toggleAutomationRule: (id: string) => void;
  triggerManualAutomation: (ruleId: string, testRecipient: string) => { success: boolean; sentMessage: string };

  // CRM & RGPD
  addCommercialNote: (clientId: string, content: string) => void;
  saveHealthAssessment: (record: Partial<HealthAssessmentRecord> & { clientId: string }) => void;
  deleteClientDataRGPD: (clientId: string) => void;
  exportClientDataJSON: (clientId: string) => string;

  // Stats
  getDashboardStats: () => {
    totalClients: number;
    newClientsThisMonth: number;
    recurrentClients: number;
    appointmentsToday: number;
    appointmentsPending: number;
    appointmentsCancelled: number;
    revenueMonth: number;
    topServices: { name: string; count: number; revenue: number }[];
    inactiveClientsCount: number;
  };
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const STORAGE_KEY = 'mh_bienestar_v1_store';

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [services, setServices] = useState<Service[]>(initialServices);
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [bonos, setBonos] = useState<Bono[]>(initialBonos);
  const [giftCards, setGiftCards] = useState<GiftCard[]>(initialGiftCards);
  const [referrals, setReferrals] = useState<Referral[]>(initialReferrals);
  const [loyaltyRewards, setLoyaltyRewards] = useState<LoyaltyReward[]>(initialLoyaltyRewards);
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);
  const [automationRules, setAutomationRules] = useState<AutomationRule[]>(initialAutomationRules);
  const [commercialNotes, setCommercialNotes] = useState<CommercialClientNote[]>(initialCommercialNotes);
  const [healthRecords, setHealthRecords] = useState<HealthAssessmentRecord[]>(initialHealthRecords);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([
    {
      id: "log-1",
      timestamp: "2026-11-06T09:00:00Z",
      actorEmail: "sistema@mh-bienestar.es",
      action: "INICIALIZACION",
      details: "Sistema M&H Bienestar iniciado con éxito."
    }
  ]);
  const [businessConfig, setBusinessConfig] = useState<BusinessConfig>(initialBusinessConfig);
  const [initialized, setInitialized] = useState(false);

  // Load from local storage if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.users) setUsers(parsed.users);
        if (parsed.services) setServices(parsed.services);
        if (parsed.appointments) setAppointments(parsed.appointments);
        if (parsed.bonos) setBonos(parsed.bonos);
        if (parsed.giftCards) setGiftCards(parsed.giftCards);
        if (parsed.referrals) setReferrals(parsed.referrals);
        if (parsed.loyaltyRewards) setLoyaltyRewards(parsed.loyaltyRewards);
        if (parsed.campaigns) setCampaigns(parsed.campaigns);
        if (parsed.automationRules) setAutomationRules(parsed.automationRules);
        if (parsed.commercialNotes) setCommercialNotes(parsed.commercialNotes);
        if (parsed.healthRecords) setHealthRecords(parsed.healthRecords);
        if (parsed.auditLogs) setAuditLogs(parsed.auditLogs);
        if (parsed.businessConfig) setBusinessConfig(parsed.businessConfig);
        if (parsed.currentUser) setCurrentUser(parsed.currentUser);
      } else {
        // default to first client as signed in for easy testing
        setCurrentUser(initialUsers[1]);
      }
    } catch (e) {
      console.warn("Storage read error:", e);
      setCurrentUser(initialUsers[1]);
    }
    setInitialized(true);
  }, []);

  // Sync to local storage
  useEffect(() => {
    if (!initialized) return;
    try {
      const dataToSave = {
        users,
        services,
        appointments,
        bonos,
        giftCards,
        referrals,
        loyaltyRewards,
        campaigns,
        automationRules,
        commercialNotes,
        healthRecords,
        auditLogs,
        businessConfig,
        currentUser
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    } catch (e) {
      console.warn("Storage save error:", e);
    }
  }, [
    initialized,
    users,
    services,
    appointments,
    bonos,
    giftCards,
    referrals,
    loyaltyRewards,
    campaigns,
    automationRules,
    commercialNotes,
    healthRecords,
    auditLogs,
    businessConfig,
    currentUser
  ]);

  const addAuditLog = (action: string, details: string) => {
    const newLog: AuditLogEntry = {
      id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toISOString(),
      actorEmail: currentUser ? currentUser.email : 'anonimo',
      action,
      details
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const loginAs = (email: string): boolean => {
    const user = users.find(u => u.email.toLowerCase().trim() === email.toLowerCase().trim());
    if (user) {
      setCurrentUser(user);
      addAuditLog("LOGIN", `Inicio de sesión con éxito: ${user.email} (${user.role})`);
      return true;
    }
    return false;
  };

  const registerClient = (name: string, email: string, phone: string, referralCodeUsed?: string): User => {
    const cleanEmail = email.toLowerCase().trim();
    const existing = users.find(u => u.email.toLowerCase() === cleanEmail);
    if (existing) {
      setCurrentUser(existing);
      return existing;
    }

    const cleanCode = `MH-${name.split(' ')[0].toUpperCase()}-${Math.floor(10 + Math.random() * 90)}`;
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name,
      email: cleanEmail,
      phone,
      role: 'client',
      createdAt: new Date().toISOString(),
      referralCode: cleanCode,
      referredBy: referralCodeUsed,
      loyaltyPoints: referralCodeUsed ? businessConfig.referralRewardPointsReferee : 50
    };

    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);

    if (referralCodeUsed) {
      const referrer = users.find(u => u.referralCode?.toUpperCase() === referralCodeUsed.toUpperCase());
      if (referrer && referrer.id !== newUser.id) {
        const newReferral: Referral = {
          id: `ref-${Date.now()}`,
          referrerClientId: referrer.id,
          referrerName: referrer.name,
          referredEmail: cleanEmail,
          referredName: name,
          codeUsed: referralCodeUsed,
          status: 'registered',
          rewardApplied: false,
          rewardPointsEarned: businessConfig.referralRewardPointsReferrer,
          createdAt: new Date().toISOString()
        };
        setReferrals(prev => [...prev, newReferral]);
      }
    }

    addAuditLog("REGISTRO_CLIENTE", `Nuevo cliente registrado: ${newUser.name} (${newUser.email})`);
    return newUser;
  };

  const logout = () => {
    if (currentUser) {
      addAuditLog("LOGOUT", `Cierre de sesión de ${currentUser.email}`);
    }
    setCurrentUser(null);
  };

  // Services CRUD
  const addService = (serviceData: Omit<Service, 'id'>): Service => {
    const newService: Service = {
      ...serviceData,
      id: `srv-${Date.now()}`
    };
    setServices(prev => [...prev, newService]);
    addAuditLog("CREAR_SERVICIO", `Servicio creado: ${newService.name} (${newService.price}€)`);
    return newService;
  };

  const updateService = (id: string, updates: Partial<Service>) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
    addAuditLog("MODIFICAR_SERVICIO", `Servicio modificado ID: ${id}`);
  };

  const deleteService = (id: string) => {
    setServices(prev => prev.filter(s => s.id !== id));
    addAuditLog("ELIMINAR_SERVICIO", `Servicio eliminado ID: ${id}`);
  };

  // Appointment availability & booking
  const isSlotAvailable = (date: string, timeSlot: string, excludeAppointmentId?: string): boolean => {
    const match = appointments.find(a => 
      a.date === date && 
      a.timeSlot === timeSlot && 
      a.status !== 'cancelled' &&
      a.id !== excludeAppointmentId
    );
    return !match;
  };

  const bookAppointment = (data: {
    clientName: string;
    clientEmail: string;
    clientPhone: string;
    serviceId: string;
    date: string;
    timeSlot: string;
    notes?: string;
    referralCode?: string;
    couponCode?: string;
    paymentMethod?: PaymentMethod;
  }) => {
    const srv = services.find(s => s.id === data.serviceId);
    if (!srv) {
      return { success: false, message: 'El servicio seleccionado no existe.' };
    }

    // Availability validation to prevent double booking
    if (!isSlotAvailable(data.date, data.timeSlot)) {
      return { 
        success: false, 
        message: 'Lo sentimos, este horario acaba de ser ocupado. Por favor, selecciona otra hora o fecha.' 
      };
    }

    // Determine or register client
    let client = users.find(u => u.email.toLowerCase() === data.clientEmail.toLowerCase());
    let isFirst = false;
    if (!client) {
      client = registerClient(data.clientName, data.clientEmail, data.clientPhone, data.referralCode);
      isFirst = true;
    } else {
      const priorVisits = appointments.filter(a => a.clientId === client!.id && a.status === 'completed');
      isFirst = priorVisits.length === 0;
    }

    // Apply coupon if valid
    let finalPrice = srv.price;
    if (data.couponCode) {
      const couponCheck = validateCoupon(data.couponCode, srv.price);
      if (couponCheck.valid) {
        finalPrice = Math.max(0, srv.price - couponCheck.discountAmount);
        // increment coupon usage
        if (couponCheck.campaign) {
          setCampaigns(prev => prev.map(c => c.id === couponCheck.campaign!.id ? { ...c, usedCount: c.usedCount + 1 } : c));
        }
      }
    }

    const newAppointment: Appointment = {
      id: `apt-${Date.now()}`,
      clientId: client.id,
      clientName: client.name,
      clientEmail: client.email,
      clientPhone: client.phone,
      serviceId: srv.id,
      serviceName: srv.name,
      date: data.date,
      timeSlot: data.timeSlot,
      durationMinutes: srv.durationMinutes,
      price: finalPrice,
      status: 'confirmed',
      paymentStatus: data.paymentMethod ? 'paid' : 'unpaid',
      paymentMethod: data.paymentMethod || 'efectivo',
      notes: data.notes,
      isFirstVisit: isFirst,
      createdAt: new Date().toISOString(),
      reminderSent: false,
      postReviewRequested: false
    };

    setAppointments(prev => [...prev, newAppointment]);

    // Give loyalty points for booking
    const earnedPoints = Math.round(finalPrice * 2);
    setUsers(prev => prev.map(u => u.id === client!.id ? { 
      ...u, 
      loyaltyPoints: (u.loyaltyPoints || 0) + earnedPoints 
    } : u));

    // If client had an active referral, mark reward if this is their first completed/confirmed session
    if (client.referredBy) {
      setReferrals(prev => prev.map(ref => {
        if (ref.referredEmail.toLowerCase() === client!.email.toLowerCase() && !ref.rewardApplied) {
          // reward referrer
          setUsers(userList => userList.map(u => u.id === ref.referrerClientId ? {
            ...u,
            loyaltyPoints: (u.loyaltyPoints || 0) + ref.rewardPointsEarned
          } : u));
          return {
            ...ref,
            status: 'first_booking_completed',
            rewardApplied: true,
            completedAt: new Date().toISOString()
          };
        }
        return ref;
      }));
    }

    addAuditLog(
      "NUEVA_RESERVA", 
      `Reserva confirmada: ${srv.name} para ${client.name} el ${data.date} a las ${data.timeSlot}`
    );

    return { 
      success: true, 
      appointment: newAppointment, 
      message: 'Tu cita ha sido confirmada con éxito. Te hemos enviado un resumen.' 
    };
  };

  const cancelAppointment = (id: string, reason?: string) => {
    const apt = appointments.find(a => a.id === id);
    if (!apt) return { success: false, message: 'Cita no encontrada.' };

    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: 'cancelled' } : a));
    addAuditLog("CANCELAR_CITA", `Cita cancelada: ${apt.serviceName} de ${apt.clientName}. Motivo: ${reason || 'Solicitado por el usuario'}`);
    return { success: true, message: 'La cita ha sido cancelada conforme a las políticas del centro.' };
  };

  const rescheduleAppointment = (id: string, newDate: string, newTimeSlot: string) => {
    if (!isSlotAvailable(newDate, newTimeSlot, id)) {
      return { success: false, message: 'El nuevo horario seleccionado ya está reservado.' };
    }

    setAppointments(prev => prev.map(a => a.id === id ? { 
      ...a, 
      date: newDate, 
      timeSlot: newTimeSlot,
      status: 'confirmed' 
    } : a));

    addAuditLog("REPROGRAMAR_CITA", `Cita ID ${id} reprogramada a ${newDate} ${newTimeSlot}`);
    return { success: true, message: 'Cita reprogramada correctamente.' };
  };

  const updateAppointmentStatus = (id: string, status: AppointmentStatus, paymentStatus?: PaymentStatus, paymentMethod?: PaymentMethod) => {
    setAppointments(prev => prev.map(a => {
      if (a.id === id) {
        return {
          ...a,
          status,
          ...(paymentStatus ? { paymentStatus } : {}),
          ...(paymentMethod ? { paymentMethod } : {})
        };
      }
      return a;
    }));
    addAuditLog("ACTUALIZAR_ESTADO_CITA", `Cita ID ${id} actualizada a estado: ${status}`);
  };

  // Bonos & Gift Cards
  const purchaseBono = (clientId: string, serviceId: string, sessions: number, price: number): Bono => {
    const client = users.find(u => u.id === clientId);
    const srv = services.find(s => s.id === serviceId);
    const now = new Date();
    const expiry = new Date(now.getFullYear(), now.getMonth() + 6, now.getDate()).toISOString().split('T')[0];

    const newBono: Bono = {
      id: `bno-${Date.now()}`,
      clientId,
      clientName: client ? client.name : 'Cliente M&H',
      serviceId,
      serviceName: `${srv ? srv.name : 'Sesiones M&H'} (Bono ${sessions})`,
      totalSessions: sessions,
      remainingSessions: sessions,
      pricePaid: price,
      purchaseDate: now.toISOString().split('T')[0],
      expiresAt: expiry,
      status: 'active'
    };

    setBonos(prev => [newBono, ...prev]);
    addAuditLog("COMPRA_BONO", `Bono adquirido por ${newBono.clientName}: ${newBono.serviceName} (${price}€)`);
    return newBono;
  };

  const redeemBonoSession = (bonoId: string): boolean => {
    const bono = bonos.find(b => b.id === bonoId);
    if (!bono || bono.remainingSessions <= 0 || bono.status !== 'active') return false;

    const remaining = bono.remainingSessions - 1;
    setBonos(prev => prev.map(b => b.id === bonoId ? {
      ...b,
      remainingSessions: remaining,
      status: remaining === 0 ? 'exhausted' : 'active'
    } : b));

    addAuditLog("CONSUMO_BONO", `Sesión consumida de bono ${bono.serviceName}. Restantes: ${remaining}`);
    return true;
  };

  const purchaseGiftCard = (data: {
    amount: number;
    senderName: string;
    senderEmail: string;
    recipientName: string;
    recipientEmail: string;
    message?: string;
  }): GiftCard => {
    const now = new Date();
    const expiry = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate()).toISOString();
    const code = `REGALO-MH-${Math.floor(1000 + Math.random() * 9000)}`;

    const newCard: GiftCard = {
      id: `gc-${Date.now()}`,
      code,
      amount: data.amount,
      balance: data.amount,
      senderName: data.senderName,
      senderEmail: data.senderEmail,
      recipientName: data.recipientName,
      recipientEmail: data.recipientEmail,
      message: data.message,
      issuedAt: now.toISOString(),
      expiresAt: expiry,
      isRedeemed: false
    };

    setGiftCards(prev => [newCard, ...prev]);
    addAuditLog("TARJETA_REGALO_CREADA", `Tarjeta de regalo ${code} (${data.amount}€) para ${data.recipientName}`);
    return newCard;
  };

  const verifyAndApplyGiftCard = (code: string) => {
    const card = giftCards.find(g => g.code.toUpperCase() === code.trim().toUpperCase());
    if (!card) return { valid: false, message: 'Código de tarjeta regalo no encontrado.' };
    if (card.isRedeemed || card.balance <= 0) return { valid: false, message: 'Esta tarjeta ya ha sido canjeada.' };
    if (new Date(card.expiresAt) < new Date()) return { valid: false, message: 'La tarjeta regalo ha caducado.' };

    return { 
      valid: true, 
      balance: card.balance, 
      message: `Tarjeta regalo válida con saldo de ${card.balance}€.` 
    };
  };

  // Loyalty rewards
  const redeemLoyaltyReward = (clientId: string, rewardId: string) => {
    const user = users.find(u => u.id === clientId);
    const reward = loyaltyRewards.find(r => r.id === rewardId);
    if (!user || !reward) return { success: false, message: 'Usuario o premio no válido.' };

    const points = user.loyaltyPoints || 0;
    if (points < reward.pointsRequired) {
      return { 
        success: false, 
        message: `Necesitas ${reward.pointsRequired} puntos para este premio (tienes ${points}).` 
      };
    }

    setUsers(prev => prev.map(u => u.id === clientId ? {
      ...u,
      loyaltyPoints: points - reward.pointsRequired
    } : u));

    addAuditLog("CANJE_FIDELIZACION", `Premio "${reward.title}" canjeado por ${user.name}`);
    return { success: true, message: `¡Felicidades! Has canjeado "${reward.title}". Se aplicará en tu cita.` };
  };

  // Coupons & Campaigns
  const validateCoupon = (code: string, currentTotal: number) => {
    const clean = code.trim().toUpperCase();
    const campaign = campaigns.find(c => c.code.toUpperCase() === clean && c.active);
    if (!campaign) {
      return { valid: false, discountAmount: 0, message: 'Cupón no válido o inactivo.' };
    }

    const today = new Date().toISOString().split('T')[0];
    if (campaign.startDate > today || campaign.endDate < today) {
      return { valid: false, discountAmount: 0, message: 'El cupón ha caducado o aún no ha comenzado.' };
    }

    if (campaign.maxUses && campaign.usedCount >= campaign.maxUses) {
      return { valid: false, discountAmount: 0, message: 'El cupón ha alcanzado el límite de usos permitidos.' };
    }

    let discount = 0;
    if (campaign.discountPercent) {
      discount = Math.round((currentTotal * campaign.discountPercent) / 100);
    } else if (campaign.discountAmount) {
      discount = Math.min(currentTotal, campaign.discountAmount);
    }

    return { 
      valid: true, 
      discountAmount: discount, 
      campaign, 
      message: `¡Cupón ${clean} aplicado con éxito (-${discount}€)!` 
    };
  };

  const addCampaign = (campaignData: Omit<Campaign, 'id' | 'usedCount'>) => {
    const newCamp: Campaign = {
      ...campaignData,
      id: `cmp-${Date.now()}`,
      usedCount: 0
    };
    setCampaigns(prev => [...prev, newCamp]);
    addAuditLog("CREAR_CAMPANA", `Campaña ${newCamp.title} (${newCamp.code}) creada.`);
  };

  const toggleCampaign = (id: string) => {
    setCampaigns(prev => prev.map(c => c.id === id ? { ...c, active: !c.active } : c));
  };

  // Automations
  const toggleAutomationRule = (id: string) => {
    setAutomationRules(prev => prev.map(r => r.id === id ? { ...r, active: !r.active } : r));
  };

  const triggerManualAutomation = (ruleId: string, testRecipient: string) => {
    const rule = automationRules.find(r => r.id === ruleId);
    if (!rule) return { success: false, sentMessage: '' };

    const rendered = rule.messageTemplate
      .replace('{{nombre}}', testRecipient || 'Cliente')
      .replace('{{servicio}}', 'Reeducación Corporal')
      .replace('{{fecha}}', 'mañana')
      .replace('{{hora}}', '11:00')
      .replace('{{link}}', 'https://quirosteopatiamh.es/mi-cuenta')
      .replace('{{sesiones_restantes}}', '1')
      .replace('{{fecha_caducidad}}', '30/11/2026');

    setAutomationRules(prev => prev.map(r => r.id === ruleId ? {
      ...r,
      executionCount: r.executionCount + 1,
      lastExecutedAt: new Date().toISOString()
    } : r));

    addAuditLog("DISPARO_AUTOMATIZACION", `Disparador ejecutado [${rule.name}] vía ${rule.channel}`);
    return { success: true, sentMessage: rendered };
  };

  // Notes & RGPD Health Records
  const addCommercialNote = (clientId: string, content: string) => {
    const note: CommercialClientNote = {
      id: `cn-${Date.now()}`,
      clientId,
      date: new Date().toISOString().split('T')[0],
      author: currentUser ? currentUser.name : 'Personal M&H',
      content
    };
    setCommercialNotes(prev => [note, ...prev]);
    addAuditLog("NOTA_COMERCIAL", `Nota añadida al cliente ${clientId}`);
  };

  const saveHealthAssessment = (data: Partial<HealthAssessmentRecord> & { clientId: string }) => {
    const existingIndex = healthRecords.findIndex(h => h.clientId === data.clientId);
    const client = users.find(u => u.id === data.clientId);

    if (existingIndex >= 0) {
      setHealthRecords(prev => prev.map((h, i) => i === existingIndex ? {
        ...h,
        ...data,
        updatedAt: new Date().toISOString(),
        accessAuditedBy: currentUser ? currentUser.email : 'admin'
      } : h));
    } else {
      const newRecord: HealthAssessmentRecord = {
        id: `hr-${Date.now()}`,
        clientId: data.clientId,
        clientName: client ? client.name : 'Cliente M&H',
        encryptedParasanitaryNotes: data.encryptedParasanitaryNotes || '',
        mobilityConcerns: data.mobilityConcerns || '',
        posturalHabits: data.posturalHabits || '',
        contraindications: data.contraindications || '',
        rgpdConsentSigned: true,
        consentSignedDate: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        accessAuditedBy: currentUser ? currentUser.email : 'admin'
      };
      setHealthRecords(prev => [...prev, newRecord]);
    }

    addAuditLog(
      "ACCESO_REGISTRO_SALUD", 
      `Actualización de ficha parasanitaria del cliente ${data.clientId} con consentimiento firmado.`
    );
  };

  const deleteClientDataRGPD = (clientId: string) => {
    const user = users.find(u => u.id === clientId);
    if (!user) return;

    setUsers(prev => prev.filter(u => u.id !== clientId));
    setAppointments(prev => prev.filter(a => a.clientId !== clientId));
    setBonos(prev => prev.filter(b => b.clientId !== clientId));
    setCommercialNotes(prev => prev.filter(n => n.clientId !== clientId));
    setHealthRecords(prev => prev.filter(h => h.clientId !== clientId));

    addAuditLog("DERECHO_AL_OLVIDO_RGPD", `Borrado integral de datos del cliente: ${user.name} (${user.email})`);
    if (currentUser?.id === clientId) {
      setCurrentUser(null);
    }
  };

  const exportClientDataJSON = (clientId: string): string => {
    const user = users.find(u => u.id === clientId);
    const userAppointments = appointments.filter(a => a.clientId === clientId);
    const userBonos = bonos.filter(b => b.clientId === clientId);
    const userHealth = healthRecords.find(h => h.clientId === clientId);

    const exportData = {
      rgpdHeader: "Certificado de Portabilidad de Datos — Centro Parasanitario M&H (Orcera)",
      exportedAt: new Date().toISOString(),
      user,
      appointments: userAppointments,
      bonos: userBonos,
      healthRecordNotice: userHealth ? "Existe registro parasanitario custodiado con consentimiento" : "Sin registro clínico",
    };

    addAuditLog("EXPORTACION_DATOS_RGPD", `Exportación de datos de cliente ID ${clientId}`);
    return JSON.stringify(exportData, null, 2);
  };

  // Live Dashboard Stats
  const getDashboardStats = () => {
    const totalClients = users.filter(u => u.role === 'client').length;
    
    // Appointments breakdown
    const todayStr = "2026-11-06"; // Synchronized with current simulation date
    const appointmentsToday = appointments.filter(a => a.date === todayStr && a.status !== 'cancelled').length;
    const appointmentsPending = appointments.filter(a => a.status === 'confirmed').length;
    const appointmentsCancelled = appointments.filter(a => a.status === 'cancelled').length;

    // Monthly revenue (completed or paid)
    const revenueMonth = appointments
      .filter(a => a.paymentStatus === 'paid')
      .reduce((acc, curr) => acc + curr.price, 0) +
      bonos.reduce((acc, curr) => acc + curr.pricePaid, 0);

    // Top services
    const serviceCounts: Record<string, { name: string; count: number; revenue: number }> = {};
    appointments.forEach(a => {
      if (!serviceCounts[a.serviceId]) {
        serviceCounts[a.serviceId] = { name: a.serviceName, count: 0, revenue: 0 };
      }
      serviceCounts[a.serviceId].count += 1;
      if (a.paymentStatus === 'paid') {
        serviceCounts[a.serviceId].revenue += a.price;
      }
    });

    const topServices = Object.values(serviceCounts).sort((a, b) => b.count - a.count);

    // Inactive clients (> 45 days without appointment)
    const clientLastVisit: Record<string, string> = {};
    appointments.forEach(a => {
      if (a.status === 'completed') {
        if (!clientLastVisit[a.clientId] || clientLastVisit[a.clientId] < a.date) {
          clientLastVisit[a.clientId] = a.date;
        }
      }
    });

    const inactiveClientsCount = users.filter(u => {
      if (u.role !== 'client') return false;
      const last = clientLastVisit[u.id];
      if (!last) return true;
      const diffDays = (new Date("2026-11-06").getTime() - new Date(last).getTime()) / (1000 * 3600 * 24);
      return diffDays > 60;
    }).length;

    return {
      totalClients,
      newClientsThisMonth: 3,
      recurrentClients: totalClients - 1,
      appointmentsToday,
      appointmentsPending,
      appointmentsCancelled,
      revenueMonth,
      topServices,
      inactiveClientsCount
    };
  };

  return (
    <StoreContext.Provider value={{
      currentUser,
      users,
      services,
      appointments,
      bonos,
      giftCards,
      referrals,
      loyaltyRewards,
      campaigns,
      automationRules,
      commercialNotes,
      healthRecords,
      auditLogs,
      businessConfig,
      setCurrentUser,
      loginAs,
      registerClient,
      logout,
      addService,
      updateService,
      deleteService,
      isSlotAvailable,
      bookAppointment,
      cancelAppointment,
      rescheduleAppointment,
      updateAppointmentStatus,
      purchaseBono,
      redeemBonoSession,
      purchaseGiftCard,
      verifyAndApplyGiftCard,
      redeemLoyaltyReward,
      validateCoupon,
      addCampaign,
      toggleCampaign,
      toggleAutomationRule,
      triggerManualAutomation,
      addCommercialNote,
      saveHealthAssessment,
      deleteClientDataRGPD,
      exportClientDataJSON,
      getDashboardStats
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

