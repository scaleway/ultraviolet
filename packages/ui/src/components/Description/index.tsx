import { css } from '@emotion/react'
import styled from '@emotion/styled'

const Term = styled.dt`
  font-weight: ${({ theme }) => theme.typography.bodyStrong.weight};
  color: ${({ theme }) => theme.colors.neutral.textStrong};
  display: inline-flex;
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
  margin: 0;
  ${({ capitalize }) =>
    capitalize
      ? css`
          text-transform: capitalize;
        `
      : undefined}
`

type DescriptionProps = {
  ellipsis?: boolean
  inline?: boolean
  userSelect?: boolean
  width?: string
}

const BareDescription = styled('dl', {
  shouldForwardProp: prop =>
    !['inline', 'ellipsis', 'userSelect'].includes(prop),
})<DescriptionProps>`
  display: flex;
  font-size: ${({ theme }) => theme.typography.body.fontSize};
  line-height: ${({ theme }) => theme.typography.body.lineHeight};
  flex-direction: ${({ inline }) => (inline ? 'row' : 'column')};

  ${({ inline, theme }) => (inline ? `gap: ${theme.space['1']};` : null)}

  ${({ ellipsis, width }) =>
    ellipsis
      ? css`
          ${Desc} {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            width: ${width};
          }
        `
      : undefined}

  ${({ userSelect, theme }) =>
    userSelect
      ? css`
          ${Desc} {
            user-select: all;

            &::selection {
              color: ${theme.colors.primary.textStrong};
              background: ${theme.colors.primary.backgroundStrong};
            }
          }
        `
      : undefined}
`

type DescriptionType = typeof BareDescription & {
  Term: typeof Term
  Desc: typeof Desc
}

// @ts-expect-error we assign the missing compound components
export const Description: DescriptionType = BareDescription

Description.Term = Term
Description.Desc = Desc
