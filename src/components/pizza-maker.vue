<template>
    <div>
        <div id="wrapper-ingredients">
            <div id="base">
                <img src="../img/base.svg" usemap="#image-map" alt="base">
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
        methods: {
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
                if (this.ingredientsReceipt.indexOf(data) === -1) {
                    this.ingredientsReceipt.push(data)
                } else {
                    let ingredient = this.ingredientsReceipt.filter(arrayItem =>
                        arrayItem.name === data.name
                    )
                    ingredient[0].quantity++
                }

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
                        ingredient[0].quantity--
                        let index = this.ingredientsReceipt.indexOf(data);
                        if (index > -1) {
                            this.ingredientsReceipt.splice(index, 1);
                        }
                    }
                })

            },
        },
        created() {

        }
    }
</script>

<style scoped>

</style>
