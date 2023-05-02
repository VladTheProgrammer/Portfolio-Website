/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        colors: {
          background: '#E9EDDE',
          primary: '#738290',
          secondary: '#FFFDF7',
          card: '#7E5920',
          text: '#0B0A07',
        },
      },
    },
  },
})
