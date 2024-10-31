
<template>
  <div class="mt-5">
    <h4 v-if="showFailureMessage" class="bg-danger text-white text-center p-2">
      Authentication failed, please try again.
    </h4>

    <div class="form-group">
      <label for="username">Username</label>
      <input v-model="username" type="text" class="form-control" id="username" />
    </div>

    <div class="form-group">
      <label for="password">Password</label>
      <input v-model="password" type="password" class="form-control" id="password" />
    </div>

    <div class="text-center">
      <button @click="handleAuth" class="btn btn-primary m-1">Log in</button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const username = ref(null);
    const password = ref(null);
    const showFailureMessage = ref(false);

    const handleAuth = async () => {
      await store.dispatch('auth/authenticate', { username: username.value, password: password.value });

      if (store.state.auth.authenticated) {
        router.push('/admin');
      } else {
        showFailureMessage.value = true;
      }
    };

    return {
      username,
      password,
      showFailureMessage,
      handleAuth,
    };
  },
};
</script>
