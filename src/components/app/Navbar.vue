<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a
          href="#"
          @click.prevent="$emit('click')"
        >
          <Icon
            icon="material-symbols:menu"
            color="black"
            width="24"
            height="24"
          />
        </a>
        <span class="black-text">{{ date | date('datetime') }}</span>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a
            ref="dropdown"
            class="dropdown-trigger black-text"
            href="#"
            data-target="dropdown"
          >
            USER NAME
            <Icon
              icon="material-symbols:arrow-drop-down"
              color="black"
              width="24"
              height="24"
            />
          </a>

          <ul
            id="dropdown"
            class="dropdown-content"
          >
            <li>
              <RouterLink
                to="/profile"
                class="black-text"
              >
                <Icon icon="material-symbols:account-circle" />
                Профиль
              </RouterLink>
            </li>
            <li
              class="divider"
              tabindex="-1"
            />
            <li>
              <a
                href="#"
                class="black-text"
                @click.prevent="logout"
              >
                <Icon icon="ic:outline-assignment-return" />
                Выйти
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import M from "materialize-css";

export default {

  data() {
    return {
      date: new Date(),
      interval: null,
      dropdown: null
    };
  },

  mounted() {
    this.interval = setInterval(() => {
      this.date = new Date();
    }, 1000);

    this.dropdown = M.Dropdown.init(this.$refs.dropdown, {
      constrainWidth: true
    });
  },

  beforeDestroy() {
    clearInterval(this.interval);
    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy();
    }
  },

  methods: {
    logout() {
      this.$router.push("/login?message=logout");
    }
  }
};
</script>

<style scoped>

</style>
