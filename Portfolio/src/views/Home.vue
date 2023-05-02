<template >
  <transition name="fade" mode="out-in">
    <v-container :key="currentSection" class="ma-0 pa-0 section" fluid>
      <v-row v-if="currentSection === 'home'" :key="'home'" class="py-6 px-16 fill-height">
        
        <v-col cols="11" >
          <v-card color="transparent" flat transparent height="100%" class="text-left d-flex justify-center flex-column">
            
            <div class="homepage-word-wrapper">
              <div class="avatar-container">
                <v-img :src="avatarUrl" alt="Profile Avatar" class="avatar-image"></v-img>
              </div>
              <div class="text-wrapper">
                <div class="line">
                  <h2 class="text-h2 font-weight-bold text-text lineup">Welcome to my portfolio!</h2>
                </div>
                <h1 class="text-h6 font-weight-bold text-text">
                  <template v-for="word in words">
                    <span>{{ word }}</span>
                  </template>
                </h1>
                
              </div>
              
            </div>
           
          </v-card>
        </v-col>
        <v-col cols="1" class="d-flex flex-column justify-end align-end">
          <v-icon>mdi-arrow-up</v-icon>
            <v-icon>mdi-keyboard</v-icon>
            <v-icon>mdi-arrow-down</v-icon>
        </v-col>
      </v-row>

      <v-row v-if="currentSection === 'about-me'" :key="'about-me'" class="py-6 px-16 fill-height">
        <v-col cols="12" md="4">
          <v-card class="project-card mb-10" flat color="primary">


            <v-card-title color="text">About Me</v-card-title>
            <v-card-text color="text" class="text-justify">
              <p>{{ bio }}</p>
            </v-card-text>
          </v-card>
          <v-card flat color="primary" class="project-card">
            <v-card-title>Skills</v-card-title>
            <v-card-text >
              <v-chip v-for="skill in skills" :key="skill" variant="flat" color="card" class="skill-chip mx-auto">
                {{ skill }}
              </v-chip>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="8">
          <v-card class="project-card" height="100%" flat color="primary">
            <v-card-title>Experience</v-card-title>
            <v-timeline style="min-height:0; height: 94%; overflow-y:auto; position: absolute;" class="px-6">
              <v-timeline-item v-for="job in jobs" :key="job.company" :dot-color="job.color" :icon="job.icon">
                <v-card color="card">
                  <v-card-title>{{ job.title }}</v-card-title>
                  <v-card-subtitle>{{ job.company }}</v-card-subtitle>
                  <v-card-text>{{ job.description }}</v-card-text>
                  <!-- <v-card-actions>
                    <v-btn :href="job.website" target="_blank" color="secondary" text>
                      Website
                    </v-btn>
                    <v-btn :href="job.resume" target="_blank" text color="secondary">
                      Resume
                    </v-btn>
                  </v-card-actions> -->
                </v-card>

                <v-divider v-if="job !== jobs[jobs.length - 1]" />
              </v-timeline-item>
            </v-timeline>
          </v-card>
        </v-col>
      </v-row>

      <v-row v-if="currentSection === 'portfolio'" :key="'portfolio'" class="py-6 px-16 fill-height">
        <v-col xsAndUp="12" mdAndUp="6" v-for="project in projects" :key="project.id">
          <v-card color="primary" height="100%" class=" project-card d-flex flex-column">
            <v-row v-if="project.id === 2">
              <v-col cols="12">

                <div class="imac-mockup">
                  <img src="@/assets/imac-mockup.png" alt="iMac Mockup" class="imac-image">
                  <v-carousel cycle :show-arrows="false" hide-delimiters class="carousel-container">
                    <v-carousel-item v-for="(image, index) in project.images" :key="index">
                      <img :src="image.src" :alt="image.alt" class="project-image">
                    </v-carousel-item>
                  </v-carousel>
                </div>
              </v-col>
            </v-row>
            <v-row v-else>
              <v-col cols="12">
                <div class="iphone-mockup">
                  <img src="@/assets/iphone-mockup.png" alt="iPhone Mockup" class="iphone-image">
                  <video :src="project.video" :poster="project.image" class="video" loop muted controls></video>
                </div>
              </v-col>
            </v-row>
            <v-spacer></v-spacer>
            <v-row class="card-text-content">
              <v-col cols="12" align-self="end">
                <v-card-title>{{ project.title }}</v-card-title>
                <v-card-subtitle>{{ project.subtitle }}</v-card-subtitle>
                <v-card-text>{{ project.description }}</v-card-text>
                <v-card-actions>
                  <v-btn color="text-text" :href="project.link" target="_blank">
                    View project
                  </v-btn>
                </v-card-actions>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>

      <v-row v-if="currentSection === 'contact'" :key="'contact'" class="pt-6 px-16 fill-height">
        <v-col cols="12">
          <v-card height="100%" color="primary" class="project-card">
            <v-card-title>Contact</v-card-title>
            <v-card-text>
              <!-- Add social media icons and phone number -->
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-btn v-for="link in socialLinks" :key="link.name" :href="link.url" target="_blank" icon class="mx-2"
                      fab color="card">
                      <v-icon>{{ link.icon }}</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-icon>mdi-phone</v-icon>
                    <span>{{ phoneNumber }}</span>
                  </v-col>
                </v-row>
              </v-container>
              <!-- Contact form -->
              <v-container>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field label="Name" v-model="contactForm.name" :rules="[v => !!v || 'Name is required']"
                      required></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field label="Email" v-model="contactForm.email" :rules="emailRules" required></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-textarea label="Message" v-model="contactForm.message" :rules="[v => !!v || 'Message is required']"
                      required></v-textarea>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" class="text-right">
                    <v-btn color="card" @click="submitContactForm">Send Message</v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </transition>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch, inject, reactive } from 'vue';

const text = 'As a professional developer, I am excited to showcase my previous work and demonstrate my skills.';
const words = text.split(" ").map(addSpaces); // Change forEach to map for correct usage

const currentSection = inject('currentSection');

const sectionsRefs = ref(['home', 'about-me', 'portfolio', 'contact']);
const scrolling = ref(false);

const handleKeyDown = (event) => {

    if (event.key === "ArrowUp") {
      const prevSectionIndex = sectionsRefs.value.findIndex(
        (sectionRef) => sectionRef === currentSection.value
      ) - 1;
      if (prevSectionIndex >= 0) {
        currentSection.value = sectionsRefs.value[prevSectionIndex];
      }
    } else if (event.key === "ArrowDown") {
      const nextSectionIndex = sectionsRefs.value.findIndex(
        (sectionRef) => sectionRef === currentSection.value
      ) + 1;
      if (nextSectionIndex < sectionsRefs.value.length) {
        currentSection.value = sectionsRefs.value[nextSectionIndex];
      }
    }

  };

  onMounted(() => {
    window.addEventListener("keydown", handleKeyDown);
  });

  onUnmounted(() => {
    window.removeEventListener("keydown", handleKeyDown);
  });

  function addSpaces(item) {
    return ' ' + item;
  };


  const contactForm = reactive({
    name: '',
    email: '',
    message: '',
  });

  const emailRules = [
    v => !!v || 'E-mail is required',
    v => /.+@.+/.test(v) || 'E-mail must be valid',
  ];

  const socialLinks = [
    {
      name: 'Instagram',
      icon: 'mdi-instagram',
      url: 'https://www.instagram.com/vlad_k123',
    },
    {
      name: 'Twitter',
      icon: 'mdi-twitter',
      url: 'https://www.twitter.com/SkyFlowVlad',
    },
    {
      name: 'WhatsApp',
      icon: 'mdi-whatsapp',
      url: 'https://wa.me/+79872297033',
    },
    {
      name: 'Telegram',
      icon: 'mdi-send',
      url: 'https://t.me/VKisselev',
    },
  ];

  const phoneNumber = ref('+1-778-835-4249');

  const avatarUrl = ref('https://media.licdn.com/dms/image/C4E03AQGTox-ee9RoTw/profile-displayphoto-shrink_800_800/0/1517283974129?e=2147483647&v=beta&t=VC4-0jK_VJKgVOigjDLf18lY9tqKdW64_ZhMtVxEzMs');
  const bio = ref("I am an experienced and versatile developer with a strong background in programming, web development, and IT. Having worked in various roles, I have honed my expertise in front-end web development, WordPress, and mobile application development. My skill set includes proficiency in Vue.js, Vuetify, Java, Swift, SQL and noSQL languages, and other supporting technologies. As a bi-lingual developer fluent in English and Russian, I am an effective communicator, active listener, and a team player. Outside of my professional life, I enjoy reading, exercising, spending time with friends and family. Additionally, I have a keen interest in human psychology and economics. With a proven track record of success and a commitment to innovation, I hope to be an asset to any development team looking for a skilled and motivated programmer.");
  const skills = ref(['Adobe', 'Vue.js', 'CSS', 'Vuetify', 'HTML', 'Swift', 'Java', 'noSQL/SQL', 'Mobile Application Development', 'WordPress', 'Network Infrastructure', 'Google AdWords', 'Digital Marketing', 'English', 'Russian',]);
  const jobs = ref([
    {
      company: "Private Contractor (2021-2023)",
      title: "Front End Vue Developer",
      description: "During my time as a private contractor, I worked closely with a South Korean company, NareTrends, to perform a comprehensive front-end overhaul of their SmartFarm app. The project required extensive use of Vue.js, Vuetify, JavaScript, and PostgreSQL frameworks to achieve a modern, responsive design. I successfully implemented a ready-to-use design in Adobe, transforming the app from an outdated front-end to a new, user-friendly experience that significantly improved user engagement and satisfaction.",
      website: "https://example.com",
      resume: "https://example.com/resume",
      color: "rgba(251, 130, 37, 1)",
      icon: "mdi-leaf",
    },
    {
      company: "Private Contractor (2019-2021)",
      title: "WordPress Web Developer",
      description: "As a private contractor specializing in WordPress web development, I designed, developed, and maintained sales platform websites for various clients. My responsibilities included implementing marketing strategies using Google AdWords and social media platforms to drive traffic and increase conversions. I utilized my expertise in WordPress, HTML, CSS, and JavaScript to create visually appealing and functional websites, ensuring seamless integration with various marketing tools and platforms.",
      website: "https://example.com",
      resume: "https://example.com",
      color: "rgba(37, 112, 146, 1)",
      icon: "mdi-wordpress",
    },
    {
      company: "Happy Hour labs inc (2018-2019)",
      title: "Lead Developer",
      description: "In my role as a Lead Developer at Happy Hour Labs Inc, I played a critical role in designing, coding, and publishing a mobile dating application. I worked closely with my co-founder to turn our shared vision into reality, utilizing a variety of technologies such as Swift for iOS development, FireBase as a database, and third party API like FaceBook Auth, Google Maps and others. My expertise in app development, user experience design, and project management contributed to the successful launch and growth of the dating app.",
      website: "https://example.com",
      resume: "https://example.com",
      color: "rgba(74, 202, 247, 1)",
      icon: "mdi-glass-wine",
    },

  ]);
  const projects = ref([
    {
      id: 1,
      title: "Revolutionizing Dating with Happy Hour Labs Inc.",
      subtitle: "Innovative Mobile App Development with Cutting-Edge Technologies",
      description: "As the Lead Developer at Happy Hour Labs Inc., I spearheaded the creation of a ground-breaking mobile dating application. Collaborating closely with the co-founder, we transformed a visionary concept into a tangible product. Harnessing the power of Swift, Firebase, and Xcode, I built a seamless and engaging user experience that sets our dating platform apart.",
      image: "./src/assets/iPhoneDemoPhoto.gif",
      link: "https://example.com",
      video: './src//assets/iPhoneDemo.m4v',
      animate: false
    },
    {
      id: 2,
      title: "SmartFarm Front-End Revamp",
      subtitle: "Transforming the User Experience with Vue and Vuetify",
      description: "Partnered with NareTrends, a South Korean company, to rejuvenate the SmartFarm app by revamping its front-end using cutting-edge Vue, Vuetify, JavaScript, and PostgreSQL technologies. Seamlessly integrated a sophisticated design from Adobe, elevating the app's interface and user experience to new heights.",
      link: "https://example.com",
      images: [
        { src: './src/assets/NareDemo.png', alt: 'Image 1' },
        { src: './src/assets/NareDemo1.png', alt: 'Image 2' },
        { src: './src/assets/NareDemo2.png', alt: 'Image 3' },
        { src: './src/assets/NareDemo3.png', alt: 'Image 4' },],
      animate: false
    }
  ]);


  function submitContactForm() {
    if (
      contactForm.name === '' ||
      contactForm.email === '' ||
      contactForm.message === ''
    ) {
      this.$store.commit('setSnackbar', {
        show: true,
        message: 'Please fill in all the required fields.',
        color: 'error',
      });
      return;
    }

    // Send the contact form data to the backend or a third-party service (e.g., SendGrid, Mailchimp) for processing.
    // Reset the form after successful submission
    contactForm.name = '';
    contactForm.email = '';
    contactForm.message = '';

    this.$store.commit('setSnackbar', {
      show: true,
      message: 'Your message has been sent. Thank you!',
      color: 'success',
    });
    return {
      currentSection,
      sectionsRefs,
    };
  }

</script>



<style scoped>
.section {
  max-height: 100vh;
  height: 100vh;

}

.v-btn {
  transition: transform 0.3s;
}

.v-btn:hover {
  transform: translateY(-3px);
}

.v-icon {
  transition: transform 0.3s;
}

.v-icon:hover {
  transform: scale(1.1);
}


.skill-chip {
  transition: all 0.3s ease;
  margin: 2px;
}

.skill-chip:hover {
  transform: scale(1.1);
  cursor: pointer;
}

.project-card {
  transition: all 0.3s ease;

}

.project-card:hover {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
  transform: translateY(-5px);
}

.iphone-mockup {
  position: relative;
  display: inline-block;
  align-items: center;

}

.iphone-image {
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
  z-index: 2;
  max-height: 30%;
  max-width: 30%;
}

.video {
  position: absolute;
  top: 3%;
  /* Adjust this value based on the iPhone mockup image */
  left: 37%;
  /* Adjust this value based on the iPhone mockup image */
  width: 26%;
  /* Adjust this value based on the iPhone mockup image */
  height: 83%;
  /* Adjust this value based on the iPhone mockup image */
  margin-top: 30px;
  z-index: 1;
}

.imac-mockup {
  position: relative;
}

.imac-image {
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 25px;
  max-height: 30%;
  max-width: 70%;
}

.carousel-container {
  position: absolute;
  top: 7%;
  /* Adjust this value to align the carousel within the iMac-image */
  left: 19%;
  /* Adjust this value to align the carousel within the iMac-image */
  width: 62%;
  /* Adjust this value to fit the carousel within the iMac-image */
  max-height: 63%;
  /* Adjust this value to fit the carousel within the iMac-image */
  overflow: hidden;
}

.project-image {
  height: 45%;
  width: 100%;
  object-fit: cover;
}

.line {
  margin-left: -2px;
  width: 100%;
  height: 4rem;
  overflow: hidden;
  text-align: left;
  padding: 0;
  margin-bottom: 5px;
}

.lineup {
  animation: 2s anim-lineUp forwards;
  animation-delay: 3s;
  opacity: 0;
}

@keyframes anim-lineUp {

  0% {
    transform: translateY(80%);
  }

  50% {
    opacity: 1;
    transform: translateY(0%);
  }

  100% {
    opacity: 1;
    transform: translateY(0%);
  }
}

h1 {
  margin-left: 1%;
  max-width: 50%;
  text-align: left;
  transform: scale(0.94);
  animation: scale 3s forwards cubic-bezier(0.5, 1, 0.89, 1);
}

@keyframes scale {
  100% {
    transform: scale(1);
  }
}

span {
  display: inline-block;
  opacity: 0;
  filter: blur(4px);
  white-space: pre;
}

span:nth-child(1) {
  animation: fade-in 0.8s 0.1s forwards cubic-bezier(0.11, 0, 0.5, 0);
}

span:nth-child(2) {
  animation: fade-in 0.8s 0.2s forwards cubic-bezier(0.11, 0, 0.5, 0);
}

span:nth-child(3) {
  animation: fade-in 0.8s 0.3s forwards cubic-bezier(0.11, 0, 0.5, 0);
}

span:nth-child(4) {
  animation: fade-in 0.8s 0.4s forwards cubic-bezier(0.11, 0, 0.5, 0);
}

span:nth-child(5) {
  animation: fade-in 0.8s 0.5s forwards cubic-bezier(0.11, 0, 0.5, 0);
}

span:nth-child(6) {
  animation: fade-in 0.8s 0.6s forwards cubic-bezier(0.11, 0, 0.5, 0);
}

span:nth-child(7) {
  animation: fade-in 0.8s 0.7s forwards cubic-bezier(0.11, 0, 0.5, 0);
}

span:nth-child(8) {
  animation: fade-in 0.8s 0.8s forwards cubic-bezier(0.11, 0, 0.5, 0);
}

span:nth-child(9) {
  animation: fade-in 0.8s 0.9s forwards cubic-bezier(0.11, 0, 0.5, 0);
}

span:nth-child(10) {
  animation: fade-in 0.8s 1s forwards cubic-bezier(0.11, 0, 0.5, 0);
}

span:nth-child(11) {
  animation: fade-in 0.8s 1.1s forwards cubic-bezier(0.11, 0, 0.5, 0);
}

span:nth-child(12) {
  animation: fade-in 0.8s 1.2s forwards cubic-bezier(0.11, 0, 0.5, 0);
}

span:nth-child(13) {
  animation: fade-in 0.8s 1.3s forwards cubic-bezier(0.11, 0, 0.5, 0);
}

span:nth-child(14) {
  animation: fade-in 0.8s 1.4s forwards cubic-bezier(0.11, 0, 0.5, 0);
}

span:nth-child(15) {
  animation: fade-in 0.8s 1.5s forwards cubic-bezier(0.11, 0, 0.5, 0);
}

span:nth-child(16) {
  animation: fade-in 0.8s 1.6s forwards cubic-bezier(0.11, 0, 0.5, 0);
}

span:nth-child(17) {
  animation: fade-in 0.8s 1.7s forwards cubic-bezier(0.11, 0, 0.5, 0);
}

span:nth-child(18) {
  animation: fade-in 0.8s 1.8s forwards cubic-bezier(0.11, 0, 0.5, 0);
}

@keyframes fade-in {
  100% {
    opacity: 1;
    filter: blur(0);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.homepage-word-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;
  gap: 2rem;
}

.avatar-container {
  position: relative;
  width: 50vmin;
  /* Change this to use vmin to make it responsive */
  height: 50vmin;
  /* Change this to use vmin to make it responsive */
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  padding: 8px;
  aspect-ratio: 1 / 1;
  /* Add this line to maintain aspect ratio */
  background-color: rgb(var(--v-theme-card));
}

/* Add media query to handle responsiveness */
@media (max-width: 767px) {
  .avatar-container {
    width: 50vmin;
    height: 50vmin;
  }
}

.text-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 50%;
}

@keyframes gradient-animation {
  0% {
    background: linear-gradient(45deg, #f06, #f79);
  }

  25% {
    background: linear-gradient(45deg, #79f, #f79);
  }

  50% {
    background: linear-gradient(45deg, #79f, #f06);
  }

  75% {
    background: linear-gradient(45deg, #f79, #79f);
  }

  100% {
    background: linear-gradient(45deg, #f06, #f79);
  }
}</style>

