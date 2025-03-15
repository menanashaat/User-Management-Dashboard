import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import { ElButton, ElTable, ElPagination, ElForm, ElInput, ElSelect, ElOption } from 'element-plus';

createApp(App).mount('#app')
const app = createApp(App);

app.use(ElementPlus);
app.component('ElButton', ElButton);
app.component('ElTable', ElTable);
app.component('ElPagination', ElPagination);
app.component('ElForm', ElForm);
app.component('ElInput', ElInput);
app.component('ElSelect', ElSelect);
app.component('ElOption', ElOption);