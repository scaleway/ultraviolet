import { css } from '@emotion/core'
import { Box } from '@smooth-ui/core-em'
import PropTypes from 'prop-types'
import React from 'react'
import {
  useTooltipState,
  Tooltip,
  TooltipArrow,
  TooltipReference,
} from 'reakit/Tooltip'
import { theme } from '../../theme'
import { Tag } from '../Tag'

const textStyle = maxTagWidth => css`
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: ${maxTagWidth}px;
  white-space: nowrap;
`

const text = css`
  color: ${theme.gray700};
  font-size: 14px;
  align-self: center;
  max-width: 350px;
  overflow: hidden;
  white-space: pre;
  text-overflow: ellipsis;
`

const TagsPoplist = ({
  uniqueId,
  tags = [],
  threshold = 1,
  maxLength = 600,
  maxTagWidth = 115,
  ...props
}) => {
  if (
    tags.length &&
    tags.slice(0, threshold).reduce((_, tag) => _ + tag).length > maxLength
  ) {
    // If total tags length in characters is above maxLength,
    // threshold is decremented in order to prevent too many long tags displayed.
    threshold -= 1
  }
  const hasManyTags = tags.length > threshold || false
  const visibleTagsCount = hasManyTags ? threshold : tags.length

  const tooltip = useTooltipState({ gutter: 8 })

  return (
    <>
      {tags.length ? (
        <Box display="flex">
          <Box
            display="flex"
            alignItems="center"
            color={theme.gray700}
            {...props}
          >
            {tags.slice(0, visibleTagsCount).map((tag, i) => (
              <Tag
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
              <TooltipReference
                {...tooltip}
                as={Box}
                css={text}
                px={1}
                color={theme.primary}
                border="none"
                backgroundColor="transparent"
              >
                +{tags.length - threshold}
              </TooltipReference>
              <Tooltip {...tooltip}>
                <TooltipArrow
                  {...tooltip}
                  style={{ fill: theme.white, top: '93%' }}
                />
                <Box
                  boxShadow="0 -1px 5px 3px rgba(165,165,205,0.15)"
                  px={1}
                  py="4px"
                  display="flex"
                  alignItems="center"
                  backgroundColor={theme.white}
                  borderRadius="4px"
                >
                  {tags.slice(visibleTagsCount).map((tag, index) => (
                    <Tag m="4px" key={`${tag}-${index}`}>
                      {tag}
                    </Tag>
                  ))}
                </Box>
              </Tooltip>
            </>
          )}
        </Box>
      ) : null}
    </>
  )
}

TagsPoplist.defaultProps = {
  tags: [],
}

TagsPoplist.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
}

export { TagsPoplist }
