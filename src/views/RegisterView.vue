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
      <div class="input-field">
        <input
          id="name"
          v-model.trim="name"
          type="text"
          :class="{invalid: $v.name.$dirty && !$v.name.required}"
        >
        <label for="name">Имя</label>
        <small
          v-if="$v.name.$dirty && !$v.name.required"
          class="helper-text invalid"
        >Введите ваше имя</small>
      </div>
      <p>
        <label>
          <input
            v-model="agree"
            type="checkbox"
          >
          <span>С правилами согласен</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
        >
          Зарегистрироваться
          <Icon
            class="material-icons right"
            icon="material-symbols:send"
          />
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <RouterLink to="/login">
          Войти!
        </RouterLink>
      </p>
    </div>
  </form>
</template>

<script>
import { email, minLength, required } from "vuelidate/lib/validators";


export default {
  metaInfo() {
    return {
      title: this.$title("Register")
    };
  },

  data() {
    return {
      email: "",
      password: "",
      name: "",
      agree: false
    };
  },

  validations: {
    email: { email, required },
    password: { required, minLength: minLength(8) },
    name: { required },
    agree: { checked: v => v }
  },

  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      const formData = {
        email: this.email,
        password: this.password,
        name: this.name
      };

      try {
        await this.$store.dispatch("authentication/register", formData);
        this.$router.push("/");
      }
      catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style scoped>

</style>
