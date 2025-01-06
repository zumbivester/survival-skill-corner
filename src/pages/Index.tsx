import { useState } from "react";
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
  },
  {
    id: 2,
    title: "Fix a Leaky Faucet",
    description: "Step-by-step guide to fix common faucet leaks using basic tools.",
    category: "Home Repair",
    icon: Droplets,
  },
  {
    id: 3,
    title: "Emergency Kit Essentials",
    description: "List of essential items to include in your home emergency kit.",
    category: "Emergency",
    icon: Shield,
  },
  {
    id: 4,
    title: "Secure Your Home Network",
    description: "Essential steps to protect your home WiFi network from unauthorized access.",
    category: "Safety & Privacy",
    icon: Lock,
  },
  {
    id: 5,
    title: "Safe Internet Browsing",
    description: "Best practices for maintaining privacy and security while browsing the internet.",
    category: "Safety & Privacy",
    icon: Globe,
  }
];

const categories = ["All", "Survival", "Home Repair", "Emergency", "Safety & Privacy"];

export default function Index() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredTips = tips.filter((tip) => {
    const matchesSearch = tip.title.toLowerCase().includes(search.toLowerCase()) ||
      tip.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "All" || tip.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-survival-500 mb-4">Survival & Safety Guide</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Essential tips and tricks for survival skills, home repairs, emergency preparedness, and digital safety.
        </p>
      </div>

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
              <TipCard
                key={tip.id}
                title={tip.title}
                description={tip.description}
                category={tip.category}
                icon={tip.icon}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}