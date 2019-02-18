import Vue from 'vue'
import pizzaMaker from '../components/pizza-maker.vue'
import scrapping from '../components/pizzas.vue'

if (window.location.pathname === '/pizza-list.html') {
    console.log('test')
    new Vue({
        render: h => h(scrapping)
    }).$mount('#scrapping')
} else {
    new Vue({
        render: h => h(pizzaMaker)
    }).$mount('#pizza-maker')
}
