'use client'

import { cn, shuffle } from '@ultraviolet/utils'
import { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import type { ComponentProps, CSSProperties, ReactNode } from 'react'
import { Popover } from '../Popover'
import { Tag } from '../Tag'
import { DEFAULT_POPOVER_MAX_HEIGHT, TAGS_GAP_PX } from './constant'
import { tagListStyle } from './styles.css'

type TagKeyValue = { key: string; value: string }
type TagIcon = { label: string; icon: ReactNode }
export type TagType = string | TagKeyValue | TagIcon

type TagListProps = {
  /**
   * Maximum character length of all tags before hiding them into a popover.
   */
  maxLength?: number
  tags?: TagType[]
  /**
   * Maximum number of tags to display before hiding them in a popover.
   */
  threshold?: number
  /**
   * Wrap the tags on multiple lines instead of containing them on the first one.
   */
  multiline?: boolean
  /**
   * Title of the Popover added when some tags are hidden because of the `threshold` or `maxLength` properties.
   */
  popoverTitle: string
  /**
   * The popover will be placed automatically by default. You can also specify the placement of the popover through
   * this property.
   */
  popoverPlacement?: ComponentProps<typeof Popover>['placement']
  /**
   * The popover maxHeight
   * @default 12.5rem
   */
  popoverMaxHeight?: ComponentProps<typeof Popover>['maxHeight']
  className?: string
  'data-testid'?: string
  style?: CSSProperties
} & Pick<ComponentProps<typeof Tag>, 'copiable' | 'copyText' | 'copiedText' | 'variant' | 'sentiment'>

const DEFAULT_TAGS: TagListProps['tags'] = []

const isLabelIconTag = (tag: TagType): tag is TagIcon =>
  typeof tag === 'object' && tag !== null && 'label' in tag && 'icon' in tag

const isKeyValueTag = (tag: TagType): tag is TagKeyValue =>
  typeof tag === 'object' && tag !== null && 'key' in tag && 'value' in tag

const getTagLabel = (tag: NonNullable<TagListProps['tags']>[number]) => {
  if (isKeyValueTag(tag)) {
    return `${tag.key}-${tag.value}`
  }

  if (isLabelIconTag(tag)) {
    return tag.label
  }

  return tag
}

const shuffleTagLabels = (tag: TagType) => {
  if (isKeyValueTag(tag)) {
    return {
      ...tag,
      key: shuffle(tag.key),
      value: shuffle(tag.value),
    }
  } else if (isLabelIconTag(tag)) {
    return {
      ...tag,
      label: shuffle(tag.label),
    }
  }
  return shuffle(tag)
}

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
  sentiment = 'neutral',
  variant = 'default',
  className,
  'data-testid': dataTestId,
  style,
}: TagListProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const measureRef = useRef<HTMLDivElement>(null)
  const popoverTriggerRef = useRef<HTMLButtonElement>(null)

  const [isPopoverVisible, setIsPopoverVisible] = useState(false)
  // Avoid adding undefined to default visibleTags
  const [visibleTags, setVisibleTags] = useState<TagType[]>(tags[0] ? [tags[0]] : [])
  const [hiddenTags, setHiddenTags] = useState<TagType[]>([])

  const [potentiallyVisibleTags, surelyHiddenTags] = useMemo(() => {
    if (tags.length === 0) {
      return [[], []]
    }
    const limit = Math.min(threshold, tags.length)
    let visibleCount = 0
    let currentLength = 0

    for (let i = 0; i < limit; i++) {
      currentLength += getTagLabel(tags[i]).length
      if (currentLength > maxLength) break
      visibleCount++
    }
    visibleCount = Math.max(visibleCount, 1)
    return [tags.slice(0, visibleCount), tags.slice(visibleCount)]
  }, [maxLength, tags, threshold])

  // Compute visible tags and hidden ones based on the container width and
  // what can fit into it from the potentially visible tags
  useEffect(() => {
    if (tags.length === 0 || !containerRef.current || !measureRef.current) {
      return
    }

    if (multiline || typeof ResizeObserver === 'undefined') {
      setVisibleTags(potentiallyVisibleTags)
      setHiddenTags(surelyHiddenTags)

      return
    }

    const handleResize = (entries: ResizeObserverEntry[]) => {
      if (!containerRef.current || !measureRef.current || !popoverTriggerRef.current) {
        return
      }

      const totalAvailableWidth = entries[0].contentBoxSize[0].inlineSize

      if (measureRef.current.offsetWidth < totalAvailableWidth) {
        setVisibleTags(potentiallyVisibleTags)
        setHiddenTags(surelyHiddenTags)
        return
      }

      const elementsToMeasure = [...measureRef.current.children[0].children] as HTMLElement[]
      const counterWidth = popoverTriggerRef.current.offsetWidth

      let visibleTagsCount = 0
      let visibleTagsWidth = 0

      for (let i = 0; i < potentiallyVisibleTags.length; i++) {
        if (i > 0) visibleTagsWidth += TAGS_GAP_PX
        visibleTagsWidth += elementsToMeasure[i].offsetWidth

        const notLastTag = i < tags.length - 1
        const availableWidth = notLastTag ? totalAvailableWidth - counterWidth : totalAvailableWidth

        if (visibleTagsWidth > availableWidth) {
          break
        }
        visibleTagsCount++
      }

      if (visibleTagsCount === 0) {
        visibleTagsCount = 1
      }

      setVisibleTags(tags.slice(0, visibleTagsCount))
      setHiddenTags(tags.slice(visibleTagsCount))
    }

    const resizeObserver = new ResizeObserver(handleResize)
    resizeObserver.observe(containerRef.current)

    return () => {
      resizeObserver.disconnect()
    }
  }, [multiline, potentiallyVisibleTags, surelyHiddenTags, tags])

  const renderTag = (tag: TagType, index: number, hidden?: boolean) => {
    const finalTag = hidden ? shuffleTagLabels(tag) : tag
    const tagLabel = getTagLabel(finalTag)
    const commonProps = {
      className: tagListStyle.tag,
      copiable: copiable,
      copiedText: copiedText,
      copyText: copyText,
      'data-testid': hidden ? '' : tagLabel,
      variant: variant,
      sentiment: sentiment,
    }

    const TagWrapper = hidden
      ? Fragment
      : ({ children }: { children: ReactNode }) => <li className={tagListStyle.listItem}>{children}</li>

    if (isKeyValueTag(finalTag)) {
      return (
        <TagWrapper>
          <Tag keyValue={finalTag} {...commonProps} key={`${tagLabel}-${index}`} />
        </TagWrapper>
      )
    }

    return (
      <TagWrapper>
        <Tag {...commonProps} key={`${tagLabel}-${index}`}>
          {isLabelIconTag(finalTag) ? finalTag.icon : undefined}
          {tagLabel}
        </Tag>
      </TagWrapper>
    )
  }

  return (
    <div className={cn(className, tagListStyle.container)} data-testid={dataTestId} ref={containerRef} style={style}>
      <div
        className={cn(tagListStyle.tagContainer({ multiline }))}
        data-testid={`${dataTestId ?? 'taglist'}-container`}
      >
        {visibleTags.length > 0 && (
          <ul className={tagListStyle.list}>{visibleTags.map((tag, index) => renderTag(tag, index))}</ul>
        )}

        {hiddenTags.length > 0 && (
          <Popover
            content={
              <ul className={cn(tagListStyle.tagContainer({ multiline: true }), tagListStyle.list)}>
                {hiddenTags.map((tag, index) => renderTag(tag, index))}
              </ul>
            }
            maxHeight={popoverMaxHeight}
            onClose={() => setIsPopoverVisible(false)}
            placement={popoverPlacement}
            size="small"
            title={popoverTitle}
            visible={isPopoverVisible}
          >
            <button
              type="button"
              className={tagListStyle.counter}
              data-testid={`${dataTestId ?? 'taglist'}-open`}
              onClick={() => setIsPopoverVisible(true)}
              onKeyDown={event => {
                if ([' ', 'Enter'].includes(event.key)) {
                  setIsPopoverVisible(true)
                }
              }}
            >
              +{hiddenTags.length}
            </button>
          </Popover>
        )}
      </div>

      {/* A hidden div which renders the tags so we can measure them */}
      <div aria-hidden="true" ref={measureRef} className={tagListStyle.measurementContainer}>
        <div className={tagListStyle.tagContainer({ multiline })}>
          {potentiallyVisibleTags.map((tag, index) => renderTag(tag, index, true))}
        </div>
        <button type="button" className={tagListStyle.counter} ref={popoverTriggerRef}>
          {surelyHiddenTags.length}+
        </button>
      </div>
    </div>
  )
}

TagList.displayName = 'TagList'
