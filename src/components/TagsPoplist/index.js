import { css } from '@emotion/react'
import PropTypes from 'prop-types'
import React from 'react'
import {
  Tooltip,
  TooltipArrow,
  TooltipReference,
  useTooltipState,
} from 'reakit/Tooltip'
import { colors } from '../../theme'
import { Box } from '../Box'
import { Tag } from '../Tag'

const textStyle = maxTagWidth => css`
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: ${maxTagWidth}px;
  white-space: nowrap;
`

const text = css`
  color: ${colors.gray700};
  font-size: 14px;
  align-self: center;
  max-width: 350px;
  overflow: hidden;
  white-space: pre;
  text-overflow: ellipsis;
`

const TagsPoplist = ({ tags, threshold, maxLength, maxTagWidth, ...props }) => {
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

  return (
    <>
      {tags.length ? (
        <Box display="flex">
          <Box
            display="flex"
            alignItems="center"
            color={colors.gray700}
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
                color={colors.primary}
                border="none"
                backgroundColor="transparent"
              >
                +{tags.length - threshold}
              </TooltipReference>
              <Tooltip {...tooltip}>
                <TooltipArrow
                  {...tooltip}
                  style={{ fill: colors.white, top: '93%' }}
                />
                <Box
                  boxShadow="0 -1px 5px 3px rgba(165,165,205,0.15)"
                  px={1}
                  py="4px"
                  display="flex"
                  alignItems="center"
                  backgroundColor={colors.white}
                  borderRadius="4px"
                  maxWidth="80vw"
                  flexWrap="wrap"
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
  threshold: 1,
  maxLength: 600,
  maxTagWidth: 115,
}

TagsPoplist.propTypes = {
  maxLength: PropTypes.number,
  maxTagWidth: PropTypes.number,
  threshold: PropTypes.number,
  tags: PropTypes.arrayOf(PropTypes.string),
}

export { TagsPoplist }
