export const IMAGE_MESSAGES = {
  invalidType: 'Formato inválido. Escolha uma imagem .jpg ou .png.',
  readError: 'Não foi possível ler a imagem. Tente novamente com outro arquivo.',
} as const

const MAX_SIZE = 1600
const QUALITY = 0.85

export function isAcceptedImage(file: File): boolean {
  return file.type === 'image/jpeg' || file.type === 'image/png'
}

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const image = new Image()

    image.onload = () => {
      URL.revokeObjectURL(url)
      resolve(image)
    }
    image.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error(IMAGE_MESSAGES.readError))
    }

    image.src = url
  })
}

export async function fileToDataUrl(file: File): Promise<string> {
  const image = await loadImage(file)
  const scale = Math.min(1, MAX_SIZE / Math.max(image.width, image.height))

  const canvas = document.createElement('canvas')
  canvas.width = Math.round(image.width * scale)
  canvas.height = Math.round(image.height * scale)

  const context = canvas.getContext('2d')
  if (!context) throw new Error(IMAGE_MESSAGES.readError)

  context.fillStyle = '#ffffff'
  context.fillRect(0, 0, canvas.width, canvas.height)
  context.drawImage(image, 0, 0, canvas.width, canvas.height)

  return canvas.toDataURL('image/jpeg', QUALITY)
}
