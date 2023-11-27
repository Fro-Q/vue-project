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

<style scoped lang="scss">
input {
  margin: 0 0 1rem;
  padding: 0.5rem;
  border: 1px solid #eee;
  border-radius: 4px;
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box;
}

.topBar {
  position: absolute;
  display: flex;
  top: 0;
  left: 0;
  right: 0;
  width: auto;
  height: 50px;
  box-sizing: border-box;
  background-color: hsla(160, 100%, 37%, 1);
}

.topBarLeft {
  position: absolute;
  display: flex;
  top: 0;
  left: 0;
  width: auto;
  height: 50px;
  padding: 0 10px;
  box-sizing: border-box;
}

.topBarRight {
  @extend .topBarLeft;
  left: auto;
  right: 0;
}

.topBarLinkDiv {
  margin: auto 10px;
  // justify-content: center;
  font-size: 20px;
  box-sizing: border-box;

  & * {
    color: white;
  }
}

.optionPanel {
  position: absolute;
  top: 50px;
  left: 0;
  bottom: 0;
  width: 250px;
  height: auto;
  background-color: #eee;
  padding: 15px;
  margin: 8px;
  box-sizing: border-box;
  border: 2px solid hsla(160, 100%, 37%, 1);
}
</style>
