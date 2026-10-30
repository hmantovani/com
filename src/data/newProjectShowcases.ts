import type { ProjectShowcase } from './projectShowcases';

export const newShowcases: Record<'en' | 'pt', Record<string, ProjectShowcase>> = {
  en: {
    'api-to-reporting-pipeline': {
      lead: 'From a public API to a report you can trace and rerun.',
      note: 'The report is a fixed World Bank World Development Indicators snapshot, not a live dashboard. Inflation values may be revised and release dates vary by country. No scheduler or external monitoring service is installed.',
      metrics: [{ value: '3', label: 'countries compared' }, { value: '48', label: 'source rows in the snapshot, including missing values' }, { value: '0', label: 'duplicate revisions on a repeated run' }],
      stepsHeading: 'From source to report', benefitsHeading: 'What the pipeline demonstrates', screenshotsHeading: 'Sample report',
      steps: [
        { title: 'Fetch the source', detail: 'Retrieve paginated annual CPI observations from the World Bank API, with conservative pacing and retry/backoff for transient errors.' },
        { title: 'Validate before writing', detail: 'Check schema, countries, years, pagination, counts and duplicate keys. A failed fetch preserves the last successful observations.' },
        { title: 'Keep history', detail: 'Atomically update the SQLite snapshot and record changes to values, including transitions to or from missing values.' },
        { title: 'Generate the report', detail: 'Display the annual series, last successful ingestion and source update date. Refresh requires running the pipeline again.' },
      ],
      benefits: [
        { title: 'Repeatable', detail: 'Running the same snapshot again does not duplicate observations or revisions.' },
        { title: 'Observable', detail: 'Run history and freshness warnings make the state of the data visible.' },
        { title: 'Honest about limits', detail: 'Missing values stay missing; annual CPI is neither a forecast nor a company cost index.' },
      ],
      screenshots: [{ src: '/projects/api-to-reporting-pipeline/report.png', alt: 'Annual inflation report for Brazil, Germany and the United States', caption: 'A static report generated from a World Bank data snapshot. The values and freshness status reflect the time it was generated.' }],
      sourceLabel: 'View code and methodology ↗',
    },
    'customer-retention-analysis': {
      lead: 'Explore what happened after customers placed their first observed order.',
      note: 'Real historical transactions from Chen (2015), UCI Online Retail, CC BY 4.0. The fixed 2010–2011 snapshot is not automatically updated. First observed purchase is not necessarily acquisition; anonymous transactions are excluded and refunds have limitations. Findings are descriptive, not causal.',
      metrics: [{ value: '4,297', label: 'identified purchasers' }, { value: '47.4%', label: 'repeat within 90 days among eligible customers' }, { value: '59.6%', label: 'net transaction value from the top 10%' }],
      stepsHeading: 'Explore the analysis', benefitsHeading: 'What the analysis offers', screenshotsHeading: 'Inside the interactive explorer',
      steps: [
        { title: 'Choose a cohort', detail: 'Select the month of first observed purchase and follow purchasing activity in subsequent complete months. Unavailable months are not zero.' },
        { title: 'Compare monthly activity', detail: 'Switch between active purchasers, qualifying orders and gross purchase value for complete calendar months.' },
        { title: 'Understand repeat purchasing', detail: 'Review 90-day repeat among customers with enough follow-up and the distribution of observed order counts.' },
        { title: 'Read the business brief', detail: 'Inspect revenue concentration, definitions, refund treatment and questions for further investigation in the linked report.' },
      ],
      benefits: [
        { title: 'Comparable follow-up', detail: 'The 90-day measure excludes customers without a full 90 days of observation.' },
        { title: 'Reproducible', detail: 'Python produces aggregates and a report; SQL checks key metrics independently.' },
        { title: 'Careful interpretation', detail: 'Censoring, anonymous transactions and refunds are disclosed; patterns alone do not explain churn.' },
      ],
      screenshots: [
        { src: '/projects/customer-retention-analysis/1.png', alt: 'Retention explorer overview and key figures', caption: 'Overview of the historical snapshot and its key figures.' },
        { src: '/projects/customer-retention-analysis/2.png', alt: 'Cohort selector and monthly purchase activity', caption: 'Choose a first-observed cohort and follow its monthly activity.' },
        { src: '/projects/customer-retention-analysis/3.png', alt: 'Monthly activity chart with a metric selector', caption: 'Compare monthly active customers, orders or gross purchase value.' },
        { src: '/projects/customer-retention-analysis/4.png', alt: '90-day repeat rate and observed order distribution', caption: 'Compare 90-day repeat with the distribution of observed orders.' },
      ],
      demoUrl: 'https://hmantovani.github.io/customer-retention-analysis/', demoLabel: 'Explore the live demo ↗', sourceLabel: 'View code and methodology ↗',
    },
  },
  pt: {
    'api-to-reporting-pipeline': {
      lead: 'De uma API pública a um relatório rastreável e reproduzível.',
      note: 'O relatório é uma fotografia estática dos Indicadores de Desenvolvimento Mundial do Banco Mundial, não um painel atualizado em tempo real. Valores de inflação podem ser revisados e as datas de publicação variam por país. Não há agendador ou monitoramento externo instalado.',
      metrics: [{ value: '3', label: 'países comparados' }, { value: '48', label: 'linhas da fonte na fotografia, incluindo valores ausentes' }, { value: '0', label: 'revisões duplicadas em execução repetida' }],
      stepsHeading: 'Da fonte ao relatório', benefitsHeading: 'O que o pipeline demonstra', screenshotsHeading: 'Exemplo de relatório',
      steps: [
        { title: 'Coletar a fonte', detail: 'Busca observações anuais de CPI na API paginada do Banco Mundial, com ritmo conservador e novas tentativas para erros transitórios.' },
        { title: 'Validar antes de gravar', detail: 'Confere estrutura, países, anos, paginação, contagens e chaves duplicadas. Se a coleta falhar, preserva as últimas observações válidas.' },
        { title: 'Manter histórico', detail: 'Atualiza a fotografia em SQLite e registra revisões, incluindo mudanças de ou para valores ausentes, em uma transação.' },
        { title: 'Gerar o relatório', detail: 'Mostra a série anual, a última coleta bem-sucedida e a atualização da fonte. Para atualizar o relatório, é preciso executar o pipeline novamente.' },
      ],
      benefits: [
        { title: 'Reproduzível', detail: 'Uma nova execução com a mesma fotografia não duplica observações nem revisões.' },
        { title: 'Observável', detail: 'Histórico de execuções e alertas de atualização mostram o estado dos dados.' },
        { title: 'Limites claros', detail: 'Valores ausentes permanecem ausentes; o CPI anual não é previsão nem índice de custos empresariais.' },
      ],
      screenshots: [{ src: '/projects/api-to-reporting-pipeline/report.png', alt: 'Relatório de inflação anual do Brasil, Alemanha e Estados Unidos', caption: 'Relatório estático gerado a partir de uma fotografia dos dados do Banco Mundial. Valores e estado de atualização refletem o momento da geração.' }],
      sourceLabel: 'Ver código e metodologia ↗',
    },
    'customer-retention-analysis': {
      lead: 'Explore o que aconteceu após o primeiro pedido observado de cada cliente.',
      note: 'Transações históricas reais de Chen (2015), UCI Online Retail, CC BY 4.0. A fotografia fixa de 2010–2011 não é atualizada automaticamente. A primeira compra observada não é necessariamente a aquisição; transações anônimas são excluídas e há limitações nas devoluções. Os resultados são descritivos, não causais.',
      metrics: [{ value: '4.297', label: 'compradores identificados' }, { value: '47,4%', label: 'recompra em 90 dias entre clientes elegíveis' }, { value: '59,6%', label: 'do valor líquido transacionado pelos 10% maiores clientes' }],
      stepsHeading: 'Explore a análise', benefitsHeading: 'O que a análise oferece', screenshotsHeading: 'Por dentro da ferramenta interativa',
      steps: [
        { title: 'Escolha uma coorte', detail: 'Selecione o mês da primeira compra observada e acompanhe a atividade nos meses completos seguintes. Meses indisponíveis não são zero.' },
        { title: 'Compare a atividade mensal', detail: 'Alterne entre compradores ativos, pedidos elegíveis e valor bruto de compras nos meses completos.' },
        { title: 'Entenda a recompra', detail: 'Veja a recompra em 90 dias entre clientes com acompanhamento suficiente e a distribuição de pedidos observados.' },
        { title: 'Leia o relatório', detail: 'Consulte concentração de receita, definições, tratamento de devoluções e perguntas para investigação no relatório completo.' },
      ],
      benefits: [
        { title: 'Acompanhamento comparável', detail: 'A métrica de 90 dias exclui clientes sem 90 dias completos de observação.' },
        { title: 'Reproduzível', detail: 'Python gera agregados e relatório; consultas SQL verificam métricas de forma independente.' },
        { title: 'Interpretação cuidadosa', detail: 'Históricos limitados, transações anônimas e devoluções são explicitados; padrões não explicam causas de churn.' },
      ],
      screenshots: [
        { src: '/projects/customer-retention-analysis/1.png', alt: 'Visão geral da ferramenta de retenção e indicadores principais', caption: 'Visão geral da fotografia histórica e seus indicadores.' },
        { src: '/projects/customer-retention-analysis/2.png', alt: 'Seletor de coorte e atividade de compras por mês', caption: 'Escolha uma coorte e acompanhe sua atividade mensal.' },
        { src: '/projects/customer-retention-analysis/3.png', alt: 'Gráfico de atividade mensal com seletor de métrica', caption: 'Compare clientes ativos, pedidos ou valor bruto de compras por mês.' },
        { src: '/projects/customer-retention-analysis/4.png', alt: 'Taxa de recompra em 90 dias e distribuição de pedidos observados', caption: 'Compare a recompra em 90 dias com a distribuição dos pedidos observados.' },
      ],
      demoUrl: 'https://hmantovani.github.io/customer-retention-analysis/', demoLabel: 'Explorar demo online ↗', sourceLabel: 'Ver código e metodologia ↗',
    },
  },
};
