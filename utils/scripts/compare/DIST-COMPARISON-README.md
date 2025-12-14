# Dist Migration Comparison Script

This script compares the `dist` folders across all packages in the Ultraviolet monorepo after migrating from Vite v6 to Vite v8.

## Purpose

After a major build tool migration, it's crucial to verify that:
- All packages still build successfully
- Build outputs haven't changed unexpectedly
- No files are missing or corrupted
- Bundle sizes are reasonable

## Usage

### Before Migration (Create Baseline)

```bash
# Build all packages first
pnpm run build

# Create baseline manifest
./compare-dist-migration.sh
```

This creates `dist-comparison/baseline-manifest.json` with the current state.

### After Migration (Compare)

```bash
# Build all packages with new Vite version
pnpm run build

# Compare with baseline
./compare-dist-migration.sh
```

This generates `dist-comparison/migration-comparison-report.txt` with detailed comparison results.

## Output Files

- `baseline-manifest.json`: Pre-migration state (created on first run)
- `current-manifest.json`: Current state (generated each run)
- `migration-comparison-report.txt`: Human-readable comparison report

## What It Compares

For each package:
- **File existence**: New files, missing files
- **Content changes**: Modified files (via SHA256 checksums)
- **Size changes**: File size differences
- **Structure**: Directory changes

## Example Output

```
Migration Comparison Report
Generated: Mon Dec 14 15:53:32 UTC 2025
=================================

Package: ui
  Modified files:
    index.js (1,234,567 → 1,234,890 bytes)
    styles.css (89,012 → 87,654 bytes)

Package: plus
  New files:
    components/NewComponent.js
```

## Requirements

- `jq` for JSON processing
- `shasum` for checksums (macOS) or `sha256sum` (Linux)
- `stat` for file sizes

## Integration

Consider adding this to your CI/CD pipeline:

```yaml
# In GitHub Actions or similar
- name: Build packages
  run: pnpm run build

- name: Compare dist outputs
  run: ./compare-dist-migration.sh
```