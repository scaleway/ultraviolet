import styled from '@emotion/styled'
import { CSSProperties, ReactNode } from 'react'
import { SCWUITheme } from '../../theme'

type StackProps = {
  gap?: keyof SCWUITheme['space']
  direction?: 'row' | 'column'
  alignItems?: CSSProperties['alignItems']
  justifyContent?: CSSProperties['justifyContent']
  wrap?: boolean | CSSProperties['flexWrap']
  className?: string
  children: ReactNode
}

const Stack = styled('div', {
  shouldForwardProp: prop =>
    !['gap', 'direction', 'alignItems', 'justifyContent'].includes(prop),
})<StackProps>`
  display: flex;

  ${({
    theme,
    gap = 0,
    direction = 'column',
    alignItems = 'normal',
    justifyContent = 'normal',
    wrap = 'nowrap',
  }) => `
    gap: ${theme.space[gap]};
    flex-direction: ${direction};
    align-items: ${alignItems};
    justify-content: ${justifyContent};
    flex-wrap: ${typeof wrap === 'boolean' ? 'wrap' : wrap};
  `}
`

export default Stack
