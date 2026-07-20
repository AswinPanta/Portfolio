import { useRef, useMemo, Suspense, Component } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useTexture, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

function seededRandom(seed) {
  let s = seed | 0
  return () => {
    s = (s * 1664525 + 1013904223) | 0
    return (s >>> 0) / 4294967296
  }
}

class ErrorBoundary extends Component {
  constructor() {
    super()
    this.state = { error: null }
  }
  static getDerivedStateFromError(error) {
    return { error }
  }
  render() {
    return this.state.error
      ? <mesh><sphereGeometry args={[0.6, 16, 16]} /><meshBasicMaterial color="#34d399" transparent opacity={0.15} wireframe /></mesh>
      : this.props.children
  }
}

const geometries = [
  new THREE.OctahedronGeometry(1, 0),
  new THREE.IcosahedronGeometry(1, 0),
  new THREE.TetrahedronGeometry(1, 0),
  new THREE.BoxGeometry(1, 1, 1),
]

function AvatarHead() {
  const groupRef = useRef()
  const texture = useTexture('/assets/1.jpeg')

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime
    groupRef.current.position.y = Math.sin(t * 0.8) * 0.06
    groupRef.current.rotation.z = Math.sin(t * 0.3) * 0.02
    const breathe = 1 + Math.sin(t * 1.2) * 0.006
    groupRef.current.scale.setScalar(breathe)
  })

  return (
    <group ref={groupRef}>
      <mesh scale={[0.9, 1.2, 0.9]}>
        <sphereGeometry args={[0.75, 64, 64]} />
        <meshPhysicalMaterial
          map={texture}
          roughness={0.35}
          metalness={0.05}
          clearcoat={0.08}
        />
      </mesh>
    </group>
  )
}

function ParticleField() {
  const count = 150
  const [positions, colors, sizes] = useMemo(() => {
    const rng = seededRandom(42)
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const siz = new Float32Array(count)
    const color = new THREE.Color()
    for (let i = 0; i < count; i++) {
      const radius = 1.5 + rng() * 1.5
      const theta = rng() * Math.PI * 2
      const phi = Math.acos(2 * rng() - 1)
      pos[i * 3] = Math.sin(phi) * Math.cos(theta) * radius
      pos[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * radius
      pos[i * 3 + 2] = Math.cos(phi) * radius
      color.setHSL(0.42 + rng() * 0.12, 0.7, 0.45 + rng() * 0.2)
      col[i * 3] = color.r
      col[i * 3 + 1] = color.g
      col[i * 3 + 2] = color.b
      siz[i] = 0.015 + rng() * 0.035
    }
    return [pos, col, siz]
  }, [])

  const pointsRef = useRef()

  useFrame((state) => {
    if (!pointsRef.current) return
    const t = state.clock.elapsedTime
    pointsRef.current.rotation.y = t * 0.04
    pointsRef.current.rotation.x = Math.sin(t * 0.02) * 0.06
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
        size={0.03}
        vertexColors
        transparent
        opacity={0.5}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

function OrbitingRing() {
  const groupRef = useRef()
  const shapes = useMemo(() => {
    const rng = seededRandom(99)
    const items = []
    const count = 12
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2
      items.push({
        position: [
          Math.cos(angle) * 1.3,
          Math.sin(angle * 2) * 0.25,
          Math.sin(angle) * 1.0,
        ],
        scale: 0.05 + rng() * 0.05,
        color: ['#34d399', '#14b8a6', '#fcd34d', '#f87171'][i % 4],
        type: i % 4,
      })
    }
    return items
  }, [])

  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.15
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.07) * 0.08
  })

  return (
    <group ref={groupRef}>
      {shapes.map((shape, i) => (
        <mesh key={i} position={shape.position} scale={shape.scale}>
          <primitive object={geometries[shape.type]} />
          <meshPhysicalMaterial
            color={shape.color}
            emissive={shape.color}
            emissiveIntensity={0.15}
            roughness={0.2}
            metalness={0.4}
          />
        </mesh>
      ))}
    </group>
  )
}

function GlowRing() {
  const ref = useRef()
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.2
    ref.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.1) * 0.1
  })

  return (
    <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[1.1, 0.008, 16, 80]} />
      <meshBasicMaterial color="#34d399" transparent opacity={0.2} />
    </mesh>
  )
}

function WireframeSphere() {
  const ref = useRef()
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.x = state.clock.elapsedTime * 0.03
    ref.current.rotation.y = state.clock.elapsedTime * 0.05
  })

  return (
    <mesh ref={ref} scale={1.6}>
      <sphereGeometry args={[1, 24, 24]} />
      <meshBasicMaterial color="#34d399" transparent opacity={0.04} wireframe />
    </mesh>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.45} />
      <directionalLight position={[3, 2, 2]} intensity={0.5} color="#34d399" />
      <directionalLight position={[-2, 1, -2]} intensity={0.25} color="#14b8a6" />
      <pointLight position={[0, -1, 2]} intensity={0.15} color="#34d399" />

      <Suspense fallback={null}>
        <ErrorBoundary>
          <WireframeSphere />
          <AvatarHead />
          <ParticleField />
          <OrbitingRing />
          <GlowRing />
          <ContactShadows
            position={[0, -1.1, 0]}
            opacity={0.25}
            scale={2.5}
            blur={2.5}
            far={1.5}
          />
        </ErrorBoundary>
      </Suspense>

      <OrbitControls
        enablePan={false}
        enableZoom
        minDistance={1.4}
        maxDistance={4.5}
        autoRotate
        autoRotateSpeed={0.8}
        enableDamping
        dampingFactor={0.05}
        rotateSpeed={0.4}
      />
    </>
  )
}

export default function ThreeDAvatar() {
  return (
    <div className="relative w-56 h-56 sm:w-64 sm:h-64">
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-400/20 to-teal-500/20 blur-2xl" />
      <Canvas
        camera={{ position: [0, 0, 2.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        className="w-full h-full"
      >
        <Scene />
      </Canvas>
    </div>
  )
}
