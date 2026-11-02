const BASE = new URL('./', self.location).pathname

importScripts(BASE + 'vendor/controller/controller.sw.js')

let uv = null
try {
  self.__uv$config = {
    prefix: BASE + 'uv/service/',
    handler: BASE + 'vendor/uv/uv.handler.js',
    client: BASE + 'vendor/uv/uv.client.js',
    bundle: BASE + 'vendor/uv/uv.bundle.js',
    config: self.location.href,
    sw: BASE + 'vendor/uv/uv.sw.js',
  }
  importScripts(self.__uv$config.bundle)
  self.__uv$config.encodeUrl = Ultraviolet.codec.xor.encode
  self.__uv$config.decodeUrl = Ultraviolet.codec.xor.decode
  importScripts(self.__uv$config.sw)
  uv = new UVServiceWorker()
} catch (err) {
  uv = null
}

self.addEventListener('install', () => self.skipWaiting())
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()))

self.addEventListener('fetch', (event) => {
  try {
    if (self.$scramjetController && self.$scramjetController.shouldRoute(event)) {
      event.respondWith(self.$scramjetController.route(event))
      return
    }
  } catch (err) {
    void err
  }
  if (uv !== null) {
    try {
      if (uv.route(event)) event.respondWith(uv.fetch(event))
    } catch (err) {
      void err
    }
  }
})
