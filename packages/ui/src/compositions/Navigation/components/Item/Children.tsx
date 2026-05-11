import { Expandable } from '../../../../components/Expandable'
import { Stack } from '../../../../components/Stack'
import { useNavigation } from '../../NavigationProvider'
import type { ItemExpandedType } from '../ComponentsTypes'
import { ItemProvider } from './ItemProvider'
import { navigationStyle } from '../../styles.css'

export const ItemChildren = ({
  noExpand,
  type,
  children,
  internalExpanded,
}: Pick<ItemExpandedType, 'noExpand' | 'type' | 'children'> & {
  internalExpanded: boolean
}) => {
  const context = useNavigation()

  if (!context) {
    throw new Error('Navigation.Item can only be used inside a NavigationProvider.')
  }

  return (
    <>
      {noExpand ? (
        <ItemProvider>
          <Stack gap={0.25} className={noExpand || type === 'pinnedGroup' ? '' : navigationStyle.itemPaddingStack}>
            {children}
          </Stack>
        </ItemProvider>
      ) : (
        <ItemProvider>
          <Expandable animationDuration={0} opened={internalExpanded}>
            <Stack gap={0.25} className={noExpand || type === 'pinnedGroup' ? '' : navigationStyle.itemPaddingStack}>
              {children}
            </Stack>
          </Expandable>
        </ItemProvider>
      )}
    </>
  )
}
