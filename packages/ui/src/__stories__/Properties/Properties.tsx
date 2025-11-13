import styled from '@emotion/styled'
import type { ComponentType } from 'react'
import * as components from '../../components'
import { Stack } from '../../components/Stack'
import { Table } from '../../components/Table'
import { Text } from '../../components/Text'

const StyledTableRow = styled(Table.Row)`
  vertical-align: top;
`

type PropertyType = {
  defaultValue: {
    value: string
  }
  description: string
  name: string
  required: boolean
  type: {
    name: string
    value?: { value: string }[]
  }
}

type ModuleType = ({
  __docgenInfo: {
    props: Record<string, Record<string, PropertyType>>
  }
  displayName: string
} & ComponentType) & {
  type: {
    __docgenInfo: {
      props: Record<string, Record<string, PropertyType>>
    }
    displayName: string
  }
}

const Properties = () => {
  const componentsList = Object.values(components) as ModuleType[]

  /* eslint-disable no-underscore-dangle */
  const componentNameAndProperties = componentsList.reduce<
    Record<string, Record<string, unknown>>
  >((acc, component) => {
    if (component?.__docgenInfo?.props) {
      return {
        ...acc,
        [component.displayName]: component.__docgenInfo.props,
      }
    }

    if (component?.type?.__docgenInfo?.props) {
      return {
        ...acc,
        [component.type.displayName]: component.type.__docgenInfo.props,
      }
    }

    return acc
  }, {})
  /* eslint-enable no-underscore-dangle */

  const propertiesList = Object.keys(componentNameAndProperties).flatMap(key =>
    Object.keys(componentNameAndProperties[key]),
  )

  const countPropertiesUsages = propertiesList.reduce<Record<string, number>>(
    (acc, property) => {
      if (!acc[property]) {
        acc[property] = 1
      } else {
        acc[property] += 1
      }

      return acc
    },
    {},
  )

  const propertiesUsagesCountAndComponentsName = Object.entries(
    countPropertiesUsages,
  ).reduce<Record<string, { count: number; components: string[] }>>(
    (acc, [property, count]) => {
      const componentsMatching = Object.entries(
        componentNameAndProperties,
      ).reduce<string[]>((accumulator, [component, properties]) => {
        if (Object.keys(properties).includes(property)) {
          return [...accumulator, component]
        }

        return accumulator
      }, [])

      return { ...acc, [property]: { components: componentsMatching, count } }
    },
    {},
  )

  const sortedPropertiesUsagesCountAndComponentsName = Object.entries(
    propertiesUsagesCountAndComponentsName,
  )
    .toSorted(([, { count: countA }], [, { count: countB }]) => countB - countA)
    .reduce<Record<string, { count: number; components: string[] }>>(
      (acc, [property, value]) => ({
        ...acc,
        [property]: value,
      }),
      {},
    )

  return (
    <Stack gap={3}>
      <Stack gap={2}>
        <Text as="p" variant="body">
          This page is used to track the usage of properties across the library.
        </Text>
        <Text as="p" variant="body">
          <Text as="span" variant="bodyStrong">
            Similar property name*:
          </Text>
          &nbsp;this is a list of properties that are similar to the current
          property. The way it checks is not very precise, it just checks if the
          property name contains some part of the other property name.
        </Text>
        <Text as="p" variant="body">
          <Text as="span" variant="bodyStronger">
            Number of properties
          </Text>
          : {Object.keys(propertiesUsagesCountAndComponentsName).length}
        </Text>
      </Stack>
      <Table
        columns={[
          { label: 'Property Name' },
          { label: 'Number of usages' },
          { label: 'Values' },
          { label: 'Similar property name*' },
          { label: 'Components usage' },
        ]}
        stripped
      >
        <Table.Body>
          {Object.keys(sortedPropertiesUsagesCountAndComponentsName).map(
            property => {
              const lowerCaseProperty = property.toLowerCase()
              const findSimilarProperty = [
                ...new Set(
                  propertiesList
                    .map(localProperty => {
                      const lowerCaseLocalProperty = localProperty.toLowerCase()

                      for (
                        let i = 4;
                        i < lowerCaseLocalProperty.length;
                        i += 1
                      ) {
                        const localPropertySubstring = lowerCaseLocalProperty
                          .substring(0, i)
                          .toLocaleLowerCase()

                        if (
                          lowerCaseProperty.includes(localPropertySubstring) &&
                          lowerCaseLocalProperty !== lowerCaseProperty
                        ) {
                          return localProperty
                        }
                      }

                      const reversedLocalProperty = [...lowerCaseLocalProperty]
                        .toReversed()
                        .join('')
                      const reversedLowerCaseProperty = [...lowerCaseProperty]
                        .toReversed()
                        .join('')

                      for (
                        let i = 4;
                        i < reversedLocalProperty.length;
                        i += 1
                      ) {
                        const reverseLocalPropertySubstring =
                          reversedLocalProperty.substring(0, i)

                        if (
                          reversedLowerCaseProperty.includes(
                            reverseLocalPropertySubstring,
                          ) &&
                          reversedLocalProperty !== reversedLowerCaseProperty
                        ) {
                          return localProperty
                        }
                      }

                      return null
                    })
                    .filter(Boolean),
                ),
              ]

              const propertyValues = [
                ...new Set(
                  sortedPropertiesUsagesCountAndComponentsName[
                    property
                  ]?.components?.flatMap(component => {
                    const { name, value } =
                      (
                        componentNameAndProperties as Record<
                          string,
                          Record<string, PropertyType>
                        >
                      )[component]?.[property]?.type ?? {}

                    if (name === 'boolean') {
                      return ['true', 'false']
                    }

                    if (name === 'string') {
                      return ['string']
                    }

                    if (name === 'enum') {
                      return (
                        value?.map(localValue =>
                          localValue.value.replaceAll('"', ''),
                        ) ?? []
                      )
                    }

                    return []
                  }),
                ),
              ]

              return (
                <StyledTableRow id={property} key={property}>
                  <Table.Cell>
                    <Text as="span" variant="bodyStrong">
                      {property}
                    </Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text as="span" variant="body">
                      {
                        sortedPropertiesUsagesCountAndComponentsName[property]
                          .count
                      }
                    </Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text as="span" variant="body" whiteSpace="break-spaces">
                      {propertyValues.join(', ')}
                    </Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text as="span" variant="body" whiteSpace="break-spaces">
                      {findSimilarProperty.join(', ')}
                    </Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text as="span" variant="body" whiteSpace="break-spaces">
                      {sortedPropertiesUsagesCountAndComponentsName[
                        property
                      ].components.join(', ')}
                    </Text>
                  </Table.Cell>
                </StyledTableRow>
              )
            },
          )}
        </Table.Body>
      </Table>
    </Stack>
  )
}

export default Properties
