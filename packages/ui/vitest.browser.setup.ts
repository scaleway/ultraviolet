// Browser mode setup - no need for localStorage/canvas mocks as browser provides native implementations
import { expect } from 'vitest'
import * as axeMatchers from 'vitest-axe/matchers'

expect.extend(axeMatchers)
