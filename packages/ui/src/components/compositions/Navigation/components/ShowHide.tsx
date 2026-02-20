'use client'

// oxlint-disable eslint/max-statements

import { ArrowDownIcon } from '@ultraviolet/icons/ArrowDownIcon'
import { ArrowUpIcon } from '@ultraviolet/icons/ArrowUpIcon'
import type { CSSProperties, ReactNode } from 'react'
import { memo, useState } from 'react'
import { Button } from '../../../Button'
import { Stack } from '../../../Stack'
import { useNavigation } from '../NavigationProvider'
import { navigationShowHideStack } from './styles.css'

type ShowAllProp = {
  showContent: ReactNode
  hideContent: ReactNode
  onShowHide?: (expanded: 'show' | 'hide') => void
  disabled?: boolean
  /**
   * Add a tooltip to display on hover when the navigation is not-exanped
   */
  tooltip?: string
  'data-testid'?: string
  style?: CSSProperties
}

export const ShowHide = memo(
  ({
    showContent,
    hideContent,
    onShowHide,
    tooltip,
    'data-testid': dataTestId,
    style,
  }: ShowAllProp) => {
    const context = useNavigation()
    if (!context) {
      throw new Error(
        'Navigation.ShowAll can only be used inside a NavigationProvider.',
      )
    }
    const { expanded, showHide } = context
    const [computedShown, setIsShown] = useState(showHide === 'show')
    const onClick = () => {
      setIsShown(!computedShown)
      onShowHide?.(computedShown ? 'hide' : 'show')
    }

    if (expanded) {
      return (
        <Stack
          className={navigationShowHideStack}
          justifyContent="flex-end"
          style={style}
        >
          <Button
            data-testid={dataTestId}
            onClick={onClick}
            sentiment="primary"
            size="small"
            style={style}
            variant="ghost"
          >
            {computedShown ? hideContent : showContent}
          </Button>
        </Stack>
      )
    }

    // When the navigation is collapsed
    return (
      <Stack
        alignItems="center"
        className={navigationShowHideStack}
        justifyContent="flex-end"
        style={style}
      >
        <Button
          data-testid={dataTestId}
          onClick={onClick}
          sentiment="primary"
          size="small"
          tooltip={tooltip}
          variant="ghost"
        >
          {computedShown ? <ArrowUpIcon /> : <ArrowDownIcon />}
        </Button>
      </Stack>
    )
  },
)
