import { LeafIcon, RestoreIcon } from '@ultraviolet/icons'
import {
  FranceFlag,
  NetherlandsFlag,
  PolandFlag,
} from '@ultraviolet/icons/flags'
import { Stack, Text, Tooltip } from '@ultraviolet/ui'

export const firstSelectorOptions = [
  {
    content: (
      <Stack alignItems="center" direction="row" gap={0.5}>
        PARIS{' '}
        <Stack direction="row" gap="0.25">
          <LeafIcon sentiment="success" />
          <LeafIcon sentiment="success" />
          <LeafIcon sentiment="success" />
        </Stack>
      </Stack>
    ),
    icon: <FranceFlag />,
    value: 'fr',
  },
  {
    content: (
      <Stack alignItems="center" direction="row" gap={0.5}>
        WARSAW{' '}
        <Stack direction="row" gap="0.25">
          <LeafIcon sentiment="success" />
          <LeafIcon sentiment="success" />
          <LeafIcon sentiment="success" />
        </Stack>
      </Stack>
    ),
    icon: <PolandFlag />,
    value: 'pl',
  },
  {
    content: (
      <Stack alignItems="center" direction="row" gap={0.5}>
        AMSTERDAM{' '}
        <Stack direction="row" gap="0.25">
          <LeafIcon sentiment="success" />
          <LeafIcon sentiment="success" />
          <LeafIcon sentiment="success" />
        </Stack>
      </Stack>
    ),
    icon: <NetherlandsFlag />,
    value: 'nl',
  },
]

export const franceOptions = [
  {
    content: (
      <Stack alignItems="center" direction="row" gap={0.5}>
        PAR 1{' '}
        <Stack direction="row" gap="0.25">
          <LeafIcon sentiment="success" />
          <LeafIcon sentiment="success" />
          <LeafIcon disabled sentiment="neutral" />
        </Stack>
      </Stack>
    ),
    hoverContent: (
      <Stack alignItems="baseline" direction="row" gap={0.5}>
        PAR 1{' '}
        <Text as="div" sentiment="success" variant="caption">
          0.77 gCO2e/hour
        </Text>
      </Stack>
    ),
    icon: <FranceFlag />,
    optionalInfo: (
      <Tooltip text="Tooltip text">
        <RestoreIcon sentiment="info" size="medium" />
      </Tooltip>
    ),
    value: 'par-1',
  },
  {
    content: (
      <Stack alignItems="center" direction="row" gap={0.5}>
        PAR 2{' '}
        <Stack direction="row" gap="0.25">
          <LeafIcon sentiment="success" />
          <LeafIcon sentiment="success" />
          <LeafIcon sentiment="success" />
        </Stack>
      </Stack>
    ),
    hoverContent: (
      <Stack alignItems="baseline" direction="row" gap={0.5}>
        PAR 2{' '}
        <Text as="div" sentiment="success" variant="caption">
          0.77 gCO2e/hour
        </Text>
      </Stack>
    ),
    icon: <FranceFlag />,
    value: 'par-2',
  },
  {
    content: (
      <Stack alignItems="center" direction="row" gap={0.5}>
        PAR 3{' '}
        <Stack direction="row" gap="0.25">
          <LeafIcon sentiment="success" />
          <LeafIcon sentiment="success" />
          <LeafIcon disabled sentiment="neutral" />
        </Stack>
      </Stack>
    ),
    hoverContent: (
      <Stack alignItems="baseline" direction="row" gap={0.5}>
        PAR 3{' '}
        <Text as="div" sentiment="success" variant="caption">
          0.77 gCO2e/hour
        </Text>
      </Stack>
    ),
    icon: <FranceFlag />,
    value: 'par-3',
  },
]

export const polandOptions = [
  {
    content: (
      <Stack alignItems="center" direction="row" gap={0.5}>
        WAW 1{' '}
        <Stack direction="row" gap="0.25">
          <LeafIcon sentiment="success" />
          <LeafIcon sentiment="success" />
          <LeafIcon disabled sentiment="neutral" />
        </Stack>
      </Stack>
    ),
    hoverContent: (
      <Stack alignItems="baseline" direction="row" gap={0.5}>
        WAW 1{' '}
        <Text as="div" sentiment="success" variant="caption">
          0.77 gCO2e/hour
        </Text>
      </Stack>
    ),
    icon: <PolandFlag />,
    value: 'waw-1',
  },
  {
    content: (
      <Stack alignItems="center" direction="row" gap={0.5}>
        WAW 2{' '}
        <Stack direction="row" gap="0.25">
          <LeafIcon sentiment="success" />
          <LeafIcon sentiment="success" />
          <LeafIcon sentiment="success" />
        </Stack>
      </Stack>
    ),
    hoverContent: (
      <Stack alignItems="baseline" direction="row" gap={0.5}>
        WAW 2{' '}
        <Text as="div" sentiment="success" variant="caption">
          0.77 gCO2e/hour
        </Text>
      </Stack>
    ),
    icon: <PolandFlag />,
    value: 'waw-2',
  },
  {
    content: (
      <Stack alignItems="center" direction="row" gap={0.5}>
        WAW 3{' '}
        <Stack direction="row" gap="0.25">
          <LeafIcon sentiment="success" />
          <LeafIcon sentiment="success" />
          <LeafIcon disabled sentiment="neutral" />
        </Stack>
      </Stack>
    ),
    hoverContent: (
      <Stack alignItems="baseline" direction="row" gap={0.5}>
        WAW 3{' '}
        <Text as="div" sentiment="success" variant="caption">
          0.77 gCO2e/hour
        </Text>
      </Stack>
    ),
    icon: <PolandFlag />,
    value: 'waw-3',
  },
]

export const netherlandsOptions = [
  {
    content: (
      <Stack alignItems="center" direction="row" gap={0.5}>
        AMS 1{' '}
        <Stack direction="row" gap="0.25">
          <LeafIcon sentiment="success" />
          <LeafIcon sentiment="success" />
          <LeafIcon disabled sentiment="neutral" />
        </Stack>
      </Stack>
    ),
    hoverContent: (
      <Stack alignItems="baseline" direction="row" gap={0.5}>
        AMS 1{' '}
        <Text as="div" sentiment="success" variant="caption">
          0.77 gCO2e/hour
        </Text>
      </Stack>
    ),
    icon: <NetherlandsFlag />,
    value: 'ams-1',
  },
  {
    content: (
      <Stack alignItems="center" direction="row" gap={0.5}>
        AMS 2{' '}
        <Stack direction="row" gap="0.25">
          <LeafIcon sentiment="success" />
          <LeafIcon sentiment="success" />
          <LeafIcon sentiment="success" />
        </Stack>
      </Stack>
    ),
    hoverContent: (
      <Stack alignItems="baseline" direction="row" gap={0.5}>
        AMS 2{' '}
        <Text as="div" sentiment="success" variant="caption">
          0.77 gCO2e/hour
        </Text>
      </Stack>
    ),
    icon: <NetherlandsFlag />,
    value: 'ams-2',
  },
  {
    content: (
      <Stack alignItems="center" direction="row" gap={0.5}>
        AMS 3{' '}
        <Stack direction="row" gap="0.25">
          <LeafIcon sentiment="success" />
          <LeafIcon sentiment="success" />
          <LeafIcon disabled sentiment="neutral" />
        </Stack>
      </Stack>
    ),
    hoverContent: (
      <Stack alignItems="baseline" direction="row" gap={0.5}>
        AMS 3{' '}
        <Text as="div" sentiment="success" variant="caption">
          0.77 gCO2e/hour
        </Text>
      </Stack>
    ),
    icon: <NetherlandsFlag />,
    value: 'ams-3',
  },
]
