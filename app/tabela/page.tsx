import type { Metadata } from 'next';
import TabelaClient from '@/app/components/tabela/TabelaClient';

export const metadata: Metadata = {
  title: 'Tabela · Copa 2026 | Luminna',
  description: 'Grupos e chaveamento oficiais da Copa 2026.',
};

export default function TabelaPage() {
  return (
    <main className="stadium-grid min-h-screen relative overflow-hidden">
      <TabelaClient />
    </main>
  );
}
