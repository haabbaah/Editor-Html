<template>
  <div id="app">
    <div class="side-bar">
      <router-link
        tag="div"
        v-for="nav of arrNav"
        :key="nav.name"
        active-class="active"
        :to="`${nav.path}`"
        class="item"
        exact
      >
        <div class="icon-menu" :title="nav.name" v-html="nav.image"></div>

        <!-- <img :src="nav.image" /> -->
      </router-link>
    </div>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      arrNav: [
        {
          name: 'Редактор текста',
          image:
            '<svg version="1.1" id="Layer_2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"	 width="100px" height="100px" viewBox="0 0 100 100" style="enable-background:new 0 0 100 100;" xml:space="preserve"><path d="M99.1,13.6L86.3,0.7c-0.8-0.8-2-0.8-2.8,0L72,12.2H3c-1.1,0-2,0.9-2,2v83.2c0,1.1,0.9,2,2,2h83.2c1.1,0,2-0.9,2-2v-70l11-11	C99.9,15.6,99.9,14.3,99.1,13.6z M50.2,58.2l-1-1c-0.9-0.9-2.3-0.9-3.2,0l-0.3,0.3c-0.9,0.9-0.9,2.3,0,3.2l0,0l-10.7,4l4-10.7l0,0	c0.9,0.9,2.3,0.9,3.2,0l0.3-0.3c0.9-0.9,0.9-2.3,0-3.2l-1-1l28.2-28.2l8.6,8.6L50.2,58.2z M93.5,15L81.9,26.5l-8.6-8.6L84.9,6.4	L93.5,15z M83.2,94.3H6V17.2h61L36,48.2l-9.5,25.2l25.2-9.5l31.5-31.5V94.3z"/></svg>',
          path: '/'
        },
        {
          name: 'Редактор фото',
          image:
            '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"	 width="100px" height="100px" viewBox="-205 207 100 100" style="enable-background:new -205 207 100 100;" xml:space="preserve"><g>	<path d="M-199.2,209.9v94.2c0,1.4,1.1,2.5,2.5,2.5h83.5c1.4,0,2.5-1.1,2.5-2.5v-94.2c0-1.4-1.1-2.5-2.5-2.5h-83.5		C-198.1,207.4-199.2,208.5-199.2,209.9z M-115.7,212.4v62.8l-10.6-8c-3.7-2.8-8.8-2.7-12.4,0.1l-11.2,8.8c-2.1,1.6-5.1,1.4-6.9-0.4		l-11.4-11.5c-3.6-3.7-9.4-4-13.5-0.8l-12.6,9.9v-60.8H-115.7z M-194.3,301.6v-22.1l15.7-12.4c2.1-1.6,5.1-1.5,6.9,0.4l11.4,11.5		c3.6,3.7,9.4,4,13.5,0.9l11.2-8.8c1.9-1.5,4.5-1.5,6.4-0.1l13.6,10.3v20.3H-194.3z"/>	<path d="M-134.4,242.1c6.9,0,12.4-5.6,12.4-12.4c0-6.9-5.6-12.4-12.4-12.4c-6.9,0-12.4,5.6-12.4,12.4		C-146.8,236.6-141.3,242.1-134.4,242.1z M-134.4,222.2c4.1,0,7.5,3.4,7.5,7.5s-3.4,7.5-7.5,7.5s-7.5-3.4-7.5-7.5		S-138.5,222.2-134.4,222.2z"/></g></svg>',
          path: '/img-editor'
        }
      ]
    };
  }
};
</script>

<style>
#app {
  width: 100%;
  height: 100%;
}

.main{

}

.side-bar {
  position: fixed;
  width: var(--side-bar);
  height: 100vh;
  padding: 3rem 0.5rem;
  background-color: rgb(var(--accent-color));
}

.side-bar .item {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.9rem;
  margin-bottom: 0.5rem;
  cursor: pointer;
  border-radius: 50%;
}

.icon-menu {
  width: 2rem;
  height: 2rem;
}

a {
  display: block;
  text-decoration: none;
  color: currentColor;
}

.icon-menu svg {
  width: 100%;
  height: 100%;
  fill: rgb(var(--text-color));
}

.side-bar .item:hover {
  background-color: rgb(var(--main-color));
}

.side-bar .item.active {
  background-color: rgb(var(--main-color));
}
</style>
