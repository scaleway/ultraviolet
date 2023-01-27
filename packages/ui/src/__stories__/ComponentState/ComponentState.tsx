import * as components from '../../components'
import { Stack } from '../../components/Stack'
import { Table } from '../../components/Table'
import { Text } from '../../components/Text'

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
  <Stack gap={3}>
    <Stack gap={1}>
      <Text as="p" variant="body">
        Here you will find all our components and their states. They are updated
        automatically based on configuration of the component story.
      </Text>
      <Text as="p" variant="body">
        <Text as="span" variant="bodyStronger">
          Number of components
        </Text>
        : {componentsNames.length}
      </Text>
    </Stack>
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

            return (
              <Table.Row>
                <Table.BodyCell>
                  <Text as="span" variant="bodyStrong">
                    {componentName}
                  </Text>
                </Table.BodyCell>
                <Table.BodyCell>
                  <Text as="span" variant="body">
                    {componentCategory}
                  </Text>
                </Table.BodyCell>
                <Table.BodyCell>
                  <Text as="span" variant="body">
                    {module?.value?.default?.parameters?.deprecated
                      ? 'Deprecated ❌'
                      : 'Healthy ✅'}
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
)

export default ComponentState
