'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import TabelaTabs from './TabelaTabs';
import GroupsGrid from './GroupsGrid';
import GroupMatchesGrid from './GroupMatchesGrid';
import Bracket from './Bracket';

type Tab = 'groups' | 'bracket' | 'matches';

export default function TabelaClient() {
  const [tab, setTab] = useState<Tab>('matches');

  return (
    <>
      {/* sticky header */}
      <header className="sticky top-0 z-20 backdrop-blur-md border-b border-blue-400/15 bg-navy-deep/60">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* linha superior: voltar + logo */}
          <div className="h-14 flex items-center justify-between gap-4">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-blue-300/70 hover:text-blue-300 transition-colors text-sm font-sans shrink-0"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Voltar
            </Link>

            <Image
              src="/assets/luminna-horizontal-branca.png"
              alt="Luminna"
              width={96}
              height={28}
              className="object-contain"
              priority
            />

            {/* tabs inline apenas em md+ */}
            <div className="hidden md:block">
              <TabelaTabs value={tab} onChange={setTab} />
            </div>
          </div>

          {/* tabs em linha própria no mobile */}
          <div className="md:hidden flex justify-center pb-2">
            <TabelaTabs value={tab} onChange={setTab} />
          </div>
        </div>
      </header>

      {/* content */}
      {tab === 'groups' ? (
        <GroupsGrid />
      ) : tab === 'matches' ? (
        <GroupMatchesGrid />
      ) : (
        <Bracket />
      )}
    </>
  );
}
