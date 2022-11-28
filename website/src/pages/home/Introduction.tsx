import styled from '@emotion/styled'
import { Breakpoint, Stack, Text, down } from '@scaleway/ui'
import Image from 'next/image'
import swA11y from '../../assets/icons/icon-scaleway-a11y.svg'
import swCustom from '../../assets/icons/icon-scaleway-custom.svg'
import swDx from '../../assets/icons/icon-scaleway-dx.svg'
import introductionIllustration from '../../assets/illustrations/introduction.svg'
import Card from '../../components/Card'
import GithubAndDocumentationButtons from '../../components/GithubAndDocumentationButtons'

const HeadingContainer = styled(Stack)`
  ${down('medium', 'flex-direction: column-reverse;')}
`

const StyledCard = styled(Card)`
  flex: 1;
`

const StyledStack = styled(Stack)`
  flex-wrap: wrap;
`

const Introduction = () => (
  <Stack gap={6}>
    <HeadingContainer
      gap={2}
      alignItems="center"
      justifyContent="space-between"
      direction="row"
    >
      <Breakpoint down="medium">
        <GithubAndDocumentationButtons />
      </Breakpoint>
      <Stack gap={3}>
        <Text as="h1" variant="headingLarge" color="primary">
          Scaleway <b>UI</b>
        </Text>
        <Text as="h2" variant="heading" color="primary" prominence="weak">
          Open Source <br />
          Component Library
        </Text>
      </Stack>
      <Image
        src={introductionIllustration}
        alt="A woman and a man designing a digital user interface"
        width={500}
        priority
      />
    </HeadingContainer>

    <StyledStack gap={2} justifyContent="space-between" direction="row">
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
    </StyledStack>
  </Stack>
)

export default Introduction
