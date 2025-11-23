
import React from 'react';
import { TShirtColor, FontOption, Placement } from '../types';
import { Heart } from 'lucide-react';

interface ProductViewerProps {
  color: TShirtColor;
  customText: string;
  font: FontOption;
  uploadedImage: string | null;
  placement: Placement;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}

const ProductViewer: React.FC<ProductViewerProps> = ({
  color,
  customText,
  font,
  uploadedImage,
  placement,
  isFavorite = false,
  onToggleFavorite
}) => {
  const isFront = placement === Placement.FRONT;

  return (
    <div className="relative w-full aspect-[3/4] bg-white border-2 border-black shadow-hard group overflow-hidden">
      
      {/* Background Grid - Technical Look */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ 
             backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', 
             backgroundSize: '40px 40px' 
           }}>
      </div>

      {/* Base Image */}
      <img 
        src={isFront ? color.imageFront : color.imageBack} 
        alt={color.name}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* Overlay to simulate fabric texture/shadow integration */}
      <div className="absolute inset-0 bg-black/5 pointer-events-none mix-blend-multiply"></div>

      {/* Customization Area */}
      <div className={`absolute top-[25%] left-[25%] right-[25%] bottom-[35%] flex flex-col items-center justify-center pointer-events-none overflow-hidden border-2 border-dashed border-white/40 rounded-sm`}>
        
        {/* Uploaded Image (Embroidery Simulation) */}
        {uploadedImage && (
          <div className="relative w-3/4 h-3/4 mb-2">
            <img 
              src={uploadedImage} 
              alt="Custom Embroidery" 
              className="w-full h-full object-contain drop-shadow-md filter contrast-125"
              style={{ filter: 'drop-shadow(2px 2px 2px rgba(0,0,0,0.5))' }} 
            />
          </div>
        )}

        {/* Custom Text */}
        {customText && (
          <div 
            className={`text-center break-words max-w-full px-2 leading-tight ${font.cssValue}`}
            style={{ 
              color: color.id === 'black' || color.id === 'navy' ? '#e5e5e5' : '#1a1a1a',
              fontSize: '1.4rem',
              textShadow: '1px 1px 0px rgba(0,0,0,0.2)'
            }}
          >
            {customText}
          </div>
        )}
      </div>
      
      {/* View Indicator Badge */}
      <div className="absolute top-4 left-4 bg-black text-white text-xs font-black px-3 py-1 uppercase tracking-widest border border-white">
        {isFront ? 'Front View' : 'Back View'}
      </div>

      {/* Favorite Toggle Button */}
      {onToggleFavorite && (
        <button 
          onClick={onToggleFavorite}
          className="absolute top-4 right-4 bg-white border-2 border-black p-2 text-black hover:bg-black hover:text-white transition-all shadow-hard-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
        >
          <Heart 
            size={20} 
            className={isFavorite ? "fill-red-500 text-red-500" : "currentColor"} 
          />
        </button>
      )}
    </div>
  );
};

export default ProductViewer;