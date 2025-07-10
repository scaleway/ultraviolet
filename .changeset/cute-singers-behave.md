---
"@ultraviolet/ui": major
---
⚠️ BREAKING CHANGES

`<Menu />` children as a function is no more supported. Use `hideOnClickItem` instead.

```tsx
// Before
<Menu disclosure={<Button>Menu </Button>}>
  {({ toggle }) => <Menu.Item onClick={toggle}>Menu 1</Menu.Item>}
</Menu>

// After
<Menu disclosure={<Button>Menu </Button>} hideOnClickItem>
  <Menu.Item>Menu 1</Menu.Item>
</Menu>
```
