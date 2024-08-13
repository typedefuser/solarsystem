import * as THREE from 'three';
import { SCALE_FACTOR,M,G } from './planetConfig.js';
export function loadTexture(texturePath, onLoad, onError,...params) {
    const loader = new THREE.TextureLoader();
    loader.load(
        texturePath,
        (texture)=>onLoad(texture,...params),
        undefined,
        onError
    );
}

export function onTextureLoaded(texture, geometry, color, position, size, data,scene,celestiallist) {
    const material = new THREE.MeshBasicMaterial({ map: texture});
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.copy(position);
    mesh.scale.set(size, size, size);
    data.object = mesh;
    mesh.userData = {
        name: data.name,
        rotationSpeed: data.rotationSpeed,
        orbitSpeed: SCALE_FACTOR * Math.sqrt(G * M / Math.pow(data.distance || 1, 3)),
        orbitRadius: data.distance || 0,
        orbitAngle: Math.random() * Math.PI * 2
    };
    scene.add(mesh);
    //console.log(celestiallist.length)
    celestiallist.push(mesh)
    if(data.moons){
		data.moons.forEach(moonData=>{
		moonData.angle=Math.random()*2*Math.PI;

		var x=data.distance+moonData.distance*Math.cos(moonData.angle);
		var y=data.distance+moonData.distance*Math.sin(moonData.angle);
		const _moon=planet(geometry,moonData.color,new THREE.Vector3(x,y,0),moonData.size);
		moonData.object=_moon;
        _moon.userData.parent=mesh;
		scene.add(_moon);
		})
	}
}
/*
export function onTextureLoaded(texture, geometry, color, position, size, data,scene) {
    const material = new THREE.MeshBasicMaterial({ map: texture});
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.copy(position);
    mesh.scale.set(size, size, size);
    data.object = mesh;
    mesh.userData = {
        name: data.name,
        rotationSpeed: data.rotationSpeed,
        orbitSpeed: SCALE_FACTOR * Math.sqrt(G * M / Math.pow(data.distance || 1, 3)),
        orbitRadius: data.distance || 0,
        orbitAngle: Math.random() * Math.PI * 2
    };
    scene.add(mesh);
    if(data.moons){
		data.moons.forEach(moonData=>{
		moonData.angle=Math.random()*2*Math.PI;

		var x=data.distance+moonData.distance*Math.cos(moonData.angle);
		var y=data.distance+moonData.distance*Math.sin(moonData.angle);
		const _moon=planet(geometry,moonData.color,new THREE.Vector3(x,y,0),moonData.size);
		moonData.object=_moon;
        _moon.userData.parent=mesh;
		scene.add(_moon);
		})
	}
}*/
export function onTextureLoadError(error) {
    console.error('Error loading texture:', error);
   
}

export function planet(geometry, color, position, size){
    const material = new THREE.MeshBasicMaterial({ color: color});
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.copy(position);
    mesh.scale.set(size, size, size);
    return mesh;
 }
 


