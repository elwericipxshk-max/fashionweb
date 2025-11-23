
import React from 'react';
import { ShoppingBag, Menu, Heart, User, Search, Scissors } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  favoritesCount: number;
  onOpenCart: () => void;
  onOpenFavorites: () => void;
  onOpenLogin: () => void;
  onNavigate: (view: 'home' | 'product') => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  cartCount, 
  favoritesCount, 
  onOpenCart, 
  onOpenFavorites, 
  onOpenLogin,
  onNavigate
}) => {
  return (
    <nav className="sticky top-0 z-40 bg-white border-b-2 border-black">
      <div className="max-w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Logo & Mobile Menu */}
          <div className="flex items-center gap-4">
            <button className="p-2 -ml-2 text-black hover:bg-brand-100 transition-colors md:hidden border border-black shadow-hard-sm">
              <Menu size={20} />
            </button>
            
            {/* Logo Design: Links to Home via prop */}
            <a 
              href="/" 
              onClick={(e) => { e.preventDefault(); onNavigate('home'); }}
              className="group flex items-center gap-1 select-none"
            >
              <span className="font-sans text-4xl font-black tracking-tighter text-black uppercase italic">
                COSNA
              </span>
              <span className="text-xs font-bold bg-black text-white px-1 py-0.5 -mt-4 transform -rotate-12">LAB</span>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8 ml-8">
            <button onClick={() => onNavigate('home')} className="text-sm font-bold uppercase tracking-widest hover:bg-black hover:text-white px-3 py-1 transition-all">Ana Sayfa</button>
            <button onClick={() => onNavigate('product')} className="text-sm font-bold uppercase tracking-widest hover:bg-black hover:text-white px-3 py-1 transition-all">Drop 01</button>
            <button className="text-sm font-bold uppercase tracking-widest hover:bg-black hover:text-white px-3 py-1 transition-all">Manifesto</button>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            
            {/* CTA Button (Desktop) */}
            <button 
              onClick={() => onNavigate('product')}
              className="hidden md:flex items-center gap-2 bg-black text-white px-6 py-2 text-xs font-black uppercase tracking-widest hover:bg-accent hover:text-black border-2 border-transparent hover:border-black transition-all shadow-hard-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
            >
              <Scissors size={14} />
              Customize
            </button>

            {/* Search */}
            <button className="hidden sm:flex items-center justify-center w-10 h-10 border-2 border-transparent hover:border-black hover:bg-brand-50 transition-all">
              <Search size={20} />
            </button>

            {/* Favorites */}
            <button 
              onClick={onOpenFavorites}
              className="flex items-center justify-center w-10 h-10 border-2 border-black bg-white hover:bg-brand-50 transition-all relative group shadow-hard-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
              aria-label="Favorites"
            >
              <Heart size={18} className="group-hover:fill-black transition-colors" />
              {favoritesCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-black text-[10px] font-black w-5 h-5 border border-black flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Login */}
            <button 
              onClick={onOpenLogin}
              className="flex items-center justify-center w-10 h-10 border-2 border-black bg-white hover:bg-brand-50 transition-all shadow-hard-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
              aria-label="Login"
            >
              <User size={18} />
            </button>

            {/* Cart */}
            <button 
              onClick={onOpenCart}
              className="flex items-center justify-center w-10 h-10 border-2 border-black bg-black text-white hover:bg-accent hover:text-black transition-all relative group shadow-hard-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
              aria-label="Cart"
            >
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-black text-[10px] font-black w-5 h-5 border border-black flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
