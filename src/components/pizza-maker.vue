<template>
    <div>
        <div>
            <a href="pizza-list.html">Nuestras Pizzas</a>
        </div>
        <div id="wrapper-ingredients">
            <div id="base">
                <img id="base-img" src="../img/base.svg" usemap="#image-map" alt="base">
                <drop id="pizza-base" @drop="handleDrop">
                    <map name="image-map" id="image-map">
                        <area target="_self" alt="pizza-base" title="pizza-base"
                              coords="133,387,93,308,79,217,119,119,168,69,231,32,308,17,381,14,448,36,489,64,526,99,555,142,576,195,586,251,575,314,546,359,488,412,416,446,317,454,205,436"
                              shape="poly">
                    </map>
                </drop>
            </div>
            <div id="ingredients">
                <drag class="drag" :transfer-data="bellpepper">
                    <img src="../img/bellpepper-512.png" id="bellpepper" alt="pimiento amarillo" width="512"
                         height="512">
                </drag>
                <drag class="drag" :transfer-data="cheese">
                    <img src="../img/cheese-512.png" alt="queso" width="512" height="512">
                </drag>
                <drag class="drag" :transfer-data="corn">
                    <img src="../img/corn-512.png" alt="maiz" width="512" height="512">
                </drag>
                <drag class="drag" :transfer-data="mushroom">
                    <img src="../img/mushroom-512.png" alt="seta" width="512" height="512">
                </drag>
                <drag class="drag" :transfer-data="olive">
                    <img src="../img/olive-512.png" alt="oliva" width="512" height="512">
                </drag>
                <drag class="drag" :transfer-data="onion">
                    <img src="../img/onion-512.png" alt="cebolla" width="512" height="512">
                </drag>
                <drag class="drag" :transfer-data="pepperoni">
                    <img src="../img/pepperoni-512.png" alt="pepperoni" width="512" height="512">
                </drag>
                <drag class="drag" :transfer-data="tomato">
                    <img src="../img/tomato-512.png" alt="tomate" width="512" height="512">
                </drag>
            </div>
        </div>
        <div id="wrapper-ticket">
            <table v-if="ticket.ingredients.length > 0">
                <tr>
                    <th>Nombre</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                    <th>SubTotal</th>
                    <th>TOTAL</th>
                </tr>
                <tr v-for="ingRec in ticket.ingredients" :key="ingRec.name">
                    <td>
                        {{ingRec.name}}
                    </td>
                    <td>
                        {{ingRec.quantity}}
                    </td>
                    <td>
                        {{ingRec.price}}
                    </td>
                    <td>
                        {{ingRec.quantity*ingRec.price}}
                    </td>
                    <td></td>
                    <td>
                        <button @click="deleteOne(ingRec)">Eliminar uno</button>
                    </td>
                    <td>
                        <button @click="deleteIng(ingRec)">Eliminar</button>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                        {{total}}
                    </td>
                </tr>
            </table>
        </div>
        <button @click="say()">Play audio</button>
        <button @click="shutUp()">Stop audio</button>
        <button @click="deleteAll()">Eliminar todos los ingredientes</button>
        <button id="rec">Grabar</button>
        <button id="stop">Stop grabación</button>
    </div>
</template>

<script>
    import {Ticket} from "../model/Ticket.js"
    import {Bellpepper} from "../model/Bellpepper.js"
    import {Cheese} from "../model/Cheese.js"
    import {Corn} from "../model/Corn.js"
    import {Mushroom} from "../model/Mushroom.js"
    import {Olive} from "../model/Olive.js"
    import {Onion} from "../model/Onion.js"
    import {Pepperoni} from "../model/Pepperoni.js"
    import {Tomato} from "../model/Tomato.js"
    import {Drag, Drop} from 'vue-drag-drop'

    export default {
        components: {Drag, Drop},
        data() {
            return {
                bellpepper: new Bellpepper(),
                cheese: new Cheese(),
                corn: new Corn(),
                mushroom: new Mushroom(),
                olive: new Olive(),
                onion: new Onion(),
                pepperoni: new Pepperoni(),
                tomato: new Tomato(),
                ticket: new Ticket(),
                synth: window.speechSynthesis
            }
        },
        computed: {
            total: function () {
                let total = 0
                this.ticket.ingredients.forEach(ing => {
                    ing.subTotal = ing.quantity * ing.price
                    total += ing.subTotal
                    this.ticket.total = total
                })
                return this.ticket.total
            }
        },
        methods: {
            switch(word) {
                switch (word) {
                    case "p":
                    case "pimiento":
                    case "pimientos":
                        this.handleArray(this.bellpepper)
                        this.createImg(null, null, this.bellpepper)
                        break
                    case "f":
                    case "queso":
                        this.handleArray(this.cheese)
                        this.createImg(null, null, this.cheese)
                        break
                    case "c":
                    case "cebolla":
                        this.handleArray(this.onion)
                        this.createImg(null, null, this.onion)
                        break
                    case "b":
                    case "maíz":
                    case "maiz":
                        this.handleArray(this.corn)
                        this.createImg(null, null, this.corn)
                        break
                    case "x":
                    case "champiñones":
                    case "setas":
                        this.handleArray(this.mushroom)
                        this.createImg(null, null, this.mushroom)
                        break
                    case "o":
                    case "aceitunas":
                    case "oliva":
                        this.handleArray(this.olive)
                        this.createImg(null, null, this.olive)
                        break
                    case "r":
                    case "pepperoni":
                        this.handleArray(this.pepperoni)
                        this.createImg(null, null, this.pepperoni)
                        break
                    case "t":
                    case "tomate":
                        this.handleArray(this.tomato)
                        this.createImg(null, null, this.tomato)
                        break
                    default:
                        break
                }
            },
            async sendAudio(blob) {
                let formData = new FormData()
                formData.append('arxiu', blob)
                let postAudio = await fetch("http://35.194.72.13/pizzamaker/backend.php", {
                    method: 'POST',
                    body: formData,
                })
                return await postAudio.json()
            },
            deleteOne(ing) {
                let images = Array.prototype.slice.call(document.querySelectorAll('#pizza-base img'))
                let imgRmv = images.filter(img => img.id === ing.ids[ing.ids.length - 1])
                document.querySelector('#pizza-base').removeChild(imgRmv[0])
                if (ing.quantity > 1) {
                    ing.ids.pop()
                    ing.quantity--
                    let x = this.ticket.ingredients.indexOf(ing)
                    if (x !== -1) {
                        this.ticket.ingredients[x] = ing
                    }
                } else {
                    let pos = this.ticket.ingredients.indexOf(ing)
                    this.ticket.ingredients.splice(pos, 1)
                }
            },
            deleteIng(ing) {
                let images = Array.prototype.slice.call(document.querySelectorAll('#pizza-base img'))
                images.forEach(img => {
                    if (img.id.indexOf(ing.name) !== -1) {
                        document.querySelector('#pizza-base').removeChild(img)
                    }
                })
                let pos = this.ticket.ingredients.indexOf(ing)
                this.ticket.ingredients[pos].quantity = 1
                this.ticket.ingredients.splice(pos, 1)
            },
            deleteAll() {
                this.ticket.ingredients = []
                let images = Array.prototype.slice.call(document.querySelectorAll('#pizza-base img'))
                images.forEach(img => document.getElementById('pizza-base').removeChild(img))
            },
            say() {
                this.ticket.ingredients.forEach(ingredient => {
                    let speak = new SpeechSynthesisUtterance(ingredient.quantity + " de " + ingredient.name)
                    this.synth.speak(speak)
                })
            },
            shutUp() {
                this.synth.cancel()
            },
            handleArray(obj) {
                if (this.ticket.ingredients.indexOf(obj) === -1) {
                    this.ticket.ingredients.push(obj)
                } else {
                    let ingredient = this.ticket.ingredients.filter(arrayItem =>
                        arrayItem.name === obj.name
                    )
                    ingredient[0].quantity++
                }
            },
            handleDrop(data) {
                let x = event.clientX
                let y = event.clientY
                this.handleArray(data)
                this.createImg(x, y, data)
            },
            createImg(x, y, data) {
                let id = Math.floor(Math.random() * (275 - 50 + 1) + 50).toString() +
                    Math.floor(Math.random() * (375 - 80 + 1) + 80).toString()
                data.ids.push(data.name + id)
                let img = document.createElement("img")
                img.setAttribute('src', data.img)
                img.setAttribute('name', data.name)
                img.setAttribute('class', 'ingredient')
                img.setAttribute('id', data.name + id)
                if (x !== null && y !== null) {
                    img.style.left = x - img.offsetWidth / 2 + 'px'
                    img.style.top = y - img.offsetHeight / 2 + 'px'
                } else {
                    img.setAttribute('style', 'top:' + Math.floor(Math.random() * (350 - 50 + 1) + 50) + 'px;' +
                        'left:' + Math.floor(Math.random() * (460 - 100 + 1) + 100) + 'px')
                }
                document.querySelector('#pizza-base').appendChild(img)
                img.addEventListener("dblclick", () => {
                    let ingredient = this.ticket.ingredients.filter(arrayItem => arrayItem.name === data.name)
                    if (ingredient[0].quantity > 1) {
                        ingredient[0].quantity--
                        img.remove()
                    } else {
                        img.remove()
                        let index = this.ticket.ingredients.indexOf(data)
                        if (index > -1) {
                            this.ticket.ingredients.splice(index, 1)
                        }
                    }
                })
            },
        },

        created() {

        },
        mounted: function () {
            navigator.mediaDevices.getUserMedia({audio: true})
                .then(stream => {
                    const mediaRecorder = new MediaRecorder(stream)
                    let audioChunks = []

                    document.getElementById('rec').addEventListener("click", () => {
                        mediaRecorder.start()
                    })
                    document.getElementById('stop').addEventListener("click", () => {
                        mediaRecorder.stop()
                    })
                    mediaRecorder.ondataavailable = (ev) => {
                        audioChunks.push(ev.data)
                    }
                    mediaRecorder.onstop = async () => {
                        let blob = new Blob(audioChunks)
                        audioChunks = []
                        let trasncriptedAudio = await this.sendAudio(blob)
                        if (trasncriptedAudio[0].confianca > 0.8) {
                            let arrayTranscripcio = trasncriptedAudio[0].transcripcio.split(' ')
                            arrayTranscripcio.forEach(word => {
                                this.switch(word)
                            })
                        }
                    }
                })
            document.addEventListener('keyup', (event) => {
                this.switch(event.key)
            })
        }
    }
</script>

<style scoped>

</style>
