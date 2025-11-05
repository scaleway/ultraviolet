import { GithubIcon } from '@ultraviolet/icons'
import { Link, Stack, Text } from '@ultraviolet/ui'
import swForm from '../../assets/icons/icon-scaleway-form.svg'
import swLib from '../../assets/icons/icon-scaleway-lib.svg'
import Card from '../../components/Card'
import {
  openSourceCard,
  openSourceDescription,
  openSourceStack,
  openSourceTitle,
} from './styles.css'

const OpenSource = () => (
  <section>
    <Stack gap={5}>
      <Stack gap={2}>
        <Text
          as="h3"
          className={openSourceTitle}
          id="open-source"
          variant="heading"
        >
          Open Source
        </Text>
        <Text as="p" sentiment="neutral" variant="body">
          Discover our other open source projects:
        </Text>
      </Stack>

      <Stack className={openSourceStack} direction="row" gap={2}>
        <Card
          className={openSourceCard}
          description={
            <>
              <div className={openSourceDescription}>
                Build amazing forms with Ultraviolet UI and React Final Form 🚀
              </div>
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
        <Card
          className={openSourceCard}
          description={
            <>
              <div className={openSourceDescription}>
                Scaleway Lib is a set of NPM packages used at Scaleway
              </div>
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
      </Stack>
    </Stack>
  </section>
)

export default OpenSource
