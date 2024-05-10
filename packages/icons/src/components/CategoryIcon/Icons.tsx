import { ReactComponent as ai } from './assets/ai.svg'
import { ReactComponent as applicationIntegration } from './assets/application-integration.svg' // This icon is a duplicate of queuing
import { ReactComponent as baremetal } from './assets/baremetal.svg'
import { ReactComponent as billing } from './assets/billing.svg'
import { ReactComponent as compute } from './assets/compute.svg'
import { ReactComponent as console } from './assets/console.svg'
import { ReactComponent as containers } from './assets/containers.svg'
import { ReactComponent as database } from './assets/database.svg'
import { ReactComponent as datacenter } from './assets/datacenter.svg'
import { ReactComponent as dedicatedServer } from './assets/dedicated-server.svg'
import { ReactComponent as devTools } from './assets/dev-tools.svg'
import { ReactComponent as documentation } from './assets/documentation.svg'
import { ReactComponent as iot } from './assets/iot.svg'
import { ReactComponent as labs } from './assets/labs.svg'
import { ReactComponent as managedServices } from './assets/managed-services.svg'
import { ReactComponent as network } from './assets/network.svg'
import { ReactComponent as observability } from './assets/observability.svg'
import { ReactComponent as pin } from './assets/pin.svg'
import { ReactComponent as security } from './assets/security.svg'
import { ReactComponent as serverless } from './assets/serverless.svg'
import { ReactComponent as storage } from './assets/storage.svg'
import { ReactComponent as toolsServices } from './assets/tools-services.svg'
import { ReactComponent as useCase } from './assets/use-case.svg'
import { ReactComponent as vpc } from './assets/vpc.svg'
import { ReactComponent as webHosting } from './assets/web-hosting.svg'

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
