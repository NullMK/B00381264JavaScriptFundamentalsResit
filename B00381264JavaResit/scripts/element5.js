window.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('renderCanvas');
    const engine = new BABYLON.Engine(canvas, true);

    let currentSceneIndex = 0;
    let scenes = [];
    let advancedTexture; // Declare advancedTexture globally

    // Scene 1
    const createScene1 = function () {
        const scene = new BABYLON.Scene(engine);
        scene.clearColor = new BABYLON.Color3(0.5, 0.8, 0.5);

        // Create camera
        const camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 1, -10), scene);
        camera.setTarget(BABYLON.Vector3.Zero());
        camera.attachControl(canvas, true);

        // Create light
        const light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);
        light.intensity = 0.7;

        // Create ground
        const ground = BABYLON.MeshBuilder.CreateGround('ground', { width: 10, height: 10 }, scene);
        ground.position.y = -1;
        
        // Create cube
        const cube = BABYLON.MeshBuilder.CreateBox('cube', { size: 1 }, scene);
        cube.position.y = 0.5;

        // Button to switch to Scene 2
        const button1 = BABYLON.GUI.Button.CreateSimpleButton('button1', 'Go to Scene 2');
        button1.width = '150px';
        button1.height = '40px';
        button1.color = 'white';
        button1.background = 'green';
        button1.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        button1.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        button1.paddingTop = '20px';
        button1.paddingLeft = '20px';
        button1.onPointerUpObservable.add(function () {
            switchScene(1);
        });

        // GUI
        advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI');
        advancedTexture.addControl(button1);

        return scene;
    };

    // Scene 2
    const createScene2 = function () {
        const scene = new BABYLON.Scene(engine);
        scene.clearColor = new BABYLON.Color3(0.5, 0.5, 0.8);

        // Create camera
        const camera = new BABYLON.FreeCamera('camera2', new BABYLON.Vector3(0, 2, -10), scene);
        camera.setTarget(BABYLON.Vector3.Zero());
        camera.attachControl(canvas, true);

        // Create light
        const light = new BABYLON.HemisphericLight('light2', new BABYLON.Vector3(0, 1, 0), scene);
        light.intensity = 0.7;

        // Create sphere
        const sphere = BABYLON.MeshBuilder.CreateSphere('sphere', { diameter: 1 }, scene);
        sphere.position.y = 0.5;

        // Button to switch to Scene 1
        const button2 = BABYLON.GUI.Button.CreateSimpleButton('button2', 'Go to Scene 1');
        button2.width = '150px';
        button2.height = '40px';
        button2.color = 'white';
        button2.background = 'green';
        button2.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        button2.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        button2.paddingTop = '20px';
        button2.paddingRight = '20px';
        button2.onPointerUpObservable.add(function () {
            switchScene(0);
        });

        // GUI
        advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI');
        advancedTexture.addControl(button2);

        return scene;
    };

    // Initialize scenes
    scenes.push(createScene1());
    scenes.push(createScene2());

    // Function to switch scenes
    const switchScene = function (index) {
        if (index >= 0 && index < scenes.length && index !== currentSceneIndex) {
            // Detach current scene's camera controls
            scenes[currentSceneIndex].activeCamera.detachControl(canvas);
            
            // Hide all GUI controls
            advancedTexture.dispose();
            advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI');
            
            // Update current scene index
            currentSceneIndex = index;
            
            // Attach new scene's camera controls
            scenes[currentSceneIndex].activeCamera.attachControl(canvas, true);
            
            // Add appropriate button based on current scene index
            if (currentSceneIndex === 0) {
                const button1 = BABYLON.GUI.Button.CreateSimpleButton('button1', 'Go to Scene 2');
                button1.width = '150px';
                button1.height = '40px';
                button1.color = 'white';
                button1.background = 'green';
                button1.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
                button1.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
                button1.paddingTop = '20px';
                button1.paddingLeft = '20px';
                button1.onPointerUpObservable.add(function () {
                    switchScene(1);
                });
                advancedTexture.addControl(button1);
            } else if (currentSceneIndex === 1) {
                const button2 = BABYLON.GUI.Button.CreateSimpleButton('button2', 'Go to Scene 1');
                button2.width = '150px';
                button2.height = '40px';
                button2.color = 'white';
                button2.background = 'green';
                button2.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
                button2.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
                button2.paddingTop = '20px';
                button2.paddingRight = '20px';
                button2.onPointerUpObservable.add(function () {
                    switchScene(0);
                });
                advancedTexture.addControl(button2);
            }
        }
    };

    // Start with Scene 1
    switchScene(0);

    // Run render loop
    engine.runRenderLoop(function () {
        scenes[currentSceneIndex].render();
    });

    // Resize
    window.addEventListener('resize', function () {
        engine.resize();
    });
});
