<template>
  <div class="ib-container">
    <div class="intro-block" :class="visible1 ? '' : 'block-off'">
      <div class="intro-block__content">
        <span @click="closeBlock('b1')">x</span>
        <h3>Firebase Data</h3>
        <p>See how data updates in real time on cloud firestore.</p>
      </div>
    </div>

    <div class="intro-block-2" :class="visible2 ? '' : 'block-off'">
      <div class="intro-block-2__content">
        <span @click="closeBlock('b2')">x</span>
        <h3>Form Data</h3>
        <p>See how form data compares to cloud firestore data.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "IntroBlock",
  data() {
    return {
      visible1: true,
      visible2: true
    };
  },
  methods: {
    closeBlock(block) {
        if (block === 'b1') {
            this.visible1 = false;
        } else if (block === 'b2') {
            this.visible2 = false;
        }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/main.scss";

%inner-content {
  position: relative;
  span {
    color: $color-white;
    cursor: pointer;
    position: absolute;
    right: 0%;
    bottom: 75%;
    transform: translate(75%, 0%);
  }
  p {
    color: $color-white;
    line-height: 25px;
    margin-top: 0;
  }
  h3 {
    color: $color-white;
  }
}

@mixin block-styles($translate) {
  background-color: $color-green;
  position: absolute;
  padding: 0 15px;
  -webkit-transform: $translate;
  -ms-transform: $translate;
  transform: $translate;
  width: 300px;
}

@media only screen and (max-width: 1450px) {
  .ib-container {
    .intro-block, .intro-block-2 {
    width: 150px;
  }
  }
}
@media only screen and (max-width: 800px) {
  .ib-container {
    display: none;
  }
}

.intro-block {
  top: 50%;
  left: 1.5%;
  @include block-styles(translate(-1.5%, -40%));
  &__content {
    @extend %inner-content;
  }
}
.intro-block-2 {
    top: 50%;
    right: 1.5%;
    @include block-styles(translate(-1.5%, -40%));
    &__content {
        @extend %inner-content;
    }
}

.block-off {
  display: none;
}
</style>