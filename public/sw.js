// LiteX Service Worker - Ultra-fast caching strategy
const CACHE_NAME = "litex-v1.0.0";
const STATIC_CACHE = `${CACHE_NAME}-static`;
const DYNAMIC_CACHE = `${CACHE_NAME}-dynamic`;
const IMAGE_CACHE = `${CACHE_NAME}-images`;

// Assets to cache immediately
const STATIC_ASSETS = [
  "/",
  "/js/index.css",
  "/js/main.js",
  "/js/app.js",
  "/icons/android-chrome-192x192.png",
  "/icons/android-chrome-512x512.png",
  "/icons/apple-touch-icon.png",
  "/icons/favicon-32x32.png",
  "/favicon.ico",
  "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap",
];

// Install event - cache static assets
self.addEventListener("install", (event) => {
  console.log("⚡ LiteX SW: Installing service worker...");

  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => {
        console.log("⚡ LiteX SW: Caching static assets");
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log("⚡ LiteX SW: Static assets cached successfully");
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error("⚠️ LiteX SW: Error caching static assets:", error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  console.log("⚡ LiteX SW: Activating service worker...");

  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => {
              return (
                cacheName.startsWith("litex-") &&
                cacheName !== STATIC_CACHE &&
                cacheName !== DYNAMIC_CACHE &&
                cacheName !== IMAGE_CACHE
              );
            })
            .map((cacheName) => {
              console.log("🗑️ LiteX SW: Deleting old cache:", cacheName);
              return caches.delete(cacheName);
            })
        );
      })
      .then(() => {
        console.log("⚡ LiteX SW: Service worker activated");
        return self.clients.claim();
      })
  );
});

// Fetch event - implement caching strategies
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests and chrome-extension requests
  if (request.method !== "GET" || url.protocol === "chrome-extension:") return;

  // 🚫 Skip Inertia (XHR / fetch) navigation requests
  if (request.headers.get("X-Inertia")) return;

  // Handle different request types...
  if (request.destination === "image") {
    event.respondWith(handleImageRequest(request));
  } else if (isStaticAsset(url)) {
    event.respondWith(handleStaticAsset(request));
  } else if (isAPIRequest(url)) {
    event.respondWith(handleAPIRequest(request));
  } else {
    event.respondWith(handlePageRequest(request));
  }
});

// Handle image requests - Cache First
async function handleImageRequest(request) {
  try {
    const cache = await caches.open(IMAGE_CACHE);
    const cached = await cache.match(request);

    if (cached) {
      return cached;
    }

    const response = await fetch(request);
    if (response.status === 200) {
      cache.put(request, response.clone());
    }

    return response;
  } catch (error) {
    console.error("⚠️ LiteX SW: Image request failed:", error);
    // Return a placeholder image or offline image if available
    return new Response("Image not available offline", { status: 503 });
  }
}

// Handle static assets - Cache First
async function handleStaticAsset(request) {
  try {
    const cache = await caches.open(STATIC_CACHE);
    const cached = await cache.match(request);

    if (cached) {
      return cached;
    }

    const response = await fetch(request);
    if (response.status === 200) {
      cache.put(request, response.clone());
    }

    return response;
  } catch (error) {
    console.error("⚠️ LiteX SW: Static asset request failed:", error);
    const cache = await caches.open(STATIC_CACHE);
    return (
      cache.match(request) ||
      new Response("Asset not available offline", { status: 503 })
    );
  }
}

// Handle API requests - Network First
async function handleAPIRequest(request) {
  try {
    const response = await fetch(request);

    if (response.status === 200) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, response.clone());
    }

    return response;
  } catch (error) {
    console.error("⚠️ LiteX SW: API request failed, trying cache:", error);
    const cache = await caches.open(DYNAMIC_CACHE);
    const cached = await cache.match(request);

    if (cached) {
      return cached;
    }

    return new Response(
      JSON.stringify({
        error: "Network unavailable",
        message: "This request requires an internet connection",
      }),
      {
        status: 503,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

// Handle page requests - Stale While Revalidate
async function handlePageRequest(request) {
  try {
    const cache = await caches.open(DYNAMIC_CACHE);
    const cached = await cache.match(request);

    const networkResponse = fetch(request)
      .then((response) => {
        if (response.status === 200) {
          cache.put(request, response.clone());
        }
        return response;
      })
      .catch(() => cached);

    return cached || networkResponse;
  } catch (error) {
    console.error("⚠️ LiteX SW: Page request failed:", error);

    // Return offline page if available
    const cache = await caches.open(STATIC_CACHE);
    const offlinePage = await cache.match("/offline.html");

    if (offlinePage) {
      return offlinePage;
    }

    return new Response(
      `
      <!DOCTYPE html>
      <html>
        <head>
          <title>LiteX - Offline</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { 
              font-family: 'Inter', sans-serif; 
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white; 
              text-align: center; 
              padding: 2rem;
              margin: 0;
              min-height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
              flex-direction: column;
            }
            .offline-container {
              background: rgba(255, 255, 255, 0.1);
              backdrop-filter: blur(20px);
              border-radius: 20px;
              padding: 2rem;
              max-width: 400px;
            }
            h1 { font-size: 2rem; margin-bottom: 1rem; }
            p { font-size: 1.1rem; margin-bottom: 1.5rem; }
            button {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              border: none;
              padding: 12px 24px;
              border-radius: 25px;
              font-weight: 600;
              cursor: pointer;
              transition: transform 0.2s;
            }
            button:hover { transform: translateY(-2px); }
          </style>
        </head>
        <body>
          <div class="offline-container">
            <h1>⚡ LiteX</h1>
            <p>🔌 You're currently offline</p>
            <p>Please check your internet connection and try again.</p>
            <button onclick="location.reload()">🚀 Try Again</button>
          </div>
        </body>
      </html>
    `,
      {
        status: 503,
        headers: { "Content-Type": "text/html" },
      }
    );
  }
}

// Helper functions
function isStaticAsset(url) {
  return (
    url.pathname.includes("/js/") ||
    url.pathname.includes("/css/") ||
    url.pathname.includes("/fonts/") ||
    url.pathname.endsWith(".css") ||
    url.pathname.endsWith(".js") ||
    url.hostname === "fonts.googleapis.com" ||
    url.hostname === "fonts.gstatic.com" ||
    url.hostname === "cdnjs.cloudflare.com"
  );
}

function isAPIRequest(url) {
  return (
    url.pathname.startsWith("/api/") ||
    url.pathname.startsWith("/auth/") ||
    (url.pathname.includes("/") &&
      (url.pathname.includes("login") ||
        url.pathname.includes("register") ||
        url.pathname.includes("forgot") ||
        url.pathname.includes("reset")))
  );
}

// Background sync for offline actions
self.addEventListener("sync", (event) => {
  console.log("⚡ LiteX SW: Background sync triggered:", event.tag);

  if (event.tag === "background-sync") {
    event.waitUntil(handleBackgroundSync());
  }
});

async function handleBackgroundSync() {
  // Handle any queued offline actions
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

console.log("⚡ LiteX Service Worker loaded successfully!");
