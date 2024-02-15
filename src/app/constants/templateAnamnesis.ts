export type ITemplates = {
  title: string;
  text: string;
};

export const templates: ITemplates[] = [
  {
    title: 'Anamnese simplificada (goDiet)',

    text: `<h1>Anamnese simplificada</h1><p><strong>Objetivo da consulta</strong></p><p>R:</p><p><strong>Histórico patológico do paciente</strong></p><p>R:</p><p><strong>Histórico familiar</strong></p><p>R:</p><p><strong>Fármacos usados regularmente</strong></p><p>R:</p><p><strong>Estilo de vida (sono, exercícios, alimentação, suplementação)</strong></p><p>R:</p><p><strong>Funcionalidade do sistema excretor e gastrointestinal</strong></p><p>R:</p><p><strong>Intolerância ou alergias de origem alimentar</strong></p><p>R:</p><p><strong>Observações gerais</strong></p><p>R:</p><p></p>

    `,
  },

  {
    title: 'Histórico da Doença Pregressa e Atual (goDiet)',

    text: '<h1>Histórico da Doença Pregressa e Atual</h1><p><strong>Queixa principal (início, duração e razões para a procura)</strong></p><p>R:</p><p><strong>Histórico da doença atual</strong></p><p>R:</p><p><strong>Histórico de doenças pregressas</strong></p><p>R:</p><p><strong>Está em tratamento? Medicamentos em uso (qual, frequência, tempo e horário)?</strong></p><p>R:</p><p><strong>Já foi internado anteriormente? Qual motivo? Como foi a evolução?</strong></p><p>R:</p><p><strong>Alergias (principalmente alimentares)</strong></p><p>R:</p><p><strong>Vacinação em dia?</strong></p><p>R:</p><p><strong>Resultado de exames recentes</strong></p><p>R:</p>',
  },

  {
    title: 'Histórico Dietético (goDiet)',

    text: `

    <h1>Histórico Dietético</h1><p><strong>Número de refeições por dia (local, horário, companhia e tempo de duração)</strong></p><p>R:</p><p><strong>Percepção de saciedade das refeições</strong></p><p>R:</p><p><strong>Quem prepara as refeições? Qual a forma de preparo?</strong></p><p>R:</p><p><strong>Quem faz as compras?</strong></p><p>R:</p><p><strong>Frequenta feira, sacolão, supermercado? (Frequência)</strong></p><p>R:</p><p><strong>Apetite</strong></p><p>R:</p><p><strong>Preferências alimentares</strong></p><p>R:</p><p><strong>Alimentos rejeitados</strong></p><p>R:</p><p><strong>Intolerância ou alergias alimentares</strong></p><p>R:</p><p><strong>Mitos ou tabus alimentares</strong></p><p>R:</p><p><strong>Em quais situações ocorre mudança do hábito?</strong></p><p>R:</p><p><strong>O que muda nos finais de semana, feriado e férias?</strong></p><p>R:</p><p><strong>Ingestão de líquidos (qual, quantidade, frequência, horário)</strong></p><p>R:</p><p><strong>Preferência por doce ou salgado?</strong></p><p>R:</p><p><strong>Faz uso de alimentos light ou diet?</strong></p><p>R:</p><p><strong>Faz uso de suplementos? Qual e quem indicou?</strong></p><p>R:</p><p><strong>Já fez dieta? Quem orientou? Quais os resultados?</strong></p><p>R:</p>

    `,
  },

  {
    title: 'Histórico nutricional (goDiet)',

    text: `

    <h1>Histórico Nutricional</h1><p><strong>Peso atual</strong></p><p>R:</p><p><strong>Peso habitual</strong></p><p>R:</p><p><strong>Perda de peso recente? Em quanto tempo? Quanto de peso perdido? Motivo?</strong></p><p>R:</p><p><strong>Ganho de peso recente? Em quanto tempo? Quando de peso ganho? Motivo?</strong></p><p>R:</p><p><strong>Percepção corporal</strong></p><p>R:</p>`,
  },

  {
    title: 'Histórico Socioeconômico-Cultural (goDiet)',

    text: `

    <h1>Histórico Socioeconômico-Cultural</h1><p><strong>Motivo da consulta</strong></p><p>R:</p><p><strong>Profissão/Ocupação</strong></p><p>R:</p><p><strong>Local onde trabalha, horas de trabalho, meios de locomoção</strong></p><p>R:</p><p><strong>Nível de instrução (Fundamental, médio, superior...)</strong></p><p>R:</p><p><strong>Estado civil</strong></p><p>R:</p><p><strong>Pessoas com quem reside</strong></p><p>R:</p><p><strong>Horas e qualidade do sono (acorda durante o sono?)</strong></p><p>R:</p><p><strong>Atividade física (frequência, intensidade e tempo de duração)</strong></p><p>R:</p><p><strong>Atividade de lazer (frequência, tempo de duração)</strong></p><p>R:</p><p><strong>Religião (exige mudanças ou restrições alimentares?)</strong></p><p>R:</p><p><strong>Uso de medicamentos (nome, frequência, horário)</strong></p><p>R:</p><p><strong>Ingestão de álcool (tempo, tipo, quantidade, frequência)</strong></p><p>R:</p><p><strong>Tabagismo (tempo, tipo, quantidade, frequência)</strong></p><p>R:</p><p><strong>Uso de drogas ilícitas (tempo, tipo, quantidade, frequência)</strong></p><p>R:</p>

    `,
  },
];
