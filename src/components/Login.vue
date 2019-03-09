<template>
  <section>
    <div class="box">
      <b-field
        label="Username"
        :type="{ 'is-danger': !valid }"
        :message="{ 'Invalid username': !valid }"
      >
        <b-input v-model="username"></b-input>
      </b-field>
      <b-field
        label="Password"
        :type="{ 'is-danger': !valid }"
        :message="{ 'Invalid password': !valid }"
      >
        <b-input type="password" v-model="password"></b-input>
      </b-field>
      <button @click="submit" class="button is-success">Submit</button>
    </div>
  </section>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      username: "",
      password: "",
      valid: true
    };
  },
  methods: {
    ...mapActions("auth", ["setCredentials"]),
    submit() {
      const { username, password } = this;
      this.$http
        .head("https://broad.mskog.com/api/v1/movies.json", {
          headers: {
            Authorization: "Basic " + btoa(username + ":" + password)
          }
        })
        .then(
          response => {
            this.setCredentials({ username, password }).then(() =>
              this.$router.push("/")
            );
          },
          response => {
            this.valid = false;
          }
        );
    }
  }
};
</script>

