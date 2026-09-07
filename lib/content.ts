import { site } from "@/lib/site";

export type Step = {
  readonly title: string;
  readonly body: string;
};

export type Faq = {
  readonly question: string;
  readonly answer: string;
};

export type Testimonial = {
  readonly quote: string;
  readonly attribution: string;
  readonly context: string;
};

export type Service = {
  readonly title: string;
  readonly body: string;
  readonly href: string;
};

/** The four things the studio sells, in the order they are pitched. */
export const services: readonly Service[] = [
  {
    title: "Wedding tiers",
    body: "Two to four tiers, structurally engineered to travel, with a tasting before you commit.",
    href: "/cakes?category=wedding",
  },
  {
    title: "Celebration cakes",
    body: "Single-tier cakes for birthdays and anniversaries, finished in buttercream or ganache.",
    href: "/cakes?category=celebration",
  },
  {
    title: "Bento & minis",
    body: "Four-inch cakes for two and boxed mini sets — hand-painted, ready in a few days.",
    href: "/cakes?category=bento",
  },
  {
    title: "Dessert tables",
    body: "A centrepiece cake plus tarts and small bakes, styled on site in one palette.",
    href: "/cakes?category=dessert-table",
  },
];

/** How an order actually runs, written so nobody has to ask what happens next. */
export const orderSteps: readonly Step[] = [
  {
    title: "Tell us about the day",
    body: "Send the date, the guest count and any picture that caught your eye. A sentence is enough to start.",
  },
  {
    title: "Design & quote",
    body: "We come back within two working days with a sketch, a flavour suggestion and a fixed quote.",
  },
  {
    title: "Taste & confirm",
    body: `Wedding orders include a tasting box. A ${site.ordering.depositPercent}% deposit holds your date.`,
  },
  {
    title: "Baked & delivered",
    body: "Everything is baked in the two days before your event, then delivered and set up by us.",
  },
];

export const promises: readonly Step[] = [
  {
    title: "Baked to order, never held",
    body: "Nothing is made in advance and frozen. Your cake is baked in the 48 hours before it is eaten.",
  },
  {
    title: "One kitchen, one pair of hands",
    body: "Every cake is designed, baked and finished by the same person. Nothing is outsourced.",
  },
  {
    title: "A quote that does not move",
    body: "The price we agree is the price you pay. Delivery inside Colombo is included in every quote.",
  },
];

export const testimonials: readonly Testimonial[] = [
  {
    quote:
      "We asked for something simple and got the most photographed object at the reception. Every guest asked who made it.",
    attribution: "Nadeesha & Ruwan",
    context: "Wedding, Mount Lavinia",
  },
  {
    quote:
      "Ordered a bento on a Tuesday for a Thursday. It arrived hand-painted with an inside joke on it and my sister cried.",
    attribution: "Aisha F.",
    context: "Birthday, Colombo 07",
  },
  {
    quote:
      "The dessert table held up through a four-hour outdoor event in April. That alone earned my repeat business.",
    attribution: "Events team, Kollupitiya",
    context: "Corporate launch",
  },
];

export const faqs: readonly Faq[] = [
  {
    question: "How far in advance should I order?",
    answer: `At least ${site.ordering.minimumLeadTimeDays} days for celebration cakes and around ${site.ordering.weddingLeadTimeWeeks} weeks for weddings. Bento cakes can sometimes be turned around in three days — ask, because a date is occasionally free.`,
  },
  {
    question: "Do you deliver?",
    answer: `Delivery within ${site.city} is included in every quote. We deliver islandwide by arrangement, charged at cost. Tiered cakes are always delivered and assembled by us rather than collected.`,
  },
  {
    question: "How do I hold my date?",
    answer: `A ${site.ordering.depositPercent}% deposit confirms the booking, with the balance due three days before delivery. Dates are held for 48 hours while you decide.`,
  },
  {
    question: "Can you work around allergies?",
    answer:
      "We bake eggless and nut-free on request, and can adapt most designs. Our kitchen handles nuts, dairy, gluten and eggs daily, so we cannot promise a cake free of traces — if an allergy is severe, please tell us first so we can be honest about whether we are the right studio.",
  },
  {
    question: "Do you do tastings?",
    answer:
      "Every wedding booking includes a tasting box of four flavours, delivered before you confirm. Tasting boxes can also be bought on their own and are credited against a booking made within a month.",
  },
  {
    question: "What does a cake cost?",
    answer:
      "The guide prices on each cake are starting points for the size shown. Final cost depends on tiers, servings and finish — sugar flowers and hand-painting take hours, fresh flowers take minutes. You get a fixed quote before anything is booked.",
  },
  {
    question: "Can you recreate a cake I found online?",
    answer:
      "We will happily use a photograph as a starting point, but we do not copy another baker's work outright. Bring the picture and we will design something in the same spirit that is yours.",
  },
];
