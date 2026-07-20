import * as THREE from 'three'

function gaussianWeight(dist, sigma) {
  return Math.exp(-(dist * dist) / (sigma * sigma))
}

export function createFullHeadMesh(mergedLandmarks) {
  const lms = mergedLandmarks.map((l) => ({
    x: (l.x - 0.5) * 2,
    y: -(l.y - 0.5) * 2,
    z: (l.z + 0.5) * 1.5,
  }))

  const sphereGeo = new THREE.SphereGeometry(1, 80, 80)
  sphereGeo.computeVertexNormals()
  const pos = sphereGeo.attributes.position.array
  const uvs = sphereGeo.attributes.uv.array
  const idx = sphereGeo.index.array
  const vertexCount = pos.length / 3

  const newPos = new Float32Array(pos)
  const sigma = 0.15
  const influenceThreshold = 0.8

  for (let i = 0; i < vertexCount; i++) {
    const vx = pos[i * 3]
    const vy = pos[i * 3 + 1]
    const vz = pos[i * 3 + 2]

    let sx = 0, sy = 0, sz = 0, totalWeight = 0

    for (const lm of lms) {
      const dx = vx - lm.x
      const dy = vy - lm.y
      const dz = vz - lm.z
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)
      if (dist > influenceThreshold) continue
      const w = gaussianWeight(dist, sigma)
      sx += (lm.x - vx) * w
      sy += (lm.y - vy) * w
      sz += (lm.z - vz) * w
      totalWeight += w
    }

    if (totalWeight > 0.001) {
      newPos[i * 3] += sx / totalWeight
      newPos[i * 3 + 1] += sy / totalWeight
      newPos[i * 3 + 2] += sz / totalWeight
    }
  }

  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.BufferAttribute(newPos, 3))
  geo.setAttribute('uv', new THREE.BufferAttribute(uvs, 2))
  geo.setIndex(idx)
  geo.computeVertexNormals()

  return geo
}
