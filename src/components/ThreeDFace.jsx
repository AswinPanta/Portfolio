import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useTexture, Environment, Float } from '@react-three/drei'
import * as THREE from 'three'

function seededRandom(seed) {
  let s = seed | 0
  return () => {
    s = (s * 1664525 + 1013904223) | 0
    return (s >>> 0) / 4294967296
  }
}

function FaceMesh({ geometry }) {
  const meshRef = useRef()
  const texture = useTexture('/assets/6.jpeg')

  useFrame((state) => {
    if (!meshRef.current) return
    const breathe = 1 + Math.sin(state.clock.elapsedTime * 1.2) * 0.003
    meshRef.current.scale.setScalar(breathe)
  })

  const matRef = useRef()
  useFrame((state) => {
    if (!matRef.current) return
    matRef.current.roughness = 0.25 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05
  })

  return (
    <Float speed={0.8} rotationIntensity={0.02} floatIntensity={0.1}>
      <mesh ref={meshRef} geometry={geometry}>
        <meshPhysicalMaterial
          ref={matRef}
          map={texture}
          roughness={0.2}
          metalness={0.0}
          clearcoat={0.08}
          clearcoatRoughness={0.3}
          reflectivity={0.25}
          ior={1.4}
          envMapIntensity={1.0}
          side={THREE.DoubleSide}
          sheen={0.3}
          sheenColor={new THREE.Color(0.9, 0.4, 0.2)}
          sheenRoughness={0.5}
        />
      </mesh>
    </Float>
  )
}

function ParticleField() {
  const count = 200
  const [positions, colors, sizes] = useMemo(() => {
    const rng = seededRandom(42)
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const siz = new Float32Array(count)
    const color = new THREE.Color()
    for (let i = 0; i < count; i++) {
      const radius = 1.5 + rng() * 1.8
      const theta = rng() * Math.PI * 2
      const phi = Math.acos(2 * rng() - 1)
      pos[i * 3] = Math.sin(phi) * Math.cos(theta) * radius
      pos[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * radius
      pos[i * 3 + 2] = Math.cos(phi) * radius
      color.setHSL(0.38 + rng() * 0.15, 0.6, 0.4 + rng() * 0.25)
      col[i * 3] = color.r
      col[i * 3 + 1] = color.g
      col[i * 3 + 2] = color.b
      siz[i] = 0.012 + rng() * 0.03
    }
    return [pos, col, siz]
  }, [])

  const pointsRef = useRef()

  useFrame((state) => {
    if (!pointsRef.current) return
    const t = state.clock.elapsedTime
    pointsRef.current.rotation.y = t * 0.03
    pointsRef.current.rotation.x = Math.sin(t * 0.015) * 0.04
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        vertexColors
        transparent
        opacity={0.4}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

const geometries = [
  new THREE.OctahedronGeometry(1, 0),
  new THREE.IcosahedronGeometry(1, 0),
  new THREE.TetrahedronGeometry(1, 0),
  new THREE.BoxGeometry(1, 1, 1),
]

function OrbitingRing() {
  const groupRef = useRef()
  const shapes = useMemo(() => {
    const rng = seededRandom(99)
    const items = []
    const count = 16
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2
      items.push({
        position: [
          Math.cos(angle) * 1.4,
          Math.sin(angle * 2.5) * 0.3,
          Math.sin(angle) * 1.1,
        ],
        scale: 0.04 + rng() * 0.04,
        color: ['#34d399', '#14b8a6', '#fcd34d', '#f87171', '#a78bfa', '#f472b6'][i % 6],
        type: i % 4,
      })
    }
    return items
  }, [])

  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.12
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.06) * 0.06
  })

  return (
    <group ref={groupRef}>
      {shapes.map((shape, i) => (
        <Float key={i} speed={1.5} rotationIntensity={0.3} floatIntensity={0.15}>
          <mesh position={shape.position} scale={shape.scale}>
            <primitive object={geometries[shape.type]} />
            <meshPhysicalMaterial
              color={shape.color}
              emissive={shape.color}
              emissiveIntensity={0.2}
              roughness={0.1}
              metalness={0.6}
              envMapIntensity={0.5}
            />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

function GlowRing() {
  const ref = useRef()
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.12) * 0.15
    ref.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.08) * 0.08
  })

  return (
    <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[1.15, 0.006, 16, 100]} />
      <meshBasicMaterial color="#34d399" transparent opacity={0.15} />
    </mesh>
  )
}

function WireframeSphere() {
  const ref = useRef()
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.x = state.clock.elapsedTime * 0.02
    ref.current.rotation.y = state.clock.elapsedTime * 0.04
  })

  return (
    <mesh ref={ref} scale={1.8}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshBasicMaterial color="#34d399" transparent opacity={0.03} wireframe />
    </mesh>
  )
}

function Scene({ faceData }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 3, 3]} intensity={0.7} color="#ffffff" />
      <directionalLight position={[-3, 1, -2]} intensity={0.3} color="#34d399" />
      <pointLight position={[0, -1, 3]} intensity={0.2} color="#14b8a6" />
      <pointLight position={[2, 2, -2]} intensity={0.15} color="#fcd34d" />

      <Environment preset="city" environmentIntensity={0.8} />

      <WireframeSphere />
      <FaceMesh geometry={faceData.geometry} />
      <ParticleField />
      <OrbitingRing />
      <GlowRing />
      <OrbitControls
        enablePan={false}
        enableZoom
        minDistance={1.3}
        maxDistance={5}
        autoRotate
        autoRotateSpeed={0.6}
        enableDamping
        dampingFactor={0.05}
        rotateSpeed={0.4}
      />
    </>
  )
}

function LoadingFallback() {
  return (
    <mesh>
      <sphereGeometry args={[0.6, 16, 16]} />
      <meshBasicMaterial color="#34d399" transparent opacity={0.15} wireframe />
    </mesh>
  )
}

export default function ThreeDFace({ faceData }) {
  if (!faceData) {
    return (
      <div className="relative w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center">
        <div className="w-12 h-12 border-3 border-emerald-400/30 border-t-emerald-400 rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="relative w-64 h-64 sm:w-72 sm:h-72">
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-400/20 via-teal-400/10 to-teal-500/20 blur-3xl" />
      <Canvas
        camera={{ position: [0, 0, 2.5], fov: 45 }}
        gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
        className="w-full h-full"
      >
        <Suspense fallback={<LoadingFallback />}>
          <Scene faceData={faceData} />
        </Suspense>
      </Canvas>
    </div>
  )
}
