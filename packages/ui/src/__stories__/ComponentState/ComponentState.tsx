import { linkTo } from '@storybook/addon-links'
import * as components from '../../components'
import { Button } from '../../components/Button'
import { Stack } from '../../components/Stack'
import { Table } from '../../components/Table'
import { Text } from '../../components/Text'

const findComponentState = (parameters: {
  deprecated?: boolean
  experimental?: boolean
}) => {
  if (parameters?.deprecated) {
    return '⚠️ Deprecated'
  }

  if (parameters?.experimental) {
    return '🧪 Experimental'
  }

  return '✅ Stable'
}

const componentsNames = Object.keys(components)
let modules: PromiseSettledResult<{
  default: {
    title: string
    parameters: {
      deprecated: boolean
    }
  }
}>[]

Promise.allSettled(
  componentsNames.map(
    name => import(`../../components/${name}/__stories__/index.stories`),
  ),
)
  .then(module => {
    modules = module
  })
  .catch(() => {})

const ComponentState = () => (
  <Stack gap={4}>
    <Text as="p" variant="body">
      Here you will find all our components and their states. They are updated
      automatically based on configuration of the component story.
    </Text>

    <Stack gap={3}>
      <Text as="h2" variant="heading">
        Definition of states
      </Text>
      <Stack gap={1}>
        <Text as="h3" variant="headingSmall">
          ✅ Stable
        </Text>
        <Text as="p" variant="body">
          Stable state means the component is ready for production. If a
          breaking change occurs it will generate a major version.
        </Text>
      </Stack>

      <Stack gap={1}>
        <Text as="h3" variant="headingSmall">
          🧪 Experimental
        </Text>
        <Text as="p" variant="body">
          Experimental state means the component is being tested and props might
          change in the future. The component itself might even disappear if we
          don&apos;t find a real purpose for it. This state is also used for new
          version of a component (ex: Button v2) that we want to test before
          replacing the old one. In any case{' '}
          <Text as="span" variant="bodyStronger">
            this state means the component is not ready for production
          </Text>
          .
        </Text>
        <Text variant="body" as="p">
          An experimental component won&apos;t generate major version when
          having a breaking change.
        </Text>
      </Stack>

      <Stack gap={1}>
        <Text as="h3" variant="headingSmall">
          ⚠️ Deprecated
        </Text>
        <Text as="p" variant="body">
          Deprecated state means the component is not recommended for use and
          will be removed in the future. When seeing a component you use being
          deprecated you should start migrating to another component as soon as
          possible. To know what to use instead you can check the story of the
          deprecated component.
        </Text>
      </Stack>
    </Stack>
    <Stack gap={3}>
      <Text as="h2" variant="heading">
        Components list
      </Text>

      <Stack gap={1}>
        <Text as="p" variant="body">
          <Text as="span" variant="bodyStronger">
            Number of components
          </Text>
          : {componentsNames.length}
        </Text>
        <Table>
          <Table.Head>
            <Table.Row>
              <Table.HeadCell>Name</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>State</Table.HeadCell>
            </Table.Row>
          </Table.Head>
          <Table.Body striped>
            {modules.map(module => {
              if (module.status === 'fulfilled') {
                const desctructuredName: string[] =
                  module?.value?.default?.title
                    ?.replace('Components/', '')
                    .split('/') ?? []

                const componentCategory = desctructuredName[1]
                  ? desctructuredName[0]
                  : 'Others'
                const componentName = desctructuredName[1]
                  ? desctructuredName[1]
                  : desctructuredName[0]

                const componentState = findComponentState(
                  module?.value?.default?.parameters,
                )

                return (
                  <Table.Row>
                    <Table.BodyCell>
                      <Text as="span" variant="bodyStrong">
                        <Button
                          onClick={linkTo(module?.value?.default?.title)}
                          variant="link"
                        >
                          {componentName}
                        </Button>
                      </Text>
                    </Table.BodyCell>
                    <Table.BodyCell>
                      <Text as="span" variant="body">
                        {componentCategory}
                      </Text>
                    </Table.BodyCell>
                    <Table.BodyCell>
                      <Text as="span" variant="body">
                        {componentState}
                      </Text>
                    </Table.BodyCell>
                  </Table.Row>
                )
              }

              return null
            })}
          </Table.Body>
        </Table>
      </Stack>
    </Stack>
  </Stack>
)

export default ComponentState
