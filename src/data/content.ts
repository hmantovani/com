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
}

export interface SiteContent {
  nav: { home: string; realCases: string; projects: string; contact: string };
  hero: { title: string; bio: string; ctaWork: string; ctaContact: string; available: string };
  sections: {
    realCases: { title: string; subtitle: string };
    projects: { title: string; subtitle: string };
    contact: { title: string; subtitle: string };
  };
  contact: {
    emailLabel: string;
    downloadCV: string;
    cvNote: string;
    fiverrNote: string;
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
  };
}

export const content: Record<Lang, SiteContent> = {
  en: {
    nav: { home: 'Home', realCases: 'Real Cases', projects: 'Projects', contact: 'Contact' },
    hero: {
      title: 'Data Professional | Engineering · Science · Analytics',
      bio: 'I combine an appreciation for efficiency from Production Engineering (PUC-SP) with the analytical depth of Data Science (PUC-RS). I used both sides to translate complex operations into information ecosystems in three experiences at leading global companies in their sectors: IBM, Keyence and Thermo Fisher Scientific.\n\nMy pillars are building ETL pipelines, data modeling for analytical process automation, and developing predictive analyses and models — structuring raw data into reliable databases with a focus on consistency, scalability and measurability.',
      ctaWork: 'View My Work',
      ctaContact: 'Get In Touch',
      available: 'Open to full-time, freelance & remote opportunities',
    },
    sections: {
      realCases: {
        title: 'Real Cases',
        subtitle: 'Production-grade solutions delivered in corporate environments at global market leaders.',
      },
      projects: {
        title: 'Projects',
        subtitle: 'A curated portfolio demonstrating the full breadth of a modern data stack.',
      },
      contact: {
        title: 'Get In Touch',
        subtitle: 'Available for new opportunities, freelance projects, and collaboration.',
      },
    },
    contact: {
      emailLabel: 'Send an Email',
      downloadCV: 'Download CV',
      cvNote: 'CV available soon',
      fiverrNote: 'Fiverr profile coming soon',
      socialHeading: 'Find me on',
      or: 'or',
    },
    realCases: [
      {
        slug: 'sap-pipeline-automation',
        title: 'Strategic ETL & Data Infrastructure: Architecting Reliability Amidst Constraints',
        category: 'Data Engineering & BI',
        tags: ['Python', 'Selenium', 'PyAutoGUI', 'ETL', 'SAP', 'Automation', 'Data Governance'],
        cardDescription:
          'A resilient Python-based automation layer bypassing API absence to unify company data into 40 separate extractions from SAP inside a self-healing and auditable Data Warehouse.',
        overview:
          'Engineered a complete data ecosystem to automate 40 complex SAP extraction loops, transitioning the organization from fragmented, manual Excel-based reporting to an automated, auditable infrastructure that feeds real-time BI and executive dashboards.',
        challenge:
          'IT restrictions meant no API access, forcing teams to manually maintain dozens of SAP reports with fragmented logic and hidden Excel calculations. This created a high-friction environment where data was inconsistently extracted, difficult to verify, and required hours of weekly manual maintenance.',
        solution:
          'Developed a Python automation layer using Selenium and PyAutoGUI on a dedicated VM to simulate human interaction and interact with our SAP system during the day. I architected an "always-ready" Data Warehouse that maintained both historical daily/monthly archives and a root-level "latest version" for instant Python/PowerBI consumption. Additionally, I implemented a monitoring layer that validated 30–50 variables per loop, triggering real-time bug reports via Microsoft Teams to ensure data integrity.',
        results:
          'Eliminated waiting times for data extraction, reducing 15-minute Excel "freezes" during report updating to near-instant updates. The system also improved data reliability by identifying suspected human input errors in real-time and established a unified, 100% auditable data layer for company-wide reporting.',
        isReal: true,
      },
      {
        slug: 'market-intelligence',
        title: 'Market Intelligence with Lead Scoring',
        category: 'Data Science & Strategy',
        tags: ['Python', 'Machine Learning', 'Predictive Modeling', 'Lead Scoring', 'Classification'],
        cardDescription:
          'A classification model prioritizing companies within the active customer base, integrating sales activity, purchase history, and geographic variables to optimize field team deployment.',
        overview:
          'Designed and implemented a machine learning classification model to score and rank companies within the active customer base by their likelihood of conversion and relationship depth — enabling strategic allocation of field sales resources.',
        challenge:
          'The sales team had a large active customer base with no systematic method for prioritizing outreach. Account selection depended on individual intuition, causing high-potential accounts to be overlooked and low-potential ones to consume disproportionate time.',
        solution:
          'Integrated data from sales activity logs, purchase history, and geographic variables to build a feature-rich dataset. A supervised classification model was trained to score each account based on behavioral patterns and management-defined strategic signals. The output was a ranked list focused on the accounts with the highest conversion and upsell potential.',
        results:
          "Systematic, data-driven account prioritization replacing ad-hoc intuition. Improved alignment between field deployment and revenue opportunity. The model was embedded into the team's regular planning cycle, creating a feedback loop for continuous refinement.",
        isReal: true,
      },
    ],
    projects: [
      {
        slug: 'sql-sales-analytics',
        title: 'SQL Sales Analytics Dashboard',
        category: 'Data Analytics & SQL',
        tags: ['PostgreSQL', 'SQL', 'Window Functions', 'CTEs', 'Data Modeling', 'Analytics'],
        cardDescription:
          'End-to-end SQL analytics on a synthetic sales dataset — business KPIs, cohort analysis, ranking windows, and executive reporting without a single line of Python.',
        overview:
          'A comprehensive SQL-only analytics project demonstrating mastery of relational database querying, from basic aggregations to advanced window functions and cohort analysis on a structured sales dataset.',
        challenge:
          'Translate business questions — revenue trends, customer retention, product performance, and regional breakdowns — into clean, efficient SQL queries that a stakeholder can read, audit, and extend without Python or BI tooling.',
        solution:
          'Designed a normalized relational schema for the sales domain. Used CTEs for query modularity, window functions for rankings and running totals, and conditional aggregations for pivot-style reporting. Built a suite of analytical queries covering KPIs, cohorts, and performance rankings.',
        results:
          'A fully documented SQL analytical suite ready for integration with any BI tool (Tableau, Power BI, Metabase). Demonstrates the ability to deliver insights through pure SQL — the most universally required data skill in corporate environments.',
      },
      {
        slug: 'rest-api-pipeline',
        title: 'REST API Data Pipeline',
        category: 'Data Engineering & APIs',
        tags: ['Python', 'REST API', 'JSON', 'PostgreSQL', 'ETL', 'Scheduling', 'Error Handling'],
        cardDescription:
          'Automated pipeline fetching, transforming, and storing data from a public REST API on a recurring schedule — with pagination, error handling, and structured database storage.',
        overview:
          'A production-pattern data pipeline that consumes a public REST API, handles pagination, rate limiting, and error recovery, then loads the cleaned data into a structured relational database on an automated schedule.',
        challenge:
          'API data requires defensive engineering — handling failures gracefully, managing pagination, transforming nested JSON into flat relational structures, and ensuring idempotent loads that can run repeatedly without duplicating data.',
        solution:
          'Built a modular Python pipeline with separated extract, transform, and load layers. Implemented retry logic and exponential backoff for API resilience. JSON responses are flattened and validated before insertion into PostgreSQL. A scheduler ensures the pipeline runs on a defined cadence with full observability logging.',
        results:
          'A fully operational, repeatable data pipeline demonstrating real-world engineering standards. Directly applicable to freelance data engineering work where API integrations are among the most requested services on Upwork.',
      },
      {
        slug: 'eda-predictive-model',
        title: 'EDA + Predictive Model',
        category: 'Data Science & Machine Learning',
        tags: ['Python', 'Pandas', 'Scikit-learn', 'Matplotlib', 'Seaborn', 'Feature Engineering', 'SHAP'],
        cardDescription:
          'Full data science workflow on a classification problem — exploratory analysis, feature engineering, model training, hyperparameter tuning, and interpretable evaluation reporting.',
        overview:
          'A complete, narrative-driven data science project taking a raw dataset from first look to a trained model — emphasizing storytelling, visual analysis, and interpretable results alongside technical rigor.',
        challenge:
          'Data science projects often fail not from bad models but from poor problem framing, weak feature engineering, or uninterpretable outputs. The challenge is to build something rigorous that a non-technical stakeholder can also understand and trust.',
        solution:
          'Started with a thorough exploratory phase — distributions, correlations, outlier analysis, and class imbalance checks. Engineered domain-relevant features before modeling. Trained and compared multiple classifiers with cross-validated hyperparameter search. Produced a full evaluation report with confusion matrix, ROC curves, and SHAP-based feature importance.',
        results:
          'A reproducible, well-documented data science notebook demonstrating the full ML workflow. A model with strong validation metrics and interpretable output — the kind of deliverable that builds client trust on Upwork and in corporate settings alike.',
      },
      {
        slug: 'interactive-data-app',
        title: 'Interactive Data App',
        category: 'Data Visualization & Deployment',
        tags: ['Python', 'Streamlit', 'Plotly', 'Data Visualization', 'Deployment', 'Dashboards'],
        cardDescription:
          'A fully deployed interactive web application for data exploration and visualization — built with Streamlit and accessible to non-technical stakeholders through a public URL.',
        overview:
          'A data application that turns a static dataset into a live, interactive experience — allowing any user to filter, explore, and visualize data through a browser without writing code. Deployed on Streamlit Cloud.',
        challenge:
          'The gap between a data analysis and a deliverable a client can actually use is enormous. Most analyses live in notebooks only the analyst can run. The challenge is closing that gap without introducing engineering complexity.',
        solution:
          'Built a Streamlit application with dynamic filtering (dropdowns, sliders, multi-select), multiple visualization layers (bar charts, scatter plots, time series), and a clean responsive layout. Stateless and deployable to Streamlit Cloud in one command — making sharing trivial.',
        results:
          'A publicly accessible data application available via URL — the most impressive artifact in a portfolio for non-technical clients. Demonstrates the ability to go from raw data to a polished, shareable product.',
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
    },
  },

  pt: {
    nav: { home: 'Início', realCases: 'Casos Reais', projects: 'Projetos', contact: 'Contato' },
    hero: {
      title: 'Data Professional | Engineering · Science · Analytics',
      bio: 'Combino o apreço pela eficiência da Engenharia de Produção (PUC-SP) com a profundidade analítica da Ciência de Dados (PUC-RS). Utilizei essa combinação para traduzir operações complexas em ecossistemas de informação em três experiências em empresas líderes globais de seus setores: IBM, Keyence e Thermo Fisher Scientific.\n\nMeus pilares são a construção de pipelines de ETL, a modelagem de dados para automação de processos analíticos e o desenvolvimento de análises e modelos preditivos — estruturando dados brutos em bases confiáveis com foco em consistência, escalabilidade e mensurabilidade.',
      ctaWork: 'Ver Meu Trabalho',
      ctaContact: 'Entrar em Contato',
      available: 'Disponível para oportunidades em tempo integral, freelance e remoto',
    },
    sections: {
      realCases: {
        title: 'Casos Reais',
        subtitle: 'Soluções de nível produtivo entregues em ambientes corporativos em líderes globais de mercado.',
      },
      projects: {
        title: 'Projetos',
        subtitle: 'Portfólio curado demonstrando a amplitude completa de um stack moderno de dados.',
      },
      contact: {
        title: 'Entrar em Contato',
        subtitle: 'Disponível para novas oportunidades, projetos freelance e colaboração.',
      },
    },
    contact: {
      emailLabel: 'Enviar E-mail',
      downloadCV: 'Baixar CV',
      cvNote: 'CV disponível em breve',
      fiverrNote: 'Perfil no Fiverr em breve',
      socialHeading: 'Me encontre em',
      or: 'ou',
    },
    realCases: [
      {
        slug: 'sap-pipeline-automation',
        title: 'Pipeline de Automação com Data Warehouse',
        category: 'Engenharia de Dados & BI',
        tags: ['Python', 'Selenium', 'PyAutoGUI', 'ETL', 'Parquet', 'BI', 'Automação'],
        cardDescription:
          'Pipeline Python automatizando 40 processos de extração no SAP, construindo um Data Warehouse em Parquet com versionamento histórico e habilitando dashboards de BI em tempo real.',
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
        slug: 'market-intelligence',
        title: 'Inteligência de Mercado com Lead Scoring',
        category: 'Ciência de Dados & Estratégia',
        tags: ['Python', 'Machine Learning', 'Modelagem Preditiva', 'Lead Scoring', 'Classificação'],
        cardDescription:
          'Modelo de classificação para priorização de empresas na base ativa de clientes, integrando atividade de vendas, histórico de compras e variáveis geográficas para otimizar o desdobramento do time de campo.',
        overview:
          'Concepção e implementação de um modelo de classificação em machine learning para pontuar e ranquear empresas na base ativa de clientes pela probabilidade de conversão e profundidade de relacionamento — habilitando alocação estratégica dos recursos de vendas em campo.',
        challenge:
          'O time de vendas possuía uma grande base de clientes ativos sem método sistemático para priorizar abordagens. A seleção de contas dependia de intuição individual, fazendo com que contas de alto potencial fossem ignoradas e as de baixo potencial consumissem tempo desproporcional.',
        solution:
          'Integração de dados de logs de atividade de vendas, histórico de compras e variáveis geográficas para construir um dataset rico em features. Um modelo de classificação supervisionada foi treinado para pontuar cada conta com base em padrões comportamentais e sinais estratégicos da gestão. O resultado foi uma lista ranqueada focada nas contas com maior potencial de conversão e upsell.',
        results:
          'Priorização de contas sistemática e orientada a dados, substituindo a intuição ad-hoc. Maior alinhamento entre o desdobramento de campo e a oportunidade de receita. O modelo foi incorporado ao ciclo regular de planejamento da equipe, criando um loop de retroalimentação para refinamento contínuo.',
        isReal: true,
      },
    ],
    projects: [
      {
        slug: 'sql-sales-analytics',
        title: 'SQL Sales Analytics Dashboard',
        category: 'Analytics de Dados & SQL',
        tags: ['PostgreSQL', 'SQL', 'Window Functions', 'CTEs', 'Modelagem de Dados', 'Analytics'],
        cardDescription:
          'Analytics SQL ponta a ponta em dataset sintético de vendas — KPIs de negócio, análise de coorte, window functions de ranking e relatórios executivos sem uma linha de Python.',
        overview:
          'Projeto de analytics exclusivamente em SQL demonstrando domínio de consultas em banco de dados relacional, de agregações básicas a window functions avançadas e análise de coorte em um dataset de vendas estruturado.',
        challenge:
          'Traduzir perguntas de negócio — tendências de receita, retenção de clientes, performance de produtos e breakdowns regionais — em queries SQL limpas e eficientes que um stakeholder possa ler, auditar e estender sem Python ou ferramentas de BI.',
        solution:
          'Concepção de schema relacional normalizado para o domínio de vendas. Uso de CTEs para modularidade, window functions para rankings e totais acumulados, e agregações condicionais para relatórios no estilo pivot. Construção de queries analíticas cobrindo KPIs, coortes e rankings de performance.',
        results:
          'Conjunto analítico SQL totalmente documentado, pronto para integração com qualquer ferramenta de BI (Tableau, Power BI, Metabase). Demonstra a capacidade de entregar insights via SQL puro — a habilidade de dados mais universalmente exigida em ambientes corporativos.',
      },
      {
        slug: 'rest-api-pipeline',
        title: 'Pipeline de Dados via REST API',
        category: 'Engenharia de Dados & APIs',
        tags: ['Python', 'REST API', 'JSON', 'PostgreSQL', 'ETL', 'Agendamento', 'Tratamento de Erros'],
        cardDescription:
          'Pipeline automatizado coletando, transformando e armazenando dados de uma API REST pública em agendamento recorrente — com paginação, tratamento de erros e armazenamento estruturado em banco de dados.',
        overview:
          'Pipeline de dados em padrão produtivo que consome uma API REST pública, gerencia paginação, rate limiting e recuperação de erros, então carrega os dados limpos em banco relacional estruturado em agendamento automatizado.',
        challenge:
          'Dados de API exigem engenharia defensiva — tratamento gracioso de falhas, gerenciamento de paginação, transformação de JSON aninhado em estruturas relacionais planas e garantia de cargas idempotentes que possam rodar repetidamente sem duplicar dados.',
        solution:
          'Construção de pipeline Python modular com camadas separadas de extração, transformação e carga. Implementação de retry logic e exponential backoff para resiliência da API. Respostas JSON são achatadas e validadas antes da inserção no PostgreSQL. Agendador garante execução em cadência definida com logging completo.',
        results:
          'Pipeline de dados totalmente operacional e repetível demonstrando padrões de engenharia do mundo real. Diretamente aplicável a trabalhos freelance de engenharia de dados onde integrações com APIs estão entre os serviços mais solicitados no Upwork.',
      },
      {
        slug: 'eda-predictive-model',
        title: 'EDA + Modelo Preditivo',
        category: 'Ciência de Dados & Machine Learning',
        tags: ['Python', 'Pandas', 'Scikit-learn', 'Matplotlib', 'Seaborn', 'Feature Engineering', 'SHAP'],
        cardDescription:
          'Fluxo completo de ciência de dados em problema de classificação — análise exploratória, engenharia de features, treinamento, ajuste de hiperparâmetros e relatório de avaliação interpretável.',
        overview:
          'Projeto completo de ciência de dados orientado a narrativa, levando um dataset bruto da primeira análise ao modelo final — com ênfase em storytelling, análise visual e resultados interpretáveis ao lado do rigor técnico.',
        challenge:
          'Projetos de ciência de dados frequentemente falham não por modelos ruins, mas por enquadramento fraco do problema, engenharia de features deficiente ou resultados não interpretáveis. O desafio é construir algo rigoroso que um stakeholder não técnico também consiga entender e confiar.',
        solution:
          'Início com fase exploratória completa — distribuições, correlações, análise de outliers e verificação de desequilíbrio de classes. Engenharia de features relevantes ao domínio antes da modelagem. Treinamento e comparação de múltiplos classificadores com busca de hiperparâmetros via validação cruzada. Relatório de avaliação completo com matriz de confusão, curvas ROC e importância de features via SHAP.',
        results:
          'Notebook de ciência de dados reproduzível e bem documentado demonstrando o fluxo completo de ML. Modelo com fortes métricas de validação e output interpretável — o tipo de entregável que constrói confiança com clientes no Upwork e em ambientes corporativos.',
      },
      {
        slug: 'interactive-data-app',
        title: 'App Interativo de Dados',
        category: 'Visualização de Dados & Deploy',
        tags: ['Python', 'Streamlit', 'Plotly', 'Visualização de Dados', 'Deploy', 'Dashboards'],
        cardDescription:
          'Aplicação web interativa para exploração e visualização de dados — construída com Streamlit e acessível a stakeholders não técnicos por URL público.',
        overview:
          'Aplicação de dados que transforma um dataset estático em uma experiência ao vivo e interativa — permitindo que qualquer usuário filtre, explore e visualize dados pelo navegador sem escrever código. Implantada no Streamlit Cloud.',
        challenge:
          'O abismo entre uma análise de dados e um entregável que um cliente possa realmente usar é enorme. A maioria das análises vive em notebooks que só o analista consegue executar. O desafio é fechar essa lacuna sem introduzir complexidade de engenharia.',
        solution:
          'Construção de aplicação Streamlit com filtros dinâmicos (dropdowns, sliders, multi-select), múltiplas camadas de visualização (gráficos de barras, scatter plots, séries temporais) e layout limpo e responsivo. Stateless e implantável no Streamlit Cloud em um comando.',
        results:
          'Aplicação de dados publicamente acessível via URL — o artefato mais impressionante em um portfólio para clientes não técnicos. Demonstra capacidade de ir do dado bruto a um produto polido e compartilhável.',
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
    },
  },
};
