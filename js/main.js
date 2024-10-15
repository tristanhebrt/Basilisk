import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Create renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight); //give the renderer a size
document.body.appendChild(renderer.domElement); //add the renderer to the body
renderer.shadowMap.enabled = true; //allow shadows

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
spotLight.castShadow = true;
spotLight.angle = 0.6;

//onst sLightHelper = new THREE.SpotLightHelper(spotLight); //HELPER
//scene.add(sLightHelper);
//*************************************************************************************

// GLTF loader
let model;
const assetLoader = new GLTFLoader();
assetLoader.load('./assets/monitor.glb', function(gltf) { //import monitor asset
    const model = gltf.scene;
    model.position.set(0, 0, 0);
    model.traverse(function(node) {
        if (node.isMesh) node.castShadow = true; //cast shadows
    });

    scene.add(model);

}, undefined, function(error) {
    console.error(error);
});

assetLoader.load('./assets/desk.glb', function(gltf) { //import desk asset
    const model = gltf.scene;
    model.position.set(0, 0, 0);
    model.traverse(function(node) {
        if (node.isMesh) node.receiveShadow = true; //receive shadows
    });

    scene.add(model);
    
}, undefined, function(error) {
    console.error(error);
});

// Get mouse position
const mousePosition = new THREE.Vector2();
window.addEventListener('mousemove', function(e) {
    mousePosition.x = (e.clientX / window.innerWidth) * 2 - 1;
    mousePosition.y = - (e.clientY / window.innerHeight) * 2 + 1;
});

// Variables to store camera rotation
let yaw = 0; // Horizontal rotation
let pitch = 0; // Vertical rotation

// Sensitivity for camera rotation (adjust as needed)
const sensitivityX = 0.7;
const sensitivityY = 0.7;

// Rotation limits for pitch (up/down)
const maxPitch = 0.5; // 45 degrees up/down

// Animate scene
function animate() {
    requestAnimationFrame(animate);

    // Calculate yaw and pitch based on mouse movement
    yaw = -mousePosition.x * sensitivityX; // Invert for natural head motion
    pitch = mousePosition.y * sensitivityY;

    // Clamp pitch to avoid excessive up/down rotation
    pitch = Math.max(-maxPitch, Math.min(maxPitch, pitch));

    // Rotate the camera around the target point (0, 0, 0)
    camera.rotation.order = 'YXZ'; // Use YXZ order for yaw/pitch rotation
    camera.rotation.y = yaw; // Horizontal (yaw)
    camera.rotation.x = pitch; // Vertical (pitch)

    // Render scene with updated camera rotation
    renderer.render(scene, camera);
}
animate();

// Make scene resize on window resize
window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});