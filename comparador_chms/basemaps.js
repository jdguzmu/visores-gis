export async function loadCatalog () {
  const response = await fetch('./basemaps.json', { cache: 'no-store' })
  if (!response.ok) throw new Error(`No se pudo cargar el catálogo (${response.status}).`)
  const catalog = await response.json()
  if (!Array.isArray(catalog)) throw new Error('El catálogo de mapas base no es válido.')
  return catalog.filter(item => item && typeof item.id === 'string' && typeof item.label === 'string' && ['wms', 'wmts', 'osm'].includes(item.type))
}

export async function createBasemap (definition, modules) {
  const { Basemap, WMSLayer, WMTSLayer, OpenStreetMapLayer } = modules
  let layer
  if (definition.type === 'osm') layer = new OpenStreetMapLayer({ title: definition.label })
  if (definition.type === 'wms') layer = new WMSLayer({ url: definition.url, title: definition.label, sublayers: definition.sublayers.map(name => ({ name })) })
  if (definition.type === 'wmts') layer = new WMTSLayer({ url: definition.url, title: definition.label, activeLayer: { id: definition.layerId, tileMatrixSetId: definition.tileMatrixSetId } })
  if (!layer) throw new Error('Tipo de mapa base no compatible.')
  await layer.load()
  return new Basemap({ id: definition.id, title: definition.label, baseLayers: [layer] })
}
