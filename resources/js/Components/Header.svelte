<script>
  import { fly } from "svelte/transition";
  import { page, router, inertia, Link } from "@inertiajs/svelte";
  import { clickOutside } from "../Components/helper";
  import DarkModeToggle from "./DarkModeToggle.svelte";
  import LitexIcon from "./LitexIcon.svelte";

  let user = $page.props.user;

  let isMenuOpen = false;
  let isUserMenuOpen = false;

  export let group;

  const menuLinks = [
    {
      href: "/protected",
      label: "🏠 Dashboard",
      group: "home",
      show: true,
    },
    {
      href: "/protected/profile",
      label: "👤 Profile",
      group: "profile",
      show: user ? true : false,
    },
    {
      href: "/docs",
      label: "📚 Docs",
      group: "docs",
      show: true,
    },
    {
      href: "/about",
      label: "ℹ️ About",
      group: "about",
      show: true,
    },
  ];

  function handleLogout() {
    try {
      router.get("/auth/logout");
    } catch (error) {
      console.error("Logout failed:", error);
      // You could also show a toast notification or alert here
      alert("Logout failed. Please try again.");
    }
  }
</script>

<header
  class="fixed w-full z-50 top-0"
  in:fly={{ y: -20, duration: 800, delay: 200 }}
>
  <nav class="mx-auto px-4 sm:px-6 lg:px-8 py-4">
    <div
      class="bg-white bg-opacity-10 backdrop-blur-2xl border border-white border-opacity-20 rounded-2xl shadow-2xl px-4 sm:px-6 py-3 fast-hover"
    >
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <a
          href="/"
          use:inertia
          class="flex items-center space-x-2 text-white font-bold text-lg sm:text-xl hover:scale-105 transition-all duration-200 fast-hover"
        >
          <LitexIcon />
        </a>

        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center space-x-1">
          {#each menuLinks.filter((item) => item.show) as item}
            <a
              use:inertia
              href={item.href}
              class="px-3 py-2 text-sm font-medium text-white text-opacity-80 hover:text-white hover:bg-white hover:bg-opacity-10 rounded-lg transition-all duration-200 fast-hover {item.group ===
              group
                ? 'bg-white bg-opacity-15 text-white'
                : ''}"
            >
              {item.label}
            </a>
          {/each}
        </div>

        <!-- Right Side Items -->
        <div class="flex items-center space-x-3">
          <!-- Search Bar (Desktop) -->
          <div class="hidden lg:block">
            <div class="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-4 w-4 text-white text-opacity-50 absolute left-3 top-2.5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
              <input
                type="text"
                placeholder="🔍 Search..."
                class="w-48 pl-10 pr-4 py-2 text-sm bg-white bg-opacity-10 border border-white border-opacity-20 text-white placeholder-white placeholder-opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-opacity-30 focus:border-white focus:border-opacity-40 backdrop-blur-lg transition-all duration-200 hover:bg-opacity-15 fast-hover"
              />
            </div>
          </div>

          <!-- Dark Mode Toggle -->
          <DarkModeToggle />

          <!-- Auth Section -->
          <div class="hidden sm:flex items-center space-x-2">
            {#if user && user.id}
              <div
                class="relative"
                use:clickOutside
                on:click_outside={() => (isUserMenuOpen = false)}
              >
                <button
                  class="flex items-center space-x-2 px-3 py-2 bg-white bg-opacity-10 hover:bg-opacity-20 rounded-lg transition-all duration-200 fast-hover border border-white border-opacity-20"
                  on:click={() => (isUserMenuOpen = !isUserMenuOpen)}
                >
                  <div
                    class="w-7 h-7 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center"
                  >
                    <span class="text-white font-medium text-sm"
                      >{user.name[0].toUpperCase()}</span
                    >
                  </div>
                  <span class="font-medium text-white text-sm hidden lg:block"
                    >{user.name}</span
                  >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-4 h-4 text-white text-opacity-70"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </button>

                {#if isUserMenuOpen}
                  <div
                    class="absolute right-0 mt-2 w-56 bg-white bg-opacity-15 backdrop-blur-2xl border border-white border-opacity-20 rounded-2xl shadow-2xl py-2"
                    transition:fly={{ y: -10, duration: 200 }}
                  >
                    <a
                      href="/profile/{user.username}"
                      use:inertia
                      class="flex items-center px-4 py-2 text-sm text-white hover:bg-white hover:bg-opacity-10 transition-all duration-200 fast-hover"
                    >
                      <span class="mr-3">👤</span>
                      View Profile
                    </a>
                    <a
                      href="/profile"
                      use:inertia
                      class="flex items-center px-4 py-2 text-sm text-white hover:bg-white hover:bg-opacity-10 transition-all duration-200 fast-hover"
                    >
                      <span class="mr-3">✏️</span>
                      Edit Profile
                    </a>
                    <a
                      href="/settings"
                      use:inertia
                      class="flex items-center px-4 py-2 text-sm text-white hover:bg-white hover:bg-opacity-10 transition-all duration-200 fast-hover"
                    >
                      <span class="mr-3">⚙️</span>
                      Settings
                    </a>
                    <hr class="border-white border-opacity-20 my-2" />
                    <button
                      on:click={handleLogout}
                      class="w-full flex items-center px-4 py-2 text-sm text-red-300 hover:bg-red-500 hover:bg-opacity-20 transition-all duration-200 fast-hover"
                    >
                      <span class="mr-3">🚪</span>
                      Logout
                    </button>
                  </div>
                {/if}
              </div>
            {:else}
              <a
                href="/auth/login"
                use:inertia
                class="px-4 py-2 text-sm font-medium text-white bg-white bg-opacity-10 hover:bg-opacity-20 border border-white border-opacity-20 rounded-lg transition-all duration-200 fast-hover"
              >
                🔐 Login
              </a>
              <a
                href="/auth/register"
                use:inertia
                class="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 via-blue-600 to-purple-700 hover:from-purple-700 hover:via-blue-700 hover:to-purple-800 rounded-lg transition-all duration-200 transform hover:scale-105 fast-hover shadow-lg hover:shadow-purple-500/25"
              >
                🚀 Register
              </a>
            {/if}
          </div>

          <!-- Mobile Menu Button -->
          <button
            class="md:hidden p-2 bg-white bg-opacity-10 hover:bg-opacity-20 border border-white border-opacity-20 rounded-lg transition-all duration-200 fast-hover"
            on:click={() => (isMenuOpen = !isMenuOpen)}
            aria-label="Menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5 text-white"
            >
              {#if !isMenuOpen}
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              {:else}
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              {/if}
            </svg>
          </button>
        </div>
      </div>
    </div>
  </nav>

  <!-- Mobile Menu -->
  {#if isMenuOpen}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
      use:clickOutside
      on:click_outside={() => (isMenuOpen = false)}
      class="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm z-50 md:hidden"
      on:click={() => (isMenuOpen = false)}
      transition:fly={{ opacity: 0, duration: 200 }}
    >
      <div
        class="absolute right-4 top-20 w-72 bg-white bg-opacity-15 backdrop-blur-2xl border border-white border-opacity-20 rounded-2xl shadow-2xl"
        on:click|stopPropagation
        transition:fly={{ x: 100, duration: 300 }}
      >
        <!-- Search Bar (Mobile) -->
        <div class="p-4 border-b border-white border-opacity-20">
          <div class="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-4 w-4 text-white text-opacity-50 absolute left-3 top-2.5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
            <input
              type="text"
              placeholder="🔍 Search..."
              class="w-full pl-10 pr-4 py-2 text-sm bg-white bg-opacity-10 border border-white border-opacity-20 text-white placeholder-white placeholder-opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-opacity-30 backdrop-blur-lg"
            />
          </div>
        </div>

        <!-- Navigation Links -->
        <div class="p-4 space-y-2">
          {#each menuLinks.filter((item) => item.show) as item}
            <Link
              href={item.href}
              class="flex items-center px-3 py-2 text-sm font-medium text-white text-opacity-80 hover:text-white hover:bg-white hover:bg-opacity-10 rounded-lg transition-all duration-200 fast-hover {item.group ===
              group
                ? 'bg-white bg-opacity-15 text-white'
                : ''}"
              on:click={() => (isMenuOpen = false)}
            >
              {item.label}
            </Link>
          {/each}
        </div>

        <!-- Auth Buttons (Mobile) -->
        <div class="p-4 border-t border-white border-opacity-20">
          {#if user && user.id}
            <div class="space-y-2">
              <div
                class="flex items-center space-x-3 px-3 py-2 bg-white bg-opacity-10 rounded-lg"
              >
                <div
                  class="w-8 h-8 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center"
                >
                  <span class="text-white font-medium text-sm"
                    >{user.name[0].toUpperCase()}</span
                  >
                </div>
                <span class="font-medium text-white text-sm">{user.name}</span>
              </div>
              <a
                href="/profile/{user.username}"
                use:inertia
                class="flex items-center px-3 py-2 text-sm text-white hover:bg-white hover:bg-opacity-10 rounded-lg transition-all duration-200 fast-hover"
                on:click={() => (isMenuOpen = false)}
              >
                <span class="mr-3">👤</span>
                View Profile
              </a>
              <a
                href="/profile"
                use:inertia
                class="flex items-center px-3 py-2 text-sm text-white hover:bg-white hover:bg-opacity-10 rounded-lg transition-all duration-200 fast-hover"
                on:click={() => (isMenuOpen = false)}
              >
                <span class="mr-3">✏️</span>
                Edit Profile
              </a>
              <button
                on:click={handleLogout}
                class="w-full flex items-center px-3 py-2 text-sm text-red-300 hover:bg-red-500 hover:bg-opacity-20 rounded-lg transition-all duration-200 fast-hover"
              >
                <span class="mr-3">🚪</span>
                Logout
              </button>
            </div>
          {:else}
            <div class="space-y-2">
              <a
                href="/auth/login"
                use:inertia
                class="block w-full text-center px-4 py-2 text-sm font-medium text-white bg-white bg-opacity-10 hover:bg-opacity-20 border border-white border-opacity-20 rounded-lg transition-all duration-200 fast-hover"
                on:click={() => (isMenuOpen = false)}
              >
                🔐 Login
              </a>
              <a
                href="/auth/register"
                use:inertia
                class="block w-full text-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 via-blue-600 to-purple-700 hover:from-purple-700 hover:via-blue-700 hover:to-purple-800 rounded-lg transition-all duration-200 transform hover:scale-105 fast-hover shadow-lg"
                on:click={() => (isMenuOpen = false)}
              >
                🚀 Register
              </a>
            </div>
          {/if}
        </div>
      </div>
    </div>
  {/if}
</header>

<style>
  /* Custom animations for speed theme */
  .fast-hover {
    transition: all 0.15s ease;
  }

  .fast-hover:hover {
    transform: translateY(-2px) scale(1.02);
  }

  /* Glassmorphism effects */
  .glass-effect {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  /* Mobile responsiveness */
  @media (max-width: 768px) {
    .fast-hover:hover {
      transform: translateY(-1px) scale(1.01);
    }
  }
</style>
