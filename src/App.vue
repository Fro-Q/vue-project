<template>
  <div class="topBar">
    <div class="topBarLeft">
      <div class="topBarLinkDiv">
        <RouterLink to="/">HOME</RouterLink>
      </div>
      <div class="topBarLinkDiv">
        <RouterLink to="/upload">UPLOAD</RouterLink>
      </div>
    </div>
    <div class="topBarRight">
      <div class="topBarLinkDiv">
        <RouterLink to="/">HOME</RouterLink>
      </div>
      <div class="topBarLinkDiv">
        <RouterLink to="/upload">UPLOAD</RouterLink>
      </div>
    </div>
  </div>
  <div class="optionPanel">
    <RouterView name="optionPanel" />
  </div>
  <div class="mapPanel">
    <RouterView name="mapPanel" />
  </div>
</template>

<style scoped lang="scss"></style>
