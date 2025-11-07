import { Badge } from './ui/badge';

interface Commission {
  id: number;
  date: string;
  seller: string;
  amount: number;
  status: 'paid' | 'pending' | 'cancelled';
  commissionRate: number;
}

interface CommissionHistoryProps {
  commissions: Commission[];
}

export function CommissionHistory({ commissions }: CommissionHistoryProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-[#14B8A6]/10 text-[#14B8A6] border-[#14B8A6]/20';
      case 'pending':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'cancelled':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'paid':
        return 'Pago';
      case 'pending':
        return 'Pendente';
      case 'cancelled':
        return 'Cancelado';
      default:
        return status;
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-200">
            <th className="text-left py-3 px-4 text-slate-600">Data</th>
            <th className="text-left py-3 px-4 text-slate-600">Seller</th>
            <th className="text-left py-3 px-4 text-slate-600">Comissão/Transação</th>
            <th className="text-left py-3 px-4 text-slate-600">Status</th>
            <th className="text-right py-3 px-4 text-slate-600">Valor Pago</th>
          </tr>
        </thead>
        <tbody>
          {commissions.map((commission) => (
            <tr key={commission.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
              <td className="py-4 px-4 text-slate-700">
                {new Date(commission.date).toLocaleDateString('pt-BR')}
              </td>
              <td className="py-4 px-4 text-slate-900">{commission.seller}</td>
              <td className="py-4 px-4 text-slate-700">
                R$ {commission.commissionRate.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </td>
              <td className="py-4 px-4">
                <Badge className={getStatusColor(commission.status)}>
                  {getStatusLabel(commission.status)}
                </Badge>
              </td>
              <td className="py-4 px-4 text-right text-slate-900">
                R$ {commission.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
