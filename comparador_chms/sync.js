const TYPES = ['HELLO', 'READY', 'PING', 'PONG', 'VIEW_CHANGE', 'REQUEST_VIEW', 'SYNC_STATE']
const randomId = () => globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`
const validView = value => Number.isFinite(value.longitude) && value.longitude >= -180 && value.longitude <= 180 && Number.isFinite(value.latitude) && value.latitude >= -90 && value.latitude <= 90 && Number.isFinite(value.scale) && value.scale > 0

export class SyncBridge {
  constructor ({ sessionId, transport, openerOrigin, onView, onViewRequest, onPeerSync, onConnection }) {
    this.sessionId = sessionId
    this.transport = transport
    this.openerOrigin = openerOrigin
    this.onView = onView
    this.onViewRequest = onViewRequest
    this.onPeerSync = onPeerSync
    this.onConnection = onConnection
    this.channel = null
    this.timer = null
    this.lastPeerMessage = 0
    this.peerSyncEnabled = true
    this.seen = new Set()
  }

  start () {
    if (!this.sessionId) return
    if (this.transport === 'broadcast' && 'BroadcastChannel' in globalThis) {
      this.channel = new BroadcastChannel(`chms-map-sync-${this.sessionId}`)
      this.channel.addEventListener('message', this.onChannelMessage)
    } else if (this.transport === 'postmessage' && this.openerOrigin && window.opener) {
      window.addEventListener('message', this.onWindowMessage)
    } else return
    this.send('HELLO')
    this.timer = window.setInterval(() => {
      this.send('PING')
      this.onConnection(Date.now() - this.lastPeerMessage < 12000)
    }, 5000)
  }

  sendView (view) { if (validView(view)) this.send('VIEW_CHANGE', view) }
  requestView () { this.send('REQUEST_VIEW') }
  sendSyncState (enabled) { this.send('SYNC_STATE', { syncEnabled: enabled }) }
  isPeerSyncEnabled () { return this.peerSyncEnabled }

  dispose () {
    if (this.timer !== null) window.clearInterval(this.timer)
    this.channel?.removeEventListener('message', this.onChannelMessage)
    this.channel?.close()
    window.removeEventListener('message', this.onWindowMessage)
    this.channel = null
    this.seen.clear()
  }

  onChannelMessage = event => this.accept(event.data)
  onWindowMessage = event => {
    if (event.origin === this.openerOrigin && event.source === window.opener) this.accept(event.data)
  }

  accept (candidate) {
    if (!candidate || typeof candidate !== 'object' || !TYPES.includes(candidate.type) || candidate.sessionId !== this.sessionId || candidate.source !== 'experience-builder' || typeof candidate.messageId !== 'string' || !Number.isFinite(candidate.timestamp) || this.seen.has(candidate.messageId)) return
    this.seen.add(candidate.messageId)
    if (this.seen.size > 200) this.seen.clear()
    this.lastPeerMessage = Date.now()
    this.onConnection(true)
    if (candidate.type === 'PING') this.send('PONG')
    if (candidate.type === 'HELLO') this.send('READY')
    if (candidate.type === 'REQUEST_VIEW') this.onViewRequest()
    if (candidate.type === 'SYNC_STATE' && typeof candidate.syncEnabled === 'boolean') { this.peerSyncEnabled = candidate.syncEnabled; this.onPeerSync(candidate.syncEnabled) }
    if (candidate.type === 'VIEW_CHANGE' && validView(candidate)) this.onView({ longitude: candidate.longitude, latitude: candidate.latitude, scale: candidate.scale })
  }

  send (type, details = {}) {
    const message = { type, source: 'comparator', sessionId: this.sessionId, messageId: randomId(), timestamp: Date.now(), ...details }
    if (this.channel) this.channel.postMessage(message)
    else if (this.transport === 'postmessage' && window.opener && !window.opener.closed) window.opener.postMessage(message, this.openerOrigin)
  }
}
