import type { Metadata } from "next";
import { SITE, formatWhatsappDisplay, resolveWhatsapp } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: `Política de privacidade e tratamento de dados da ${SITE.name}.`,
  alternates: { canonical: "/privacidade" },
  openGraph: { url: "/privacidade", title: `Política de Privacidade | ${SITE.name}` },
};

export default function PrivacidadePage() {
  const whatsapp = resolveWhatsapp(SITE.whatsapp);
  return (
    <div className="pt-28 pb-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold text-navy-900 mb-8">Política de Privacidade</h1>
        <div className="prose prose-stone max-w-none space-y-6 text-stone-600">
          <p>Esta política descreve como a {SITE.name} trata dados pessoais eventualmente fornecidos por você ao entrar em contato pelo WhatsApp.</p>
          <h2 className="text-xl font-semibold text-navy-900">Dados fornecidos</h2>
          <p>Ao iniciar uma conversa pelo WhatsApp, você pode fornecer voluntariamente nome, telefone e outras informações necessárias para o atendimento. Este site não possui formulário próprio de contato.</p>
          <h2 className="text-xl font-semibold text-navy-900">Finalidade</h2>
          <p>As informações são utilizadas para responder solicitações de orçamento, esclarecer dúvidas e tratar assuntos relacionados aos serviços de reforma.</p>
          <h2 className="text-xl font-semibold text-navy-900">Compartilhamento</h2>
          <p>Não vendemos dados pessoais para fins comerciais. O contato iniciado pelo WhatsApp está sujeito também às políticas da plataforma utilizada para a conversa.</p>
          <h2 className="text-xl font-semibold text-navy-900">Direitos do titular</h2>
          <p>Você pode solicitar acesso, correção ou exclusão de informações mantidas pela Nascimento Reformas entrando em contato pelo WhatsApp {formatWhatsappDisplay(whatsapp)}.</p>
          <h2 className="text-xl font-semibold text-navy-900">Contato</h2>
          <p>Para questões sobre privacidade: WhatsApp {formatWhatsappDisplay(whatsapp)}.</p>
          <p className="text-sm text-stone-500 pt-8">Última atualização: setembro de 2026.</p>
        </div>
      </div>
    </div>
  );
}
