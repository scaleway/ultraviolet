import styled from '@emotion/styled'
import { Icon, Link, Text } from '@scaleway/ui'
import swForm from '../../assets/icons/icon-scaleway-form.svg'
import swLib from '../../assets/icons/icon-scaleway-lib.svg'
import Card from '../../components/Card'

const StyledDescription = styled.div`
  margin-bottom: 12px;
`

const StyledOpenSourceContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space['5']};
`

const StyledOpenSourceTitleContainer = styled(StyledOpenSourceContainer)`
  gap: ${({ theme }) => theme.space['2']};
`

const StyledTitle = styled(Text)`
  align-self: center;
`

const StyledProjectsContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space['2']};
  flex-wrap: wrap;
`

const StyledCard = styled(Card)`
  flex: 1;
`

const GithubLinkContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space['1']};
  align-items: center;
`

const OpenSource = () => (
  <StyledOpenSourceContainer>
    <StyledOpenSourceTitleContainer>
      <StyledTitle as="h3" variant="heading">
        Open Source
      </StyledTitle>
      <Text as="p" variant="body">
        Discover our other open source projects:
      </Text>
    </StyledOpenSourceTitleContainer>

    <StyledProjectsContainer>
      <StyledCard
        title="Scaleway Form"
        description={
          <>
            <StyledDescription>
              Build amazing forms with Scaleway UI and React Final Form 🚀
            </StyledDescription>
            <GithubLinkContainer>
              <Icon name="github" size={20} />
              <Link
                href="https://github.com/scaleway/scaleway-form"
                target="_blank"
              >
                Visit on GitHub
              </Link>
            </GithubLinkContainer>
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
            <GithubLinkContainer>
              <Icon name="github" size={20} />
              <Link
                href="https://github.com/scaleway/scaleway-lib"
                target="_blank"
              >
                Visit on GitHub
              </Link>
            </GithubLinkContainer>
          </>
        }
        icon={swLib}
      />
    </StyledProjectsContainer>
  </StyledOpenSourceContainer>
)

export default OpenSource
