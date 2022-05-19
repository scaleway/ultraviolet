import { css } from '@emotion/react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import { WeakValidationMap } from 'react'
import Box, { BoxProps } from '../Box'

const Term = styled(Box.withComponent('dt'))`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.neutral.textHover};
  &:after {
    content: ':';
  }
`
const Desc = styled(Box.withComponent('dd'))`
  color: ${({ theme }) => theme.colors.neutral.text};
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

  ${Desc} + ${Term} {
    margin-top: ${({ theme }) => theme.space['2']};
  }

  ${({ theme, inline }) =>
    inline
      ? css`
          & > ${Term} {
            float: left;
            clear: left;
            margin-right: ${theme.space['1']};
          }

          & > ${Desc} {
            margin-top: 0;
          }

          ${Desc} + ${Term} + ${Desc} {
            margin-top: ${theme.space['2']};
          }
        `
      : ``}

  ${({ theme, selectable }) =>
    selectable &&
    css`
      > ${Desc} {
        user-select: all;

        &::selection {
          color: ${theme.colors.primary.textStrong};
          background: ${theme.colors.primary.backgroundStrong};
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

type DescriptionComponent = ((props: DescriptionProps) => JSX.Element) & {
  propTypes: WeakValidationMap<DescriptionProps>
  Desc: typeof Desc
  Term: typeof Term
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

Desc.displayName = 'Description.Term'
Description.Term = Term

Desc.displayName = 'Description.Desc'
Description.Desc = Desc

export default Description
