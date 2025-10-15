<script>
  import axios from "axios";
  import Header from "../Components/Header.svelte";
  import { Toast } from "../Components/helper";
  import { fly, fade } from "svelte/transition";

  export let user;

  console.log(user);

  let current_password;
  let new_password;
  let confirm_password;
  let isLoading = false;
  let avatarFile;
  let previewUrl = user?.avatar || null;

  function handleAvatarChange(event) {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      isLoading = true;
      axios
        .post("/assets/avatar", formData)
        .then((response) => {
          setTimeout(() => {
            isLoading = false;
            previewUrl = response.data + "?v=" + Date.now();
          }, 500);
          user.avatar = response.data + "?v=" + Date.now();
        })
        .catch((error) => {
          isLoading = false;
        });
    }
  }

  async function changeProfile() {
    isLoading = true;
    try {
      const response = await axios.post("/change-profile", user);
      Toast("Profile updated successfully! ⚡", "success");
    } catch (error) {
      if (error.response.data.code == "SQLITE_CONSTRAINT_UNIQUE") {
        Toast("Username or email already exists ⚠️", "error");
      } else {
        Toast(error.response.data.code, "error");
      }
    }
    isLoading = false;
  }

  async function changePassword() {
    if (new_password != confirm_password) {
      Toast("Password not match ⚠️", "error");
      return;
    }

    if (!current_password || !new_password || !confirm_password) {
      Toast("Please fill all fields 📝", "error");
      return;
    }

    isLoading = true;
    try {
      const response = await axios.post("/auth/change-password", {
        current_password,
        new_password,
        confirm_password,
      });
      Toast("Password updated successfully! 🔒", "success");
      current_password = "";
      new_password = "";
      confirm_password = "";
    } catch (error) {
      Toast(error.response.data.message, "error");
    }
    isLoading = false;
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
    <div
      class="absolute top-1/4 right-1/4 w-20 h-20 bg-purple-300 bg-opacity-15 rounded-full animate-pulse delay-700"
    ></div>
    <div
      class="absolute bottom-1/3 right-10 w-12 h-12 bg-blue-300 bg-opacity-20 rounded-full animate-bounce delay-1000"
    ></div>
  </div>

  <Header group="profile" />

  <!-- Content Container -->
  <div
    class="relative z-10 flex flex-col items-center justify-start px-3 sm:px-4 py-4 mx-auto min-h-screen pt-32"
  >
    <div class="w-full max-w-4xl">
      <!-- Profile Header Card -->
      <div
        class="bg-white bg-opacity-10 backdrop-blur-2xl border border-white border-opacity-20 rounded-3xl shadow-2xl p-6 sm:p-8 transform hover:scale-105 transition-all duration-300 mb-8"
        in:fly={{ y: 20, duration: 800, delay: 200 }}
      >
        <div
          class="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6"
        >
          <!-- Avatar Section -->
          <div class="relative group">
            <div
              class="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-yellow-300 to-purple-500 p-1 shadow-2xl"
            >
              <div
                class="w-full h-full rounded-full bg-white bg-opacity-20 backdrop-blur-lg overflow-hidden"
              >
                {#if previewUrl}
                  <img
                    src={previewUrl}
                    alt="Profile"
                    class="w-full h-full object-cover rounded-full"
                  />
                {:else}
                  <div class="w-full h-full flex items-center justify-center">
                    <span class="text-2xl sm:text-3xl font-bold text-white">
                      {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                    </span>
                  </div>
                {/if}
              </div>
            </div>
            <label
              class="absolute bottom-0 right-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-2 rounded-full cursor-pointer hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-xl fast-hover group"
            >
              <svg
                class="w-4 h-4 group-hover:scale-110 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                ></path>
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
              </svg>
              <input
                type="file"
                accept="image/*"
                on:change={handleAvatarChange}
                class="hidden"
              />
            </label>
          </div>

          <!-- Profile Info -->
          <div class="text-center sm:text-left">
            <h1 class="text-2xl sm:text-3xl font-bold text-white mb-2">
              👋 {user.name}
            </h1>
            <p class="text-white text-opacity-80 text-sm sm:text-base mb-2">
              📧 {user.email}
            </p>
            <div
              class="flex justify-center sm:justify-start items-center space-x-4 text-xs sm:text-sm text-white text-opacity-60"
            >
              <span>⚡ LiteX User</span>
              <span>🚀 Super Fast</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Profile Forms Grid -->
      <div class="grid lg:grid-cols-2 gap-6 sm:gap-8">
        <!-- Personal Information Card -->
        <div
          class="bg-white bg-opacity-10 backdrop-blur-2xl border border-white border-opacity-20 rounded-2xl shadow-xl p-6 transform hover:scale-105 transition-all duration-300 fast-hover"
          in:fly={{ x: -20, duration: 800, delay: 400 }}
        >
          <div class="flex items-center mb-6">
            <div
              class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-3"
            >
              <span class="text-xl">👤</span>
            </div>
            <h2 class="text-xl font-bold text-white">Personal Information</h2>
          </div>

          <form on:submit|preventDefault={changeProfile} class="space-y-4">
            <!-- Name Field -->
            <div class="group">
              <label
                for="name"
                class="block mb-2 text-sm font-semibold text-white text-opacity-90"
              >
                📝 Full Name
              </label>
              <input
                bind:value={user.name}
                type="text"
                id="name"
                class="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 text-white placeholder-white placeholder-opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-opacity-30 focus:border-white focus:border-opacity-40 backdrop-blur-lg transition-all duration-200 hover:bg-opacity-15 group-hover:scale-105 text-sm"
                placeholder="Your full name"
                required
              />
            </div>

            <!-- Email Field -->
            <div class="group">
              <label
                for="email"
                class="block mb-2 text-sm font-semibold text-white text-opacity-90"
              >
                📧 Email Address
              </label>
              <input
                bind:value={user.email}
                type="email"
                id="email"
                class="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 text-white placeholder-white placeholder-opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-opacity-30 focus:border-white focus:border-opacity-40 backdrop-blur-lg transition-all duration-200 hover:bg-opacity-15 group-hover:scale-105 text-sm"
                placeholder="you@example.com"
                required
              />
            </div>

            <!-- Phone Field -->
            <div class="group">
              <label
                for="phone"
                class="block mb-2 text-sm font-semibold text-white text-opacity-90"
              >
                📱 Phone Number
              </label>
              <input
                bind:value={user.phone}
                type="text"
                id="phone"
                class="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 text-white placeholder-white placeholder-opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-opacity-30 focus:border-white focus:border-opacity-40 backdrop-blur-lg transition-all duration-200 hover:bg-opacity-15 group-hover:scale-105 text-sm"
                placeholder="Your phone number"
              />
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              disabled={isLoading}
              class="w-full bg-gradient-to-r from-purple-600 via-blue-600 to-purple-700 hover:from-purple-700 hover:via-blue-700 hover:to-purple-800 text-white font-bold py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-opacity-50 transform hover:scale-105 hover:-translate-y-1 transition-all duration-200 shadow-xl hover:shadow-purple-500/25 fast-hover group text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {#if isLoading}
                <span class="flex items-center justify-center">
                  <svg
                    class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  💾 Saving...
                </span>
              {:else}
                <span class="flex items-center justify-center">
                  💾 <span class="ml-2">Save Changes</span>
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
              {/if}
            </button>
          </form>
        </div>

        <!-- Change Password Card -->
        <div
          class="bg-white bg-opacity-10 backdrop-blur-2xl border border-white border-opacity-20 rounded-2xl shadow-xl p-6 transform hover:scale-105 transition-all duration-300 fast-hover"
          in:fly={{ x: 20, duration: 800, delay: 600 }}
        >
          <div class="flex items-center mb-6">
            <div
              class="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center mr-3"
            >
              <span class="text-xl">🔒</span>
            </div>
            <h2 class="text-xl font-bold text-white">Security Settings</h2>
          </div>

          <form on:submit|preventDefault={changePassword} class="space-y-4">
            <!-- Current Password -->
            <div class="group">
              <label
                for="current_password"
                class="block mb-2 text-sm font-semibold text-white text-opacity-90"
              >
                🔐 Current Password
              </label>
              <input
                bind:value={current_password}
                type="password"
                id="current_password"
                class="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 text-white placeholder-white placeholder-opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-opacity-30 focus:border-white focus:border-opacity-40 backdrop-blur-lg transition-all duration-200 hover:bg-opacity-15 group-hover:scale-105 text-sm"
                placeholder="Enter current password"
                required
              />
            </div>

            <!-- New Password -->
            <div class="group">
              <label
                for="new_password"
                class="block mb-2 text-sm font-semibold text-white text-opacity-90"
              >
                🆕 New Password
              </label>
              <input
                bind:value={new_password}
                type="password"
                id="new_password"
                class="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 text-white placeholder-white placeholder-opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-opacity-30 focus:border-white focus:border-opacity-40 backdrop-blur-lg transition-all duration-200 hover:bg-opacity-15 group-hover:scale-105 text-sm"
                placeholder="Enter new password"
                required
              />
            </div>

            <!-- Confirm Password -->
            <div class="group">
              <label
                for="confirm_password"
                class="block mb-2 text-sm font-semibold text-white text-opacity-90"
              >
                ✅ Confirm New Password
              </label>
              <input
                bind:value={confirm_password}
                type="password"
                id="confirm_password"
                class="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 text-white placeholder-white placeholder-opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-opacity-30 focus:border-white focus:border-opacity-40 backdrop-blur-lg transition-all duration-200 hover:bg-opacity-15 group-hover:scale-105 text-sm"
                placeholder="Confirm new password"
                required
              />
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              disabled={isLoading}
              class="w-full bg-gradient-to-r from-red-500 via-pink-500 to-red-600 hover:from-red-600 hover:via-pink-600 hover:to-red-700 text-white font-bold py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-opacity-50 transform hover:scale-105 hover:-translate-y-1 transition-all duration-200 shadow-xl hover:shadow-red-500/25 fast-hover group text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {#if isLoading}
                <span class="flex items-center justify-center">
                  <svg
                    class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  🔄 Updating...
                </span>
              {:else}
                <span class="flex items-center justify-center">
                  🔒 <span class="ml-2">Update Password</span>
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
              {/if}
            </button>
          </form>
        </div>
      </div>

      <!-- Additional Info -->
      <div class="mt-8 text-center" in:fade={{ duration: 800, delay: 800 }}>
        <p class="text-white text-opacity-60 text-sm mb-2">
          🔒 Your data is secure with LiteX
        </p>
        <div
          class="flex justify-center items-center space-x-4 text-xs text-white text-opacity-40"
        >
          <span>🔐 Encrypted</span>
          <span>⚡ Fast Updates</span>
          <span>🛡️ Protected</span>
          <span>💎 Secure</span>
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

  /* Group hover animations */
  .group:hover .group-hover\:scale-110 {
    transform: scale(1.1);
  }

  .group:hover .group-hover\:translate-x-1 {
    transform: translateX(0.25rem);
  }

  /* Loading animation enhancement */
  @keyframes profilePulse {
    0%,
    100% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.05);
      opacity: 0.9;
    }
  }

  .animate-profile-pulse {
    animation: profilePulse 2s ease-in-out infinite;
  }
</style>
