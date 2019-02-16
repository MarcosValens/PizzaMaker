var fs = require('fs')
var casper = require('casper').create()
casper.on('remote.message', function (msg) {
    this.echo(msg)
})

function getPizzas() {

    function Pizzas(names, imgs, ing) {
        this.names = names
        this.imgs = imgs
        this.ing = ing
    }
    var pizzaArray = []
    var names = Array.prototype.slice.call(document.querySelectorAll('div.col-lg-3.col-md-4.col-sm-6.col-xs-6 > a > div > div > div > h3'))
    var imgs = Array.prototype.slice.call(document.querySelectorAll('div.col-lg-3.col-md-4.col-sm-6.col-xs-6 > a > div > img'), function (x) {
        return x
    })
    var ing = Array.prototype.slice.call(document.querySelectorAll('div.col-lg-3.col-md-4.col-sm-6.col-xs-6 > a > div >  div > div > p'), function (x) {
        return x
    })
    for (var i = 0; i < names.length-1; i++) {
        var pizza = new Pizzas(names[i].innerHTML,imgs[i].src,ing[i].innerHTML)
        pizzaArray.push(pizza)
    }

    return pizzaArray
}

casper.start()
casper.open('https://www.pizzahut.es/pizza')
casper.then(function () {
    var p = this.evaluate(getPizzas)
    var x = fs.open('./src/scraps/scrap.json', 'w')
    x.write(JSON.stringify(p))
    x.close()
})

casper.run(function () {
    this.exit()
})
