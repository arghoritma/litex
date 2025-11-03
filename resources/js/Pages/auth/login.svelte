<script>
  import { inertia, router } from "@inertiajs/svelte";
  import LitexIcon from "../../Components/LitexIcon.svelte";

  let form = $state({
    email: "",
    password: "",
  });

  let { error } = $props();

  function submitForm() {
    router.post(
      "/auth/login",
      { email: form.email, password: form.password },
      {
        onError: (errors) => {
          if (errors.message) {
            error = errors.message; // Menampilkan pesan error dari server
          }
        },
      }
    );
  }
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
  </div>

  <!-- Content Container -->
  <div
    class="relative z-10 flex flex-col items-center justify-center px-3 sm:px-4 py-4 mx-auto min-h-screen"
  >
    <!-- Logo Section -->
    <div
      class="flex items-center mb-3 text-xl font-semibold text-white transform hover:scale-105 transition-all duration-300 fast-hover"
    >
      <LitexIcon />
    </div>

    <!-- Main Card -->
    <div class="w-full max-w-sm sm:max-w-md">
      <div
        class="bg-white bg-opacity-10 backdrop-blur-2xl border border-white border-opacity-20 rounded-2xl shadow-2xl p-4 sm:p-6 transform hover:scale-105 transition-all duration-300"
      >
        <!-- Header -->
        <div class="text-center mb-4">
          <h1
            class="text-xl sm:text-2xl font-bold text-white mb-1 tracking-tight"
          >
            ⚡ Welcome Back
          </h1>
          <p class="text-white text-opacity-80 text-xs sm:text-sm">
            Login to your <span class="text-yellow-300 font-semibold"
              >super fast</span
            > LiteX account
          </p>
        </div>
        <!-- Error Message -->
        {#if error}
          <div
            class="mb-4 p-3 bg-red-500 bg-opacity-20 border border-red-400 border-opacity-30 rounded-xl backdrop-blur-lg"
            role="alert"
          >
            <div class="flex items-center">
              <span class="text-red-200 text-xs sm:text-sm font-medium"
                >⚠️ {error}</span
              >
            </div>
          </div>
        {/if}

        <!-- Google Login Button -->
        <div class="mb-4">
          <a
            href="/auth/google/redirect"
            class="w-full flex items-center justify-center px-3 py-2.5 bg-white bg-opacity-15 border border-white border-opacity-30 rounded-xl backdrop-blur-lg text-white font-medium hover:bg-opacity-25 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-20 transition-all duration-200 transform hover:scale-105 fast-hover group text-sm"
          >
            <svg
              class="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform duration-200"
              viewBox="0 0 24 24"
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            🚀 Login with Google
          </a>

          <!-- Divider -->
          <div class="relative my-4">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-white border-opacity-20"></div>
            </div>
            <div class="relative flex justify-center text-xs">
              <span
                class="px-2 bg-white bg-opacity-10 backdrop-blur-sm text-white text-opacity-70 rounded-full"
              >
                Or continue with email ⚡
              </span>
            </div>
          </div>
        </div>

        <!-- Login Form -->
        <form class="space-y-3" on:submit|preventDefault={submitForm}>
          <!-- Email Field -->
          <div class="group">
            <label
              for="email"
              class="block mb-1 text-xs sm:text-sm font-semibold text-white text-opacity-90"
            >
              📧 Email Address
            </label>
            <input
              bind:value={form.email}
              required
              type="email"
              name="email"
              id="email"
              class="w-full px-3 py-2 bg-white bg-opacity-10 border border-white border-opacity-20 text-white placeholder-white placeholder-opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-opacity-30 focus:border-white focus:border-opacity-40 backdrop-blur-lg transition-all duration-200 hover:bg-opacity-15 group-hover:scale-105 text-sm"
              placeholder="maulana@example.com"
            />
          </div>

          <!-- Password Field -->
          <div class="group">
            <label
              for="password"
              class="block mb-1 text-xs sm:text-sm font-semibold text-white text-opacity-90"
            >
              🔐 Password
            </label>
            <input
              bind:value={form.password}
              required
              type="password"
              name="password"
              id="password"
              placeholder="••••••••••••"
              class="w-full px-3 py-2 bg-white bg-opacity-10 border border-white border-opacity-20 text-white placeholder-white placeholder-opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-opacity-30 focus:border-white focus:border-opacity-40 backdrop-blur-lg transition-all duration-200 hover:bg-opacity-15 text-sm"
            />
          </div>

          <!-- Forgot Password Link -->
          <div class="flex items-center justify-end">
            <a
              href="/auth/forgot-password"
              use:inertia
              class="text-xs text-yellow-300 hover:text-yellow-200 font-medium transition-colors duration-200 fast-hover"
            >
              🔑 Forgot Password?
            </a>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            class="w-full bg-gradient-to-r from-purple-600 via-blue-600 to-purple-700 hover:from-purple-700 hover:via-blue-700 hover:to-purple-800 text-white font-bold py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-opacity-50 transform hover:scale-105 hover:-translate-y-1 transition-all duration-200 shadow-xl hover:shadow-purple-500/25 fast-hover group text-sm"
          >
            <span class="flex items-center justify-center">
              🚀 <span class="ml-2">Login to LiteX</span>
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
          </button>

          <!-- Register Link -->
          <div class="text-center pt-3">
            <p class="text-xs sm:text-sm text-white text-opacity-70">
              Don't have an account?
              <a
                href="/auth/register"
                use:inertia
                class="text-yellow-300 hover:text-yellow-200 font-semibold ml-1 transition-colors duration-200 fast-hover"
              >
                ⚡ Sign up here
              </a>
            </p>
          </div>
        </form>
      </div>

      <!-- Additional Info -->
      <div class="mt-4 text-center">
        <p class="text-white text-opacity-60 text-xs">
          🚀 Welcome back to the fastest TypeScript framework
        </p>
        <div class="flex justify-center items-center space-x-3 mt-2">
          <span class="text-white text-opacity-40 text-xs">🔒 Secure</span>
          <span class="text-white text-opacity-40 text-xs">⚡ Fast</span>
          <span class="text-white text-opacity-40 text-xs">🎯 Modern</span>
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

  /* Form group animations */
  .group:hover input {
    transform: scale(1.02);
  }
</style>
