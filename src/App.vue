<template>
  <div class="topBar">
    <div class="topBarLeft">
      <div class="topBarLinkDiv">
        <RouterLink to="/">HOME</RouterLink>
      </div>
    </div>
    <div class="topBarRight">
      <div class="topBarLinkDiv">
        <RouterLink to="/">HOME</RouterLink>
      </div>
    </div>
  </div>
  <div class="mainArea">
    <div class="optionPanel panel">
      <RouterView name="optionPanel" />
    </div>
    <div class="mapPanel panel">
      <RouterView name="mapPanel" />
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
