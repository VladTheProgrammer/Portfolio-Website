<template>
  <v-container fluid >
    <v-row id="about-me" class="section" >
      <v-col cols="12" md="4">
        <v-card class="mb-3" flat color="primary">
          <v-img :src="avatarUrl" alt="Avatar"></v-img>
          
              <v-card-title>About Me</v-card-title>
              <v-card-text >
                <p>{{ bio }}</p>
              </v-card-text>
             
          
        </v-card>

        <v-card  flat color="primary">
          <v-card-title>Skills</v-card-title>
          <v-card-text>
            <v-chip v-for="skill in skills" :key="skill"  color="white" >
              {{ skill }}
            </v-chip>
          </v-card-text>
        </v-card>
 
      </v-col>

    
      <v-col cols="12" md="8">
  
        <v-card class="pa-3" height="100%" style="overflow-y: auto;" flat color="secondary">
          <v-card-title>Experience</v-card-title>
            <v-timeline style="min-height: 0; height: 100px;"  class="pa-3">
              <v-timeline-item v-for="job in jobs" :key="job.company" :color="job.color" :icon="job.icon">

                <v-card >
                  <v-card-title>{{ job.title }}</v-card-title>
                  <v-card-subtitle>{{ job.company }}</v-card-subtitle>
                  <v-card-text>{{ job.description }}</v-card-text>
                  <v-card-actions>
                    <v-btn :href="job.website" target="_blank" color="primary" text>
                      Website
                    </v-btn>
                    <v-btn :href="job.resume" target="_blank" text>
                      Resume
                    </v-btn>
                  </v-card-actions>
                </v-card>

                <v-divider v-if="job !== jobs[jobs.length - 1]" />
              </v-timeline-item>
            </v-timeline>
        </v-card>
  
      </v-col>
    </v-row>

    <v-row id="portfolio" class="section">
      <v-col cols="6" v-for="project in projects" :key="project.id">
        <v-card  height="100%" color="primary" @mouseover="project.animate = true" @mouseleave="project.animate = false">
          <v-img :src="project.image" :alt="project.title" ></v-img>
          <v-card-title>{{ project.title }}</v-card-title>
          <v-card-subtitle>{{ project.subtitle }}</v-card-subtitle>
          <v-card-text>{{ project.description }}</v-card-text>
          <v-card-actions>
            <v-btn color="white" :href="project.link" target="_blank">View project</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row id="contact" class="section">
      <v-col cols="12">
    <v-card height="100%" color="primary">
      <v-card-title>Contact</v-card-title>
    </v-card>
  </v-col>
  </v-row>
  </v-container>
</template>

<script>
import { ref, reactive, onMounted, onUnmounted } from 'vue';
export default {


  setup() {
    const referenceCard = ref(null);
    const state = reactive({
      referenceCardHeight: null,
    });

    // Update reference card height on component mount and resize
    const updateReferenceCardHeight = () => {
      if (referenceCard.value) {
        state.referenceCardHeight = `${referenceCard.value.clientHeight}px`;
        console.log(referenceCard.value);
      }
    };
    onMounted(() => {
      updateReferenceCardHeight();
      window.addEventListener('resize', updateReferenceCardHeight);
    });

    onUnmounted(() => {
      window.removeEventListener('resize', updateReferenceCardHeight);
    });

    return {

      referenceCard,
      ...state,
    };
  },


  data() {
    return {
      avatarUrl: 'https://media.licdn.com/dms/image/C4E03AQGTox-ee9RoTw/profile-displayphoto-shrink_800_800/0/1517283974129?e=2147483647&v=beta&t=VC4-0jK_VJKgVOigjDLf18lY9tqKdW64_ZhMtVxEzMs',
      bio: "I'm a software engineer with a passion for creating great user experiences. I specialize in web development using Vue.js and other technologies.",
      skills: ["Vue.js", "JavaScript", "HTML/CSS", "Git", "Webpack", "Vuetify", "Swift", "Java", "SQL / noSQL DBs"],
      jobs: [
        {
          company: "NareTrends",
          title: "Front End Vue Developer",
          description: "Collaborated with a South Korean company (NareTrends) to perform a front-end overhaul using Vue, Vuetify, JS, and PostgreSQL frameworks. Successfully implemented a ready design in Adobe within their SmartFarm app to upgrade the app from an older front-end to a new one.",
          website: "https://example.com",
          resume: "https://example.com/resume",
          color: "primary",
          icon: "mdi-desktop-mac-dashboard",
        },
        {
          company: "Private Contractor",
          title: "WordPress Web Developer",
          description: "Developed and maintained sales platform websites on WordPress. Designed and implemented marketing strategies with Google AdWords and other social media platforms.",
          website: "https://example.com",
          resume: "https://example.com",

        },
        {
          company: "Happy Hour labs inc",
          title: "Lead Developer",
          description: "Designed, coded and published a mobile dating application. Worked closely with co-founder to turn the vision into reality.",
          website: "https://example.com",
          resume: "https://example.com",

        },

      ],
      projects: [
        {
          id: 1,
          title: "Project 1",
          subtitle: "Web Development",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          image: "https://picsum.photos/id/237/300/200",
          link: "https://example.com",
          animate: false
        },
        {
          id: 2,
          title: "Project 2",
          subtitle: "Mobile App Development",
          description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          image: "https://picsum.photos/id/238/300/200",
          link: "https://example.com",
          animate: false
        }
      ],

    };
  },

};
</script>

<style scoped>
.section {
  min-height: 100vh;
  max-width: 100vw;
}


</style>

