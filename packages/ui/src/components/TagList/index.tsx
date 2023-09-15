import styled from '@emotion/styled'
import { useState } from 'react'
import type { ComponentProps, JSX } from 'react'
import { Popover } from '../Popover'
import { Tag } from '../Tag'

const StyledContainer = styled.div`
  display: flex;
`

const TagsWrapper = styled.span`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.primary.text};
  border: none;
  font-size: 14px;
  align-self: center;
  max-width: 350px;
  overflow: hidden;
  white-space: pre;
  text-overflow: ellipsis;
  background-color: transparent;
  padding-left: 8px;
  padding-right: 8px;
`

const StyledTagContainer = styled.div<{ multiline?: boolean }>`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.neutral.text};
  gap: ${({ theme }) => theme.space['1']};
  ${({ multiline }) => multiline && `flex-wrap: wrap;`};
`

type TagListProps = {
  /**
   * This property define maximum characters length of all tags until it hide tags into tooltip.
   */
  maxLength?: number
  tags?: (
    | string
    | { label: string; icon: NonNullable<ComponentProps<typeof Tag>['icon']> }
  )[]
  /**
   * This property define maximum characters length of all tags until it hide tags into tooltip.
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
  className?: string
  'data-testid'?: string
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
  copiable,
  copyText,
  copiedText,
  className,
  'data-testid': dataTestId,
}: TagListProps): JSX.Element | null => {
  let tmpThreshold = threshold
  if (
    tags.length > 0 &&
    tags
      .slice(0, tmpThreshold)
      .reduce<string>((acc, tag) => acc + getTagLabel(tag), '').length >
      maxLength
  ) {
    // If total tags length in characters is above maxLength,
    // threshold is decremented in order to prevent too many long tags displayed.
    tmpThreshold -= 1
  }
  const hasManyTags = tags.length > tmpThreshold || false
  const visibleTagsCount = hasManyTags ? tmpThreshold : tags.length

  const [isVisible, setIsVisible] = useState(false)

  if (!tags.length) {
    return null
  }

  return (
    <StyledContainer className={className} data-testid={dataTestId}>
      <StyledTagContainer multiline={multiline}>
        {tags.slice(0, visibleTagsCount).map((tag, index) => (
          <Tag
            // useful when two tags are identical `${tag}-${index}`
            // eslint-disable-next-line react/no-array-index-key
            key={`${getTagLabel(tag)}-${index}`}
            copiable={copiable}
            copyText={copyText}
            copiedText={copiedText}
            icon={typeof tag === 'object' ? tag.icon : undefined}
          >
            {getTagLabel(tag)}
          </Tag>
        ))}
      </StyledTagContainer>
      {hasManyTags ? (
        <Popover
          title={popoverTitle}
          visible={isVisible}
          size="small"
          onClose={() => setIsVisible(false)}
          content={
            <StyledTagContainer multiline>
              {tags.slice(visibleTagsCount).map((tag, index) => (
                <Tag
                  // useful when two tags are identical `${tag}-${index}`
                  // eslint-disable-next-line react/no-array-index-key
                  key={`${getTagLabel(tag)}-${index}`}
                  copiable={copiable}
                  copyText={copyText}
                  copiedText={copiedText}
                  icon={typeof tag === 'object' ? tag.icon : undefined}
                >
                  {getTagLabel(tag)}
                </Tag>
              ))}
            </StyledTagContainer>
          }
        >
          <TagsWrapper
            data-testid={`${dataTestId ?? 'taglist'}-open`}
            onClick={() => setIsVisible(true)}
          >
            +{tags.length - tmpThreshold}
          </TagsWrapper>
        </Popover>
      ) : null}
    </StyledContainer>
  )
}
