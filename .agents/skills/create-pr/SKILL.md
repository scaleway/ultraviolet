---
name: create-pr
description: Helps create GitHub Pull Requests based on the PR template and git diff analysis. Use when the user wants to create or update a PR.
---

# Pull Request Creation

When this skill is invoked, help the user create a well-formed Pull Request description and push it to GitHub.

## Step 1 — Analyze the diff

Run `git diff` (or `git diff <base-branch>` if specified) to understand what changes were made.

Filter out noise — ignore generated/build artifacts, lockfiles, snapshots, and dist folders so the analysis focuses on meaningful source changes.

Analyze the diff to infer:

- **Scope**: Which parts of the codebase are affected (components, config, etc.)
- **Type of changes**: Feature, bugfix, refactor, chore, etc.
- **Files modified**: What packages are affected
- **Key decisions**: Why something was done a certain way, alternatives considered, trade-offs.

> ⚠️ The diff analysis is for **your understanding only**. Do **not** transcribe it into the PR description — see the anti-pattern below.

## Step 2 — Check requirements before opening a PR

If you identified that the changes in this branch are a new feature or a bugfix, there are two requirements before opening a PR:

1. there must be at least one test of the new feature or of the bug that was fixed
2. there must be a changeset added in the `.changeset` folder

If one of these requirements is not met, suggest the user add it and ask if they want to fix it or continue. When they are ready you can move on to the next step.

## Step 3 — Suggest a PR title

Before the description, propose a short PR title, reusing the name of the commit if there is only one in the branch, or following the conventional commit naming convention:

- Type: `feat`, `fix`, `refactor`, `chore`, `docs`, `test`, ...
- Scope: the name of a package or a component (`ui`, `form`, `SelectInput`, ...)
- Keep it short and human-readable.

Example: `feat(icons): add ResourceExplorer product icon`

## Step 4 — Draft the PR description

Using the diff analysis, **write a complete draft** of the PR description following the [GitHub Pull Request Template](../../../.github/pull_request_template.md).

### ⚠️ Anti-pattern: do NOT write a diff inventory

The most common mistake is turning the `The following changes were made` section (or any section) into a file-by-file or chunk-by-chunk transcription of the diff. This produces a wall of text that adds **no value** - reviewers can already read the diff.

❌ Bad (wall of text, zero value):

```
## The following changes were made:

- Set sideEffects to ["**/*.css", "**/index.js"] in packages/illustrations/package.json
- Added @ultraviolet/illustrations to examples/vite
- Updated `src/components/Header.tsx` to add a `user` prop
- Updated `package.json` to add `lodash` dependency
```

✅ Good (focus on intent and decisions):

```
## The following changes were made:

- Update the `sideEffects` config in `packages/illustrations/package.json` so rolldown init_* calls in the `_virtual` folder aren't removed
- Verify the fix by building the `vite` example project using an illustration
- Pass the current user down to `Header` so it can render the avatar without a new API call.
- Leverage `lodash` for deep-merge to avoid reimplementing edge cases.
```

**Rule of thumb:** describe _what was decided and why_, not _which lines changed_. If a reviewer could guess it just by reading the diff, don't include it.

## Step 5 — Validate the draft

After showing the draft, ask the user:

> "Does this look good, or would you like to change anything?"

If the user says it's good → go to the next step.
If the user requests changes → apply them to the draft, show the updated version, and ask again.
Repeat until the user is satisfied.

## Step 6 — Push to GitHub

Once the user approves the draft, create the PR on GitHub using the `gh` CLI, and give the user the link to the PR.

## Rules

- PR description content must be in English. The user may give input in French or English.
- Don't be verbose, get straight to the point. Keep the description as short as possible.
- Avoid repeating the same information across sections — each section should have a distinct purpose.
- Scale the description length proportionally to the diff size (small changes = short description, large changes = more detail).
- Show the draft in the conversation **before** pushing to GitHub — the user must approve first.
- When pushing to GitHub, ensure the description is properly escaped for the shell command.
- If the diff is too large or complex, focus on the most significant changes.
- **Never produce a file-by-file inventory of the diff.** Describe decisions and intent, not line-level changes.
