<template>
  <form @submit.prevent="updtFb" @input="fildUpdt" class="form-wrap">
    <div class="form-wrap__form-text-inputs">
      <label>Contact</label>
      <input
        type="email"
        name="email"
        placeholder="Email Address"
        v-model="dataForm.email"
        required
      />
      <input
        type="text"
        name="name"
        placeholder="Name"
        v-model="dataForm.name"
        required
      />
    </div>
    <div class="form-wrap__form-phone-inputs">
      <label for="phone">Phone</label>
      <input
        type="phone"
        name="phone"
        placeholder="Phone Number"
        v-model="dataForm.phone"
        required
      />
    </div>
    <button
      class="btn send-btn form-wrap__button"
      type="submit"
      @click="submitMeth"
    >
      send
    </button>
  </form>
</template>

<script>
export default {
  name: "UserForm",
  data() {
    return {
      dataForm: {},
    };
  },
  props: {
    data: {
      type: Object,
    },
  },
  watch: {
    data: {
      handler(val, oldVal) {
        this.dataForm = val;
      },
    },
  },
  methods: {
    updtFb() {
      this.$emit("updtFb", this.dataForm);
    },
    fildUpdt() {
      this.$emit("fildUpdt");
    },
    submitMeth() {
      if (
        this.dataForm.email === "" ||
        this.dataForm.name === "" ||
        this.dataForm.phone === ""
      ) {
        this.$emit("errorState");
        return;
      }
      this.$emit("submitMeth");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/base/_variables.scss";
@import "@/styles/components/_buttons.scss";

%media-query {
  @media only screen and (max-width: 780px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

.form-wrap {
  &__form-text-inputs {
    input {
      margin: 0 10px 20px 10px;
      width: 40%;
    }
    @extend %media-query;
  }
  &__form-phone-inputs {
    input {
        margin: 0 10px 20px 10px;
        width: 85%;
    }
    @extend %media-query;
  }
  label {
    font-weight: bold;
  }
  @media only screen and (max-width: 780px) {
    input {
      width: 100%;
    }
  }
}
</style>