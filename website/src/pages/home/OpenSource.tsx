import styled from '@emotion/styled'
import { Col, Grid, Icon, Link, Row, Typography } from '@scaleway/ui'
import swForm from '../../assets/icons/icon-scaleway-form.svg'
import swLib from '../../assets/icons/icon-scaleway-lib.svg'
import Card from '../../components/Card'

const StyledDescription = styled.div`
  margin-bottom: 12px;
`

const OpenSource = (): JSX.Element => (
  <Grid mt={4}>
    <Row textAlign="center" justifyContent="center">
      <Col xsmall={10}>
        <Typography variant="hero" mb={5}>
          Open Source
        </Typography>
        <Typography textAlign="justify">
          Discover our other open source projects:
        </Typography>
      </Col>
    </Row>

    <Row mt={5}>
      <Col xsmall={12} large={6}>
        <Card
          title="Scaleway Form"
          description={
            <>
              <StyledDescription>
                Build amazing forms with Scaleway UI and React Final Form 🚀
              </StyledDescription>
              <div>
                <Icon name="github" mr={1} size={20} />
                <Link
                  href="https://github.com/scaleway/scaleway-form"
                  target="_blank"
                >
                  Visit on GitHub
                </Link>
              </div>
            </>
          }
          icon={swForm}
        />
      </Col>
      <Col xsmall={12} large={6}>
        <Card
          title="Scaleway Lib"
          description={
            <>
              <StyledDescription>
                Scaleway Lib is a set of NPM packages used at Scaleway
              </StyledDescription>
              <div>
                <Icon name="github" mr={1} size={20} />
                <Link
                  href="https://github.com/scaleway/scaleway-lib"
                  target="_blank"
                >
                  Visit on GitHub
                </Link>
              </div>
            </>
          }
          icon={swLib}
        />
      </Col>
    </Row>
  </Grid>
)

export default OpenSource
