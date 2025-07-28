import styled from '@emotion/styled'
import { Breakpoint, down, Stack, Text } from '@ultraviolet/ui'
import Image from 'next/image'
import swA11y from '../../assets/icons/icon-scaleway-a11y.svg'
import swCustom from '../../assets/icons/icon-scaleway-custom.svg'
import swDx from '../../assets/icons/icon-scaleway-dx.svg'
import introductionIllustration from '../../assets/illustrations/introduction.svg'
import Card from '../../components/Card'
import GithubAndDocumentationButtons from '../../components/GithubAndDocumentationButtons'

const HeadingContainer = styled(Stack)`
  ${down('medium', 'flex-direction: column;')}
`

const Introduction = () => (
  <Stack gap={6}>
    <HeadingContainer
      alignItems="center"
      direction="row"
      gap={2}
      justifyContent="space-between"
    >
      <Breakpoint down="medium">
        <GithubAndDocumentationButtons />
      </Breakpoint>
      <Stack>
        <Text as="h1" sentiment="primary" variant="headingLarge">
          Scaleway <b>UI</b>
        </Text>
        <Text as="h2" prominence="weak" sentiment="primary" variant="heading">
          Open Source <br />
          Component Library
        </Text>
      </Stack>
      <Image
        alt="A woman and a man designing a digital user interface"
        priority
        src={introductionIllustration}
        width={500}
      />
    </HeadingContainer>

    <HeadingContainer direction="row" gap={2} justifyContent="space-between">
      <Card
        description="We follow WAI-ARIA standards for each component."
        icon={swA11y}
        title="Accessibility"
      />
      <Card
        description="Easily define dark and light themes and customize them with various colors."
        icon={swCustom}
        title="Customizable"
      />
      <Card
        description="Ultraviolet UI is the main library in the Scaleway frontend environment. It is open source and continually maintained by our developers."
        icon={swDx}
        title="Developer XP"
      />
    </HeadingContainer>
  </Stack>
)

export default Introduction
