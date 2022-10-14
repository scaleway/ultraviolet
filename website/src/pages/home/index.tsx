import styled from '@emotion/styled'
import { Button, Separator, Text, down } from '@scaleway/ui'
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

const StyledCommunityContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: ${({ theme }) => theme.space['3']};
  background-color: ${({ theme }): string => theme.colors.neutral.background};
`

const StyledCommunityLeft = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space['3']};
`

const HomeContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: ${({ theme }) => theme.space['8']};
  max-width: ${APP_MAX_WIDTH}px;
  ${({ theme }) => down('medium', `padding: 0 ${theme.space['2']};`)}
`

const BuiltWithContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`

const Home = () => (
  <HomeContainer>
    <Introduction />
    <Separator />
    <GettingStarted />
    <AdvancedUseCases />
    <Separator />
    <OpenSource />
    <StyledCommunityContainer>
      <StyledCommunityLeft>
        <Image src={slackLogo} width="48" height="48" alt="Slack logo" />
        <div>
          <Text color="neutral" as="h4" variant="headingSmall">
            Connect with the community
          </Text>
          <Text color="neutral" as="p" variant="body">
            Join us if you want to report an issue, if you have any questions or
            if you just want to meet new people!
          </Text>
        </div>
      </StyledCommunityLeft>
      <Button
        title="Join the Community Slack"
        href="https://scaleway-community.slack.com/archives/C02M4HDPGB0"
        size="large"
      >
        Join the Community Slack
      </Button>
    </StyledCommunityContainer>
    <BuiltWithContainer>
      <Text color="neutral" as="span" variant="headingLarge">
        Built with
        <svg width={35} height={35} viewBox="0 0 24 24">
          <StyledGroup>
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </StyledGroup>
        </svg>
        in France
      </Text>
    </BuiltWithContainer>
  </HomeContainer>
)

export default Home
