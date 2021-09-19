import { Viewer } from './script/viewer'
import { vertexShader,fragmentShader } from './script/shader'
import * as THREE from 'three'


const el = document.getElementById("app")
const viewer = new Viewer(el)

const uniforms = {
	iTime: { value: 1.0 },
	iResolution: {
		value: new THREE.Vector2(window.innerWidth, window.innerHeight),
	},
	iMouse: { value: new THREE.Vector2(0.0, 0.0) },
}
var material = new THREE.ShaderMaterial({
	uniforms: uniforms,
	vertexShader: vertexShader,
	fragmentShader: fragmentShader
})


const geom = new THREE.PlaneBufferGeometry(window.innerWidth, window.innerHeight)
const mesh = new THREE.Mesh(geom, material)
viewer.scene.add(mesh)

viewer.update.push(delta => {
	uniforms.iTime.value += delta
})







