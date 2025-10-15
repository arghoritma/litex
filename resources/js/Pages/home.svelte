<!-- home.svelte -->
<script>
  import { inertia } from "@inertiajs/svelte";
  import { fly, fade } from "svelte/transition";
  import { page } from "@inertiajs/svelte";
  import Header from "../Components/Header.svelte";
  import LitexIcon from "../Components/LitexIcon.svelte";

  let features = [
    {
      title: "⚡ Lightning Fast",
      description: "Built with modern tools for maximum productivity and speed",
      icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />`,
    },
    {
      title: "🌙 Dark Mode Support",
      description:
        "Seamless dark mode integration for better viewing experience",
      icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />`,
    },
    {
      title: "🎯 Modern UI/UX",
      description:
        "Beautiful interfaces with smooth animations and glassmorphism",
      icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />`,
    },
  ];
</script>

<!-- Main Container with LiteX theme -->
<div
  class="min-h-screen bg-gradient-to-br from-blue-500 via-purple-600 to-purple-700 relative overflow-hidden"
>
  <!-- Floating Background Elements -->
  <div class="absolute inset-0 overflow-hidden pointer-events-none">
    <div
      class="absolute top-10 right-10 w-32 h-32 bg-white bg-opacity-10 rounded-full animate-pulse"
    ></div>
    <div
      class="absolute bottom-20 left-5 w-24 h-24 bg-white bg-opacity-10 rounded-full animate-bounce"
    ></div>
    <div
      class="absolute top-1/2 left-1/3 w-16 h-16 bg-yellow-300 bg-opacity-20 rounded-full animate-ping"
    ></div>
    <div
      class="absolute top-1/4 right-1/4 w-20 h-20 bg-purple-300 bg-opacity-15 rounded-full animate-pulse delay-700"
    ></div>
    <div
      class="absolute bottom-1/3 right-10 w-12 h-12 bg-blue-300 bg-opacity-20 rounded-full animate-bounce delay-1000"
    ></div>
  </div>

  <Header group="home" />

  <!-- Hero Section -->
  <div
    class="relative z-10 flex flex-col items-center justify-center px-3 sm:px-4 py-4 mx-auto min-h-screen pt-32"
  >
    <div class="w-full max-w-6xl">
      <!-- Main Hero Card -->
      <div
        class="bg-white bg-opacity-10 backdrop-blur-2xl border border-white border-opacity-20 rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-12 transform hover:scale-105 transition-all duration-300 mb-8"
      >
        <div class="text-center" in:fly={{ y: 20, duration: 800, delay: 200 }}>
          <h1
            class="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight"
          >
            Welcome to <span class="text-yellow-300">LiteX</span> ⚡
          </h1>
          <p
            class="text-lg sm:text-xl text-white text-opacity-90 max-w-3xl mx-auto mb-8"
          >
            A <span class="text-yellow-300 font-semibold">super fast</span> TypeScript
            web framework for building modern full-stack applications with speed
            and elegance.
          </p>
          <div class="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/docs"
              use:inertia
              class="px-6 py-3 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-700 hover:from-purple-700 hover:via-blue-700 hover:to-purple-800 text-white font-bold rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-opacity-50 transform hover:scale-105 hover:-translate-y-1 transition-all duration-200 shadow-xl hover:shadow-purple-500/25 fast-hover group"
            >
              <span class="flex items-center justify-center">
                🚀 <span class="ml-2">Get Started</span>
                <svg
                  class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </span>
            </a>
            <a
              href="/about"
              use:inertia
              class="px-6 py-3 bg-white bg-opacity-15 border border-white border-opacity-30 rounded-xl backdrop-blur-lg text-white font-medium hover:bg-opacity-25 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-20 transition-all duration-200 transform hover:scale-105 fast-hover"
            >
              📖 Learn More
            </a>
          </div>
        </div>
      </div>

      <!-- Features Section -->
      <div class="grid md:grid-cols-3 gap-6 mb-8">
        {#each features as feature, i}
          <div
            class="bg-white bg-opacity-10 backdrop-blur-2xl border border-white border-opacity-20 rounded-2xl shadow-xl p-6 transform hover:scale-105 transition-all duration-300 fast-hover group"
            in:fly={{ y: 20, duration: 800, delay: 200 + i * 100 }}
          >
            <div
              class="w-12 h-12 bg-yellow-300 bg-opacity-20 rounded-xl flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6 text-yellow-300"
              >
                {@html feature.icon}
              </svg>
            </div>
            <h3 class="text-lg sm:text-xl font-bold text-white mb-2">
              {feature.title}
            </h3>
            <p class="text-white text-opacity-80 text-sm">
              {feature.description}
            </p>
          </div>
        {/each}
      </div>

      <!-- CTA Section -->
      <div
        class="bg-white bg-opacity-10 backdrop-blur-2xl border border-white border-opacity-20 rounded-3xl shadow-2xl p-6 sm:p-8 text-center transform hover:scale-105 transition-all duration-300"
      >
        <div in:fly={{ y: 20, duration: 800 }}>
          <h2 class="text-2xl sm:text-3xl font-bold text-white mb-4">
            ⚡ Ready to Get Started?
          </h2>
          <p class="text-lg text-white text-opacity-90 mb-6 max-w-2xl mx-auto">
            Join the <span class="text-yellow-300 font-semibold"
              >super fast</span
            > LiteX community and experience the next generation of development tools.
          </p>
          <a
            href="/auth/register"
            use:inertia
            class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-700 hover:from-purple-700 hover:via-blue-700 hover:to-purple-800 text-white font-bold rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-opacity-50 transform hover:scale-105 hover:-translate-y-1 transition-all duration-200 shadow-xl hover:shadow-purple-500/25 fast-hover group"
          >
            🚀 Create Account
            <svg
              class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </a>
        </div>
      </div>

      <!-- Additional Info -->
      <div class="mt-8 text-center">
        <p class="text-white text-opacity-60 text-sm mb-2">
          🚀 Experience the fastest TypeScript framework
        </p>
        <div class="flex justify-center items-center space-x-4">
          <span class="text-white text-opacity-40 text-xs">🔒 Secure</span>
          <span class="text-white text-opacity-40 text-xs">⚡ Fast</span>
          <span class="text-white text-opacity-40 text-xs">🎯 Modern</span>
          <span class="text-white text-opacity-40 text-xs">💎 Elegant</span>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  /* Custom animations for speed theme */
  .fast-hover {
    transition: all 0.15s ease;
  }

  .fast-hover:hover {
    transform: translateY(-2px) scale(1.02);
  }

  /* Group hover animations */
  .group:hover .group-hover\:rotate-12 {
    transform: rotate(12deg);
  }

  .group:hover .group-hover\:translate-x-1 {
    transform: translateX(0.25rem);
  }
</style>
