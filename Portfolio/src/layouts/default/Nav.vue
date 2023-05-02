<template>
    <div class="d-flex pulse-animation">
        <v-navigation-drawer rounded="pill" elevation="18" expand-on-hover rail permanent color="rgba(0,0,0,0.5)"
            rail-width="100" width="100" class="my-auto ml-4 text-center"
            :style="navDrawer === true ? expandNav : contractNav" @update:rail="toggleNav">
            <v-container class="pa-0">
                <v-list nav rounded="pill">
                    <v-list-item v-if="navDrawer" v-for="item in getRoutes" :key="item.name" link @click="moveTo(item.path)"
                        :active-class="activeItemClass" :active="checkCorrectPath(item.path)">

                        <v-icon size="40" :style="{ background: gradient }" style="
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;">{{ item.props.default.icon }}</v-icon>


                        <v-list-item-title class="text-white">{{ item.name }}</v-list-item-title>

                    </v-list-item>
                    <v-list-item v-else style="min-height: 80px; background-color: transparent; border-radius:40px;">

                        <v-icon size="40" :style="{ background: gradient }" style="transition: background-color 1s;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;">mdi-menu</v-icon>

                    </v-list-item>
                </v-list>

            </v-container>
        </v-navigation-drawer>
    </div>
</template>

 
  
  <script setup>
  import { ref, onMounted, onBeforeUnmount, computed, inject } from 'vue';
  
  import { useRouter } from 'vue-router';
  const moveTo = (path) => {
    if (path == '/') {
      currentSection.value = 'home';
      console.log(currentSection);
    } else {
        currentSection.value = path.slice(1);
        console.log(currentSection);
    }
};
    const router = useRouter();
  const navDrawer = ref(false);
  const currentSection = inject('currentSection');
  const sections = ref([]);
  const colors = ref([
    { id: 0, hex: "#fff", disabled: false },
    { id: 1, hex: "#f5af19", disabled: false },
    { id: 2, hex: "#000", disabled: false },
  ]);
  const colorsAlt = ref([
    { id: 0, hex: "#fff", disabled: false },
    { id: 1, hex: "#f5af19", disabled: false },
    { id: 2, hex: "#000", disabled: false },
  ]);
  const activeSection = ref(null);
  
  onMounted(() => {
    sections.value = getSections();
    updateActiveSection();
  });
  
  onBeforeUnmount(() => {
    // clean up event listeners if necessary
  });
  
  function toggleNav() {
    navDrawer.value = !navDrawer.value;
    generateGradient();
  }
  
  function checkCorrectPath(path) {
    if (path.slice(1) == '' && currentSection.value == 'home') {
      return true;
    } else if (path.slice(1) == currentSection.value) {
      return true;
    }
    return false;
  }
  
  function getSections() {
    let s = getRoutes.value.map((route) => ({
      id: route.path.slice(1),
      element: document.getElementById(route.path.slice(1)),
    }));
    s[0] = { id: 'home', element: document.getElementById('home') };
    return s;
  }
  
  function updateActiveSection() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const currentScroll = scrollTop + windowHeight * 0.5;
  
    for (const section of sections.value) {
      if (
        section.element &&
        section.element.offsetTop <= currentScroll &&
        section.element.offsetTop + section.element.offsetHeight > currentScroll
      ) {
        activeSection.value = section.id;
        break;
      }
    }
  }
  
  
  function generateGradient() {
    for (let i = 0; i < colors.value.length; i++) {
      if (colors.value[i].disabled === false)
        colors.value[i].hex = randomHex();
    }
  }
  
  function randomHex() {
    return (
      "#" +
      Math.random()
        .toString(16)
        .slice(2, 8)
    );
  }
  
  function up(index) {
    if (index > 0) {
      let temp = colors.value[index];
      colors.value.splice(index, 1, colors.value[index - 1]);
      colors.value.splice(index - 1, 1, temp);
    }
  }
  
  function down(index) {
    if (index < colors.value.length - 1) {
      let temp = colors.value[index];
      colors.value.splice(index, 1, colors.value[index + 1]);
      colors.value.splice(index + 1, 1, temp);
    }
  }
  
  const expandNav = computed(() => 'max-height: 288px; transition: max-height 0.5s ease-in-out');
  const contractNav = computed(() => 'max-height: 100px; transition:max-height 0.5s cubic-bezier(0, 1, 0, 1)');

const getRoutes = computed(() => {
  let routes = router.getRoutes();
  routes.pop();
  return routes;
});

const activeItemClass = computed(() => "active-item");

const gradient = computed(() => {
  let colorsStr = "linear-gradient(45deg";

  colors.value.forEach(function (e) {
    colorsStr += "," + e.hex;
  });

  colorsStr += ")";
  return colorsStr;
});
</script>
  


<style scoped>
.active-item {
    border-radius: 500px;
    background-color: rgba(var(--v-theme-secondary), 0.2);
    
    /* Adjust this to your desired color */
}

.pulse-animation {
  animation: pulse 2s ease-in-out 2;
  animation-delay: 4s;
  opacity: 0;
  height: 100vh;
  width: 10vw;
  position: absolute;
  z-index: 13;
}

.pulse-animation:hover{
    opacity: 1;
    transition: opacity 0.5s;
}

@keyframes pulse {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>