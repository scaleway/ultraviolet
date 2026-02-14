'use client'

import { cn } from '@ultraviolet/utils'
import { forwardRef, useEffect, useMemo, useRef, useState } from 'react'
import { Stack } from '../../Stack'
import { CardContent, ImageContent, LinkContent } from './Content'
import { Skeleton } from './Skeleton'
import { cardClass, fullHeight, subContainer } from './styles.css'
import type { ContentCardProps } from './type'

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
      subContainerRef?.current?.offsetHeight
        ? `${subContainerRef?.current?.offsetHeight}px`
        : 'none',
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

    useEffect(() => {
      if (subContainerRef?.current?.offsetHeight) {
        setSubContainerHeight(`${subContainerRef?.current?.offsetHeight}px`)
      }
    }, [subContainerRef])

    return (
      <Container
        className={cn(className, cardClass({ active: !!(onClick || href) }))}
        disabled={disabled}
        href={disabled ? undefined : href}
        onClick={disabled ? undefined : onClick}
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
              <ImageContent
                direction={direction}
                disabled={disabled}
                image={image}
                subContainerHeight={subContainerHeight}
              />
            ) : null}
            <Stack direction={direction} flex={1} gap={2}>
              <Stack
                alignItems={
                  subtitle || description || children ? undefined : 'center'
                }
                className={subContainer[href ? direction : 'noHref']}
                direction={direction}
                flex="1 1 auto"
                gap={2}
                ref={subContainerRef}
              >
                {icon}
                <CardContent
                  description={description}
                  disabled={disabled}
                  headingTag={headingTag}
                  subtitle={subtitle}
                  title={title}
                >
                  {children}
                </CardContent>
              </Stack>
              {href ? (
                <LinkContent direction={direction} disabled={disabled} />
              ) : null}
            </Stack>
          </Stack>
        )}
      </Container>
    )
  },
)
