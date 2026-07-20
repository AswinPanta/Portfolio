import { FaceLandmarker, FilesetResolver } from '@mediapipe/tasks-vision'

let faceLandmarker = null

export async function getFaceLandmarker() {
  if (faceLandmarker) return faceLandmarker

  const wasmBase = 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.35/wasm'
  const vision = await FilesetResolver.forVisionTasks(wasmBase)

  faceLandmarker = await FaceLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath: '/models/face_landmarker.task',
      delegate: 'GPU',
    },
    outputFaceBlendshapes: true,
    runningMode: 'IMAGE',
    numFaces: 1,
  })

  return faceLandmarker
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

export async function detectLandmarks(imageSrc) {
  const landmarker = await getFaceLandmarker()
  const img = await loadImage(imageSrc)
  const result = landmarker.detect(img)
  if (!result.faceLandmarks || result.faceLandmarks.length === 0) return null
  return {
    landmarks: result.faceLandmarks[0],
    blendshapes: result.faceBlendshapes?.[0] || [],
  }
}
