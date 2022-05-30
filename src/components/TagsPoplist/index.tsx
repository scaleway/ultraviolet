import { css as emotionCss, useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import {
  Tooltip,
  TooltipArrow,
  TooltipReference,
  useTooltipState,
} from 'reakit/Tooltip'
import FlexBox from '../FlexBox'
import Tag from '../Tag'

const textStyle = (maxTagWidth: number) => emotionCss`
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: ${maxTagWidth}px;
  white-space: nowrap;
`

const StyledTooltipReference = styled(TooltipReference)`
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
  ${({ multiline, theme }) =>
    multiline &&
    `flex-wrap: wrap;
  > * { margin-bottom: ${theme.space['1']}}`}
`

const StyledManyTagsContainer = styled.div`
  box-shadow: ${({ theme }) => theme.shadows.tooltip};
  padding: ${({ theme }) => `${theme.space['0.5']} ${theme.space['1']}`};
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.neutral.backgroundWeak};
  border-radius: ${({ theme }) => theme.radii.default};
  max-width: 80vw;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space['1']};
`

type TagsPoplistProps = {
  maxLength?: number
  maxTagWidth?: number
  tags?: string[]
  threshold?: number
  multiline?: boolean
}

const TagContainer = styled.div<{ index: number; visibleTagsCount: number }>`
  margin-right: ${({ index, visibleTagsCount, theme }) =>
    index + 1 !== visibleTagsCount ? theme.space['1'] : 0};
`

const TagsPoplist = ({
  maxLength = 600,
  maxTagWidth = 115,
  tags = [],
  threshold = 1,
  multiline = false,
}: TagsPoplistProps): JSX.Element | null => {
  const theme = useTheme()
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

  const tooltip = useTooltipState({ gutter: 8 })

  if (!tags.length) {
    return null
  }

  return (
    <FlexBox>
      <StyledTagContainer multiline={multiline}>
        {tags.slice(0, visibleTagsCount).map((tag, index) => (
          <TagContainer visibleTagsCount={visibleTagsCount} index={index}>
            <Tag
              // useful when two tags are identical `${tag}-${index}`
              // eslint-disable-next-line react/no-array-index-key
              key={`${tag}-${index}`}
              textStyle={textStyle(maxTagWidth)}
            >
              {tag}
            </Tag>
          </TagContainer>
        ))}
      </StyledTagContainer>
      {hasManyTags && (
        <>
          <StyledTooltipReference {...tooltip}>
            +{tags.length - tmpThreshold}
          </StyledTooltipReference>
          <Tooltip {...tooltip}>
            <TooltipArrow
              {...tooltip}
              style={{ fill: theme.colors.neutral.backgroundWeak, top: '93%' }}
            />
            <StyledManyTagsContainer>
              {tags.slice(visibleTagsCount).map((tag, index) => (
                // useful when two tags are identical `${tag}-${index}`
                <Tag
                  // eslint-disable-next-line react/no-array-index-key
                  key={`${tag}-${index}`}
                >
                  {tag}
                </Tag>
              ))}
            </StyledManyTagsContainer>
          </Tooltip>
        </>
      )}
    </FlexBox>
  )
}

TagsPoplist.propTypes = {
  /**
   * This property define maximum characters length of all tags until it hide tags into tooltip.
   */
  maxLength: PropTypes.number,
  /**
   * This property define maximum width of each tags. This doesn't apply for tags in tooltip.
   */
  maxTagWidth: PropTypes.number,
  multiline: PropTypes.bool,
  tags: PropTypes.arrayOf(PropTypes.string.isRequired),
  /**
   * This property define number of tags to display before hiding them in tooltip.
   */
  threshold: PropTypes.number,
}

export default TagsPoplist
