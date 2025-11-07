import { Card, CardContent } from './ui/card';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
}

export function StatCard({ title, value, icon: Icon, trend, trendUp }: StatCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow border-slate-200">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-slate-600">{title}</p>
            <p className="text-slate-900">{value}</p>
            {trend && (
              <p className={`text-sm ${trendUp ? 'text-[#14B8A6]' : 'text-slate-500'}`}>
                {trend} vs mês anterior
              </p>
            )}
          </div>
          <div className={`p-3 rounded-lg ${trendUp ? 'bg-gradient-to-br from-[#14B8A6]/10 to-[#3B82F6]/10' : 'bg-slate-100'}`}>
            <Icon className={`w-6 h-6 ${trendUp ? 'text-[#14B8A6]' : 'text-slate-600'}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}