<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
    </div>
    <router-view/>
    <h3>Firebase Data</h3>
    {{ firebaseData }}

    <h3>Form Data</h3>
    {{ formData }}

    <div v-if="state === 'synced'">
      Form is synced with Firestore
    </div>
    <div v-else-if="state === 'modified'">
      Form data changed, will sync with Firebase
    </div>
    <div v-else-if="state === 'error'">
      Failed to save to Firestore. {{ errorMessage }}
    </div>
    <div  v-else-if="state === 'loading'">
      Loading..
    </div>

    <form @submit.prevent="updateFirebase" @input="fieldUpdate">
      <input type="email" name="email" placeholder="Email Address" v-model="formData.email" required />
      <input type="text" name="name" placeholder="Name"  v-model="formData.name" required />
      <input type="phone" name="phone" placeholder="Phone Number" v-model="formData.phone" required />

      <button type="submit" @click="submitted">Send</button>
    </form>
    <button @click="revertToOriginal()">Revert Data</button>
  </div>
</template>

<script>
import { db } from './firebase';
import { debounce } from 'debounce';

const documentPath = 'form/user';

export default {
  data() {
    return {
      firebaseData: null,
      formData: {},
      state: 'loading',
      originalData: null
    };
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
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
