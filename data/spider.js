const cardList = document.querySelectorAll('.q-card.default.notupdated.card')

const list = []

cardList.forEach(card => {
    const imgUrl = card.querySelector('.card-img').src
    const code = card.querySelector('.icon-label').innerHTML
    list.push({
        imgUrl,
        code
    })
})

console.log(list)