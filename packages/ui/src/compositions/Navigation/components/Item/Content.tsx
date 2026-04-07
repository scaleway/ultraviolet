import { DragIcon } from '@ultraviolet/icons/DragIcon'
import { useContext } from 'react'

import { Stack } from '../../../../components/Stack'
import { Text } from '../../../../components/Text'
import { useNavigation } from '../../NavigationProvider'
import { navigationStyle } from '../../styles.css'

import { ItemContext } from './ItemProvider'

import type { ItemExpandedType } from '../ComponentsTypes'

export const ItemContent = ({
  disabled,
  active,
  categoryIcon,
  type,
  label,
  hasActiveChildren,
  labelDescription,
  noExpand,
  subLabel,
}: Pick<
  ItemExpandedType,
  | 'disabled'
  | 'active'
  | 'categoryIcon'
  | 'type'
  | 'label'
  | 'hasActiveChildren'
  | 'labelDescription'
  | 'noExpand'
  | 'subLabel'
>) => {
  const context = useNavigation()
  if (!context) {
    throw new Error(
      'Navigation.Item can only be used inside a NavigationProvider.',
    )
  }

  const { expanded, animation } = context

  const itemProvider = useContext(ItemContext)
  const hasParents = !!itemProvider

  return (
    <Stack
      alignItems={categoryIcon ? 'flex-start' : 'center'}
      direction="row"
      gap={1}
      justifyContent="center"
    >
      {categoryIcon ? (
        <Stack
          alignItems="center"
          className={navigationStyle.itemCategoryIcon}
          justifyContent="center"
        >
          {categoryIcon}
        </Stack>
      ) : null}
      {type === 'pinned' && expanded ? (
        <DragIcon
          className={navigationStyle.itemDragIcon}
          disabled={disabled}
          prominence="default"
          sentiment="neutral"
          size="small"
        />
      ) : null}
      <Stack>
        {animation ? null : (
          <Text
            as="span"
            className={navigationStyle.itemWrapText({
              disabled,
              weak: hasActiveChildren && !noExpand && !disabled && !!active,
            })}
            data-animation={animation}
            disabled={disabled}
            prominence={
              (categoryIcon || !hasParents) && !active ? 'strong' : 'default'
            }
            sentiment={active ? 'primary' : 'neutral'}
            variant="bodySmallStrong"
            whiteSpace="pre-wrap"
          >
            {label}
            {labelDescription ? (
              <span className={navigationStyle.itemPadded}>
                {labelDescription}
              </span>
            ) : null}
          </Text>
        )}
        {subLabel && !animation ? (
          <Text
            as="span"
            className={navigationStyle.itemWrapText({
              disabled,
              weak: hasActiveChildren && !noExpand && !disabled && !!active,
            })}
            data-animation={animation}
            disabled={disabled}
            prominence="weak"
            sentiment="neutral"
            variant="caption"
            whiteSpace="pre-wrap"
          >
            {subLabel}
          </Text>
        ) : null}
      </Stack>
    </Stack>
  )
}
