import { useState } from "react";

const fmtPl = new Intl.NumberFormat("pl-PL", { style: "currency", currency: "PLN" });

export default function AmortizationSchedule({ schedule = [] }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? schedule : schedule.slice(0, 12);

  if (!schedule.length) return null;

  return (
    <section className="bg-white dark:bg-slate-900/60 backdrop-blur border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100">Harmonogram spłat</h3>
        {schedule.length > 12 && (
          <button
            onClick={() => setExpanded((v) => !v)}
            className="text-sm px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            {expanded ? "Pokaż 12 mies." : `Pokaż wszystko (${schedule.length})`}
          </button>
        )}
      </div>

      <div className="overflow-auto rounded-lg border border-slate-200 dark:border-slate-800">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-600 dark:text-slate-300 text-xs uppercase">
            <tr>
              <Th>#</Th>
              <Th>Rata</Th>
              <Th>Kapitał</Th>
              <Th>Odsetki</Th>
              <Th>Pozostało</Th>
            </tr>
          </thead>
          <tbody>
            {visible.map((row) => (
              <tr key={row.period} className="border-t border-slate-200 dark:border-slate-800">
                <Td>{row.period}</Td>
                <Td>{fmtPl.format(row.payment)}</Td>
                <Td>{fmtPl.format(row.principalPaid)}</Td>
                <Td>{fmtPl.format(row.interestPaid)}</Td>
                <Td>{fmtPl.format(row.balance)}</Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function Th({ children }) {
  return (
    <th className="text-left font-medium px-4 py-3 whitespace-nowrap">{children}</th>
  );
}

function Td({ children }) {
  return <td className="px-4 py-3 whitespace-nowrap">{children}</td>;
}
