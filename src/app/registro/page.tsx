import { Metadata } from 'next';
import ClientAuthView from '@/components/ClientAuthView';

export const metadata: Metadata = {
  title: 'Registro de Clientes — M&H BIENESTAR Orcera',
  description: 'Crea tu cuenta en el Centro Parasanitario M&H Bienestar. Obtén 50 puntos de bienvenida, gestiona tus citas y accede a tu programa de fidelización.',
};

export default function RegistroPage() {
  return <ClientAuthView initialMode="register" />;
}

