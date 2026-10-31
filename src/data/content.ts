export type Lang = 'en' | 'pt';

export interface ProjectData {
  slug: string;
  title: string;
  category: string;
  tags: string[];
  cardDescription: string;
  overview: string;
  challenge: string;
  solution: string;
  results: string;
  isReal?: boolean;
  githubUrl?: string;
  linkedinUrl?: string;
  image?: string;
  screenshots?: { src: string; caption: string }[];
  status?: string;
}

export interface SiteContent {
  nav: { home: string; services: string; realCases: string; projects: string; about: string; contact: string; menu: string; close: string; theme: { toLight: string; toDark: string } };
  hero: {
    title: string;
    eyebrow: string;
    intro: string[];
    ctaWork: string;
    ctaContact: string;
    available: string;
    previously: string;
    figureLabel: string;
    figureCaption: string;
    figureLink: string;
  };
  services: { eyebrow: string; title: string; items: { t: string; d: string }[]; cta: string };
  sections: {
    realCases: { eyebrow: string; title: string; subtitle: string };
    projects: { eyebrow: string; title: string; subtitle: string; featured: string; view: string };
    about: { eyebrow: string; title: string; text: string; experience: string; education: string };
    contact: { eyebrow: string; title: string; subtitle: string };
  };
  experience: { role: string; org: string; period: string; note: string }[];
  education: { degree: string; org: string; period: string }[];
  contact: {
    emailLabel: string;
    downloadCV: string;
    cvNote: string;
    socialHeading: string;
    or: string;
  };
  realCases: ProjectData[];
  projects: ProjectData[];
  footer: { rights: string };
  projectPage: {
    back: string;
    overview: string;
    challenge: string;
    solution: string;
    results: string;
    stack: string;
    github: string;
    linkedin: string;
    comingSoon: string;
    realCaseBadge: string;
    screenshots: string;
  };
}

export const content: Record<Lang, SiteContent> = {
  en: {
    nav: {
      home: 'Home', services: 'Services', realCases: 'Work', projects: 'Projects', about: 'About', contact: 'Contact',
      menu: 'Menu', close: 'Close', theme: { toLight: 'Switch to light theme', toDark: 'Switch to dark theme' },
    },
    hero: {
      title: 'Data engineering, analytics and modeling',
      eyebrow: 'Data engineering, analytics and modeling',
      intro: [
        'I’m a production engineer (PUC-SP) with a postgraduate degree in data science and AI (PUC-RS). I build ETL pipelines, data models and predictive analyses, and I’ve done it at IBM, Keyence and Thermo Fisher Scientific.',
        'Most of my projects start with a manual process: reports exported by hand, spreadsheets that freeze, numbers nobody can trace. They end with something automated and auditable that people stop worrying about.',
      ],
      ctaWork: 'See the work',
      ctaContact: 'Get in touch',
      available: 'Open to full-time, freelance and remote work',
      previously: 'Previously at',
      figureLabel: 'Fig. 1 — Title odds, eight snapshots',
      figureCaption: 'My World Cup 2026 model, re-run after every stage. Spain started second favourite and won the Final.',
      figureLink: 'Read the forecast',
    },
    services: {
      eyebrow: 'Services',
      title: 'Less manual work. Numbers you can trace.',
      items: [
        { t: 'Automate recurring work', d: 'Replace repetitive exports, spreadsheet updates and manual checks with scheduled, monitored workflows.' },
        { t: 'Connect systems and data', d: 'Bring ERP, APIs and files into one consistent data layer, with history, that your team can reuse.' },
        { t: 'Make reporting useful', d: 'Turn scattered numbers into dashboards and analyses tied to the decisions people actually make.' },
      ],
      cta: 'Tell me what you need',
    },
    sections: {
      realCases: {
        eyebrow: 'Selected work',
        title: 'Built for real operations',
        subtitle: 'Two systems running in production. Company details are kept private.',
      },
      projects: {
        eyebrow: 'Projects',
        title: 'Independent projects',
        subtitle: 'Varied applications across multiple technologies and use cases, from forecasting to reporting and automation. Each one tackles a problem that also shows up in real business operations.',
        featured: 'Featured',
        view: 'View project',
      },
      about: {
        eyebrow: 'Background',
        title: 'An engineer’s habits, a data scientist’s tools',
        text: 'Production engineering taught me to look for the bottleneck before the technology. Data science gave me the methods to measure it. I work mostly in Python (pandas, scikit-learn, Streamlit) with SQL, Parquet, Power BI and Excel, plus SAP and API integrations when the data lives there.',
        experience: 'Experience',
        education: 'Education',
      },
      contact: {
        eyebrow: 'Contact',
        title: 'Have a process that should run itself?',
        subtitle: 'Write to me about the report, pipeline or model you have in mind. I’m open to full-time roles, freelance projects and remote work.',
      },
    },
    experience: [
      { role: 'Data Specialist', org: 'Current role', period: '2025 —', note: 'Leads data work at a consumer-goods company: analysis, reporting and a Python extraction library on the ERP API.' },
      { role: 'Market Data Analyst II', org: 'Keyence Brazil', period: '2023 – 2025', note: 'Python for SAP ETL into Power BI, a data warehouse behind the reports, and Python training for the department.' },
      { role: 'Data Analyst, Early Associate', org: 'IBM', period: '2022', note: 'Intensive programme in EDA, APIs, NLP and image recognition, then document control on a client project.' },
      { role: 'Vertical Markets Intern', org: 'Thermo Fisher Scientific', period: '2020 – 2022', note: 'Key-account dashboards and marketing initiatives, gathering data across departments.' },
    ],
    education: [
      { degree: 'Postgraduate, Data Science and Artificial Intelligence', org: 'PUC-RS', period: '2023 – 2025' },
      { degree: 'Bachelor’s, Production Engineering', org: 'PUC-SP', period: '2018 – 2022' },
    ],
    contact: {
      emailLabel: 'Email',
      downloadCV: 'Curriculum vitae',
      cvNote: 'PDF, English or Portuguese',
      socialHeading: 'Elsewhere',
      or: 'or',
    },
    realCases: [
      {
        slug: 'sap-pipeline-automation',
        title: 'SAP BusinessObjects extraction pipeline automation',
        category: 'Data Engineering & BI',
        tags: ['Python', 'Selenium', 'PyAutoGUI', 'ETL', 'SAP', 'Automation', 'Data Governance'],
        cardDescription:
          'A Python-based framework that automated 40 SAP BusinessObjects report extraction workflows without API dependency, consolidating the outputs into a centralized and auditable data warehouse.',
        overview:
          'Engineered a complete data ecosystem to automate 40 complex SAP extraction loops, transitioning the organization from fragmented, manual Excel-based reporting to an automated, auditable infrastructure that feeds real-time BI and executive dashboards.',
        challenge:
          'Enterprise IT constraints and the absence of native API access required teams to rely on manual SAP report extraction across dozens of workflows, supported by fragmented Excel logic and inconsistent reporting structures. This created operational bottlenecks, reduced auditability, and consumed significant weekly effort to maintain reliable data outputs.',
        solution:
          'Developed a Python automation layer using Selenium and PyAutoGUI on a dedicated VM to simulate human interaction and interact with our SAP system during the day. I architected an "always-ready" data warehouse that maintained both historical daily/monthly archives and a root-level "latest version" for instant Python/PowerBI consumption. Additionally, I implemented a monitoring layer that validated 30–50 variables per loop, triggering real-time bug reports via Microsoft Teams to ensure data integrity.',
        results:
          'Eliminated waiting times for data extraction, reducing 15-minute Excel "freezes" during report updating to near-instant updates. The system also improved data reliability by identifying suspected human input errors in real-time and established a unified, 100% auditable data layer for company-wide reporting.',
        isReal: true,
      },
      {
        slug: 'erp-data-platform',
        title: 'Data platform for a São Paulo distributor, built on Omie ERP',
        category: 'Data Engineering & Automation',
        tags: ['Python', 'Omie API', 'Parquet', 'Streamlit', 'Background Jobs', 'ETL'],
        cardDescription:
          'A full internal data platform on top of Omie ERP — scheduled multi-entity extraction into a Parquet warehouse, and Streamlit apps for pipeline management and self-service reporting, including automated overdue-invoice processing.',
        overview:
          'Built an end-to-end data platform for a São Paulo-based distributor running entirely on Omie, a Brazilian cloud ERP with no data layer of its own — every report meant exporting spreadsheets by hand, screen by screen, with no history and no automation.',
        challenge:
          'Turn a set of manual, error-prone spreadsheet exports into a reliable, auditable data platform — without introducing a database server or ongoing infrastructure the small internal team would have to maintain.',
        solution:
          'Built an internal Python library that extracts every relevant entity from the Omie API (sales orders, receivables, clients, products, sellers, categories) on a scheduled cadence into a two-layer Parquet warehouse: a raw layer mirroring the API, and a treated layer with typed, cleaned data. On top of it, two Streamlit apps: one to trigger and monitor extraction pipelines, with jobs running in a background worker that survives closing the browser tab; another for self-service management reports (cash flow, aging, stalled orders) exportable straight to Excel. One report goes beyond reading — it processes overdue invoices end-to-end: detecting and fixing missing tax codes, updating billing dates, and issuing the invoice back through the API, with a clear pending-items export for anything that needs a human.',
        results:
          'Reports that used to take hours of manual spreadsheet work now run in minutes and are self-service for finance and sales — no dependency on IT to pull a number. Overdue-invoice handling went from a fully manual finance task to a supervised, automated run with a clear audit trail per order.',
        isReal: true,
      },
    ],
    projects: [
      {
        slug: '2026-world-cup',
        image: '/projects/world-cup-2026.png',
        title: 'FIFA World Cup 2026 Prediction Model',
        category: 'Data Science & Sports Modeling',
        tags: ['Python', 'statsmodels', 'Poisson GLM', 'Elo', 'Monte Carlo', 'Next.js'],
        cardDescription:
          'A statistical model that forecast the 2026 World Cup one stage at a time — a Poisson + Elo ensemble trained on 48,000+ international matches and re-simulated after every stage, published as eight snapshots with scoreline-level predictions and an honest audit of how it did.',
        overview:
          'An end-to-end sports-prediction project: a two-model ensemble (Poisson + Elo regression blended with a Poisson GLM of per-team attack/defense strengths) that predicts every match and Monte-Carlo simulates the tournament to produce qualification odds. After each stage the real results were locked in and a fresh forecast was published for everything that remained — eight snapshots, from before kickoff to the Final.',
        challenge:
          'International football spans 150 years of uneven data, neutral-venue tournaments, and wildly varying opponent quality. The model must weight recent form, respect venue neutrality, and turn raw goal expectations into calibrated match and tournament probabilities.',
        solution:
          'Time-decayed training on 48k+ matches, a numerically-stabilized Poisson GLM with team fixed effects, a Dixon-Coles low-score correction, and a 20,000-run Monte-Carlo simulation of the whole tournament, including FIFA’s official third-place seeding table. Team Elo is updated with the real results after each stage, and every played match keeps the odds the model had before kickoff. Results are exported as JSON and rendered into interactive pages.',
        results:
          'Eight published snapshots with per-match result, scoreline and goal probabilities, projected standings, title odds and a full bracket — plus a scorecard that audits every prediction against what happened: 60% of group results called (33% by chance), and the favoured team advanced in 25 of 32 knockout ties.',
        isReal: false,
      },
      {
        slug: 'finance-sales-cockpit',
        title: 'Small-Business Finance & Sales Cockpit',
        category: 'Analytics & BI', status: 'Live demo',
        image: '/projects/finance-sales-cockpit/1-overview.png',
        tags: ['Python', 'SQLite', 'JavaScript', 'Data Modeling', 'Dashboard'],
        cardDescription: 'An interactive operating dashboard for sales, collections, overdue installments, stalled orders, returns, and stock, using clearly labeled synthetic data.',
        overview: 'A working browser demo for a fictional small business. It brings orders, invoices, payments, product costs, returns, and stock into one operating view, with a fixed synthetic snapshot dated 22 October 2026.',
        challenge: 'Small teams often rely on disconnected spreadsheets and manual reporting to answer basic finance and sales questions.',
        solution: 'A seeded Python generator creates related business records; SQLite-backed validation reconciles them; a browser metric engine computes documented KPIs and interactive views. Filters cover date, customer, product, region, and sales representative.',
        results: 'The published demo exposes sales, net cash, gross margin, installment-aware receivables, overdue and stalled-order queues, returns, and inventory watch. All amounts and customers are synthetic; no real client outcome is claimed.',
        githubUrl: 'https://github.com/hmantovani/finance-sales-cockpit',
      },
      {
        slug: 'spreadsheet-automation-kit',
        title: 'Spreadsheet Cleanup & Reporting Automation Kit',
        category: 'Data Automation', status: 'Complete',
        image: '/projects/spreadsheet-automation-kit/1.png',
        tags: ['Python', 'CSV', 'Excel', 'Data Quality', 'HTML Reporting'],
        cardDescription: 'A working Python CLI that standardizes CSV and Excel exports, sends problematic rows to review, and produces reconciled data and a shareable report.',
        overview: 'A reusable command-line tool for recurring CSV and Excel exports. Configured aliases and validation rules produce canonical clean rows, a review queue, a manifest, and a self-contained HTML report.',
        challenge: 'Column names, formats, missing values, and duplicates vary between files, making recurring reports fragile and slow.',
        solution: 'The Python pipeline reads both formats, maps headers to a configurable schema, normalizes dates and amounts, validates records, flags duplicates and other exceptions with source row references, and writes clean.csv, exceptions.csv, manifest.json, and report.html.',
        results: 'In the included synthetic demo, 360 input rows reconcile to 348 accepted and 12 for review, including one duplicate. Outputs are deterministic for unchanged inputs. These counts describe the demo, not a client result.',
        githubUrl: 'https://github.com/hmantovani/spreadsheet-automation-kit',
      },
      {
        slug: 'api-to-reporting-pipeline',
        title: 'API-to-Reporting Data Pipeline',
        category: 'Data Engineering', status: 'Complete',
        image: '/projects/api-to-reporting-pipeline/report.png',
        tags: ['Python', 'REST API', 'SQLite', 'Data Quality', 'HTML'],
        cardDescription: 'A reproducible World Bank API pipeline with validation, revision history and an annual inflation report.',
        overview: 'A small end-to-end pipeline retrieves annual consumer-price inflation for Brazil, Germany and the United States from the World Bank, stores observations and revisions in SQLite, and generates a static report for planning context.',
        challenge: 'Public API data can be paginated, revised, delayed or incomplete. A useful report needs checks for missing records, safe repeat runs and clear information about freshness.',
        solution: 'Python fetches paginated data with retry and backoff, validates the complete response, and commits observations and revisions atomically. A run ledger and a static HTML report expose the latest successful ingestion and source update.',
        results: 'The included snapshot contains 48 source rows across three countries; repeated runs do not duplicate observations. Annual CPI is not a forecast or company cost index. Scheduling and external monitoring must be configured separately.',
        githubUrl: 'https://github.com/hmantovani/api-to-reporting-pipeline',
      },
      {
        slug: 'customer-retention-analysis',
        title: 'Customer Retention & Revenue Analysis',
        category: 'Analytics & SQL', status: 'Live demo',
        image: '/projects/customer-retention-analysis/1.png',
        tags: ['Python', 'SQL', 'Cohort Analysis', 'Data Visualization'],
        cardDescription: 'Explore customer cohorts, repeat purchases and revenue concentration in a historical retail dataset.',
        overview: 'A reproducible analysis and interactive explorer turn historical UCI Online Retail transactions into cohort activity, repeat-purchase and monthly views for sales and finance.',
        challenge: 'Incomplete customer histories, unequal follow-up periods, anonymous transactions and refunds can make retention and revenue measures misleading.',
        solution: 'Python builds customer and order metrics, SQL independently checks key aggregates, and a static interactive demo lets visitors explore cohorts, monthly activity and order frequency with definitions and caveats.',
        results: 'Of 3,324 eligible customers, 1,577 (47.4%) placed a second order within 90 days. The analysis covers a UK retailer from December 2010 through November 2011; observed patterns do not establish causes of churn.',
        githubUrl: 'https://github.com/hmantovani/customer-retention-analysis',
      },
    ],
    footer: { rights: '© 2025 Henrique Mantovani. All rights reserved.' },
    projectPage: {
      back: '← Back to Portfolio',
      overview: 'Overview',
      challenge: 'The Challenge',
      solution: 'The Solution',
      results: 'Results & Impact',
      stack: 'Tech Stack',
      github: 'View on GitHub',
      linkedin: 'LinkedIn Post',
      comingSoon: 'Coming Soon',
      realCaseBadge: 'Real Case',
      screenshots: 'Screenshots',
    },
  },

  pt: {
    nav: {
      home: 'Início', services: 'Serviços', realCases: 'Trabalho', projects: 'Projetos', about: 'Sobre', contact: 'Contato',
      menu: 'Menu', close: 'Fechar', theme: { toLight: 'Mudar para tema claro', toDark: 'Mudar para tema escuro' },
    },
    hero: {
      title: 'Engenharia de dados, analytics e modelagem',
      eyebrow: 'Engenharia de dados, analytics e modelagem',
      intro: [
        'Sou engenheiro de produção (PUC-SP), com pós-graduação em ciência de dados e IA (PUC-RS). Construo pipelines de ETL, modelos de dados e análises preditivas, e fiz isso na IBM, na Keyence e na Thermo Fisher Scientific.',
        'A maioria dos meus projetos começa com um processo manual: relatórios exportados à mão, planilhas que travam, números que ninguém consegue rastrear. E termina com algo automatizado e auditável, com que ninguém mais precisa se preocupar.',
      ],
      ctaWork: 'Ver o trabalho',
      ctaContact: 'Entrar em contato',
      available: 'Aberto a vagas, freelance e trabalho remoto',
      previously: 'Passagens por',
      figureLabel: 'Fig. 1 — Chances de título, oito momentos',
      figureCaption: 'Meu modelo da Copa 2026, refeito após cada fase. A Espanha começou como segunda favorita e venceu a final.',
      figureLink: 'Ver a previsão',
    },
    services: {
      eyebrow: 'Serviços',
      title: 'Menos trabalho manual. Números rastreáveis.',
      items: [
        { t: 'Automatizar tarefas recorrentes', d: 'Substituir exportações repetitivas, atualizações de planilhas e conferências manuais por fluxos agendados e monitorados.' },
        { t: 'Conectar sistemas e dados', d: 'Reunir ERP, APIs e arquivos numa base consistente, com histórico, que a equipe possa reutilizar.' },
        { t: 'Relatórios que servem para algo', d: 'Transformar números dispersos em painéis e análises ligados às decisões que as pessoas de fato tomam.' },
      ],
      cta: 'Conte o que você precisa',
    },
    sections: {
      realCases: {
        eyebrow: 'Trabalhos selecionados',
        title: 'Feito para operações reais',
        subtitle: 'Dois sistemas em produção. Detalhes das empresas são mantidos em sigilo.',
      },
      projects: {
        eyebrow: 'Projetos',
        title: 'Projetos independentes',
        subtitle: 'Aplicações diversas, com múltiplas tecnologias e casos de uso, de previsão a relatórios e automação. Cada projeto resolve um problema que também existe em operações reais de negócio.',
        featured: 'Destaque',
        view: 'Ver projeto',
      },
      about: {
        eyebrow: 'Formação',
        title: 'Hábitos de engenheiro, ferramentas de cientista de dados',
        text: 'A engenharia de produção me ensinou a procurar o gargalo antes da tecnologia. A ciência de dados me deu os métodos para medi-lo. Trabalho principalmente com Python (pandas, scikit-learn, Streamlit), SQL, Parquet, Power BI e Excel, além de SAP e integrações via API quando os dados estão lá.',
        experience: 'Experiência',
        education: 'Educação',
      },
      contact: {
        eyebrow: 'Contato',
        title: 'Tem um processo que deveria rodar sozinho?',
        subtitle: 'Escreva sobre o relatório, pipeline ou modelo que você tem em mente. Estou aberto a vagas, projetos freelance e trabalho remoto.',
      },
    },
    experience: [
      { role: 'Data Specialist', org: 'Função atual', period: '2025 —', note: 'Responsável pelos dados numa empresa de bens de consumo: análises, relatórios e uma biblioteca Python de extração sobre a API do ERP.' },
      { role: 'Market Data Analyst II', org: 'Keyence Brasil', period: '2023 – 2025', note: 'Python no ETL do SAP para o Power BI, um data warehouse por trás dos relatórios e treinamento de Python para o departamento.' },
      { role: 'Data Analyst, Early Associate', org: 'IBM', period: '2022', note: 'Programa intensivo de EDA, APIs, NLP e reconhecimento de imagem, depois controle de documentos num projeto de cliente.' },
      { role: 'Estagiário, Vertical Markets', org: 'Thermo Fisher Scientific', period: '2020 – 2022', note: 'Dashboards de contas-chave e iniciativas de marketing, reunindo dados entre departamentos.' },
    ],
    education: [
      { degree: 'Pós-graduação, Ciência de Dados e Inteligência Artificial', org: 'PUC-RS', period: '2023 – 2025' },
      { degree: 'Bacharelado, Engenharia de Produção', org: 'PUC-SP', period: '2018 – 2022' },
    ],
    contact: {
      emailLabel: 'E-mail',
      downloadCV: 'Currículo',
      cvNote: 'PDF, português ou inglês',
      socialHeading: 'Em outros lugares',
      or: 'ou',
    },
    realCases: [
      {
        slug: 'sap-pipeline-automation',
        title: 'Automação de pipeline de extração do SAP BusinessObjects',
        category: 'Engenharia de Dados & BI',
        tags: ['Python', 'Selenium', 'PyAutoGUI', 'ETL', 'Parquet', 'BI', 'Automação'],
        cardDescription:
          'Pipeline Python automatizando 40 processos de extração de relatórios do SAP BusinessObjects, consolidando os resultados em um Data Warehouse auditável.',
        overview:
          'Desenvolvimento de um pipeline completo para automatizar 40 processos individuais de extração do SAP ERP, eliminando esforço manual e habilitando infraestrutura de dados consistente e auditável para relatórios de business intelligence.',
        challenge:
          'Restrições de TI impediam o acesso via API, forçando as equipes a manter manualmente dezenas de relatórios SAP com lógica fragmentada e cálculos ocultos em Excel. Isso criava um ambiente de alto atrito onde os dados eram extraídos de forma inconsistente, difíceis de verificar e exigiam horas de manutenção manual semanal.',
        solution:
          'Construção de uma camada de automação Python com Selenium e PyAutoGUI para replicar cada extração SAP de forma programática. Todos os dados foram estruturados em um Data Warehouse baseado em Parquet com versionamento histórico, permitindo consultas point-in-time e auditabilidade completa. O pipeline foi agendado para execução recorrente, mantendo a base continuamente atualizada.',
        results:
          'Eliminação de todo o esforço manual de extração na equipe. Um Data Warehouse totalmente atualizável e auditável disponível para ferramentas de BI em tempo real. Redução drástica de inconsistências e latência nos relatórios. Habilitação de dashboards executivos ao vivo que antes eram impossíveis.',
        isReal: true,
      },
      {
        slug: 'erp-data-platform',
        title: 'Plataforma de dados para distribuidora de São Paulo, sobre o ERP Omie',
        category: 'Engenharia de Dados & Automação',
        tags: ['Python', 'API Omie', 'Parquet', 'Streamlit', 'Jobs em Background', 'ETL'],
        cardDescription:
          'Plataforma de dados interna construída sobre o ERP Omie — extração agendada multi-entidade num Data Warehouse em Parquet, e apps Streamlit para gerenciamento de pipelines e relatórios self-service, incluindo processamento automatizado de faturamento atrasado.',
        overview:
          'Construção de uma plataforma de dados completa para uma distribuidora sediada em São Paulo que operava inteiramente sobre a Omie, um ERP brasileiro em nuvem sem camada de dados própria — todo relatório significava exportar planilhas manualmente, tela por tela, sem histórico e sem automação.',
        challenge:
          'Transformar um processo de exportação manual e sujeito a erro numa plataforma de dados confiável e auditável — sem introduzir um servidor de banco de dados ou infraestrutura contínua que o pequeno time interno de TI precisasse manter.',
        solution:
          'Construção de uma biblioteca Python interna que extrai cada entidade relevante da API da Omie (pedidos de venda, títulos, clientes, produtos, vendedores, categorias) em cadência agendada para um Data Warehouse em Parquet de duas camadas: uma camada bruta espelhando a API, e uma camada tratada com dados tipados e limpos. Por cima, dois apps Streamlit: um para disparar e monitorar pipelines de extração, com jobs rodando num worker em background que sobrevive a fechar a aba do navegador; outro para relatórios gerenciais self-service (fluxo de caixa, aging, pedidos parados) exportáveis direto pra Excel. Um dos relatórios vai além da leitura — processa pedidos com faturamento atrasado de ponta a ponta: detecta e corrige CFOP faltante, atualiza a previsão de faturamento e emite a nota fiscal de volta pela API, com uma exportação clara de pendências pra tudo que precisa de intervenção humana.',
        results:
          'Relatórios que antes levavam horas de trabalho manual em planilha agora rodam em minutos e são self-service para financeiro e vendas — sem depender de TI pra tirar um número. O tratamento de faturamento atrasado passou de uma tarefa totalmente manual do financeiro para uma execução automatizada e supervisionada, com trilha de auditoria clara por pedido.',
        isReal: true,
      },
    ],
    projects: [
      {
        slug: '2026-world-cup',
        image: '/projects/world-cup-2026.png',
        title: 'Modelo de Previsão da Copa do Mundo 2026',
        category: 'Ciência de Dados & Modelagem Esportiva',
        tags: ['Python', 'statsmodels', 'Poisson GLM', 'Elo', 'Monte Carlo', 'Next.js'],
        cardDescription:
          'Um modelo estatístico que previu a Copa do Mundo de 2026 etapa por etapa — um ensemble Poisson + Elo treinado em mais de 48.000 partidas internacionais e re-simulado após cada fase, publicado em oito instantâneos com previsões por placar e uma auditoria honesta do desempenho.',
        overview:
          'Projeto completo de previsão esportiva: um ensemble de dois modelos (regressão Poisson + Elo combinada com um GLM de Poisson de força de ataque/defesa por seleção) que prevê cada partida e simula o torneio via Monte Carlo para gerar probabilidades de classificação. Após cada fase os resultados reais foram travados e uma nova previsão foi publicada para tudo o que restava — oito instantâneos, de antes do apito inicial até a final.',
        challenge:
          'O futebol internacional abrange 150 anos de dados irregulares, torneios em campo neutro e qualidade de adversários muito variável. O modelo precisa ponderar a forma recente, respeitar a neutralidade do mando de campo e transformar expectativas de gols em probabilidades calibradas.',
        solution:
          'Treinamento com decaimento temporal em mais de 48 mil partidas, um GLM de Poisson com efeitos fixos por seleção numericamente estabilizado, correção de Dixon-Coles para placares baixos e uma simulação de Monte Carlo de 20.000 execuções de todo o torneio, incluindo a tabela oficial da FIFA para os terceiros colocados. O Elo das seleções é atualizado com os resultados reais após cada fase, e cada partida jogada mantém as probabilidades que o modelo tinha antes do apito. Os resultados são exportados em JSON e renderizados em páginas interativas.',
        results:
          'Oito instantâneos publicados com probabilidades de resultado, placar e gols por partida, classificações projetadas, chances de título e chaveamento completo — mais um placar que audita cada previsão contra o que aconteceu: 60% dos resultados de grupo acertados (33% ao acaso) e o favorito avançou em 25 de 32 confrontos do mata-mata.',
        isReal: false,
      },
      {
        slug: 'finance-sales-cockpit',
        title: 'Painel Financeiro e Comercial para Pequenas Empresas',
        category: 'Analytics & BI', status: 'Demo online',
        image: '/projects/finance-sales-cockpit/1-overview.png',
        tags: ['Python', 'SQLite', 'JavaScript', 'Modelagem de Dados', 'Dashboard'],
        cardDescription: 'Painel interativo de vendas, recebimentos, parcelas vencidas, pedidos parados, devoluções e estoque, com dados sintéticos claramente identificados.',
        overview: 'Demo funcional no navegador para uma pequena empresa fictícia. Reúne pedidos, notas, pagamentos, custos, devoluções e estoque numa visão operacional, com uma fotografia sintética fixa de 22 de outubro de 2026.',
        challenge: 'Pequenas equipes dependem de planilhas desconectadas e relatórios manuais para responder perguntas básicas de finanças e vendas.',
        solution: 'Um gerador Python cria registros relacionados; a validação com SQLite reconcilia os dados; um motor de métricas no navegador calcula KPIs documentados e visões interativas. Os filtros cobrem período, cliente, produto, região e vendedor.',
        results: 'A demo publicada apresenta vendas, caixa líquido, margem bruta, recebíveis por parcela, filas de títulos vencidos e pedidos parados, devoluções e controle de estoque. Valores e clientes são sintéticos; não há resultado real de cliente alegado.',
        githubUrl: 'https://github.com/hmantovani/finance-sales-cockpit',
      },
      {
        slug: 'spreadsheet-automation-kit',
        title: 'Kit de Automação e Padronização de Planilhas',
        category: 'Automação de Dados', status: 'Concluído',
        image: '/projects/spreadsheet-automation-kit/1.png',
        tags: ['Python', 'CSV', 'Excel', 'Qualidade de Dados', 'Relatório HTML'],
        cardDescription: 'CLI Python funcional que padroniza arquivos CSV e Excel, separa linhas para revisão e entrega dados reconciliados e um relatório compartilhável.',
        overview: 'Ferramenta reutilizável de linha de comando para exportações recorrentes em CSV e Excel. Apelidos de colunas e regras configuráveis geram linhas limpas, fila de revisão, manifesto e relatório HTML independente.',
        challenge: 'Nomes de colunas, formatos, valores ausentes e duplicidades variam entre arquivos, tornando relatórios recorrentes lentos e frágeis.',
        solution: 'O pipeline Python lê os dois formatos, mapeia cabeçalhos para um schema configurável, normaliza datas e valores, valida registros, sinaliza duplicatas e outras exceções com referência à linha de origem e gera clean.csv, exceptions.csv, manifest.json e report.html.',
        results: 'Na demo sintética incluída, 360 linhas de entrada se reconciliam em 348 aceitas e 12 para revisão, incluindo uma duplicata. Os resultados são determinísticos com entradas idênticas. Esses números descrevem a demo, não um resultado de cliente.',
        githubUrl: 'https://github.com/hmantovani/spreadsheet-automation-kit',
      },
      {
        slug: 'api-to-reporting-pipeline',
        title: 'Pipeline de Dados de API para Relatórios',
        category: 'Engenharia de Dados', status: 'Concluído',
        image: '/projects/api-to-reporting-pipeline/report.png',
        tags: ['Python', 'API REST', 'SQLite', 'Qualidade de Dados', 'HTML'],
        cardDescription: 'Pipeline reproduzível com API do Banco Mundial, validação, histórico de revisões e relatório anual de inflação.',
        overview: 'Um pipeline de ponta a ponta coleta a inflação anual ao consumidor do Brasil, da Alemanha e dos Estados Unidos na API do Banco Mundial, armazena observações e revisões em SQLite e gera um relatório estático para planejamento.',
        challenge: 'Dados de APIs públicas podem ser paginados, revisados, atrasados ou incompletos. Um relatório útil precisa detectar falhas, suportar novas execuções e indicar a atualidade dos dados.',
        solution: 'O Python coleta páginas com novas tentativas e espera progressiva, valida a resposta completa e grava observações e revisões em uma transação. Um registro de execuções e um relatório HTML mostram a última coleta bem-sucedida e a atualização da fonte.',
        results: 'A fotografia incluída contém 48 linhas de origem para três países; execuções repetidas não duplicam observações. O CPI anual não é previsão nem índice de custos de uma empresa. Agendamento e monitoramento externo precisam ser configurados separadamente.',
        githubUrl: 'https://github.com/hmantovani/api-to-reporting-pipeline',
      },
      {
        slug: 'customer-retention-analysis',
        title: 'Análise de Retenção e Receita de Clientes',
        category: 'Analytics & SQL', status: 'Demo online',
        image: '/projects/customer-retention-analysis/1.png',
        tags: ['Python', 'SQL', 'Análise de Coortes', 'Visualização de Dados'],
        cardDescription: 'Explore coortes, recompra e concentração de receita em uma base histórica de transações de varejo.',
        overview: 'Uma análise reproduzível e uma ferramenta interativa transformam transações históricas do conjunto UCI Online Retail em visões de coortes, recompra e atividade mensal para equipes de vendas e finanças.',
        challenge: 'Históricos incompletos, tempos de acompanhamento diferentes, transações anônimas e devoluções podem distorcer métricas de retenção e receita.',
        solution: 'O Python constrói métricas por cliente e pedido, consultas SQL verificam agregados e uma demo estática permite explorar coortes, atividade mensal e frequência de pedidos com definições e ressalvas.',
        results: 'Dos 3.324 clientes elegíveis, 1.577 (47,4%) fizeram um segundo pedido em até 90 dias. A análise cobre um varejista britânico de dezembro de 2010 a novembro de 2011; os padrões observados não estabelecem causas de churn.',
        githubUrl: 'https://github.com/hmantovani/customer-retention-analysis',
      },
    ],
    footer: { rights: '© 2025 Henrique Mantovani. Todos os direitos reservados.' },
    projectPage: {
      back: '← Voltar ao Portfólio',
      overview: 'Visão Geral',
      challenge: 'O Desafio',
      solution: 'A Solução',
      results: 'Resultados & Impacto',
      stack: 'Stack Tecnológica',
      github: 'Ver no GitHub',
      linkedin: 'Post no LinkedIn',
      comingSoon: 'Em Breve',
      realCaseBadge: 'Caso Real',
      screenshots: 'Capturas de tela',
    },
  },
};
