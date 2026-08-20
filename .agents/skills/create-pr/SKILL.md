---
name: create-pr
description: Helps create GitHub Pull Requests based on the PR template and git diff analysis. Use when the user wants to create or update a PR.
---

# Pull Request Creation

When this skill is invoked, help the user create a well-formed Pull Request description and push it to GitHub.

## Step 1 — Analyze the diff

See the git diff to understand what changes were made. Filter out noise — ignore generated/build artifacts, lockfiles, snapshots, and dist folders so the analysis focuses on meaningful source changes.

Analyze the diff to infer:

- **Scope**: Which parts of the codebase are affected (components, config, etc.)
- **Type of changes**: Feature, bugfix, refactor, chore, etc.
- **Files modified**: What packages are affected
- **Key decisions**: Why something was done a certain way, alternatives considered, trade-offs.

> ⚠️ The diff analysis is for **your understanding only**. Do **not** transcribe it into the PR description.

## Step 2 — Find relevant labels

Based on the type of changes, identify one or more label(s) to add to the PR amongst the followings (this is an exhaustive list, don't invent labels that are not in it):

- accessibility
- breaking changes
- bug
- ci
- dependencies
- documentation
- enhancement
- refactor

## Step 3 — Check requirements before opening a PR

If you identified that the changes in this branch are a new feature or a bugfix, there are two requirements before opening a PR:

1. there must be at least one test of the new feature or of the bug that was fixed
2. there must be a changeset added in the `.changeset` folder

If one of these requirements is not met, tell the user and ask them if they really want to continue. When they are ready you can move on to the next step.

## Step 4 — Find a PR title

Find a short PR title, reusing the name of the commit if there is only one in the branch, or following the conventional commit naming convention:

- Type: `feat`, `fix`, `refactor`, `chore`, `docs`, `test`, ...
- Scope: the name of a package or a component (`ui`, `form`, `SelectInput`, ...)
- Keep it short and human-readable.

Example: `feat(icons): add ResourceExplorer product icon`

## Step 5 — Draft the PR description

Using the diff analysis, **write a complete draft** of the PR description following the [GitHub Pull Request Template](../../../.github/pull_request_template.md).

## Step 6 — Validate the draft

Show the PR draft to the user with the PR title, description and label(s). Then, ask the user:

> "Does this look good, or would you like to change anything?"

If the user says it's good → go to the next step.
If the user requests changes → apply them to the draft, show the updated version, and ask again.
Repeat until the user is satisfied.

## Step 7 — Push to GitHub

Once the user approves the draft, create the PR on GitHub using the `gh` CLI, and give the user the link to the PR.

## Rules

- PR description content must be in English. The user may give input in French or English.
- Don't be verbose, get straight to the point. Keep the description as short as possible.
- Scale the description length proportionally to the diff size (small changes = short description, large changes = more detail).
- Show the draft in the conversation **before** pushing to GitHub — the user must approve first.
- If the diff is too large or complex, focus on the most significant changes.
- **Never produce a file-by-file inventory of the diff.** Describe decisions and intent, not line-level changes.
