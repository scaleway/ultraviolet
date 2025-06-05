You can add `searchable` prop to the MenuV2 component to enable searching through the items.\n\n If `MenuV2.Item` has a complex children (not a string) you can specify `searchText` on `MenuV2.Item` prop to search through the item.

---

### Limitations

As we use JSX to render the UI, there are some limitations that we need to be aware of when using `searchable`.

You cannot use a middleware component within `<MenuV2>`, for example: 

```tsx
const Item = ({ name, active }: ItemProps) => (
  <MenuV2.Item sentiment="primary" active={active}>
    <Stack direction="row" gap={1} alignItems="center">
      <AvatarV2 variant="colors" colors={[]} shape="circle" size="xsmall" />
      {name}
    </Stack>
  </MenuV2.Item>
)

export const Searchable: StoryFn<typeof MenuV2> = () => (
  <MenuV2
    align="start"
    searchable
    hideOnClickItem
    disclosure={
      <Button sentiment="neutral" variant="ghost" size="small">
        <DotsHorizontalIcon />
      </Button>
    }
  >
    <Item name="Default Project" active></Item>
    <MenuV2.Group label="Projects" emptyState="No project">
      <Item name="Project 1" active={false} />
      <Item name="Project 2" active={false} />
      <Item name="Project 3" active={false} />
    </MenuV2.Group>
  </MenuV2>
)
```

This will not work with search system because the `MenuV2.Item` component is not a direct child of `<MenuV2>`. The search system expects all items to be direct children of `<MenuV2>`.
