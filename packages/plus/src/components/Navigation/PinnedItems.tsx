import { Group } from './Group'
import { Item } from './Item'
import { useNavigation } from './NavigationProvider'

export const PinnedItems = () => {
  const context = useNavigation()

  if (!context) {
    throw new Error(
      'Navigation.PinnedItems can only be used inside a Navigation',
    )
  }

  const { locales, pinnedItems } = context

  if (pinnedItems.length > 0) {
    return (
      <Group label={locales['navigation.pinned.item.group.label']}>
        {pinnedItems.map(item => (
          <Item key={item} label={item} />
        ))}
      </Group>
    )
  }

  return null
}
