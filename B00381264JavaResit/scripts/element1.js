document.addEventListener("DOMContentLoaded", function () {
    var canvas = document.getElementById("renderCanvas");
    var engine = new BABYLON.Engine(canvas, true);

    function createScene() {
        var scene = new BABYLON.Scene(engine);

        // Camera
        var camera = new BABYLON.ArcRotateCamera("camera", 0, Math.PI / 4, 20, BABYLON.Vector3.Zero(), scene);
        camera.attachControl(canvas, true);

        // Lighting
        var light = new BABYLON.HemisphericLight("hemisphericLight", new BABYLON.Vector3(0, 1, 0), scene);
        light.intensity = 0.8;

        var directionalLight = new BABYLON.DirectionalLight("directionalLight", new BABYLON.Vector3(-1, -2, -1), scene);
        directionalLight.position = new BABYLON.Vector3(20, 40, 20);
        directionalLight.intensity = 0.6;
        directionalLight.shadowEnabled = true;

        // Shadow generator
        var shadowGenerator = new BABYLON.ShadowGenerator(1024, directionalLight);
        shadowGenerator.useBlurExponentialShadowMap = true;
        shadowGenerator.blurKernel = 32;

        // Ground
        const ground = BABYLON.MeshBuilder.CreateGroundFromHeightMap('ground', '../assets/textures/heightMap.png', {
            width: 50, height: 50, subdivisions: 3, minHeight: 0, maxHeight: 2
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

        // Sphere
        var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 2 }, scene);
        sphere.position.y = 1;
        sphere.position.x = -4;
        shadowGenerator.addShadowCaster(sphere);

        // Box
        var box = BABYLON.MeshBuilder.CreateBox("box", { size: 2 }, scene);
        box.position.y = 1;
        box.position.x = 4;
        shadowGenerator.addShadowCaster(box);

        // Cylinder
        var cylinder = BABYLON.MeshBuilder.CreateCylinder("cylinder", { height: 3, diameter: 2 }, scene);
        cylinder.position.y = 1.5;
        cylinder.position.z = -4;
        shadowGenerator.addShadowCaster(cylinder);

        // Pyramid
        var pyramid = BABYLON.MeshBuilder.CreateCylinder("pyramid", { height: 3, diameterTop: 0, diameterBottom: 2, tessellation: 4 }, scene);
        pyramid.position.y = 1.5;
        pyramid.position.z = 4;
        shadowGenerator.addShadowCaster(pyramid);

        // Materials and textures
        var sphereMaterial = new BABYLON.StandardMaterial("sphereMaterial", scene);
        sphereMaterial.diffuseTexture = new BABYLON.Texture("https://www.babylonjs-playground.com/textures/grass.png", scene);
        sphere.material = sphereMaterial;

        var boxMaterial = new BABYLON.StandardMaterial("boxMaterial", scene);
        boxMaterial.diffuseTexture = new BABYLON.Texture("https://www.babylonjs-playground.com/textures/floor.png", scene);
        box.material = boxMaterial;

        var cylinderMaterial = new BABYLON.StandardMaterial("cylinderMaterial", scene);
        cylinderMaterial.diffuseTexture = new BABYLON.Texture("https://www.babylonjs-playground.com/textures/brick.jpg", scene);
        cylinder.material = cylinderMaterial;

        var pyramidMaterial = new BABYLON.StandardMaterial("pyramidMaterial", scene);
        pyramidMaterial.diffuseColor = new BABYLON.Color3(1, 0, 0); // Red color
        pyramid.material = pyramidMaterial;

        // Animations
        var animateSphere = function () {
            var animation = new BABYLON.Animation("sphereAnimation", "position.y", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

            var keys = [];
            keys.push({ frame: 0, value: 1 });
            keys.push({ frame: 30, value: 3 });
            keys.push({ frame: 60, value: 1 });

            animation.setKeys(keys);
            sphere.animations.push(animation);

            scene.beginAnimation(sphere, 0, 60, true);
        };

        var animateBox = function () {
            var animation = new BABYLON.Animation("boxAnimation", "rotation.y", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

            var keys = [];
            keys.push({ frame: 0, value: 0 });
            keys.push({ frame: 60, value: 2 * Math.PI });

            animation.setKeys(keys);
            box.animations.push(animation);

            scene.beginAnimation(box, 0, 60, true);
        };

        var animateCylinder = function () {
            var animation = new BABYLON.Animation("cylinderAnimation", "position.z", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

            var keys = [];
            keys.push({ frame: 0, value: -4 });
            keys.push({ frame: 30, value: 4 });
            keys.push({ frame: 60, value: -4 });

            animation.setKeys(keys);
            cylinder.animations.push(animation);

            scene.beginAnimation(cylinder, 0, 60, true);
        };

        animateSphere();
        animateBox();
        animateCylinder();

        return scene;
    }

    var scene = createScene();

    engine.runRenderLoop(function () {
        scene.render();
    });

    window.addEventListener("resize", function () {
        engine.resize();
    });
});
