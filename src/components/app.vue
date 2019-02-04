<template>
    <div>
        <h1>{{message}}</h1>
        <p v-if="this.message==='hola'">Has dicho hola</p>
        <p>Hola soy {{usuario.nombre}} {{usuario.apellidos}} con el DNI {{usuario.nif}} y mi correo es {{usuario.email}}</p>
        <br>
        <p :style="color">Es Liceu</p>
        <br>
        <label>
            <input v-model="usuario.nombre">
        </label>
        <label>
            <input v-model="usuario.apellidos">
        </label>
        <label>
            <input v-model="usuario.nif">
        </label>
        <label>
            <input v-model="usuario.email">
        </label>
        <button @click="mayusculas"> mayus</button>
        <button @click="enviar"> enviar</button>
        <button @click="estilo">estilo</button>
    </div>


</template>

<script>
    export default {
        data() {
            return {
                color: 'color:red',
                message: 'Hello Vue!',
                /*nombre:'',
                apellidos:'',
                nif:'',
                email:'',*/
                usuario: {
                    nombre: 'marcos',
                    apellidos: '',
                    nif: '',
                    email: '',
                    pagos: []
                }
                /*haDichoHola:(this.message==="hola")*/
            }
        },
        methods: {
            enviar: function () {
                /*let nom = this.nombre
                let c = this.apellidos
                let n = this.nif
                let e = this.email
                console.log(nom,c,n,e)*/
                console.log(this.usuario)

            },
            mayusculas: function () {
                this.message = this.message.toUpperCase()
            },
            estilo: function () {
                this.color = 'color:blue'
            }
        },
        created() {
            setTimeout(function () {
                this.usuario.nombre = "hola"
            }.bind(this), 2000) /* <-- hay que insertar el objeto vue mediante this por culpa de la funcion callback */

        }
    }
</script>

<style scoped>

</style>
