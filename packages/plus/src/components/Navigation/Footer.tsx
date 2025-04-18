'use client'

import styled from '@emotion/styled'
import { Button, Tooltip } from '@ultraviolet/ui'
import type { RefObject } from 'react'
import { useCallback, useEffect, useState } from 'react'
import { useNavigation } from './NavigationProvider'
import { ANIMATION_DURATION } from './constants'
import type { NavigationProps } from './types'

const StickyFooter = styled.div`
  display: flex;
  width: 100%;
  background: ${({ theme }) => theme.colors.neutral.background};
  border-top: 1px solid ${({ theme }) => theme.colors.neutral.borderWeak};
  padding: ${({ theme }) => `${theme.space['1']} ${theme.space['2']}`};
  transition: justify-content ${ANIMATION_DURATION}ms ease-in-out;
  box-shadow: ${({ theme }) => theme.shadows.defaultShadow};
  transition: box-shadow 230ms ease-in-out;
  justify-content: flex-end;

  &[data-has-overflow-style="false"] {
    box-shadow: none;
    border: none;
  }
`

type FooterProps = {
  onToggleExpand: NavigationProps['onToggleExpand']
  contentRef: RefObject<HTMLDivElement | null>
}

export const Footer = ({ onToggleExpand, contentRef }: FooterProps) => {
  const { expanded, toggleExpand, locales } = useNavigation()

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
  useEffect(() => {
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
  useEffect(() => {
    setFooterHasOverflowStyle(isScrollAtBottom())
  }, [isScrollAtBottom])

  return (
    <StickyFooter data-has-overflow-style={footerHasOverflowStyle}>
      <Tooltip
        text={
          expanded
            ? locales['navigation.collapse.button']
            : locales['navigation.expand.button']
        }
        placement="right"
      >
        <Button
          variant="ghost"
          sentiment="neutral"
          size="small"
          icon={expanded ? 'arrow-left-double' : 'arrow-right-double'}
          aria-label={
            expanded
              ? locales['navigation.collapse.button']
              : locales['navigation.expand.button']
          }
          onClick={() => {
            toggleExpand()
            onToggleExpand?.(!expanded)
          }}
        />
      </Tooltip>
    </StickyFooter>
  )
}
