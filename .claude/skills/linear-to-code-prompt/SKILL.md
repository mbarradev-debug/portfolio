---
name: linear-to-code-prompt
description: >
  Fetches a Linear issue by its identifier (e.g., DBO-6) and either executes it
  directly (in Claude Code) or transforms it into a ready-to-copy prompt (in Claude.ai).
  Use this skill whenever the user mentions a Linear issue identifier, asks to "convert
  an issue to a prompt", says "get issue [ID]", or asks to "prepare a Claude Code prompt
  from Linear". Also trigger when the user specifies a project name AND an issue ID together,
  or when the user appends a flag to the command (e.g., "get issue DBO-9 --portfolio").
  Supported flags: --portfolio (activates miguel-barra-portfolio-design skill context).
  In Claude Code: fetch → analyze → classify → execute directly.
  In Claude.ai: fetch → analyze → classify → generate prompt for the user to copy.
---

# Linear → Claude Code Prompt

Transforms a Linear issue into a structured, optimized prompt for Claude Code.

---

## Flags

Commands can include optional flags that modify the behavior of the skill. Flags are appended after the issue identifier:

```
get issue <ID> [--flag]
```

| Flag | Behavior |
|---|---|
| `--portfolio` | Forces portfolio design context. Equivalent to the issue belonging to the `miguel-barra-portfolio` project. Automatically includes the `## Design system` section in the generated prompt and instructs Claude Code to read the portfolio design skill before any UI work. Takes precedence over `project.name` detection. |

**How to parse flags:** Before fetching the issue, scan the user's message for any `--` tokens after the issue identifier. Store them and apply the corresponding behavior during Step 4 (prompt generation). If no flags are present, proceed with the standard flow.

---

## Step 1 — Fetch the issue

Use `Linear:get_issue` with the identifier the user provided (e.g., `DBO-6`).
Always include relations and sub-issues:

```
Linear:get_issue(
  id: "<IDENTIFIER>",
  includeRelations: true
)
```

Then fetch comments to capture any additional context or decisions made:

```
Linear:list_comments(issueId: "<IDENTIFIER>", orderBy: "createdAt", limit: 20)
```

---

## Step 2 — Classify the issue type

Determine the task type based on labels, title, and description:

| Type          | Signals                                                       |
|---------------|---------------------------------------------------------------|
| `bug`         | Labels: bug, fix, error. Title mentions: "not working", "fails", "broken", "error" |
| `feature`     | Labels: feature, enhancement. Title: "add", "implement", "create", "new" |
| `refactor`    | Labels: refactor, tech-debt, cleanup. Title: "refactor", "improve", "migrate" |
| `chore`       | Labels: chore, infra, ci, deps. Title: "update", "bump", "upgrade" |
| `research`    | Labels: spike, research, investigation. Title: "investigate", "explore", "analyze" |

If ambiguous, use `feature` as default.

---

## Step 3 — Extract structured data

From the fetched issue, extract:

- **title**: Issue title
- **id**: Issue identifier (e.g., DBO-6)
- **type**: Classification from Step 2
- **priority**: Map numeric value → label (1=Urgent, 2=High, 3=Medium, 4=Low, 0=None)
- **status**: Current state name
- **assignee**: Name if assigned
- **description**: Full description (preserve Markdown)
- **acceptance_criteria**: Look for sections titled "Acceptance Criteria", "Definition of Done", "Criteria", "AC", checkboxes (`- [ ]`), or numbered lists at the end of the description
- **labels**: Array of label names
- **relations**: Blocked by / blocks / related issues (just identifiers + titles)
- **comments**: Relevant technical decisions or context from comments (skip administrative comments like status changes)
- **branch**: `branchName` field if present — **always capture this**; it determines whether the branch already exists or needs to be created
- **project**: project name the issue belongs to — always capture this

---

## Step 4 — Generate the Claude Code prompt

Build the prompt using the template for the detected issue type.

### General rules for all prompts:

> **Critical:** Always replace `<gitBranchName>` with the actual `gitBranchName` value from the issue (e.g., `mbarragit/dbo-9-definir-tokens-de-color-y-variables-css-del-design-system`). Never leave it as a placeholder — Claude Code will not know what branch to use.
- Write in the **same language** the issue is written in (Spanish/English/etc.)
- Be **specific and actionable** — Claude Code works best with clear directives
- Include **file path hints** only if mentioned explicitly in the issue or inferable from context
- Reference the **branch name** if available — if `branchName` is set on the issue, the branch likely already exists in the remote; instruct Claude Code to check it out rather than create it from `main`
- **Branch setup is non-negotiable**: Claude Code must complete Step 0 in full and confirm it is on `<gitBranchName>` before touching a single file. If the branch check fails, it must abort and report — never fall back to working on `main`
- List acceptance criteria as a **numbered checklist** Claude Code can tick off
- Always include a **Completion checklist** section at the end of the prompt — derive the items from the acceptance criteria of the issue, written as concrete actions. Claude Code will fill this in when done to confirm what was and wasn't completed. Use no emojis.
- Keep the prompt **self-contained** — Claude Code has no context beyond what you provide
- If the issue belongs to a project that has a **project-specific design skill**, add a "Design system" section to the prompt instructing Claude Code to read that skill before touching any UI code. See the "Project-specific skills" section below.

---

### Project-specific skills

Some projects have an associated design skill that must be consulted before implementing any UI code. When active, add a `## Design system` section to the generated prompt, placed right after `## Git setup`.

| Project / Flag | Skill path |
|---|---|
| Flag `--portfolio` | `/mnt/skills/user/miguel-barra-portfolio-design/SKILL.md` |
| `project.name` matches "Portfolio" or "miguel-barra-portfolio" (case-insensitive) | `/mnt/skills/user/miguel-barra-portfolio-design/SKILL.md` |

**How to detect (in order of precedence):**
1. **Flag present** (`--portfolio`): activate immediately — no need to check `project.name`. The flag is an explicit override.
2. **No flag**: after fetching the issue, check `project.name`. If it matches a row in the table above (case-insensitive, partial match is fine), activate the corresponding design skill.

When active, include the following section in the prompt:

```
## Design system
Before writing any UI code, read the project design skill in full:

    cat /mnt/skills/user/miguel-barra-portfolio-design/SKILL.md

All visual decisions (colors, typography, spacing, layout, motion, copy rules) must follow that skill exactly. Do not invent values, do not use defaults — the skill is the single source of truth.
```

If the issue is purely backend/infra (no UI touched), this section can be omitted — **except when `--portfolio` is passed**, in which case always include it.

---

### Template: `bug`

~~~
# Fix: <title> [<id>]

## Step 0 — Branch setup (run this first, before any file changes)

**STOP. Do not touch any file until this step is fully complete.**

The branch for this issue is: `<gitBranchName>`

### 0a — Check current state
```
git branch --show-current
git status
```

### 0b — Fetch and switch
```
git fetch origin
```

Then:
- If `<gitBranchName>` exists remotely → `git checkout <gitBranchName> && git pull origin <gitBranchName>`
- If it does not exist yet → `git checkout main && git pull origin main && git checkout -b <gitBranchName>`

### 0c — Verify (mandatory)
```
git branch --show-current
```

**If the output is `main` or anything other than `<gitBranchName>`: ABORT. Do not modify any file, do not run any command that changes code. Report the error to the user and wait for instructions.**


## Context
<1-2 sentences describing what the feature/flow is supposed to do>

## Problem
<Describe the bug: what is currently happening vs. what should happen.
Include any error messages, stack traces, or reproduction steps from the description/comments.>

## Root cause hypothesis
<If the description hints at a cause, state it. Otherwise write "Unknown — needs investigation.">

## Steps to reproduce
<List from description, or "Not provided — investigate behavior.">

## Expected behavior
<What should happen after the fix.>

## Acceptance criteria
<Numbered list from the issue, or derived from the description:>
1. ...
2. ...

## Technical notes
<Any relevant context from comments, related issues, or labels. Include branch: `<branch>` if available.>

## Task
Investigate and fix this bug. Start by reproducing the issue, identify the root cause, implement the fix, and verify all acceptance criteria are met. Do not introduce regressions.

## Completion checklist
When you finish, output a task list (no emojis) summarizing everything done. Each item must be a concrete action taken, and must be marked as completed or not completed. Derive the items directly from the acceptance criteria and any additional steps taken. Example format:

- [x] Reproduced the bug in local environment
- [x] Identified root cause in <file>
- [ ] Added regression test

## Close the cycle
Once all acceptance criteria are met and the completion checklist is filled out, run the following — in order, without skipping steps:

### 1. Stage and commit
```
git add -A
git commit -m "<type>(<id>): <title in lowercase>"
```

Use this commit message format:
- `<type>`: same as the issue type (`fix`, `feat`, `refactor`, `chore`, `docs`)
- `<id>`: issue identifier in lowercase (e.g., `dbo-9`)
- `<title>`: issue title in lowercase, max 72 chars total

Example: `chore(dbo-9): definir tokens de color y variables css del design system`

### 2. Push
```
git push origin <gitBranchName>
```

If the branch does not exist remotely yet, use:
```
git push -u origin <gitBranchName>
```

### 3. Create the PR
```
gh pr create \
  --title "<type>(<id>): <title>" \
  --body "Closes <ID>" \
  --base main \
  --head <gitBranchName>
```

If `gh` is not available, output the PR URL in this format and instruct the user to open it:
```
https://github.com/<owner>/<repo>/compare/main...<gitBranchName>?quick_pull=1
```

**Do not merge.** Push and open the PR — the user handles the merge.
~~~

---

### Template: `feature`

~~~
# Feature: <title> [<id>]

## Step 0 — Branch setup (run this first, before any file changes)

**STOP. Do not touch any file until this step is fully complete.**

The branch for this issue is: `<gitBranchName>`

### 0a — Check current state
```
git branch --show-current
git status
```

### 0b — Fetch and switch
```
git fetch origin
```

Then:
- If `<gitBranchName>` exists remotely → `git checkout <gitBranchName> && git pull origin <gitBranchName>`
- If it does not exist yet → `git checkout main && git pull origin main && git checkout -b <gitBranchName>`

### 0c — Verify (mandatory)
```
git branch --show-current
```

**If the output is `main` or anything other than `<gitBranchName>`: ABORT. Do not modify any file, do not run any command that changes code. Report the error to the user and wait for instructions.**


## Objective
<1-2 sentences describing the goal of this feature and its value.>

## Background
<Context from description: why is this needed, what problem does it solve?>

## Scope
<What must be built. Be explicit about what is IN scope and what is NOT if mentioned.>

## Acceptance criteria
1. ...
2. ...

## Technical notes
<Architecture hints, related files, dependencies, patterns to follow.
Include: branch `<branch>`, related issues, decisions from comments.>

## Task
Implement this feature according to the acceptance criteria. Follow existing code patterns and conventions. Write tests if the project has a testing setup. Keep changes focused on the described scope.

## Completion checklist
When you finish, output a task list (no emojis) summarizing everything done. Each item must be a concrete action taken, and must be marked as completed or not completed. Derive the items directly from the acceptance criteria and any additional steps taken. Example format:

- [x] Implemented <feature> in <file>
- [x] Added unit tests for <module>
- [ ] Updated documentation

## Close the cycle
Once all acceptance criteria are met and the completion checklist is filled out, run the following — in order, without skipping steps:

### 1. Stage and commit
```
git add -A
git commit -m "<type>(<id>): <title in lowercase>"
```

Use this commit message format:
- `<type>`: same as the issue type (`fix`, `feat`, `refactor`, `chore`, `docs`)
- `<id>`: issue identifier in lowercase (e.g., `dbo-9`)
- `<title>`: issue title in lowercase, max 72 chars total

Example: `chore(dbo-9): definir tokens de color y variables css del design system`

### 2. Push
```
git push origin <gitBranchName>
```

If the branch does not exist remotely yet, use:
```
git push -u origin <gitBranchName>
```

### 3. Create the PR
```
gh pr create \
  --title "<type>(<id>): <title>" \
  --body "Closes <ID>" \
  --base main \
  --head <gitBranchName>
```

If `gh` is not available, output the PR URL in this format and instruct the user to open it:
```
https://github.com/<owner>/<repo>/compare/main...<gitBranchName>?quick_pull=1
```

**Do not merge.** Push and open the PR — the user handles the merge.
~~~

---

### Template: `refactor`

~~~
# Refactor: <title> [<id>]

## Step 0 — Branch setup (run this first, before any file changes)

**STOP. Do not touch any file until this step is fully complete.**

The branch for this issue is: `<gitBranchName>`

### 0a — Check current state
```
git branch --show-current
git status
```

### 0b — Fetch and switch
```
git fetch origin
```

Then:
- If `<gitBranchName>` exists remotely → `git checkout <gitBranchName> && git pull origin <gitBranchName>`
- If it does not exist yet → `git checkout main && git pull origin main && git checkout -b <gitBranchName>`

### 0c — Verify (mandatory)
```
git branch --show-current
```

**If the output is `main` or anything other than `<gitBranchName>`: ABORT. Do not modify any file, do not run any command that changes code. Report the error to the user and wait for instructions.**


## Objective
<What is being refactored and why — performance, readability, maintainability, tech debt.>

## Current state
<Describe what exists today that needs to change.>

## Target state
<Describe what the code/system should look like after the refactor.>

## Constraints
- Behavior must not change (unless explicitly stated)
- <Any other constraints from the issue>

## Acceptance criteria
1. ...
2. ...

## Technical notes
<Relevant files, modules, dependencies. Branch: `<branch>`. Related issues.>

## Task
Perform this refactor. Ensure existing tests still pass. If no tests exist, be conservative and document the changes made. Do not add new features or fix unrelated bugs in this PR.

## Completion checklist
When you finish, output a task list (no emojis) summarizing everything done. Each item must be a concrete action taken, and must be marked as completed or not completed. Derive the items directly from the acceptance criteria and any additional steps taken. Example format:

- [x] Refactored <module> to <target state>
- [x] Verified existing tests pass
- [ ] Updated inline documentation

## Close the cycle
Once all acceptance criteria are met and the completion checklist is filled out, run the following — in order, without skipping steps:

### 1. Stage and commit
```
git add -A
git commit -m "<type>(<id>): <title in lowercase>"
```

Use this commit message format:
- `<type>`: same as the issue type (`fix`, `feat`, `refactor`, `chore`, `docs`)
- `<id>`: issue identifier in lowercase (e.g., `dbo-9`)
- `<title>`: issue title in lowercase, max 72 chars total

Example: `chore(dbo-9): definir tokens de color y variables css del design system`

### 2. Push
```
git push origin <gitBranchName>
```

If the branch does not exist remotely yet, use:
```
git push -u origin <gitBranchName>
```

### 3. Create the PR
```
gh pr create \
  --title "<type>(<id>): <title>" \
  --body "Closes <ID>" \
  --base main \
  --head <gitBranchName>
```

If `gh` is not available, output the PR URL in this format and instruct the user to open it:
```
https://github.com/<owner>/<repo>/compare/main...<gitBranchName>?quick_pull=1
```

**Do not merge.** Push and open the PR — the user handles the merge.
~~~

---

### Template: `chore`

~~~
# Chore: <title> [<id>]

## Step 0 — Branch setup (run this first, before any file changes)

**STOP. Do not touch any file until this step is fully complete.**

The branch for this issue is: `<gitBranchName>`

### 0a — Check current state
```
git branch --show-current
git status
```

### 0b — Fetch and switch
```
git fetch origin
```

Then:
- If `<gitBranchName>` exists remotely → `git checkout <gitBranchName> && git pull origin <gitBranchName>`
- If it does not exist yet → `git checkout main && git pull origin main && git checkout -b <gitBranchName>`

### 0c — Verify (mandatory)
```
git branch --show-current
```

**If the output is `main` or anything other than `<gitBranchName>`: ABORT. Do not modify any file, do not run any command that changes code. Report the error to the user and wait for instructions.**


## What needs to be done
<Direct description of the task — update, upgrade, configure, etc.>

## Why
<Reason from the issue: security patch, deprecated API, CI failure, etc.>

## Steps
<If steps are outlined in the issue, list them. Otherwise: "Follow standard procedure for this type of change.">

## Acceptance criteria
1. ...
2. ...

## Notes
<Branch: `<branch>`. Any gotchas or related issues mentioned.>

## Task
Complete this chore as described. Verify the system works correctly after the change.

## Completion checklist
When you finish, output a task list (no emojis) summarizing everything done. Each item must be a concrete action taken, and must be marked as completed or not completed. Derive the items directly from the acceptance criteria and any additional steps taken. Example format:

- [x] Updated <dependency> from <old> to <new>
- [x] Verified CI passes locally
- [ ] Reviewed changelog for breaking changes

## Close the cycle
Once all acceptance criteria are met and the completion checklist is filled out, run the following — in order, without skipping steps:

### 1. Stage and commit
```
git add -A
git commit -m "<type>(<id>): <title in lowercase>"
```

Use this commit message format:
- `<type>`: same as the issue type (`fix`, `feat`, `refactor`, `chore`, `docs`)
- `<id>`: issue identifier in lowercase (e.g., `dbo-9`)
- `<title>`: issue title in lowercase, max 72 chars total

Example: `chore(dbo-9): definir tokens de color y variables css del design system`

### 2. Push
```
git push origin <gitBranchName>
```

If the branch does not exist remotely yet, use:
```
git push -u origin <gitBranchName>
```

### 3. Create the PR
```
gh pr create \
  --title "<type>(<id>): <title>" \
  --body "Closes <ID>" \
  --base main \
  --head <gitBranchName>
```

If `gh` is not available, output the PR URL in this format and instruct the user to open it:
```
https://github.com/<owner>/<repo>/compare/main...<gitBranchName>?quick_pull=1
```

**Do not merge.** Push and open the PR — the user handles the merge.
~~~

---

### Template: `research`

~~~
# Investigation: <title> [<id>]

## Step 0 — Branch setup (run this first, before any file changes)

**STOP. Do not touch any file until this step is fully complete.**

The branch for this issue is: `<gitBranchName>`

### 0a — Check current state
```
git branch --show-current
git status
```

### 0b — Fetch and switch
```
git fetch origin
```

Then:
- If `<gitBranchName>` exists remotely → `git checkout <gitBranchName> && git pull origin <gitBranchName>`
- If it does not exist yet → `git checkout main && git pull origin main && git checkout -b <gitBranchName>`

### 0c — Verify (mandatory)
```
git branch --show-current
```

**If the output is `main` or anything other than `<gitBranchName>`: ABORT. Do not modify any file, do not run any command that changes code. Report the error to the user and wait for instructions.**


## Question / Problem
<What needs to be investigated or decided.>

## Context
<Why is this investigation needed, what triggered it.>

## Scope
<What areas to explore. What is out of scope if mentioned.>

## Expected output
<What should be produced: a recommendation, a proof of concept, a document, a decision.>

## Acceptance criteria
1. ...
2. ...

## Notes
<Branch: `<branch>`. Related issues or prior context from comments.>

## Task
Conduct this investigation. Document your findings clearly. If a PoC is needed, keep it minimal and well-commented.

## Completion checklist
When you finish, output a task list (no emojis) summarizing everything done. Each item must be a concrete action taken, and must be marked as completed or not completed. Derive the items directly from the acceptance criteria and any additional steps taken. Example format:

- [x] Investigated <area>
- [x] Documented findings in <file>
- [ ] Shared recommendation with team

## Close the cycle
Once all acceptance criteria are met and the completion checklist is filled out, run the following — in order, without skipping steps:

### 1. Stage and commit
```
git add -A
git commit -m "<type>(<id>): <title in lowercase>"
```

Use this commit message format:
- `<type>`: same as the issue type (`fix`, `feat`, `refactor`, `chore`, `docs`)
- `<id>`: issue identifier in lowercase (e.g., `dbo-9`)
- `<title>`: issue title in lowercase, max 72 chars total

Example: `chore(dbo-9): definir tokens de color y variables css del design system`

### 2. Push
```
git push origin <gitBranchName>
```

If the branch does not exist remotely yet, use:
```
git push -u origin <gitBranchName>
```

### 3. Create the PR
```
gh pr create \
  --title "<type>(<id>): <title>" \
  --body "Closes <ID>" \
  --base main \
  --head <gitBranchName>
```

If `gh` is not available, output the PR URL in this format and instruct the user to open it:
```
https://github.com/<owner>/<repo>/compare/main...<gitBranchName>?quick_pull=1
```

**Do not merge.** Push and open the PR — the user handles the merge.
~~~

---

## Step 5 — Execute or present the result

### Determine the execution context

**If running inside Claude Code** (i.e., the user typed `get issue [ID]` or similar directly in a Claude Code session):
- Do NOT output the prompt as a code block for the user to copy.
- Use the generated prompt as your internal plan and **execute it directly**: set up git, implement the changes, and produce the completion checklist at the end.
- Show a brief summary line before starting work:
  ```
  [<ID>] <Title> · Type: <type> · Priority: <priority> · Status: <status>
  ```
- Then proceed with the task without further confirmation unless something is ambiguous or blocking.

**If running inside Claude.ai** (i.e., the user wants to prepare a prompt to paste into Claude Code):
- Output the prompt in a **fenced code block** so the user can copy it directly.
- Show the summary line before the code block:
  ```
  **[<ID>] <Title>** · Type: <type> · Priority: <priority> · Status: <status>
  ```
- After the code block, add a short note if relevant:
  - If there are blocking issues, mention them: "Blocked by <ID>"
  - If the description is sparse and the prompt had to make assumptions, note what was assumed
  - If comments contain important decisions that weren't captured, flag them

---

## Edge cases

- **Issue not found**: Inform the user clearly and suggest checking the identifier and project.
- **Empty description**: Generate the prompt from the title alone, flag that context is minimal.
- **Non-technical issue** (e.g., process/meeting/design): Generate a best-effort prompt and note it may not be directly executable in Claude Code.
- **Sub-issues**: If the issue has children, note them at the end as "Related sub-tasks: <IDs>".
