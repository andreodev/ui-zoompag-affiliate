import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Copy, Check, Share2, Mail, MessageSquare } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface AffiliateLinkProps {
  affiliateCode: string;
}

export function AffiliateLink({ affiliateCode }: AffiliateLinkProps) {
  const [copied, setCopied] = useState(false);
  const affiliateUrl = `https://gateway.exemplo.com/signup?ref=${affiliateCode}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(affiliateUrl);
    setCopied(true);
    toast.success('Link copiado para a área de transferência!');
    setTimeout(() => setCopied(false), 2000);
  };

  const shareViaEmail = () => {
    const subject = 'Convite para o melhor Gateway de Pagamentos';
    const body = `Olá!\n\nQuero te convidar para conhecer o melhor gateway de pagamentos do mercado.\n\nCadastre-se usando meu link:\n${affiliateUrl}\n\nAté logo!`;
    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  const shareViaWhatsApp = () => {
    const message = `Olá! Quero te convidar para conhecer o melhor gateway de pagamentos do mercado. Cadastre-se usando meu link: ${affiliateUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`);
  };

  return (
    <div className="space-y-6">
      {/* Main Link Card */}
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle>Seu Link de Afiliado</CardTitle>
          <CardDescription>
            Compartilhe este link com sellers e ganhe comissões quando eles se cadastrarem
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input value={affiliateUrl} readOnly className="flex-1 bg-slate-50" />
            <Button onClick={copyToClipboard} className="shrink-0 bg-gradient-to-r from-[#14B8A6] to-[#3B82F6] hover:from-[#14B8A6]/90 hover:to-[#3B82F6]/90">
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Copiado!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copiar
                </>
              )}
            </Button>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button variant="outline" onClick={shareViaEmail} className="border-slate-300">
              <Mail className="w-4 h-4 mr-2" />
              Compartilhar por Email
            </Button>
            <Button variant="outline" onClick={shareViaWhatsApp} className="border-slate-300">
              <MessageSquare className="w-4 h-4 mr-2" />
              Compartilhar no WhatsApp
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Commission Structure */}
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle>Estrutura de Comissões</CardTitle>
          <CardDescription>Como você ganha com suas indicações</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-gradient-to-br from-[#14B8A6]/5 to-[#14B8A6]/10 rounded-lg border border-[#14B8A6]/20">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#14B8A6] to-[#0D9488] flex items-center justify-center text-white shrink-0">
                1
              </div>
              <div>
                <h3 className="text-slate-900">Bônus de Cadastro</h3>
                <p className="text-slate-600">
                  Ganhe <span className="text-[#14B8A6]">R$ 100</span> quando o seller se cadastrar usando seu link
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gradient-to-br from-[#3B82F6]/5 to-[#3B82F6]/10 rounded-lg border border-[#3B82F6]/20">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#2563EB] flex items-center justify-center text-white shrink-0">
                2
              </div>
              <div>
                <h3 className="text-slate-900">Comissão por Transação</h3>
                <p className="text-slate-600">
                  Receba <span className="text-[#3B82F6]">R$ 0,15 por transação</span> aprovada do seller
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gradient-to-br from-purple-500/5 to-purple-500/10 rounded-lg border border-purple-500/20">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white shrink-0">
                3
              </div>
              <div>
                <h3 className="text-slate-900">Bônus por Performance</h3>
                <p className="text-slate-600">
                  Ganhe até <span className="text-purple-600">R$ 500 extras</span> ao atingir metas mensais
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tips */}
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle>Dicas para Aumentar suas Conversões</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            <li className="flex gap-3">
              <div className="w-2 h-2 rounded-full bg-[#14B8A6] mt-2 shrink-0" />
              <p className="text-slate-700">
                Compartilhe os benefícios do gateway: taxas competitivas, pagamento em 1 dia útil, suporte 24/7
              </p>
            </li>
            <li className="flex gap-3">
              <div className="w-2 h-2 rounded-full bg-[#14B8A6] mt-2 shrink-0" />
              <p className="text-slate-700">
                Foque em sellers que estão iniciando ou insatisfeitos com seu gateway atual
              </p>
            </li>
            <li className="flex gap-3">
              <div className="w-2 h-2 rounded-full bg-[#14B8A6] mt-2 shrink-0" />
              <p className="text-slate-700">
                Use grupos de empreendedores, redes sociais e eventos para divulgar seu link
              </p>
            </li>
            <li className="flex gap-3">
              <div className="w-2 h-2 rounded-full bg-[#14B8A6] mt-2 shrink-0" />
              <p className="text-slate-700">
                Ofereça ajuda no processo de cadastro e integração para aumentar a conversão
              </p>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}