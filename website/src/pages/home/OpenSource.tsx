import styled from '@emotion/styled'
import { Icon, Link, Stack, Text } from '@scaleway/ui'
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

const OpenSource = () => (
  <section>
    <Stack gap={5}>
      <Stack gap={2}>
        <StyledTitle as="h3" variant="heading" id="open-source">
          Open Source
        </StyledTitle>
        <Text as="p" variant="body">
          Discover our other open source projects:
        </Text>
      </Stack>

      <Stack gap={2} direction="row">
        <StyledCard
          title="Scaleway Form"
          description={
            <>
              <StyledDescription>
                Build amazing forms with Scaleway UI and React Final Form 🚀
              </StyledDescription>
              <Stack gap={1} direction="row">
                <Icon name="github" size={20} />
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
        />
        <StyledCard
          title="Scaleway Lib"
          description={
            <>
              <StyledDescription>
                Scaleway Lib is a set of NPM packages used at Scaleway
              </StyledDescription>
              <Stack gap={1} direction="row">
                <Icon name="github" size={20} />
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
        />
      </Stack>
    </Stack>
  </section>
)

export default OpenSource
