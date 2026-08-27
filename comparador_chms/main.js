import { loadCatalog, createBasemap } from './basemaps.js'
import { SyncBridge } from './sync.js'

const params = new URLSearchParams(window.location.search)
const finiteBetween = (name, min, max, fallback) => { const value = Number(params.get(name)); return Number.isFinite(value) && value >= min && value <= max ? value : fallback }
const longitude = finiteBetween('longitude', -180, 180, -7.8643)
const latitude = finiteBetween('latitude', -90, 90, 42.3345)
const scale = finiteBetween('scale', 1, 1000000000, 50000)
const sessionId = /^[a-zA-Z0-9-]{8,100}$/.test(params.get('sessionId') ?? '') ? params.get('sessionId') : ''
const transport = ['broadcast', 'postmessage'].includes(params.get('transport')) ? params.get('transport') : ''
const openerOrigin = (() => { try { const value = new URL(params.get('openerOrigin') ?? ''); return ['http:', 'https:'].includes(value.protocol) ? value.origin : '' } catch (_) { return '' } })()
let syncEnabled = params.get('sync') !== 'false'
let peerSyncEnabled = true
let applyingRemote = false
let suppressUntil = 0
let throttleTimer = null
let lastEmit = 0

const elements = {
  select: document.querySelector('#basemap-select'), sync: document.querySelector('#sync-toggle'), reset: document.querySelector('#reset-view'),
  error: document.querySelector('#error-message'), status: document.querySelector('#connection-status'), active: document.querySelector('#active-basemap'), scale: document.querySelector('#scale')
}
elements.sync.checked = syncEnabled
const showError = message => { elements.error.textContent = message; elements.error.hidden = !message }
const setConnected = connected => { elements.status.textContent = connected ? '● Sincronizado' : '○ Sin conexión con el visor principal'; elements.status.className = `status ${connected ? 'connected' : 'disconnected'}` }
const scaleText = value => `Escala 1:${Math.round(value).toLocaleString('es-ES')}`

try {
  const [Map, MapView, Basemap, WMSLayer, WMTSLayer, OpenStreetMapLayer, reactiveUtils] = await Promise.all([
    $arcgis.import('@arcgis/core/Map.js'), $arcgis.import('@arcgis/core/views/MapView.js'), $arcgis.import('@arcgis/core/Basemap.js'),
    $arcgis.import('@arcgis/core/layers/WMSLayer.js'), $arcgis.import('@arcgis/core/layers/WMTSLayer.js'), $arcgis.import('@arcgis/core/layers/OpenStreetMapLayer.js'), $arcgis.import('@arcgis/core/core/reactiveUtils.js')
  ])
  const modules = { Basemap, WMSLayer, WMTSLayer, OpenStreetMapLayer }
  const catalog = await loadCatalog()
  if (!catalog.length) throw new Error('El catálogo de mapas base está vacío.')
  catalog.forEach(item => { const option = document.createElement('option'); option.value = item.id; option.textContent = item.label; elements.select.append(option) })
  const requestedId = params.get('basemap')
  let activeDefinition = catalog.find(item => item.id === requestedId) ?? catalog.find(item => item.id === 'americano-1956') ?? catalog[0]
  elements.select.value = activeDefinition.id
  const initialBasemap = await createBasemap(activeDefinition, modules)
  const map = new Map({ basemap: initialBasemap })
  const view = new MapView({ container: 'viewDiv', map, center: [longitude, latitude], scale, constraints: { snapToZoom: false } })
  await view.when()
  const initialView = { center: view.center.clone(), scale: view.scale }
  elements.active.textContent = `Fondo: ${activeDefinition.label}`
  elements.scale.textContent = scaleText(view.scale)

  const getView = () => ({ longitude: view.center.longitude, latitude: view.center.latitude, scale: view.scale })
  const bridge = new SyncBridge({ sessionId, transport, openerOrigin, onConnection: setConnected,
    onPeerSync: enabled => { peerSyncEnabled = enabled },
    onViewRequest: () => { if (syncEnabled && peerSyncEnabled) bridge.sendView(getView()) },
    onView: async state => {
      if (!syncEnabled || !peerSyncEnabled) return
      try { applyingRemote = true; suppressUntil = Date.now() + 800; await view.goTo({ center: [state.longitude, state.latitude], scale: state.scale }, { animate: false }); suppressUntil = Date.now() + 250 } finally { applyingRemote = false }
    }
  })
  bridge.start()
  bridge.sendSyncState(syncEnabled)

  const watchHandle = reactiveUtils.watch(() => [view.center?.x, view.center?.y, view.scale], () => {
    elements.scale.textContent = scaleText(view.scale)
    if (!syncEnabled || !peerSyncEnabled || applyingRemote || Date.now() < suppressUntil) return
    const remaining = 180 - (Date.now() - lastEmit)
    if (remaining <= 0) { lastEmit = Date.now(); bridge.sendView(getView()) } else if (throttleTimer === null) {
      throttleTimer = window.setTimeout(() => { throttleTimer = null; lastEmit = Date.now(); if (!applyingRemote && Date.now() >= suppressUntil) bridge.sendView(getView()) }, remaining)
    }
  })

  elements.select.addEventListener('change', async event => {
    const requested = catalog.find(item => item.id === event.target.value)
    if (!requested) return
    const preserved = { center: view.center.clone(), scale: view.scale }
    elements.select.disabled = true; showError('')
    try {
      const next = await createBasemap(requested, modules)
      map.basemap = next; activeDefinition = requested
      await view.goTo(preserved, { animate: false })
      elements.active.textContent = `Fondo: ${activeDefinition.label}`
    } catch (_) { elements.select.value = activeDefinition.id; showError('No se pudo cargar el mapa base seleccionado. Puede elegir otro fondo.') } finally { elements.select.disabled = false }
  })
  elements.sync.addEventListener('change', event => { syncEnabled = event.target.checked; bridge.sendSyncState(syncEnabled); if (syncEnabled) bridge.requestView() })
  elements.reset.addEventListener('click', () => { void view.goTo(initialView, { animate: false }) })
  window.addEventListener('beforeunload', () => { watchHandle.remove(); bridge.dispose(); if (throttleTimer !== null) window.clearTimeout(throttleTimer) }, { once: true })
} catch (error) {
  showError(error instanceof Error ? error.message : 'No se pudo iniciar el comparador cartográfico.')
  setConnected(false)
}
