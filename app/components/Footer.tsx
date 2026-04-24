import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="glass border-t border-blue-400/20 px-6 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div className="space-y-4">
            <Image
              src="/assets/luminna-horizontal-branca.png"
              alt="Luminna AI"
              width={140}
              height={35}
              className="drop-shadow-[0_0_20px_rgba(59,130,246,0.4)]"
            />
            <p className="text-sm text-blue-300/80 leading-relaxed max-w-xs">
              Inteligência que vive o jogo com você.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-display font-bold text-lg text-white uppercase tracking-wider">
              A Copa
            </h3>
            <ul className="space-y-2 text-sm text-blue-300/70">
              <li className="hover:text-cyan-accent transition-colors cursor-pointer">
                Países-sede: USA, México, Canadá
              </li>
              <li className="hover:text-cyan-accent transition-colors cursor-pointer">
                16 Cidades-sede
              </li>
              <li className="hover:text-cyan-accent transition-colors cursor-pointer">
                11 Jun – 19 Jul 2026
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-display font-bold text-lg text-white uppercase tracking-wider">
              Luminna AI
            </h3>
            <ul className="space-y-2 text-sm text-blue-300/70">
              <li className="hover:text-cyan-accent transition-colors cursor-pointer">Sobre</li>
              <li className="hover:text-cyan-accent transition-colors cursor-pointer">Contato</li>
              <li className="hover:text-cyan-accent transition-colors cursor-pointer">LinkedIn</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-400/20 pt-8">
          <p className="text-center text-xs md:text-sm text-blue-300/60 tracking-wide">
            © 2026 Luminna AI · Todos os direitos reservados · Copa do Mundo FIFA 26™
          </p>
        </div>
      </div>
    </footer>
  );
}
