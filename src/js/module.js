window.onload = function() {
    alert("This page is under develop!")
  };

const canvas = document.getElementById('renderCanvas');

// Create the Babylon.js engine
const engine = new BABYLON.Engine(canvas, true);

// Function to create the scene
const createScene = () => {
    // Create a basic scene object
    const scene = new BABYLON.Scene(engine);

    // Create a camera and set its position
    const camera = new BABYLON.ArcRotateCamera("camera", 
        BABYLON.Tools.ToRadians(45), BABYLON.Tools.ToRadians(45), 
        10, new BABYLON.Vector3(0,0,0), scene);
    camera.attachControl(canvas, true);

    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0), scene);

    /*const box = BABYLON.MeshBuilder.CreateBox("box", { size: 2 }, scene);
    
    // Animation for rotating the cube
    scene.registerBeforeRender(() => {
        box.rotation.x += 0.01;
        box.rotation.y += 0.01;
    });*/

    BABYLON.SceneLoader.ImportMesh("", "/assets/", "skull.glb", scene, function(newMeshes){
        let candy = newMeshes[0];
        
        candy.scaling = new BABYLON.Vector3(10,10,10);
        candy.parent = candyProxy;
        let candyColor = new BABYLON.StandardMaterial("candyCol", scene);
        candyColor.diffuseColor = new BABYLON.Color3(0, 1, 0);
        candyColor.diffuseTexture = new BABYLON.Texture("/assets/texture/ratDiff.jpg", scene);
        candy.material = candyColor;
    });
    return scene;
};

// Create the scene
const scene = createScene();

// Render loop
engine.runRenderLoop(() => {
    scene.render();
});

// Handle resizing the window
window.addEventListener('resize', () => {
    engine.resize();
});