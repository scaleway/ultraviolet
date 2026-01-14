import { Stack } from '../../Stack'
import { Text } from '../../Text'

export const treeMapChartSimpleData = {
  children: [
    {
      content: 'Compute',
      id: 'compute',
      value: 10,
    },
    {
      content: 'Network',
      id: 'network',
      value: 17.2,
    },
    {
      content: 'AI',
      id: 'ai',
      value: 14.2,
    },
  ],
  content: 'root',
  id: 'root',
}

export const treeMapChartWithCustomContentData = {
  children: [
    {
      content: (
        <Stack>
          <Text as="p" variant="body">
            Compute
          </Text>
          <Text as="p" variant="bodySmall">
            10 kgco2
          </Text>
        </Stack>
      ),
      id: 'compute',
      value: 10,
    },
    {
      content: (
        <Stack>
          <Text as="p" variant="body">
            Network
          </Text>
          <Text as="p" variant="bodySmall">
            10 kgco2
          </Text>
        </Stack>
      ),
      id: 'network',
      value: 17.2,
    },
    {
      content: (
        <Stack>
          <Text as="p" variant="body">
            AI
          </Text>
          <Text as="p" variant="bodySmall">
            10 kgco2
          </Text>
        </Stack>
      ),
      id: 'ai',
      value: 14.2,
    },
  ],
  content: 'root',
  id: 'root',
}

export const treeMapChartColorsData = {
  children: [
    {
      content: 'Compute',
      id: 'compute',
      value: 400,
    },
    {
      content: 'Network',
      id: 'network',
      value: 17.2,
    },
    {
      content: 'AI',
      id: 'ai',
      value: 14.2,
    },
    {
      content: 'Managed services',
      id: 'managed-services',
      value: 12.2,
    },
    {
      content: 'Observability',
      id: 'observability',
      value: 13.452,
    },
    {
      content: 'Domain & Webhosting',
      id: 'domain-and-webhosting',
      value: 0.32,
    },
    {
      content: 'Containers',
      id: 'containers',
      value: 31.47,
    },
    {
      content: 'Storage',
      id: 'storage',
      value: 10.65,
    },
    {
      content: 'Security and Identity',
      id: 'security-and-identity',
      value: 1.2,
    },
    {
      content: 'IAM',
      id: 'iam',
      value: 11.2,
    },
    {
      content: 'Billing',
      id: 'billing',
      value: 11.2,
    },
    {
      content: 'Environmental Footprint',
      id: 'environmental-footprint',
      value: 2,
    },
    {
      content: 'Audit Trail',
      id: 'audit-trail',
      value: 5.2,
    },
    {
      content: 'VPC',
      id: 'vpc',
      value: 3,
    },
  ],
  content: 'root',
  id: 'root',
}
