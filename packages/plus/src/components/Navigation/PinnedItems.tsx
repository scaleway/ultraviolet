import { Item } from './Item'
import { useNavigation } from './NavigationProvider'

export const PinnedItems = () => {
  const context = useNavigation()

  if (!context) {
    throw new Error(
      'Navigation.PinnedItems can only be used inside a Navigation',
    )
  }

  const { locales, pinnedItems, pinnedFeature } = context

  if (pinnedItems.length > 0 && pinnedFeature) {
    return (
      <Item
        label={locales['navigation.pinned.item.group.label']}
        categoryIcon="webHosting"
        toggle={false}
        type="pinnedGroup"
      >
        {pinnedItems.map(item => (
          <Item key={item} label={item} type="pinned" />
        ))}
      </Item>
    )
  }

  return null
}
