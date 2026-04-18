// ─── STYLE TOKENS (used inline across all articles) ─────────────────────────
// heading     → amber-to-orange gradient  (section titles)
// stat        → cyan #22d3ee             (numbers, research citations)
// brand       → violet #a78bfa           (ZfO mentions)
// redflag     → coral #fb7185            (negative facts, red flags)
// greenflag   → emerald #34d399          (ZfO positives, solutions)
// rule        → thin amber divider line

const H = (emoji, text) =>
  `<p style="font-size:1.25em;font-weight:800;margin-top:2.5rem;margin-bottom:0.75rem;background:linear-gradient(90deg,#f59e0b,#f97316);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;letter-spacing:0.02em;">${emoji} ${text}</p>`;

const DIVIDER = `<div style="height:1px;background:linear-gradient(90deg,#f59e0b22,#f9731622,transparent);margin:2rem 0;"></div>`;

const STAT = (text) =>
  `<span style="color:#22d3ee;font-weight:700;">${text}</span>`;

const BRAND = (text) =>
  `<span style="color:#a78bfa;font-weight:700;">${text}</span>`;

const RED = (text) =>
  `<span style="color:#fb7185;font-weight:700;">${text}</span>`;

const GREEN = (text) =>
  `<span style="color:#34d399;font-weight:700;">${text}</span>`;

const BOLD = (text) =>
  `<span style="color:#f5f5f5;font-weight:700;">${text}</span>`;

// ─── HELPER: ordered list ────────────────────────────────────────────────────
const OL = (items) =>
  `<ol style="margin:0.75rem 0 1.25rem 0;padding-left:1.4rem;display:flex;flex-direction:column;gap:0.6rem;">${items
    .map((i) => `<li style="color:rgba(255,255,255,0.8);line-height:1.7;">${i}</li>`)
    .join("")}</ol>`;

// ─────────────────────────────────────────────────────────────────────────────

export const fizzPosts = [
  {
    id: 5,
    title: "We Checked The Receipt: Your Soda Is Lying To You",
    excerpt:
      "Bestie, that 'natural flavor' is a whole lie. We're exposing the sugar scam, the label manipulation, and the fake freshness corporate soda runs on.",
    date: "Jan 26, 2026",
    category: "REAL TALK",
    image: "/truth-bomb-thumbnail.webp",
    metaDescription:
      "The truth about soda ingredients. Why High Fructose Corn Syrup is a red flag and why 'Natural Flavors' aren't real. The ZfO receipt check.",
    keywords:
      "soda ingredients exposed, high fructose corn syrup truth, honest soda review, zfo ingredients",
    content: `
<p style="color:rgba(255,255,255,0.7);line-height:1.8;">Flip your soda bottle around. Read that ingredients list like it owes you money.</p>
<p style="color:rgba(255,255,255,0.7);line-height:1.8;">We'll wait.</p>

${DIVIDER}

${H("🚩", 'Red Flag 1 — "Natural Flavors" Is Corporate Speak For Nothing')}
<p style="color:rgba(255,255,255,0.75);line-height:1.8;">Here's the ${RED("legal definition")} of ${BOLD('"Natural Flavor"')} according to the ${STAT("FDA")}: any flavoring derived from a plant or animal — even if it went through ${RED("50 processing steps in a lab")} before it touched your drink.</p>
${OL([
  `That ${RED('"orange" soda')} may have never seen an orange.`,
  `That ${RED('"lemon" fizz')} — citrus content is often closer to zero than the label implies.`,
  `The word ${BOLD('"natural"')} is doing heavy lifting it hasn't earned. It's the ${RED("resume lie")} of the beverage industry.`,
])}
<p style="color:rgba(255,255,255,0.75);line-height:1.8;">${GREEN("What We Do:")} ${BRAND("ZfO")} uses actual lemon, actual spices, actual ingredients you'd recognize if you cooked with them. Nothing that reads like a science experiment.</p>

${DIVIDER}

${H("🚩", "Red Flag 2 — High Fructose Corn Syrup Is A Business Model, Not An Ingredient")}
<p style="color:rgba(255,255,255,0.75);line-height:1.8;">Why do most sodas use ${RED("HFCS")} instead of real sugar? One reason: ${RED("money")}.</p>
${OL([
  `${RED("HFCS")} is cheaper to produce and easier to blend at industrial scale.`,
  `Your body doesn't absorb it the same way as cane sugar — it bypasses the signals that tell you you're full.`,
  `So you drink more. They sell more. ${RED("This is not an accident. This is a business model.")}`,
])}
<p style="color:rgba(255,255,255,0.6);font-style:italic;border-left:3px solid #f59e0b;padding-left:1rem;margin:1.25rem 0;">A ${STAT("2004 study")} in the ${STAT("American Journal of Clinical Nutrition")} directly linked the rise of HFCS in American diets to the obesity epidemic timeline.</p>
<p style="color:rgba(255,255,255,0.75);line-height:1.8;">${GREEN("What We Do:")} We use ${GREEN("real cane sugar")}. It costs more. We don't care.</p>

${DIVIDER}

${H("🚩", "Red Flag 3 — Plastic Bottles Are Not Neutral")}
<p style="color:rgba(255,255,255,0.75);line-height:1.8;">Plastic isn't inert. At room temperature — and especially when hot — ${RED("PET plastic")} releases compounds into your drink. That slightly off taste from a plastic bottle left in a warm car? ${RED("That's not your imagination. That's chemistry.")}</p>
${OL([
  `Plastic is oxygen-permeable — your soda goes ${RED("flat faster")} through microscopic pores.`,
  `PET releases ${RED("antimony")}, a documented chemical compound, at increasing levels with heat and storage time.`,
  `You're paying full price for a drink that's already compromised before you open it.`,
])}
<p style="color:rgba(255,255,255,0.75);line-height:1.8;">${GREEN("What We Do:")} ${GREEN("Glass only. Always.")} Heavier to ship, more expensive to handle, absolutely the only right answer.</p>

${DIVIDER}

${H("🧾", "The Actual Receipt")}
${OL([
  `${RED('"Natural Flavor"')} — lab-processed extract from literally anything that once touched a plant`,
  `${RED('"No Added Sugar"')} — sweetened with alternatives that still spike insulin`,
  `${RED('"Fresh"')} — made months ago, preserved to appear fresh on shelf`,
  `${RED('"Recyclable"')} — ${STAT("91%")} of it ends up in a landfill anyway`,
  `${RED('"Serving Size: 1/3 can"')} — makes the sugar count look smaller than it is`,
])}
<p style="color:rgba(255,255,255,0.7);line-height:1.8;margin-top:1.5rem;">You're smart enough to notice when a brand is faking it. The receipt doesn't lie. If you need a chemistry degree to understand the label — put it back.</p>
`,
  },

  {
    id: 1,
    title: "Why You're Left On Read (It's Dehydration)",
    excerpt:
      "Brain fog at 3PM, bad skin, zero focus — that's not burnout. That's your body ghosting you because you haven't actually hydrated in days.",
    date: "Jan 25, 2026",
    category: "WELLNESS",
    image: "/article-1-thumbnail.webp",
    metaDescription:
      "Dehydration is killing your vibe. How staying hydrated clears your skin, boosts your focus, and gives you main character energy.",
    keywords: "hydration tips, clear skin secrets, brain fog fix, zfo benefits",
    content: `
<p style="color:rgba(255,255,255,0.7);line-height:1.8;">It's 3 PM. You've had two coffees. You're still reading the same paragraph on loop. Your brain feels like it's buffering on 2G.</p>
<p style="color:rgba(255,255,255,0.7);line-height:1.8;">Everyone says drink more water. Nobody explains what actually happens when you don't.</p>

${DIVIDER}

${H("🧠", "What Dehydration Actually Does To Your Brain")}
<p style="color:rgba(255,255,255,0.75);line-height:1.8;">Your brain is ${STAT("75% water")}. When you're even ${RED("1 to 2% dehydrated")} — before you even feel thirsty — cognitive performance measurably drops.</p>
${OL([
  `Reaction time ${RED("slows down")} noticeably before you feel thirsty.`,
  `Short-term ${RED("memory weakens")} at just 1% dehydration.`,
  `Concentration falls apart — you re-read things and absorb nothing.`,
  `Mood drops. ${RED("The irritability isn't random")} — it's physiological.`,
])}
<p style="color:rgba(255,255,255,0.6);font-style:italic;border-left:3px solid #f59e0b;padding-left:1rem;margin:1.25rem 0;">A ${STAT("2011 study")} in the ${STAT("Journal of Nutrition")} found that women with just ${RED("1.36% dehydration")} reported significantly worse mood, increased headaches, and reduced ability to concentrate.</p>
<p style="color:rgba(255,255,255,0.75);line-height:1.8;">That "I can't focus today" feeling you blame on bad sleep? Back up 6 hours. ${BOLD("What did you actually drink?")}</p>

${DIVIDER}

${H("💆", "What It Does To Your Skin — The Real Glow Up Breakdown")}
<p style="color:rgba(255,255,255,0.75);line-height:1.8;">Your skin is the ${RED("last organ to receive hydration")}. When your body runs low, it pulls water from skin cells to keep your vital organs going. Your face becomes the sacrifice zone.</p>
${OL([
  `Skin appears ${RED("dull and ashy")} — not a product issue, a water issue.`,
  `Fine lines look ${RED("deeper")} because skin cells are literally shrunken.`,
  `Under-eye circles ${RED("darken")} from poor circulation and fluid retention.`,
  `Breakouts ${RED("increase")} — dehydration triggers excess sebum production as a defence mechanism.`,
])}
<p style="color:rgba(255,255,255,0.75);line-height:1.8;">${BOLD("No serum fixes")} what a hydration deficit is causing. The skincare shelf can wait. Water comes first.</p>

${DIVIDER}

${H("⚡", "The Caffeine Trap Nobody Talks About")}
<p style="color:rgba(255,255,255,0.75);line-height:1.8;">Coffee and energy drinks don't hydrate you. They're ${RED("mild diuretics")} — they push water ${RED("out")} of your system. Every cup of coffee requires additional water just to break even on hydration.</p>
${OL([
  `You feel tired → you drink coffee.`,
  `Coffee ${RED("dehydrates")} you slightly → you feel more tired an hour later.`,
  `You drink more coffee → ${RED("the cycle repeats indefinitely")}.`,
])}
<p style="color:rgba(255,255,255,0.75);line-height:1.8;">Most people aren't addicted to caffeine. They're chasing the ${BOLD("hydration baseline they never actually have")}. That's the trap.</p>

${DIVIDER}

${H("💧", "Why ZfO Hits Different")}
<p style="color:rgba(255,255,255,0.75);line-height:1.8;">${BRAND("ZfO")} isn't trying to replace water. It's trying to make drinking something ${GREEN("actually enjoyable")} — so you actually do it.</p>
${OL([
  `${GREEN("The Fizz")} — carbonation slows your sipping pace and makes you more conscious of drinking.`,
  `${GREEN("Black Salt")} — contains trace electrolytes that help your body actually retain hydration.`,
  `${GREEN("Cumin")} — supports digestive function, which directly affects how your body uses fluids.`,
  `${GREEN("Lemon")} — real Vitamin C, real antioxidants, real flavour from a real citrus fruit.`,
])}
<p style="color:rgba(255,255,255,0.7);line-height:1.8;margin-top:1rem;">It's functional. It's real. And it doesn't taste like medicine. Drink it. Get your focus back.</p>
`,
  },

  {
    id: 2,
    title: "The OG Viral Drink (Before The Internet Existed)",
    excerpt:
      "Masala Soda was trending in India 100 years before TikTok. It's the original craft beverage, the original street cred. Here's how it got erased — and why we're bringing it back.",
    date: "Jan 24, 2026",
    category: "LORE",
    image: "/article-2-thumbnail.webp",
    metaDescription:
      "The history of Masala Soda. How it started as the OG Indian street drink and why ZfO is bringing it back.",
    keywords: "masala soda history, indian street food culture, zfo story",
    content: `
<p style="color:rgba(255,255,255,0.7);line-height:1.8;">The word "artisanal" would have made a ${STAT("19th-century Indian street vendor")} laugh.</p>
<p style="color:rgba(255,255,255,0.7);line-height:1.8;">He was already doing it. No branding. No influencers. No PR. Just ice, lemons, a secret spice blend, and a marble-stoppered glass bottle that popped like it knew you needed relief from the heat.</p>

${DIVIDER}

${H("📜", "The Origin — When The British Brought Bubbles, India Brought Flavor")}
<p style="color:rgba(255,255,255,0.75);line-height:1.8;">Carbonated water arrived in India via the British in the ${STAT("mid-1800s")}. They brought it as a digestive aid for their officers. Standard. Boring. Functional.</p>
<p style="color:rgba(255,255,255,0.75);line-height:1.8;">India took that base and did something the British had not considered — ${GREEN("made it taste like something")}.</p>
${OL([
  `Street vendors across ${STAT("Mumbai, Delhi, and Gujarat")} started with ${GREEN("kala namak")} and ${GREEN("roasted jeera")} as their base.`,
  `Fresh lime was squeezed to order. Every vendor had a different spice formula. Every formula had a loyal following.`,
  `This was the original ${BOLD("craft soda movement")}. No consultant called it that. But that's exactly what it was.`,
])}

${DIVIDER}

${H("🧊", 'The Street Setup — The Aesthetic Existed Before "Aesthetic" Was A Word')}
<p style="color:rgba(255,255,255,0.75);line-height:1.8;">Picture the cart setup that every neighbourhood knew by heart.</p>
${OL([
  `A large block of ice, ${GREEN("hand-chipped to order")} for each customer.`,
  `Fresh limes, ${GREEN("squeezed on the spot")} — not bottled, not concentrate.`,
  `The ${STAT("Goli Soda")} bottle with the marble stopper. The pop of that marble was the sound of summer.`,
  `A small brass bowl of the spice mix, measured by ${BOLD("feel — not by gram, not by machine")}.`,
])}
<p style="color:rgba(255,255,255,0.75);line-height:1.8;">Kids knew the vendor by name. Adults had preferences. This was ${BOLD("ambient, communal, cultural")}. Not a product. An experience.</p>

${DIVIDER}

${H("💀", "How Corporate Soda Killed It — Step By Step")}
<p style="color:rgba(255,255,255,0.75);line-height:1.8;">The ${STAT("1980s and 90s")} brought multinational beverage giants into India with serious money and serious distribution. The playbook unfolded in stages.</p>
${OL([
  `${RED("Undercut")} local vendors on price temporarily to break their customer base.`,
  `${RED("Build distribution")} to reach villages and tier-2 cities before locals could scale.`,
  `Make ${RED("plastic seem modern")} and aspirational. Make glass seem old and unhygienic.`,
  `Replace fresh ingredients with ${RED("concentrates, preservatives, and artificial flavouring")}.`,
  `Use enormous ${RED("advertising budgets")} to make their brand synonymous with aspiration and youth.`,
])}
<p style="color:rgba(255,255,255,0.75);line-height:1.8;">It worked. By the early 2000s, Masala Soda was considered ${RED("backward")}. A living food culture was converted into a ${RED("standardized product on a refrigerated shelf")}.</p>

${DIVIDER}

${H("🔄", "Why ZfO Is Not Being Nostalgic — It's Being Correct")}
<p style="color:rgba(255,255,255,0.75);line-height:1.8;">Nostalgia would mean making an exact replica of the street cart. That's not this.</p>
${OL([
  `The spice blend is ${GREEN("researched, tested, and sourced")} from verified suppliers — not improvised.`,
  `The ${GREEN("glass bottle is non-negotiable")} — consistent quality, zero plastic leaching.`,
  `The lemon is ${GREEN("real lemon extract")} — not citric acid regulator 330.`,
  `The result is ${GREEN("consistent every time")} — something the street cart, for all its magic, could never guarantee.`,
])}
<p style="color:rgba(255,255,255,0.7);line-height:1.8;margin-top:1rem;">The OG vendors would understand it. That's the only review ${BRAND("ZfO")} actually cares about.</p>
`,
  },

  {
    id: 3,
    title: "Plastic is a Red Flag. Glass is a Green Flag.",
    excerpt:
      "Plastic bottles give toxic ex energy — they leach chemicals, ruin the flavour, and ghost the environment. Glass is the main character. Here's why it's not even close.",
    date: "Jan 23, 2026",
    category: "VIBES",
    image: "/article-3-thumbnail.webp",
    metaDescription:
      "Why plastic bottles are toxic and why ZfO uses glass. The environmental and taste benefits of going plastic-free.",
    keywords:
      "glass vs plastic, sustainable vibes, eco friendly soda, microplastics in drinks",
    content: `
<p style="color:rgba(255,255,255,0.7);line-height:1.8;">We're going to talk about plastic honestly. Not the greenwashed version. Not the "please recycle" version that makes you feel better without changing anything.</p>
<p style="color:rgba(255,255,255,0.7);line-height:1.8;">The actual version.</p>

${DIVIDER}

${H("🧪", "What Plastic Actually Does To Your Drink")}
<p style="color:rgba(255,255,255,0.75);line-height:1.8;">${RED("PET plastic")} — the material in most bottles — is not inert. It degrades over time and especially under heat or UV exposure. When it degrades, it releases compounds into your drink.</p>
${OL([
  `A ${STAT("2019 Orb Media study")} found ${RED("microplastics in 93% of bottled water")} tested across major global brands.`,
  `Research in ${STAT("Environmental Science and Technology")} found plastics leach ${RED("antimony")} — a documented chemical concern — at levels that increase with temperature and storage time.`,
  `The ${STAT("WHO")} confirmed in ${STAT("2019")} that the average person consumes between ${RED("74,000 and 121,000 microplastic particles per year")}.`,
  `That faint ${RED("chemical aftertaste")} from a plastic bottle left in a warm car is not your imagination. That is your drink telling you something went wrong.`,
])}

${DIVIDER}

${H("📉", "What Plastic Does To The Taste — The Actual Science")}
${OL([
  `${BOLD("CO2 Permeability:")} PET plastic allows CO2 to ${RED("escape slowly")} through its walls. A plastic bottle starts going flat from the moment it's sealed. ${GREEN("Glass has zero CO2 permeability.")} What goes in, stays in.`,
  `${BOLD("Flavour Absorption:")} Plastic ${RED("absorbs aromatic compounds")} from the liquid. Your "lemon" soda tastes slightly less like lemon over time because the plastic is holding the flavour molecules.`,
  `${BOLD("Temperature Sensitivity:")} Glass holds cold temperature ${GREEN("significantly better")} than plastic. Your drink warms up faster in plastic. Warm carbonated drinks taste worse. This is physics, not opinion.`,
])}

${DIVIDER}

${H("🌍", 'The Environmental Reality — Beyond "Please Recycle"')}
<p style="color:rgba(255,255,255,0.75);line-height:1.8;">The recycling narrative around plastic has been one of the most successful ${RED("PR campaigns")} in history.</p>
${OL([
  `Only ${RED("9% of all plastic ever produced")} has been recycled, according to research by ${STAT("Roland Geyer at UC Santa Barbara in 2017")}.`,
  `Plastic doesn't biodegrade — it breaks into ${RED("microplastics")} that enter soil, waterways, and food chains.`,
  `PET bottles take ${RED("400 to 1000 years")} to fully degrade in landfill conditions.`,
  `India generates approximately ${RED("3.4 million tonnes")} of plastic waste per year, with collection and recycling infrastructure severely underdeveloped.`,
])}
<p style="color:rgba(255,255,255,0.75);line-height:1.8;">The "recycle" symbol implies responsibility has been transferred to you. It hasn't. The system isn't set up to handle the volume.</p>

${DIVIDER}

${H("✅", "Why Glass Is The Only Correct Answer")}
${OL([
  `${GREEN("Zero chemical leaching")} — glass is completely inert against everything inside it.`,
  `${GREEN("Zero CO2 permeability")} — your drink stays as fizzy as the day it was sealed.`,
  `${GREEN("Truly infinite recyclability")} — recycled glass becomes glass again, without quality loss. Plastic downcycles and eventually still ends up in landfill.`,
  `${GREEN("Better flavour retention")} — nothing is being absorbed, nothing is being released, the drink tastes exactly as intended.`,
])}
<p style="color:rgba(255,255,255,0.75);line-height:1.8;margin-top:1.5rem;">The standard ${BRAND("ZfO")} set: if we wouldn't drink from it, we don't sell it in it. That's not a marketing line. It's just a rule we don't break.</p>
`,
  },

  {
    id: 4,
    title: "Our Villain Arc: Why We Chose Violence",
    excerpt:
      "We could've made a generic cola, hired an influencer, and called it a brand. We didn't. Here's exactly why we chose to fight the $400B soda industry — and what that actually looks like.",
    date: "Jan 22, 2026",
    category: "MANIFESTO",
    image: "/article-4-thumbnail.webp",
    metaDescription:
      "The ZfO mission. Why we are fighting against generic, mass-produced sodas and building a brand for the new generation.",
    keywords:
      "zfo manifesto, startup story, founder journey, craft soda revolution, indian startup",
    content: `
<p style="color:rgba(255,255,255,0.7);line-height:1.8;">Let's be honest about how ${RED("99% of beverage companies")} start.</p>
<p style="color:rgba(255,255,255,0.7);line-height:1.8;">You call a contract flavouring manufacturer. Pick a base from a dropdown of pre-made options. Pick a bottle shape from a catalogue. Pay an influencer to hold it. Six months later you have a "brand." Or something that looks like one.</p>
<p style="color:rgba(255,255,255,0.75);line-height:1.8;">We looked at that path. ${BOLD("We said no.")}</p>

${DIVIDER}

${H("🎯", "The Problem We Actually Wanted To Solve")}
<p style="color:rgba(255,255,255,0.75);line-height:1.8;">The Indian beverage market is worth over ${STAT("$20 billion")}. The options are four categories.</p>
${OL([
  `${RED("Mass-market cola")} — artificial everything, marketing budgets larger than most startups' lifetime revenue.`,
  `${RED('"Health drinks"')} — usually tasteless or over-sweetened, wildly expensive, more supplement than drink.`,
  `${RED("Packaged juices")} — usually not real juice, full of added sugar, no carbonation.`,
  `${RED("Water")} — fine, but not a choice people get excited about.`,
])}
<p style="color:rgba(255,255,255,0.75);line-height:1.8;">The gap: a drink that tastes like its actual ingredients, is carbonated, doesn't compromise on packaging, and ${GREEN("doesn't lie on its label")}. That gap had a name — ${STAT("Masala Soda")}. India invented it. Corporate soda buried it. ${BRAND("ZfO")} is bringing it back properly.</p>

${DIVIDER}

${H("⚔️", "What Choosing Violence Actually Cost — The Real Numbers")}
${OL([
  `${BOLD("Glass Bottles Over Plastic")} — ${RED("significantly higher unit cost")} per bottle, heavier logistics, more fragile in transit, and early feedback from distribution partners calling it "inconvenient." Our answer: ${GREEN("inconvenient for who?")}`,
  `${BOLD("Real Ingredients Over Concentrates")} — sourcing ${GREEN("kala namak from verified North Indian suppliers")} instead of buying "black salt flavouring." Roasting cumin instead of using pre-ground powder. Working with ${GREEN("actual lemon extract")} instead of citric acid regulator 330. Higher cost every time. ${GREEN("Zero compromise.")}`,
  `${BOLD("No Fake Health Claims")} — we don't call ${BRAND("ZfO")} a "wellness drink" or slap ${RED('"immunity boost"')} on the label even though the ingredients carry real functional benefits. We won't manufacture a claim we can't stand fully behind.`,
])}

${DIVIDER}

${H("📣", "Who We Built This For")}
${OL([
  `The person who ${GREEN("reads the ingredients label")} before buying anything.`,
  `The person who looks at a premium product and wants to know ${GREEN("why it's premium")} — not just that it is.`,
  `The person who cares about what the packaging does to the ${GREEN("environment")} long-term.`,
  `The person who wants a drink that connects to ${GREEN("real food culture and real history")}, not an invented backstory.`,
  `The person who believes the gap between "tasty" and "honest" is a ${GREEN("false choice")} — that something can be both, and should be.`,
])}
<p style="color:rgba(255,255,255,0.75);line-height:1.8;">That person exists. We know because ${BRAND("we are that person")}.</p>

${DIVIDER}

${H("🔮", "Where We're Going")}
${OL([
  `${GREEN("No fake flavours.")} No artificial shortcuts dressed up in clean packaging.`,
  `${GREEN("No plastic.")} Full stop. Not "reduced plastic." Not "eco-friendly plastic." None.`,
  `${GREEN("No misleading labels")} or manufactured health claims we can't defend.`,
  `${GREEN("No outsourcing")} the origin story to an ad agency to make it more palatable.`,
])}
<p style="color:rgba(255,255,255,0.7);line-height:1.8;margin-top:1rem;">The villain arc is just this: we refuse to accept the constraints the industry decided were standard. We're not here to participate. ${BRAND("We're here to prove the whole premise wrong.")}</p>
`,
  },
];