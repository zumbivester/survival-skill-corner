import React, { useState, useEffect } from "react";
import { TipCard } from "@/components/TipCard";
import { SearchBar } from "@/components/SearchBar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home, Wrench, Shield, Flame, Droplets, Lock, Globe } from "lucide-react";

const tips = [
  {
    id: 1,
    title: "Basic Fire Starting",
    description: "Learn how to start a fire using basic materials like matches, lighters, or natural materials.",
    category: "Survival",
    icon: Flame,
    ticker: [
      "Use dry tinder like paper or dry grass",
      "Create a fire pit with stones",
      "Stack wood in a teepee formation",
      "Shield flame from wind",
      "Always keep water nearby"
    ]
  },
  {
    id: 2,
    title: "Fix a Leaky Faucet",
    description: "Step-by-step guide to fix common faucet leaks using basic tools.",
    category: "Home Repair",
    icon: Droplets,
    ticker: [
      "Turn off water supply first",
      "Remove faucet handle and cap",
      "Replace worn O-rings",
      "Check for mineral deposits",
      "Test for leaks after repair"
    ]
  },
  {
    id: 3,
    title: "Emergency Kit Essentials",
    description: "List of essential items to include in your home emergency kit.",
    category: "Emergency",
    icon: Shield,
    ticker: [
      "Store 3-day water supply",
      "Pack non-perishable food",
      "Include first-aid supplies",
      "Keep flashlights and batteries",
      "Have emergency contact list"
    ]
  },
  {
    id: 4,
    title: "Secure Your Home Network",
    description: "Essential steps to protect your home WiFi network from unauthorized access.",
    category: "Safety & Privacy",
    icon: Lock,
    ticker: [
      "Change default passwords",
      "Enable WPA3 encryption",
      "Update router firmware",
      "Use guest network",
      "Monitor connected devices"
    ]
  },
  {
    id: 5,
    title: "Safe Internet Browsing",
    description: "Best practices for maintaining privacy and security while browsing the internet.",
    category: "Safety & Privacy",
    icon: Globe,
    ticker: [
      "Use HTTPS websites only",
      "Enable two-factor auth",
      "Update software regularly",
      "Avoid public WiFi",
      "Use password manager"
    ]
  }
];

const categories = ["All", "Survival", "Home Repair", "Emergency", "Safety & Privacy"];

export default function Index() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [tickerIndex, setTickerIndex] = useState(0);
  const [selectedTip, setSelectedTip] = useState<typeof tips[0] | null>(null);

  const filteredTips = tips.filter((tip) => {
    const matchesSearch = tip.title.toLowerCase().includes(search.toLowerCase()) ||
      tip.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "All" || tip.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Ticker effect
  useEffect(() => {
    if (selectedTip) {
      const interval = setInterval(() => {
        setTickerIndex((prev) => (prev + 1) % selectedTip.ticker.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [selectedTip]);

  const handleCardClick = (tip: typeof tips[0]) => {
    setSelectedTip(tip);
    setTickerIndex(0);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-survival-500 mb-4">Survival & Safety Guide</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Essential tips and tricks for survival skills, home repairs, emergency preparedness, and digital safety.
        </p>
      </div>

      {selectedTip && (
        <div className="max-w-3xl mx-auto mb-8 bg-survival-100 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-survival-500">{selectedTip.title}</h3>
            <span className="text-survival-500 font-mono animate-pulse">
              {selectedTip.ticker[tickerIndex]}
            </span>
          </div>
        </div>
      )}

      <div className="max-w-3xl mx-auto mb-8">
        <SearchBar value={search} onChange={setSearch} />
      </div>

      <Tabs defaultValue="All" className="max-w-3xl mx-auto">
        <TabsList className="grid w-full grid-cols-5">
          {categories.map((category) => (
            <TabsTrigger
              key={category}
              value={category}
              onClick={() => setActiveCategory(category)}
              className="data-[state=active]:bg-survival-100 data-[state=active]:text-survival-500"
            >
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeCategory} className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            {filteredTips.map((tip) => (
              <div key={tip.id} onClick={() => handleCardClick(tip)} className="cursor-pointer">
                <TipCard
                  title={tip.title}
                  description={tip.description}
                  category={tip.category}
                  icon={tip.icon}
                />
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}