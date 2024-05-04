<template>
  <div>
    <div class="page-title">
      <h3>{{ 'ProfileTitle' | localize }}</h3>
    </div>

    <form
      class="form"
      @submit.prevent="submitHandler"
    >
      <div class="input-field">
        <input
          id="description"
          v-model="name"
          type="text"
          :class="{invalid: $v.name.$dirty && !$v.name.required}"
        >
        <label for="description">{{ 'Name' | localize }}</label>
        <small
          v-if="$v.name.$dirty && !$v.name.required"
          class="helper-text invalid"
        >{{ 'Message_EnterName' | localize }}</small>
      </div>

      <div class="switch">
        <label>
          Engish
          <input
            v-model="isRuLocale"
            type="checkbox"
          >
          <span class="lever" />
          Русский
        </label>
      </div>

      <button
        class="btn waves-effect waves-light"
        type="submit"
      >
        {{ 'Update' | localize }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import M from "materialize-css";
import { mapActions, mapGetters } from "vuex";
import { required } from "vuelidate/lib/validators";

export default {
  metaInfo() {
    return {
      title: this.$title("ProfileTitle")
    };
  },

  data: () => ({
    name: "",
    isRuLocale: true
  }),

  validations: {
    name: { required }
  },

  computed: {
    ...mapGetters({
      info: "info/info"
    })
  },

  mounted() {
    this.isRuLocale = this.info.locale === "ru-RU";

    setTimeout(() => {
      M.updateTextFields();
    });

    this.name = this.info.name;
  },

  methods: {
    ...mapActions({
      updateInfo: "info/updateInfo"
    }),

    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      try {
        await this.updateInfo({
          name: this.name,
          locale: this.isRuLocale ? "ru-RU" : "en-US"
        });
      }
      catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style scoped>
.switch {
  margin-bottom: 2rem;
}
</style>
