'use client'

import { css } from '@emotion/react'
import styled from '@emotion/styled'

type LineThroughProps = {
  isActive?: boolean
}

export const LineThrough = styled('span', {
  shouldForwardProp: prop => !['isActive'].includes(prop),
})<LineThroughProps>`
  ${({ isActive, theme }) =>
    isActive
      ? css`
          text-decoration-line: line-through;
          text-decoration-color: ${theme.colors.warning.border};
        `
      : null}
`
