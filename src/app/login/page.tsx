import { Metadata } from 'next';
import ClientAuthView from '@/components/ClientAuthView';

export const metadata: Metadata = {
  title: 'Iniciar Sesión — Portal de Clientes M&H BIENESTAR',
  description: 'Inicia sesión en tu cuenta de M&H Bienestar en Orcera para ver tus próximas citas, bonos y puntos.',
};

export default function LoginPage() {
  return <ClientAuthView initialMode="login" />;
}
