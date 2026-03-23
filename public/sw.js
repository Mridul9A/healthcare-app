/**
 * Service Worker
 * Handles background events like push notifications
 */

self.addEventListener("install", (event) => {
  console.log("Service Worker installed");
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker activated");
});

/**
 * Push event (future backend integration ready)
 */
self.addEventListener("push", (event) => {
  const data = event.data?.json() || {
    title: "Healthcare Alert",
    body: "New update available",
  };

  self.registration.showNotification(data.title, {
    body: data.body,
    icon: "/favicon.svg",
  });
});