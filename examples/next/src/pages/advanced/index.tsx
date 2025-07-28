import styled from '@emotion/styled'
import { Button, down, Separator, Stack, Text } from '@ultraviolet/ui'
import Image from 'next/image'
import slackLogo from '../../assets/icons/icon-slack.svg'
import { APP_MAX_WIDTH } from '../../constants'
import AdvancedUseCases from './AdvancedUseCases'
import GettingStarted from './GettingStarted'
import Introduction from './Introduction'
import OpenSource from './OpenSource'

const StyledGroup = styled.g`
  fill: ${({ theme }): string => theme.colors.danger.backgroundStrong};

  svg {
    width: 100%;
  }
`

const StyledCommunityContainer = styled(Stack)`
  padding: ${({ theme }) => theme.space['3']};
  background-color: ${({ theme }): string => theme.colors.primary.background};
  border-radius: ${({ theme }) => theme.radii.default};
  ${down('medium', 'flex-direction: column; justify-content: start;')}
`

const HomeContainer = styled(Stack)`
  max-width: ${APP_MAX_WIDTH}px;
  ${({ theme }) =>
    down('medium', `padding: 0 ${theme.space['2']}; width: 100%`)}
`

const Home = () => (
  <HomeContainer gap={8}>
    <Introduction />
    <Separator />
    <GettingStarted />
    <AdvancedUseCases />
    <Separator />
    <OpenSource />
    <StyledCommunityContainer
      alignItems="center"
      direction="row"
      gap={2}
      justifyContent="space-evenly"
    >
      <Stack alignItems="center" direction="row" gap={3}>
        <Image alt="Slack logo" height="48" src={slackLogo} width="48" />
        <div>
          <Text as="h4" variant="headingSmall">
            Connect with the community
          </Text>
          <Text as="p" variant="body">
            Join us if you want to report an issue, if you have any questions or
            if you just want to meet new people!
          </Text>
        </div>
      </Stack>
      <Button
        aria-label="join slack community"
        href="https://scaleway-community.slack.com/archives/C02M4HDPGB0"
        size="large"
      >
        Join the Community Slack
      </Button>
    </StyledCommunityContainer>
    <Stack alignItems="center" direction="row" justifyContent="center">
      <Text as="span" variant="heading">
        Built with&nbsp;
        <svg aria-label="heart" height={35} viewBox="0 0 24 24" width={35}>
          <StyledGroup>
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </StyledGroup>
        </svg>
        &nbsp;in France
      </Text>
    </Stack>
  </HomeContainer>
)

export default Home
