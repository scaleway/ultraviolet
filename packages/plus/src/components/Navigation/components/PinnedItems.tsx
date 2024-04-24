import { useNavigation } from '../NavigationProvider'
import { Item } from './Item'

export const PinnedItems = () => {
  const context = useNavigation()

  if (!context) {
    throw new Error(
      'Navigation.PinnedItems can only be used inside a NavigationProvider.',
    )
  }

  const { locales, pinnedItems, pinnedFeature } = context

  if (pinnedItems.length > 0 && pinnedFeature) {
    return (
      <Item
        label={locales['navigation.pinned.item.group.label']}
        categoryIcon="pin"
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
