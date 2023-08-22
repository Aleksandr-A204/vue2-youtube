<template>
  <form
    class="card auth-card"
    @submit.prevent="submitHandler"
  >
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          class="validate"
        >
        <label for="email">Email</label>
        <small class="helper-text invalid">Email</small>
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          class="validate"
        >
        <label for="password">Пароль</label>
        <small class="helper-text invalid">Password</small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
        >
          Войти
          <Icon
            class="material-icons right"
            icon="material-symbols:send"
          />
        </button>
      </div>

      <p class="center">
        Нет аккаунта?
        <RouterLink to="/register">
          Зарегистрироваться
        </RouterLink>
      </p>
    </div>
  </form>
</template>

<script>
export default {
  methods: {
    submitHandler() {
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>

</style>
