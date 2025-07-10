import styled from '@emotion/styled'
import { linkTo } from '@storybook/addon-links'
import {
  Controls,
  Description,
  Primary,
  Stories,
  Subtitle,
  Title,
} from '@storybook/addon-docs/blocks'
import { Alert, Stack, Text } from '@ultraviolet/ui'
import background from '../assets/brand-background.png'

const TitleDecorator = styled.div`
  h1 {
    color: ${({ theme }) => theme.colors.neutral.text};
    font-size: ${({ theme }) => theme.typography.headingLargeStronger.fontSize};
    font-family: ${({ theme }) => theme.typography.headingLargeStronger.fontFamily};
    font-weight: ${({ theme }) => theme.typography.headingLargeStronger.weight};
    letter-spacing: ${({ theme }) => theme.typography.headingLargeStronger.letterSpacing};
    line-height: ${({ theme }) => theme.typography.headingLargeStronger.lineHeight};
    text-transform: ${({ theme }) => theme.typography.headingLargeStronger.textCase};
    text-decoration: ${({ theme }) => theme.typography.headingLargeStronger.textDecoration};
    padding: ${({ theme }) => theme.space[5]} ${({ theme }) => theme.space[3]};
    border-radius: ${({ theme }) => theme.radii.default};
    background-image: url(${background});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 100%;
  }
`

const StyledH2 = styled(Text)`
  padding-bottom: ${({ theme }) => theme.space[1]};
  margin-bottom: ${({ theme }) => theme.space[2]};
  border-bottom: 2px solid ${({ theme }) => theme.colors.neutral.borderStronger};
`

const StoriesDecorator = styled(Stack)`
  #stories {
    color: ${({ theme }) => theme.colors.neutral.text};
    font-size: ${({ theme }) => theme.typography.headingStrong.fontSize};
    font-family: ${({ theme }) => theme.typography.headingStrong.fontFamily};
    font-weight: ${({ theme }) => theme.typography.headingStrong.weight};
    letter-spacing: ${({ theme }) => theme.typography.headingStrong.letterSpacing};
    line-height: ${({ theme }) => theme.typography.headingStrong.lineHeight};
    text-transform: ${({ theme }) => theme.typography.headingStrong.textCase};
    text-decoration: ${({ theme }) => theme.typography.headingStrong.textDecoration};
    padding-bottom: ${({ theme }) => theme.space[1]};
    border-bottom: 2px solid ${({ theme }) => theme.colors.neutral.borderStronger};
    margin-bottom: ${({ theme }) => theme.space[2]};
  }
`

const StoriesThemes = styled.div`
  .docs-story > div {
    padding: 0;
  }

  .css-xzp052 .innerZoomElementWrapper > * {
    border: 0 !important;
  }
`

type PageProps = {
  deprecated?: boolean
  deprecatedReason?: string
  migrationLink?: string
  hideArgsTable?: boolean
  experimental?: boolean
}

const Page = ({
  deprecated,
  deprecatedReason,
  migrationLink,
  hideArgsTable,
  experimental,
}: PageProps) => (
  <StoriesThemes>
    <Stack gap={1}>
      <div>
        <TitleDecorator>
          <Title />
        </TitleDecorator>
        {deprecated ? (
          <Alert
            title="Deprecated component"
            buttonText={migrationLink ? 'How to migrate?' : undefined}
            onClickButton={migrationLink ? linkTo(migrationLink) : undefined}
          >
            {deprecatedReason ?? 'This component is deprecated and should not be used in new projects.'}
          </Alert>
        ) : null}
        {experimental ? (
          <Alert
            sentiment="warning"
            title="Experimental component"
            buttonText="Learn more about component states"
            onClickButton={linkTo('state-components-state--docs')}
          >
            This component is at an unstable stage and is subject to change in
            future releases.
          </Alert>
        ) : null}
      </div>
      <Stack gap={2}>
        <Stack>
          <StyledH2 as="h2" variant="headingStrong">
            Overview
          </StyledH2>
          <Subtitle />
          <Description />
        </Stack>
        <div>
          <Primary />
          {!hideArgsTable ? (
            <>
              <StyledH2 as="h2" variant="headingStrong">
                Props
              </StyledH2>
              <Controls />
            </>
          ) : null}
        </div>
        <StoriesDecorator>
          <Stories />
        </StoriesDecorator>
      </Stack>
    </Stack>
  </StoriesThemes>
)

export default Page
