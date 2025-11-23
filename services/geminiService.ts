import { GoogleGenAI } from "@google/genai";

// Vite projelerinde env değişkenlerine import.meta.env ile erişilir.
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

let ai: GoogleGenAI | null = null;

if (API_KEY) {
  ai = new GoogleGenAI({ apiKey: API_KEY });
} else {
  console.warn("UYARI: VITE_GEMINI_API_KEY bulunamadı. AI özellikleri çalışmayacaktır.");
}

export const generateCreativeDescription = async (
  imageBase64: string | null,
  customText: string,
  colorName: string
): Promise<string> => {
  
  if (!ai) {
    return "AI servisi yapılandırılmamış (API Key eksik).";
  }

  // Model ismini güncel ve kararlı bir versiyon seçtik
  const modelId = 'gemini-1.5-flash'; 
  
  let promptText = `Sen "Cosna" adında niş, minimalist ve sanatsal bir t-shirt markasının marka yöneticisisin. 
  Müşteri ${colorName} renginde bir t-shirt tasarladı.`;

  if (customText) {
    promptText += ` Üzerine şu yazıyı yazdırdı: "${customText}".`;
  }
  
  if (imageBase64) {
    promptText += ` Ayrıca bir görsel yükledi (bu görsel nakış olarak işlenecek).`;
  }

  promptText += ` Lütfen bu tasarım için çok kısa, etkileyici, şiirsel ve satışa teşvik edici (hype yaratan) bir ürün açıklaması yaz. 
  Türkçe yaz. Maksimum 2 cümle olsun. Samimi ama premium bir ton kullan.`;

  try {
    const parts: any[] = [{ text: promptText }];

    if (imageBase64) {
      // Base64 başlığını temizle
      const base64Data = imageBase64.includes(',') ? imageBase64.split(',')[1] : imageBase64;
      
      parts.push({
        inlineData: {
          mimeType: 'image/png', 
          data: base64Data
        }
      });
    }

    const response = await ai.models.generateContent({
      model: modelId,
      contents: { parts },
    });

    return response.text() || "Tasarımınız harika görünüyor!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Benzersiz tasarımınız, Cosna kalitesiyle buluşmaya hazır.";
  }
};
