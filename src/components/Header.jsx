import { Calculator } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full py-8 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white">
      <div className="max-w-5xl mx-auto px-6 flex items-center gap-4">
        <div className="p-3 rounded-xl bg-slate-700/60 ring-1 ring-white/10">
          <Calculator className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">Kalkulator kredytowy</h1>
          <p className="text-slate-300 mt-1">Oblicz ratę miesięczną, całkowity koszt i harmonogram spłat.</p>
        </div>
      </div>
    </header>
  );
}
