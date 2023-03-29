import styled from '@emotion/styled'
import type { CSSProperties, ReactNode } from 'react'
import type { SCWUITheme } from '../../theme'

type StyledRowProps = Pick<RowProps, 'gap' | 'templateColumns' | 'alignItems'>
export const StyledRow = styled('div', {
  shouldForwardProp: prop =>
    !['templateColumns', 'gap', 'alignItems'].includes(prop),
})<StyledRowProps>`
  display: grid;
  ${({ theme, gap, alignItems = 'normal', templateColumns }) => `
    grid-template-columns: ${templateColumns};
    ${gap ? `gap: ${theme.space[gap]};` : ''}
    align-items: ${alignItems};
  `}
`

type RowProps = {
  className?: string
  'data-testid'?: string
  children: ReactNode
  templateColumns: string
  gap?: keyof SCWUITheme['space']
  alignItems?: CSSProperties['alignItems']
}

export const Row = ({
  className,
  'data-testid': dataTestId,
  children,
  templateColumns,
  alignItems,
  gap,
}: RowProps) => (
  <StyledRow
    className={className}
    data-testid={dataTestId}
    gap={gap}
    templateColumns={templateColumns}
    alignItems={alignItems}
  >
    {children}
  </StyledRow>
)
