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
            '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"	 width="32px" height="32px" viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve"><g>	<g id="Select">		<g>			<path d="M5,0H3C1.346,0,0,1.346,0,3v2c0,0.553,0.447,1,1,1s1-0.447,1-1V3c0-0.551,0.448-1,1-1h2c0.553,0,1-0.448,1-1				C6,0.447,5.553,0,5,0z M29,0h-2c-0.553,0-1,0.447-1,1c0,0.552,0.447,1,1,1h2c0.552,0,1,0.449,1,1v2c0,0.553,0.447,1,1,1				s1-0.447,1-1V3C32,1.346,30.654,0,29,0z M31,26c-0.553,0-1,0.447-1,1v2c0,0.551-0.448,1-1,1h-2c-0.553,0-1,0.447-1,1				c0,0.552,0.447,1,1,1h2c1.654,0,3-1.346,3-3v-2C32,26.447,31.553,26,31,26z M5,30H3c-0.552,0-1-0.449-1-1v-2c0-0.553-0.447-1-1-1				s-1,0.447-1,1v2c0,1.654,1.346,3,3,3h2c0.553,0,1-0.448,1-1C6,30.447,5.553,30,5,30z M1,20c0.553,0,1-0.448,1-1v-6				c0-0.553-0.447-1-1-1s-1,0.447-1,1v6C0,19.552,0.447,20,1,20z M31,12c-0.553,0-1,0.447-1,1v6c0,0.552,0.447,1,1,1s1-0.448,1-1v-6				C32,12.447,31.553,12,31,12z M19,0h-6c-0.553,0-1,0.447-1,1c0,0.552,0.447,1,1,1h6c0.553,0,1-0.448,1-1C20,0.447,19.553,0,19,0z				 M19,30h-6c-0.553,0-1,0.447-1,1c0,0.552,0.447,1,1,1h6c0.553,0,1-0.448,1-1C20,30.447,19.553,30,19,30z"/>	</g></g></g></svg>',
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

.main {
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
