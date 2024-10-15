import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Create renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight); //give the renderer a size
document.body.appendChild(renderer.domElement); //add the renderer to the body

// Create a scene
const scene = new THREE.Scene();

// Create a camera to view the scene
const camera = new THREE.PerspectiveCamera(
    80, //FOV
    window.innerWidth / window.innerHeight, //aspect ratio
    0.1, //near
    1000 //far
);

// Create orbit controls
const orbit = new OrbitControls(camera, renderer.domElement);

// HELPERSS **************TO BE REMOVED
//const axesHelper = new THREE.AxesHelper(5); //axes helper
//scene.add(axesHelper);

//const gridHelper = new THREE.GridHelper(30); //grid helper
//scene.add(gridHelper);

camera.position.set(0, 0, 40); //set camera position
orbit.update(); //update orbit controls

//LIGHTS*******************************************************************************
// Add ambient light to light up the whole scene
const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

const spotLight = new THREE.SpotLight(0xFFFFFF);
scene.add(spotLight);

spotLight.intensity = 1000;
spotLight.position.set(0, 50, -3); //spot light position
spotLight.angle = 0.6;

//onst sLightHelper = new THREE.SpotLightHelper(spotLight); //HELPER
//scene.add(sLightHelper);
//*************************************************************************************

// GLTF loader
const assetLoader = new GLTFLoader();
assetLoader.load('./assets/monitor.glb', function(gltf) { //import monitor asset
    });
    scene.add(model);
    model.position.set(0, 0, 0);
}, undefined, function(error) {
    console.error(error);
});

assetLoader.load('./assets/desk.glb', function(gltf) { //import desk asset
    const model = gltf.scene;
    scene.add(model);
    model.position.set(0, 0, 0);
}, undefined, function(error) {
    console.error(error);
});

// Animate scene
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

// Make scene resize on window resize
window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});