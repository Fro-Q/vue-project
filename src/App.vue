<template>
  <div class="topbar">
    <div class="topbar-left">
      <div class="topbar-link-div">
        <RouterLink to="/">HOME</RouterLink>
      </div>
    </div>
    <div class="topbar-right">
      <div class="topbar-link-div">
        <RouterLink to="/docs/about">ABOUT</RouterLink>
      </div>
    </div>
  </div>
  <div class="app-container">
    <div class="main-panel panel">
      <RouterView name="mainPanel" />
    </div>
    <div class="map-panel panel zoom-container">
      <RouterView name="mapPanel" />
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
