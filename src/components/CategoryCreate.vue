<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Создать</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <input
            id="name"
            v-model="title"
            type="text"
            :class="{invalid: $v.title.$dirty && !$v.title.required}"
          >
          <label for="name">Название</label>
          <span
            v-if="$v.title.$dirty && !$v.title.required"
            class="helper-text invalid"
          >Введите название категории</span>
        </div>

        <div class="input-field">
          <input
            id="limit"
            v-model.number="limit"
            type="number"
            :class="{invalid: $v.limit.$dirty && !$v.limit.minValue}"
          >
          <label for="limit">Лимит</label>
          <span
            v-if="$v.limit.$dirty && !$v.limit.minValue"
            class="helper-text invalid"
          >Минимальное значение {{ $v.limit.$params.minValue.min }}</span>
        </div>

        <button
          class="btn waves-effect waves-light"
          type="submit"
        >
          Создать
          <Icon icon="material-symbols:send" />
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { minValue, required } from "vuelidate/lib/validators";

import M from "materialize-css";

export default {
  data() {
    return {
      title: "",
      limit: 100
    };
  },

  validations: {
    title: { required },
    limit: { minValue: minValue(100) }
  },

  mounted() {
    M.updateTextFields();
  },

  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      try {
        const category = await this.$store.dispatch("category/createCategory", {
          title: this.title,
          limit: this.limit
        });

        this.title = "";
        this.limit = 100;
        this.$v.$reset();
        this.$message("Категория была создана");

        this.$emit("created", category);
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
