import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateCreativeDescription = async (
  imageBase64: string | null,
  customText: string,
  colorName: string
): Promise<string> => {
  
  const model = 'gemini-2.5-flash';
  
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
      // Clean base64 string if it has prefix
      const base64Data = imageBase64.split(',')[1] || imageBase64;
      parts.push({
        inlineData: {
          mimeType: 'image/png', // Assuming PNG/JPEG from input, generic handling
          data: base64Data
        }
      });
    }

    const response = await ai.models.generateContent({
      model: model,
      contents: { parts },
    });

    return response.text || "Tasarımınız harika görünüyor!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Benzersiz tasarımınız, Cosna kalitesiyle buluşmaya hazır.";
  }
};
