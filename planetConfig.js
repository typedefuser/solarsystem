export const M = 1.989e30;    
export const SCALE_FACTOR = 1e-10; 
export const G = 6.67430e-11;

// Function to calculate elliptical orbit distance
function calculateEllipticalOrbit(a, e, theta) {
    return (a+20) * (1 - e * e) / (1 + e * Math.cos(theta));
}

// Initial angle θ (in radians) - set to 0 for perihelion
const initialTheta = Math.PI/4;

export const planetData = [
    {
        name:'Sun',
        color:'yellow',
        size:30,
        moons:[],
        path:'./sun.jpg'
    },
    { 
        name: 'Mercury', 
        color: 'gray', 
        distance: 0.39, // Updated to actual average distance in AU
        size: 5, 
        mass: 3.3011e23, 
        orbitalPeriod: 88,  
        moons: [], 
        path:'./Volcanic.png'
    },
    { 
        name: 'Venus', 
        color: 'orange', 
        distance: 0.72, // Updated to actual average distance in AU
        size: 8,
        mass: 4.8675e24,
        orbitalPeriod: 225,
        moons: [],
        path:'./Venusian.png'
    },
    { 
        name: 'Earth', 
        color: 'blue', 
        distance: 1.00, // Updated to actual average distance in AU
        size: 9,
        mass: 5.97237e24,
        orbitalPeriod: 365,
        path:'./Earth.jpg',
        moons: [
            { 
                name: 'Moon', 
                color: 'white', 
                distance: 15,
                size: 2,
                speed:0.03,
                orbitalPeriod: 27.32166
            }
        ]
    },
    { 
        name: 'Mars', 
        color: 'red', 
        distance: 1.52, // Updated to actual average distance in AU
        size: 7, 
        mass: 6.4171e23, 
        orbitalPeriod: 687, 
        path:'./Mars.jpg',
        moons: [
            { 
                name: 'Phobos', 
                color: 'gray', 
                distance: 5,
                size: 1,
                speed:0.04,
                orbitalPeriod: 0.31891
            },
            { 
                name: 'Deimos', 
                color: 'gray', 
                distance: 10,
                size: 1,
                speed:0.02,
                orbitalPeriod: 1.263
            }
        ]
    },
    { 
        name: 'Jupiter', 
        color: 'brown', 
        distance: 5.20, // Updated to actual average distance in AU
        size: 15, 
        mass: 1.8982e27,
        orbitalPeriod: 4333, 
        path:'./jupiter.jpg',
        moons: [
            { 
                name: 'Io', 
                color: 'yellow', 
                distance: 20, 
                size: 3,
                speed:0.04,
                orbitalPeriod: 1.769
            },
            { 
                name: 'Europa', 
                color: 'white', 
                distance: 25, 
                size: 3,
                speed:0.03,
                orbitalPeriod: 3.551
            },
            { 
                name: 'Ganymede', 
                color: 'gray', 
                distance: 30, 
                size: 4, 
                speed:0.02,
                orbitalPeriod: 7.155
            },
            { 
                name: 'Callisto', 
                color: 'darkgray', 
                distance: 35,
                size: 4, 
                speed:0.01,
                orbitalPeriod: 16.689
            }
        ]
    },
    { 
        name: 'Saturn', 
        color: 'tan', 
        distance: 9.58, // Updated to actual average distance in AU
        size: 14, 
        mass: 5.6834e26,
        orbitalPeriod: 10759, 
        path:'./Saturn.jpg',
        moons: [
            { 
                name: 'Titan', 
                color: 'orange', 
                distance: 22, 
                size: 4, 
                speed:0.01,
                orbitalPeriod: 15.945
            },
            { 
                name: 'Rhea', 
                color: 'gray', 
                distance: 25, 
                size: 2, 
                speed:0.03,
                orbitalPeriod: 4.518 
            },
            { 
                name: 'Iapetus', 
                color: 'white', 
                distance: 28, 
                size: 2,
                speed:0.01,
                orbitalPeriod: 79.33 
            },
            { 
                name: 'Dione', 
                color: 'lightgray', 
                distance: 30, 
                size: 2, 
                speed:0.05,
                orbitalPeriod: 2.737 
            }
        ]
    },
    {
        name: 'Uranus',
        color: 'lightblue',
        distance: 19.22, // Updated to actual average distance in AU
        size: 12,
        mass: 8.6810e25,
        orbitalPeriod: 30687,
        path: './Uranus.jpg',
        moons: []
    },
    {
        name: 'Neptune',
        color: 'blue',
        distance: 30.05, // Updated to actual average distance in AU
        size: 11,
        mass: 1.02413e26,
        orbitalPeriod: 60190,
        path: './neptune.jpg',
        moons: []
    }
];