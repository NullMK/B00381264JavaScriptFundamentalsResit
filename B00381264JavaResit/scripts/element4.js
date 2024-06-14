window.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('renderCanvas');
    const engine = new BABYLON.Engine(canvas, true);

    let scene = null;
    let player = null;
    let isPlayerInitialized = false;

    const createScene = function () {
        scene = new BABYLON.Scene(engine);
        scene.gravity = new BABYLON.Vector3(0, -9.81, 0); // Set gravity

        // Enable physics with Cannon.js
        const physicsPlugin = new BABYLON.CannonJSPlugin();
        scene.enablePhysics(scene.gravity, physicsPlugin);

        // Create camera
        const camera = new BABYLON.ArcRotateCamera('camera1', Math.PI / 2, Math.PI / 4, 10, new BABYLON.Vector3(0, 1, 0), scene);
        camera.attachControl(canvas, true);

        // Create light
        const light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);
        light.intensity = 0.7;

        // Create ground
        const ground = BABYLON.MeshBuilder.CreateGround('ground', { width: 10, height: 10 }, scene);
        ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);

        // Create GUI
        const advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI');
        const button = BABYLON.GUI.Button.CreateSimpleButton('button', 'Click Me');
        button.width = '150px';
        button.height = '40px';
        button.color = 'white';
        button.background = 'green';
        button.onPointerUpObservable.add(function () {
            createPlayer();
            button.isVisible = false; // Hide the button after clicking
        });

        advancedTexture.addControl(button);

        // Register keyboard input for player movement and jumping
        scene.inputStates = {};
        scene.actionManager = new BABYLON.ActionManager(scene);
        scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnKeyDownTrigger,
            function (evt) {
                scene.inputStates[evt.sourceEvent.key] = true;
            }
        ));
        scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnKeyUpTrigger,
            function (evt) {
                scene.inputStates[evt.sourceEvent.key] = false;
            }
        ));

        // Register render loop
        engine.runRenderLoop(function () {
            // Ensure player is created and initialized
            if (!isPlayerInitialized && player) {
                player = BABYLON.MeshBuilder.CreateBox('player', { size: 1 }, scene);
                player.position.y = 0.5;
                player.physicsImpostor = new BABYLON.PhysicsImpostor(player, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 1, restitution: 0.1 }, scene);
                isPlayerInitialized = true;
            }

            // Movement based on keyboard input
            const playerSpeed = 0.5;
            if (scene.inputStates['w'] && player) {
                player.physicsImpostor.applyImpulse(player.forward.scale(playerSpeed), player.getAbsolutePosition());
            }
            if (scene.inputStates['s'] && player) {
                player.physicsImpostor.applyImpulse(player.forward.scale(-playerSpeed), player.getAbsolutePosition());
            }
            if (scene.inputStates['a'] && player) {
                player.physicsImpostor.applyImpulse(player.right.scale(-playerSpeed), player.getAbsolutePosition());
            }
            if (scene.inputStates['d'] && player) {
                player.physicsImpostor.applyImpulse(player.right.scale(playerSpeed), player.getAbsolutePosition());
            }

            // Jumping logic
            const jumpHeight = 6.0;
            if (scene.inputStates[' '] && player.physicsImpostor && player.position.y <= 0.6) {
                player.physicsImpostor.applyImpulse(new BABYLON.Vector3(0, jumpHeight, 0), player.getAbsolutePosition());
            }

            // Render the scene
            scene.render();
        });

        window.addEventListener('resize', function () {
            engine.resize();
        });

        return scene;
    };

    const createPlayer = function () {
        if (!isPlayerInitialized) {
            player = BABYLON.MeshBuilder.CreateBox('player', { size: 1 }, scene);
            player.position.y = 0.5;
            player.physicsImpostor = new BABYLON.PhysicsImpostor(player, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 1, restitution: 0.1 }, scene);
            isPlayerInitialized = true;
        }
    };

    const startScene = function () {
        const newScene = createScene();
        engine.runRenderLoop(function () {
            newScene.render();
        });
    };

    startScene();
});
