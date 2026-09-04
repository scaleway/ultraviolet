---
name: create-pr
description: Create or update a GitHub Pull Request — analyze the diff, draft the description from the repo template, push with gh. Use when the user wants to create or update a PR.
---

# Pull Request Creation

## Step 1 — Analyze the diff

Read the git diff to understand the change. Filter out generated/build artifacts, lockfiles, snapshots, and dist folders so the analysis focuses on meaningful source changes.

Infer:

- **Scope**: which parts of the codebase are affected
- **Type**: feature, bugfix, refactor, chore, etc.
- **Key decisions**: why something was done a certain way, alternatives considered, trade-offs

## Step 2 — Pick labels

Add one or more labels from this exhaustive list, matching the type of change (don't invent others):

- accessibility
- breaking changes
- bug
- ci
- dependencies
- documentation
- enhancement
- refactor

## Step 3 — Check requirements

If this is a new feature or bugfix, two requirements must be met before opening the PR:

1. at least one test of the feature / fixed bug
2. a changeset in the `.changeset` folder

If either is missing, tell the user and confirm they want to continue.

## Step 4 — Find a title

Short, conventional-commit style: `type(scope): summary`. Reuse the commit name if the branch has one. Scope is a package or component (`ui`, `form`, `SelectInput`). Example: `feat(icons): add ResourceExplorer product icon`.

## Step 5 — Draft the description

Write a complete draft following the [GitHub Pull Request Template](../../../.github/pull_request_template.md). Scale its length to the diff: tight for a small change, fuller for a large one — and when the diff is large, cover only the significant changes.

## Step 6 — Validate

Show the draft (title, description, labels) and ask:

> "Does this look good, or would you like to change anything?"

Apply requested changes and re-show until approved. Only after approval, go to Step 7.

## Step 7 — Push

Create the PR with `gh` and give the user the link.
