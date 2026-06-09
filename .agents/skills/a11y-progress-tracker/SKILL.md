---
name: a11y-progress-tracker
description: Track and report accessibility initiative progress across your React Component Library. Monitor RGAA/WCAG compliance, component status, and generate stakeholder reports.
---

# Accessibility Progress Tracker

This skill helps you track, measure, and report on accessibility compliance progress across your entire React Component Library.

## What it does

1. **Scans all components** - Finds all `a11y.md` files in the codebase
2. **Calculates compliance metrics** - RGAA/WCAG scores, component status distribution
3. **Generates progress reports** - Dashboards, charts, stakeholder summaries
4. **Tracks improvements over time** - Historical data, trend analysis
5. **Identifies gaps** - Missing audits, low-priority components, common issues
6. **Creates roadmaps** - Prioritized action plans, sprint recommendations

## Workflow

### Step 1: Scan Component Library

Find all components and their accessibility status:

```bash
# Find all a11y.md files
find packages/ui/src/components -name "a11y.md"

# Find components without a11y.md
find packages/ui/src/components -maxdepth 2 -type f -name "index.tsx" | while read f; do
  dir=$(dirname "$f")
  if [ ! -f "$dir/a11y.md" ]; then
    echo "Missing: $dir"
  fi
done
```

**Parse each `a11y.md` for:**
- Status (✅ Compliant / ⚠️ Needs Work / ❌ Non-compliant)
- Type (Interactive / Layout / Form / Feedback / Navigation)
- RGAA criteria mentioned
- Critical issues count
- Quick check results (Keyboard, ARIA, Focus, Contrast, Screen Readers)

### Step 2: Calculate Metrics

**Compliance Score:**
```
Compliance Rate = (Compliant Components / Total Audited Components) × 100

Coverage Rate = (Audited Components / Total Components) × 100

Weighted Score = Σ(Component Priority × Status Weight) / Σ(Priorities)
  where: Compliant=100, Partial=50, Non-compliant=0
```

**RGAA Coverage:**
```
RGAA Criteria Met = (Criteria Passing / Total Applicable Criteria) × 100

Breakdown by theme:
- Images (3.x): X/Y criteria met
- Colors (3.3, 10.x): X/Y criteria met
- Scripts (7.x): X/Y criteria met
- Forms (11.x): X/Y criteria met
- Navigation (12.x): X/Y criteria met
```

**Component Status Distribution:**
```
Total Components: X
- ✅ Compliant: Y (Z%)
- ⚠️ Partial: Y (Z%)
- ❌ Non-compliant: Y (Z%)
- 📋 Not Audited: Y (Z%)
```

### Step 3: Generate Reports

**Executive Summary** (for stakeholders):

```markdown
# Accessibility Initiative Progress Report

**Date**: [Date]
**Period**: [Week/Month/Quarter]

## Key Metrics

| Metric | Current | Previous | Change |
|--------|---------|----------|--------|
| Compliance Rate | 45% | 32% | +13% ↑ |
| Coverage Rate | 78% | 65% | +13% ↑ |
| Components Audited | 61/79 | 51/79 | +10 |
| Critical Issues | 23 | 45 | -22 ↓ |

## Status Overview

- ✅ **Compliant**: 28 components (35%)
- ⚠️ **Partial**: 33 components (42%)
- ❌ **Non-compliant**: 0 components (0%)
- 📋 **Not Audited**: 18 components (23%)

## Priority Focus Areas

1. **Form Components** - 67% compliance (needs attention)
2. **Navigation** - 45% compliance (critical)
3. **Feedback** - 80% compliance (good progress)

## Achievements This Period

- ✅ Completed Modal/Dialog accessibility fix
- ✅ Implemented keyboard navigation for all menus
- ✅ Fixed color contrast in 12 components

## Next Period Goals

- [ ] Audit remaining 18 components
- [ ] Fix all P0 critical issues
- [ ] Achieve 60% compliance rate
- [ ] Complete RGAA 4.1.2 Level AA mapping
```

**Detailed Technical Report** (for developers):

```markdown
# Accessibility Technical Report

## Component Status by Category

### Layout Primitives (90% compliant)
- ✅ Stack - Compliant
- ✅ Row - Compliant
- ✅ Box - Compliant
- ⚠️ Grid - Partial (missing focus order documentation)

### Interactive Components (35% compliant)
- ⚠️ Button - Partial (needs aria-pressed documentation)
- ⚠️ Modal - Partial (focus trap needs improvement)
- ❌ Tooltip - Non-compliant (no keyboard support)
- ⚠️ Dropdown - Partial (aria-expanded missing)

### Form Components (25% compliant)
- ⚠️ Input - Partial (error announcements missing)
- ❌ Select - Non-compliant (keyboard navigation broken)
- ⚠️ Checkbox - Partial (label association unclear)

## Common Issues

| Issue | Count | Components Affected |
|-------|-------|---------------------|
| Missing keyboard handlers | 15 | Button, Modal, Tooltip... |
| Missing ARIA attributes | 12 | Dropdown, Select, Tabs... |
| Focus management issues | 8 | Modal, Dialog, Drawer... |
| Contrast issues | 5 | Badge, Status, Link... |
| Missing aria-live | 4 | Alert, Toast, Notification... |

## RGAA Criteria Status

| Criteria | Status | Components |
|----------|--------|------------|
| 7.1 - Keyboard | ⚠️ 65% | All interactive |
| 7.2 - Focus Visible | ✅ 85% | All interactive |
| 7.3 - No Traps | ✅ 90% | Modal, Dialog, Popup |
| 10.2 - Text Contrast | ✅ 95% | All text components |
| 11.1 - Form Labels | ⚠️ 60% | All form inputs |

## Sprint Recommendations

### Sprint 1 (Critical - P0)
- Fix keyboard traps in Modal/Dialog
- Add keyboard navigation to Tooltip
- Fix focus management in Dropdown

### Sprint 2 (High - P1)
- Implement ARIA live regions in Alert/Toast
- Add label associations to all form inputs
- Fix contrast issues in Badge/Status

### Sprint 3 (Medium - P2)
- Document keyboard shortcuts
- Add screen reader test coverage
- Create reusable focus trap hook
```

**Progress Chart** (visual):

```markdown
## Compliance Trend

```
Week 1: ████░░░░░░ 40%
Week 2: █████░░░░░ 50%
Week 3: ██████░░░░ 60%
Week 4: ███████░░░ 70%
```

## Coverage Trend

```
Week 1: ███░░░░░░░ 30% audited
Week 2: █████░░░░░ 50% audited
Week 3: ███████░░░ 70% audited
Week 4: █████████░ 90% audited
```
```

### Step 4: Track Over Time

**Create historical data file** (`.a11y/progress-history.json`):

```json
{
  "snapshots": [
    {
      "date": "2025-01-15",
      "totalComponents": 79,
      "auditedComponents": 61,
      "compliant": 28,
      "partial": 33,
      "nonCompliant": 0,
      "notAudited": 18,
      "complianceRate": 45,
      "coverageRate": 77,
      "criticalIssues": 23,
      "rgaaCriteriaMet": 65
    }
  ],
  "milestones": [
    {
      "date": "2025-01-01",
      "name": "Initiative Launch",
      "description": "Started accessibility audit"
    },
    {
      "date": "2025-01-15",
      "name": "50% Coverage",
      "description": "Audited 50% of components"
    }
  ]
}
```

**Update on each audit:**
- Run progress tracker after each `a11y.md` creation/update
- Compare to previous snapshot
- Highlight improvements
- Identify regressions

### Step 5: Generate Roadmaps

**Prioritized Action Plan:**

```markdown
# Accessibility Roadmap Q1 2025

## Goals

1. Achieve 70% compliance rate (currently 45%)
2. Audit 100% of components (currently 77%)
3. Fix all P0 critical issues
4. Complete RGAA 4.1.2 Level AA mapping

## Phase 1: Critical Fixes (Weeks 1-2)

**Focus**: Remove barriers for users with disabilities

- [ ] Fix keyboard traps (Modal, Dialog, Drawer)
- [ ] Add keyboard navigation (Tooltip, Dropdown, Menu)
- [ ] Implement focus management (all portal components)

**Expected Impact**: +10% compliance

## Phase 2: High Priority (Weeks 3-6)

**Focus**: Form components & navigation

- [ ] Fix all form label associations
- [ ] Implement ARIA live regions
- [ ] Fix contrast issues
- [ ] Complete keyboard navigation for all interactive components

**Expected Impact**: +15% compliance

## Phase 3: Audit Completion (Weeks 7-8)

**Focus**: Audit remaining components

- [ ] Audit 18 remaining components
- [ ] Create a11y documentation
- [ ] Generate test files
- [ ] Update Storybook parameters

**Expected Impact**: 100% coverage

## Phase 4: Polish & Documentation (Weeks 9-10)

**Focus**: Best practices & patterns

- [ ] Create reusable accessibility hooks
- [ ] Document keyboard patterns
- [ ] Add screen reader testing guide
- [ ] Update contribution guidelines

**Expected Impact**: Sustainable accessibility
```

## Commands

**Run progress scan:**
```bash
npx skills run a11y-progress-tracker --scan
```

**Generate report:**
```bash
npx skills run a11y-progress-tracker --report --period=month
```

**Update history:**
```bash
npx skills run a11y-progress-tracker --snapshot
```

**Show roadmap:**
```bash
npx skills run a11y-progress-tracker --roadmap --quarter=Q1
```

## Output Files

1. **`.a11y/progress-report.md`** - Latest progress report
2. **`.a11y/progress-history.json`** - Historical data
3. **`.a11y/roadmap.md`** - Current roadmap
4. **`.a11y/dashboard.md`** - Quick reference dashboard

## Integration

**CI/CD Integration:**
```yaml
# .github/workflows/a11y-progress.yml
name: A11Y Progress Check
on:
  push:
    paths:
      - 'packages/ui/src/components/*/a11y.md'

jobs:
  progress:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npx skills run a11y-progress-tracker --snapshot
      - uses: actions/upload-artifact@v4
        with:
          name: a11y-progress
          path: .a11y/progress-report.md
```

**Slack/Teams Notifications:**
```markdown
📊 A11Y Progress Update

✅ Compliance: 45% → 50% (+5%)
📋 Coverage: 77% → 85% (+8%)
🐛 Critical Issues: 23 → 18 (-5)

Top Improvements:
- Fixed Modal focus trap
- Added Tooltip keyboard support
- Audited 6 new components

View full report: [link]
```

## Guidelines

### Update Frequency

- **Daily**: Individual component audits
- **Weekly**: Progress snapshot, team update
- **Monthly**: Stakeholder report, roadmap review
- **Quarterly**: Initiative review, goal setting

### Metrics That Matter

**For Developers:**
- Components audited
- Critical issues fixed
- Test coverage

**For Managers:**
- Compliance rate trend
- Coverage rate
- Sprint velocity

**For Executives:**
- Risk mitigation
- Compliance timeline
- Resource needs

### Avoid Vanity Metrics

❌ Don't track:
- Total issues found (encourages padding)
- Lines of code changed
- Number of tests

✅ Do track:
- User-impacting issues fixed
- Compliance rate improvement
- Components made accessible

## Example Usage

**After auditing a component:**
```
User: "I just finished the Alert component a11y audit"

Skill: "Great! Let me update the progress tracker.

Current Status:
- Alert moved from ❌ Non-compliant to ⚠️ Partial
- Compliance rate: 45% → 46% (+1%)
- 3 critical issues remaining

Would you like me to:
1. Generate updated progress report?
2. Suggest next component to audit?
3. Create ticket for remaining Alert issues?"
```

**Weekly team sync:**
```
User: "Generate weekly progress report"

Skill: [Generates executive summary with metrics, achievements, and next goals]
```

**Planning session:**
```
User: "What should we focus on next sprint?"

Skill: [Analyzes gaps, suggests prioritized components based on:
- User impact
- Dependencies
- Effort required
- RGAA criteria coverage]
```

## Related

- `.a11y/template.md` - Audit template
- `.a11y/checklist.md` - Accessibility checklists
- `.a11y/rgaa-mapping.md` - RGAA criteria reference
- `a11y-doc-generator` skill - Generate component audits
