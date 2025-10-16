// LiteX Service Worker - No caching strategy
const CACHE_NAME = "litex-v1.0.0";

// Install event - no caching
self.addEventListener("install", (event) => {
  console.log("⚡ LiteX SW: Installing service worker (no caching)...");
  event.waitUntil(self.skipWaiting());
});

// Activate event - clean up any existing caches
self.addEventListener("activate", (event) => {
  console.log("⚡ LiteX SW: Activating service worker (no caching)...");

  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            console.log("🗑️ LiteX SW: Deleting cache:", cacheName);
            return caches.delete(cacheName);
          })
        );
      })
      .then(() => {
        console.log(
          "⚡ LiteX SW: Service worker activated (all caches cleared)"
        );
        return self.clients.claim();
      })
  );
});

// Fetch event - pass through all requests without caching
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests and chrome-extension requests
  if (request.method !== "GET" || url.protocol === "chrome-extension:") return;

  // Skip Inertia (XHR / fetch) navigation requests
  if (request.headers.get("X-Inertia")) return;

  // Pass all requests directly to network without caching
  event.respondWith(
    fetch(request).catch((error) => {
      console.error("⚠️ LiteX SW: Network request failed:", error);
      return new Response("Network request failed", { status: 503 });
    })
  );
});

// Background sync for offline actions
self.addEventListener("sync", (event) => {
  console.log("⚡ LiteX SW: Background sync triggered:", event.tag);

  if (event.tag === "background-sync") {
    event.waitUntil(handleBackgroundSync());
  }
});

async function handleBackgroundSync() {
  console.log("⚡ LiteX SW: Processing background sync");
}

// Push notification handling
self.addEventListener("push", (event) => {
  if (!event.data) return;

  const data = event.data.json();
  console.log("⚡ LiteX SW: Push notification received:", data);

  const options = {
    body: data.body || "New notification from LiteX",
    icon: "/icons/android-chrome-192x192.png",
    badge: "/icons/favicon-32x32.png",
    vibrate: [200, 100, 200],
    tag: "litex-notification",
    data: data.url || "/",
    actions: [
      {
        action: "open",
        title: "🚀 Open LiteX",
      },
      {
        action: "close",
        title: "❌ Close",
      },
    ],
  };

  event.waitUntil(
    self.registration.showNotification(data.title || "⚡ LiteX", options)
  );
});

// Notification click handling
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  if (event.action === "open") {
    event.waitUntil(clients.openWindow(event.notification.data || "/"));
  }
});

console.log("⚡ LiteX Service Worker loaded successfully (no caching)!");
