<template>
  <div>
    <div class="page-title">
      <h3>Новая запись</h3>
    </div>

    <Loader v-if="loading" />

    <p v-else-if="!categories.length">
      Категорий пока нет. <RouterLink to="/categories">
        Добавить новую категорию
      </RouterLink>
    </p>

    <form
      v-else
      class="form"
      @submit.prevent="handleSubmit"
    >
      <div class="input-field">
        <select
          ref="select"
          v-model="currerntCategory"
        >
          <option
            v-for="category of categories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.title }}
          </option>
        </select>
        <label>Выберите категорию</label>
      </div>

      <p>
        <label>
          <input
            v-model="type"
            class="with-gap"
            name="type"
            type="radio"
            value="income"
          >
          <span>Доход</span>
        </label>
      </p>

      <p>
        <label>
          <input
            v-model="type"
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
          >
          <span>Расход</span>
        </label>
      </p>

      <div class="input-field">
        <input
          id="amount"
          v-model.number="amount"
          type="number"
          :class="{invalid: $v.amount.$dirty && !$v.amount.minValue}"
        >
        <label for="amount">Сумма</label>
        <span
          v-if="$v.amount.$dirty && !$v.amount.minValue"
          class="helper-text invalid"
        >
          Минимальное значение {{ $v.amount.$params.minValue.min }}
        </span>
      </div>

      <div class="input-field">
        <input
          id="description"
          v-model="description"
          type="text"
          :class="{invalid: $v.description.$dirty && !$v.description.required}"
        >
        <label for="description">Описание</label>
        <span
          v-if="$v.description.$dirty && !$v.description.required"
          class="helper-text invalid"
        >
          Введите описание
        </span>
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
</template>

<script>
import M from "materialize-css";
import { mapGetters } from "vuex";
import { minValue, required } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      loading: true,
      select: null,
      currerntCategory: null,
      type: "outcome",
      amount: 1,
      description: ""
    };
  },

  validations: {
    amount: { minValue: minValue(1) },
    description: { required }
  },

  computed: {
    ...mapGetters({
      categories: "category/categories",
      info: "info/info"
    }),

    canCreateRecord() {
      if (this.type === "income") {
        return true;
      }

      return this.info.bill >= this.amount;
    }
  },

  async mounted() {
    await this.$store.dispatch("category/fetchCategories");
    this.loading = false;

    if (this.categories.length) {
      this.currerntCategory = this.categories[0].id;
    }

    setTimeout(()=>{
      this.select = M.FormSelect.init(this.$refs.select);
      M.updateTextFields();
    }, 0);
  },

  methods: {
    async handleSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      if (this.canCreateRecord) {
        try {
          await this.$store.dispatch("createRecord", {
            categoryId: this.category,
            amount: this.amount,
            description: this.description,
            type: this.type,
            date: new Date().toJSON()
          });
        }
        catch (e) {
          console.log(e);
        }
      }
      else {
        this.$message(`Недостаточно средств на счете (${this.amount - this.info.bill})`);
      }
    }
  }
};
</script>

<style scoped>

</style>
