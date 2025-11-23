import React, { useState, useRef, useEffect } from 'react';
import Navbar from './components/Navbar';
import ProductViewer from './components/ProductViewer';
import ReviewSection from './components/ReviewSection';
import { CartDrawer, FavoritesDrawer, AuthModal } from './components/Sidebars';
import { TSHIRT_COLORS, FONT_OPTIONS } from './constants';
import { Placement, CustomizedProduct } from './types';
import { Upload, Type, RefreshCw, Wand2, ArrowRight, Trash2, Sparkles, Instagram, Twitter, Facebook, CheckCircle } from 'lucide-react';
import { generateCreativeDescription } from './services/geminiService';

// --- Toast Component ---
const Toast = ({ message, onClose }: { message: string, onClose: () => void }) => (
  <div className="fixed top-24 right-4 bg-black text-white px-6 py-4 flex items-center gap-3 shadow-hard z-50 animate-fade-in-up border-2 border-white">
    <CheckCircle className="text-accent" size={24} />
    <span className="font-bold uppercase tracking-widest text-sm">{message}</span>
  </div>
);

const App: React.FC = () => {
  // Navigation State
  const [currentView, setCurrentView] = useState<'home' | 'product'>('home');

  // Product State
  const [selectedColor, setSelectedColor] = useState(TSHIRT_COLORS[0]);
  const [customText, setCustomText] = useState('');
  const [selectedFont, setSelectedFont] = useState(FONT_OPTIONS[0]);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [placement, setPlacement] = useState<Placement>(Placement.FRONT);
  
  // AI State
  const [aiDescription, setAiDescription] = useState<string>('');
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);

  // App Functional State (with Persistence)
  const [cartItems, setCartItems] = useState<CustomizedProduct[]>(() => {
    const saved = localStorage.getItem('cosna_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [favoriteItems, setFavoriteItems] = useState<CustomizedProduct[]>(() => {
    const saved = localStorage.getItem('cosna_favorites');
    return saved ? JSON.parse(saved) : [];
  });
  
  // UI State
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem('cosna_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('cosna_favorites', JSON.stringify(favoriteItems));
  }, [favoriteItems]);

  // Toast Timer
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const showToast = (msg: string) => setToastMessage(msg);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("Dosya boyutu 2MB'dan küçük olmalıdır.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
        setAiDescription('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAiAnalysis = async () => {
    if (!uploadedImage && !customText) return;
    
    setIsGeneratingAi(true);
    const desc = await generateCreativeDescription(uploadedImage, customText, selectedColor.name);
    setAiDescription(desc);
    setIsGeneratingAi(false);
  };

  const addToCart = () => {
    const newItem: CustomizedProduct = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
      color: selectedColor,
      customText,
      font: selectedFont,
      uploadedImage,
      placement,
      price: 1250,
      dateAdded: Date.now()
    };
    setCartItems([...cartItems, newItem]);
    setIsCartOpen(true);
    showToast("Added to Cart");
  };

  const removeFromCart = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const toggleFavorite = () => {
    // Basit toggle mantığı (id yerine özellik kontrolü yapılabilir, şimdilik her ekleme yeni item)
    const newItem: CustomizedProduct = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
      color: selectedColor,
      customText,
      font: selectedFont,
      uploadedImage,
      placement,
      price: 1250,
      dateAdded: Date.now()
    };
    setFavoriteItems([newItem, ...favoriteItems]);
    showToast("Saved to Wishlist");
  };

  const removeFromFavorites = (id: string) => {
    setFavoriteItems(favoriteItems.filter(item => item.id !== id));
  };

  const moveFavoriteToCart = (item: CustomizedProduct) => {
    setCartItems([...cartItems, item]);
    removeFromFavorites(item.id);
    setIsFavoritesOpen(false);
    setIsCartOpen(true);
    showToast("Moved to Cart");
  };

  // --- SUB-COMPONENTS FOR LANDING PAGE ---

  const HeroSection = () => (
    <div className="relative h-[90vh] w-full overflow-hidden flex items-center justify-center bg-black">
      <img 
        src="https://images.unsplash.com/photo-1617387680907-2856a2e245da?q=80&w=2669&auto=format&fit=crop" 
        alt="Streetwear Style" 
        className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-1000"
      />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      
      <div className="relative z-10 text-center px-4 w-full max-w-5xl mx-auto">
        <div className="inline-block bg-accent text-black px-3 py-1 text-sm font-black uppercase tracking-widest mb-6 rotate-2 hover:rotate-0 transition-transform cursor-default">
          New Season Drop
        </div>
        <h1 className="text-7xl md:text-9xl font-black text-white mb-2 leading-[0.9] tracking-tighter uppercase mix-blend-difference">
          WEAR YOUR <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">MIND</span>
        </h1>
        <p className="text-gray-300 text-xl md:text-2xl max-w-2xl mx-auto mb-10 font-medium mt-6 tracking-tight">
          Sokak kültürü ve dijital sanatın kesişim noktası. <br/> 
          <span className="bg-white text-black px-1 font-bold">Limit yok. Kural yok.</span> Sadece sen ve tasarımın.
        </p>
        <button 
          onClick={() => setCurrentView('product')}
          className="bg-white text-black px-12 py-5 text-lg font-black uppercase tracking-widest hover:bg-accent hover:text-black transition-all shadow-hard active:translate-x-[4px] active:translate-y-[4px] active:shadow-none border-2 border-transparent"
        >
          Start Creating
        </button>
      </div>
    </div>
  );

  const Marquee = () => (
    <div className="bg-accent text-black py-4 overflow-hidden whitespace-nowrap border-y-2 border-black rotate-1 scale-105 z-20 relative">
      <div className="inline-block animate-marquee font-black text-2xl tracking-tighter italic">
        <span className="mx-8">/// CUSTOM EMBROIDERY LAB</span>
        <span className="mx-8 text-white stroke-black text-stroke-1">COSNA STUDIO</span>
        <span className="mx-8">/// WORLDWIDE SHIPPING</span>
        <span className="mx-8 text-white stroke-black text-stroke-1">NO MINIMUMS</span>
        <span className="mx-8">/// PREMIUM COTTON</span>
        <span className="mx-8 text-white stroke-black text-stroke-1">DROP 01 LIVE</span>
      </div>
    </div>
  );

  const StepCard = ({ number, title, desc }: {number: string, title: string, desc: string}) => (
    <div className="group relative p-8 border-2 border-black bg-white hover:bg-black hover:text-white transition-all duration-300 cursor-default shadow-hard">
      <span className="absolute right-4 top-2 text-6xl font-black text-brand-200 group-hover:text-brand-800 transition-colors opacity-40 select-none italic">
        {number}
      </span>
      <h3 className="relative text-3xl font-black mb-4 uppercase tracking-tighter z-10">{title}</h3>
      <p className="relative text-base font-medium leading-relaxed z-10 group-hover:text-gray-300">
        {desc}
      </p>
    </div>
  );

  return (
    <div className="min-h-screen pb-0 bg-white font-sans text-black">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 10s linear infinite;
        }
        .text-stroke-1 {
          -webkit-text-stroke: 1px black;
        }
      `}</style>

      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage(null)} />}

      <Navbar 
        cartCount={cartItems.length}
        favoritesCount={favoriteItems.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        onOpenLogin={() => setIsAuthOpen(true)}
        onNavigate={setCurrentView}
      />

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems}
        onRemoveItem={removeFromCart}
      />
      
      <FavoritesDrawer
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        items={favoriteItems}
        onRemoveItem={removeFromFavorites}
        onMoveToCart={moveFavoriteToCart}
      />

      <AuthModal 
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />

      {/* --- HOME VIEW --- */}
      {currentView === 'home' && (
        <div className="animate-fade-in">
          <HeroSection />
          <div className="py-12 bg-black">
             <Marquee />
          </div>

          <section className="py-24 px-4 bg-grid-pattern border-b-2 border-black">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                 <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none">
                    How To <br/><span className="text-brand-400">Cop It</span>
                 </h2>
                 <p className="text-xl font-bold max-w-md">
                    Sadece 3 adımda tasarımını giy. Karmaşa yok, sadece sanat var.
                 </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                <StepCard 
                  number="01" 
                  title="Pick Base" 
                  desc="Oversize kalıplar, ağır gramajlı kumaşlar. Sokak için üretilmiş renk paletinden seçimini yap." 
                />
                <StepCard 
                  number="02" 
                  title="Customize" 
                  desc="Kendi çizimini yükle, tag'ini yaz ya da AI asistanı ile yeni bir şeyler dene." 
                />
                <StepCard 
                  number="03" 
                  title="Rock It" 
                  desc="Usta ellerde işlenen tasarımın kapına gelsin. Fotoğrafını çek, bizi etiketle." 
                />
              </div>
            </div>
          </section>

          <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center mb-12 border-b-4 border-black pb-4">
                     <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Trending Now</h2>
                     <button onClick={() => setCurrentView('product')} className="bg-black text-white px-6 py-3 font-bold uppercase text-sm hover:bg-accent hover:text-black transition-colors">
                        View All
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-2 border-black">
                    <div className="aspect-[4/5] bg-gray-100 relative group cursor-pointer border-b-2 md:border-b-0 md:border-r-2 border-black overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1571513722275-4b41940954b3?w=800&q=80" className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500" />
                        <div className="absolute bottom-0 left-0 bg-black text-white px-4 py-2 font-black text-xl translate-y-full group-hover:translate-y-0 transition-transform">
                            ABSTRACT V1
                        </div>
                    </div>
                    <div className="aspect-[4/5] bg-gray-100 relative group cursor-pointer border-b-2 md:border-b-0 md:border-r-2 border-black overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1503342217505-b0815a046baf?w=800&q=80" className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500" />
                        <div className="absolute bottom-0 left-0 bg-black text-white px-4 py-2 font-black text-xl translate-y-full group-hover:translate-y-0 transition-transform">
                            GLITCH CORE
                        </div>
                    </div>
                    <div className="aspect-[4/5] bg-gray-100 relative group cursor-pointer overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1544441893-675973e31985?w=800&q=80" className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500" />
                        <div className="absolute bottom-0 left-0 bg-black text-white px-4 py-2 font-black text-xl translate-y-full group-hover:translate-y-0 transition-transform">
                             URBAN MYTH
                        </div>
                    </div>
                </div>
            </div>
          </section>

          <footer className="bg-black text-white pt-20 pb-10 border-t-8 border-accent">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                    <div className="col-span-1">
                        <h3 className="font-sans text-6xl font-black tracking-tighter text-white mb-6 uppercase">Cosna Lab.</h3>
                        <p className="text-xl text-gray-400 max-w-md font-medium">
                            Premium streetwear, customized by you. <br/>
                            Istanbul based. Worldwide shipping.
                        </p>
                    </div>
                    <div className="flex flex-col justify-end items-start md:items-end">
                         <div className="text-right space-y-2">
                             <a href="#" className="block text-2xl font-bold hover:text-accent transition-colors uppercase">Shop</a>
                             <a href="#" className="block text-2xl font-bold hover:text-accent transition-colors uppercase">About</a>
                             <a href="#" className="block text-2xl font-bold hover:text-accent transition-colors uppercase">Contact</a>
                         </div>
                    </div>
                </div>
                
                <div className="flex gap-6 mb-12">
                     <Instagram size={32} className="hover:text-accent cursor-pointer transition-colors" />
                     <Twitter size={32} className="hover:text-accent cursor-pointer transition-colors" />
                     <Facebook size={32} className="hover:text-accent cursor-pointer transition-colors" />
                </div>

                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 font-mono">
                    <p>© 2025 COSNA STUDIO EST. MMXXV</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-white">PRIVACY</a>
                        <a href="#" className="hover:text-white">TERMS</a>
                    </div>
                </div>
            </div>
          </footer>
        </div>
      )}

      {/* --- PRODUCT CUSTOMIZER VIEW --- */}
      {currentView === 'product' && (
        <main className="max-w-[1600px] mx-auto px-4 py-8 animate-fade-in bg-grid-pattern min-h-screen">
          
          <div className="mb-8 flex items-center justify-between">
             <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest">
                <button onClick={() => setCurrentView('home')} className="hover:bg-black hover:text-white px-2 py-1 transition-colors">Home</button>
                <span>/</span>
                <span className="bg-black text-white px-2 py-1">Lab</span>
             </div>
          </div>

          <div className="lg:grid lg:grid-cols-12 lg:gap-16">
            
            <div className="lg:col-span-7 mb-8 lg:mb-0">
               <div className="sticky top-28">
                  <ProductViewer 
                      color={selectedColor}
                      customText={customText}
                      font={selectedFont}
                      uploadedImage={uploadedImage}
                      placement={placement}
                      onToggleFavorite={toggleFavorite}
                      isFavorite={false}
                  />
                  
                  <div className="flex justify-center mt-8">
                      <div className="bg-white p-1 border-2 border-black shadow-hard inline-flex">
                          <button
                              onClick={() => setPlacement(Placement.FRONT)}
                              className={`px-8 py-3 text-sm font-bold uppercase tracking-wider transition-all ${
                                  placement === Placement.FRONT ? 'bg-black text-white' : 'text-gray-500 hover:bg-gray-100'
                              }`}
                          >
                              Front
                          </button>
                          <button
                              onClick={() => setPlacement(Placement.BACK)}
                              className={`px-8 py-3 text-sm font-bold uppercase tracking-wider transition-all ${
                                  placement === Placement.BACK ? 'bg-black text-white' : 'text-gray-500 hover:bg-gray-100'
                              }`}
                          >
                              Back
                          </button>
                      </div>
                  </div>
               </div>
            </div>

            <div className="lg:col-span-5 space-y-10">
              
              <div className="border-b-2 border-black pb-8">
                <div className="flex justify-between items-start">
                    <h1 className="text-5xl font-black text-black uppercase tracking-tighter leading-none">Boxy Fit <br/> Heavy Tee</h1>
                    <span className="bg-accent text-black text-xs font-bold px-2 py-1 border border-black uppercase">In Stock</span>
                </div>
                <div className="flex items-center gap-4 mt-4">
                  <p className="text-3xl font-bold">₺1,250.00</p>
                </div>
                <p className="text-sm font-medium text-gray-600 mt-4 leading-relaxed max-w-md">
                  450 GSM Organik pamuk. Ağır, tok ve premium hissiyat. Sokak için üretildi.
                </p>
              </div>

              {(uploadedImage || customText) && (
                <div className="bg-black text-white p-6 relative overflow-hidden group shadow-hard">
                  <div className="absolute top-0 right-0 p-3 opacity-20">
                      <Wand2 size={64} />
                  </div>
                  <h3 className="text-sm font-bold text-accent flex items-center gap-2 uppercase tracking-widest mb-2">
                    <Sparkles size={16} /> AI Stylist
                  </h3>
                  
                  {aiDescription ? (
                    <p className="mt-2 text-gray-300 font-mono text-sm leading-relaxed border-l-2 border-accent pl-4">
                      "{aiDescription}"
                    </p>
                  ) : (
                    <p className="mt-2 text-xs text-gray-400">
                      Analyze your design for hype description.
                    </p>
                  )}

                  {!aiDescription && (
                    <button 
                      onClick={handleAiAnalysis}
                      disabled={isGeneratingAi}
                      className="mt-4 text-xs bg-white text-black px-4 py-2 font-bold uppercase hover:bg-accent transition-all flex items-center gap-2 w-fit"
                    >
                      {isGeneratingAi ? <RefreshCw className="animate-spin" size={12} /> : "GENERATE HYPE"}
                    </button>
                  )}
                </div>
              )}

              <div className="space-y-4">
                <label className="text-xs font-black text-black uppercase tracking-widest block">Colorway</label>
                <div className="flex gap-4">
                  {TSHIRT_COLORS.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedColor(c)}
                      className={`w-12 h-12 border-2 transition-all ${
                        selectedColor.id === c.id ? 'border-black ring-2 ring-offset-2 ring-black' : 'border-gray-200 hover:border-black'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      aria-label={c.name}
                      title={c.name}
                    />
                  ))}
                </div>
                <span className="text-sm font-bold uppercase">{selectedColor.name}</span>
              </div>

              <div className="space-y-4">
                <label className="text-xs font-black text-black uppercase tracking-widest block">Upload Graphic</label>
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-black bg-white hover:bg-black hover:text-white transition-all p-8 flex flex-col items-center justify-center cursor-pointer group"
                >
                  <input 
                      type="file" 
                      className="hidden" 
                      ref={fileInputRef} 
                      accept="image/*"
                      onChange={handleImageUpload}
                  />
                  <Upload className="mb-2 group-hover:scale-110 transition-transform" size={32} />
                  <span className="text-sm font-bold uppercase">Drag & Drop or Click</span>
                  <span className="text-xs opacity-60 mt-1 font-mono">PNG, JPG (MAX 2MB)</span>
                </div>
                {uploadedImage && (
                  <button 
                      onClick={() => setUploadedImage(null)} 
                      className="text-xs text-white bg-red-600 px-2 py-1 font-bold uppercase flex items-center gap-1 w-fit hover:bg-red-700"
                  >
                      <Trash2 size={12} /> Remove Asset
                  </button>
                )}
              </div>

              <div className="space-y-4">
                <label className="text-xs font-black text-black uppercase tracking-widest block">Add Tag / Text</label>
                <div className="relative">
                  <input
                    type="text"
                    maxLength={20}
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value)}
                    placeholder="YOUR TEXT HERE"
                    className="w-full pl-12 pr-4 py-4 bg-white border-2 border-black focus:ring-0 focus:bg-accent/10 transition-colors text-black font-bold uppercase placeholder-gray-400"
                  />
                  <Type className="absolute left-4 top-4 text-black" size={24} />
                </div>
              </div>

              {customText && (
                  <div className="space-y-4 animate-fade-in">
                      <label className="text-xs font-black text-black uppercase tracking-widest block">Typography</label>
                      <div className="grid grid-cols-2 gap-3">
                          {FONT_OPTIONS.map((f) => (
                              <button
                                  key={f.id}
                                  onClick={() => setSelectedFont(f)}
                                  className={`py-4 px-2 text-2xl border-2 transition-all uppercase ${
                                      selectedFont.id === f.id 
                                      ? 'border-black bg-black text-white shadow-hard-sm' 
                                      : 'border-gray-200 text-gray-500 hover:border-black hover:text-black hover:shadow-hard-sm'
                                  }`}
                              >
                                  <span className={f.cssValue}>Abc</span>
                                  <span className="block text-[10px] font-sans font-bold tracking-widest mt-1 opacity-60">{f.name}</span>
                              </button>
                          ))}
                      </div>
                  </div>
              )}

              <div className="pt-6 border-t-2 border-black">
                  <button 
                    onClick={addToCart}
                    className="w-full bg-accent text-black py-5 font-black text-xl uppercase tracking-widest shadow-hard hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm transition-all flex items-center justify-center gap-3 group border-2 border-black"
                  >
                      <span>Add To Cart</span>
                      <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                  <p className="text-center text-xs text-gray-500 mt-4 font-mono">
                      MADE TO ORDER. SHIPPING IN 3-5 DAYS.
                  </p>
              </div>

            </div>
          </div>

          <ReviewSection />

        </main>
      )}
    </div>
  );
};

export default App;
