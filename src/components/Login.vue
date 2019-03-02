<template>
  <section>
    <b-field label="Username">
      <b-input v-model="username"></b-input>
    </b-field>
    <b-field label="Password">
      <b-input type="password" v-model="password"></b-input>
    </b-field>
    <button @click="submit" class="button is-success">Submit</button>
  </section>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    ...mapActions("auth", ["setCredentials"]),
    submit() {
      const { username, password } = this;
      this.setCredentials({ username, password });
      this.$router.push("/");
    }
  }
};
</script>

