import styled from '@emotion/styled'
import { Tag } from '../Tag'
import { Tooltip } from '../Tooltip'

const StyledContainer = styled.div`
  display: flex;
`

const StyledTooltipReference = styled.span`
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

const StyledManyTagsContainer = styled.div`
  padding: ${({ theme }) => `${theme.space['0.5']} ${theme.space['1']}`};
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space['1']};
`

type TagsPoplistProps = {
  /**
   * This property define maximum characters length of all tags until it hide tags into tooltip.
   */
  maxLength?: number
  tags?: string[]
  /**
   * This property define maximum characters length of all tags until it hide tags into tooltip.
   */
  threshold?: number
  /**
   * This property define maximum width of each tag. This doesn't apply for tags in tooltip.
   */
  multiline?: boolean
}

export const TagsPoplist = ({
  maxLength = 600,
  tags = [],
  threshold = 1,
  multiline = false,
}: TagsPoplistProps): JSX.Element | null => {
  let tmpThreshold = threshold
  if (
    tags?.length > 0 &&
    tags.slice(0, tmpThreshold).reduce((_, tag) => _ + tag).length > maxLength
  ) {
    // If total tags length in characters is above maxLength,
    // threshold is decremented in order to prevent too many long tags displayed.
    tmpThreshold -= 1
  }
  const hasManyTags = tags.length > tmpThreshold || false
  const visibleTagsCount = hasManyTags ? tmpThreshold : tags.length

  if (!tags.length) {
    return null
  }

  return (
    <StyledContainer>
      <StyledTagContainer multiline={multiline}>
        {tags.slice(0, visibleTagsCount).map((tag, index) => (
          <Tag
            // useful when two tags are identical `${tag}-${index}`
            // eslint-disable-next-line react/no-array-index-key
            key={`${tag}-${index}`}
          >
            {tag}
          </Tag>
        ))}
      </StyledTagContainer>
      {hasManyTags && (
        <Tooltip
          maxWidth={600}
          text={
            <StyledManyTagsContainer>
              {tags.slice(visibleTagsCount).map((tag, index) => (
                // useful when two tags are identical `${tag}-${index}`
                <span
                  // eslint-disable-next-line react/no-array-index-key
                  key={`${tag}-${index}`}
                >
                  {tag}
                  {index < tags.slice(visibleTagsCount).length - 1 ? ',' : null}
                </span>
              ))}
            </StyledManyTagsContainer>
          }
        >
          <StyledTooltipReference>
            +{tags.length - tmpThreshold}
          </StyledTooltipReference>
        </Tooltip>
      )}
    </StyledContainer>
  )
}
