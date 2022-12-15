import styled from '@emotion/styled'
import type { HTMLAttributes, ReactNode } from 'react'

const StyledScrollView = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-y: auto;
`

type ScrollViewProps = HTMLAttributes<HTMLDivElement> & { children: ReactNode }

const ScrollView = (props: ScrollViewProps) => <StyledScrollView {...props} />

export default ScrollView
