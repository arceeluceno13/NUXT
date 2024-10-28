<script setup lang="ts">
const client = useSupabaseClient();

const email = ref('');
const errorMsg = ref('');
const successMsg = ref('');

async function sendResetLink() {
  try {
    const { error } = await client.auth.resetPasswordForEmail(email.value);
    if (error) throw error;
    successMsg.value = 'Password reset link sent. Please check your email.';
  } catch (error: any) {
    errorMsg.value = error.message;
  }
}
</script>

<template>
  <div class="w-full h-screen flex justify-center items-center bg-gray-200">
    <div class="w-full max-w-md p-8 bg-white rounded shadow-md">
      <h2 class="text-2xl font-bold text-center mb-4">Forgot Password</h2>
      <div class="mb-4">
        <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email</label>
        <input type="email" id="email" v-model="email" required class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-emerald-700" />
      </div>
      <button @click="sendResetLink" class="w-full bg-emerald-700 text-white py-2 rounded hover:bg-emerald-800">Send Reset Link</button>
      <p v-if="errorMsg" class="text-red-500 text-center mt-4">{{ errorMsg }}</p>
      <p v-if="successMsg" class="text-green-500 text-center mt-4">{{ successMsg }}</p>
    </div>
  </div>
</template>