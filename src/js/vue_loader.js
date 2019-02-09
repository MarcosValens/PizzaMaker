import Vue from 'vue'
import pizzaMaker from '../components/pizza-maker.vue'


new Vue({
    render: h => h(pizzaMaker)
}).$mount('#pizza-maker')
