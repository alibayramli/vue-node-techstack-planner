<template>
  Welcome to techstack planner! 
</template>

<script>
import {mapState} from 'vuex';
export default {
  name: 'Hello',
  data() {
    return {
    }
  },
  computed: {
    ...mapState('userData', {
		}),
  }
}
</script>

<style>

</style>