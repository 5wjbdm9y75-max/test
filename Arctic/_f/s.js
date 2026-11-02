importScripts('/_f/b/s.js')

const pause = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

async function reviveRoute(event) {
  const pages = await self.clients.matchAll({ type: 'window', includeUncontrolled:true })
  for (const page of pages) page.postMessage({ $controller$swrevive: {} })
  for (let attempt = 0; attempt < 320; attempt += 1) {
    if ($scramjetController.shouldRoute(event)) return $scramjetController.route(event)
    await pause(25)
  }
  return new Response('Internal Service Worker Error: controller unavailable', { status: 503 })
}

self.addEventListener('message', (event) => {
  const prefix = event.data?.$arctic$keepalive?.prefix
  if (typeof prefix !== 'string' || event.source === null) return
  let alive = false
  try {
    const url = new URL(prefix, self.location.href).href
    alive = $scramjetController.shouldRoute({ request: { url } })
  } catch {
  }
  event.source.postMessage({ $arctic$controller: { prefix, alive } })
})

self.addEventListener('fetch', (event) => {
  if ($scramjetController.shouldRoute(event)) {
    event.respondWith($scramjetController.route(event))
  } else if (new URL(event.request.url).pathname.startsWith('/_f/r/')) {
    event.respondWith(reviveRoute(event))
  }
})
