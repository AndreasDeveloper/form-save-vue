<template>
  <div class="home">
    <IntroBlock />
    <div class="home__container">
      <div class="home__logos">
        <img class="vue-logo" alt="Vue logo" src="../assets/logo.png">
        <img class="fb-logo" alt="Firebase logo" src="../assets/fb-logo-standard.png" width="500px">
      </div>
      <div class="home__content">
        <Status :status="state" />
        <div class="home__content__data-wrap">
          <div class="data-block">
            <h3>Firebase Data</h3>
            {{ firebaseData }}
          </div>
          <div class="data-block">
            <h3>Form Data</h3>
            {{ formData }}
          </div>
        </div>

        <UserForm :data="formData" @updtFb="updateFirebase" @fildUpdt="fieldUpdate" @submitMeth="submitted" @errorState="showError" />

        <button class="btn revert-btn" @click="revertToOriginal()">revert data</button>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '../firebase';
import { debounce } from 'debounce';

import Status from '../components/Status';
import UserForm from '../components/UserForm';
import IntroBlock from '../components/IntroBlock';

const documentPath = 'form/user';

export default {
  name: 'Home',
  data() {
    return {
      firebaseData: null,
      formData: {},
      state: 'loading',
      originalData: null
    };
  },
  components: {
    Status, 
    UserForm,
    IntroBlock
  },
  firestore() {
    return {
      firebaseData: db.doc(documentPath)
    }
  },
  created: async function() {
    const docRef = db.doc(documentPath);

    let data = (await docRef.get()).data();

    if (!data) {
      data = { email: '', name: '', phone: '' };
      docRef.set(data);
    }
    this.formData = data;

    this.originalData = {...data};

    this.state = 'synced'
  },
  methods: {
    async updateFirebase() {
      try {
        await db.doc(documentPath).set(this.formData);
        this.state = 'synced';
      } catch (err) {
        this.errorMessage = JSON.stringify(err);
        this.state = 'error';
      }
    },
    fieldUpdate() {
      this.state = 'modified';
      this.updateFirebase();
    },
    debounceUpdate: debounce(function() {
      this.updateFirebase();
    }, 1500),
    revertToOriginal() {
      this.state = 'revoked';
      this.formData = { ...this.originalData };
    },
    submitted() {
      this.formData = {};
    },
    showError() {
      this.state = 'error';
    }
  }
}
</script>

<style lang='scss' scoped>
@import '@/styles/main.scss';
@import '@/styles/components/_buttons.scss';

.home {
  position: relative;
  &__container {
    margin: 0 auto;
    width: 50%;
    @media only screen and (max-width: 780px) {
      width: 90%;
    }
  }
  &__logos {
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      margin: 0 20px;
    }
    @media only screen and (max-width: 780px) {
      .vue-logo { width: 50px; }
      .fb-logo { width: 100px; }
    }
  }
  &__content {
    &__data-wrap {
      border: 1px solid $color-gray;
      display: flex;
      justify-content: center;
      margin: 40px auto;
      padding: 20px 10px;
      .data-block {
        margin: 20px;
      }
    }
  }
  .revert-btn {
    margin-top: 20px;
  }
}
</style>