// OttomanFlashcards.jsx
// İki yüzlü dönebilen kart yapısı - Soru/Cevap

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const flashcards = [
  {
    question: "Osmanlı Devleti ne zaman kuruldu?",
    answer: "1299 yılında Osman Bey tarafından kuruldu."
  },
  {
    question: "Osmanlı Devleti'nin ilk başkenti neresiydi?",
    answer: "Bursa (1326‑1365) Osmanlı'nın ilk başkentidir."
  },
  {
    question: "Kanuni Sultan Süleyman'ın lakabı nedir?",
    answer: "Avrupa'da 'Muhteşem Süleyman', Osmanlı kaynaklarında 'Kanuni'."
  },
  {
    question: "Osmanlı Devleti hangi antlaşma ile resmen sona erdi?",
    answer: "24 Temmuz 1923 Lozan Barış Antlaşması ile."
  },
  {
    question: "İlk Osmanlı padişahı kimdir?",
    answer: "Osman Gazi."
  }
];

export default function OttomanFlashcards() {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const nextCard = () => {
    setFlipped(false);
    setIndex((prev) => (prev + 1) % flashcards.length);
  };

  const prevCard = () => {
    setFlipped(false);
    setIndex((prev) => (prev === 0 ? flashcards.length - 1 : prev - 1));
  };

  const { question, answer } = flashcards[index];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 p-4 bg-gradient-to-br from-orange-50 to-emerald-50">
      {/* Kart */}
      <motion.div
        className="relative w-80 h-56 cursor-pointer [transform-style:preserve-3d]"
        style={{ perspective: 1000 }}
        onClick={() => setFlipped((f) => !f)}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Ön Yüz (Soru) */}
        <div className="absolute w-full h-full backface-hidden">
          <Card className="w-full h-full flex items-center justify-center shadow-2xl rounded-2xl p-4 bg-white">
            <CardContent className="text-xl font-semibold text-center">
              {question}
            </CardContent>
          </Card>
        </div>

        {/* Arka Yüz (Cevap) */}
        <div className="absolute w-full h-full rotate-y-180 backface-hidden">
          <Card className="w-full h-full flex items-center justify-center shadow-2xl rounded-2xl p-4 bg-emerald-100">
            <CardContent className="text-lg text-center">
              {answer}
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Navigasyon Butonları */}
      <div className="flex gap-6">
        <Button variant="outline" onClick={prevCard} className="rounded-full shadow-xl">
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <Button variant="outline" onClick={nextCard} className="rounded-full shadow-xl">
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
} 

/* Tailwind'e özel yardımcı sınıflar (index.css veya global.css içine ekleyin)
.backface-hidden {
  backface-visibility: hidden;
}
.rotate-y-180 {
  transform: rotateY(180deg);
}
*/
