<script setup lang="ts">
import { onMounted } from 'vue';
import O from '../assets/images/O.png'
import Ob from '../assets/images/Ob.png'
import R from '../assets/images/R.png'

const props = defineProps<{ input: string[] }>()
let oreoCanvas = $ref<HTMLCanvasElement | null>(null)

onMounted(() => {
  generate()
})

const generate = async () => {
  if (!oreoCanvas) {
    return
  }
  const imageList = await loadAllImages()
  await generateImage(oreoCanvas, props.input, imageList)
}

const loadImage = async (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error('Image load error'))
    image.src = src
  })
}

const loadAllImages = async () => {
  const o = await loadImage(O)
  const ob = await loadImage(Ob)
  const r = await loadImage(R)
  return { o, ob, r }
}

interface ImageList {
  o: HTMLImageElement
  ob: HTMLImageElement
  r: HTMLImageElement
}

interface DrawItem {
  image: HTMLImageElement
  x: number
  y: number
  width: number
  height: number
}

const generateImage = (canvas: HTMLCanvasElement, list: string[], imageList: ImageList) => {
  console.log(imageList)
  const drawList: DrawItem[] = []
  // Delete '-' at the end
  if (list[list.length - 1] === '-') {
    list.pop()
  }
  // calculate canvas height
  let height = 0
  list.forEach(item => {
    if (item === '-') {
      height += 72
    } else {
      const drawItem = {
        image: imageList[item],
        x: item === 'r' ? 10 : 0,
        y: height,
        width: item === 'r' ? 220 : 240,
        height: item === 'r' ? 155 : 160,
      }
      drawList.splice(0, 0, drawItem)
      height += 24
    }
  })
  height += 160 - 24

  const ctx = canvas.getContext('2d')
  if (ctx) {
    canvas.height = height;
    drawList.forEach(item => {
      ctx.drawImage(item.image, item.x, item.y, item.width, item.height)
    })
  }
}

defineExpose({
  generate,
})

</script>

<template>
  <canvas width="240" height="600" ref="oreoCanvas"></canvas>
</template>