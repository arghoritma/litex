import { createInertiaApp } from "@inertiajs/svelte";
import { mount } from "svelte";
import "./index.css";

createInertiaApp({
  resolve: (name) => {
    const pages = import.meta.glob("./Pages/**/*.svelte", { eager: true });
    return pages[`./Pages/${name}.svelte`];
  },
  setup({ el, App, props }) {
    el.innerHTML = "";
    el.classList.add("dark:bg-gray-900", "min-h-screen");
    mount(App, { target: el, props });
  },
});

const systemPrefersDark = window.matchMedia(
  "(prefers-color-scheme: dark)"
).matches;
// Check localStorage or fallback to system preference
const savedMode = localStorage.getItem("darkMode");
let isDarkMode = savedMode === null ? systemPrefersDark : savedMode === "true";

if (isDarkMode) {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}
