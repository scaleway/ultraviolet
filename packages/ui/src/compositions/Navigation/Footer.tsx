'use client'

import { ArrowLeftDoubleIcon } from '@ultraviolet/icons/ArrowLeftDoubleIcon'
import { ArrowRightDoubleIcon } from '@ultraviolet/icons/ArrowRightDoubleIcon'
import { useMemo } from 'react'
import { Button } from '../../components/Action/Button'
import { Tooltip } from '../../components/Overlay/Tooltip'
import { useNavigation } from './NavigationProvider'
import type { NavigationProps } from './types'
import { navigationStyle } from './styles.css'

type FooterProps = {
  onToggleExpand: NavigationProps['onToggleExpand']
}

export const Footer = ({ onToggleExpand }: FooterProps) => {
  const { expanded, toggleExpand, locales } = useNavigation()

  const Icon = useMemo(() => (expanded ? ArrowLeftDoubleIcon : ArrowRightDoubleIcon), [expanded])

  const label = useMemo(
    () => (expanded ? locales['navigation.collapse.button'] : locales['navigation.expand.button']),
    [expanded, locales],
  )

  return (
    <div className={navigationStyle.stickyFooter}>
      <Tooltip placement="right" text={label}>
        <Button
          accessibleLabel={label}
          onClick={() => {
            toggleExpand()
            onToggleExpand?.(!expanded)
          }}
          sentiment="neutral"
          size="small"
          variant="ghost"
        >
          <Icon />
        </Button>
      </Tooltip>
    </div>
  )
}
