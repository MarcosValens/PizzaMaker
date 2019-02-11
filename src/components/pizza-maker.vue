<template>
    <div>
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
            <ul>
                <li v-for="ingRec in ingredientsReceipt">{{ingRec.name + " X " + ingRec.quantity}}</li>
            </ul>
        </div>
        <button @click="say()">Play</button>
        <button @click="deleteAll()">Eliminar todos los ingredientes</button>
        <button @click="deleteOne()">Eliminar el ultimo ingrediente añadido</button>
        <button id="rec">Grabar</button>
        <button id="stop">Stop</button>
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
    import spoken from '../../node_modules/spoken/build/spoken.js'
    import {Drag, Drop} from 'vue-drag-drop'

    export default {
        components: {Drag, Drop},
        data() {
            return {
                ingredientsReceipt: [],
                bellpepper: new Bellpepper(2),
                cheese: new Cheese(3),
                corn: new Corn(1),
                mushroom: new Mushroom(2),
                olive: new Olive(3),
                onion: new Onion(4),
                pepperoni: new Pepperoni(5),
                tomato: new Tomato(6),
                ticket: new Ticket()
            }
        },
        computed: {
            list: function () {
                return this.ingRec.name + " X " + this.ingRec.quantity
            }
        },
        methods: {
            switch(word) {
                switch (word) {
                    case "p":
                    case "pimiento":
                    case "pimientos":
                        this.handleArray(this.bellpepper)
                        break
                    case "f":
                    case "queso":
                        this.handleArray(this.cheese)
                        break
                    case "c":
                    case "cebolla":
                        this.handleArray(this.onion)
                        break
                    case "b":
                    case "maíz":
                    case "maiz":
                        this.handleArray(this.corn)
                        break
                    case "x":
                    case "champiñones":
                    case "setas":
                        this.handleArray(this.mushroom)
                        break
                    case "o":
                    case "aceitunas":
                    case "oliva":
                        this.handleArray(this.olive)
                        break
                    case "r":
                    case "pepperoni":
                        this.handleArray(this.pepperoni)
                        break
                    case "t":
                    case "tomate":
                        this.handleArray(this.tomato)
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
            deleteOne() {
                let images = Array.prototype.slice.call(document.querySelectorAll('#pizza-base img'))
                if (this.ingredientsReceipt[this.ingredientsReceipt.length - 1].quantity > 1) {
                    this.ingredientsReceipt[this.ingredientsReceipt.length - 1].quantity--
                } else this.ingredientsReceipt.pop()
                let img = images.pop()
                document.querySelector('#pizza-base').removeChild(img)

            },
            deleteAll() {
                this.ingredientsReceipt = []
                let images = Array.prototype.slice.call(document.querySelectorAll('#pizza-base img'))
                images.forEach(img => document.getElementById('pizza-base').removeChild(img))
            },
            say() {
                this.ingredientsReceipt.forEach(ingredient => spoken.say(ingredient.quantity
                    + ' de ' + ingredient.name)/*.then(speech => {
                    spoken.listen().then(transcript =>
                        console.log("Answer: " + transcript))
                })*/)

            },
            handleArray(obj) {
                if (this.ingredientsReceipt.indexOf(obj) === -1) {
                    this.ingredientsReceipt.push(obj)
                } else {
                    let ingredient = this.ingredientsReceipt.filter(arrayItem =>
                        arrayItem.name === obj.name
                    )
                    ingredient[0].quantity++
                }
            },
            handleDrop(data) {
                let x = event.clientX
                let y = event.clientY
                let img = document.createElement("img")
                img.setAttribute('src', data.img)
                img.setAttribute('name', data.name)
                img.style.position = 'absolute'
                img.style.width = '3.5%'
                img.style.height = '7%'
                img.style.left = x - img.offsetWidth / 2 - 50 + 'px'
                img.style.top = y - img.offsetHeight / 2 - 25 + 'px'
                img.style.zIndex = '1'
                document.querySelector('#pizza-base').appendChild(img)
                this.handleArray(data)

                //NO PINTA LAS LISTAS

                /*
                this.ingredientsReceipt[data.name] = (this.ingredientsReceipt[data.name] || 0) + 1
                if (this.ingredientsReceipt[data.name] !== data) {
                    this.ingredientsReceipt[data.name] = data
                } else {
                    this.ingredientsReceipt[data.name].quantity++

                }
                */

                img.addEventListener("click", () => {
                    let ingredient = this.ingredientsReceipt.filter(arrayItem => arrayItem.name === data.name)
                    if (ingredient[0].quantity > 1) {
                        ingredient[0].quantity--
                        img.remove()

                    } else {
                        img.remove()
                        let index = this.ingredientsReceipt.indexOf(data)
                        if (index > -1) {
                            this.ingredientsReceipt.splice(index, 1)
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
            document.addEventListener('keydown', (event) => {
                this.switch(event.key)
            })
        }
    }
</script>

<style scoped>

</style>
