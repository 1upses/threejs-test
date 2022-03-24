const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
    antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

const texture = new THREE.TextureLoader().load('earth.jpg');
const geometry = new THREE.SphereGeometry(8,50,50)
const material = new THREE.MeshBasicMaterial({
    map: texture,
    wireframe: false
});
const sphere = new THREE.Mesh(geometry, material);

scene.add(sphere)

function animate(){
    requestAnimationFrame(animate);

    sphere.rotation.y -= 0.005;

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