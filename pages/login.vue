<script setup lang="ts">
const client = useSupabaseClient();
const router = useRouter();

const email = ref('');
const password = ref('');
const errorMsg = ref('');

async function signIn() {
  try {
    const { error } = await client.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });
    if (error) throw error;
    router.push('/dashboard');
  } catch (error: any) {
    errorMsg.value = error.message;
  }
}

function goToRegister() {
  router.push('/register');
}

function goToForgotPassword() {
  router.push('/forgotpassword');
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
          <button @click="signIn" class="w-full h-full">Log in</button>
        </div>
        <div class="text-gray-200 font-normal font-['Poppins'] mt-4 flex justify-center"> <button @click="goToForgotPassword" class="w-full h-full">Forgot Password?</button> </div>
        <div class="text-emerald-700 text-2xl font-bold font-['Poppins'] mt-6">
          <button @click="goToRegister" class="w-full h-full">Create an account</button>
        </div>
        <p v-if="errorMsg" class="error text-red-500 text-center mt-4">{{ errorMsg }}</p>
      </div>
    </div>
  </div>
</template>