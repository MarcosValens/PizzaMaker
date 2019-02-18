<template>
 <div>
     <table v-if="pizzas.length > 0">
         <tr>
             <th>Nombre</th>
             <th>Foto</th>
             <th>Ingredientes</th>
         </tr>
         <tr v-for="pizza in pizzas" :key="pizzas.name">
             <td>
                 {{pizza.names}}
             </td>
             <td>
                 <img :src="pizza.imgs" :alt="pizza.name">
             </td>
             <td>
                 {{pizza.ing}}
             </td>
         </tr>
     </table>
 </div>
</template>

<script>
    import pizzas from '../scraps/scrap.json';
    export default {
        data(){
            return{
                pizzas: pizzas,
            }
        },
        /*methods: {
            async getData() {
                let response = await fetch('./src/scraps/scrap.json')
                return await response.json()
            }
        },*/
        mounted: async function () {
            console.log(window.location.pathname)
            /*this.pizzas = await this.getData()*/
        }
    }

</script>

<style scoped>
    table{
        margin: 0 auto;
        border: 1px solid black;
        text-align: center;
    }

    th,td{
        border: 1px solid black;
    }

    img {
        width: 100px;
    }
</style>
