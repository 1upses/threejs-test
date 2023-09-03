import { Scene, PerspectiveCamera, WebGLRenderer, LinearSRGBColorSpace, Clock, TextureLoader, SphereGeometry, MeshBasicMaterial, Mesh, BackSide, BoxGeometry } from 'https://unpkg.com/three@latest/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@latest/examples/jsm/controls/OrbitControls.js';

const scene = new Scene();

const camera = new PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.1,
    2000
);

const renderer = new WebGLRenderer({
    canvas: document.querySelector('#bg'),
    antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = LinearSRGBColorSpace;
camera.position.setZ(30);

let controls = new OrbitControls(camera, renderer.domElement);


controls.listenToKeyEvents( window );

controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.minDistance = 20;
controls.maxDistance = 100;

let clock = new Clock(true);

const earthTexture = new TextureLoader().load('./earth.jpg');
const earthGeometry = new SphereGeometry(8,50,50)
const earthMaterial = new MeshBasicMaterial({
    map: earthTexture,
    wireframe: false
});

const earth = new Mesh(earthGeometry, earthMaterial);

scene.add(earth)


const moonTexture = new TextureLoader().load('./moon.jpg');
const moonGeometry = new SphereGeometry(1,50,50)
const moonMaterial = new MeshBasicMaterial({
    map: moonTexture,
    wireframe: false
});

const moon = new Mesh(moonGeometry, moonMaterial);

moon.position.x = 20;
moon.position.y = 5;
moon.rotateY(2.0 * Math.PI / 2);

scene.add(moon)


let materialArray = [];
let texture_front = new TextureLoader().load( './skybox/front.jpg');
let texture_back = new TextureLoader().load( './skybox/back.jpg');
let texture_up = new TextureLoader().load( './skybox/top.jpg');
let texture_down = new TextureLoader().load( './skybox/bottom.jpg');
let texture_right = new TextureLoader().load( './skybox/right.jpg');
let texture_left = new TextureLoader().load( './skybox/left.jpg');

const skyboxWireframe = false;

materialArray.push(new MeshBasicMaterial( { map: texture_right, wireframe: skyboxWireframe }));
materialArray.push(new MeshBasicMaterial( { map: texture_left, wireframe: skyboxWireframe }));
materialArray.push(new MeshBasicMaterial( { map: texture_up, wireframe: skyboxWireframe }));
materialArray.push(new MeshBasicMaterial( { map: texture_down, wireframe: skyboxWireframe }));
materialArray.push(new MeshBasicMaterial( { map: texture_front, wireframe: skyboxWireframe }));
materialArray.push(new MeshBasicMaterial( { map: texture_back, wireframe: skyboxWireframe }));

materialArray.forEach(material => material.side = BackSide);

const skyboxGeometry = new BoxGeometry(2000, 2000, 2000);
const skybox = new Mesh(skyboxGeometry, materialArray);

scene.add(skybox);

function animate(){
    requestAnimationFrame(animate);

    const deltaTime = clock.getDelta();

    skybox.position.x = camera.position.x;
    skybox.position.y = camera.position.y;
    skybox.position.z = camera.position.z;

    controls.update();
    earth.rotation.y -= 0.1 * deltaTime;

    moon.rotation.y -= 0.05 * deltaTime;
    moon.position.x = 20 * Math.cos(moon.rotation.y);
    moon.position.z = 20 * Math.sin(moon.rotation.y);


    renderer.render(scene, camera);
}

window.addEventListener('resize', onWindowResize, false);

function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize( window.innerWidth, window.innerHeight );
}

animate()
