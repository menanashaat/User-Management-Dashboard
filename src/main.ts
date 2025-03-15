import { createApp } from 'vue';
import './style.scss';
import App from './App.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import { ElButton, ElTable, ElPagination, ElForm, ElInput, ElSelect, ElOption } from 'element-plus';
import { createPinia } from 'pinia'; // Import Pinia
import {i18n} from './i18n'; // Import the i18n instance

// Create the app instance
const app = createApp(App);

// Create Pinia instance
const pinia = createPinia();

// Use Pinia
app.use(pinia);
app.use(i18n); // Use the i18n instance

// Use Element Plus
app.use(ElementPlus);

// Register Element Plus components
app.component('ElButton', ElButton);
app.component('ElTable', ElTable);
app.component('ElPagination', ElPagination);
app.component('ElForm', ElForm);
app.component('ElInput', ElInput);
app.component('ElSelect', ElSelect);
app.component('ElOption', ElOption);

// Mount the app
app.mount('#app');