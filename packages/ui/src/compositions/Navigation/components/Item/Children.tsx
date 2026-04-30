import { Expandable } from '../../../../components/Expandable'
import { Stack } from '../../../../components/Stack'
import { useNavigation } from '../../NavigationProvider'
import { navigationStyle } from '../../styles.css'

import { ItemProvider } from './ItemProvider'

import type { ItemExpandedType } from '../ComponentsTypes'

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
    throw new Error(
      'Navigation.Item can only be used inside a NavigationProvider.',
    )
  }

  const { animation, animationType, shouldAnimate } = context

  return (
    <>
      {noExpand ? (
        <ItemProvider>
          <Stack
            className={
              noExpand || type === 'pinnedGroup'
                ? ''
                : navigationStyle.itemPaddingStack({
                    hide:
                      shouldAnimate &&
                      animationType === 'complex' &&
                      animation === 'expand',
                  })
            }
          >
            {children}
          </Stack>
        </ItemProvider>
      ) : (
        <ItemProvider>
          <Expandable animationDuration={0} opened={internalExpanded}>
            <Stack
              className={
                noExpand || type === 'pinnedGroup'
                  ? ''
                  : navigationStyle.itemPaddingStack({
                      hide:
                        shouldAnimate &&
                        animationType === 'complex' &&
                        animation === 'expand',
                    })
              }
            >
              {children}
            </Stack>
          </Expandable>
        </ItemProvider>
      )}
    </>
  )
}
