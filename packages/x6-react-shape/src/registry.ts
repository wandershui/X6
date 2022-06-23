import React from 'react'
import { Graph } from '@antv/x6-next'
import { Node } from '@antv/x6-core'

export type ReactShapeConfig = Node.Properties & {
  shape: string
  effect?: (keyof Node.Properties)[]
}

export const shapeMaps: Record<
  string,
  {
    component: React.ComponentType
    effect?: (keyof Node.Properties)[]
  }
> = {}

export function register(
  componentOrFC: React.ComponentType,
  config: ReactShapeConfig,
) {
  const { shape, effect, ...others } = config
  if (!shape) {
    throw new Error('should specify shape in config')
  }
  shapeMaps[shape] = {
    component: componentOrFC,
    effect,
  }

  Graph.registerNode(
    shape,
    {
      inherit: 'react-shape',
      ...others,
    },
    true,
  )
}
