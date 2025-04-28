import data from './data.js'

// 导入图片
const images = import.meta.glob('/convention/*.webp', { eager: true });

// 更新图片路径为 glob URL
data.forEach(booth => {
    if (booth.info) {
        booth.info.forEach(info => {
            if (info.cover) {
                const imagePath = info.cover;
                const image = images[imagePath];
                if (image) {
                    info.cover = URL.createObjectURL(image.default);
                }
            }
        });
    }
});

const dataTemp = data.map(item => {
    item.index = Number(item.index)
    return item
})

const listCollection = {}

dataTemp.forEach(item => {
    const pre = item.pre
    if (listCollection[pre]) {
        listCollection[pre].push(item)
    } else {
        listCollection[pre] = [item]
    }
})

const centerList = []

const letterList = []

Object.keys(listCollection).forEach(key => {
    if (key.length === 1 && /[\u3040-\u309F\u30A0-\u30FF]/.test(key) && key !== 'あ') {
        centerList.push(listCollection[key])
    }

    if (/[A-Z]/.test(key)) {
        letterList.push(listCollection[key])
    }

})

export default listCollection

export {
    centerList,
    letterList
}