import styled from '@emotion/styled'
import { Text, down } from '@scaleway/ui'
import { APP_MAX_WIDTH } from '../constants'
import GithubAndDocumentationButtons from './GithubAndDocumentationButtons'
import Logo from './Logo'

const StyledFooter = styled.footer`
  box-shadow: 0 0 8px 2px rgba(178, 182, 195, 0.37);
  width: 100%;
  display: flex;
  justify-content: center;
  padding: ${({ theme }) => theme.space['4']};
`

const FooterRow = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${({ theme }) => theme.space['4']};
  flex: 1;
  max-width: ${APP_MAX_WIDTH}px;
`

const DisclaimerContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space['2']};
  ${down('medium', 'flex-direction: row-reverse;')}
`

const Footer = () => (
  <StyledFooter>
    <FooterRow>
      <div>
        <Text color="neutral" as="p" variant="body">
          Hosted in green datacenters in France
        </Text>
        <Text color="neutral" as="p" variant="bodySmall" prominence="weak">
          Our datacenters are designed and built to deliver excellent energy
          efficiency. They offer a low carbon footprint with our guaranteed
          clean energy source. We embrace both disruptive and state-of-the-art
          technologies that reduce our environmental impact.
        </Text>
      </div>
      <DisclaimerContainer>
        <Logo width={124} height={24} />
        <GithubAndDocumentationButtons />
      </DisclaimerContainer>
    </FooterRow>
  </StyledFooter>
)

export default Footer
