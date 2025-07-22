// OttomanFlashcards.jsx
// Konuya göre filtrelenebilir iki yüzlü kartlar

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const allFlashcards = [
  {
    topic: "Kuruluş",
    question: "Osmanlı Devleti ne zaman kuruldu?",
    answer: "1299 yılında Osman Bey tarafından kuruldu."
  },
  {
    topic: "Kuruluş",
    question: "İlk Osmanlı padişahı kimdir?",
    answer: "Osman Gazi."
  },
  {
    topic: "Başkentler",
    question: "Osmanlı Devleti'nin ilk başkenti neresiydi?",
    answer: "Bursa (1326‑1365) Osmanlı'nın ilk başkentidir."
  },
  {
    topic: "Yükselme",
    question: "Kanuni Sultan Süleyman'ın lakabı nedir?",
    answer: "Avrupa'da 'Muhteşem Süleyman', Osmanlı kaynaklarında 'Kanuni'."
  },
  {
    topic: "Dağılma",
    question: "Osmanlı Devleti hangi antlaşma ile resmen sona erdi?",
    answer: "24 Temmuz 1923 Lozan Barış Antlaşması ile."
  },
  {
    topic: "Kültür",
    question: "Divan-ı Hümayun nedir?",
    answer: "Padişahın başkanlık ettiği en yüksek devlet kuruludur."
  },
  {
    topic: "Kültür",
    question: "Osmanlı’da medrese nedir?",
    answer: "Eğitim ve öğretim verilen kurumdur."
  }
];

const topics = [...new Set(allFlashcards.map((f) => f.topic))];

export default function OttomanFlashcards() {
  const [selectedTopic, setSelectedTopic] = useState(topics[0]);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const filteredCards = allFlashcards.filter(
    (card) => card.topic === selectedTopic
  );

  const nextCard = () => {
    setFlipped(false);
    setIndex((prev) => (prev + 1) % filteredCards.length);
  };

  const prevCard = () => {
    setFlipped(false);
    setIndex((prev) => (prev === 0 ? filteredCards.length - 1 : prev - 1));
  };

  const { question, answer } = filteredCards[index];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-orange-50 to-emerald-50 p-6 gap-8">
      {/* Konu Listesi */}
      <aside className="w-full md:w-64 space-y-2">
        <h2 className="text-xl font-bold mb-4">Konu Başlıkları</h2>
        {topics.map((topic) => (
          <button
            key={topic}
            onClick={() => {
              setSelectedTopic(topic);
              setIndex(0);
              setFlipped(false);
            }}
            className={`block w-full text-left px-4 py-2 rounded-lg shadow-sm border border-gray-200 hover:bg-emerald-100 transition ${
              topic === selectedTopic ? "bg-emerald-200 font-semibold" : "bg-white"
            }`}
          >
            {topic}
          </button>
        ))}
      </aside>

      {/* Kart ve Navigasyon */}
      <div className="flex flex-col items-center justify-center flex-grow gap-6">
        <motion.div
          className="relative w-80 h-56 cursor-pointer [transform-style:preserve-3d]"
          style={{ perspective: 1000 }}
          onClick={() => setFlipped((f) => !f)}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Ön Yüz */}
          <div className="absolute w-full h-full backface-hidden">
            <Card className="w-full h-full flex items-center justify-center shadow-2xl rounded-2xl p-4 bg-white">
              <CardContent className="text-xl font-semibold text-center">
                {question}
              </CardContent>
            </Card>
          </div>

          {/* Arka Yüz */}
          <div className="absolute w-full h-full rotate-y-180 backface-hidden">
            <Card className="w-full h-full flex items-center justify-center shadow-2xl rounded-2xl p-4 bg-emerald-100">
              <CardContent className="text-lg text-center">
                {flipped ? answer : ""}
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Ok Butonları */}
        <div className="flex gap-6">
          <Button variant="outline" onClick={prevCard} className="rounded-full shadow-xl">
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button variant="outline" onClick={nextCard} className="rounded-full shadow-xl">
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

/* Tailwind yardımcı sınıflar (index.css içine ekleyin)
.backface-hidden {
  backface-visibility: hidden;
}
.rotate-y-180 {
  transform: rotateY(180deg);
}
*/
