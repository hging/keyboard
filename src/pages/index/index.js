import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'dat.gui';
import initModels from './models';
import './style.scss';

const gui = new dat.GUI();

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 10, 0xff0000);
directionalLightHelper.visible = false;
scene.add(directionalLightHelper);

const loadingManager = new THREE.LoadingManager();
const loader = new THREE.STLLoader(loadingManager);

initModels(scene, loader, loadingManager, gui);

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// const helper = new THREE.AxesHelper(20);
// scene.add(helper);

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 30;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Animate
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

});

// 光照调整
gui.add(directionalLight.position, 'x').min(-1).max(1).step(0.01).name('光照x').onChange(() => {
  directionalLight.updateMatrixWorld();
  directionalLightHelper.position.setFromMatrixPosition(directionalLight.matrixWorld);
  directionalLightHelper.updateMatrix();
  directionalLightHelper.update();
});
gui.add(directionalLight.position, 'y').min(-1).max(1).step(0.01).name('光照y').onChange(() => {
  directionalLight.updateMatrixWorld();
  directionalLightHelper.position.setFromMatrixPosition(directionalLight.matrixWorld);
  directionalLightHelper.updateMatrix();
  directionalLightHelper.update();
});
gui.add(directionalLight.position, 'z').min(-1).max(1).step(0.01).name('光照z').onChange(() => {
  directionalLight.updateMatrixWorld();
  directionalLightHelper.position.setFromMatrixPosition(directionalLight.matrixWorld);
  directionalLightHelper.updateMatrix();
  directionalLightHelper.update();
});
