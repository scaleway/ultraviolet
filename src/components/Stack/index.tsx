import styled from '@emotion/styled'
import { CSSProperties, ReactNode } from 'react'
import { SCWUITheme } from '../..'

type StackCSSProperties = {
  gap: keyof SCWUITheme['space']
  direction: 'row' | 'column'
  alignItems: CSSProperties['alignItems']
  justifyContent: CSSProperties['justifyContent']
}

type StackProps = Partial<StackCSSProperties> & {
  className?: string
  children: ReactNode
}

const Root = styled('div', {
  shouldForwardProp: prop =>
    !['gap', 'direction', 'alignItems', 'justifyContent'].includes(prop),
})<StackCSSProperties>`
  display: flex;

  ${({ theme, gap, direction, alignItems, justifyContent }) => `
    gap: ${theme.space[gap]};
    flex-direction: ${direction};
    align-items: ${alignItems || 'normal'};
    justify-content: ${justifyContent || 'normal'};
  `}
`

const Stack = ({
  gap = 0,
  direction = 'column',
  alignItems,
  justifyContent,
  className,
  children,
}: StackProps) => (
  <Root
    className={className}
    gap={gap}
    direction={direction}
    alignItems={alignItems}
    justifyContent={justifyContent}
  >
    {children}
  </Root>
)

export default Stack
