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
import { Badge, Button } from '../../src'
import styled from '@emotion/styled'
import { linkTo } from '@storybook/addon-links'

const StyledText = styled.p`
  color: ${({ theme }) => theme.colors.warning.text};
`

const StyledHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const StyledTitle = styled.div`
  &[data-deprecated='true'] h1 {
    text-decoration: line-through;
    text-decoration-color: ${({ theme }) => theme.colors.warning.text};
  }
`

const FlexDiv = styled.div`
  display: flex;
  justify-content: space-between;
`

type PageProps = {
  deprecated?: boolean
  deprecatedReason?: string
  migrationLink?: string
}

const Page = ({ deprecated, deprecatedReason, migrationLink }: PageProps) => (
  <>
    <StyledHeaderContainer>
      <StyledTitle data-deprecated={deprecated}>
        <Title />
      </StyledTitle>
      {deprecated ? (
        <Badge variant="warning" size="large">
          <b>Deprecated</b>
        </Badge>
      ) : null}
    </StyledHeaderContainer>
    {deprecated ? (
      <FlexDiv>
        <StyledText>
          <b>
            {deprecatedReason
              ? deprecatedReason
              : 'This component is deprecated please do not use it any more.'}
          </b>
        </StyledText>
        {migrationLink ? (
          <p>
            <Button onClick={linkTo(migrationLink)} variant="link">
              How to migrate?
            </Button>
          </p>
        ) : null}
      </FlexDiv>
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
