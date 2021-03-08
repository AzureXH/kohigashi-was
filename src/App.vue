<template>
  <!-- App.vue -->

  <v-app>
    <v-navigation-drawer app>
      <!-- -->
    </v-navigation-drawer>

    <v-app-bar app>
      <v-container>
        <v-btn class="mx-2" fab dark color="teal">
          <v-icon dark> mdi-format-list-bulleted-square </v-icon>
        </v-btn>
      </v-container>
      <!-- -->
    </v-app-bar>

    <!-- 根据应用组件来调整你的内容 -->
    <v-main>
      <!-- 给应用提供合适的间距 -->
      <v-container fluid>
        <!-- 如果使用 vue-router -->
        <router-view> </router-view>
      </v-container>
    </v-main>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({}),
};
</script>
