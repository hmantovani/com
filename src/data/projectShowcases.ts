import type { Lang } from './content';

export interface ProjectShowcase {
  lead: string;
  note: string;
  metrics: { value: string; label: string }[];
  steps: { title: string; detail: string }[];
  benefits: { title: string; detail: string }[];
  screenshots: { src: string; alt: string; caption: string; focus?: string }[];
  demoUrl?: string;
  demoLabel?: string;
  sourceLabel: string;
  stepsHeading: string;
  benefitsHeading: string;
  screenshotsHeading: string;
}

const showcases: Record<Lang, Record<string, ProjectShowcase>> = {
  en: {
    'finance-sales-cockpit': {
      lead: 'See the operating picture, then find the next action.',
      note: 'Northstar Operations is fictional. Every name, transaction, and amount in this fixed 22 October 2026 snapshot is synthetic. The dashboard demonstrates a method, not measured client impact.',
      metrics: [
        { value: '6', label: 'interactive filters' },
        { value: '4', label: 'priority KPIs' },
        { value: '100%', label: 'synthetic data' },
      ],
      stepsHeading: 'A useful 4-step walkthrough',
      benefitsHeading: 'Why this is useful',
      screenshotsHeading: 'Inside the dashboard',
      steps: [
        { title: 'Start with the operating picture', detail: 'Compare net merchandise sales with cash actually collected. Check gross margin, overdue receivables, stalled orders, and low-stock alerts before opening a spreadsheet.' },
        { title: 'Find the next follow-up', detail: 'Use installment-aware aging and the overdue invoice queue to identify what is late. The order queue shows processing and partially fulfilled orders with remaining units.' },
        { title: 'Narrow the question', detail: 'Filter by period, customer, product, region, or sales representative. The interface explains why product filters do not change invoice-level cash or receivables.' },
        { title: 'Trace the number', detail: 'Inspect sales mix, returns, adjustments, and inventory watch. Open the metric definitions to see how credits, refunds, and fulfillment affect each KPI.' },
      ],
      benefits: [
        { title: 'One shared view', detail: 'Sales, collections, receivables, orders, and stock are shown together with consistent definitions.' },
        { title: 'Actionable queues', detail: 'Late installments and stalled orders are visible as named follow-ups rather than buried totals.' },
        { title: 'Auditable metrics', detail: 'The seeded source model, validation checks, and documented rules make each displayed number explainable.' },
      ],
      screenshots: [
        { src: '/projects/finance-sales-cockpit/dashboard.png', alt: 'Finance and sales dashboard with synthetic KPI cards and trend chart', caption: 'Overview: synthetic sales, cash, receivables, stalled orders, and six filters.' },
        { src: '/projects/finance-sales-cockpit/dashboard-detail.png', alt: 'Full dashboard showing receivables, order queue, returns, and inventory watch', caption: 'Operating detail: aging, overdue invoices, order follow-ups, returns, and low-stock watch.' },
      ],
      demoUrl: 'https://hmantovani.github.io/finance-sales-cockpit/',
      demoLabel: 'Explore the live demo ↗',
      sourceLabel: 'View source and methodology ↗',
    },
    'spreadsheet-automation-kit': {
      lead: 'Turn recurring messy exports into clean data and a clear review queue.',
      note: 'This is a Python command-line tool, not a hosted web app. The screenshots show its generated HTML report from a fixed synthetic sales example. Amounts are in synthetic units, with no client results claimed.',
      metrics: [
        { value: '360', label: 'sample input rows' },
        { value: '348', label: 'accepted rows' },
        { value: '12', label: 'rows for review' },
      ],
      stepsHeading: 'How to use the kit',
      benefitsHeading: 'What the workflow gives you',
      screenshotsHeading: 'Sample report output',
      steps: [
        { title: 'Point it at recurring exports', detail: 'Pass a CSV, an Excel workbook, or a folder of both. The included demo combines English and Portuguese headers with different date and number formats.' },
        { title: 'Apply a documented data contract', detail: 'Configured aliases map source columns to canonical fields. Validation checks required values, dates, amounts, allowed categories, and duplicate IDs without guessing ambiguous inputs.' },
        { title: 'Review exceptions at the source', detail: 'Accepted rows go to clean.csv. Rejected rows go to exceptions.csv with a reason and source file and row, so a person can correct the input and rerun.' },
        { title: 'Share a reconciled result', detail: 'manifest.json confirms input = accepted + rejected. The self-contained report.html shows counts, monthly trends, category breakdowns, and review reasons.' },
      ],
      benefits: [
        { title: 'Repeatable reporting', detail: 'The same input bytes and configuration produce the same output artifacts.' },
        { title: 'No silent data loss', detail: 'Every nonblank source row is accepted or sent to review; the demo balances 360 = 348 + 12.' },
        { title: 'Human control', detail: 'The tool flags ambiguous dates and duplicates for a reviewer instead of inventing corrections.' },
      ],
      screenshots: [
        { src: '/projects/spreadsheet-automation-kit/report.png', alt: 'Generated spreadsheet report with synthetic row reconciliation and monthly chart', caption: 'Generated report: 360 source rows, 348 accepted, 12 for review, and monthly accepted amount.' },
        { src: '/projects/spreadsheet-automation-kit/exceptions.png', alt: 'Full report with review reasons and source rows for exceptions', caption: 'Review reasons and source rows make each rejected record actionable.', focus: 'center bottom' },
      ],
      sourceLabel: 'Get the CLI and sample files ↗',
    },
  },
  pt: {
    'finance-sales-cockpit': {
      lead: 'Veja o panorama da operação e encontre a próxima ação.',
      note: 'A Northstar Operations é fictícia. Todos os nomes, transações e valores desta fotografia fixa de 22 de outubro de 2026 são sintéticos. O painel demonstra um método, não impacto medido em cliente.',
      metrics: [
        { value: '6', label: 'filtros interativos' },
        { value: '4', label: 'KPIs prioritários' },
        { value: '100%', label: 'dados sintéticos' },
      ],
      stepsHeading: 'Um roteiro útil em 4 passos',
      benefitsHeading: 'Por que isso é útil',
      screenshotsHeading: 'Por dentro do painel',
      steps: [
        { title: 'Comece pelo panorama', detail: 'Compare vendas líquidas com o caixa recebido. Confira margem bruta, títulos vencidos, pedidos parados e alertas de estoque antes de abrir uma planilha.' },
        { title: 'Encontre o próximo acompanhamento', detail: 'Use o aging por parcela e a fila de títulos vencidos para identificar cobranças. A fila de pedidos mostra os que estão em processamento ou parcialmente atendidos.' },
        { title: 'Refine a pergunta', detail: 'Filtre por período, cliente, produto, região ou vendedor. A interface explica por que o filtro de produto não altera caixa e recebíveis medidos por nota.' },
        { title: 'Entenda o cálculo', detail: 'Explore composição das vendas, devoluções, ajustes e estoque. Abra as definições das métricas para conferir como créditos, reembolsos e entregas afetam cada KPI.' },
      ],
      benefits: [
        { title: 'Visão compartilhada', detail: 'Vendas, recebimentos, contas a receber, pedidos e estoque aparecem juntos com definições consistentes.' },
        { title: 'Filas acionáveis', detail: 'Parcelas vencidas e pedidos parados viram acompanhamentos identificáveis, em vez de totais escondidos.' },
        { title: 'Métricas auditáveis', detail: 'O modelo de origem, as validações e as regras documentadas tornam cada número explicável.' },
      ],
      screenshots: [
        { src: '/projects/finance-sales-cockpit/dashboard.png', alt: 'Painel financeiro e comercial com KPIs sintéticos e gráfico de tendência', caption: 'Visão geral: vendas, caixa, recebíveis, pedidos parados e seis filtros com dados sintéticos.' },
        { src: '/projects/finance-sales-cockpit/dashboard-detail.png', alt: 'Painel completo com títulos vencidos, pedidos, devoluções e estoque', caption: 'Detalhe operacional: aging, títulos, pedidos, devoluções e controle de estoque.' },
      ],
      demoUrl: 'https://hmantovani.github.io/finance-sales-cockpit/',
      demoLabel: 'Explorar demo online ↗',
      sourceLabel: 'Ver código e metodologia ↗',
    },
    'spreadsheet-automation-kit': {
      lead: 'Transforme exportações recorrentes e inconsistentes em dados limpos e uma fila clara de revisão.',
      note: 'Este é um programa de linha de comando em Python, não um aplicativo web hospedado. As capturas mostram o relatório HTML gerado com uma amostra de vendas sintéticas. Os valores estão em unidades fictícias; não há resultados de clientes alegados.',
      metrics: [
        { value: '360', label: 'linhas de entrada' },
        { value: '348', label: 'linhas aceitas' },
        { value: '12', label: 'linhas para revisão' },
      ],
      stepsHeading: 'Como usar o kit',
      benefitsHeading: 'O que o fluxo entrega',
      screenshotsHeading: 'Exemplo de relatório',
      steps: [
        { title: 'Aponte para as exportações', detail: 'Informe um CSV, uma planilha Excel ou uma pasta com os dois formatos. A demo combina cabeçalhos em inglês e português, além de formatos diferentes de data e valor.' },
        { title: 'Aplique um contrato de dados', detail: 'Apelidos configurados mapeiam colunas para campos canônicos. As validações cobrem obrigatórios, datas, valores, categorias permitidas e IDs duplicados sem adivinhar entradas ambíguas.' },
        { title: 'Revise as exceções na origem', detail: 'Linhas aceitas vão para clean.csv. Rejeitadas vão para exceptions.csv com motivo, arquivo e linha de origem, para correção e nova execução.' },
        { title: 'Compartilhe o resultado reconciliado', detail: 'manifest.json confirma entrada = aceitas + rejeitadas. O report.html independente mostra contagens, tendência mensal, categorias e motivos de revisão.' },
      ],
      benefits: [
        { title: 'Relatórios repetíveis', detail: 'As mesmas entradas e configurações produzem os mesmos arquivos de saída.' },
        { title: 'Sem perda silenciosa', detail: 'Cada linha de origem não vazia é aceita ou enviada para revisão; a demo fecha em 360 = 348 + 12.' },
        { title: 'Controle humano', detail: 'Datas ambíguas e duplicatas são sinalizadas para uma pessoa, sem correções inventadas pelo programa.' },
      ],
      screenshots: [
        { src: '/projects/spreadsheet-automation-kit/report.png', alt: 'Relatório gerado com reconciliação sintética e gráfico mensal', caption: 'Relatório gerado: 360 linhas de origem, 348 aceitas, 12 para revisão e valores mensais aceitos.' },
        { src: '/projects/spreadsheet-automation-kit/exceptions.png', alt: 'Relatório completo com motivos de revisão e linhas de origem das exceções', caption: 'Motivos e linhas de origem tornam cada registro rejeitado revisável.', focus: 'center bottom' },
      ],
      sourceLabel: 'Obter o CLI e arquivos de exemplo ↗',
    },
  },
};

export function getProjectShowcase(slug: string, lang: Lang): ProjectShowcase | undefined {
  return showcases[lang][slug];
}
