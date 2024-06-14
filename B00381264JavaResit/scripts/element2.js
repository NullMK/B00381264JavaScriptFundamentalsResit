window.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('renderCanvas');
    const engine = new BABYLON.Engine(canvas, true);

    const createScene = function () {
        const scene = new BABYLON.Scene(engine);

        // Camera
        const camera = new BABYLON.ArcRotateCamera('camera1', Math.PI / 2, Math.PI / 4, 50, new BABYLON.Vector3(0, 0, 0), scene);
        camera.attachControl(canvas, true);

        // Light
        const light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);
        light.intensity = 0.7;

        // Ground
        const ground = BABYLON.MeshBuilder.CreateGroundFromHeightMap('ground', '../assets/textures/heightMap.png', {
            width: 100, height: 100, subdivisions: 50, minHeight: 0, maxHeight: 10
        }, scene);
        const groundMaterial = new BABYLON.StandardMaterial('groundMaterial', scene);
        groundMaterial.diffuseTexture = new BABYLON.Texture('../assets/textures/ground.jpg', scene);
        ground.material = groundMaterial;

        // Skybox
        const skybox = BABYLON.MeshBuilder.CreateBox('skyBox', { size: 500 }, scene);
        const skyboxMaterial = new BABYLON.StandardMaterial('skyBoxMaterial', scene);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture('../assets/textures/Epic_BlueSunset', scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
        skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        skybox.material = skyboxMaterial;

        return scene;
    };

    const scene = createScene();

    engine.runRenderLoop(function () {
        scene.render();
    });

    window.addEventListener('resize', function () {
        engine.resize();
    });
});
