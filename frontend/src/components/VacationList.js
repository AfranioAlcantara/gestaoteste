export default function VacationList({ requests, loading, userRole, onDecision }) {
  if (loading) {
    return <p className="text-slate-600">Carregando solicitações...</p>;
  }

  if (!requests.length) {
    return <p className="text-slate-600">Nenhuma solicitação encontrada.</p>;
  }

  return (
    <div className="space-y-4">
      {requests.map((request) => (
        <div key={request.id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-slate-500">{userRole === 'manager' ? request.user_name : 'Você'}</p>
              <p className="font-semibold text-slate-900">{request.start_date} → {request.end_date}</p>
            </div>
            <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
              {request.status}
            </div>
          </div>
          <p className="mt-3 text-sm text-slate-600">Dias: {request.total_days}</p>
          {request.manager_comment && <p className="mt-2 text-sm text-slate-700">Comentário do gestor: {request.manager_comment}</p>}
          {userRole === 'manager' && request.status === 'pending' && (
            <div className="mt-4 flex flex-wrap gap-3">
              <button
                onClick={() => onDecision(request.id, 'approved')}
                className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                Aprovar
              </button>
              <button
                onClick={() => onDecision(request.id, 'rejected')}
                className="rounded-full bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-700"
              >
                Rejeitar
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
