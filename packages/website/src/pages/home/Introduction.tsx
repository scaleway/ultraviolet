import styled from '@emotion/styled'
import { Breakpoint, Text, down } from '@scaleway/ui'
import Image from 'next/image'
import swA11y from '../../assets/icons/icon-scaleway-a11y.svg'
import swCustom from '../../assets/icons/icon-scaleway-custom.svg'
import swDx from '../../assets/icons/icon-scaleway-dx.svg'
import swUI from '../../assets/icons/icon-scaleway-ui.svg'
import introductionIllustration from '../../assets/illustrations/introduction.svg'
import Card from '../../components/Card'
import GithubAndDocumentationButtons from '../../components/GithubAndDocumentationButtons'

const IntroductionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space['4']};
`

const HeadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: ${({ theme }) => theme.space['4']};
  ${down('medium', 'flex-direction: column-reverse;')}
`

const NameContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space['1']};
  align-items: center;
`

const StyledCard = styled(Card)`
  flex: 1;
`

const KeyFeaturesContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space['1']};
  justify-content: space-between;
  flex-wrap: wrap;
`

const Introduction = () => (
  <IntroductionContainer>
    <HeadingContainer>
      <Breakpoint down="medium">
        <GithubAndDocumentationButtons />
      </Breakpoint>
      <div>
        <NameContainer>
          <Image src={swUI} alt="An open book icon" width={48} height={48} />
          <Text
            as="h1"
            variant="headingLarge"
            color="primary"
            prominence="stronger"
          >
            Scaleway <b>UI</b>
          </Text>
        </NameContainer>
        <Text as="h2" variant="heading">
          Open Source <br />
          Component Library
        </Text>
      </div>
      <div>
        <Image
          src={introductionIllustration}
          alt="A woman and a man designing a digital user interface"
          width={470}
          height={373}
          priority
        />
      </div>
    </HeadingContainer>

    <KeyFeaturesContainer>
      <StyledCard
        title="Accessibility"
        description="We follow WAI-ARIA standards for each component."
        icon={swA11y}
      />
      <StyledCard
        title="Customizable"
        description="Easily define dark and light themes and customize them with various colors."
        icon={swCustom}
      />
      <StyledCard
        title="Developer XP"
        description="Scaleway UI is the main library in the Scaleway frontend environment. It is open source and continually maintained by our developers."
        icon={swDx}
      />
    </KeyFeaturesContainer>
  </IntroductionContainer>
)

export default Introduction
