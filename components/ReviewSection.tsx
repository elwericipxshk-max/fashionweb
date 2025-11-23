
import React, { useState, useRef } from 'react';
import { Review } from '../types';
import { MOCK_REVIEWS } from '../constants';
import { Star, Camera, Upload } from 'lucide-react';

const ReviewSection: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(MOCK_REVIEWS);
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [photo, setPhoto] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const newReview: Review = {
      id: Date.now().toString(),
      userName: 'You', // Mock user
      rating: newRating,
      comment: newComment,
      date: 'Just Now',
      image: photo || undefined
    };

    setReviews([newReview, ...reviews]);
    setNewComment('');
    setPhoto(null);
    setNewRating(5);
  };

  return (
    <div className="mt-20 border-t-4 border-black pt-12">
      <h2 className="text-4xl font-black uppercase tracking-tighter text-black mb-8">Community Reviews</h2>
      
      {/* Add Review Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 border-2 border-black shadow-hard mb-12">
        <h3 className="text-lg font-bold uppercase mb-4">Drop a Review</h3>
        <div className="flex gap-2 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setNewRating(star)}
              className={`${star <= newRating ? 'text-black' : 'text-gray-300'} transition-colors hover:scale-110`}
            >
              <Star fill={star <= newRating ? "currentColor" : "none"} size={28} strokeWidth={2.5} />
            </button>
          ))}
        </div>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Tell us about the fit..."
          className="w-full p-4 border-2 border-black font-mono text-sm focus:ring-0 focus:bg-gray-50 mb-4"
          rows={3}
        />
        
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                 <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    ref={fileInputRef}
                    onChange={handlePhotoUpload}
                 />
                 <button 
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2 text-xs font-bold uppercase border-2 border-black px-4 py-2 hover:bg-black hover:text-white transition-colors"
                 >
                    <Camera size={16} />
                    {photo ? 'Photo Added' : 'Add Photo'}
                 </button>
                 {photo && <img src={photo} alt="Preview" className="w-10 h-10 object-cover border border-black" />}
            </div>
            
            <button 
                type="submit" 
                className="bg-black text-white px-8 py-2 text-sm font-black uppercase tracking-widest hover:bg-accent hover:text-black border-2 border-black transition-colors"
            >
                Post
            </button>
        </div>
      </form>

      {/* Review List */}
      <div className="grid gap-6">
        {reviews.map((review) => (
          <div key={review.id} className="bg-gray-50 p-6 border-2 border-black">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-black text-white flex items-center justify-center font-black text-lg uppercase">
                        {review.userName.charAt(0)}
                    </div>
                    <div>
                        <h4 className="font-bold text-black uppercase text-sm">{review.userName}</h4>
                        <span className="text-xs text-gray-500 font-mono">{review.date}</span>
                    </div>
                </div>
                <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={14} 
                        className={i < review.rating ? "text-black" : "text-gray-300"} 
                        fill={i < review.rating ? "currentColor" : "none"}
                      />
                    ))}
                </div>
            </div>
            
            <p className="text-black text-sm font-medium leading-relaxed">{review.comment}</p>
            
            {review.image && (
                <div className="mt-4">
                    <img src={review.image} alt="User review" className="w-24 h-24 object-cover border-2 border-black cursor-pointer hover:scale-105 transition-transform" />
                </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;
