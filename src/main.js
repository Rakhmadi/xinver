import { createApp } from "vue";
import App from "./App.vue";
import {router} from './router'
import 'tutut/style.css'
import { createPinia } from 'pinia'
import 'tutut/style.css'

import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

import VueImageZoomer from 'vue-image-zoomer'
import 'vue-image-zoomer/dist/style.css';

createApp(App)
.use(router)
.use(createPinia())
.use(VueImageZoomer)
.component('QuillEditor', QuillEditor).mount("#app");
