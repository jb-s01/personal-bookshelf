export const bio = {
  name: "Jonas Slaunwhite",
  location: "Halifax, Nova Scotia",
  headline: "Technology Manager, Data & AI — BDO Canada",
  github: "https://github.com/jb-s01",
  linkedin: "https://www.linkedin.com/in/jbslaunwhite/",
  email: "jonas.slaunwhite@gmail.com",
  intro: `Jonas Slaunwhite is a tinkering data professional in Halifax who wears two hats on purpose. He came up through accounting, alternative investments, and consulting, then taught himself Python and SQL at night until generative AI made the second career obvious. The through-line is practical: start with the business objective, then pick the technology — never the other way around.`,
  teaching:
    "He teaches Generative AI with Concordia’s John Molson Executive Centre (including the signature session Building AI Projects That Deliver) and advises founders through Saint Mary’s Growth Pod. His father was a teacher and a coach; the work still aims at the same feeling — watching someone else get the aha, then pass it on.",
  method: `With clients he uses a blunt screen: value, feasibility, and risk. Departments name the bottleneck. Value asks whether the idea actually solves it. Feasibility asks whether the team can deliver or learn fast enough. Risk covers privacy, bias, compliance, and the trust you don’t get back. “It might look good on a spreadsheet,” he says. “But if it damages trust, it is not a good idea.”`,
  taste: `The shelves make the same argument the resume does. Graham and Buffett sit with Taleb and Lowenstein — temperament and footnotes from the Citco years. The O’Reilly animals are the night school: pandas, Spark, systems, a working ML stack. Stoic paperbacks on the desk are not décor; they are the daily version of the judgment he asks leaders to use with models. Leadership titles (Grove, Horowitz, Covey, Lencioni) are how a Team Lead at BDO Digital thinks about giving the keys back.`,
  quote:
    "When you start with the problem, you eventually land on the right application. When you start with the tool, you get lost.",
} as const;

export const timeline = [
  {
    years: "2024–present",
    title: "Team Lead / Technology Manager, Data & AI",
    org: "BDO Digital / BDO Canada",
    detail:
      "Leads consulting work that connects AI initiatives to a three-to-five-year plan. Public-facing title varies between Team Lead and Technology Manager; the job is the same: judgment, delivery, and not confusing a pilot with an outcome.",
  },
  {
    years: "2023–2024",
    title: "Senior Consultant",
    org: "BDO Digital",
    detail:
      "Data platforms, AI-enabled workflows, and the unglamorous work of getting business and IT to share a language.",
  },
  {
    years: "2022–2023",
    title: "Consultant",
    org: "BDO Digital",
    detail:
      "Entered technology consulting after a decade in financial services — the moment the side craft became the job.",
  },
  {
    years: "2013–2022",
    title: "Analyst → Assistant Vice President",
    org: "Citco Fund Services",
    detail:
      "Alternative investments: valuation, operations, and leadership of teams inside a fund administrator. The risk and accounting spine of everything after.",
  },
  {
    years: "2012–2013",
    title: "Financial Advisor",
    org: "London Life",
    detail: "First desk after the degree. Insurance, people, and the start of a long apprenticeship in explaining money.",
  },
  {
    years: "2012",
    title: "Bachelor of Commerce, Accounting",
    org: "Sobey School of Business, Saint Mary’s University",
    detail:
      "The formal foundation. Python arrived later, self-taught, because a client was already using cloud ML and it was impossible to look away.",
  },
] as const;

export const skills = [
  "Python",
  "SQL",
  "Pandas",
  "Apache Spark",
  "TypeScript",
  "Next.js",
  "Ollama / local LLMs",
  "Applied finance & accounting",
  "Project leadership",
  "Responsible AI delivery",
] as const;

export const projects = [
  {
    name: "ElectroLearn",
    href: "https://github.com/jb-s01/learn_electrical_n_robotics",
    blurb: "Electronics lessons with a live circuit lab and a local Ollama tutor.",
  },
  {
    name: "Open OCR",
    href: "https://github.com/jb-s01/open_ocr",
    blurb: "Local-LLM document extraction from PDFs, built to run without a cloud key.",
  },
  {
    name: "Cosmic Crust Cruiser",
    href: "https://github.com/jb-s01/cosmic_crust_cruiser",
    blurb: "A retro pizza-delivery game written in pygame — for his son, and for the craft.",
  },
  {
    name: "Algorithmic crypto & long-only research",
    href: "https://github.com/jb-s01/algorithmic-crypto",
    blurb: "Python notebooks for market data, signals, and the humility of a backtest.",
  },
  {
    name: "wind_dash01",
    href: "https://github.com/jb-s01/wind_dash01",
    blurb: "A Plotly Dash map of the Canadian Wind Turbine Database.",
  },
] as const;
