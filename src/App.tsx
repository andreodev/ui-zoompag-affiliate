import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Users, DollarSign, TrendingUp, Activity, Receipt, Wallet } from 'lucide-react';
import { StatCard } from './components/StatCard';
import { SellerList } from './components/SellerList';
import { CommissionHistory } from './components/CommissionHistory';
import { AffiliateLink } from './components/AffiliateLink';
import { WithdrawalSection } from './components/WithdrawalSection';
import { Button } from './components/ui/button';
import logo from 'figma:asset/6f0df4eda380743cea7aa32a68c9df53d72532fc.png';

// Mock data - Daily
const dailyData = [
  { date: '01/06', sellers: 2, commission: 120, transactions: 800 },
  { date: '02/06', sellers: 1, commission: 90, transactions: 600 },
  { date: '03/06', sellers: 0, commission: 150, transactions: 1000 },
  { date: '04/06', sellers: 1, commission: 80, transactions: 533 },
  { date: '05/06', sellers: 3, commission: 200, transactions: 1333 },
  { date: '06/06', sellers: 1, commission: 110, transactions: 733 },
  { date: '07/06', sellers: 0, commission: 95, transactions: 633 },
];

// Mock data - Weekly
const weeklyData = [
  { week: 'Sem 1', sellers: 5, commission: 450, transactions: 3000 },
  { week: 'Sem 2', sellers: 8, commission: 680, transactions: 4533 },
  { week: 'Sem 3', sellers: 6, commission: 520, transactions: 3467 },
  { week: 'Sem 4', sellers: 10, commission: 850, transactions: 5667 },
];

// Mock data - Monthly
const monthlyData = [
  { month: 'Jan', sellers: 4, commission: 1200, transactions: 8000 },
  { month: 'Fev', sellers: 6, commission: 1800, transactions: 12000 },
  { month: 'Mar', sellers: 8, commission: 2400, transactions: 16000 },
  { month: 'Abr', sellers: 5, commission: 1500, transactions: 10000 },
  { month: 'Mai', sellers: 10, commission: 3000, transactions: 20000 },
  { month: 'Jun', sellers: 12, commission: 3600, transactions: 24000 },
];

const sellers = [
  { id: 1, name: 'Tech Store Brasil', email: 'contato@techstore.com', status: 'active', signupDate: '2024-06-15', commission: 450, volume: 15000, commissionRate: 0.15 },
  { id: 2, name: 'Fashion Hub', email: 'info@fashionhub.com', status: 'active', signupDate: '2024-06-10', commission: 380, volume: 12500, commissionRate: 0.20 },
  { id: 3, name: 'Eletrônicos Plus', email: 'vendas@eletroplus.com', status: 'pending', signupDate: '2024-06-20', commission: 0, volume: 0, commissionRate: 0.15 },
  { id: 4, name: 'Beauty Shop', email: 'contato@beautyshop.com', status: 'active', signupDate: '2024-06-05', commission: 520, volume: 18000, commissionRate: 0.18 },
  { id: 5, name: 'Sports Pro', email: 'info@sportspro.com', status: 'active', signupDate: '2024-06-01', commission: 620, volume: 21000, commissionRate: 0.22 },
  { id: 6, name: 'Home Decor', email: 'vendas@homedecor.com', status: 'inactive', signupDate: '2024-05-28', commission: 150, volume: 5000, commissionRate: 0.15 },
];

const commissions = [
  { id: 1, date: '2024-06-25', seller: 'Tech Store Brasil', amount: 150, status: 'paid', commissionRate: 0.15 },
  { id: 2, date: '2024-06-25', seller: 'Fashion Hub', amount: 120, status: 'paid', commissionRate: 0.20 },
  { id: 3, date: '2024-06-25', seller: 'Beauty Shop', amount: 180, status: 'paid', commissionRate: 0.18 },
  { id: 4, date: '2024-06-25', seller: 'Sports Pro', amount: 210, status: 'paid', commissionRate: 0.22 },
  { id: 5, date: '2024-06-20', seller: 'Fashion Hub', amount: 50, status: 'pending', commissionRate: 0.20 },
  { id: 6, date: '2024-06-15', seller: 'Tech Store Brasil', amount: 100, status: 'paid', commissionRate: 0.15 },
];

const withdrawals = [
  { id: 1, date: '2024-06-20', amount: 500.00, status: 'paid', requestDate: '2024-06-18', processedDate: '2024-06-20' },
  { id: 2, date: '2024-06-10', amount: 350.00, status: 'paid', requestDate: '2024-06-08', processedDate: '2024-06-10' },
  { id: 3, date: '2024-06-25', amount: 200.00, status: 'pending', requestDate: '2024-06-25' },
  { id: 4, date: '2024-05-30', amount: 450.00, status: 'paid', requestDate: '2024-05-28', processedDate: '2024-05-30' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [chartPeriod, setChartPeriod] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  const activeSellers = sellers.filter(s => s.status === 'active').length;
  const totalCommission = commissions.reduce((sum, c) => sum + c.amount, 0);
  const pendingCommission = commissions.filter(c => c.status === 'pending').reduce((sum, c) => sum + c.amount, 0);
  const totalVolume = sellers.reduce((sum, s) => sum + s.volume, 0);
  
  // Withdrawal calculations
  const paidCommission = commissions.filter(c => c.status === 'paid').reduce((sum, c) => sum + c.amount, 0);
  const totalWithdrawn = withdrawals.filter(w => w.status === 'paid').reduce((sum, w) => sum + w.amount, 0);
  const pendingWithdrawals = withdrawals.filter(w => w.status === 'pending').reduce((sum, w) => sum + w.amount, 0);
  const availableBalance = paidCommission - totalWithdrawn - pendingWithdrawals;

  const getChartData = () => {
    switch (chartPeriod) {
      case 'daily':
        return { data: dailyData, key: 'date' };
      case 'weekly':
        return { data: weeklyData, key: 'week' };
      case 'monthly':
        return { data: monthlyData, key: 'month' };
    }
  };

  const chartData = getChartData();

  const getPeriodLabel = () => {
    switch (chartPeriod) {
      case 'daily':
        return 'Dia';
      case 'weekly':
        return 'Semana';
      case 'monthly':
        return 'Mês';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="w-full max-w-[1100px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <img src={logo} alt="Logo" className="h-10" />
              <nav className="hidden md:flex items-center gap-6">
                <a href="#" className="text-slate-600 hover:text-slate-900 transition-colors">Dashboard</a>
                <a href="#" className="text-slate-600 hover:text-slate-900 transition-colors">Sellers</a>
                <a href="#" className="text-slate-600 hover:text-slate-900 transition-colors">Financeiro</a>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-slate-900">João Silva</p>
                <p className="text-slate-600">Afiliado Premium</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#14B8A6] to-[#3B82F6] flex items-center justify-center text-white">
                JS
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-[1100px] mx-auto px-6 py-8">
        <div className="mb-6">
          <h1 className="text-slate-900">Programa de Afiliados</h1>
          <p className="text-slate-600">Acompanhe suas indicações e ganhos</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white border border-slate-200">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="sellers">Sellers</TabsTrigger>
            <TabsTrigger value="commissions">Comissões</TabsTrigger>
            <TabsTrigger value="financial">Financeiro</TabsTrigger>
            <TabsTrigger value="link">Meu Link</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                title="Sellers Ativos"
                value={activeSellers}
                icon={Users}
                trend="+12%"
                trendUp={true}
              />
              <StatCard
                title="Comissão Total"
                value={`R$ ${totalCommission.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                icon={DollarSign}
                trend="+8%"
                trendUp={true}
              />
              <StatCard
                title="Comissão Pendente"
                value={`R$ ${pendingCommission.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                icon={Activity}
                trend="0%"
                trendUp={false}
              />
              <StatCard
                title="Volume Total"
                value={`R$ ${totalVolume.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                icon={TrendingUp}
                trend="+15%"
                trendUp={true}
              />
            </div>

            {/* Period Selector */}
            <div className="flex justify-end gap-2">
              <Button
                variant={chartPeriod === 'daily' ? 'default' : 'outline'}
                onClick={() => setChartPeriod('daily')}
                className={chartPeriod === 'daily' ? 'bg-gradient-to-r from-[#14B8A6] to-[#3B82F6]' : 'border-slate-300'}
              >
                Diário
              </Button>
              <Button
                variant={chartPeriod === 'weekly' ? 'default' : 'outline'}
                onClick={() => setChartPeriod('weekly')}
                className={chartPeriod === 'weekly' ? 'bg-gradient-to-r from-[#14B8A6] to-[#3B82F6]' : 'border-slate-300'}
              >
                Semanal
              </Button>
              <Button
                variant={chartPeriod === 'monthly' ? 'default' : 'outline'}
                onClick={() => setChartPeriod('monthly')}
                className={chartPeriod === 'monthly' ? 'bg-gradient-to-r from-[#14B8A6] to-[#3B82F6]' : 'border-slate-300'}
              >
                Mensal
              </Button>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card className="border-slate-200">
                <CardHeader>
                  <CardTitle>Sellers por {getPeriodLabel()}</CardTitle>
                  <CardDescription>Novos sellers indicados</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData.data}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey={chartData.key} stroke="#64748b" />
                      <YAxis stroke="#64748b" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#fff',
                          border: '1px solid #e2e8f0',
                          borderRadius: '8px',
                        }}
                      />
                      <Bar dataKey="sellers" fill="#14B8A6" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="border-slate-200">
                <CardHeader>
                  <CardTitle>Comissões por {getPeriodLabel()}</CardTitle>
                  <CardDescription>Evolução das comissões (R$)</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData.data}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey={chartData.key} stroke="#64748b" />
                      <YAxis stroke="#64748b" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#fff',
                          border: '1px solid #e2e8f0',
                          borderRadius: '8px',
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="commission"
                        stroke="#3B82F6"
                        strokeWidth={3}
                        dot={{ fill: '#3B82F6', r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Recent Sellers */}
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle>Últimos Sellers</CardTitle>
                <CardDescription>Sellers indicados recentemente</CardDescription>
              </CardHeader>
              <CardContent>
                <SellerList sellers={sellers.slice(0, 5)} />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sellers Tab */}
          <TabsContent value="sellers">
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle>Todos os Sellers</CardTitle>
                <CardDescription>Lista completa de sellers indicados</CardDescription>
              </CardHeader>
              <CardContent>
                <SellerList sellers={sellers} />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Commissions Tab */}
          <TabsContent value="commissions">
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle>Histórico de Comissões</CardTitle>
                <CardDescription>Todas as suas comissões e pagamentos</CardDescription>
              </CardHeader>
              <CardContent>
                <CommissionHistory commissions={commissions} />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Financial Tab */}
          <TabsContent value="financial">
            <WithdrawalSection
              availableBalance={availableBalance}
              processingBalance={pendingWithdrawals}
              withdrawals={withdrawals}
            />
          </TabsContent>

          {/* Affiliate Link Tab */}
          <TabsContent value="link">
            <AffiliateLink affiliateCode="JS2024ABC" />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}