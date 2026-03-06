
import { Home, Users, Zap, Disc, Shirt, Mail, Terminal, Target, Crosshair, AlertTriangle, Lock, Package, LucideIcon, Cpu, TrendingUp } from 'lucide-react';

export interface NavItem {
  name: string;
  id: string;
  icon: LucideIcon;
  desc: string;
}

export interface Testimonial {
  id: string;
  subject: string;
  role: string;
  impact: string;
  impactLabel?: string;
  thumbnail: string;
  video?: string;
}

export interface Mentor {
  id: string;
  name: string;
  role: string;
  level: string;
  image: string;
  bio: string;
  stats: { label: string; val: number; color: string }[];
  tags: string[];
  note: string;
  noteColor: string;
  noteRotation: string;
  imagePosition?: string;
}

export interface ScheduleItem {
  time: string;
  day: string;
  month: string;
  year: string;
  originalTime?: string;
  title: string;
  desc: string;
  location?: string;
  type: 'network' | 'break' | 'secret';
  iconName: string;
  link?: string;
  exclusiveTag?: string;
}

export interface ProductItem {
  id: string;
  title: string;
  desc: string;
  iconName: string;
  type: string;
  duration?: string;
  durationLabel?: string;
  dateTag?: string;
  originalPrice?: string;
  price?: string;
  link?: string;
}

export const content = {
  global: {
    year: "2025",
    brandName: "GOON PROTOCOL",
    brandShort: "GOON",
    currency: "R$"
  },
  navbar: [
    { name: 'Home', id: 'home', icon: Home, desc: 'System_Root' },
    { name: 'Mentoria', id: 'mentorship', icon: Users, desc: 'Elite_Training' },
    { name: 'Produtos', id: 'products', icon: Package, desc: 'Digital_Assets' },
    { name: 'Eventos', id: 'immersion', icon: Zap, desc: 'Deep_Dive' },
    { name: 'Community', id: 'community', icon: Disc, desc: 'The_Network' },
    { name: 'Shop', id: 'shop', icon: Shirt, desc: 'Asset_Store' },
    { name: 'Newsletter', id: 'newsletter', icon: Mail, desc: 'Data_Stream' },
  ] as NavItem[],
  hero: {
    systemStatus: "Optimal",
    titlePart1: "FASHION",
    titlePart2: "&",
    titlePart3: "BUSINESS",
    description: "O ecossistema que gerou mais de R$100 milhões em aumento de receita direta nas marcas dos participantes de nossos programas. Método proprietário, mentoria estratégica e estrutura de escala para quem não quer apenas vender, quer dominar o jogo.",
    buttons: {
      primary: "APLICAR AGORA",
      secondary: "Ver Cases"
    },
    marquee: [
      "/// DATA LOADING...",
      "/// NEW ASSETS AVAILABLE IN SHOP",
      "/// JOIN THE COMMUNITY TODAY",
      "/// MENTORSHIP BATCH OPEN"
    ],
    modules: {
      infinity: {
        title: "Mentoria Infinity",
        desc: "Transforme sua marca de moda em uma operação estratégica, lucrativa e escalável com método, dados e direcionamento direto de quem já construiu um império global."
      },
      elite: {
        title: "Mentoria Elite",
        tag: "VAGAS LIMITADAS",
        desc: "Aceleração High-Stakes 1-on-1."
      }
    },
    stats: {
      revenue: "100",
      revenueLabel: "MILHÕES",
      revenueDesc: "Já geramos mais de R$100 milhões em receita adicional para as marcas dos nossos mentorados.",
      revenueSub: "De Reais (BRL)",
      ref: "Ref: 2025-Q4"
    },
    testimonials: [
      {
        id: "CASE_8492",
        subject: "DENIS PAIVA - PANGEIA",
        role: "MEMBER SINCE 2024",
        impact: "DE 2.5 MILHÕES ANO PARA 40 MILHÕES ANO",
        impactLabel: "AUMENTO DE RECEITA",
        thumbnail: "https://aura360.com.br/wp-content/uploads/2026/03/PANGEIA.png",
        video: "https://www.youtube.com/embed/we5BrsWkol0"
      },
      {
        id: "CASE_9910",
        subject: "Ronaldo Panye - Shui",
        role: "ELITE MEMBER",
        impact: "300 MIL REAIS MÊS PARA 1 MILHÃO POR MÊS DE AUMENTO DE RECEITA",
        impactLabel: "AUMENTO DE RECEITA",
        thumbnail: "https://aura360.com.br/wp-content/uploads/2026/03/SHUI.png"
      },
      {
        id: "CASE_1029",
        subject: "Babi Ganzarolli - Farcoo",
        role: "MEMBER SINCE 2025",
        impact: "ESTRUTURAÇÃO DE MODELO DE GESTÃO, INTERNACIONALIZAÇÃO E 20% DE AUMENTO DE RECEITA",
        impactLabel: "AUMENTO DE RECEITA",
        thumbnail: "https://aura360.com.br/wp-content/uploads/2026/03/FARCOO.png"
      },
      {
        id: "CASE_3301",
        subject: "Mariana Alcazar - Revival",
        role: "INFINITY MEMBER",
        impact: "Desenvolvimento do canal de atacado, otimização do PCP e melhoria dos processos financeiros e contábeis.",
        thumbnail: "https://aura360.com.br/wp-content/uploads/2026/03/REVIVAL.png"
      },
      {
        id: "CASE_4021",
        subject: "David Muniz - D Muniz",
        role: "INFINITY MEMBER",
        impact: "SOLD OUT DROP",
        thumbnail: "https://aura360.com.br/wp-content/uploads/2026/03/DMUNIZ.png"
      },
      {
        id: "CASE_1192",
        subject: "Legri - Dabeg",
        role: "ELITE MEMBER",
        impact: "15x ROAS",
        thumbnail: "https://aura360.com.br/wp-content/uploads/2026/03/DABEG.png"
      },
      {
        id: "CASE_5501",
        subject: "ihally - bem querida",
        role: "COMMUNITY MEMBER",
        impact: "$1M ARR REACHED",
        thumbnail: "https://aura360.com.br/wp-content/uploads/2026/03/BEM-QUERIDA.png"
      },
      {
        id: "CASE_7723",
        subject: "Joel - Skylife",
        role: "INFINITY MEMBER",
        impact: "MARKET LEADER",
        thumbnail: "https://aura360.com.br/wp-content/uploads/2026/03/SKYLIFE.png"
      },
      {
        id: "CASE_9102",
        subject: "Maurício Maso - Maso Artwear",
        role: "INFINITY MEMBER",
        impact: "BRAND AUTHORITY",
        thumbnail: "https://aura360.com.br/wp-content/uploads/2026/03/MASO.png"
      }
    ] as Testimonial[],
    bio: {
      subtitle: "The Architect",
      nameLine1: "Giulliano",
      nameLine2: "PUGA",
      text: `Giulliano Puga é um empreendedor em série, estrategista de marcas e designer de moda, amplamente reconhecido como o fundador da LABELLAMAFIA, grife que sob sua liderança alcançou presença em mais de 40 países.`,
      skills: [
        { name: "VISION", value: 100 },
        { name: "EXECUTION", value: 98 },
        { name: "DISRUPTION", value: 100 }
      ]
    }
  },
  mentorship: {
    header: {
      tag: "Sys.Msg_001",
      title: "ESCOLHA",
      subTitle: "seu...",
      mainTitle: "PROTOCOLO"
    },
    plans: {
      infinity: {
        name: "Infinity",
        tag: "Standard Access",
        desc: "O ecossistema contínuo de crescimento.",
        benefits: [
          "2 encontros mensais",
          "Acesso grupo mastermind GOON ONE",
          "Acesse a Área de membros com contéudo exclusivo",
          "Hotseat mensais com especialistas do mercado",
          "Painel de BI",
          "Agente de IA para suporte"
        ],
        cta: "Iniciar Infinity"
      },
      elite: {
        name: "Elite",
        tag: "Restricted",
        desc: "Intervenção direta no seu negócio.",
        benefits: ["Tudo do Plano Infinity", "4 Encontros (1-on-1)", "Planejamento Personalizado", "WhatsApp Pessoal", "Networking High-Ticket"],
        cta: "Aplicar para Elite",
        vagas: "Vagas: 03/10"
      }
    },
    mentors: [
      {
        id: "OP_01",
        name: "Giulliano Puga",
        role: "FOUNDER LABELLAMAFIA, AURA360 & GOON MENTORSHIP",
        level: "LVL.99",
        image: "https://richardhey.com.br/wp-content/uploads/2026/01/freepik__enhance__95178.png",
        bio: "Giulliano Puga é um empreendedor em série, estrategista de marcas e designer de moda, amplamente reconhecido como o fundador da LABELLAMAFIA, grife que sob sua liderança alcançou presença em mais de 40 países.",
        stats: [
          { label: "Strategy", val: 98, color: "bg-blue-600" },
          { label: "Branding", val: 95, color: "bg-purple-600" },
          { label: "Chaos", val: 80, color: "bg-red-600" }
        ],
        tags: ["FOUNDER", "VISIONARY"],
        note: "THE BOSS",
        noteColor: "text-red-600",
        noteRotation: "-rotate-12"
      },
      {
        id: "OP_02",
        name: "DENIS PAIVA",
        role: "CEO PANGEIA",
        level: "LVL.90",
        image: "https://aura360.com.br/wp-content/uploads/2026/03/DENIS-PANGEIA-.png",
        bio: "",
        stats: [],
        tags: ["MENTOR"],
        note: "OPERATOR",
        noteColor: "text-blue-600",
        noteRotation: "rotate-6"
      },
      {
        id: "OP_03",
        name: "CADU LIMA",
        role: "CEO DEFINE",
        level: "LVL.88",
        image: "https://aura360.com.br/wp-content/uploads/2026/03/CADU-LIMA-.png",
        bio: "",
        stats: [],
        tags: ["DEFINE"],
        note: "EXPERT",
        noteColor: "text-green-600",
        noteRotation: "-rotate-6"
      },
      {
        id: "OP_04",
        name: "SERGIO S JUNIOR",
        role: "Mentor",
        level: "LVL.85",
        image: "https://aura360.com.br/wp-content/uploads/2026/03/SERGINHO.jpg",
        bio: "",
        stats: [],
        tags: ["MENTOR"],
        note: "MASTER",
        noteColor: "text-purple-600",
        noteRotation: "rotate-3"
      },
      {
        id: "OP_05",
        name: "LEONARDO GONÇALVES",
        role: "CEO TEE FASHION",
        level: "LVL.87",
        image: "https://aura360.com.br/wp-content/uploads/2026/03/LEONARDO-GONCAVLES-scaled.png",
        imagePosition: "object-center",
        bio: "",
        stats: [],
        tags: ["TEE FASHION"],
        note: "STRATEGIST",
        noteColor: "text-yellow-600",
        noteRotation: "-rotate-3"
      },
      {
        id: "OP_06",
        name: "RONALDO PANYE",
        role: "FOUNDER CEO & Diretor de criação",
        level: "LVL.89",
        image: "https://aura360.com.br/wp-content/uploads/2026/03/RONALDO-PANYE.jpg",
        bio: "",
        stats: [],
        tags: ["FOUNDER CEO & Diretor de criação"],
        note: "LEADER",
        noteColor: "text-red-500",
        noteRotation: "rotate-6"
      },
      {
        id: "OP_07",
        name: "JOÃO VITOR",
        role: "Mentor",
        level: "LVL.86",
        image: "https://aura360.com.br/wp-content/uploads/2026/03/JOAO-PMO.png",
        imagePosition: "object-top",
        bio: "",
        stats: [],
        tags: ["MENTOR"],
        note: "BUILDER",
        noteColor: "text-blue-500",
        noteRotation: "-rotate-6"
      },
      {
        id: "OP_08",
        name: "SERGIO COSTA",
        role: "CEO CASAPIETRA - FUNDADOR PAGSEGURO (BRPAY EXIT TO UOL)",
        level: "LVL.88",
        image: "https://aura360.com.br/wp-content/uploads/2026/03/SERGIO-COSTA.png",
        bio: "",
        stats: [],
        tags: ["CEO CASAPIETRA"],
        note: "PRO",
        noteColor: "text-green-500",
        noteRotation: "rotate-3"
      },
      {
        id: "OP_09",
        name: "ANDRE CANO",
        role: "ESPECIALISTA EM BRANDING",
        level: "LVL.85",
        image: "https://aura360.com.br/wp-content/uploads/2026/03/ANDRE-CANO.jpg",
        imagePosition: "object-center",
        bio: "",
        stats: [],
        tags: ["ESPECIALISTA EM BRANDING"],
        note: "SPECIALIST",
        noteColor: "text-purple-500",
        noteRotation: "-rotate-3"
      },
      {
        id: "OP_10",
        name: "BRUNO GALVÃO",
        role: "Mentor",
        level: "LVL.87",
        image: "https://aura360.com.br/wp-content/uploads/2026/03/BRUNO-GALVAO-scaled.png",
        bio: "",
        stats: [],
        tags: ["MENTOR"],
        note: "VISIONARY",
        noteColor: "text-yellow-500",
        noteRotation: "rotate-6"
      },
      {
        id: "OP_11",
        name: "MARCELO MOON",
        role: "CEO ARAMODU",
        level: "LVL.86",
        image: "https://aura360.com.br/wp-content/uploads/2026/03/MARCELO-MOON.png",
        bio: "",
        stats: [],
        tags: ["ARAMODU"],
        note: "CREATOR",
        noteColor: "text-red-600",
        noteRotation: "-rotate-6"
      },
      {
        id: "OP_12",
        name: "WESLEY GHIDINI",
        role: "CEO POTERE",
        level: "LVL.85",
        image: "https://aura360.com.br/wp-content/uploads/2026/03/WESLEY-GHIDINI.jpg",
        bio: "",
        stats: [],
        tags: ["POTERE"],
        note: "GROWTH",
        noteColor: "text-blue-600",
        noteRotation: "rotate-3"
      }
    ] as Mentor[]
  },
  immersion: {
    hero: {
      tag: "PRESENCIAL",
      title: "EVENTOS",
      subTitle1: "",
      subTitle2: "",
      descLine1: "Moda em Expansão.",
      descLine2: "Nós vamos reescrever o código do seu negócio."
    },
    schedule: [
      {
        time: "20 mar",
        day: "20",
        month: "MARÇO",
        year: "2025",
        originalTime: "09:00",
        title: "CONVERTR INSIDE - Especial: Giulliano Puga - Moda em Expansão.",
        desc: `Essa edição do Convertr Inside é fundamental para você que:

Tem uma marca de moda e quer aprender como vender mais, escalar seu faturamento e fortalecer sua marca no digital.

Quer estratégias testadas e insights exclusivos para otimizar sua gestão e aumentar sua conversão seja no físico ou no online

Busca networking de alto nível com lojistas, especialistas e grandes nomes do mercado para fechar negócios estratégicos.

Quer estar por dentro das principais tendências do atacado e varejo de moda, automação, tráfego pago e marketing digital.`,
        location: "Convertr Commerce (SP) São Paulo - SP",
        type: 'network',
        iconName: 'Terminal',
        link: "https://www.sympla.com.br/evento/convertr-inside-especial-giulliano-puga-moda-em-expansao/3294975"
      },
      {
        time: "25 mai",
        day: "25",
        month: "MAIO",
        year: "2025",
        title: "IMERSÃO ASIA",
        desc: "SEOUL > HONG KONG > GUANGZHOU",
        type: 'network',
        iconName: 'Globe',
        exclusiveTag: "IMERSÃO EXCLUSIVA PARA MEMBROS DO MASTERMIND GOON"
      }
    ] as ScheduleItem[],
    ticket: {
      status: "SOLD OUT",
      price: "R$ 12.000",
      date: "16 DE MAIO",
      location: "SECRET HQ, CHINA"
    },
    location: {
      coords: "COORD: 31.2304° N, 121.4737° E",
      title: "THE BUNKER",
      desc: "Localização exata 48h antes via canal criptografado. Segurança, privacidade e foco extremo."
    }
  },
  products_page: {
    hero: {
      tag: "DIGITAL & ESTRATÉGICO",
      title: "PRODUTOS",
      subTitle1: "",
      subTitle2: "",
      descLine1: "",
      descLine2: ""
    },
    items: [
      {
        id: "PROD_01",
        title: "MASTERCLASS DIREÇÃO CRIATIVA",
        desc: "Domine o desenvolvimento de produtos e o novo calendário de coleções. Aprenda com Giulliano Puga a antecipar tendências e sair à frente do mercado, substituindo o 'achismo' por dados e estratégia de Growth. O resultado? Lançamentos mais rápidos, explosão de vendas, alta lucratividade e o fim do estoque encalhado. Uma metodologia 100% validada na linha de frente, operando com sucesso em múltiplos canais e diferentes nichos da moda.",
        iconName: "Target",
        type: "product",
        duration: "2 DIAS",
        durationLabel: "DE DURAÇÃO",
        dateTag: "17 e 18 DE MARÇO",
        link: "https://pay.cakto.com.br/3bedxzg_795118"
      },
      {
        id: "PROD_02",
        title: "CRIAÇÃO DE PRODUTO E COLEÇÃO UTILIZANDO IA",
        desc: "Esqueça os cursos genéricos de IA que só ensinam a gerar imagens. O que você precisa é de um método desenhado exclusivamente para a realidade e as necessidades do mercado têxtil. Você vai aprender a aplicar a Inteligência Artificial no seu negócio de forma processualizada, focada em criar desejo e previsibilidade de vendas. E não se preocupe: mesmo que você não seja especialista em Photoshop, Illustrator ou tecnologia, o conteúdo é 100% prático e aplicável no dia seguinte na sua marca. [[Eu passei os últimos dois anos desenvolvendo essa metodologia na linha de frente e já a validei com dezenas de empresas de moda que participam dos meus programas de mentoria]]",
        iconName: "Cpu",
        type: "product",
        duration: "2 DIAS",
        durationLabel: "DE DURAÇÃO",
        dateTag: "24 e 25 DE MARÇO",
        link: "https://pay.cakto.com.br/3d4t3so_795154"
      },
      {
        id: "PROD_03",
        title: "Atacado pro: Como escalar sua marca no atacado",
        desc: "Aprenda a explorar o mercado de atacado de forma consistente e lucrativa com quem tem skin in the game. Sergio S. Junior, o maior representante comercial de streetwear do país (responsável por escalar marcas como Nike, Vans, Adidas e Lacoste), une forças com Giulliano Puga, fundador da Labellamafia e expert em Growth e Vendas. Domine as regras do jogo: otimização de calendário e produto, negociação estratégica com representantes, estruturação de Inside Sales, Social Selling, creation de comunidade e um pós-venda que blinda a sua marca. A metodologia exata para tracionar o seu B2B.",
        iconName: "TrendingUp",
        type: "product",
        duration: "2 DIAS",
        durationLabel: "DE DURAÇÃO",
        dateTag: "30 e 31 DE MARÇO",
        link: "https://pay.cakto.com.br/qyi2sas_795178"
      },
      {
        id: "PROD_04",
        title: "GOON SCALE",
        desc: `O método definitivo para escalar sua operação. Prepare-se para o próximo nível da sua marca com estratégias avançadas de escala e posicionamento de mercado.

* Comunidade Goon Scaler
* 1 encontro mensal ao vivo durante 12 meses
* Lista de fornecedores de matéria-prima
* Lista de prestadores de serviço em todo Brasil
* Planilhas e arquivos estratégicos para gestão e crescimento`,
        iconName: "Zap",
        type: "product",
        duration: "15/05",
        durationLabel: "LANÇAMENTO",
        originalPrice: "R$3.997,90",
        price: "R$1.997,90",
        link: "https://pay.cakto.com.br/sxwuhbt_795325"
      }
    ] as ProductItem[]
  },
  community: {
    header: {
      tag: "/// The_Network",
      titleLine1: "O ÚNICO",
      highlight: "MASTERMIND",
      titleLine2: "DE MODA DO BRASIL",
      desc: "Esqueça grupos de \"dicas\". Aqui é o war room de quem constrói impérios. Estratégia pura e networking de elite."
    },
    terminal: {
      user: "root@goon:~",
      logs: [
        { text: "Connection established...", color: "opacity-50" },
        { user: "[Giulliano]:", text: "Relatório Q4 disponível.", color: "text-blue-400" },
        { user: "[Member_88]:", text: "ROI 4.5x confirmado.", color: "text-purple-400" },
        { user: "[Admin]:", text: "Networking call 20h.", color: "text-yellow-400" }
      ]
    },
    cta: {
      title: "QUERO SER UM",
      highlight: "MEMBRO",
      desc: "",
      button: "SAIBA MAIS",
      link: "https://form.respondi.app/DdJzK3Xz"
    }
  },
  shop: {
    header: {
      tag: "/// Supply_Drop_026",
      title: "SHOP",
      subTitle: "& ASSETS"
    },
    products: [
      {
        id: "DROP_001",
        name: "HEAVYWEIGHT TEE // PROTOCOL",
        type: "PHYSICAL",
        price: "R$ 789,90",
        image: "https://richardhey.com.br/wp-content/uploads/2026/01/WhatsApp-Image-2026-01-28-at-21.20.13-8.jpeg",
        status: "IN_STOCK",
        tag: "NEW DROP",
        rarity: "COMMON"
      },
      {
        id: "DROP_002",
        name: "GOON HOODIE // BLACK OPS",
        type: "PHYSICAL",
        price: "R$ 949,90",
        image: "https://richardhey.com.br/wp-content/uploads/2026/01/WhatsApp-Image-2026-01-28-at-21.20.13-7.jpeg",
        status: "LOW_STOCK",
        tag: "BESTSELLER",
        rarity: "RARE"
      },
      {
        id: "ASSET_001",
        name: "GROWTH PROTOCOL E-BOOK",
        type: "DIGITAL",
        price: "R$ 797,00",
        image: "https://richardhey.com.br/wp-content/uploads/2026/01/WhatsApp-Image-2026-01-28-at-21.20.13-6.jpeg",
        status: "INSTANT_DOWNLOAD",
        tag: "PDF",
        rarity: "UNLIMITED"
      },
      {
        id: "DROP_003",
        name: "TACTICAL CAP // V2",
        type: "PHYSICAL",
        price: "R$ 719,90",
        image: "https://richardhey.com.br/wp-content/uploads/2026/01/WhatsApp-Image-2026-01-28-at-21.20.13-5.jpeg",
        status: "IN_STOCK",
        tag: "ACCESSORY",
        rarity: "COMMON"
      },
      {
        id: "ASSET_002",
        name: "NOTION SYSTEM TEMPLATE",
        type: "DIGITAL",
        price: "R$ 847,00",
        image: "https://richardhey.com.br/wp-content/uploads/2026/01/WhatsApp-Image-2026-01-28-at-21.20.13-3.jpeg",
        status: "INSTANT_DOWNLOAD",
        tag: "TEMPLATE",
        rarity: "UNLIMITED"
      },
      {
        id: "DROP_004",
        name: "LIMITED BOMBER JACKET",
        type: "PHYSICAL",
        price: "R$ 1.899,90",
        image: "https://richardhey.com.br/wp-content/uploads/2026/01/WhatsApp-Image-2026-01-28-at-21.20.13-2.jpeg",
        status: "SOLD_OUT",
        tag: "1 OF 50",
        rarity: "LEGENDARY"
      },
      {
        id: "ASSET_003",
        name: "AD CREATIVES PACK V.1",
        type: "DIGITAL",
        price: "R$ 997,00",
        image: "https://richardhey.com.br/wp-content/uploads/2026/01/WhatsApp-Image-2026-01-28-at-21.20.13-1.jpeg",
        status: "INSTANT_DOWNLOAD",
        tag: "ASSETS",
        rarity: "UNLIMITED"
      },
      {
        id: "DROP_005",
        name: "OVERSIZED TOTE BAG",
        type: "PHYSICAL",
        price: "R$ 749,90",
        image: "https://richardhey.com.br/wp-content/uploads/2026/01/WhatsApp-Image-2026-01-28-at-21.20.13.jpeg",
        status: "IN_STOCK",
        tag: "ESSENTIAL",
        rarity: "COMMON"
      },
      {
        id: "MYSTERY_BOX",
        name: "MYSTERY CRATE L",
        type: "HYBRID",
        price: "R$ 1.299,90",
        image: "https://images.unsplash.com/photo-1607166452427-7e94baf19a13?auto=format&fit=crop&q=80&w=1000",
        status: "LOCKED",
        tag: "SECRET",
        rarity: "EPIC"
      }
    ]
  },
  newsletter: {
    header: {
      tag: "Weekly_Data_Stream",
      title1: "GOON",
      title2: "INTEL",
      desc: "Não enviamos \"dicas\". Enviamos relatórios de inteligência de mercado, análise de tendências e oportunidades de escala antes do hype."
    },
    form: {
      label: "Input_Command: Email_Address",
      placeholder: "agente@goonprotocol.com_",
      button: "INITIALIZE_DOWNLOAD"
    }
  }
};
