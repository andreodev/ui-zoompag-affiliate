import { Badge } from './ui/badge';

interface Seller {
  id: number;
  name: string;
  email: string;
  status: 'active' | 'pending' | 'inactive';
  signupDate: string;
  commission: number;
  volume: number;
  commissionRate: number;
}

interface SellerListProps {
  sellers: Seller[];
}

export function SellerList({ sellers }: SellerListProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-[#14B8A6]/10 text-[#14B8A6] border-[#14B8A6]/20';
      case 'pending':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'inactive':
        return 'bg-slate-100 text-slate-700 border-slate-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'Ativo';
      case 'pending':
        return 'Pendente';
      case 'inactive':
        return 'Inativo';
      default:
        return status;
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-200">
            <th className="text-left py-3 px-4 text-slate-600">Seller</th>
            <th className="text-left py-3 px-4 text-slate-600">Email</th>
            <th className="text-left py-3 px-4 text-slate-600">Status</th>
            <th className="text-left py-3 px-4 text-slate-600">Data de Cadastro</th>
            <th className="text-right py-3 px-4 text-slate-600">Volume</th>
            <th className="text-right py-3 px-4 text-slate-600">Comissão/Transação</th>
          </tr>
        </thead>
        <tbody>
          {sellers.map((seller) => (
            <tr key={seller.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
              <td className="py-4 px-4 text-slate-900">{seller.name}</td>
              <td className="py-4 px-4 text-slate-700">{seller.email}</td>
              <td className="py-4 px-4">
                <Badge className={getStatusColor(seller.status)}>
                  {getStatusLabel(seller.status)}
                </Badge>
              </td>
              <td className="py-4 px-4 text-slate-700">
                {new Date(seller.signupDate).toLocaleDateString('pt-BR')}
              </td>
              <td className="py-4 px-4 text-right text-slate-700">
                R$ {seller.volume.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </td>
              <td className="py-4 px-4 text-right text-slate-900">
                R$ {seller.commissionRate.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}