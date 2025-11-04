import React, { useState } from 'react';
import { GoogleGenAI, Modality } from "@google/genai";

interface AiMagicToolProps {
  setImageUrl: (url: string) => void;
  setImageTitle: (title: string) => void;
  setIsLoading: (loading: boolean) => void;
  isLoading: boolean;
  addImageToGallery: (url: string, title: string) => void;
}

const AiMagicTool: React.FC<AiMagicToolProps> = ({ setImageUrl, setImageTitle, setIsLoading, isLoading, addImageToGallery }) => {
  const [prompt, setPrompt] = useState('');

  const handleGenerate = async () => {
    if (!prompt || isLoading) return;
    const currentPrompt = prompt;
    setIsLoading(true);
    setImageTitle(`AI: ${currentPrompt}`);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: currentPrompt }],
        },
        config: {
          responseModalities: [Modality.IMAGE],
        },
      });

      const parts = response.candidates?.[0]?.content?.parts;
      let imageFound = false;
      if (parts) {
        for (const part of parts) {
          if (part.inlineData) {
            const base64ImageBytes: string = part.inlineData.data;
            const newImageUrl = `data:image/png;base64,${base64ImageBytes}`;
            setImageUrl(newImageUrl);
            addImageToGallery(newImageUrl, `AI: ${currentPrompt}`);
            imageFound = true;
            break;
          }
        }
      }

      if (!imageFound) {
        throw new Error("No image data found in the AI response.");
      }

    } catch (error) {
      console.error("Error generating image:", error);
      setImageTitle("Generation Failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section>
       <h2 className="text-sm font-semibold text-gray-500 mb-3">AI MAGIC TOOL</h2>
       <div className="relative">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="A husky wearing sunglasses on a beach"
          className="w-full p-3 pr-32 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
          disabled={isLoading}
          aria-label="AI image generation prompt"
        />
        <button
          onClick={handleGenerate}
          disabled={isLoading || !prompt}
          className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-gradient-to-br from-blue-500 to-indigo-600 text-white px-3 py-2 rounded-lg font-semibold text-sm flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed transition-transform duration-200 hover:scale-105 active:scale-100"
          aria-label="Generate AI image"
        >
          {isLoading ? (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          )}
          <span>Generate</span>
        </button>
       </div>
    </section>
  );
};
export default AiMagicTool;