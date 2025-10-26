import { useMemo, useState } from "react";
import Header from "./components/Header";
import LoanInputs from "./components/LoanInputs";
import ResultsSummary from "./components/ResultsSummary";
import AmortizationSchedule from "./components/AmortizationSchedule";

function round2(n) {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

function buildSchedule({ amount, rate, years, extra }) {
  const n = Math.max(1, Math.round(years * 12));
  const r = rate > 0 ? rate / 100 / 12 : 0;
  const P = Math.max(0, amount);

  let basePayment = 0;
  if (r === 0) {
    basePayment = n > 0 ? P / n : 0;
  } else {
    basePayment = (P * r) / (1 - Math.pow(1 + r, -n));
  }

  const scheduledPayment = basePayment + Math.max(0, extra || 0);

  let balance = P;
  const schedule = [];
  let totalInterest = 0;
  let totalPaid = 0;
  let period = 0;
  const limit = 1200; // safety guard

  while (balance > 0 && period < limit) {
    period += 1;
    const interest = r === 0 ? 0 : balance * r;
    let payment = Math.min(balance + interest, scheduledPayment);
    const principalPaid = payment - interest;
    balance = Math.max(0, balance - principalPaid);

    const row = {
      period,
      payment: round2(payment),
      principalPaid: round2(principalPaid),
      interestPaid: round2(interest),
      balance: round2(balance),
    };
    schedule.push(row);

    totalInterest += interest;
    totalPaid += payment;

    if (balance <= 0.01) {
      balance = 0;
      break;
    }
  }

  return {
    monthlyPayment: round2(basePayment),
    scheduledPayment: round2(scheduledPayment),
    totalInterest: round2(totalInterest),
    totalPaid: round2(totalPaid),
    monthsToPayoff: schedule.length,
    schedule,
  };
}

export default function App() {
  const [values, setValues] = useState({ amount: 500000, rate: 7.2, years: 25, extra: 0 });

  const results = useMemo(() => buildSchedule(values), [values]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 text-slate-900 dark:text-slate-100">
      <Header />

      <main className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        <LoanInputs values={values} onChange={setValues} />
        <ResultsSummary results={{
          monthlyPayment: results.scheduledPayment, // show with nadpłata
          totalInterest: results.totalInterest,
          totalPaid: results.totalPaid,
          monthsToPayoff: results.monthsToPayoff,
        }} />
        <AmortizationSchedule schedule={results.schedule} />

        <div className="text-xs text-slate-500 pt-2">
          Uwaga: Rata miesięczna prezentowana jest z uwzględnieniem ewentualnej nadpłaty. Ostatnia rata może być niższa.
        </div>
      </main>
    </div>
  );
}
