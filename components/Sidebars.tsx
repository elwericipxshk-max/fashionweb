
import React from 'react';
import { X, Trash2, ArrowRight, ShoppingBag, Heart } from 'lucide-react';
import { CustomizedProduct } from '../types';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, title, children }) => {
  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      {/* Sidebar Panel */}
      <div className={`fixed inset-y-0 right-0 max-w-sm w-full bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out border-l-4 border-black ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b-2 border-black bg-white">
            <h2 className="text-2xl font-black uppercase tracking-tighter text-black">{title}</h2>
            <button onClick={onClose} className="p-2 hover:bg-black hover:text-white transition-colors border-2 border-transparent hover:border-black">
              <X size={24} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-6 bg-grid-pattern">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

// --- Cart Drawer ---
interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CustomizedProduct[];
  onRemoveItem: (id: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onRemoveItem }) => {
  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title={`Cart (${items.length})`}>
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-gray-400 opacity-60">
          <ShoppingBag size={48} className="mb-4 text-black" />
          <p className="font-bold uppercase tracking-widest">Your cart is empty.</p>
        </div>
      ) : (
        <div className="flex flex-col h-full">
          <div className="space-y-6 flex-1">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4 bg-white p-3 border-2 border-black shadow-hard">
                <div className="w-20 h-24 bg-gray-100 border border-black shrink-0">
                  <img src={item.color.imageFront} alt={item.color.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-black uppercase">{item.color.name} Tee</h4>
                    <p className="text-xs text-gray-500 mt-1 font-mono">
                      {item.customText ? `"${item.customText}"` : 'Graphic Embroidery'}
                    </p>
                    <p className="text-xs font-bold mt-1 bg-black text-white w-fit px-1 uppercase">{item.placement === 'front' ? 'Front' : 'Back'}</p>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="font-black text-lg">₺{item.price.toFixed(2)}</span>
                    <button 
                      onClick={() => onRemoveItem(item.id)}
                      className="text-black hover:bg-red-600 hover:text-white p-1 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-6 border-t-2 border-black bg-white">
            <div className="flex justify-between text-xl font-black text-black mb-4 uppercase">
              <span>Total</span>
              <span>₺{total.toFixed(2)}</span>
            </div>
            <button className="w-full bg-black text-white py-4 font-black uppercase tracking-widest shadow-hard hover:bg-accent hover:text-black transition-all flex justify-center items-center gap-2 border-2 border-black">
              Checkout <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}
    </Drawer>
  );
};

// --- Favorites Drawer ---
interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CustomizedProduct[];
  onRemoveItem: (id: string) => void;
  onMoveToCart: (item: CustomizedProduct) => void;
}

export const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({ isOpen, onClose, items, onRemoveItem, onMoveToCart }) => {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} title={`Wishlist (${items.length})`}>
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-gray-400 opacity-60">
          <Heart size={48} className="mb-4 text-black" />
          <p className="font-bold uppercase tracking-widest">No favorites yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {items.map((item) => (
            <div key={item.id} className="flex gap-4 bg-white p-3 border-2 border-black shadow-hard group">
              <div className="w-20 h-24 bg-gray-100 border border-black shrink-0">
                <img src={item.color.imageFront} alt={item.color.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                    <h4 className="font-bold text-black uppercase">{item.color.name} Tee</h4>
                    <p className="text-xs text-gray-500 mt-1 font-mono line-clamp-1">
                      {item.customText ? `"${item.customText}"` : 'Custom Design'}
                    </p>
                </div>
                <div className="flex gap-2 mt-2">
                    <button 
                        onClick={() => onMoveToCart(item)}
                        className="flex-1 bg-black text-white text-xs font-bold uppercase py-2 hover:bg-accent hover:text-black transition-colors"
                    >
                        Add To Cart
                    </button>
                    <button 
                        onClick={() => onRemoveItem(item.id)}
                        className="p-2 border border-black text-black hover:bg-red-600 hover:text-white hover:border-red-600 transition-colors"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Drawer>
  );
};

// --- Auth Modal ---
interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] w-full max-w-md relative z-10 overflow-hidden animate-fade-in-up">
        
        <div className="flex border-b-2 border-black">
          <button className="flex-1 py-4 text-black font-black uppercase tracking-widest bg-accent">Login</button>
          <button className="flex-1 py-4 text-gray-500 font-bold uppercase tracking-widest hover:text-black hover:bg-gray-50">Register</button>
        </div>

        <div className="p-8">
          <div className="text-center mb-8">
            <h3 className="font-black text-3xl text-black uppercase italic tracking-tighter">Welcome Back</h3>
            <p className="text-gray-500 text-sm mt-1 font-bold">ENTER THE LAB.</p>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-xs font-black text-black uppercase tracking-widest mb-1">Email</label>
              <input type="email" className="w-full px-4 py-3 border-2 border-black focus:ring-0 focus:bg-gray-50 font-mono text-sm placeholder-gray-400" placeholder="user@cosna.lab" />
            </div>
            <div>
              <label className="block text-xs font-black text-black uppercase tracking-widest mb-1">Password</label>
              <input type="password" className="w-full px-4 py-3 border-2 border-black focus:ring-0 focus:bg-gray-50 font-mono text-sm" placeholder="••••••••" />
            </div>
            
            <div className="flex items-center justify-between text-xs font-bold">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded-none border-2 border-black text-black focus:ring-0 w-4 h-4" />
                REMEMBER ME
              </label>
              <a href="#" className="hover:text-accent underline">FORGOT PASSWORD?</a>
            </div>

            <button className="w-full bg-black text-white py-4 font-black uppercase tracking-widest shadow-hard hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm transition-all mt-6 border-2 border-black">
              Sign In
            </button>
            
            <div className="relative my-8">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t-2 border-black"></div></div>
                <div className="relative flex justify-center text-xs font-black uppercase"><span className="bg-white px-2 text-black border-2 border-black">OR</span></div>
            </div>

            <button className="w-full border-2 border-black bg-white text-black py-3 font-bold uppercase hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5 grayscale" />
                Continue with Google
            </button>
          </form>
        </div>
        
        <button onClick={onClose} className="absolute top-4 right-4 p-2 text-black hover:bg-black hover:text-white transition-colors border-2 border-transparent hover:border-white">
          <X size={20} />
        </button>
      </div>
    </div>
  );
};
