import styled from '@emotion/styled'
import type { HTMLAttributes, ReactNode } from 'react'

const StyledScrollView = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-y: auto;
`

type ScrollViewProps = HTMLAttributes<HTMLDivElement> & { children: ReactNode }

export const ScrollView = (props: ScrollViewProps) => (
  <StyledScrollView {...props} />
)
