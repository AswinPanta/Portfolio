import { detectLandmarks } from './faceLandmarker'
import { createFullHeadMesh } from './createHeadMesh'

const PHOTO_PATHS = [
  '/assets/1.jpeg',
  '/assets/2.jpeg',
  '/assets/3.jpeg',
  '/assets/4.jpeg',
  '/assets/5.jpeg',
  '/assets/6.jpeg',
]

function mergeLandmarks(results) {
  const valid = results.filter(Boolean)
  if (valid.length === 0) return null

  const count = valid[0].landmarks.length
  const merged = []

  for (let i = 0; i < count; i++) {
    let sx = 0, sy = 0, sz = 0, weight = 0
    for (const r of valid) {
      if (r.landmarks[i]) {
        const w = 1
        sx += r.landmarks[i].x * w
        sy += r.landmarks[i].y * w
        sz += r.landmarks[i].z * w
        weight += w
      }
    }
    if (weight > 0) {
      merged.push({
        x: sx / weight,
        y: sy / weight,
        z: sz / weight,
      })
    }
  }
  return merged
}

export async function createFaceMeshData() {
  const results = await Promise.all(
    PHOTO_PATHS.map((path) => detectLandmarks(path))
  )

  const merged = mergeLandmarks(results)
  if (!merged || merged.length < 100) {
    throw new Error(`Failed to detect face landmarks (got ${merged?.length || 0} points)`)
  }

  const geometry = createFullHeadMesh(merged)

  return {
    geometry,
    positions: geometry.attributes.position.array,
  }
}
