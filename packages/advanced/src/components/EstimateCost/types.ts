export type Units = 'seconds' | 'minutes' | 'hours' | 'days' | 'months'

export type Iteration = {
  unit: Units
  value: number
}

export type BareEstimateProduct = {
  id: string
}

export type EstimateProduct = BareEstimateProduct & {
  amount: number
  price: number
  amountFree: number
  isVariant: boolean
  maxAmount: number
  noIteration: boolean
  longFractionDigits: boolean
  discount: number
}

type Regions = 'fr-par' | 'nl-ams' | 'pl-waw' | 'global'
type RegionsSRR = 'fr-srr'
export type Region = Regions | RegionsSRR

type ZonesSRR = 'fr-srr-1' | 'fr-srr-2' | 'fr-lab-1'
type ZonesFr = 'fr-par-1' | 'fr-par-2' | 'fr-par-3'
type ZonesNl = 'nl-ams-1' | 'nl-ams-2' | 'nl-ams-3'
type ZonesPl = 'pl-waw-1' | 'pl-waw-2' | 'pl-waw-3'
export type Zone = ZonesFr | ZonesNl | ZonesPl | ZonesSRR

export type DC = 'dc2' | 'dc3' | 'dc5' | 'ams1'
