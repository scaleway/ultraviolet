import { css } from '@emotion/react'
import styled from '@emotion/styled'

const Term = styled.dt`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.neutral.textStrong};
  display: inline-block;
  &:after {
    content: ':';
  }
`

const Desc = styled('dd', {
  shouldForwardProp: prop => !['capitalize'].includes(prop),
})<{ capitalize?: boolean }>`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.neutral.text};
  margin: ${({ theme }) => theme.space['1']} 0 0 0;
  ${({ capitalize }) =>
    capitalize &&
    css`
      text-transform: capitalize;
    `}
`

interface DescriptionProps {
  ellipsis?: boolean
  inline?: boolean
  userSelect?: boolean
  width?: string
}

const BareDescription = styled('dl', {
  shouldForwardProp: prop =>
    !['inline', 'ellipsis', 'userSelect'].includes(prop),
})<DescriptionProps>`
  font-size: 16px;
  line-height: 16px;
  margin: 0;

  ${({ inline }) =>
    inline &&
    css`
      display: flex;
      justify-content: flex-start;
      align-items: center;
      ${Desc} {
        margin: 0 0 0 8px;
      }
    `};

  ${({ ellipsis, width }) =>
    ellipsis &&
    css`
      ${Desc} {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: ${width};
      }
    `}

  ${({ userSelect, theme }) =>
    userSelect &&
    css`
      ${Desc} {
        user-select: all;

        &::selection {
          color: ${theme.colors.primary.textStrong};
          background: ${theme.colors.primary.backgroundStrong};
        }
      }
    `}
`

type DescriptionType = typeof BareDescription & {
  Term: typeof Term
  Desc: typeof Desc
}

// @ts-expect-error we assign the missing compound components
const Description: DescriptionType = BareDescription

Description.Term = Term
Description.Desc = Desc

export default Description
