import { useId } from "react";

export default function LoanInputs({ values, onChange }) {
  const idAmount = useId();
  const idRate = useId();
  const idYears = useId();
  const idExtra = useId();

  return (
    <section className="bg-white dark:bg-slate-900/60 backdrop-blur border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Kwota kredytu" id={idAmount} suffix="PLN">
          <input
            id={idAmount}
            type="number"
            inputMode="decimal"
            className="w-full h-11 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            min={0}
            step={1000}
            value={values.amount}
            onChange={(e) => onChange({ ...values, amount: Number(e.target.value) })}
          />
        </Field>

        <Field label="Oprocentowanie (roczne)" id={idRate} suffix="%">
          <input
            id={idRate}
            type="number"
            inputMode="decimal"
            className="w-full h-11 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            min={0}
            step={0.01}
            value={values.rate}
            onChange={(e) => onChange({ ...values, rate: Number(e.target.value) })}
          />
        </Field>

        <Field label="Okres spłaty" id={idYears} suffix="lat">
          <input
            id={idYears}
            type="number"
            inputMode="numeric"
            className="w-full h-11 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            min={1}
            max={40}
            step={1}
            value={values.years}
            onChange={(e) => onChange({ ...values, years: Number(e.target.value) })}
          />
        </Field>

        <Field label="Nadpłata miesięczna (opcjonalnie)" id={idExtra} suffix="PLN">
          <input
            id={idExtra}
            type="number"
            inputMode="decimal"
            className="w-full h-11 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            min={0}
            step={100}
            value={values.extra}
            onChange={(e) => onChange({ ...values, extra: Number(e.target.value) })}
          />
        </Field>
      </div>
      <p className="text-sm text-slate-500 mt-4">Obliczenia mają charakter poglądowy. Rzeczywiste warunki mogą się różnić w zależności od oferty banku.</p>
    </section>
  );
}

function Field({ label, id, suffix, children }) {
  return (
    <label htmlFor={id} className="block">
      <span className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">{label}</span>
      <div className="relative">
        {children}
        {suffix ? (
          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-500 text-sm">{suffix}</span>
        ) : null}
      </div>
    </label>
  );
}
