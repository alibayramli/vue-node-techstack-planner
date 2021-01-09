<template>
  <div class="container">
    <h5 style="margin: 2rem">
      Those statistics are taken from StackOverflow and Jetbrains Developer
      Surveys. Feel free to get to know about the trends before going the form
    </h5>
    <div class="row">
      <StatisticsTable
        v-for="(stat, type) of generalStats"
        :type="type"
        :stat="stat"
        :key="type"
      />
    </div>
    <div v-for="statName of Object.keys(teamStats)" :key="statName">
      <div class="accordion" :id="['accordion-' + statName]">
        <div class="accordion-item">
          <h2 :id="['#heading-' + statName]">
            <button
              class="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              :data-bs-target="['#collapse-' + statName]"
              aria-expanded="true"
              :aria-controls="['#collapse-' + statName]"
            >
              {{ convertToStartCase(statName) }}
            </button>
          </h2>
          <div
            :id="['collapse-' + statName]"
            class="accordion-collapse collapse"
            :aria-labelledby="['#heading-' + statName]"
            :data-bs-parent="['#accordion-' + statName]"
          >
            <StatisticsTable
              v-for="(stat, type) of teamStats[statName]"
              :type="type"
              :stat="stat"
              :key="type"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import StatisticsTable from "./StatisticsTable.vue";
import caseConverterMixin from "../mixins/caseConverter";

export default {
  name: "Home",
  mixins: [caseConverterMixin],
  components: {
    StatisticsTable,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState("statisticsData", {
      generalStats: "generalStatistics",
      teamStats: "teamStatistics",
    }),
  },
};
</script>