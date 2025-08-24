import { useState, useEffect, memo, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollReveal } from "@/hooks/useScrollReveal";
import { AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import LazyImage from "@/components/LazyImage";

// Import consultation images
const consultaPlacaImg = "/lovable-uploads/f2f21bf1-9184-44d5-a248-4cb3d3245ef2.png";
import consultaChassiImg from "@/assets/consulta-chassi.webp";
import consultaRenavamImg from "@/assets/consulta-renavam-moderna.webp";
import consultaCrvImg from "@/assets/consulta-crv-moderna.webp";
import consultaProprietarioImg from "@/assets/consulta-proprietario.webp";
import historicoProprietarioImg from "@/assets/historico-proprietario.webp";
import consultaLeilaoImg from "@/assets/consulta-leilao.webp";
import rouboFurtoImg from "@/assets/roubo-furto.webp";
import consultaSinistroImg from "@/assets/consulta-sinistro.webp";
import comunicacaoVendaImg from "@/assets/comunicacao-venda.webp";
import emitirCrlvImg from "@/assets/consulta-crlv-moderna.webp";
import consultaDebitosImg from "@/assets/consulta-debitos.webp";
import consultaMultasImg from "@/assets/consulta-multas.webp";
import consultaGravameImg from "@/assets/consulta-gravame-moderna.webp";
import consultaRenainfImg from "@/assets/consulta-renainf-moderna.webp";
import consultaRenajudImg from "@/assets/consulta-renajud-moderna.webp";

const VehicleConsultationSection = memo(() => {
  const { toast } = useToast();

  const getConsultationInfo = (cardId: string) => {
    const consultationInfo: Record<string, any> = {
      placa: {
        title: "Consulta de Placa",
        info: [
          "Informações Retornadas:",
          "Placa",
          "Renavam", 
          "Chassi",
          "Roubo ou Furto",
          "Número do Motor",
          "Nome do proprietário",
          "Restrições",
          "Outras informações adicionais"
        ]
      },
      chassi: {
        title: "Consulta de Chassi",
        info: [
          "Informações Retornadas:",
          "Placa",
          "Renavam",
          "Ano de fabricação",
          "Outras informações adicionais",
          "Número do Motor",
          "Roubo ou Furto",
          "Restrições"
        ]
      },
      renavam: {
        title: "Consulta de Renavam", 
        info: [
          "Informações Retornadas:",
          "Renavam",
          "Placa",
          "Chassi",
          "Dados do proprietário",
          "Roubo ou Furto",
          "Nº do Motor",
          "Outras informações adicionais"
        ]
      },
      "emitir-crv": {
        title: "Consulta Veicular",
        info: [
          "Informações Retornadas:",
          "Número de segurança do CRV",
          "Placa",
          "Renavam",
          "Ano de fabricação",
          "Ano de modelo",
          "Marca/modelo/versão",
          "Outras informações relevantes",
        ]
      },
      "emitir-crlv": {
        title: "Consulta Veicular",
        info: [
          "Informações Retornadas:",
          "Número de segurança do CRLV",
          "Placa",
          "Renavam",
          "Ano de fabricação",
          "Ano de modelo",
          "Marca/modelo/versão",
          "Outras informações relevantes",
        ]
      },
      "proprietario-atual": {
        title: "Consulta Proprietário Atual",
        info: [
          "Informações Retornadas:",
          "Nome completo do proprietário",
          "CPF/CNPJ",
          "Endereço atualizado",
          "Nome da mãe",
          "Probabilidade de óbito",
          "Telefones",
          "Data de nascimento",
          "Outras informações do proprietário"
        ]
      },
      "historico-proprietario": {
        title: "Histórico de Proprietário",
        info: [
          "Informações Retornadas:",
          "Nome do proprietário atual",
          "Nome dos últimos proprietários",
          "Placa",
          "Renavam",
          "Chassi",
          "Marca/Modelo",
          "Cor",
          "Município",
          "Outras informações adicionais"
        ]
      },
      leilao: {
        title: "Consulta de Leilão",
        info: [
          "Informações Retornadas:",
          "Score",
          "Lote",
          "Comitente",
          "Aceitação de seguro",
          "Percentual sobre a tabela de referência",
          "Necessidade de vistoria especial",
          "Data do leilão",
          "Outras informações adicionais"
        ]
      },
      "roubo-furto": {
        title: "Consulta de Roubo/Furto",
        info: [
          "Informações Retornadas:",
          "Indicativo de Roubo/Furto",
          "Situação de Roubo/Furto",
          "Outras informações adicionais",
        ]
      },
      sinistro: {
        title: "Consulta de Sinistro",
        info: [
          "Informações Retornadas:",
          "Indício de sinistro completo",
        ]
      },
      "comunicacao-venda": {
        title: "Consulta Comunicação de Venda",
        info: [
          "Informações Retornadas:",
          "Data de Venda",
          "Inclusão",
          "Status",
          "Tipo de Comprador",
          "Documento do Comprador",
          "Placa",
          "Procedência",
          "Outras informações adicionais"
        ]
      },
      gravame: {
        title: "Consulta de Gravame",
        info: [
          "Informações Retornadas:",
          "Nome do proprietário atual",
          "Placa",
          "Renavam",
          "Chassi",
          "Situação",
          "Data do gravame",
          "Financeira",
          "Observações do gravame"
        ]
      },
      debitos: {
        title: "Consulta de Débitos",
        info: [
          "Informações Retornadas:",
          "Licenciamento",
          "Valor do licenciamento",
          "IPVA",
          "Valor de IPVA",
          "Multas",
          "Valor das Multas",
          "DPVAT",
          "Valor de DPVAT",
          "Opções de parcelamento"
        ]
      },
      multas: {
        title: "Consulta de Multas",
        info: [
          "Informações Retornadas:",
          "Licenciamento",
          "Valor do licenciamento",
          "IPVA",
          "Valor de IPVA",
          "Multas",
          "Valor das Multas",
          "DPVAT",
          "Valor de DPVAT",
          "Opções de parcelamento"
        ]
      },
      renainf: {
        title: "Consulta de Renainf",
        info: [
          "Informações Retornadas:",
          "Total de multas renainf ativas",
          "Auto da infração",
          "Local da infração",
          "Valor do pagamento",
          "Data do pagamento",
          "Placa",
          "Órgão atuadoro",
          "Marca/Modelo",
          "Outras informações adicionais"
        ]
      },
      renajud: {
        title: "Consulta de Renajud",
        info: [
          "Informações Retornadas:",
          "Consta renajud",
          "Data da inclusão",
          "Placa",
          "Chassi",
          "Ocorrência",
          "Tipo de restrição judicial",
          "Órgão Judicial",
          "Quantidade de ocorrências",
          "Outras informações adicionais"
        ]
      }
    };
    return consultationInfo[cardId] || {
      title: "Consulta não encontrada",
      info: [
        "Tipo de consulta não identificado.",
        "Entre em contato para mais informações."
      ]
    };
  };

  // Images mapping
  const consultationImages: Record<string, string> = {
    placa: consultaPlacaImg,
    chassi: "/lovable-uploads/53153fec-2861-47f0-b7e3-bd0a662e7f4a.png",
    renavam: `/lovable-uploads/5a4cc136-aa41-4b46-9bb8-05b4c93f0fa0.png?t=${Date.now()}`,
    crv: "/lovable-uploads/29750269-c40b-45ed-b098-02431cf4f20f.png",
    "proprietario-atual": consultaProprietarioImg,
    "historico-proprietario": "/lovable-uploads/cfe6442e-6c06-4719-8ef7-b9e95b093416.png",
    leilao: consultaLeilaoImg,
    "roubo-furto": rouboFurtoImg,
    sinistro: consultaSinistroImg,
    "comunicacao-venda": comunicacaoVendaImg,
    "emitir-crv": "/lovable-uploads/a09458a2-7806-474e-84ea-178ca895ae42.png",
    "emitir-crlv": `/lovable-uploads/999b4a9e-e214-4b28-84c9-973c58f23a65.png?t=${Date.now()}`,
    gravame: "/lovable-uploads/5c13d18f-5a0a-4a7f-960e-0ad0a5fd4299.png",
    debitos: consultaDebitosImg,
    multas: consultaMultasImg,
    renainf: `/lovable-uploads/e34ef6b9-9248-415e-b065-5a386fd6a1ca.png?t=${Date.now()}`,
    renajud: "/lovable-uploads/4402c755-a481-4f35-8e91-7c18d8c53434.png",
  };

  const consultationCards = {
    registro: [
      { id: "placa", title: "Consulta de Placa", image: consultationImages["placa"] },
      { id: "chassi", title: "Consulta de Chassi", image: consultationImages["chassi"] },
      { id: "renavam", title: "Consulta de Renavam", image: consultationImages["renavam"] },
      { id: "proprietario-atual", title: "Consulta Proprietário Atual", image: consultationImages["proprietario-atual"] },
      { id: "historico-proprietario", title: "Histórico de Proprietário", image: consultationImages["historico-proprietario"] },
    ],
    situacao: [
      { id: "leilao", title: "Consulta de Leilão", image: consultationImages["leilao"] },
      { id: "roubo-furto", title: "Consulta de Roubo/Furto", image: consultationImages["roubo-furto"] },
      { id: "sinistro", title: "Consulta de Sinistro", image: consultationImages["sinistro"] },
      { id: "comunicacao-venda", title: "Consulta Comunicação de Venda", image: consultationImages["comunicacao-venda"] },
    ],
    eventos: [
      { id: "emitir-crv", title: "Emitir CRV", image: consultationImages["emitir-crv"] },
      { id: "emitir-crlv", title: "Emitir CRLV", image: consultationImages["emitir-crlv"] },
    ],
    sos: [
      { id: "gravame", title: "Consulta de Gravame", image: consultationImages["gravame"] },
      { id: "debitos", title: "Consulta de Débitos", image: consultationImages["debitos"] },
      { id: "multas", title: "Consulta de Multas", image: consultationImages["multas"] },
      { id: "renainf", title: "Consulta de Renainf", image: consultationImages["renainf"] },
      { id: "renajud", title: "Consulta de Renajud", image: consultationImages["renajud"] },
    ],
  };

  // Restante do componente permanece igual
  // ...
});

VehicleConsultationSection.displayName = "VehicleConsultationSection";
export default VehicleConsultationSection;
