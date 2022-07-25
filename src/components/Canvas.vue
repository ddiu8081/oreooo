<script setup lang="ts">
import { onMounted } from 'vue';
import image_of from '../assets/images/of.png'
import image_o from '../assets/images/o.png'
import image_r from '../assets/images/r.png'

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
  const of = await loadImage(image_of)
  const o = await loadImage(image_o)
  const r = await loadImage(image_r)
  return { of, o, r }
}

interface ImageList {
  of: HTMLImageElement
  o: HTMLImageElement
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
  const copyList = [...list]
  const drawList: DrawItem[] = []
  // Delete '-' at the end
  if (copyList[copyList.length - 1] === '-') {
    copyList.pop()
  }
  if (copyList[0] === 'o') {
    copyList[0] = 'of'
  }
  // calculate canvas height
  let height = 0
  copyList.forEach(item => {
    if (item === '-') {
      height += 72
    } else {
      const drawItem = {
        // @ts-ignore
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
  <canvas width="240" height="0" ref="oreoCanvas"></canvas>
</template>