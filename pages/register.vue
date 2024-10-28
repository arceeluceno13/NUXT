<script setup lang="ts">
const client = useSupabaseClient();
const router = useRouter();

const email = ref('');
const password = ref('');
const errorMsg = ref('');
const successMsg = ref('');

async function register() {
  try {
    const { data, error } = await client.auth.signUp({
      email: email.value,
      password: password.value,
    });
    if (error) throw error;
    successMsg.value = 'Check your email for the confirmation link.';
  } catch (error: any) {
    errorMsg.value = error.message;
  }
}

function goToLogin() {
  router.push('/login');
}
</script>

<template>
  <div class="w-full h-screen relative bg-gray-200 flex flex-col lg:flex-row">
    <div class="lg:w-1/2 flex flex-col justify-center items-start p-10 lg:p-20">
      <div class="text-center text-emerald-700 text-4xl lg:text-[115px] font-bold font-['Poppins']">Kwenta</div>
      <div class="text-black text-lg lg:text-[32px] font-normal font-['Poppins'] mt-4 lg:mt-10">
        Stay on top of your finances and take<br/>control of your future.
      </div>
    </div>
    <div class="lg:w-1/2 flex justify-center items-center bg-gradient-to-br from-emerald-700 to-gray-950 rounded-none lg:rounded-[41px] shadow p-10 lg:p-20">
      <div class="w-full max-w-md">
        <div class="text-gray-200/50 text-2xl font-normal font-['Poppins']">Email</div>
        <div class="w-full h-[70px] mt-2 rounded-[20px] border-2 border-gray-200/50">
          <input type="email" id="email" v-model="email" required class="w-full h-full px-3 py-2 bg-transparent focus:outline-none text-gray-200" />
        </div>
        <div class="text-gray-200/50 text-2xl font-normal font-['Poppins'] mt-6">Password</div>
        <div class="w-full h-[70px] mt-2 rounded-[20px] border-2 border-gray-200/50">
          <input type="password" id="password" v-model="password" required class="w-full h-full px-3 py-2 bg-transparent focus:outline-none text-gray-200" />
        </div>
        <div class="text-emerald-700 text-2xl font-bold font-['Poppins'] mt-6">
          <button @click="register" class="w-full h-full">Register</button>
        </div>
        <div class="text-gray-200 font-normal font-['Poppins'] mt-4">
          <button @click="goToLogin" class="w-full h-full">Already have an account?</button>
        </div>
        <p v-if="errorMsg" class="error text-red-500 text-center mt-4">{{ errorMsg }}</p>
        <p v-if="successMsg" class="success text-green-500 text-center mt-4">{{ successMsg }}</p>
      </div>
    </div>
  </div>
</template>