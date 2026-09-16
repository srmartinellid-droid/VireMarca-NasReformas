import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: `Política de privacidade e tratamento de dados da ${SITE.name}.`,
};

export default function PrivacidadePage() {
  return (
    <div className="pt-28 pb-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold text-navy-900 mb-8">
          Política de Privacidade
        </h1>
        <div className="prose prose-stone max-w-none space-y-6 text-stone-600">
          <p>
            Esta política descreve como a {SITE.name} trata dados pessoais
            eventualmente coletados através deste site.
          </p>
          <h2 className="text-xl font-semibold text-navy-900">Dados coletados</h2>
          <p>
            Podemos receber nome, telefone, e-mail e mensagens enviadas
            voluntariamente por formulários ou pelo WhatsApp. Esses dados são
            utilizados exclusivamente para responder às solicitações e prestar o
            serviço solicitado.
          </p>
          <h2 className="text-xl font-semibold text-navy-900">Finalidade</h2>
          <p>
            Atendimento a pedidos de orçamento, esclarecimento de dúvidas e
            comunicação relacionada aos serviços de reforma.
          </p>
          <h2 className="text-xl font-semibold text-navy-900">Compartilhamento</h2>
          <p>
            Não vendemos nem compartilhamos dados pessoais com terceiros para fins
            comerciais. Dados podem ser processados por ferramentas de
            infraestrutura (hospedagem, analytics) sob contratos de
            confidencialidade.
          </p>
          <h2 className="text-xl font-semibold text-navy-900">Direitos do titular</h2>
          <p>
            Você pode solicitar acesso, correção ou exclusão de seus dados
            entrando em contato pelo WhatsApp {SITE.whatsappDisplay}.
          </p>
          <h2 className="text-xl font-semibold text-navy-900">Contato</h2>
          <p>
            Para questões sobre privacidade: WhatsApp {SITE.whatsappDisplay}.
          </p>
          <p className="text-sm text-stone-500 pt-8">
            Última atualização: setembro de 2026.
          </p>
        </div>
      </div>
    </div>
  );
}
