'use client'

import type { ReactNode } from 'react'
import { cloneElement, isValidElement } from 'react'
import { Stack } from '../Stack'
import {
  divSelectableCard,
  illustrationSelectableCard,
  imageSelectableCard,
} from './styles.css'
import type { SelectableCardProps } from './types'

export const IllustrationContainer = ({
  children: subChildren,
  productIcon,
  illustration,
}: {
  children: ReactNode
  productIcon: SelectableCardProps['productIcon']
  illustration: SelectableCardProps['illustration']
}) => {
  if (productIcon || illustration) {
    const computedIllustration = isValidElement(illustration)
      ? cloneElement(illustration, {
          style: { height: '220px', width: '220px' },
        })
      : null

    return (
      <Stack
        alignItems="stretch"
        direction="row"
        flex={1}
        justifyContent="space-between"
        width="100%"
      >
        <Stack className={illustrationSelectableCard}>{subChildren}</Stack>
        <Stack justifyContent="center">
          {productIcon ? productIcon : null}
        </Stack>

        {illustration ? (
          <div className={divSelectableCard}>
            {illustration ? (
              <div className={imageSelectableCard}>{computedIllustration}</div>
            ) : null}
          </div>
        ) : null}
      </Stack>
    )
  }

  return subChildren
}
