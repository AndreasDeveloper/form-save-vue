<template>
  <div class="status">
    <div v-if="status === 'synced'" class="status-sync">Form is synced with Firestore</div>
    <div v-else-if="status === 'modified'" class="status-modified">
      Form data changed, will sync with Firebase
    </div>
    <div v-else-if="status === 'revoked'" class="status-revoke">
      From data and Firebase revoked to original data
    </div>
    <div v-else-if="status === 'error'" class="status-error">
      Failed to save to Firestore. {{ errorMessage }}
    </div>
    <div v-else-if="status === 'loading'" class="status-loading">Loading..</div>
  </div>
</template>

<script>
export default {
  name: "Status",
  props: {
    status: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/base/_variables.scss';

.status {
    color: #fff;
    margin: 20px auto;
    & > * {
        padding: 10px;
        padding-bottom: 0;
    }
    .status-sync {
        background-color: $color-green;
    }
    .status-modified {
        background-color: $color-blue;
    }
    .status-revoke {
        background-color: $color-gray;
    }
    .status-error {
        background-color: $color-red;
    }
    .status-loading {
        background-color: $color-ocean;
    }
}
</style>