import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React from 'react'
import Box from '../Box'

const StyledDt = styled(Box)``
const StyledDd = styled(Box)``
const StyledBox = styled(Box, {
  shouldForwardProp: prop => !['inline', 'selectable'].includes(prop),
})`
  font-size: 16px;
  line-height: 16px;
  margin: 0;
  > ${StyledDt} {
    font-weight: 500;
    color: ${({ theme }) => theme.colors.gray950};
    &:after {
      content: ':';
    }
  }
  > ${StyledDd} {
    color: ${({ theme }) => theme.colors.gray700};
    margin: 0;
    margin-top: ${({ theme }) => theme.space['1']};
  }
  ${StyledDd} + ${StyledDt} {
    margin-top: ${({ theme }) => theme.space['2']};
  }

  ${({ theme, inline }) =>
    inline &&
    `
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
  `}

  ${({ theme, selectable }) =>
    selectable &&
    `
    > ${StyledDd} {
      user-select: all;

      &::selection {
        color: ${theme.colors.gray200};
        background: ${theme.colors.primary};
      }
    }
  `}
`

const Description = ({ inline, selectable, ...props }) => (
  <StyledBox as="dl" inline={inline} selectable={selectable} {...props} />
)

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

Description.defaultProps = {
  inline: false,
  selectable: false,
}

Description.Term = function Term(props) {
  return <StyledDt as="dt" {...props} />
}

Description.Desc = function Term(props) {
  return <StyledDd as="dd" {...props} />
}

export default Description
