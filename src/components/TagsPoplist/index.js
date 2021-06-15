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

const textStyle = maxTagWidth => css`
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
`

const TagsPoplist = ({ tags, threshold, maxLength, maxTagWidth, ...props }) => {
  const theme = useTheme()
  let tmpThreshold = threshold
  if (
    tags.length &&
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
        {tags.slice(0, visibleTagsCount).map((tag, i) => (
          <Tag
            // eslint-disable-next-line react/no-array-index-key
            key={`${tag}-${i}`}
            textStyle={textStyle(maxTagWidth)}
            mr={i + 1 !== visibleTagsCount ? 1 : 0}
          >
            {tag}
          </Tag>
        ))}
      </Box>
      {hasManyTags && (
        <>
          <StyledTooltipReference {...tooltip} as={Box} px={1}>
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
              backgroundColor="white"
              borderRadius="4px"
              maxWidth="80vw"
              flexWrap="wrap"
            >
              {tags.slice(visibleTagsCount).map((tag, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <Tag m="4px" key={`${tag}-${index}`}>
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

TagsPoplist.defaultProps = {
  maxLength: 600,
  maxTagWidth: 115,
  tags: [],
  threshold: 1,
}

TagsPoplist.propTypes = {
  maxLength: PropTypes.number,
  maxTagWidth: PropTypes.number,
  tags: PropTypes.arrayOf(PropTypes.string),
  threshold: PropTypes.number,
}

export default TagsPoplist
