# Decision log

Short records of choices that would otherwise look arbitrary later.

## 1. Static export to GitHub Pages, not a hosted Next server

**Context.** A one-person cake studio needs a site that costs nothing to run and cannot break at
2am. Traffic is a few hundred visits a week, mostly from an Instagram bio link.

**Decision.** Export a static bundle and serve it from GitHub Pages.

**Consequences.** No API routes, no server actions, no on-demand image optimisation, no server-side
form handling. Deployment is a workflow, not an operation. Moving to Vercel later is a config
change, not a rewrite — the code is ordinary Next.js App Router.

## 2. The order form composes a message instead of submitting one

**Context.** Static hosting means there is nowhere to POST. The alternatives were a third-party
form service, a serverless function, or no form at all.

**Decision.** Validate in the browser, then hand a pre-filled message to WhatsApp, email or
Instagram.

**Consequences.** No third-party dependency, no data stored anywhere, no privacy policy to write —
and the enquiry lands in the thread the owner already answers, rather than an inbox nobody owns.
The cost is that the visitor takes one extra tap, and nothing is captured if they abandon it.

## 3. Content in typed modules rather than a CMS

**Context.** The owner needs to change prices and photos without a developer. A headless CMS adds
an account, a bill and a build hook.

**Decision.** Three typed files in `lib/`, edited through GitHub's web editor, with CI as the
guardrail.

**Consequences.** Editing needs a GitHub account and a little courage, which is a real cost. In
exchange, every edit is reviewed, tested and revertible, and the type system catches a missing
field before it reaches the site. Revisit if editing frequency ever outgrows it.

## 4. Generated placeholder photography

**Context.** The design had to be finished and reviewable before a photo shoot existed.

**Decision.** Generate nine brand-coloured illustrations at the exact 4:5 ratio the real photos
will use, from a script that can be re-run.

**Consequences.** The layout cannot shift when real photos arrive, and the placeholders read as
deliberate rather than broken. CI checks the committed files still match the generator.

## 5. Single light theme, no dark mode

**Context.** The brand is cream and gold, taken from the logo.

**Decision.** Commit to one palette rather than maintaining two.

**Consequences.** Half the colour surface to test and get right. Revisit only if the brand does.
