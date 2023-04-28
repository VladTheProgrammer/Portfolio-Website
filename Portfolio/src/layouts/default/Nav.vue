<template>
    <v-navigation-drawer  rounded="pill" elevation="18" expand-on-hover  rail disable-resize-watcher
        color="rgba(0,0,0,0.5)" rail-width="100" width="100" floating class="my-auto text-center"
        style="overflow:hidden;" @mouseenter="openNav()" @mouseleave="closeNav()">
        <v-container class="pa-0">
            <v-list nav>
                <v-list-item v-if="navDrawer" v-for="item in getRoutes" :key="item.name" link :to="item.path"
                    style="background-color:transparent;" :active="item.path == this.$router.currentRoutePath" replace>

                    <v-icon size="40" :style="{ background: gradient }" style="transition: background-color 1s; 
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
</template>

  
<script>
import { computed } from 'vue';


export default {



    data: () => ({
        navDrawer: false,
        index: 0,
        selectedItem: 0,
        colors: [
            { id: 0, hex: "#fff", disabled: false },
            { id: 1, hex: "#f5af19", disabled: false },
            { id: 2, hex: "#000", disabled: false },
        ],
        id: 3,

        


    }),
    methods: {
        openNav(){
            this.navDrawer = !this.navDrawer;
        },

        closeNav(){
            this.navDrawer = !this.navDrawer;
        },


        updateNav() {
            this.navDrawer = !this.navDrawer;
            this.generateGradient();

        },
        addColor() {
            this.colors.push({ id: this.id, hex: this.randomHex(), disabled: false });
            this.id++;
        },
        removeColor() {
            if (this.colors[this.colors.length - 1].disabled == false) {
                if (this.colors.length > 2) {
                    this.colors.pop();
                }
            }
        },
        generateGradient() {
            for (let i = 0; i < this.colors.length; i++) {
                if (this.colors[i].disabled === false)
                    this.colors[i].hex = this.randomHex();
            }
        },
        lockColor(index) {
            this.colors[index].disabled === true
                ? (this.colors[index].disabled = false)
                : (this.colors[index].disabled = true);
        },
        randomHex() {
            return (
                "#" +
                Math.random()
                    .toString(16)
                    .slice(2, 8)
            );
        },
        up(index) {
            if (index > 0) {
                let temp = this.colors[index];
                this.$set(this.colors, index, this.colors[index - 1]);
                this.$set(this.colors, index - 1, temp);
            }
        },
        down(index) {
            if (index < this.colors.length - 1) {
                let temp = this.colors[index];
                this.$set(this.colors, index, this.colors[index + 1]);
                this.$set(this.colors, index + 1, temp);
            }
        },
        currentRoutePath(path) {
            let routerPath = this.$route.path;
            if (path == routerPath) {
                console.log(path);

            } else {
                console.log(this.$route.name);

                console.log(path);
            }

        },
        setItem(index) {
            this.index = index;

            console.log(this.selectedItem);
        },

    },
    computed: {
        getRoutes() {
            let routes  = this.$router.getRoutes();
            routes.pop();
            return routes;
        },


        gradient() {
            let colors = "linear-gradient(45deg";
            this.colors.forEach(function (e) {
                colors += "," + e.hex;
            });
            colors += ")";
            return colors;
        }
    },
    watch: {
        selectedItem() {
            if (typeof this.selectedItem === 'undefined') {
                setTimeout(() => {
                    this.selectedItem = this.index;
                }, 500);
            }
        },
    },
};
</script>


<style scoped>
v-navigation-drawer{
    
}
</style>