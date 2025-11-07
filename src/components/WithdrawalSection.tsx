import { useState } from 'react';
import { DollarSign, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface Withdrawal {
  id: number;
  date: string;
  amount: number;
  status: 'pending' | 'approved' | 'paid' | 'rejected';
  requestDate: string;
  processedDate?: string;
}

interface WithdrawalSectionProps {
  availableBalance: number;
  processingBalance: number;
  withdrawals: Withdrawal[];
}

export function WithdrawalSection({ availableBalance, processingBalance, withdrawals }: WithdrawalSectionProps) {
  const [withdrawalAmount, setWithdrawalAmount] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-[#14B8A6]/10 text-[#14B8A6] border-[#14B8A6]/20';
      case 'approved':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'pending':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'rejected':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'paid':
        return 'Pago';
      case 'approved':
        return 'Aprovado';
      case 'pending':
        return 'Pendente';
      case 'rejected':
        return 'Rejeitado';
      default:
        return status;
    }
  };

  const handleWithdrawal = () => {
    // Lógica de saque seria implementada aqui
    console.log('Solicitando saque de:', withdrawalAmount);
    setWithdrawalAmount('');
  };

  return (
    <div className="space-y-6">
      {/* Saldo Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-[#14B8A6] to-[#3B82F6] rounded-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <p className="opacity-90">Saldo Disponível</p>
            <DollarSign className="w-5 h-5 opacity-90" />
          </div>
          <p className="text-3xl">
            R$ {availableBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <p className="text-sm opacity-75 mt-2">Disponível para saque</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-slate-600">Em Processamento</p>
            <Clock className="w-5 h-5 text-slate-400" />
          </div>
          <p className="text-3xl text-slate-900">
            R$ {processingBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <p className="text-sm text-slate-500 mt-2">Aguardando aprovação</p>
        </div>
      </div>

      {/* Solicitar Saque */}
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <h3 className="text-slate-900 mb-4">Solicitar Saque</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="amount">Valor do Saque</Label>
            <Input
              id="amount"
              type="number"
              placeholder="0,00"
              value={withdrawalAmount}
              onChange={(e) => setWithdrawalAmount(e.target.value)}
              className="text-lg"
            />
            <p className="text-sm text-slate-500">
              Saldo disponível: R$ {availableBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
          <div className="flex items-end">
            <Button
              onClick={handleWithdrawal}
              disabled={!withdrawalAmount || parseFloat(withdrawalAmount) <= 0 || parseFloat(withdrawalAmount) > availableBalance}
              className="w-full bg-gradient-to-r from-[#14B8A6] to-[#3B82F6] hover:opacity-90 text-white"
            >
              Solicitar Saque
            </Button>
          </div>
        </div>

        {/* Info Bancária */}
        <div className="mt-6 p-4 bg-slate-50 rounded-lg">
          <p className="text-sm text-slate-600 mb-2">Dados Bancários Cadastrados:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <p className="text-slate-700">
              <span className="text-slate-500">Banco:</span> Banco do Brasil (001)
            </p>
            <p className="text-slate-700">
              <span className="text-slate-500">Agência:</span> 1234-5
            </p>
            <p className="text-slate-700">
              <span className="text-slate-500">Conta:</span> 12345-6
            </p>
            <p className="text-slate-700">
              <span className="text-slate-500">Tipo:</span> Conta Corrente
            </p>
          </div>
        </div>

        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-700">
            ℹ️ Os saques são processados em até 1 hora após a solicitação. O valor mínimo para saque é de R$ 50,00.
          </p>
        </div>
      </div>

      {/* Histórico de Saques */}
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <h3 className="text-slate-900 mb-4">Histórico de Saques</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 text-slate-600">Data da Solicitação</th>
                <th className="text-left py-3 px-4 text-slate-600">Valor</th>
                <th className="text-left py-3 px-4 text-slate-600">Status</th>
                <th className="text-left py-3 px-4 text-slate-600">Data de Pagamento</th>
              </tr>
            </thead>
            <tbody>
              {withdrawals.map((withdrawal) => (
                <tr key={withdrawal.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-4 text-slate-700">
                    {new Date(withdrawal.requestDate).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="py-4 px-4 text-slate-900">
                    R$ {withdrawal.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="py-4 px-4">
                    <Badge className={getStatusColor(withdrawal.status)}>
                      {getStatusLabel(withdrawal.status)}
                    </Badge>
                  </td>
                  <td className="py-4 px-4 text-slate-700">
                    {withdrawal.processedDate
                      ? new Date(withdrawal.processedDate).toLocaleDateString('pt-BR')
                      : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}