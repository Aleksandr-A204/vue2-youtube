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
          v-model.trim="email"
          type="text"
          :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
        >
        <label for="email">Email</label>
        <small
          v-if="$v.email.$dirty && !$v.email.required"
          class="helper-text invalid"
        >Поле Email не должно быть пустым</small>
        <small
          v-else-if="$v.email.$dirty && !$v.email.email"
          class="helper-text invalid"
        >Введите корректный Email</small>
      </div>
      <div class="input-field">
        <input
          id="password"
          v-model.trim="password"
          type="password"
          :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
        >
        <label for="password">Пароль</label>
        <small
          v-if="$v.password.$dirty && !$v.password.required"
          class="helper-text invalid"
        >Введите пароль</small>
        <small
          v-else-if="$v.password.$dirty && !$v.password.minLength"
          class="helper-text invalid"
        >Пароль должен быть {{ $v.password.$params.minLength.min }} символов. Сейчас он {{ password.length }}</small>
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
import messages from "@/utils/messages";
import { email, minLength, required } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },

  validations: {
    email: { email, required },
    password: { required, minLength: minLength(8) }
  },

  mounted() {
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message]);
    }
  },

  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      const formData = {
        email: this.email,
        password: this.password
      };

      try {
        await this.$store.dispatch("authentication/login", formData);
        this.$router.push("/");
      }
      catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style scoped >

</style>
