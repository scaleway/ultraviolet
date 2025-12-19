'use client'

import { OpenInNewIcon } from '@ultraviolet/icons'
import { Stack, Text } from '@ultraviolet/ui'
import { cn } from '@ultraviolet/utils'
import { assignInlineVars } from '@vanilla-extract/dynamic'
import type { CSSProperties, MouseEventHandler, ReactNode } from 'react'
import { forwardRef, useEffect, useMemo, useRef, useState } from 'react'
import { Skeleton } from './Skeleton'
import {
  activeClass,
  cardClass,
  fullHeight,
  iconContainer,
  iconStack,
  imageClass,
  subContainer,
  subContainerHeightVar,
} from './styles.css'

type ContentCardProps = {
  direction?: 'row' | 'column'
  /**
   * The image to display at the top of the card (if direction is column) or to the left of the card (if direction is row).
   * By default, the image will be cropped to fit the card.
   */
  image?: string
  /**
   * The icon the second element of the card to be displayed after the image. We allow any ReactNode but recommend
   * using `<ProductIcon>` from `@ultraviolet/icons`.
   */
  icon?: ReactNode
  subtitle?: string
  title: string
  /*
   * Define the HTML Section Heading element level (h1 - h6) to use for the header
   */
  headingTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

  description?: string
  children?: ReactNode
  /**
   * The href to link the card to. If not provided, the card will not be clickable.
   */
  href?: HTMLAnchorElement['href']
  target?: HTMLAnchorElement['target']
  onClick?: MouseEventHandler<HTMLElement>
  disabled?: boolean
  loading?: boolean
  className?: string
  style?: CSSProperties
}

/**
 * ContentCard is a component that displays a title, subtitle, description, image and icon in a card.
 * It can take different directions to display the image and the content. You can also add more content
 * by passing children.
 */
export const ContentCard = forwardRef<
  HTMLAnchorElement & HTMLButtonElement & HTMLDivElement,
  ContentCardProps
>(
  (
    {
      image,
      direction = 'column',
      icon,
      subtitle,
      title,
      headingTag = 'h3',
      description,
      children,
      href,
      target = '_blank',
      onClick,
      disabled,
      loading,
      className,
      style,
    },
    ref,
  ) => {
    const subContainerRef = useRef<HTMLDivElement>(null)
    const [subContainerHeight, setSubContainerHeight] = useState(
      subContainerRef?.current?.offsetHeight,
    )
    const Container = useMemo(() => {
      if (href) {
        return 'a'
      }

      if (onClick) {
        return 'button'
      }

      return 'div'
    }, [href, onClick])

    useEffect(
      () => setSubContainerHeight(subContainerRef?.current?.offsetHeight),
      [subContainerRef],
    )

    return (
      <Container
        className={cn(className, cardClass, onClick || href ? activeClass : '')}
        disabled={disabled}
        href={!disabled ? href : undefined}
        onClick={!disabled ? onClick : undefined}
        ref={ref}
        role={onClick && !href ? 'button' : undefined}
        style={style}
        target={target}
      >
        {loading ? (
          <Skeleton direction={direction} />
        ) : (
          <Stack className={fullHeight} direction={direction}>
            {image ? (
              <img
                alt=""
                className={imageClass[direction]}
                data-disabled={disabled}
                height={direction === 'column' ? 120 : undefined}
                src={image}
                style={assignInlineVars({
                  [subContainerHeightVar]: subContainerHeight
                    ? `${subContainerHeight.toString()}px`
                    : undefined,
                })}
                width={direction === 'row' ? 220 : undefined}
              />
            ) : null}
            <Stack direction={direction} flex={1} gap={2}>
              <Stack
                alignItems={
                  !subtitle && !description && !children ? 'center' : undefined
                }
                className={subContainer[!href ? 'noHref' : direction]}
                direction={direction}
                flex="1 1 auto"
                gap={2}
                ref={subContainerRef}
              >
                {icon ?? null}
                <Stack flex="1 1 auto" gap={2} justifyContent="space-between">
                  <Stack gap={0.5}>
                    <Stack>
                      {subtitle ? (
                        <Text
                          as="small"
                          disabled={disabled}
                          prominence="weak"
                          sentiment="neutral"
                          variant="caption"
                        >
                          {subtitle}
                        </Text>
                      ) : null}
                      <Text
                        as={headingTag}
                        disabled={disabled}
                        sentiment="neutral"
                        variant="bodyStrong"
                      >
                        {title}
                      </Text>
                    </Stack>
                    {description ? (
                      <Text
                        as="p"
                        disabled={disabled}
                        sentiment="neutral"
                        variant="bodySmall"
                      >
                        {description}
                      </Text>
                    ) : null}
                  </Stack>
                  {children ? <Stack>{children}</Stack> : null}
                </Stack>
              </Stack>
              {href ? (
                <Stack
                  alignItems={direction === 'column' ? 'flex-end' : 'center'}
                  className={iconStack[direction]}
                  direction={direction}
                  flex={1}
                  justifyContent={direction === 'column' ? 'center' : 'end'}
                >
                  <div className={iconContainer}>
                    <OpenInNewIcon disabled={disabled} sentiment="neutral" />
                  </div>
                </Stack>
              ) : null}
            </Stack>
          </Stack>
        )}
      </Container>
    )
  },
)
