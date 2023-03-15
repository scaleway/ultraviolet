import styled from '@emotion/styled'
import type { CSSProperties, ForwardedRef, ReactNode } from 'react'
import { forwardRef } from 'react'
import type { SCWUITheme } from '../../theme'

type StyledRowProps = Pick<RowV2Props, 'gap' | 'templateColumns' | 'alignItems'>
export const StyledRow = styled('div', {
  shouldForwardProp: prop =>
    !['templateColumns', 'gap', 'alignItems'].includes(prop),
})<StyledRowProps>`
  display: grid;
  ${({ theme, gap = 2, alignItems = 'normal', templateColumns }) => `
    grid-template-columns: ${templateColumns};
    grid-gap: ${theme.space[gap]};
    align-items: ${alignItems};
  `}
`

type RowV2Props = {
  id?: string
  className?: string
  dataTestId?: string
  children: ReactNode
  templateColumns: string
  gap?: keyof SCWUITheme['space']
  alignItems?: CSSProperties['alignItems']
}

export const RowV2 = forwardRef(
  (
    {
      id,
      className,
      dataTestId,
      children,
      templateColumns,
      alignItems,
      gap,
    }: RowV2Props,
    ref: ForwardedRef<HTMLDivElement>,
  ) => (
    <StyledRow
      ref={ref}
      id={id}
      className={className}
      data-testid={dataTestId}
      gap={gap}
      templateColumns={templateColumns}
      alignItems={alignItems}
    >
      {children}
    </StyledRow>
  ),
)
