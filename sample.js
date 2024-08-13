/*import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import {loadTexture,onTextureLoaded,onTextureLoadError,G}  from './textureUtils';
import { planetData,M,SCALE_FACTOR } from './planetConfig';
import { color, cos } from 'three/examples/jsm/nodes/Nodes.js';


//can you check if my code for simulation is correct.Also check data?

let camera, renderer, controls,scene;
let raycaster, mouse;
let followedPlanet = null;








init();
function init(){
	const canvas = document.getElementById('canvas');
	// Set up renderer using existing canvas or create a new one
	renderer = new THREE.WebGLRenderer({ canvas });
	renderer.setSize(window.innerWidth, window.innerHeight);

	// Set up the scene
	scene = new THREE.Scene();
    createSkybox(scene)

	// Create a perspective camera
	camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
	camera.position.set(-20, -400, 300);

	// Add OrbitControls
	controls = new OrbitControls(camera, renderer.domElement);
	controls.enableDamping = true; // Enables smooth damping effect during rotation

      // Initialize raycaster and mouse
      raycaster = new THREE.Raycaster();
      mouse = new THREE.Vector2();

    window.addEventListener('click',onMouseClick,false);

    const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
   scene.add(ambientLight);
	//creates solar system
	solarsystem(scene);
	
    
   
    
    // Start animation loop
    animate();
     //add event listeners for planets
}


function createSkybox(scene) {
    const loader = new THREE.CubeTextureLoader();
    
    loader.load([
        './milky_way.jpg',   // +X (right)
        './milky_way.jpg',   // -X (left)
        './stars.jpg',       // +Y (top)
        './stars.jpg',       // -Y (bottom)
        './milky_way.jpg',   // +Z (front)
        './milky_way.jpg'    // -Z (back)
    ],
    // onLoad callback
    function (texture) {
        scene.background = texture;
    },
    // onProgress callback (optional)
    undefined,
    // onError callback
    function (err) {
        console.error('An error occurred loading the skybox:', err);
    }
    );
}


function onMouseClick(event) {
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0) {
        const selectedObject = intersects[0].object;
        const selectedPlanet = planetData.find(planet => planet.object === selectedObject);

        if (selectedPlanet) {
            followCamera(selectedPlanet);
        } else {
            hidePlanetDetails();
            followedPlanet = null;
        }
    } else {
        hidePlanetDetails();
        followedPlanet = null;
    }
}

function updatePlanetDetails(name, orbitalPeriod) {
    const details = document.getElementById('details');
    details.style.display = 'block';
    document.getElementById('planetname').textContent = name;
    document.getElementById('orbitalPeriod').textContent = `Orbital Period: ${orbitalPeriod} days`;
}

function hidePlanetDetails() {
    const details = document.getElementById('details');
    details.style.display = 'none';
}

function followCamera(planet) {
    if (followedPlanet === planet) {
        followedPlanet = null;
        controls.enabled = true;
        hidePlanetDetails(); // Hide details when unfollowing the planet
    } else {
        followedPlanet = planet;
        controls.enabled = false;
        updatePlanetDetails(planet.name, planet.orbitalPeriod); // Show details when following the planet
    }
}

function updateCameraPosition() {
    if (followedPlanet) {
        const offset = new THREE.Vector3(0, 0, 50);
        const planetPos = followedPlanet.object.position;
        
        const newPos = planetPos.clone().add(offset);
        camera.position.lerp(newPos, 0.1);
        camera.lookAt(planetPos);
        controls.target.copy(planetPos);
    }
}
function solarsystem(scene){
	const sphereGeometry = new THREE.SphereGeometry();
    planetData.forEach((data)=>{
		data.angle=Math.random()*2*Math.PI;
        let x,y;
        if(data.name=='Sun'){
            x=0;
            y=0;
        }else{
		x=data.distance*Math.cos(data.angle);
		y=data.distance*Math.sin(data.angle);
        }
	    loadTexture(data.path,onTextureLoaded,
                    onTextureLoadError,sphereGeometry,
                    data.color,new THREE.Vector3(x,0,y),
                    data.size,data,scene);
    if (data.name !== 'Sun') {
                        planetpath(scene, data.distance,data.color);
                    }
		data.speed=SCALE_FACTOR*Math.sqrt(M*G/Math.pow(data.distance,3))
		
	}
)
}



function planetpath(scene,radius,color){
const pathPoints = [];
const segments = 100; // Number of segments in the circle

for (let i = 0; i <= segments; i++) {
	const theta = (i / segments) * Math.PI * 2;
	const x = radius * Math.cos(theta);
	const y = radius * Math.sin(theta);
	const point = new THREE.Vector3(x, y, 0);
	pathPoints.push(point);
}

const pathGeometry = new THREE.BufferGeometry().setFromPoints(pathPoints);
const pathMaterial = new THREE.LineBasicMaterial({ color: color });

const circularLine = new THREE.Line(pathGeometry, pathMaterial);
scene.add(circularLine);
}


function animate() {
    requestAnimationFrame(animate);
	planetData.forEach(planet=>{
        if(planet.name!=='Sun'){
		planet.angle+=planet.speed;
		var x=planet.distance*Math.cos(planet.angle);
		var y=planet.distance*Math.sin(planet.angle);
		planet.object.position.copy(new THREE.Vector3(x,y,0));
		if(planet.moons.length>0){
			planet.moons.forEach(moon=>{
				moon.angle+=moon.speed;
				var mx=x+moon.distance*Math.cos(moon.angle);
				var my=y+moon.distance*Math.sin(moon.angle);
				moon.object.position.copy(new THREE.Vector3(mx,my,0));

			}

			)
		}	
}})
updateCameraPosition();
    
if (!followedPlanet) {
    controls.update();
}
    // Render the scene
    renderer.render(scene, camera);
}
*/

import { solarSystem } from "./main";


