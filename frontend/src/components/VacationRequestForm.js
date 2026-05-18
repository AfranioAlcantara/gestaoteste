import { useMemo, useState } from 'react';

export default function VacationRequestForm({ onSubmit }) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const totalDays = useMemo(() => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
    return diff > 0 ? diff : 0;
  }, [startDate, endDate]);

  function handleSubmit(event) {
    event.preventDefault();
    if (totalDays <= 0) return;
    onSubmit({ start_date: startDate, end_date: endDate, total_days: totalDays });
    setStartDate('');
    setEndDate('');
  }

  const invalidRange = startDate && endDate && new Date(endDate) < new Date(startDate);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Início</span>
          <input
            type="date"
            value={startDate}
            onChange={(event) => setStartDate(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-slate-900"
            required
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Fim</span>
          <input
            type="date"
            value={endDate}
            onChange={(event) => setEndDate(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-slate-900"
            required
          />
        </label>
      </div>

      {invalidRange && <p className="text-sm text-red-600">A data de fim não pode ser anterior à data de início.</p>}

      <div className="rounded-3xl bg-slate-100 p-4 text-sm text-slate-700">
        Total de dias: <strong>{totalDays}</strong>
      </div>

      <button
        type="submit"
        disabled={invalidRange || totalDays <= 0}
        className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
      >
        Enviar solicitação
      </button>
    </form>
  );
}
