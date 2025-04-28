const tableEle = document.querySelector('#my-table1')

const tbody = tableEle.querySelector('tbody')

const trs = tbody.childNodes

let answer = []

for (let i = 0; i < trs.length;) {
    const tds = trs[i].children
    const index = tds[0].innerText.match(/(?<index>\d+)/).groups.index
    answer.push({
        index: index,
        pre: tds[0].innerText.match(/(?<pre>[\u3040-\u309F\u30A0-\u30FFA-Z]+)/).groups.pre,
        info: [{
            code: tds[0].innerText,
            name: tds[1].innerText,
            penName: tds[3].innerText,
            twitter: tds[5].querySelector('a')?.href,
            pixiv: tds[6].querySelector('a')?.href,
            site: tds[7].querySelector('a')?.href,
        }]
    })
    if(trs[i+1]&&trs[i + 1].children[0].innerText.match(/(?<index>\d+)/).groups.index === index) {
        answer[answer.length - 1].info.push({
            code: trs[i + 1].children[0].innerText,
            name: trs[i + 1].children[1].innerText,
            penName: trs[i + 1].children[3].innerText,
            twitter: trs[i + 1].children[5].querySelector('a')?.href,
            pixiv: trs[i + 1].children[6].querySelector('a')?.href,
            site: trs[i + 1].children[7].querySelector('a')?.href,
        }) 

        i += 2
    } else {
        i++
    }
}

console.log(answer)