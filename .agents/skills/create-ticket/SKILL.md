---
name: create-ticket
description: Create or edit Jira tickets in the DS (Design System) project using the jira CLI. Use when asked to open or update a Jira ticket.
---

# Jira Ticket Creation

Open or update Jira tickets in the **DS** project (Ultraviolet - Dev board) with the `jira` CLI. The authenticated user is the reporter.

Two traps cost the time here: the CLI **converts** your text on one path and not the other, and **link direction** is inverted from intuition. Everything else is fiddly flags.

## Step 1 — Fix the ticket shape

Decide before running anything:

- **Type** — `component` for component work, else `task`, `story`, or `bug report`.
- **Custom field** `is-this-front-end-or-design-related-?` — Infer from the ticket content, ask the user if unsure.
- **Summary** — `[SCOPE] short description`, e.g. `[Popup] implement new component`.
- **Priority** — Infer from the ticket content, ask the user if unsure.
- **Epic** — find the relevant one with `jira epic list`; ask the user if none clearly applies.

_Done when:_ you can fill the create command from memory.

## Step 2 — Write the description in the format that path stores

The CLI **converts** on `create` and stores **raw** on `edit` — each path takes a different format:

| Path           | What it does to your text                                             | Feed it                                                              |
| -------------- | --------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `issue create` | `md.ToJiraMD()` — CommonMark → Jira wiki                              | **markdown** (`## heading`, `- bullet`, `` `code` ``, `[text](url)`) |
| `issue edit`   | written to the server **verbatim** (Server shells skip the converter) | **Jira wiki** (`h2.`, `* bullet`, `{{code}}`, `[text\|url]`)         |

Mismatch symptom: wiki fed to create comes back escaped (`\{{Root.tsx}}`, `\* bullet`); markdown fed to edit is stored as literal `##`, backticks, and `(url)` text.

_Done when:_ the description is written in the format of the path you will run.

## Step 3 — Confirm the ticket with the user

Before anything writes to Jira, print the full plan and ask for explicit approval:

- **Summary** — the exact `[SCOPE] short description` line
- **Type / Priority / custom field** value
- **Epic** — epic key + name, or "none"
- **Description** — a readable preview of the formatted content (step 2)
- **Links** — every relationship you plan to add and its direction, e.g. "blocked by DS-xxxx"

Wait for a yes before running any write command. If the user asks for changes, apply them, reprint, and get a fresh yes.

_Done when:_ the user has approved the printed plan.

## Step 4 — Create the ticket

```bash
jira issue create -p DS -t <type> -s "<summary>" -y <priority> \
  -P <epic-key> \
  --custom "is-this-front-end-or-design-related-?=<scope>" \
  --template <file> --no-input
```

- `-P <epic-key>` attaches the ticket to a classic-project epic; omit it when there is no epic. If the epic is missed, `jira issue edit <KEY> -P <epic-key>` links it later.
- `--template` and `--body` are the same body — markdown converts, wiki escapes (step 2).
- `--no-input` skips prompts; supply every required field or the server rejects the create.
- The `--custom` **key is the field NAME dash-cased**, not `customfield_13429` — a wrong key is dropped with only a warning, then the create fails on the "required" field.

_Done when:_ the command prints a `DS-xxxx` key and URL — no "required" error.

## Step 5 — Link related tickets

`jira issue link <A> <B> Blocks` makes **A block B**. To record "_X is blocked by Y_", run `link <Y> <X> Blocks`. The CLI prints "linked", never the direction.

_Done when:_ you can say which ticket blocks which, the argument order matches, and you will confirm it in step 6.

## Step 6 — Verify against `raw`

`jira issue view <KEY> --raw` is **raw is truth** — the pretty `jira issue view` output runs through a buggy wiki→markdown translator (mangled links, `****` bullets) and makes good tickets look broken.

Check from the JSON:

- summary, type, and the custom field (e.g. `customfield_13429.value == "Both"`)
- `description` is clean wiki (`h2.`, `*`, `{{}}`, `[text|url]`) with no `\` escapes
- link sides from `fields.issuelinks`: viewing a ticket, `outwardIssue=<K>` means it **blocks** K; `inwardIssue=<K>` means it **is blocked by** K.

_Done when:_ the raw JSON matches the intended shape — unescaped description, required fields set, link pointing the right way.

## Reference

### Jira wiki cheat sheet

| Want                | Wiki                  |
| ------------------- | --------------------- |
| heading             | `h1.` … `h6.`         |
| bullet / sub-bullet | `* item` / `** item`  |
| numbered            | `# item`              |
| mono                | `{{code}}`            |
| bold / italic       | `*bold*` / `_italic_` |
| link                | `[label\|url]`        |

Bare `[Text]` with no `|url` renders as a broken `[](Text)`.

### The conversion trap, once

`jira issue create` always runs the body through blackfriday-confluence (CommonMark → Jira wiki); feeding it wiki markup is feeding it broken markdown, so it escapes everything into `\*` and `\{{...}}`. `jira issue edit` runs that converter only on ADF installs; this Server store is not one, so it writes your input verbatim. Same content, two formats — pick by the path (step 2).

### The `--custom` key rule

The config maps fields by `name`; the CLI derives the flag key as the name lowercased with spaces→`-` and trailing punctuation kept: "Is this Front-End or Design Related ?" → `is-this-front-end-or-design-related-?`. A field you need must exist under `issue.fields.custom` in `~/.config/.jira/.config.yml`.

### Team conventions

- Link an implementation ticket to its precursor doc/API ticket as **blocked by** the precursor.
- Component work sets the Front-End/Design field to `both`.
- Keep consumer-migration phases or follow-up work in the ticket's "Out of scope" section rather than one giant ticket.
