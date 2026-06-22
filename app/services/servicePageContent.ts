export type ServiceSlug =
  | "performance-marketing"
  | "web-development"
  | "creative-management";

export type ServiceTheme = {
  accent: string;
  accentSoft: string;
  dark: string;
  hero: string;
  ink: string;
  page: string;
  paper: string;
  paperAlt: string;
  paperSoft: string;
};

export type ServiceStat = {
  label: string;
  value: string;
};

export type ServicePillar = {
  body: string;
  chip: string;
  title: string;
};

export type ServiceProcessStep = {
  body: string;
  step: string;
  title: string;
};

export type ServiceDeliverable = {
  body: string;
  title: string;
};

export type ServiceOutcome = {
  body: string;
  title: string;
};

export type ServiceFaq = {
  answer: string;
  question: string;
};

export type ServicePageContent = {
  audience: string;
  conciseAnswer: string;
  description: string;
  deliverables: ServiceDeliverable[];
  faq: ServiceFaq[];
  heroChips: string[];
  heroEyebrow: string;
  heroHighlight: string;
  heroTitle: string;
  keywords: string[];
  metaDescription: string;
  name: string;
  outcomes: ServiceOutcome[];
  pillars: ServicePillar[];
  primaryKeyword: string;
  process: ServiceProcessStep[];
  secondaryKeywords: string[];
  semanticKeywords: string[];
  shortName: string;
  slug: ServiceSlug;
  stats: ServiceStat[];
  summary: string;
  theme: ServiceTheme;
};

export const servicePages: ServicePageContent[] = [
  {
    slug: "performance-marketing",
    shortName: "Performance",
    name: "Performance Marketing Services",
    heroEyebrow: "Performance marketing",
    heroTitle: "Campaign systems for sharper clicks and cleaner",
    heroHighlight: "conversions.",
    description:
      "We plan, build, and refine paid campaigns that connect strategy, creative, landing pages, and measurement. The goal is not just more traffic. It is better signal, faster learning, and conversion paths that hold up under scale.",
    conciseAnswer:
      "Performance marketing services that connect paid social, paid search, landing pages, and conversion tracking into one measurable growth system.",
    metaDescription:
      "Performance marketing services for paid social, search ads, landing page optimization, AEO-aware messaging, and cleaner conversion systems.",
    audience:
      "Best for brands that need a paid media partner who can shape the message, pressure-test the funnel, and keep creative performance tied to business outcomes.",
    primaryKeyword: "performance marketing agency",
    secondaryKeywords: [
      "paid social agency",
      "PPC management services",
      "landing page optimization agency",
      "conversion rate optimization services",
    ],
    semanticKeywords: [
      "paid search advertising",
      "Meta ads management",
      "Google Ads strategy",
      "creative testing",
      "conversion tracking",
      "funnel optimization",
      "AI search marketing",
      "answer engine optimization",
    ],
    keywords: [
      "performance marketing agency",
      "performance marketing agency Bangalore",
      "PPC agency Bangalore",
      "paid social agency",
      "PPC management services",
      "conversion rate optimization",
      "landing page optimization",
      "paid search advertising",
      "AI search marketing",
      "AEO marketing strategy",
    ],
    summary:
      "Sthyra Digital helps brands tighten paid media messaging, build cleaner landing paths, and turn campaign data into weekly optimization decisions that improve acquisition quality.",
    heroChips: [
      "Paid social",
      "Search campaigns",
      "Landing page CRO",
      "AI-search aware messaging",
    ],
    stats: [
      {
        value: "Full-funnel",
        label: "media, message, and landing pages planned together",
      },
      {
        value: "Weekly signal",
        label: "creative tests and budget calls shaped by live feedback",
      },
      {
        value: "Search + social",
        label: "channel insights shared instead of trapped in silos",
      },
    ],
    pillars: [
      {
        chip: "Offer framing",
        title: "Message before media.",
        body:
          "We tighten the angle first so ads, hooks, headlines, and landing page copy all pull in the same direction.",
      },
      {
        chip: "Channel mix",
        title: "Paid systems with actual logic.",
        body:
          "Search intent, paid social creative, and retargeting flows are mapped as one journey instead of three disconnected tasks.",
      },
      {
        chip: "Conversion path",
        title: "Clicks only matter if the page closes.",
        body:
          "We shape the landing experience around speed, clarity, proof, and friction removal so the campaign has somewhere strong to land.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Map the buying motion",
        body:
          "We define the audience, funnel pressure points, offer language, and the channel mix most likely to create momentum.",
      },
      {
        step: "02",
        title: "Build the testable system",
        body:
          "Ads, landing pages, tracking, and creative variations are assembled so performance data has context from day one.",
      },
      {
        step: "03",
        title: "Read signal, not noise",
        body:
          "We review search terms, audience response, creative fatigue, and conversion behaviour together before making changes.",
      },
      {
        step: "04",
        title: "Scale what keeps proving itself",
        body:
          "Winning messages get expanded, weak links get cut, and the account evolves into a cleaner growth engine over time.",
      },
    ],
    deliverables: [
      {
        title: "Paid media roadmap",
        body:
          "A clear plan for search, paid social, testing cadence, and how each stage of the funnel should behave.",
      },
      {
        title: "Creative and copy system",
        body:
          "Hooks, ad angles, visual prompts, and conversion copy designed to make testing faster and more consistent.",
      },
      {
        title: "Landing page optimization",
        body:
          "Offer hierarchy, CTA structure, proof blocks, and content refinements built to improve conversion quality.",
      },
      {
        title: "Tracking and reporting rhythm",
        body:
          "Performance reviews that connect spend, creative, and onsite behaviour so decision-making stays grounded.",
      },
      {
        title: "Audience and retargeting flow",
        body:
          "Retargeting structure, audience layering, exclusions, and follow-up paths designed to keep warm traffic moving instead of stalling.",
      },
    ],
    outcomes: [
      {
        title: "Better learning loops",
        body:
          "Campaigns stop guessing because creative, channel, and page insights are being read together every week.",
      },
      {
        title: "Cleaner acquisition paths",
        body:
          "Search intent, paid traffic, and conversion UX are aligned, which reduces wasted motion across the funnel.",
      },
      {
        title: "More durable performance",
        body:
          "The account improves through sharper systems, not random hacks, which makes scaling far less fragile.",
      },
    ],
    faq: [
      {
        question: "Do you handle both media buying and landing page work?",
        answer:
          "Yes. The service is built around the handoff between ads and the page, because that handoff is where a lot of paid performance gets lost.",
      },
      {
        question: "Can this work for launches and always-on campaigns?",
        answer:
          "Yes. We can shape a launch burst, an always-on acquisition loop, or a hybrid plan depending on budget, offer maturity, and speed requirements.",
      },
      {
        question: "How does AI search affect performance marketing now?",
        answer:
          "It changes how people compare options and how messaging earns trust. We factor that into ad copy, landing page structure, and the broader visibility strategy.",
      },
      {
        question: "Do you build the reporting setup too, or just manage the ads?",
        answer:
          "We handle the measurement side as part of the system. That can include event planning, naming logic, reporting structure, and the review rhythm needed to actually learn from the data.",
      },
      {
        question: "What do you need from our team to get started well?",
        answer:
          "Usually access to current accounts, baseline performance context, offer details, brand inputs, and clarity on goals. From there we map the funnel, pressure-test the message, and build the test plan.",
      },
    ],
    theme: {
      page: "#f50d30",
      hero: "#f50d30",
      accent: "#ffe55a",
      accentSoft: "#ff9a76",
      dark: "#1d2236",
      ink: "#171717",
      paper: "#fff8ef",
      paperAlt: "#dff2ff",
      paperSoft: "#fff2b1",
    },
  },
  {
    slug: "web-development",
    shortName: "Web Dev",
    name: "Web Development Services",
    heroEyebrow: "Web development",
    heroTitle: "Custom websites that feel original, load fast, and",
    heroHighlight: "convert.",
    description:
      "We design and develop brand-led websites that balance expression with performance. Every build is shaped around clarity, responsiveness, technical SEO, Core Web Vitals, and a frontend experience that people actually remember.",
    conciseAnswer:
      "Web development services for brands that need custom websites with technical SEO, fast performance, and conversion-focused user journeys.",
    metaDescription:
      "Web development services for custom marketing sites, technical SEO, Core Web Vitals, landing page development, CMS builds, and conversion-focused UX.",
    audience:
      "Best for teams that need a site to work harder as a brand asset, a conversion tool, and a search-ready foundation without flattening the creative.",
    primaryKeyword: "web development agency",
    secondaryKeywords: [
      "custom website development",
      "technical SEO web development",
      "landing page development",
      "responsive website development",
    ],
    semanticKeywords: [
      "Core Web Vitals optimization",
      "Next.js development agency",
      "conversion-focused web design",
      "website information architecture",
      "semantic HTML",
      "page speed optimization",
      "CMS implementation",
      "technical SEO foundation",
    ],
    keywords: [
      "web development agency",
      "web development agency Bangalore",
      "website development company Bangalore",
      "custom website development",
      "technical SEO web development",
      "Core Web Vitals optimization",
      "landing page development",
      "conversion-focused web design",
      "responsive website development",
      "Next.js development agency",
    ],
    summary:
      "Sthyra Digital builds custom marketing websites that combine distinct visual direction with technical SEO, semantic structure, fast loading, and flexible content systems.",
    heroChips: [
      "Custom builds",
      "Technical SEO",
      "Core Web Vitals",
      "CMS-ready handoff",
    ],
    stats: [
      {
        value: "Fast by default",
        label: "performance decisions baked into layout, assets, and code",
      },
      {
        value: "Search-ready",
        label: "semantic structure, metadata, and crawlable content systems",
      },
      {
        value: "Built to edit",
        label: "clear content patterns and scalable section components",
      },
    ],
    pillars: [
      {
        chip: "Architecture",
        title: "Strong bones first.",
        body:
          "We shape the information architecture, route logic, and content hierarchy so the site is easier to navigate, grow, and rank.",
      },
      {
        chip: "Interaction",
        title: "Motion with purpose.",
        body:
          "Micro-interactions, storytelling beats, and transitions are used to reinforce the message instead of decorating empty ideas.",
      },
      {
        chip: "Performance",
        title: "Speed is part of the design.",
        body:
          "We treat loading, responsiveness, and layout stability as product decisions, not cleanup work at the end.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Shape the structure",
        body:
          "We define the sitemap, page goals, conversion routes, and content hierarchy before screens start multiplying.",
      },
      {
        step: "02",
        title: "Design the experience",
        body:
          "Wireframes grow into distinctive layouts, component systems, and interface details that still leave room for maintainability.",
      },
      {
        step: "03",
        title: "Build and optimize",
        body:
          "Frontend, CMS patterns, responsiveness, metadata, and technical SEO are developed in parallel so quality stays consistent.",
      },
      {
        step: "04",
        title: "Launch with confidence",
        body:
          "We QA across breakpoints, check performance, and make sure the site is ready for traffic, campaigns, and ongoing edits.",
      },
    ],
    deliverables: [
      {
        title: "Conversion-focused page architecture",
        body:
          "Homepage, service pages, landing pages, and supporting templates designed to guide people without feeling generic.",
      },
      {
        title: "Reusable component system",
        body:
          "Flexible sections and content blocks that let the site grow without losing visual consistency or code quality.",
      },
      {
        title: "Technical SEO foundation",
        body:
          "Metadata, semantic structure, schema support, internal linking logic, and page performance best practices built in.",
      },
      {
        title: "Editor-friendly handoff",
        body:
          "Clean content patterns, consistent styling rules, and a setup the internal team can actually work with after launch.",
      },
    ],
    outcomes: [
      {
        title: "A more memorable brand surface",
        body:
          "The site stops feeling like a placeholder and starts working like a living product for the business.",
      },
      {
        title: "Performance that supports discovery",
        body:
          "Load speed, layout stability, and crawlable content help the site hold up better in both traditional and AI-shaped search paths.",
      },
      {
        title: "A stronger system for future campaigns",
        body:
          "New pages, launches, and experiments can move faster because the foundation is already doing part of the work.",
      },
    ],
    faq: [
      {
        question: "Do you only build marketing websites?",
        answer:
          "We are strongest when the site needs to communicate clearly, convert well, and feel distinct. That includes marketing sites, launches, and brand-led landing ecosystems.",
      },
      {
        question: "Can you work with an existing design direction?",
        answer:
          "Yes. We can extend an existing brand system or develop a sharper digital expression if the current one needs more personality.",
      },
      {
        question: "How do you approach SEO on a new site build?",
        answer:
          "We handle it as part of the structure: semantic content, route planning, metadata, page speed, internal links, and search intent all shape the build from the start.",
      },
      {
        question: "Do you use AI in your web development work?",
        answer:
          "No. We do not use AI at all in this work. Strategy, design thinking, copy structure, development, and QA are handled directly so the final site stays original, intentional, and fully human-made.",
      },
      {
        question: "Will our team be able to update the site after launch?",
        answer:
          "Yes. We build with maintainability in mind, so content sections, page structure, and handoff patterns are kept clear enough for your team to manage without the site turning messy.",
      },
    ],
    theme: {
      page: "#09b7ea",
      hero: "#09b7ea",
      accent: "#ffe55a",
      accentSoft: "#7ddc62",
      dark: "#131c29",
      ink: "#171717",
      paper: "#fff8ef",
      paperAlt: "#dff2ff",
      paperSoft: "#f6f1e8",
    },
  },
  {
    slug: "creative-management",
    shortName: "Creative Mgmt",
    name: "Creative Management Services",
    heroEyebrow: "Creative management",
    heroTitle: "Creative direction and content systems that keep campaigns",
    heroHighlight: "moving.",
    description:
      "We help brands manage creative like an operating system, not a pile of disconnected assets. That means tighter briefs, stronger story direction, sharper review loops, better repurposing, and a production rhythm that can keep up with modern channels.",
    conciseAnswer:
      "Creative management services that give brands clearer direction, stronger content systems, and a more repeatable campaign production workflow.",
    metaDescription:
      "Creative management services for campaign direction, content operations, brand storytelling, repurposing systems, and AI-assisted workflows.",
    audience:
      "Best for teams with ideas, channels, and collaborators already in motion who need stronger creative leadership and cleaner production systems.",
    primaryKeyword: "creative management services",
    secondaryKeywords: [
      "creative direction agency",
      "content production management",
      "brand storytelling services",
      "social media creative management",
    ],
    semanticKeywords: [
      "short form video strategy",
      "content repurposing system",
      "campaign planning",
      "creative operations",
      "brief development",
      "review workflows",
      "AI content workflow",
      "multi-channel storytelling",
    ],
    keywords: [
      "creative management services",
      "creative management services Bangalore",
      "creative agency Bangalore",
      "creative direction agency",
      "content production management",
      "brand storytelling services",
      "social media creative management",
      "short form video strategy",
      "content repurposing system",
      "AI content workflow",
    ],
    summary:
      "Sthyra Digital helps brands organize creative direction, review language, repurposing, and content operations so campaigns move faster without losing quality or point of view.",
    heroChips: [
      "Creative direction",
      "Content ops",
      "Short-form planning",
      "Repurposing systems",
    ],
    stats: [
      {
        value: "Story-led",
        label: "campaign ideas translated into assets with a consistent point of view",
      },
      {
        value: "Channel-aware",
        label: "formats and feedback loops built around how people actually consume content",
      },
      {
        value: "Ops-friendly",
        label: "briefs, reviews, and approvals cleaned up so the work keeps moving",
      },
    ],
    pillars: [
      {
        chip: "Direction",
        title: "One clear voice across the mess.",
        body:
          "We align message, tone, references, and visual decisions so teams stop making assets that feel related only by accident.",
      },
      {
        chip: "Production",
        title: "Creative operations that breathe.",
        body:
          "Briefs, approvals, content calendars, and review loops get simplified so the process can move faster without dropping quality.",
      },
      {
        chip: "Adaptation",
        title: "Repurpose without flattening the idea.",
        body:
          "We help one strong concept travel across short-form video, paid media, landing pages, and social content without losing its edge.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Audit the creative flow",
        body:
          "We look at the current backlog, channel demands, team handoffs, and where the idea is getting diluted before it reaches the audience.",
      },
      {
        step: "02",
        title: "Tighten the story system",
        body:
          "Messaging pillars, campaign angles, references, and format rules get clarified so briefs become much easier to execute.",
      },
      {
        step: "03",
        title: "Build the production rhythm",
        body:
          "We shape a workflow for planning, review, repurposing, and approvals that fits the brand's speed and output expectations.",
      },
      {
        step: "04",
        title: "Keep quality steady at scale",
        body:
          "As content volume grows, the creative still feels intentional because the system knows what good looks like.",
      },
    ],
    deliverables: [
      {
        title: "Creative direction toolkit",
        body:
          "Messaging lanes, visual references, tone notes, and channel-specific guardrails that make better briefs possible.",
      },
      {
        title: "Content operations framework",
        body:
          "Planning cadence, approvals, roles, and asset flows designed to reduce bottlenecks across campaigns and channels.",
      },
      {
        title: "Repurposing and packaging system",
        body:
          "A method for turning one strong idea into multiple useful formats without watering down the concept.",
      },
      {
        title: "Review language and quality control",
        body:
          "Clear feedback principles so collaborators can evaluate creative faster and with fewer vague revision rounds.",
      },
    ],
    outcomes: [
      {
        title: "Better content consistency",
        body:
          "The brand voice gets easier to recognize because the underlying direction is steadier from asset to asset.",
      },
      {
        title: "Faster campaign throughput",
        body:
          "Creative teams spend less time untangling briefs and approvals, which means ideas reach market with less drag.",
      },
      {
        title: "Stronger multi-channel storytelling",
        body:
          "Launches feel more cohesive because social, web, paid, and content teams are building from the same narrative spine.",
      },
    ],
    faq: [
      {
        question: "Is this mainly for internal teams or external campaign support?",
        answer:
          "It works for both. We can help an internal team create better systems, or act as the external creative management layer across campaigns and collaborators.",
      },
      {
        question: "Can creative management include short-form and social content?",
        answer:
          "Yes. That is a major part of the work now, especially because repurposing, creator-style storytelling, and channel adaptation are central to modern campaign output.",
      },
      {
        question: "How do you use AI in creative workflows?",
        answer:
          "As support, not as the voice. AI can help with versioning, ideation, and packaging, but we keep the brand's taste, structure, and final narrative decisions human.",
      },
    ],
    theme: {
      page: "#fff8ef",
      hero: "#ff835f",
      accent: "#ff8b5e",
      accentSoft: "#c5a0ff",
      dark: "#20243b",
      ink: "#171717",
      paper: "#fff8ef",
      paperAlt: "#ffe9cf",
      paperSoft: "#f4ddff",
    },
  },
];

export function getServicePage(slug: string) {
  return servicePages.find((service) => service.slug === slug);
}
