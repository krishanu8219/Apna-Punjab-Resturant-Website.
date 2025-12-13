import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-red-600 via-orange-500 to-orange-400 text-white border-t-8 border-orange-600 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255, 153, 51, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(194, 24, 7, 0.3) 0%, transparent 50%)`
      }}></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-2xl font-display font-bold text-white mb-4" style={{ fontFamily: 'Impact, "Arial Black", sans-serif' }}>APNA PUNJAB PIZZA KEBAB</h3>
            <p className="text-white text-sm leading-relaxed font-medium">
              Autentica cucina indiana e pakistana, pizza e kebab a Torino
            </p>
          </div>

          <div>
            <h4 className="text-yellow-300 font-bold mb-6 text-lg flex items-center space-x-2">
              <span className="text-2xl">📞</span>
              <span>Contattaci</span>
            </h4>
            <div className="space-y-4 text-sm">
              <div className="flex items-start space-x-3 bg-white/10 p-3 rounded-lg border-l-4 border-yellow-300">
                <svg className="w-5 h-5 text-yellow-300 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-white">Corso Regina Margherita 251f<br />10144 Torino, Italia</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/10 p-3 rounded-lg border-l-4 border-green-400">
                <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+393206879063" className="text-white hover:text-yellow-300 transition-colors font-medium">+39 320 687 9063</a>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-yellow-300 font-bold mb-6 text-lg flex items-center space-x-2">
              <span className="text-2xl">🕐</span>
              <span>Orari di Apertura</span>
            </h4>
            <div className="space-y-3 text-sm bg-white/10 p-4 rounded-lg border-2 border-yellow-300/30">
              <div className="flex justify-between items-center py-2 border-b border-yellow-300/20">
                <span className="text-white font-medium">Lunedì–Sabato:</span>
                <span className="text-yellow-300 font-bold text-base">11:00–23:00</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-white font-medium">Domenica:</span>
                <span className="text-yellow-300 font-bold text-base">18:00–23:00</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t-4 border-white/30 text-center relative">
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-32 h-2 bg-yellow-300 rounded-full"></div>
          <p className="text-white text-sm mt-4">&copy; {new Date().getFullYear()} Apna Punjab Pizza Kebap. <span className="text-yellow-300 font-bold">Tutti i diritti riservati.</span></p>
          <p className="text-yellow-300 font-bold mt-2 text-xs">✓ 100% HALAL CERTIFIED</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
