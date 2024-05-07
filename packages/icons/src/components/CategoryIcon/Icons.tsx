import ai from './assets/ai.svg?react'
import applicationIntegration from './assets/application-integration.svg?react' // This icon is a duplicate of queuing
import baremetal from './assets/baremetal.svg?react'
import billing from './assets/billing.svg?react'
import compute from './assets/compute.svg?react'
import console from './assets/console.svg?react'
import containers from './assets/containers.svg?react'
import database from './assets/database.svg?react'
import datacenter from './assets/datacenter.svg?react'
import dedicatedServer from './assets/dedicated-server.svg?react'
import devTools from './assets/dev-tools.svg?react'
import documentation from './assets/documentation.svg?react'
import iot from './assets/iot.svg?react'
import labs from './assets/labs.svg?react'
import managedServices from './assets/managed-services.svg?react'
import network from './assets/network.svg?react'
import observability from './assets/observability.svg?react'
import pin from './assets/pin.svg?react'
import security from './assets/security.svg?react'
import serverless from './assets/serverless.svg?react'
import storage from './assets/storage.svg?react'
import toolsServices from './assets/tools-services.svg?react'
import useCase from './assets/use-case.svg?react'
import vpc from './assets/vpc.svg?react'
import webHosting from './assets/web-hosting.svg?react'

export const CATEGORY_ICONS = {
  baremetal,
  webHosting,
  vpc,
  useCase,
  toolsServices,
  storage,
  serverless,
  security,
  observability,
  network,
  managedServices,
  iot,
  documentation,
  dedicatedServer,
  datacenter,
  database,
  containers,
  console,
  compute,
  billing,
  ai,
  labs,
  devTools,
  pin,
  applicationIntegration,
} as const
