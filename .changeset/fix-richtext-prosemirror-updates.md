---
"@ultraviolet/ui": patch
---

fix(RichTextInput): resolve ProseMirror dependency conflicts and test failures

Fixed critical issues with ProseMirror dependency updates from v3.0.0 to v3.2.1:

1. Added mock for `InputEvent.getTargetRanges()` in test setup to support the new beforeinput plugin in @handlewithcare/react-prosemirror@3.2.1
2. Resolved multiple prosemirror-model version conflict by adding pnpm overrides and configuration for better dependency deduplication
3. All 14 RichTextInput tests now pass successfully

The component now works correctly with:
- @handlewithcare/react-prosemirror@3.2.1
- prosemirror-model@1.25.9
- prosemirror-state@1.4.4
- prosemirror-view@1.41.9
- prosemirror-commands@1.7.1
- prosemirror-schema-list@1.5.1
- prosemirror-keymap@1.2.3
