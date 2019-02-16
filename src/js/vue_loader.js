import Vue from 'vue'
import pizzaMaker from '../components/pizza-maker.vue'
import scrapping from '../components/pizzas.vue'
if (window.location.pathname.indexOf('index') !== -1) {
    new Vue({
        render: h => h(pizzaMaker)
    }).$mount('#pizza-maker')
} else if (window.location.pathname === '/pizza-list.html') {
    new Vue({
        render: h => h(scrapping)
    }).$mount('#scrapping')
}
