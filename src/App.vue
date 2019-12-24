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
          name: 'Генерация фото',
          image:
            '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"	 viewBox="0 0 100 100" style="enable-background:new 0 0 100 100;" xml:space="preserve"><g>	<path d="M56.3,28.5c-6.1,0-11.1,5-11.1,11.1s5,11.1,11.1,11.1c6.1,0,11.1-5,11.1-11.1S62.4,28.5,56.3,28.5z M56.3,45.7		c-3.4,0-6.1-2.7-6.1-6.1s2.7-6.1,6.1-6.1s6.1,2.7,6.1,6.1S59.7,45.7,56.3,45.7z"/>	<path d="M23.6,6.2v13.6H8c-3,0-5.4,2.4-5.4,5.4v68.2c0,3,2.4,5.4,5.4,5.4h62.7c3,0,5.4-2.4,5.4-5.4V79.8h15.6c3,0,5.4-2.4,5.4-5.4		V6.2c0-3-2.4-5.4-5.4-5.4H29C26,0.8,23.6,3.3,23.6,6.2z M71.1,93.8H7.6V78.3l10.5-11.4c0.9-0.9,2.1-1.4,3.3-1.4		c1.3,0,2.4,0.6,3.2,1.6L31,75c1.6,2,4.1,3.3,6.7,3.5c2.6,0.2,5.2-0.8,7.1-2.6l6.6-6.4c1.7-1.6,4.3-1.6,6,0l13.7,13.2V93.8z		 M71.1,30.7v45l-10.3-9.9c-3.6-3.5-9.3-3.5-13,0l-6.6,6.4c-0.9,0.9-2.1,1.3-3.3,1.2c-1.2-0.1-2.3-0.7-3.1-1.6L28.6,64		c-1.7-2.1-4.2-3.4-7-3.5c-2.7-0.1-5.3,1-7.2,3l-6.8,7.4V24.8h58.6h4.9V30.7z M70.7,19.8c0.6-3.1,3.6-5.4,7-4.8		c2.5,0.4,4.5,2.4,5,4.9c0.7,4.1-2.6,7.6-6.6,7.2c0,0,0,0,0,0v-1.9C76.1,22.3,73.7,19.8,70.7,19.8L70.7,19.8z M92.1,74.8h-16V45.5		l16,15.4V74.8z M92.1,53.9l-16-15.4v-6.4c0.2,0,0.4,0,0.6,0c6.1,0,11.1-5,11.1-11.1S82.8,10,76.7,10c-5.7,0-10.4,4.3-11,9.9h-37		v-14h63.5V53.9z"/></g></svg>',
          path: '/image-gen'
        },
        {
          name: 'Редактор фото',
          image:
            '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"	 width="100px" height="100px" viewBox="-205 207 100 100" style="enable-background:new -205 207 100 100;" xml:space="preserve"><g>	<path d="M-199.2,209.9v94.2c0,1.4,1.1,2.5,2.5,2.5h83.5c1.4,0,2.5-1.1,2.5-2.5v-94.2c0-1.4-1.1-2.5-2.5-2.5h-83.5		C-198.1,207.4-199.2,208.5-199.2,209.9z M-115.7,212.4v62.8l-10.6-8c-3.7-2.8-8.8-2.7-12.4,0.1l-11.2,8.8c-2.1,1.6-5.1,1.4-6.9-0.4		l-11.4-11.5c-3.6-3.7-9.4-4-13.5-0.8l-12.6,9.9v-60.8H-115.7z M-194.3,301.6v-22.1l15.7-12.4c2.1-1.6,5.1-1.5,6.9,0.4l11.4,11.5		c3.6,3.7,9.4,4,13.5,0.9l11.2-8.8c1.9-1.5,4.5-1.5,6.4-0.1l13.6,10.3v20.3H-194.3z"/>	<path d="M-134.4,242.1c6.9,0,12.4-5.6,12.4-12.4c0-6.9-5.6-12.4-12.4-12.4c-6.9,0-12.4,5.6-12.4,12.4		C-146.8,236.6-141.3,242.1-134.4,242.1z M-134.4,222.2c4.1,0,7.5,3.4,7.5,7.5s-3.4,7.5-7.5,7.5s-7.5-3.4-7.5-7.5		S-138.5,222.2-134.4,222.2z"/></g></svg>',
          path: '/image-editor'
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
	padding: 2rem;
	margin-left: calc(var(--side-bar));
}

.side-bar {
  position: fixed;
  width: var(--side-bar);
  height: 100vh;
  padding: 3rem 0.5rem;
  background-color: hsl(var(--accent-color));
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
  fill: hsl(var(--text-color));
}

.side-bar .item:hover {
  background-color: hsl(var(--main-color));
}

.side-bar .item.active {
  background-color: hsl(var(--main-color));
}
</style>
