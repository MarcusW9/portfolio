export interface MetricItem {
  id: string;
  value: string;
  label: string;
  sublabel: string;
  detail: string;
}

export interface CaseStudy {
  id: string;
  index: string;
  client: string;
  role: string;
  title: string;
  summary: string;
  highlightMetric: string;
  highlightLabel: string;
  overview: string;
  context: string;
  problem: string;
  strategy: string[];
  deliverables: string[];
  outcomes: {
    stat: string;
    label: string;
  }[];
  quote?: {
    text: string;
    author: string;
  };
}

export interface Principle {
  id: string;
  title: string;
  summary: string;
  hanzi: string;
  detail: string;
  inPractice: string;
}

export const METRICS: MetricItem[] = [
  {
    id: "gmv",
    value: "£12m+",
    label: "GMV",
    sublabel: "Argos Marketplace",
    detail: "Scaled from zero third-party sellers to a high-throughput multi-category marketplace catalogue integrated with Sainsbury's core checkout."
  },
  {
    id: "savings",
    value: "£300K",
    label: "saved with an AI-built MVP",
    sublabel: "Argos Labs",
    detail: "Replaced high-overhead SaaS evaluation and 800 spreadsheet tracker rows with a rapid in-house partner ingestion engine in 6 weeks."
  },
  {
    id: "downloads",
    value: "160k+",
    label: "app downloads",
    sublabel: "YoungPlanet",
    detail: "Engineered organic viral loops, retention gamification, and streamlined onboarding for a circular economy parenting community."
  },
  {
    id: "growth",
    value: "20×",
    label: "user growth in 11 months",
    sublabel: "Community Scale",
    detail: "Expanded user liquidity across major UK metropolitan hubs before orchestrating pilot expansion into overseas markets."
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "argos-marketplace",
    index: "01",
    client: "SAINSBURY'S · ARGOS",
    role: "Lead Product Manager",
    title: "Launching a marketplace inside a 50-year-old retailer",
    summary: "Argos had never sold third-party stock. I led the programme that gave it a seller platform, a catalogue model and a new commission revenue line.",
    highlightMetric: "£12m+",
    highlightLabel: "GMV since launch",
    overview: "Argos operates one of the UK's most beloved and complex retail logistics networks. To expand range without capital inventory risk, we conceived and executed the retailer's first 3P marketplace from ground up.",
    context: "Sainsbury's Group wanted to expand long-tail catalogue assortment in toys, home, and consumer electronics without purchasing warehouse inventory or incurring balance sheet risk.",
    problem: "Fifty years of legacy mainframe architecture, siloed stock keeping, and strict SLA fulfillment expectations meant a standard drop-in third-party marketplace would disintegrate without unified data contracts.",
    strategy: [
      "Unified Catalogue Ingestion: Designed schema normalizing 200k+ seller SKUs into Argos standard taxonomic hierarchies in minutes.",
      "Strict SLA Settlement: Embedded automated order validation and track-and-trace webhooks to safeguard brand trust.",
      "Cross-Functional Governance: Aligned 4 engineering squads, legal, supply chain operations, and commercial supplier onboarding."
    ],
    deliverables: [
      "Seller Portal MVP (Authentication, SKU mapping, Inventory sync)",
      "Real-time Catalogue Reconciliation Engine",
      "Dynamic Seller Rating & Commission Settlement Module"
    ],
    outcomes: [
      { stat: "£12m+", label: "Gross Merchandise Value within first 9 months" },
      { stat: "99.4%", label: "On-time seller dispatch fulfillment rate" },
      { stat: "340k+", label: "New unique customer orders processed" }
    ],
    quote: {
      text: "Marcus bridged 50 years of retail tradition with modern marketplace speed. The seller platform transformed how our category directors view catalogue growth.",
      author: "Director of Digital Product, Sainsbury's Tech"
    }
  },
  {
    id: "argos-labs",
    index: "02",
    client: "SAINSBURY'S · ARGOS LABS",
    role: "Founding Product Member",
    title: "Building a CRM worth six figures in six weeks",
    summary: "As a founding member of Argos Labs, I replaced 800 spreadsheet rows with an in-house partner platform.",
    highlightMetric: "£300K",
    highlightLabel: "engineering cost avoided",
    overview: "Supplier onboarding and partner compliance was trapped in fragmented spreadsheets, slow email chains, and manual PDF approvals. We built a purpose-crafted internal orchestration tool in 6 weeks using modern AI-assisted engineering.",
    context: "Commercial buyers were spending ~14 hours per week copying partner credential data and tax compliance status across disconnected ERP instances.",
    problem: "Enterprise SaaS vendors quoted £300k+ in upfront implementation fees and a 9-month delivery roadmap for what was fundamentally a state-machine data collection workflow.",
    strategy: [
      "Runnable PRDs: Wrote interactive runnable PRDs with live schemas rather than 60-page static documents.",
      "AI-Assisted Scaffolding: Leveraged LLM code gen paired with strict TypeScript validation to ship the core admin workflow in 14 days.",
      "Frictionless User Migration: Imported historical data directly from 800 messy spreadsheet rows with automated sanity verification."
    ],
    deliverables: [
      "Partner Registration & Self-Service Document Ingestion UI",
      "Automated Compliance & Sanctions Check Pipeline",
      "Audit Trail & ERP Integration Webhooks"
    ],
    outcomes: [
      { stat: "6 Weeks", label: "Idea to production go-live" },
      { stat: "£300K", label: "Third-party vendor SaaS budget conserved" },
      { stat: "82%", label: "Reduction in partner onboarding cycle time" }
    ],
    quote: {
      text: "The speed of execution was unprecedented for Sainsbury's Tech. Marcus demonstrated that high taste, sharp constraints, and AI prototyping outrun heavy legacy roadmaps.",
      author: "Head of Argos Labs Innovation"
    }
  },
  {
    id: "youngplanet",
    index: "03",
    client: "YOUNGPLANET",
    role: "Head of Product",
    title: "Turning a free parents' app into a business",
    summary: "Growing the community, finding ways to earn from it, and taking it abroad.",
    highlightMetric: "160k+",
    highlightLabel: "app downloads",
    overview: "YoungPlanet pioneered zero-waste circular exchange for parents, enabling millions of children's items to find second homes. Transitioned the product from an idealistic grant-funded prototype into an economically sustainable, venture-backed platform.",
    context: "High organic user love, but zero monetization mechanics and looming server infrastructure costs risked killing the community.",
    problem: "Introducing aggressive monetization could destroy trust and the altruistic community ethos that powered viral word-of-mouth growth.",
    strategy: [
      "Free for Parents, Paid by Partners: Kept the app free for families by monetising the community instead: a £12k in-app ad contract with a consumer brand and an employer partnership with Travis Perkins reaching 40k employees.",
      "More Givers, More Listings: Grew active listings by 20% through referrals, gamified rewards for generous parents and funnel improvements that made listing an item quicker and easier.",
      "International Expansion Playbook: Structured modular localization architectures to launch the app across international test cities."
    ],
    deliverables: [
      "Native iOS & Android UX Overhaul (React Native)",
      "In-App Ad & B2B Employer Benefit Integration",
      "Automated Geo-Clustering & Safety Moderation AI"
    ],
    outcomes: [
      { stat: "160k+", label: "Parent downloads achieved organically" },
      { stat: "5×", label: "Active monthly listings" },
      { stat: "ITV", label: "Covered for family tech innovations" }
    ],
    quote: {
      text: "Marcus preserved the heart and soul of our parent community while giving us the monetization engine and product rigor needed to scale internationally.",
      author: "Co-Founder & CEO, YoungPlanet"
    }
  }
];

export const PRINCIPLES: Principle[] = [
  {
    id: "fail-fast",
    title: "Fail fast, learn faster",
    hanzi: "試錯",
    summary: "A cheap experiment this week often teaches more than a month of research.",
    detail: "Research can reduce risk, but only up to a point: the real answer usually appears when users meet something real. I would rather run a small, low-cost test early (a clickable prototype, a landing page to test demand, a manual version of the service) than spend weeks predicting how people will behave. Each experiment either confirms the direction or shows us where not to invest, and both outcomes are useful.",
    inPractice: "Before building anything, I ask one question: what is the cheapest way to find out if this is right? At Argos Labs, that meant one PM and one engineer shipping an AI-built MVP in six weeks, instead of committing to a costly licence. Set a clear measure of success, keep the test small, then decide quickly whether to stop, change or scale."
  },
  {
    id: "listen-first",
    title: "Listen before you build",
    hanzi: "聆聽",
    summary: "AI can write the code. It cannot earn a team's trust.",
    detail: "AI has made building faster than ever, but it has not made people any easier to understand. In my opinion, most products do not fail because of the code: they fail because the team solved the wrong problem, or because the people involved never truly agreed on the right one. Empathy is not only about understanding users, but also about bringing colleagues and stakeholders to a shared view, and that is still the part no model can do for us.",
    inPractice: "Talk to the people who will use it (and watch them work) before writing a single prompt. At YoungPlanet, parents came to pass on items to other families for free, so charging them would have broken the reason the community existed. We tested every revenue idea against one question: does it make giving and getting items any harder? Listening to employers as well led us to the answer, because they wanted a family perk for their staff and the community was already there."
  },
  {
    id: "business-case",
    title: "Own the business case",
    hanzi: "取捨",
    summary: "AI can build almost anything. Deciding what is worth building is still ours.",
    detail: "Now that AI takes on more of the building, I believe product management is closer to the business than ever before. The questions that matter most are commercial ones: where the revenue comes from, what it costs to get there, and which trade-offs the business can live with. AI can model the options, but it cannot own the decision (or the consequences of getting it wrong).",
    inPractice: "Start with the numbers, then the features. On the Argos Marketplace, I prepared the vendor cost estimates behind director-level business cases for an investment of over £20m. We chose to buy the platform rather than build it, trading some control of the roadmap for launch speed, and it has since delivered over £12m in GMV and £1m in commission revenue."
  }
];
