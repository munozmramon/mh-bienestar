'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store/useStore';
import { 
  ShieldCheck, 
  Users, 
  Calendar, 
  DollarSign, 
  Settings, 
  Megaphone, 
  Zap, 
  FileText, 
  Activity, 
  Search, 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  QrCode, 
  Download, 
  Share2, 
  Copy, 
  Check, 
  Lock, 
  Eye, 
  Filter, 
  MessageCircle, 
  Send,
  AlertCircle
} from 'lucide-react';
import QRCode from 'qrcode';

export default function AdminPage() {
  const { 
    currentUser, 
    loginAs,
    users, 
    services, 
    appointments, 
    bonos, 
    referrals, 
    campaigns, 
    automationRules, 
    commercialNotes, 
    healthRecords, 
    auditLogs,
    businessConfig,
    addService,
    updateService,
    deleteService,
    updateAppointmentStatus,
    bookAppointment,
    cancelAppointment,
    addCommercialNote,
    saveHealthAssessment,
    deleteClientDataRGPD,
    addCampaign,
    toggleCampaign,
    toggleAutomationRule,
    triggerManualAutomation,
    getDashboardStats
  } = useStore();

  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'crm' | 'agenda' | 'servicios' | 'finanzas' | 'marketing' | 'redes' | 'automatizaciones' | 'salud' | 'ajustes'
  >('dashboard');

  const stats = getDashboardStats();

  // If not logged in as admin/staff, show easy 1-click elevation
  if (!currentUser || (currentUser.role !== 'admin' && currentUser.role !== 'staff')) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-3xl bg-forest-900 text-gold-300 flex items-center justify-center mb-4 border border-gold-400/40">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-forest-950 mb-2">
          Acceso Privado al Panel de Gestión
        </h2>
        <p className="text-xs sm:text-sm text-forest-600 max-w-md mb-6 leading-relaxed">
          Esta zona está reservada al personal autorizado y dirección del Centro Parasanitario M&amp;H.
        </p>

        <button
          onClick={() => loginAs('admin@mh-bienestar.es')}
          className="px-6 py-3 rounded-xl text-xs font-semibold text-white bg-forest-800 hover:bg-forest-700 shadow-soft-md transition-all flex items-center gap-2"
        >
          <Lock className="w-4 h-4 text-gold-300" />
          <span>Acceder con Credenciales de Administrador (Demo)</span>
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warm-100/60 pb-16">
      
      {/* Top Admin Bar */}
      <div className="bg-forest-950 text-warm-100 border-b border-forest-800 px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-forest-800 border border-gold-400/40 flex items-center justify-center text-gold-300 font-serif font-bold text-sm">
            M&amp;H
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-warm-50 text-sm">Panel Administrativo M&amp;H</span>
              <span className="text-[10px] bg-gold-500/20 text-gold-300 px-2 py-0.5 rounded font-bold border border-gold-400/30">
                SuperAdmin
              </span>
            </div>
            <p className="text-[11px] text-sage-300">Orcera (Jaén) · Conexión Segura RLS</p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span className="text-sage-300 hidden sm:inline">Sesión: {currentUser.name} ({currentUser.email})</span>
          <button
            onClick={() => loginAs('maria.garcia@email.com')}
            className="px-3 py-1.5 rounded-lg bg-forest-800 hover:bg-forest-700 text-warm-200 text-xs font-medium border border-forest-700"
          >
            Ver como Cliente
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        
        {/* Navigation Tabs Bar */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-2 scrollbar-none">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: Activity },
            { id: 'agenda', label: 'Agenda & Citas', icon: Calendar },
            { id: 'crm', label: 'Clientes (CRM)', icon: Users },
            { id: 'salud', label: 'Fichas Salud (RGPD)', icon: Lock },
            { id: 'servicios', label: 'Servicios & Tarifas', icon: FileText },
            { id: 'finanzas', label: 'Finanzas & Cobros', icon: DollarSign },
            { id: 'marketing', label: 'Marketing & Referidos', icon: Megaphone },
            { id: 'redes', label: 'Centro Redes Sociales', icon: Share2 },
            { id: 'automatizaciones', label: 'Automatizaciones', icon: Zap },
            { id: 'ajustes', label: 'Configuración', icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-forest-800 text-white shadow-soft-sm'
                    : 'bg-white text-forest-800 hover:bg-warm-200 border border-warm-300'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* 1. DASHBOARD */}
        {activeTab === 'dashboard' && <AdminDashboard stats={stats} appointments={appointments} />}

        {/* 2. AGENDA */}
        {activeTab === 'agenda' && (
          <AdminAgenda 
            appointments={appointments} 
            services={services}
            users={users}
            onUpdateStatus={updateAppointmentStatus}
            onCancel={cancelAppointment}
            onBook={bookAppointment}
          />
        )}

        {/* 3. CRM */}
        {activeTab === 'crm' && (
          <AdminCRM 
            users={users}
            appointments={appointments}
            bonos={bonos}
            commercialNotes={commercialNotes}
            onAddNote={addCommercialNote}
            onDeleteClient={deleteClientDataRGPD}
          />
        )}

        {/* 4. SALUD / PARASANITARIO RGPD */}
        {activeTab === 'salud' && (
          <AdminHealthRecords 
            users={users}
            healthRecords={healthRecords}
            onSaveHealthRecord={saveHealthAssessment}
          />
        )}

        {/* 5. SERVICIOS */}
        {activeTab === 'servicios' && (
          <AdminServices 
            services={services}
            onAddService={addService}
            onUpdateService={updateService}
            onDeleteService={deleteService}
          />
        )}

        {/* 6. FINANZAS */}
        {activeTab === 'finanzas' && (
          <AdminFinances 
            appointments={appointments}
            bonos={bonos}
            onUpdateStatus={updateAppointmentStatus}
          />
        )}

        {/* 7. MARKETING & REFERIDOS */}
        {activeTab === 'marketing' && (
          <AdminMarketing 
            campaigns={campaigns}
            referrals={referrals}
            onAddCampaign={addCampaign}
            onToggleCampaign={toggleCampaign}
          />
        )}

        {/* 8. CENTRO DE CONTENIDOS PARA REDES SOCIALES */}
        {activeTab === 'redes' && <AdminSocialHub />}

        {/* 9. AUTOMATIZACIONES */}
        {activeTab === 'automatizaciones' && (
          <AdminAutomations 
            rules={automationRules}
            onToggle={toggleAutomationRule}
            onTest={triggerManualAutomation}
          />
        )}

        {/* 10. AJUSTES */}
        {activeTab === 'ajustes' && (
          <AdminSettings businessConfig={businessConfig} auditLogs={auditLogs} />
        )}

      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// SUB-COMPONENT: DASHBOARD
// ---------------------------------------------------------------------------
function AdminDashboard({ stats, appointments }: any) {
  return (
    <div className="space-y-6">
      
      {/* Real KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-2xl bg-white border border-warm-300 shadow-soft-sm space-y-1">
          <span className="text-[11px] font-semibold text-forest-500 uppercase tracking-wider">Citas Hoy</span>
          <p className="font-serif text-3xl font-bold text-forest-950">{stats.appointmentsToday}</p>
          <span className="text-[11px] text-sage-600 font-medium">Lunes a Sábado en Orcera</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-warm-300 shadow-soft-sm space-y-1">
          <span className="text-[11px] font-semibold text-forest-500 uppercase tracking-wider">Citas Pendientes</span>
          <p className="font-serif text-3xl font-bold text-forest-950">{stats.appointmentsPending}</p>
          <span className="text-[11px] text-emerald-700 font-medium">Activas en calendario</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-warm-300 shadow-soft-sm space-y-1">
          <span className="text-[11px] font-semibold text-forest-500 uppercase tracking-wider">Ingresos Contabilizados</span>
          <p className="font-serif text-3xl font-bold text-gold-700">{stats.revenueMonth}€</p>
          <span className="text-[11px] text-forest-600 font-medium">Sesiones pagadas + Bonos</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-warm-300 shadow-soft-sm space-y-1">
          <span className="text-[11px] font-semibold text-forest-500 uppercase tracking-wider">Total Clientes CRM</span>
          <p className="font-serif text-3xl font-bold text-forest-950">{stats.totalClients}</p>
          <span className="text-[11px] text-forest-600 font-medium">{stats.inactiveClientsCount} inactivos &gt; 60d</span>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Top Services Breakdown */}
        <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-warm-300 shadow-soft-sm space-y-4">
          <h3 className="font-serif text-lg font-bold text-forest-950">Servicios Más Demandados</h3>
          <div className="space-y-3">
            {stats.topServices.map((srv: any, idx: number) => (
              <div key={idx} className="p-3.5 rounded-xl bg-warm-50 border border-warm-200 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-forest-900">{srv.name}</p>
                  <p className="text-forest-500 text-[11px]">{srv.count} citas gestionadas</p>
                </div>
                <div className="text-right">
                  <span className="font-bold text-gold-700">{srv.revenue}€</span>
                  <p className="text-[10px] text-sage-600">cobrado</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Appointments Feed */}
        <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-warm-300 shadow-soft-sm space-y-4">
          <h3 className="font-serif text-lg font-bold text-forest-950">Última Actividad en la Agenda</h3>
          <div className="space-y-2.5">
            {appointments.slice(0, 5).map((apt: any) => (
              <div key={apt.id} className="p-3 rounded-xl bg-warm-50 border border-warm-200 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-forest-900">{apt.clientName}</p>
                  <p className="text-forest-600 text-[11px]">{apt.serviceName} · {apt.date} {apt.timeSlot}h</p>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  apt.status === 'confirmed' ? 'bg-emerald-100 text-emerald-800' :
                  apt.status === 'completed' ? 'bg-sage-100 text-forest-800' : 'bg-rose-100 text-rose-800'
                }`}>
                  {apt.status}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}

// ---------------------------------------------------------------------------
// SUB-COMPONENT: AGENDA & CALENDAR
// ---------------------------------------------------------------------------
function AdminAgenda({ appointments, services, users, onUpdateStatus, onCancel, onBook }: any) {
  const [filterDate, setFilterDate] = useState('2026-11-06');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newClientName, setNewClientName] = useState('');
  const [newClientPhone, setNewClientPhone] = useState('');
  const [newClientEmail, setNewClientEmail] = useState('');
  const [newServiceId, setNewServiceId] = useState(services[0]?.id || '');
  const [newSlot, setNewSlot] = useState('11:00');

  const filteredAppointments = appointments.filter((a: any) => 
    !filterDate || a.date === filterDate
  );

  const handleCreateManual = (e: React.FormEvent) => {
    e.preventDefault();
    onBook({
      clientName: newClientName,
      clientEmail: newClientEmail,
      clientPhone: newClientPhone,
      serviceId: newServiceId,
      date: filterDate,
      timeSlot: newSlot,
      paymentMethod: 'efectivo'
    });
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Controls */}
      <div className="bg-white p-4 sm:p-6 rounded-3xl border border-warm-300 shadow-soft-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <label className="text-xs font-bold text-forest-800 uppercase tracking-wider">Fecha:</label>
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="px-3 py-1.5 rounded-xl text-xs bg-warm-50 border border-warm-300 text-forest-900 font-semibold"
          />
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-semibold text-white bg-forest-800 hover:bg-forest-700 shadow-soft-sm inline-flex items-center justify-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Nueva Cita en Mostrador</span>
        </button>
      </div>

      {/* Appointments List for the selected day */}
      <div className="bg-white rounded-3xl border border-warm-300 overflow-hidden shadow-soft-sm">
        <div className="p-4 border-b border-warm-200 bg-warm-50 text-xs font-bold text-forest-800">
          Citas para el {filterDate} ({filteredAppointments.length} citas programadas)
        </div>

        {filteredAppointments.length === 0 ? (
          <div className="p-8 text-center text-xs text-forest-500">
            No hay citas agendadas para esta fecha en el Centro Parasanitario M&amp;H.
          </div>
        ) : (
          <div className="divide-y divide-warm-200">
            {filteredAppointments.map((apt: any) => (
              <div key={apt.id} className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
                
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-forest-950 text-sm">{apt.timeSlot} h</span>
                    <span className="font-serif font-bold text-forest-900 text-base">{apt.clientName}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      apt.status === 'confirmed' ? 'bg-emerald-100 text-emerald-800' :
                      apt.status === 'completed' ? 'bg-sage-100 text-forest-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {apt.status}
                    </span>
                  </div>

                  <p className="text-forest-600">
                    {apt.serviceName} ({apt.durationMinutes} min) · Tel: {apt.clientPhone} · {apt.clientEmail}
                  </p>
                  {apt.notes && <p className="italic text-forest-500 text-[11px]">Notas: {apt.notes}</p>}
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  {apt.status === 'confirmed' && (
                    <button
                      onClick={() => onUpdateStatus(apt.id, 'completed', 'paid')}
                      className="px-3 py-1.5 rounded-lg text-emerald-800 bg-emerald-50 hover:bg-emerald-100 font-semibold"
                    >
                      ✓ Marcar Realizada &amp; Cobrada
                    </button>
                  )}

                  {apt.status !== 'cancelled' && (
                    <button
                      onClick={() => onCancel(apt.id, 'Cancelada por el administrador')}
                      className="px-3 py-1.5 rounded-lg text-rose-700 hover:bg-rose-50 font-semibold"
                    >
                      Cancelar
                    </button>
                  )}
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

      {/* Manual Booking Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-forest-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleCreateManual} className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-soft-xl border border-warm-300">
            <h4 className="font-serif text-lg font-bold text-forest-900">Agendar Cita en Mostrador</h4>
            
            <div>
              <label className="block text-xs font-semibold text-forest-700 mb-1">Nombre del Cliente *</label>
              <input
                type="text"
                required
                value={newClientName}
                onChange={(e) => setNewClientName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl text-xs bg-warm-50 border border-warm-300"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-forest-700 mb-1">Teléfono *</label>
                <input
                  type="tel"
                  required
                  value={newClientPhone}
                  onChange={(e) => setNewClientPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-xs bg-warm-50 border border-warm-300"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-forest-700 mb-1">Email *</label>
                <input
                  type="email"
                  required
                  value={newClientEmail}
                  onChange={(e) => setNewClientEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-xs bg-warm-50 border border-warm-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-forest-700 mb-1">Servicio *</label>
              <select
                value={newServiceId}
                onChange={(e) => setNewServiceId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl text-xs bg-warm-50 border border-warm-300"
              >
                {services.map((s: any) => (
                  <option key={s.id} value={s.id}>{s.name} ({s.price}€)</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-forest-700 mb-1">Hora *</label>
              <select
                value={newSlot}
                onChange={(e) => setNewSlot(e.target.value)}
                className="w-full px-3 py-2 rounded-xl text-xs bg-warm-50 border border-warm-300"
              >
                {['09:30', '11:00', '12:30', '16:30', '18:00', '19:30'].map(slot => (
                  <option key={slot} value={slot}>{slot} h</option>
                ))}
              </select>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-3 py-2 rounded-xl text-xs text-forest-700"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-forest-800 text-white"
              >
                Confirmar Cita
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}

// ---------------------------------------------------------------------------
// SUB-COMPONENT: CRM & CLIENTS
// ---------------------------------------------------------------------------
function AdminCRM({ users, appointments, bonos, commercialNotes, onAddNote, onDeleteClient }: any) {
  const [search, setSearch] = useState('');
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [newNoteContent, setNewNoteContent] = useState('');

  const clients = users.filter((u: any) => u.role === 'client');
  const filteredClients = clients.filter((c: any) => 
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search)
  );

  const selectedClient = clients.find((c: any) => c.id === selectedClientId);
  const clientAppointments = appointments.filter((a: any) => a.clientId === selectedClientId);
  const clientBonos = bonos.filter((b: any) => b.clientId === selectedClientId);
  const clientNotes = commercialNotes.filter((n: any) => n.clientId === selectedClientId);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      {/* Client List */}
      <div className="lg:col-span-5 bg-white rounded-3xl border border-warm-300 p-5 shadow-soft-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-lg font-bold text-forest-950">Fichas de Clientes ({clients.length})</h3>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-forest-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por nombre, email o tel..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl text-xs bg-warm-50 border border-warm-300"
          />
        </div>

        <div className="divide-y divide-warm-200 max-h-[550px] overflow-y-auto">
          {filteredClients.map((client: any) => {
            const isSelected = client.id === selectedClientId;
            return (
              <div
                key={client.id}
                onClick={() => setSelectedClientId(client.id)}
                className={`p-3 rounded-xl cursor-pointer transition-all flex items-center justify-between text-xs ${
                  isSelected ? 'bg-warm-100 font-semibold' : 'hover:bg-warm-50'
                }`}
              >
                <div>
                  <p className="font-serif font-bold text-forest-950">{client.name}</p>
                  <p className="text-forest-600 text-[11px]">{client.email} · {client.phone}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-gold-100 text-gold-800">
                    {client.loyaltyPoints || 0} pts
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Individual Client Details */}
      <div className="lg:col-span-7 bg-white rounded-3xl border border-warm-300 p-6 shadow-soft-sm">
        {!selectedClient ? (
          <div className="h-full flex flex-col items-center justify-center p-8 text-center text-xs text-forest-500">
            <Users className="w-8 h-8 text-warm-400 mb-2" />
            <p>Selecciona un cliente de la lista para ver su historial, bonos y notas comerciales.</p>
          </div>
        ) : (
          <div className="space-y-6">
            
            <div className="flex items-start justify-between pb-4 border-b border-warm-200">
              <div>
                <h3 className="font-serif text-2xl font-bold text-forest-950">{selectedClient.name}</h3>
                <p className="text-xs text-forest-600">
                  {selectedClient.email} · Tel: {selectedClient.phone} · Código: <strong className="font-mono">{selectedClient.referralCode}</strong>
                </p>
              </div>

              <button
                onClick={() => {
                  if (confirm(`¿Eliminar definitivamente todos los datos de ${selectedClient.name}?`)) {
                    onDeleteClient(selectedClient.id);
                    setSelectedClientId(null);
                  }
                }}
                className="p-2 rounded-xl text-rose-700 hover:bg-rose-50"
                title="Eliminar conforme al RGPD"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-warm-50 border border-warm-200">
                <span className="text-forest-500">Sesiones Realizadas</span>
                <p className="font-bold text-forest-900 text-base">
                  {clientAppointments.filter((a: any) => a.status === 'completed').length}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-warm-50 border border-warm-200">
                <span className="text-forest-500">Bonos Activos</span>
                <p className="font-bold text-forest-900 text-base">
                  {clientBonos.filter((b: any) => b.status === 'active').length}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-warm-50 border border-warm-200">
                <span className="text-forest-500">Puntos Fidelidad</span>
                <p className="font-bold text-gold-700 text-base">
                  {selectedClient.loyaltyPoints || 0} pts
                </p>
              </div>
            </div>

            {/* Commercial Notes (Non-clinical) */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <h4 className="font-serif font-bold text-forest-900 text-sm">
                  Notas de Gestión Comercial
                </h4>
                <span className="text-[10px] text-forest-500 italic">
                  (Sin datos clínicos; ver módulo específico para salud)
                </span>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Añadir nota de preferencia horaria, recordatorio..."
                  value={newNoteContent}
                  onChange={(e) => setNewNoteContent(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl text-xs bg-warm-50 border border-warm-300"
                />
                <button
                  onClick={() => {
                    if (newNoteContent) {
                      onAddNote(selectedClient.id, newNoteContent);
                      setNewNoteContent('');
                    }
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-forest-800 text-white"
                >
                  Añadir
                </button>
              </div>

              <div className="space-y-2">
                {clientNotes.map((note: any) => (
                  <div key={note.id} className="p-3 rounded-xl bg-warm-50 border border-warm-200 text-xs">
                    <p className="text-forest-800">{note.content}</p>
                    <span className="text-[10px] text-forest-500 mt-1 block">{note.date} · Por {note.author}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}
      </div>

    </div>
  );
}

// ---------------------------------------------------------------------------
// SUB-COMPONENT: SEGREGATED HEALTH RECORDS (RGPD SPECIAL CATEGORY)
// ---------------------------------------------------------------------------
function AdminHealthRecords({ users, healthRecords, onSaveHealthRecord }: any) {
  const [selectedClientId, setSelectedClientId] = useState<string>(users[1]?.id || '');
  const [mobility, setMobility] = useState('');
  const [habits, setHabits] = useState('');
  const [contraindications, setContraindications] = useState('');
  const [notes, setNotes] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const selectedRecord = healthRecords.find((h: any) => h.clientId === selectedClientId);

  const handleLoadClient = (clientId: string) => {
    setSelectedClientId(clientId);
    const rec = healthRecords.find((h: any) => h.clientId === clientId);
    if (rec) {
      setMobility(rec.mobilityConcerns || '');
      setHabits(rec.posturalHabits || '');
      setContraindications(rec.contraindications || '');
      setNotes(rec.encryptedParasanitaryNotes || '');
    } else {
      setMobility('');
      setHabits('');
      setContraindications('');
      setNotes('');
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveHealthRecord({
      clientId: selectedClientId,
      mobilityConcerns: mobility,
      posturalHabits: habits,
      contraindications,
      encryptedParasanitaryNotes: notes,
      rgpdConsentSigned: true
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-warm-300 p-6 sm:p-8 shadow-soft-sm space-y-6">
      
      <div className="flex items-start justify-between pb-4 border-b border-warm-200">
        <div>
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-gold-600" />
            <h3 className="font-serif text-xl font-bold text-forest-950">
              Ficha de Valoración Parasanitaria (Aislada por RGPD)
            </h3>
          </div>
          <p className="text-xs text-forest-600 mt-1">
            Módulo segregado para categorías especiales de datos de salud y movilidad. Prohibido su uso publicitario.
          </p>
        </div>

        <span className="text-[10px] bg-gold-100 text-gold-900 px-2.5 py-1 rounded-full font-bold border border-gold-300">
          Consentimiento Custodiado
        </span>
      </div>

      {savedSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs">
          ✓ Ficha parasanitaria guardada con trazabilidad de auditoría.
        </div>
      )}

      {/* Select client */}
      <div>
        <label className="block text-xs font-semibold text-forest-700 mb-1">Seleccionar Cliente:</label>
        <select
          value={selectedClientId}
          onChange={(e) => handleLoadClient(e.target.value)}
          className="w-full px-3 py-2 rounded-xl text-xs bg-warm-50 border border-warm-300 text-forest-900"
        >
          {users.filter((u: any) => u.role === 'client').map((c: any) => (
            <option key={c.id} value={c.id}>{c.name} ({c.email})</option>
          ))}
        </select>
      </div>

      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-forest-700 mb-1">
            Patrones de Movilidad &amp; Molestias Físicas Referidas
          </label>
          <textarea
            rows={2}
            value={mobility}
            onChange={(e) => setMobility(e.target.value)}
            placeholder="Ej. Rigidez en trapecios, sobrecarga lumbar al estar de pie..."
            className="w-full px-3 py-2 rounded-xl text-xs bg-warm-50 border border-warm-300"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-forest-700 mb-1">
            Hábitos Posturales &amp; Actividad Cotidiana
          </label>
          <textarea
            rows={2}
            value={habits}
            onChange={(e) => setHabits(e.target.value)}
            placeholder="Ej. Conduce 2 horas diarias, trabajo sedentario..."
            className="w-full px-3 py-2 rounded-xl text-xs bg-warm-50 border border-warm-300"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-forest-700 mb-1">
            Contraindicaciones o Precauciones Parasanitarias
          </label>
          <input
            type="text"
            value={contraindications}
            onChange={(e) => setContraindications(e.target.value)}
            placeholder="Ej. Ninguna comunicada; intervención de rodilla hace 5 años..."
            className="w-full px-3 py-2 rounded-xl text-xs bg-warm-50 border border-warm-300"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-forest-700 mb-1">
            Notas Técnicas del Terapeuta (Cifrado / Acceso Restringido)
          </label>
          <textarea
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Evolución de maniobras miofasciales, palpación craneal..."
            className="w-full px-3 py-2 rounded-xl text-xs bg-warm-50 border border-warm-300"
          />
        </div>

        <button
          type="submit"
          className="px-6 py-3 rounded-xl text-xs font-semibold text-white bg-forest-800 hover:bg-forest-700 shadow-soft-sm"
        >
          Guardar Ficha Parasanitaria
        </button>
      </form>

    </div>
  );
}

// ---------------------------------------------------------------------------
// SUB-COMPONENT: SERVICES MANAGEMENT (CRUD)
// ---------------------------------------------------------------------------
function AdminServices({ services, onAddService, onUpdateService, onDeleteService }: any) {
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [price, setPrice] = useState(45);
  const [duration, setDuration] = useState(60);
  const [shortDesc, setShortDesc] = useState('');
  const [fullDesc, setFullDesc] = useState('');
  const [available, setAvailable] = useState(true);
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80');

  const handleEdit = (srv: any) => {
    setEditingId(srv.id);
    setName(srv.name);
    setSlug(srv.slug);
    setPrice(srv.price);
    setDuration(srv.durationMinutes);
    setShortDesc(srv.shortDescription);
    setFullDesc(srv.fullDescription);
    setAvailable(srv.available);
    setImageUrl(srv.imageUrl);
    setShowModal(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      onUpdateService(editingId, {
        name,
        slug,
        price: Number(price),
        durationMinutes: Number(duration),
        shortDescription: shortDesc,
        fullDescription: fullDesc,
        available,
        imageUrl
      });
    } else {
      onAddService({
        name,
        slug: slug || name.toLowerCase().replace(/\s+/g, '-'),
        category: 'manual',
        price: Number(price),
        durationMinutes: Number(duration),
        shortDescription: shortDesc,
        fullDescription: fullDesc,
        scopeAndBenefits: ['Optimización postural y descarga miofascial'],
        available,
        professionalName: 'Especialista M&H',
        imageUrl,
        faqs: []
      });
    }
    setShowModal(false);
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-serif text-xl font-bold text-forest-950">Catálogo de Terapias &amp; Precios</h3>
          <p className="text-xs text-forest-600">Añade o modifica tratamientos sin tocar código.</p>
        </div>

        <button
          onClick={() => {
            setEditingId(null);
            setName('');
            setSlug('');
            setPrice(45);
            setDuration(60);
            setShortDesc('');
            setFullDesc('');
            setShowModal(true);
          }}
          className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-forest-800 hover:bg-forest-700 shadow-soft-sm inline-flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Añadir Nuevo Servicio</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((srv: any) => (
          <div key={srv.id} className="p-5 rounded-3xl bg-white border border-warm-300 shadow-soft-sm flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="h-36 rounded-2xl overflow-hidden bg-forest-900">
                <img src={srv.imageUrl} alt={srv.name} className="w-full h-full object-cover" />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-lg font-bold text-forest-950">{srv.name}</h4>
                  <span className="font-bold text-forest-900 text-sm">{srv.price}€</span>
                </div>
                <p className="text-xs text-forest-600 mt-1">{srv.durationMinutes} min · {srv.professionalName}</p>
                <p className="text-xs text-forest-700/80 mt-2 line-clamp-2">{srv.shortDescription}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-warm-100 flex items-center justify-between text-xs">
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                srv.available ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {srv.available ? 'Activo' : 'Sujeto a disponibilidad'}
              </span>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(srv)}
                  className="p-1.5 text-forest-700 hover:bg-warm-100 rounded-lg"
                  title="Editar"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    if (confirm(`¿Eliminar ${srv.name}?`)) onDeleteService(srv.id);
                  }}
                  className="p-1.5 text-rose-700 hover:bg-rose-50 rounded-lg"
                  title="Eliminar"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-forest-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleSave} className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-soft-xl border border-warm-300 max-h-[90vh] overflow-y-auto">
            <h4 className="font-serif text-lg font-bold text-forest-900">
              {editingId ? 'Editar Servicio' : 'Nuevo Servicio'}
            </h4>

            <div>
              <label className="block text-xs font-semibold text-forest-700 mb-1">Nombre</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl text-xs bg-warm-50 border border-warm-300"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-forest-700 mb-1">Precio (€)</label>
                <input
                  type="number"
                  required
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl text-xs bg-warm-50 border border-warm-300"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-forest-700 mb-1">Duración (min)</label>
                <input
                  type="number"
                  required
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl text-xs bg-warm-50 border border-warm-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-forest-700 mb-1">Descripción Breve</label>
              <textarea
                rows={2}
                required
                value={shortDesc}
                onChange={(e) => setShortDesc(e.target.value)}
                className="w-full px-3 py-2 rounded-xl text-xs bg-warm-50 border border-warm-300"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-forest-700 mb-1">URL de la Imagen</label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full px-3 py-2 rounded-xl text-xs bg-warm-50 border border-warm-300"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="avail"
                checked={available}
                onChange={(e) => setAvailable(e.target.checked)}
                className="rounded text-forest-800"
              />
              <label htmlFor="avail" className="text-xs text-forest-800 font-semibold">
                Activar reserva online inmediata
              </label>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-3 py-2 text-xs text-forest-700"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-forest-800 text-white"
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}

// ---------------------------------------------------------------------------
// SUB-COMPONENT: FINANCES & PAYMENTS
// ---------------------------------------------------------------------------
function AdminFinances({ appointments, bonos, onUpdateStatus }: any) {
  const paidAppointments = appointments.filter((a: any) => a.paymentStatus === 'paid');
  const totalServiceIncome = paidAppointments.reduce((acc: number, c: any) => acc + c.price, 0);
  const totalBonoIncome = bonos.reduce((acc: number, b: any) => acc + b.pricePaid, 0);
  const totalIncome = totalServiceIncome + totalBonoIncome;

  const exportCSV = () => {
    let csv = "ID,Cliente,Servicio,Fecha,Importe,EstadoPago,Metodo\n";
    appointments.forEach((a: any) => {
      csv += `${a.id},"${a.clientName}","${a.serviceName}",${a.date},${a.price},${a.paymentStatus},${a.paymentMethod || 'N/A'}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mh-bienestar-informe-economico-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
      
      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-warm-300 shadow-soft-sm">
          <span className="text-[11px] font-semibold text-forest-500 uppercase">Total Recibido</span>
          <p className="font-serif text-3xl font-bold text-gold-700">{totalIncome}€</p>
          <span className="text-xs text-forest-600">Servicios individuales + Bonos</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-warm-300 shadow-soft-sm">
          <span className="text-[11px] font-semibold text-forest-500 uppercase">Ventas de Bonos</span>
          <p className="font-serif text-3xl font-bold text-forest-950">{totalBonoIncome}€</p>
          <span className="text-xs text-forest-600">{bonos.length} bonos multisesión vendidos</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-warm-300 shadow-soft-sm">
          <span className="text-[11px] font-semibold text-forest-500 uppercase">Exportación</span>
          <button
            onClick={exportCSV}
            className="mt-2 w-full py-2.5 rounded-xl text-xs font-semibold bg-forest-800 text-white hover:bg-forest-700 inline-flex items-center justify-center gap-2"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Descargar Informe CSV</span>
          </button>
        </div>
      </div>

      {/* Breakdown Table */}
      <div className="bg-white rounded-3xl border border-warm-300 overflow-hidden shadow-soft-sm">
        <div className="p-4 bg-warm-50 border-b border-warm-200 text-xs font-bold text-forest-800">
          Registro de Transacciones &amp; Cobros
        </div>
        <div className="divide-y divide-warm-200 text-xs">
          {appointments.map((apt: any) => (
            <div key={apt.id} className="p-4 flex items-center justify-between">
              <div>
                <p className="font-bold text-forest-900">{apt.clientName}</p>
                <p className="text-forest-600 text-[11px]">{apt.serviceName} · {apt.date}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-serif font-bold text-forest-950 text-sm">{apt.price}€</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  apt.paymentStatus === 'paid' ? 'bg-emerald-100 text-emerald-800' :
                  apt.paymentStatus === 'bono' ? 'bg-gold-100 text-gold-800' : 'bg-warm-200 text-forest-700'
                }`}>
                  {apt.paymentStatus === 'paid' ? `Cobrado (${apt.paymentMethod})` :
                   apt.paymentStatus === 'bono' ? 'Consumo Bono' : 'Pendiente de cobro'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

// ---------------------------------------------------------------------------
// SUB-COMPONENT: MARKETING & REFERRALS (VIRAL HUBS)
// ---------------------------------------------------------------------------
function AdminMarketing({ campaigns, referrals, onAddCampaign, onToggleCampaign }: any) {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState<number>(10);
  const [startDate, setStartDate] = useState('2026-11-01');
  const [endDate, setEndDate] = useState('2026-12-31');

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    onAddCampaign({
      title,
      code: code.toUpperCase(),
      discountPercent,
      startDate,
      endDate,
      targetAudience: 'todos',
      active: true,
      description: `Campaña ${title}`
    });
    setShowModal(false);
  };

  return (
    <div className="space-y-8">
      
      {/* Campaigns manager */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif text-xl font-bold text-forest-950">Campañas &amp; Cupones Activos</h3>
            <p className="text-xs text-forest-600">Configura descuentos temporales y promociones locales.</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-forest-800 hover:bg-forest-700"
          >
            + Nueva Campaña
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {campaigns.map((camp: any) => (
            <div key={camp.id} className="p-5 rounded-2xl bg-white border border-warm-300 shadow-soft-sm flex items-center justify-between">
              <div>
                <span className="font-mono font-bold text-gold-700 text-sm">{camp.code}</span>
                <h4 className="font-serif font-bold text-forest-950 mt-0.5">{camp.title}</h4>
                <p className="text-xs text-forest-600">
                  {camp.discountPercent ? `${camp.discountPercent}% descuento` : `${camp.discountAmount}€ dto.`} · Usado {camp.usedCount} veces
                </p>
                <p className="text-[10px] text-forest-500 mt-1">Vigencia: {camp.startDate} a {camp.endDate}</p>
              </div>

              <button
                onClick={() => onToggleCampaign(camp.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                  camp.active ? 'bg-emerald-100 text-emerald-800' : 'bg-warm-200 text-forest-600'
                }`}
              >
                {camp.active ? 'Activa' : 'Pausada'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Viral Referral Performance */}
      <div className="bg-white rounded-3xl border border-warm-300 p-6 shadow-soft-sm space-y-4">
        <h3 className="font-serif text-xl font-bold text-forest-950">
          Registro de Recomendaciones Virales (Programa Amigos)
        </h3>
        <div className="divide-y divide-warm-200 text-xs">
          {referrals.map((ref: any) => (
            <div key={ref.id} className="p-3.5 flex items-center justify-between">
              <div>
                <p className="font-bold text-forest-900">
                  {ref.referrerName} recomendó a <span className="text-gold-700">{ref.referredName}</span>
                </p>
                <p className="text-[11px] text-forest-500">Código usado: {ref.codeUsed} · {ref.referredEmail}</p>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-sage-100 text-forest-800">
                {ref.status === 'first_booking_completed' ? 'Recompensa concedida' : 'Registrado'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-forest-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleCreateCampaign} className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-soft-xl border border-warm-300">
            <h4 className="font-serif text-lg font-bold text-forest-900">Nueva Campaña</h4>
            <div>
              <label className="block text-xs font-semibold text-forest-700 mb-1">Nombre</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ej. Black Friday Bienestar"
                className="w-full px-3 py-2 rounded-xl text-xs bg-warm-50 border border-warm-300"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-forest-700 mb-1">Código Cupón</label>
              <input
                type="text"
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Ej. BF2026"
                className="w-full px-3 py-2 rounded-xl text-xs bg-warm-50 border border-warm-300 uppercase"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-forest-700 mb-1">Descuento (%)</label>
              <input
                type="number"
                value={discountPercent}
                onChange={(e) => setDiscountPercent(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl text-xs bg-warm-50 border border-warm-300"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setShowModal(false)} className="text-xs text-forest-700 px-3 py-2">
                Cancelar
              </button>
              <button type="submit" className="text-xs font-semibold bg-forest-800 text-white px-4 py-2 rounded-xl">
                Crear
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}

// ---------------------------------------------------------------------------
// SUB-COMPONENT: SOCIAL MEDIA CONTENT CENTER (INSTAGRAM / FACEBOOK TEMPLATES)
// ---------------------------------------------------------------------------
function AdminSocialHub() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const posts = [
    {
      id: 'post-1',
      platform: 'Instagram / Facebook Post',
      theme: 'Pautas de Higiene Postural',
      copyText: `🌿 ¿Sientes que tus hombros cargan con todo el cansancio de la semana?

En M&H Bienestar (Orcera) sabemos que los hábitos repetitivos y el estrés diario provocan una rigidez acumulada que no siempre se alivia con reposo común.

Mediante nuestra sesión de Reeducación Corporal evaluamos la alineación de tu columna y aplicamos técnicas manuales profundas para que recuperes tu movilidad natural.

📍 Calle San José, 2 · Orcera (Jaén)
📲 Reserva tu cita en un clic desde nuestra web oficial: https://quirosteopatiamh.es/reservar

#MHBienestar #Orcera #Jaen #SierradeSegura #ReeducacionCorporal #BienestarNatural`,
      image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'post-2',
      platform: 'Story / Reel Hook',
      theme: 'Terapia Craneosacral y Calma Mental',
      copyText: `✨ ¿Sufres de bruxismo nocturno o te cuesta desconectar al final del día?

El ritmo craneosacral refleja directamente el estado de alerta de tu sistema nervioso. Nuestro tacto sutil y respetuoso devuelve la serenidad a tu mente y ligereza a tu rostro.

🌸 Citas disponibles en Orcera. Enlace directo en bio.

#Craneosacral #Relax #OrceraJaen #BienestarIntegral`,
      image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=800&q=80'
    }
  ];

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-serif text-xl font-bold text-forest-950">
          Centro de Creación de Contenidos para Redes
        </h3>
        <p className="text-xs text-forest-600">
          Plantillas oficiales listas para publicar en Instagram y Facebook con el tono de voz de M&amp;H Bienestar.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-3xl border border-warm-300 p-6 shadow-soft-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-forest-800 text-warm-100 uppercase">
                  {post.platform}
                </span>
                <span className="text-xs text-gold-700 font-semibold">{post.theme}</span>
              </div>

              <div className="h-44 rounded-2xl overflow-hidden bg-forest-900">
                <img src={post.image} alt={post.theme} className="w-full h-full object-cover" />
              </div>

              <div className="p-3.5 rounded-xl bg-warm-50 border border-warm-200 text-xs text-forest-800 font-mono whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">
                {post.copyText}
              </div>
            </div>

            <button
              onClick={() => handleCopy(post.id, post.copyText)}
              className="w-full py-2.5 rounded-xl text-xs font-semibold bg-forest-800 hover:bg-forest-700 text-white inline-flex items-center justify-center gap-2 transition-all shadow-soft-sm"
            >
              {copiedId === post.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedId === post.id ? '¡Texto Copiado para Instagram!' : 'Copiar Texto para Publicar'}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// SUB-COMPONENT: AUTOMATIONS ENGINE
// ---------------------------------------------------------------------------
function AdminAutomations({ rules, onToggle, onTest }: any) {
  const [testResult, setTestResult] = useState<any>(null);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-serif text-xl font-bold text-forest-950">Motor de Automatizaciones &amp; Avisos</h3>
        <p className="text-xs text-forest-600">Disparadores automáticos vía WhatsApp, correo electrónico y notificaciones.</p>
      </div>

      {testResult && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-xs text-emerald-950 space-y-1">
          <p className="font-bold">✓ Mensaje simulado emitido con éxito:</p>
          <p className="font-mono bg-white/70 p-2.5 rounded-lg border border-emerald-200">{testResult}</p>
        </div>
      )}

      <div className="space-y-4">
        {rules.map((rule: any) => (
          <div key={rule.id} className="p-5 rounded-3xl bg-white border border-warm-300 shadow-soft-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1 max-w-xl">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-forest-800 text-gold-300 uppercase">
                  {rule.channel}
                </span>
                <h4 className="font-serif font-bold text-forest-950 text-sm">{rule.name}</h4>
              </div>
              <p className="text-xs text-forest-700/80 font-mono bg-warm-50 p-2.5 rounded-xl border border-warm-200">
                {rule.messageTemplate}
              </p>
              <span className="text-[10px] text-forest-500">Ejecutado {rule.executionCount} veces</span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => {
                  const res = onTest(rule.id, 'María García');
                  setTestResult(res.sentMessage);
                }}
                className="px-3 py-1.5 rounded-xl text-xs font-medium text-forest-800 bg-warm-200 hover:bg-warm-300"
              >
                Simular Envío
              </button>

              <button
                onClick={() => onToggle(rule.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold ${
                  rule.active ? 'bg-emerald-100 text-emerald-800' : 'bg-warm-200 text-forest-600'
                }`}
              >
                {rule.active ? 'Activo' : 'Desactivado'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// SUB-COMPONENT: SETTINGS & AUDIT LOGS
// ---------------------------------------------------------------------------
function AdminSettings({ businessConfig, auditLogs }: any) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      {/* Center details */}
      <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-warm-300 shadow-soft-sm space-y-4">
        <h3 className="font-serif text-xl font-bold text-forest-950">Datos del Centro Parasanitario</h3>

        <div className="space-y-3 text-xs">
          <div>
            <label className="text-forest-500">Nombre Comercial</label>
            <p className="font-bold text-forest-900 text-sm">{businessConfig.name}</p>
          </div>
          <div>
            <label className="text-forest-500">Razón Social</label>
            <p className="font-bold text-forest-900">{businessConfig.legalName}</p>
          </div>
          <div>
            <label className="text-forest-500">Ubicación</label>
            <p className="font-bold text-forest-900">{businessConfig.address}, {businessConfig.postalCode} {businessConfig.city} ({businessConfig.province})</p>
          </div>
          <div>
            <label className="text-forest-500">Teléfono &amp; WhatsApp</label>
            <p className="font-bold text-forest-900">{businessConfig.phone}</p>
          </div>
          <div>
            <label className="text-forest-500">Email Oficial</label>
            <p className="font-bold text-forest-900">{businessConfig.email}</p>
          </div>
        </div>
      </div>

      {/* Security & Audit Logs */}
      <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-warm-300 shadow-soft-sm space-y-4">
        <h3 className="font-serif text-xl font-bold text-forest-950 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-gold-600" />
          <span>Registro de Auditoría &amp; Trazabilidad</span>
        </h3>
        <p className="text-xs text-forest-600">Registro inmutable de acciones administrativas y RGPD.</p>

        <div className="divide-y divide-warm-200 max-h-72 overflow-y-auto text-xs font-mono">
          {auditLogs.map((log: any) => (
            <div key={log.id} className="py-2.5">
              <div className="flex justify-between text-[10px] text-forest-500">
                <span className="font-bold text-forest-800">{log.action}</span>
                <span>{new Date(log.timestamp).toLocaleTimeString()}</span>
              </div>
              <p className="text-forest-700 text-[11px] mt-0.5">{log.details}</p>
              <span className="text-[10px] text-sage-600">Actor: {log.actorEmail}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
