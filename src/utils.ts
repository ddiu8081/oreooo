const getRandomInteger = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const formattedOreoStr = (keyList: OreoKey[], translation: (key: string, count?: number) => string) => {
  if (!keyList.length) {
    return translation('input.placeholder')
  }
  const keyDict = {
    o: 'basic.o',
    r: 'basic.r',
    '-': 'basic.and',
  }
  return keyList.map((item, index) => translation(keyDict[item], index + 1)).join('')
}

export const generateRandomOreoKey = () => {
  let randomInputList: OreoKey[] = []
  const typeCount = getRandomInteger(3, 5)
  for (let i = 0; i < typeCount; i++) {
    const random = Math.random() * 5
    let str: OreoKey = i === 0 ? 'o' : '-'
    if (random < 2) {
      str = 'o'
    } else if (random < 4) {
      str = 'r'
    }
    const cliceCount = getRandomInteger(1, 4)
    randomInputList = randomInputList.concat(Array(cliceCount).fill(str))
  }
  return randomInputList
}