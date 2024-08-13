import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { planetData,SCALE_FACTOR,M,G } from './planetConfig.js';
import { planet } from './textureUtils.js';
class SolarSystem {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('canvas') });
        this.renderer.setClearColor(0x000000); // Set background to black
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.geometry = new THREE.SphereGeometry();
        this.followedPlanet = null;
        this.celestialBodies = [];
    }

    init() {
        this.setupRenderer();
        this.setupCamera();
        this.setupLights();
        this.createSkybox.bind(this);
        this.createStars(); // Add this line to create stars
        this.createPlanets();
        //console.log(this.celestialBodies.length)
        this.setupEventListeners();
        this.animate();
    }

    setupRenderer() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
    }

    setupCamera() {
        this.camera.position.set(-20, -400, 300);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
    }

    setupLights() {
        const ambientLight = new THREE.AmbientLight(0x404040);
        this.scene.add(ambientLight);

        const sunLight = new THREE.PointLight(0xffffff, 1.5);
        this.scene.add(sunLight);
    }

    createSkybox() {
        const loader = new THREE.CubeTextureLoader();
        const texture = loader.load([
            'milky_way.jpg', 'milky_way.jpg',
            'stars.jpg', 'stars.jpg',
            'milky_way.jpg', 'milky_way.jpg'
        ],
        (texture) => {
            this.scene.background = texture;
            console.log('Skybox loaded successfully');
        },
        undefined,
        (error) => {
            console.error('Error loading skybox textures:', error);
        }
    );
        this.scene.background = texture;
    }

    createStars() {
        const starCount = 1000; // Number of stars
        const starsGeometry = new THREE.BufferGeometry();
        const positions = new Float32Array(starCount * 3);

        for (let i = 0; i < starCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 2000; // X position
            positions[i * 3 + 1] = (Math.random() - 0.5) * 2000; // Y position
            positions[i * 3 + 2] = (Math.random() - 0.5) * 2000; // Z position
        }

        starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 2 }); // Increased size
        const stars = new THREE.Points(starsGeometry, starsMaterial);

        this.scene.add(stars);
    }

    createPlanets() {
        planetData.forEach(data => this.createCelestialBody(data));
    }

    createCelestialBody(data) {
        let x,y;
        if(data.name=='Sun'){
            x=0;
            y=0;
        }else{
		x=data.distance*Math.cos(data.angle);
		y=data.distance*Math.sin(data.angle);
        }
        this.loadTexture(data.path,
                        this.onTextureLoaded.bind(this),
                        this.onTextureLoadError,
                        this.geometry,
                        data.color,
                        new THREE.Vector3(x,y,0),
                        data.size,data);


        if (data.name !== 'Sun') {
            this.createOrbitPath(data.distance);
        }

    }

    createOrbitPath(radius) {
        const segments = 128;
        const material = new THREE.LineBasicMaterial({ color: 0x888888, opacity: 0.5, transparent: true });
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(segments * 3);

        for (let i = 0; i < segments; i++) {
            const angle = (i / segments) * Math.PI * 2;
            positions[i * 3] =Math.cos(angle) * radius;
            positions[i * 3 + 1] = Math.sin(angle) * radius;
            positions[i * 3 + 2] =0 ;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const orbitPath = new THREE.Line(geometry, material);
        this.scene.add(orbitPath);
    }

    loadTexture(texturePath, onLoad, onError,...params) {
        const loader = new THREE.TextureLoader();
        loader.load(
            texturePath,
            (texture)=>onLoad(texture,...params),
            undefined,
            onError
        );
    }
    
    onTextureLoaded(texture, geometry, color, position, size, data) {
        const material = new THREE.MeshBasicMaterial({ map: texture});
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.copy(position);
        mesh.scale.set(size, size, size);
        data.object = mesh;
        mesh.userData = {
            name: data.name,
            rotationSpeed:0.05,
            orbitSpeed: SCALE_FACTOR * Math.sqrt(G * M / Math.pow(data.distance || 1, 3)),
            orbitRadius: data.distance || 0,
            orbitAngle: Math.random() * Math.PI * 2,
            orbitalPeriod:data.orbitalPeriod
        };
        this.scene.add(mesh);
        
        //console.log(this.celestialBodies)
        if(data.moons){
            mesh.userData.moonlist=[]

            data.moons.forEach(moonData=>{
            moonData.angle=Math.random()*2*Math.PI;
    
            var x=data.distance+moonData.distance*Math.cos(moonData.angle);
            var y=data.distance+moonData.distance*Math.sin(moonData.angle);
            const _moon=planet(geometry,moonData.color,new THREE.Vector3(x,y,0),moonData.size);
            
            _moon.userData={
                angle:moonData.angle,
                speed:moonData.speed,
                dist:moonData.distance
            }

            mesh.userData.moonlist.push(_moon);
            this.scene.add(_moon);
            })
        }
        this.celestialBodies.push(mesh)
    }


    onTextureLoadError(error) {
        console.error('Error loading texture:', error);
       
    }
    
     

    setupEventListeners() {
        window.addEventListener('resize', this.onWindowResize.bind(this), false);
        window.addEventListener('click', this.onMouseClick.bind(this), false);
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    onMouseClick(event) {
        event.preventDefault();
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.celestialBodies);

        if (intersects.length > 0) {
            const selectedObject = intersects[0].object;
            this.followCamera(selectedObject);
        } else {
            this.followedPlanet = null;
            this.controls.enabled = true;
            this.hidePlanetDetails();
        }
    }

    followCamera(planet) {
        if (this.followedPlanet === planet) {
            this.followedPlanet = null;
            this.controls.enabled = true;
            this.hidePlanetDetails();
        } else {
            this.followedPlanet = planet;
            this.controls.enabled = false;
            this.updatePlanetDetails(planet.userData.name, planet.userData.orbitalPeriod);
        }
    }

    updatePlanetDetails(name, orbitalPeriod) {
        const details = document.getElementById('details');
        details.style.display = 'block';
        document.getElementById('planetname').textContent = name;
        document.getElementById('orbitalPeriod').textContent = `Orbital Period: ${orbitalPeriod} days`;
    }

    hidePlanetDetails() {
        const details = document.getElementById('details');
        details.style.display = 'none';
    }

    updateCelestialBodies() {
        this.celestialBodies.forEach(body => {
            // Rotate on axis
            body.rotation.z+= body.userData.rotationSpeed;

            // Orbit around parent (Sun or planet)
            if (body.userData.orbitRadius > 0) {
                body.userData.orbitAngle += body.userData.orbitSpeed;
                const x = body.userData.orbitRadius * Math.cos(body.userData.orbitAngle);
                const y = body.userData.orbitRadius * Math.sin(body.userData.orbitAngle);
                body.position.x = x;
                body.position.y = y;
                if(body.userData.moonlist){
                    
                    body.userData.moonlist.forEach(moon=>{
                        moon.userData.angle+=moon.userData.speed;
                        const mx=x+moon.userData.dist*Math.cos(moon.userData.angle)
                        const my=y+moon.userData.dist*Math.sin(moon.userData.angle)
                        moon.position.x=mx;
                        moon.position.y=my;
                    })
                }
    
            }
        });
    }

    updateCamera() {
        if (this.followedPlanet) {
            const offset = new THREE.Vector3(0, 0, 50);
            const planetPos = this.followedPlanet.position;
            
            const newPos = planetPos.clone().add(offset);
            this.camera.position.lerp(newPos, 0.1);
            this.camera.lookAt(planetPos);
            this.controls.target.copy(planetPos);
        }
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));
        this.updateCelestialBodies();
        this.updateCamera();
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize the solar system
var solarSystem = new SolarSystem();
solarSystem.init()