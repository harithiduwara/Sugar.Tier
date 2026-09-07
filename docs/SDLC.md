# How this project is run

A deliberately small process for a small site with one developer and one owner. It exists so that
a change made six months from now is as safe as one made today.

## 1. Requirements

Work starts as a GitHub issue, using one of the two templates:

- **Content change** — a price, a photo, a cake, a piece of copy. The owner files these.
- **Bug report** — something broken or wrong on the live site.

Anything larger than a content edit gets an issue describing the outcome wanted, not the
implementation. The issue is the record of _why_; the commit is the record of _what_.

## 2. Design

Two rules decide most of it:

- Content goes in `lib/`, presentation goes in `components/`. If a change needs both, they are two
  commits.
- Nothing that requires a server. The hosting is static by choice; a feature that needs a backend
  needs a conversation about hosting first.

Architectural decisions and their reasons live in [`ARCHITECTURE.md`](ARCHITECTURE.md).

## 3. Development

- Branch from `main`. Name it by intent: `content/…`, `feat/…`, `fix/…`, `chore/…`.
- One concern per branch. A price update and a layout change do not travel together.
- Conventional Commits (`feat:`, `fix:`, `content:`, `docs:`, `chore:`).
- `main` is always deployable: it is what is live.

## 4. Quality gates

The same five checks run locally (`npm run verify`) and in CI on every push and pull request:

| Gate       | Command                | Catches                                             |
| ---------- | ---------------------- | --------------------------------------------------- |
| Formatting | `npm run format:check` | Diff noise and review churn                         |
| Lint       | `npm run lint`         | React and Next correctness rules, a11y basics       |
| Types      | `npm run typecheck`    | Strict TypeScript, including unchecked index access |
| Tests      | `npm run test`         | Content invariants and rendered behaviour           |
| Build      | `npm run build`        | Anything that only fails during static export       |

CI additionally regenerates the placeholder images and fails if the committed files differ, so the
generator and the assets cannot drift apart.

A pull request that is red does not get merged. Fix it or revert it.

## 5. Testing strategy

- **Pure logic** (`tests/lib/`) — validation, message composition, selectors, structured data.
  Fast, exhaustive, no DOM.
- **Rendered behaviour** (`tests/components/`) — what a visitor can see and do, through Testing
  Library queries by role and label. If a test needs a CSS class or an internal state name to make
  its assertion, it is testing the wrong thing.
- **Content invariants** — the catalogue tests are a safety net for content edits made by someone
  who is not a developer: a duplicated slug, a missing photo or a broken SVG fails CI instead of
  reaching the site.

New behaviour ships with a test. A bug fix ships with the test that would have caught it.

## 6. Review

Every change goes through a pull request, including content edits — the PR is where CI reports and
where the preview screenshots go. The template's checklist covers the things most often missed:
narrow viewports, alt text, and whether the prices are still true.

Self-merge is fine for content once CI is green. Code changes want a second pair of eyes.

## 7. Release and rollback

Merging to `main` deploys. There is no staging environment and no release ceremony: the site is
nine pages of static HTML.

To roll back, revert the merge commit and push — the next deployment publishes the previous state.
Because every deploy is a full static bundle, there is no migration to undo.

## 8. Maintenance

- Dependabot opens grouped dependency PRs monthly for npm and GitHub Actions. CI decides whether
  they are safe.
- Review before each wedding season: prices, lead times, opening hours, and whether the featured
  cakes still reflect current work.
- The placeholder photography is technical debt with a due date. Track it as an issue until all
  nine are real.
