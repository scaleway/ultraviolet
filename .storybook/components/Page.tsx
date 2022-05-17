import React from 'react'
import {
  Title,
  Subtitle,
  Description,
  Primary,
  ArgsTable,
  Stories,
  PRIMARY_STORY,
} from '@storybook/addon-docs'
import { Badge } from '../../src'
import styled from '@emotion/styled'

const StyledText = styled.p`
  color: ${({ theme }) => theme.colors.warning.text};
`

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

type PageProps = {
  deprecated?: boolean
}

const Page = ({ deprecated }: PageProps) => (
  <>
    <StyledDiv>
      <Title />
      {deprecated ? (
        <Badge variant="warning" size="large">
          <b>Deprecated</b>
        </Badge>
      ) : null}
    </StyledDiv>
    {deprecated ? (
      <StyledText>
        <b>This component is deprecated please do not use it any more.</b>
      </StyledText>
    ) : (
      <Subtitle />
    )}
    <Description />
    <Primary />
    <ArgsTable story={PRIMARY_STORY} />
    <Stories />
  </>
)

export default Page
