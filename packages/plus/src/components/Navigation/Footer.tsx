'use client'

import { ArrowLeftDoubleIcon, ArrowRightDoubleIcon } from '@ultraviolet/icons'
import { Button, Tooltip } from '@ultraviolet/ui'
import type { RefObject } from 'react'
import { useCallback, useLayoutEffect, useMemo, useState } from 'react'
import { useNavigation } from './NavigationProvider'
import { navigationStickyFooter } from './styles.css'
import type { NavigationProps } from './types'

type FooterProps = {
  onToggleExpand: NavigationProps['onToggleExpand']
  contentRef: RefObject<HTMLDivElement | null>
}

export const Footer = ({ onToggleExpand, contentRef }: FooterProps) => {
  const { expanded, toggleExpand, locales, animation } = useNavigation()

  const isScrollAtBottom = useCallback(() => {
    if (contentRef.current) {
      if (
        contentRef.current.scrollTop + contentRef.current.offsetHeight >=
        contentRef.current.scrollHeight
      ) {
        return false
      }

      return true
    }

    return true
  }, [contentRef])

  const [footerHasOverflowStyle, setFooterHasOverflowStyle] = useState(
    isScrollAtBottom(),
  )

  // This is for detecting if there is scroll on the content and set the shadow on the footer
  useLayoutEffect(() => {
    const currentContentRef = contentRef.current

    const scroll = () => {
      const hasOverflow = isScrollAtBottom()

      if (footerHasOverflowStyle !== hasOverflow) {
        setFooterHasOverflowStyle(hasOverflow)
      }
    }

    if (currentContentRef) {
      currentContentRef.addEventListener('scroll', scroll)
    }

    return () => {
      currentContentRef?.removeEventListener('scroll', scroll)
    }
  }, [footerHasOverflowStyle, isScrollAtBottom, contentRef])

  // This will set the shadow on the footer when the component is mounted
  useLayoutEffect(() => {
    setFooterHasOverflowStyle(isScrollAtBottom())
  }, [isScrollAtBottom])

  const Icon = useMemo(
    () => (expanded ? ArrowLeftDoubleIcon : ArrowRightDoubleIcon),
    [expanded],
  )

  const label = useMemo(
    () =>
      expanded
        ? locales['navigation.collapse.button']
        : locales['navigation.expand.button'],
    [expanded, locales],
  )

  return (
    <div
      className={navigationStickyFooter({ overflow: footerHasOverflowStyle })}
    >
      <Tooltip
        disableAnimation={animation === false}
        placement="right"
        text={label}
      >
        <Button
          aria-label={label}
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
