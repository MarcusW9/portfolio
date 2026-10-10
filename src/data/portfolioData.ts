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
  problem: string;
  /** Exactly three items, each written as "Headline: detail" */
  strategy: string[];
  /** Exactly three outcomes */
  outcomes: {
    stat: string;
    label: string;
  }[];
}

export interface SideProject {
  id: string;
  label: string;
  title: string;
  hanzi: string;
  summary: string;
  /** Each written as "Headline: detail" */
  decisions: string[];
  playUrl: string;
  codeUrl: string;
  note: string;
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
    detail: "GMV since launch from Argos's first marketplace, which I led from vendor selection to go-live. It has also brought in over £1m in commission revenue."
  },
  {
    id: "savings",
    value: "£300K",
    label: "saved with an AI-built MVP",
    sublabel: "Argos Labs",
    detail: "Estimated engineering cost avoided by building an in-house partner platform in six weeks, which replaced 800 spreadsheet rows and any licence fees."
  },
  {
    id: "downloads",
    value: "160k+",
    label: "app downloads",
    sublabel: "YoungPlanet",
    detail: "A free app for parents to pass on outgrown children's items to families nearby, with more than 35,000 items listed across the UK."
  },
  {
    id: "growth",
    value: "20×",
    label: "user growth in 11 months",
    sublabel: "Mashroom",
    detail: "From under 1,000 to 20,000 landlords and tenants, after we shipped the company's first paid product."
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
    overview: "Argos wanted to grow its range without holding more stock, which meant building capabilities it had never run before: seller onboarding, product ingestion, marketplace orders and payouts.",
    problem: "The investment case ran past £20m, and more than five delivery teams each owned a piece of the flow. Taxonomy was the one area we did not compromise on, because bad category data blocks search, browse and every seller who comes after.",
    strategy: [
      "Buy over build: I wrote the procurement RFP and led the vendor evaluation, landing on Mirakl. Buying the platform gave up some control of the roadmap in exchange for launch speed.",
      "Connect sellers sooner: I pushed for iPaaS integration over a long internal build, and aligned API schemas and system behaviour with Engineering and Architecture.",
      "Settle data ownership early: I ran workshops on who owns each core flow, then cut the MVP to what launch actually needed."
    ],
    outcomes: [
      { stat: "£12m+", label: "GMV since launch" },
      { stat: "£1m+", label: "Commission revenue" },
      { stat: "20k", label: "New SKUs on Argos channels" }
    ]
  },
  {
    id: "argos-labs",
    index: "02",
    client: "SAINSBURY'S · ARGOS LABS",
    role: "Senior Product Manager · Founding member",
    title: "Build, don't buy: a partner platform in six weeks",
    summary: "As a founding member of Argos Labs, I replaced 800 spreadsheet rows with an in-house partner platform.",
    highlightMetric: "£300K",
    highlightLabel: "engineering cost avoided",
    overview: "Argos Labs is a small team Argos UK set up to solve business problems quickly with AI-led development. I joined as a founding member alongside my Marketplace role.",
    problem: "Hundreds of seller submissions arrived through forms and landed in large spreadsheets. Nobody clearly owned each stage, onboarding steps were missed and compliance tracking was manual. Commercial quotes ran to hundreds of thousands of pounds, with long integration timelines.",
    strategy: [
      "One pipeline per stage: Separate pipelines for acquisition, onboarding and account management, each with its own stages and owners.",
      "Rules that protect compliance: Progression rules and warnings stop a seller from skipping a compliance step.",
      "A single seller record: Data, files, notes and full history in one place, built by one PM and one engineer using AI for wireframes, screens and code."
    ],
    outcomes: [
      { stat: "6 weeks", label: "From brief to working MVP" },
      { stat: "£300K", label: "Estimated engineering cost avoided" },
      { stat: "£0", label: "Licence fees, fully owned in-house" }
    ]
  },
  {
    id: "youngplanet",
    index: "03",
    client: "YOUNGPLANET",
    role: "Product Lead",
    title: "Turning a free parents' app into a business",
    summary: "Growing the community, finding ways to earn from it, and taking it abroad.",
    highlightMetric: "160k+",
    highlightLabel: "app downloads",
    overview: "YoungPlanet lets parents pass on outgrown children's items to families nearby. I owned the product end to end, working day to day with the founders.",
    problem: "The app grew because it was free and useful, but the circular model left little to charge parents for. The business needed income that did not put a paywall between families, so every revenue idea was tested against one question: does it make giving and getting items any harder?",
    strategy: [
      "Free for Parents, Paid by Partners: Kept the app free for families by monetising the community instead: a £12k in-app ad contract with a consumer brand and an employer partnership with Travis Perkins reaching 40k employees.",
      "More Givers, More Listings: Grew active listings by 20% through referrals, gamified rewards for generous parents and funnel improvements that made listing an item quicker and easier.",
      "Taking it abroad: Launched in two European markets, covering translation, communications and GDPR."
    ],
    outcomes: [
      { stat: "160k+", label: "App downloads" },
      { stat: "35k+", label: "Items listed across the UK" },
      { stat: "40k", label: "Employees reached through the Travis Perkins deal" }
    ]
  },
  {
    id: "mashroom",
    index: "04",
    client: "MASHROOM",
    role: "Junior Product Manager · Second product hire",
    title: "From pre-revenue to 20,000 landlords and tenants",
    summary: "A PropTech start-up for DIY landlords with under 1,000 users and no revenue. In eleven months we shipped its first paid product and grew twentyfold.",
    highlightMetric: "20×",
    highlightLabel: "user growth in 11 months",
    overview: "Landlords liked Mashroom's free tools, but the company earned nothing from them. We needed a first paid product that fitted how self-managing landlords already worked, and enough traffic to prove it.",
    problem: "As the second product hire, I ran sprints and prioritisation for an offshore development team, worked with the CEO on the product vision and co-presented investor demos. Because deposits and repairs were payments landlords made anyway, we built the first paid products around them, then used A/B tests, user interviews and BigQuery funnel analysis to lift conversion on the deposit flow by 20%.",
    strategy: [
      "Deposit Replacement Scheme: Spread payments across the year, a clear difference from competitors, which needed FCA approval and financial integrations.",
      "Maintenance marketplace: Tenants report issues, landlords book a tradesperson in the app, and Mashroom takes a commission.",
      "Search-led growth: SEO changes that doubled the user base in a single quarter."
    ],
    outcomes: [
      { stat: "20×", label: "Users, from under 1k to 20k in 11 months" },
      { stat: "+20%", label: "Conversion on deposit replacement" },
      { stat: "500", label: "Property listings from zero" }
    ]
  }
];

export const SIDE_PROJECTS: SideProject[] = [
  {
    id: "ziling-village",
    label: "PERSONAL PROJECT · 2026",
    title: "Ziling Village",
    hanzi: "字灵村",
    summary: "A cosy browser game for learning HSK 1 Mandarin. An old calligrapher's brush spilled its magic over a Jiangnan water town, and the characters painted on its signs came alive as shy spirits. You befriend them by learning their words.",
    decisions: [
      "Support that fades: Every word moves through four mastery stages, and its pinyin fades word by word as you learn it.",
      "Reviews built into the day: Each new day's requests are built from the words that are due for review, so practice arrives as chores around the village.",
      "AI-made art, hand-directed: Every asset was generated with AI, then cut out, cleaned and placed with my own Python tools and a written set of art-direction rules."
    ],
    playUrl: "https://marcusw9.github.io/ziling-village/",
    codeUrl: "https://github.com/MarcusW9/ziling-village",
    note: "Best on desktop"
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
