<script>
  import { inertia, router } from "@inertiajs/svelte";
  import LitexIcon from "../../Components/LitexIcon.svelte";
  import { password_generator } from "../../Components/helper";

  let { id, error } = $props();

  let form = $state({
    password: "",
    password_confirmation: "",
    id,
  });

  function generatePassword() {
    const retVal = password_generator(10);
    form.password = retVal;
    form.password_confirmation = retVal;
  }

  function submitForm() {
    if (form.password != form.password_confirmation) {
      alert("Password and confirmation password must match");
      return false;
    }

    router.post(`/auth/reset-password`, form);
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
            🔐 Reset Password
          </h1>
          <p class="text-white text-opacity-80 text-xs sm:text-sm">
            Create a new <span class="text-yellow-300 font-semibold"
              >super strong</span
            > password for your LiteX account
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

        <!-- Reset Password Form -->
        <form class="space-y-3" on:submit|preventDefault={submitForm}>
          <!-- New Password Field -->
          <div class="group">
            <label
              for="password"
              class="block mb-1 text-xs sm:text-sm font-semibold text-white text-opacity-90"
            >
              🔐 New Password
            </label>
            <input
              bind:value={form.password}
              required
              type="password"
              name="password"
              id="password"
              placeholder="••••••••••••"
              class="w-full px-3 py-2 bg-white bg-opacity-10 border border-white border-opacity-20 text-white placeholder-white placeholder-opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-opacity-30 focus:border-white focus:border-opacity-40 backdrop-blur-lg transition-all duration-200 hover:bg-opacity-15 group-hover:scale-105 text-sm"
            />
            <button
              type="button"
              on:click={generatePassword}
              class="mt-1 text-xs text-yellow-300 hover:text-yellow-200 font-medium transition-colors duration-200 fast-hover"
            >
              ⚡ Generate Strong Password
            </button>
          </div>

          <!-- Confirm Password Field -->
          <div class="group">
            <label
              for="confirm-password"
              class="block mb-1 text-xs sm:text-sm font-semibold text-white text-opacity-90"
            >
              🔒 Confirm New Password
            </label>
            <input
              bind:value={form.password_confirmation}
              required
              type="password"
              name="confirm-password"
              id="confirm-password"
              placeholder="••••••••••••"
              class="w-full px-3 py-2 bg-white bg-opacity-10 border border-white border-opacity-20 text-white placeholder-white placeholder-opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-opacity-30 focus:border-white focus:border-opacity-40 backdrop-blur-lg transition-all duration-200 hover:bg-opacity-15 text-sm"
            />
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            class="w-full bg-gradient-to-r from-purple-600 via-blue-600 to-purple-700 hover:from-purple-700 hover:via-blue-700 hover:to-purple-800 text-white font-bold py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-opacity-50 transform hover:scale-105 hover:-translate-y-1 transition-all duration-200 shadow-xl hover:shadow-purple-500/25 fast-hover group text-sm"
          >
            <span class="flex items-center justify-center">
              🚀 <span class="ml-2">Update Password</span>
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

          <!-- Login Link -->
          <div class="text-center pt-3">
            <p class="text-xs sm:text-sm text-white text-opacity-70">
              Remember your password?
              <a
                href="/auth/login"
                use:inertia
                class="text-yellow-300 hover:text-yellow-200 font-semibold ml-1 transition-colors duration-200 fast-hover"
              >
                ⚡ Login here
              </a>
            </p>
          </div>
        </form>
      </div>

      <!-- Additional Info -->
      <div class="mt-4 text-center">
        <p class="text-white text-opacity-60 text-xs">
          🔐 Creating a secure password for your LiteX account
        </p>
        <div class="flex justify-center items-center space-x-3 mt-2">
          <span class="text-white text-opacity-40 text-xs">🔒 Secure</span>
          <span class="text-white text-opacity-40 text-xs">⚡ Fast</span>
          <span class="text-white text-opacity-40 text-xs">🛡️ Protected</span>
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
