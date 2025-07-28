import styled from '@emotion/styled'
import { GithubIcon } from '@ultraviolet/icons'
import { down, Link, Stack, Text } from '@ultraviolet/ui'
import swForm from '../../assets/icons/icon-scaleway-form.svg'
import swLib from '../../assets/icons/icon-scaleway-lib.svg'
import Card from '../../components/Card'

const StyledDescription = styled.div`
  margin-bottom: 12px;
`

const StyledTitle = styled(Text)`
  align-self: center;
`

const StyledCard = styled(Card)`
  flex: 1;
`

const StyledStack = styled(Stack)`
  ${down('medium', 'flex-direction: column;')}
`

const OpenSource = () => (
  <section>
    <Stack gap={5}>
      <Stack gap={2}>
        <StyledTitle as="h3" id="open-source" variant="heading">
          Open Source
        </StyledTitle>
        <Text as="p" variant="body">
          Discover our other open source projects:
        </Text>
      </Stack>

      <StyledStack direction="row" gap={2}>
        <StyledCard
          description={
            <>
              <StyledDescription>
                Build amazing forms with Ultraviolet UI and React Final Form 🚀
              </StyledDescription>
              <Stack direction="row" gap={1}>
                <GithubIcon size="small" />
                <Link
                  href="https://github.com/scaleway/scaleway-form"
                  target="_blank"
                >
                  Visit on GitHub
                </Link>
              </Stack>
            </>
          }
          icon={swForm}
          title="Ultraviolet Form"
        />
        <StyledCard
          description={
            <>
              <StyledDescription>
                Scaleway Lib is a set of NPM packages used at Scaleway
              </StyledDescription>
              <Stack direction="row" gap={1}>
                <GithubIcon size="small" />
                <Link
                  href="https://github.com/scaleway/scaleway-lib"
                  target="_blank"
                >
                  Visit on GitHub
                </Link>
              </Stack>
            </>
          }
          icon={swLib}
          title="Scaleway Lib"
        />
      </StyledStack>
    </Stack>
  </section>
)

export default OpenSource
