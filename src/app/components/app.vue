<template>
  <div>
    <p>{{ $t('alert_text') }}</p>
    <ul>
      <li :key="service.name" v-for="service in listService">
        <div>{{ service.name }}</div>
        <div>{{ service.description }}</div>
        <div>{{ service.state }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {};
  },
  methods: {},
  computed: {
    listService() {
      return this.$store.state.listService;
    },
    isFirstVisit() {
      return this.$store.state.isFirstVisit;
    },
  },
};
</script>

<style lang="scss" scoped></style>
