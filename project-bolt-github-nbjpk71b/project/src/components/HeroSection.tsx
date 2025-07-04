import React from 'react';
import { ArrowRight, Armchair, CheckCircle, Users } from 'lucide-react';

interface HeroSectionProps {
  onCtaClick: () => void;
}

export const HeroSection = ({ onCtaClick }: HeroSectionProps) => {
  return (
    <section className="relative bg-gradient-to-br from-linen via-linen to-white min-h-screen flex items-center overflow-hidden">
      {/* Sophisticated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-dark-turquoise/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-dark-slate/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-dark-turquoise/3 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-8 animate-fade-in-up">
            {/* Premium badge */}
            <div className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-dark-turquoise/10">
              <div className="w-2 h-2 bg-dark-turquoise rounded-full animate-pulse"></div>
              <span className="font-inter text-sm font-medium text-dark-slate">Furniture Manufacturers In Europe</span>
              <Armchair className="w-4 h-4 text-dark-turquoise" />
            </div>
            
            <div className="space-y-6">
              <h1 className="font-clash text-4xl lg:text-6xl xl:text-hero font-extrabold text-dark-slate leading-[1.1] tracking-tight">
                How to Get Real Direct Delivery,
                <span className="block text-dark-turquoise mt-2">Not What 90% of Companies Make You Pay For</span>
              </h1>
              
              <p className="font-inter text-xl lg:text-2xl text-dark-slate/70 leading-relaxed max-w-2xl">
                Discover the best way to transport your materials, why the traditional way is not working, and how to compete with top players.
              </p>
            </div>
            
            {/* Social proof indicators */}
            <div className="flex flex-wrap items-center gap-8 py-4">
              <div className="flex items-center gap-2 text-dark-slate/60">
                <CheckCircle className="w-5 h-5 text-dark-turquoise" />
                <span className="font-inter text-sm">Instant PDF access</span>
              </div>
              
              <div className="flex items-center gap-2 text-dark-slate/60">
                <Users className="w-4 h-4 text-dark-turquoise" />
                <span className="font-inter text-sm">No spam, unsubscribe anytime</span>
              </div>
            </div>
            
            {/* CTA Section */}
            <div className="pt-6">
              <button
                onClick={onCtaClick}
                className="group relative bg-dark-turquoise hover:bg-dark-turquoise/90 text-white px-10 py-5 rounded-2xl font-inter font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center gap-3 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <span className="relative z-10">Send Me the Guide</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
              </button>
            </div>
          </div>
          
          {/* Guide Image Display */}
          <div className="lg:col-span-5 relative animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="relative">
              {/* Floating elements */}
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-dark-turquoise/10 rounded-2xl rotate-12 animate-float"></div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-dark-slate/5 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
              
              {/* Guide Image Container - Made bigger with increased padding */}
              <div 
                onClick={onCtaClick}
                className="relative bg-white rounded-3xl shadow-2xl p-8 transform hover:scale-105 transition-all duration-500 border border-dark-turquoise/10 cursor-pointer group"
              >
                {/* Static FREE bubble - horizontal */}
                <div className="absolute -top-4 -right-4 z-20">
                  <div className="bg-gradient-to-r from-dark-turquoise to-dark-turquoise/80 text-white px-6 py-3 rounded-full shadow-xl border-4 border-white">
                    <span className="font-clash font-bold text-lg">FREE</span>
                  </div>
                </div>
                
                <div className="relative">
                  <img 
                    src="https://i.imgur.com/3MSx2tc.png"
                    alt="How to Get Real Direct Delivery Guide"
                    className="w-full h-[550px] object-contain rounded-2xl shadow-lg"
                  />
                </div>
                
                <div className="mt-8 space-y-4">
                  {/* Styled Get Yours Now Button */}
                  <div className="pt-4">
                    <div className="relative bg-gradient-to-r from-dark-turquoise to-dark-turquoise/80 hover:from-dark-turquoise/90 hover:to-dark-turquoise/70 text-white px-10 py-5 rounded-2xl transition-all duration-300 transform group-hover:scale-105 shadow-lg hover:shadow-xl overflow-hidden">
                      {/* Shimmer effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                      
                      <div className="relative flex items-center justify-center gap-3">
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        <span className="font-clash font-bold text-xl tracking-wide">Get Yours Now</span>
                      </div>
                      
                      {/* Subtle glow effect */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-dark-turquoise/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};