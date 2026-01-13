'use client'

import { cn } from '@ultraviolet/utils'
import { assignInlineVars } from '@vanilla-extract/dynamic'
import type { ComponentProps, CSSProperties, ReactNode } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Popover } from '../Popover'
import { Tag } from '../Tag'
import { TAGS_GAP } from './constant'
import {
  ellipsisContainer,
  popoverTriggerWidthVar,
  tagContainer,
  tagListContainer,
  tagsWrapper,
} from './styles.css'

const DEFAULT_POPOVER_MAX_HEIGHT = '16rem'

export type TagType = string | { label: string; icon: ReactNode }

type TagListProps = {
  /**
   * This property define maximum characters length of all tags until it hide tags into tooltip.
   */
  maxLength?: number
  tags?: TagType[]
  /**
   * This property define maximum characters length of all tags until it hide tags into tooltip.
   * NB: this will be overridden if the parent width is smaller and cannot show all the tags
   */
  threshold?: number
  /**
   * This property define maximum width of each tag. This doesn't apply for tags in tooltip.
   */
  multiline?: boolean
  /**
   * This property define the title of the Popover, when some tags are hidden because of the threshold.
   */
  popoverTitle: string
  /**
   * The popover will be placed automatically by default. You can also specify the placement of the popover through
   * this property.
   */
  popoverPlacement?: ComponentProps<typeof Popover>['placement']
  /**
   * The popover maxHeight, defaults to 12.5rem
   */
  popoverMaxHeight?: ComponentProps<typeof Popover>['maxHeight']
  className?: string
  'data-testid'?: string
  style?: CSSProperties
} & Pick<ComponentProps<typeof Tag>, 'copiable' | 'copyText' | 'copiedText'>

const DEFAULT_TAGS: TagListProps['tags'] = []

const getTagLabel = (tag: NonNullable<TagListProps['tags']>[number]) =>
  typeof tag === 'object' ? tag.label : tag

/**
 * This component is used to display a list of tags with a threshold and a popover when there are too many tags.
 */
export const TagList = ({
  maxLength = 600,
  tags = DEFAULT_TAGS,
  threshold = 1,
  multiline = false,
  popoverTitle,
  popoverPlacement,
  popoverMaxHeight = DEFAULT_POPOVER_MAX_HEIGHT,
  copiable,
  copyText,
  copiedText,
  className,
  'data-testid': dataTestId,
  style,
}: TagListProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const measureRef = useRef<HTMLDivElement>(null)
  const popoverTriggerRef = useRef<HTMLDivElement>(null)

  // A flag to keep of when we show the component as we we might update the visible tags list
  // after the first render ( to know if we should add ellipsis to the last visible tag
  // or readjust the tags when joined with the popover trigger might overflow the parent )
  // and this causes some flickering
  const [isReady, setIsReady] = useState(false)

  const [isPopoverVisible, setIsPopoverVisible] = useState(false)
  const [popoverTriggerWidth, setPopoverTriggerWidth] = useState(0)
  const [visibleTags, setVisibleTags] = useState<TagType[]>([])
  const [hiddenTags, setHiddenTags] = useState<TagType[]>([])

  // Compute tmpThreshold, potentially visible tags and surely hidden tags
  const memoizedResult = useMemo(() => {
    let tmpThreshold = threshold
    while (
      tmpThreshold > 1 &&
      tags.length > 0 &&
      tags
        .slice(0, tmpThreshold)
        .reduce<string>((acc, tag) => acc + getTagLabel(tag), '').length >
        maxLength
    ) {
      tmpThreshold -= 1
    }

    const potentiallyVisibleTagsLength = Math.max(
      1,
      tags.length > tmpThreshold ? tmpThreshold : tags.length,
    )
    const potentiallyVisibleTags = tags.slice(0, potentiallyVisibleTagsLength)
    const surelyHiddenTags = tags.slice(potentiallyVisibleTagsLength)

    return {
      potentiallyVisibleTags,
      surelyHiddenTags,
      tmpThreshold,
    }
  }, [maxLength, tags, threshold])

  const { tmpThreshold, potentiallyVisibleTags, surelyHiddenTags } =
    memoizedResult

  // Compute visible tags and hidden ones based on the container width and
  // what can fit into it from the potentially visible tags
  useEffect(() => {
    if (tags.length === 0 || !containerRef.current || !measureRef.current) {
      return
    }

    if (multiline) {
      setVisibleTags(potentiallyVisibleTags)
      setHiddenTags(surelyHiddenTags)
      setIsReady(true)

      return
    }

    const parentWidth = containerRef.current.parentElement?.offsetWidth || 0

    const toMeasureElements: HTMLCollection =
      measureRef.current.children[0].children

    const [firstTag, ...restOfToMeasureElements] = [...toMeasureElements]

    const { measuredVisibleTags, measuredHiddenTags } =
      restOfToMeasureElements.reduce(
        (
          accumulator: {
            measuredVisibleTags: TagType[]
            measuredHiddenTags: TagType[]
            accumulatedWidth: number
          },
          currentValue,
          index,
        ): {
          measuredVisibleTags: TagType[]
          measuredHiddenTags: TagType[]
          accumulatedWidth: number
        } => {
          const newAccumulatedWidth =
            accumulator.accumulatedWidth +
            (currentValue as HTMLDivElement).offsetWidth +
            Number.parseInt(TAGS_GAP, 10)

          return {
            accumulatedWidth: newAccumulatedWidth,
            measuredHiddenTags: [
              ...accumulator.measuredHiddenTags,
              newAccumulatedWidth > parentWidth && tags[index + 1],
            ].filter(Boolean) as TagType[],
            measuredVisibleTags: [
              ...accumulator.measuredVisibleTags,
              newAccumulatedWidth <= parentWidth && tags[index + 1],
            ].filter(Boolean) as TagType[],
          }
        },
        {
          accumulatedWidth:
            (firstTag as HTMLDivElement).offsetWidth +
            Number.parseInt(TAGS_GAP, 10),
          measuredHiddenTags: [],
          measuredVisibleTags: [tags[0]], // we need to always show one tag
        },
      )

    const finalHiddenTags = [...measuredHiddenTags, ...surelyHiddenTags]

    setVisibleTags(measuredVisibleTags)
    setHiddenTags(finalHiddenTags)

    if (finalHiddenTags.length === 0) {
      setIsReady(true)
    }
  }, [
    multiline,
    potentiallyVisibleTags,
    surelyHiddenTags,
    tags,
    threshold,
    tmpThreshold,
  ])

  // Once the popover trigger is available we have to:
  // - to get the popover trigger width so the last visible tags can have ellipsis if needed
  // - remove the last tag if the popover have no place and push it in to the hidden tags list
  useEffect(() => {
    if (!isReady && popoverTriggerRef.current?.offsetWidth) {
      const newPopoverTriggerWidth = popoverTriggerRef.current.offsetWidth

      // Set popover trigger width
      setPopoverTriggerWidth(newPopoverTriggerWidth)

      // Remove the last tag if we have a popover and add it to the hidden tags
      const tagsContainer = containerRef.current
      const tagsContainerWidth = containerRef.current?.offsetWidth || 0
      const parentWidth = tagsContainer?.parentElement?.offsetWidth || 0

      if (
        visibleTags.length > 1 &&
        hiddenTags.length > 0 &&
        tagsContainerWidth + newPopoverTriggerWidth > parentWidth
      ) {
        const visibleTagsCopy = visibleTags.filter(
          (_, index) => index < visibleTags.length - 1,
        )
        const tagToMove = visibleTags.at(-1) ?? ''

        setVisibleTags(visibleTagsCopy)
        setHiddenTags([tagToMove, ...hiddenTags])
      }

      setIsReady(true)
    }
  }, [hiddenTags, isReady, threshold, visibleTags, visibleTags.length])

  // Remove the hidden div that served to measure the rendered tags
  useEffect(() => {
    if (isReady && measureRef.current?.parentNode) {
      measureRef.current.remove()
    }
  }, [isReady])

  if (tags.length === 0) {
    return null
  }

  const renderTag = (tag: TagType, index: number, isEllipsis = false) =>
    typeof tag !== 'string' && tag.icon ? (
      <Tag
        // useful when two tags are identical `${tag}-${index}`
        className={isEllipsis ? 'ellipsed' : ''}
        copiable={copiable}
        copiedText={copiedText}
        copyText={copyText}
        key={`${getTagLabel(tag)}-${index}`}
      >
        {tag.icon}
        {getTagLabel(tag)}
      </Tag>
    ) : (
      <Tag
        className={isEllipsis ? 'ellipsed' : ''}
        copiable={copiable}
        copiedText={copiedText}
        copyText={copyText}
        key={`${getTagLabel(tag)}-${index}`}
      >
        {getTagLabel(tag)}
      </Tag>
    )

  return (
    <div
      className={cn(className, tagListContainer)}
      data-testid={dataTestId}
      style={{ visibility: isReady ? 'visible' : 'hidden', ...style }}
    >
      <div
        className={cn(
          tagContainer({
            multiline,
          }),
          (visibleTags.length === 1 && hiddenTags.length === 0) ||
            popoverTriggerWidth
            ? ellipsisContainer
            : '',
        )}
        data-testid={`${dataTestId ?? 'taglist'}-container`}
        ref={containerRef}
        style={assignInlineVars({
          [popoverTriggerWidthVar]: `${popoverTriggerWidth || 0}px`,
        })}
      >
        {visibleTags.map((tag, index) =>
          renderTag(
            tag,
            index,
            // add ellipsis to last tag
            index === visibleTags.length - 1,
          ),
        )}
      </div>
      {/* A hidden div which renders the tags so we can measure them */}
      <div
        ref={measureRef}
        style={{
          position: 'absolute',
          visibility: 'hidden',
          whiteSpace: 'nowrap',
        }}
      >
        <div
          className={tagContainer({ multiline })}
          data-testid={`${dataTestId ?? 'taglist'}-measure-container`}
        >
          {potentiallyVisibleTags.map((tag, index) => renderTag(tag, index))}
        </div>
      </div>
      {hiddenTags.length > 0 && (
        <Popover
          content={
            <div className={tagContainer({ multiline: true })}>
              {hiddenTags.map((tag, index) => renderTag(tag, index))}
            </div>
          }
          maxHeight={popoverMaxHeight}
          onClose={() => setIsPopoverVisible(false)}
          placement={popoverPlacement}
          size="small"
          title={popoverTitle}
          visible={isPopoverVisible}
        >
          <span
            className={tagsWrapper}
            data-testid={`${dataTestId ?? 'taglist'}-open`}
            onClick={() => setIsPopoverVisible(true)}
            onKeyDown={event => {
              if ([' ', 'Enter'].includes(event.key)) {
                setIsPopoverVisible(true)
              }
            }}
            ref={popoverTriggerRef}
            // biome-ignore lint/a11y/noNoninteractiveTabindex : to fix
            tabIndex={0}
          >
            +{hiddenTags.length}
          </span>
        </Popover>
      )}
    </div>
  )
}
