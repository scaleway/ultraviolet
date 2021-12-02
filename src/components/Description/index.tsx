import { css } from '@emotion/react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React, { FunctionComponent } from 'react'
import Box, { BoxProps } from '../Box'

const StyledDt = styled(Box.withComponent('dt'))`
  font-weight: 500;
  color: ${({ theme }) => theme.colorsDeprecated.gray950};
  &:after {
    content: ':';
  }
`
const StyledDd = styled(Box.withComponent('dd'))`
  color: ${({ theme }) => theme.colorsDeprecated.gray700};
  margin: 0;
  margin-top: ${({ theme }) => theme.space['1']};
`

const StyledBox = styled(Box, {
  shouldForwardProp: prop =>
    !['inline', 'selectable'].includes(prop.toString()),
})<{ inline: boolean; selectable: boolean }>`
  font-size: 16px;
  line-height: 16px;
  margin: 0;

  ${StyledDd} + ${StyledDt} {
    margin-top: ${({ theme }) => theme.space['2']};
  }

  ${({ theme, inline }) =>
    inline
      ? css`
          & > ${StyledDt} {
            float: left;
            clear: left;
            margin-right: ${theme.space['1']};
          }

          & > ${StyledDd} {
            margin-top: 0;
          }

          ${StyledDd} + ${StyledDt} + ${StyledDd} {
            margin-top: ${theme.space['2']};
          }
        `
      : ``}

  ${({ theme, selectable }) =>
    selectable &&
    css`
      > ${StyledDd} {
        user-select: all;

        &::selection {
          color: ${theme.colorsDeprecated.gray200};
          background: ${theme.colorsDeprecated.primary};
        }
      }
    `}
`

type DescriptionProps = {
  /**
   * Display description inline
   */
  inline?: boolean
  /**
   * Select all `Description.Desc` content by default
   */
  selectable?: boolean
} & BoxProps

type DescriptionComponent = FunctionComponent<DescriptionProps> & {
  Desc: FunctionComponent<BoxProps>
  Term: FunctionComponent<BoxProps>
}

const Description: DescriptionComponent = ({
  inline = false,
  selectable = false,
  ...props
}) => <StyledBox as="dl" inline={inline} selectable={selectable} {...props} />

Description.propTypes = {
  /**
   * Display description inline
   */
  inline: PropTypes.bool,
  /**
   * Select all `Description.Desc` content by default
   */
  selectable: PropTypes.bool,
}

Description.Term = StyledDt
Description.Term.displayName = 'Description.Term'

Description.Desc = StyledDd
Description.Desc.displayName = 'Description.Desc'

export default Description
