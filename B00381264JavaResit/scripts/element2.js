window.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('renderCanvas');
    const engine = new BABYLON.Engine(canvas, true);

    const createScene = function () {
        const scene = new BABYLON.Scene(engine);

        // Camera
        const camera = new BABYLON.ArcRotateCamera('camera1', Math.PI / 2, Math.PI / 4, 50, new BABYLON.Vector3(0, 5, 0), scene);
        camera.attachControl(canvas, true);
        camera.lowerBetaLimit = 0.1; // Prevent looking underneath the ground
        camera.upperBetaLimit = Math.PI / 2 * 0.99; // Prevent looking too high
        camera.lowerRadiusLimit = 20; // Prevent zooming in too close
        camera.upperRadiusLimit = 100; // Prevent zooming out too far

        // Hemispheric Light
        const hemisphericLight = new BABYLON.HemisphericLight('hemisphericLight', new BABYLON.Vector3(0, 1, 0), scene);
        hemisphericLight.intensity = 0.5;

        // Directional Light for shadows
        const directionalLight = new BABYLON.DirectionalLight('directionalLight', new BABYLON.Vector3(-1, -2, -1), scene);
        directionalLight.position = new BABYLON.Vector3(20, 40, 20);

        // Shadow generator
        const shadowGenerator = new BABYLON.ShadowGenerator(1024, directionalLight);
        shadowGenerator.useExponentialShadowMap = true;

        // Ground
        const ground = BABYLON.MeshBuilder.CreateGroundFromHeightMap('ground', '../assets/textures/heightMap.png', {
            width: 100, height: 100, subdivisions: 50, minHeight: 0, maxHeight: 10
        }, scene);
        const groundMaterial = new BABYLON.StandardMaterial('groundMaterial', scene);
        groundMaterial.diffuseTexture = new BABYLON.Texture('../assets/textures/ground.jpg', scene);
        ground.material = groundMaterial;
        ground.receiveShadows = true;

        // Skybox
        const skybox = BABYLON.MeshBuilder.CreateBox('skyBox', { size: 500 }, scene);
        const skyboxMaterial = new BABYLON.StandardMaterial('skyBoxMaterial', scene);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture('../assets/textures/Epic_BlueSunset', scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
        skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        skybox.material = skyboxMaterial;

        // Create textured meshes
        const createTexturedMesh = function (meshType, size, position, textureUrl) {
            let mesh;
            switch (meshType) {
                case 'sphere':
                    mesh = BABYLON.MeshBuilder.CreateSphere('sphere', { diameter: size }, scene);
                    break;
                case 'box':
                    mesh = BABYLON.MeshBuilder.CreateBox('box', { size: size }, scene);
                    break;
                case 'cylinder':
                    mesh = BABYLON.MeshBuilder.CreateCylinder('cylinder', { height: size, diameter: size }, scene);
                    break;
                default:
                    return null;
            }
            mesh.position = position;
            const material = new BABYLON.StandardMaterial(meshType + 'Material', scene);
            material.diffuseTexture = new BABYLON.Texture(textureUrl, scene);
            mesh.material = material;
            mesh.receiveShadows = true; // Mesh receives shadows
            shadowGenerator.addShadowCaster(mesh); // Mesh casts shadows
            return mesh;
        };

        const sphere = createTexturedMesh('sphere', 5, new BABYLON.Vector3(-20, 5, 0), '../assets/textures/grass.png');
        const box = createTexturedMesh('box', 5, new BABYLON.Vector3(0, 2.5, -20), '../assets/textures/floor.png');
        const cylinder = createTexturedMesh('cylinder', 5, new BABYLON.Vector3(20, 2.5, 0), '../assets/textures/brick.jpg');

        // Cloning meshes
        const sphereClone = sphere.clone('sphereClone');
        sphereClone.position = new BABYLON.Vector3(-20, 5, -20);
        sphereClone.receiveShadows = true;
        shadowGenerator.addShadowCaster(sphereClone);

        const boxClone = box.clone('boxClone');
        boxClone.position = new BABYLON.Vector3(0, 2.5, 20);
        boxClone.receiveShadows = true;
        shadowGenerator.addShadowCaster(boxClone);

        const cylinderClone = cylinder.clone('cylinderClone');
        cylinderClone.position = new BABYLON.Vector3(20, 2.5, 20);
        cylinderClone.receiveShadows = true;
        shadowGenerator.addShadowCaster(cylinderClone);

        // Merging meshes
        const mergedMesh = BABYLON.Mesh.MergeMeshes([sphere, box, cylinder], true, true, undefined, false, true);
        mergedMesh.position = new BABYLON.Vector3(0, 5, 0);
        mergedMesh.receiveShadows = true;
        shadowGenerator.addShadowCaster(mergedMesh);

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
