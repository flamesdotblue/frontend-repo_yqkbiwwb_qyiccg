import { BadgePercent, Clock, Coins } from "lucide-react";

const fmtPl = new Intl.NumberFormat("pl-PL", { style: "currency", currency: "PLN" });

export default function ResultsSummary({ results }) {
  const { monthlyPayment, totalInterest, totalPaid, monthsToPayoff } = results;
  const years = Math.floor(monthsToPayoff / 12);
  const months = monthsToPayoff % 12;

  return (
    <section className="bg-white dark:bg-slate-900/60 backdrop-blur border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <Metric
          icon={<Coins className="w-5 h-5" />}
          label="Rata miesięczna"
          value={fmtPl.format(monthlyPayment || 0)}
        />
        <Metric
          icon={<BadgePercent className="w-5 h-5" />}
          label="Odsetki łącznie"
          value={fmtPl.format(totalInterest || 0)}
        />
        <Metric
          icon={<Clock className="w-5 h-5" />}
          label="Czas spłaty"
          value={`${years} lat${years === 1 ? "" : ""}${months ? ` ${months} mies.` : ""}`}
        />
      </div>
      <div className="mt-5 text-sm text-slate-600 dark:text-slate-300">
        Całkowita kwota do zapłaty: <span className="font-medium">{fmtPl.format(totalPaid || 0)}</span>
      </div>
    </section>
  );
}

function Metric({ icon, label, value }) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900">
      <div className="p-2 rounded-lg bg-indigo-600 text-white">
        {icon}
      </div>
      <div>
        <div className="text-xs uppercase tracking-wide text-slate-500">{label}</div>
        <div className="text-lg font-semibold">{value}</div>
      </div>
    </div>
  );
}
