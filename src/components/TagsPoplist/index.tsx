import { css, useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React from 'react'
import {
  Tooltip,
  TooltipArrow,
  TooltipReference,
  useTooltipState,
} from 'reakit/Tooltip'
import Box from '../Box'
import FlexBox from '../FlexBox'
import Tag from '../Tag'

const textStyle = (maxTagWidth: number) => css`
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: ${maxTagWidth}px;
  white-space: nowrap;
`

const StyledTooltipReference = styled(TooltipReference)`
  color: ${({ theme }) => theme.colors.primary};
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

export type TagsPoplistProps = {
  maxLength?: number
  maxTagWidth?: number
  tags?: string[]
  threshold?: number
}

const TagsPoplist = ({
  maxLength = 600,
  maxTagWidth = 115,
  tags = [],
  threshold = 1,
  ...props
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
      <Box display="flex" alignItems="center" color="gray700" {...props}>
        {tags.slice(0, visibleTagsCount).map((tag, index) => (
          <Tag
            // useful when two tags are identical `${tag}-${index}`
            // eslint-disable-next-line react/no-array-index-key
            key={`${tag}-${index}`}
            textStyle={textStyle(maxTagWidth)}
            mr={index + 1 !== visibleTagsCount ? 1 : 0}
          >
            {tag}
          </Tag>
        ))}
      </Box>
      {hasManyTags && (
        <>
          <StyledTooltipReference {...tooltip}>
            +{tags.length - tmpThreshold}
          </StyledTooltipReference>
          <Tooltip {...tooltip}>
            <TooltipArrow
              {...tooltip}
              style={{ fill: theme.colors.white, top: '93%' }}
            />
            <Box
              boxShadow="0 -1px 5px 3px rgba(165,165,205,0.15)"
              px={1}
              py="4px"
              display="flex"
              alignItems="center"
              backgroundColor={theme.colors.white}
              borderRadius={theme.radii.default}
              maxWidth="80vw"
              flexWrap="wrap"
            >
              {tags.slice(visibleTagsCount).map((tag, index) => (
                // useful when two tags are identical `${tag}-${index}`
                <Tag
                  m="4px"
                  // eslint-disable-next-line react/no-array-index-key
                  key={`${tag}-${index}`}
                >
                  {tag}
                </Tag>
              ))}
            </Box>
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
  tags: PropTypes.arrayOf(PropTypes.string.isRequired),
  /**
   * This property define number of tags to display before hiding them in tooltip.
   */
  threshold: PropTypes.number,
}

export default TagsPoplist
