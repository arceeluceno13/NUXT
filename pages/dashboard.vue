<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
});
const user = useSupabaseUser();
const client = useSupabaseClient();
const router = useRouter();

async function logout() {
  try {
    const { error } = await client.auth.signOut();
    if (error) throw error;
    router.push("/login");
  } catch (error: any) {
    console.log((error as Error).message);
  }
}
</script>

<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <div class="w-64 bg-emerald-700 text-white flex flex-col">
      <div class="p-4 text-2xl font-bold">Dashboard</div>
      <nav class="flex-1 px-2 py-4">
        <a href="#" class="block px-4 py-2 mt-2 text-sm font-semibold bg-emerald-800 rounded">Home</a>
        <a href="#" class="block px-4 py-2 mt-2 text-sm font-semibold rounded hover:bg-emerald-800">Profile</a>
        <a href="#" class="block px-4 py-2 mt-2 text-sm font-semibold rounded hover:bg-emerald-800">Settings</a>
      </nav>
      <button @click="logout" class="block px-4 py-2 mt-2 text-sm font-semibold bg-red-600 rounded hover:bg-red-700">Logout</button>
    </div>

    <!-- Main content -->
    <div class="flex-1 flex flex-col">
      <!-- Header -->
      <header class="bg-white shadow p-4 flex justify-between items-center">
        <h1 class="text-xl font-bold">Welcome, {{ user.value?.email }}</h1>
      </header>

      <!-- Content -->
      <main class="flex-1 p-4">
        <div class="bg-white p-6 rounded shadow-md">
          <h2 class="text-2xl font-bold mb-4">Dashboard Content</h2>
          <p>This is a simple dashboard layout using Tailwind CSS.</p>
        </div>
      </main>
    </div>
  </div>
</template>

