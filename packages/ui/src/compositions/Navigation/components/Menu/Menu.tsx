import { OrganizationDashboardCategoryIcon } from '@ultraviolet/icons/category/OrganizationDashboardCategoryIcon'
import { DotsHorizontalIcon } from '@ultraviolet/icons/DotsHorizontalIcon'
import { Children } from 'react'

import { Button } from '../../../../components/Button'
import { Menu } from '../../../../components/Menu'
import { Stack } from '../../../../components/Stack'
import { Tooltip } from '../../../../components/Tooltip'
import { navigationStyle } from '../../styles.css'
import { ItemProvider } from '../Item/ItemProvider'

import type { ItemMenuType } from '../ComponentsTypes'

export const ItemMenu = ({
  style,
  children,
  label,
  categoryIcon,
  active,
  hasActiveChildren,
  'data-flip-id': dataFlipId,
}: ItemMenuType) => (
  <Stack
    alignItems="flex-start"
    className={navigationStyle.itemMenuStack}
    gap={1}
    justifyContent="flex-start"
    style={style}
    data-flip-id={dataFlipId}
  >
    {Children.count(children) > 0 ? (
      <Menu
        className={navigationStyle.itemMenuContainer}
        disclosure={
          <Button
            aria-label={label}
            sentiment="neutral"
            size="small"
            variant={hasActiveChildren ? 'filled' : 'ghost'}
          >
            {categoryIcon ? (
              <Stack
                alignItems="center"
                direction="row"
                gap={1}
                justifyContent="center"
              >
                {categoryIcon}
              </Stack>
            ) : (
              <DotsHorizontalIcon />
            )}
          </Button>
        }
        dynamicDomRendering={false} // As we parse the children we don't need dynamic rendering
        placement="right"
        triggerMethod="hover"
      >
        <Menu.Group label={label}>
          <ItemProvider>{children}</ItemProvider>
        </Menu.Group>
      </Menu>
    ) : (
      <Tooltip placement="right" tabIndex={-1} text={label}>
        <Button
          aria-label={label}
          sentiment="neutral"
          size="small"
          variant={active ? 'filled' : 'ghost'}
        >
          <Stack
            alignItems="center"
            direction="row"
            gap={1}
            justifyContent="center"
          >
            {categoryIcon ?? (
              <OrganizationDashboardCategoryIcon
                variant={active ? 'primary' : 'neutral'}
              />
            )}
          </Stack>
        </Button>
      </Tooltip>
    )}
  </Stack>
)
