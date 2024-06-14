window.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('renderCanvas');
    const engine = new BABYLON.Engine(canvas, true);

    // Get the jump sound audio element
    const jumpSound = document.getElementById('jumpSound');

    let scene, camera, light, player, platforms = [];
    let isGameRunning = false;
    let isAudioMuted = false;
    let currentScene;

    const createMenuScene = function () {
        const menuScene = new BABYLON.Scene(engine);
        const menuCamera = new BABYLON.FreeCamera('menuCamera', new BABYLON.Vector3(0, 0, -10), menuScene);
        const menuLight = new BABYLON.HemisphericLight('menuLight', new BABYLON.Vector3(0, 1, 0), menuScene);

        // Enable shadows for the menu light
        menuLight.shadowEnabled = true;

        const advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI', true, menuScene);

        const playButton = BABYLON.GUI.Button.CreateSimpleButton('playButton', 'Play Game');
        playButton.width = '200px';
        playButton.height = '50px';
        playButton.color = 'white';
        playButton.background = 'green';
        playButton.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        playButton.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
        playButton.onPointerUpObservable.add(() => {
            switchScene(createGameScene());
        });

        const muteButton = BABYLON.GUI.Button.CreateSimpleButton('muteButton', isAudioMuted ? 'Unmute Audio' : 'Mute Audio');
        muteButton.width = '200px';
        muteButton.height = '50px';
        muteButton.color = 'white';
        muteButton.background = 'red';
        muteButton.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        muteButton.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        muteButton.topInPixels = 100;
        muteButton.onPointerUpObservable.add(() => {
            isAudioMuted = !isAudioMuted;
            muteButton.textBlock.text = isAudioMuted ? 'Unmute Audio' : 'Mute Audio';
        });

        advancedTexture.addControl(playButton);
        advancedTexture.addControl(muteButton);

        return menuScene;
    };

    const createGameScene = function () {
        isGameRunning = true;
        const gameScene = new BABYLON.Scene(engine);
        gameScene.gravity = new BABYLON.Vector3(0, -9.81, 0);
        gameScene.clearColor = new BABYLON.Color3(0.8, 0.8, 0.8);

        camera = new BABYLON.ArcRotateCamera('gameCamera', Math.PI / 2, Math.PI / 4, 20, new BABYLON.Vector3(0, 1, 0), gameScene);
        camera.attachControl(canvas, true);

        light = new BABYLON.HemisphericLight('gameLight', new BABYLON.Vector3(0, 1, 0), gameScene);

        // Enable shadows for the game light
        light.shadowEnabled = true;

        const physicsPlugin = new BABYLON.CannonJSPlugin();
        gameScene.enablePhysics(gameScene.gravity, physicsPlugin);

        const ground = BABYLON.MeshBuilder.CreateGround('ground', { width: 40, height: 40 }, gameScene);
        ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, gameScene);
        ground.receiveShadows = true; // Ground should receive shadows

        player = BABYLON.MeshBuilder.CreateBox('player', { size: 1 }, gameScene);
        player.position.y = 1;
        player.physicsImpostor = new BABYLON.PhysicsImpostor(player, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 1, restitution: 0.1 }, gameScene);
        const blackMaterial = new BABYLON.StandardMaterial('blackMaterial', gameScene);
        blackMaterial.diffuseColor = BABYLON.Color3.Black(); // Set the diffuse color to black
        player.material = blackMaterial;
        player.receiveShadows = true; // Player should receive shadows
        player.checkCollisions = true; // Enable collisions for player

        const platform1 = BABYLON.MeshBuilder.CreateBox('platform1', { width: 4, height: 0.5, depth: 4 }, gameScene);
        platform1.position.y = 1.5;
        platform1.position.x = 4;
        platform1.physicsImpostor = new BABYLON.PhysicsImpostor(platform1, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, gameScene);
        platforms.push(platform1);
        platform1.receiveShadows = true; // Platform should receive shadows

        const platform2 = BABYLON.MeshBuilder.CreateBox('platform2', { width: 2, height: 0.5, depth: 2 }, gameScene);
        platform2.position.y = 3;
        platform2.position.x = 8;
        platform2.physicsImpostor = new BABYLON.PhysicsImpostor(platform2, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, gameScene);
        platforms.push(platform2);
        platform2.receiveShadows = true; // Platform should receive shadows

        const goalPlatform = BABYLON.MeshBuilder.CreateBox('goalPlatform', { width: 6, height: 0.5, depth: 6 }, gameScene);
        goalPlatform.position.y = 1.5;
        goalPlatform.position.x = 12;
        goalPlatform.physicsImpostor = new BABYLON.PhysicsImpostor(goalPlatform, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, gameScene);
        platforms.push(goalPlatform);
        goalPlatform.receiveShadows = true; // Platform should receive shadows

        gameScene.inputStates = {};
        gameScene.actionManager = new BABYLON.ActionManager(gameScene);
        gameScene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnKeyDownTrigger,
            function (evt) {
                gameScene.inputStates[evt.sourceEvent.key] = true;
            }
        ));
        gameScene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnKeyUpTrigger,
            function (evt) {
                gameScene.inputStates[evt.sourceEvent.key] = false;
            }
        ));

        engine.runRenderLoop(function () {
            if (isGameRunning) {
                const playerSpeed = 0.1;
                if (gameScene.inputStates['w']) {
                    player.physicsImpostor.applyImpulse(player.forward.scale(playerSpeed), player.getAbsolutePosition());
                }
                if (gameScene.inputStates['s']) {
                    player.physicsImpostor.applyImpulse(player.forward.scale(-playerSpeed), player.getAbsolutePosition());
                }
                if (gameScene.inputStates['a']) {
                    player.physicsImpostor.applyImpulse(player.right.scale(-playerSpeed), player.getAbsolutePosition());
                }
                if (gameScene.inputStates['d']) {
                    player.physicsImpostor.applyImpulse(player.right.scale(playerSpeed), player.getAbsolutePosition());
                }

                const jumpHeight = 6.0;
                // Check if the player is on the ground (y <= 1.1) to allow jumping
                if (gameScene.inputStates[' '] && player.position.y <= 1.1) {
                    player.physicsImpostor.applyImpulse(new BABYLON.Vector3(0, jumpHeight, 0), player.getAbsolutePosition());
                    // Play jump sound
                    if (!isAudioMuted) {
                        jumpSound.currentTime = 0;
                        jumpSound.play();
                    }
                }

                // Check if the player has reached the goal platform
                if (player.intersectsMesh(goalPlatform, false)) {
                    isGameRunning = false;
                    gameScene.dispose(); // Clean up the game scene
                    const menuScene = createMenuScene(); // Create a new menu scene
                    switchScene(menuScene); // Switch to the menu scene
                }
            }

            gameScene.render();
        });

        window.addEventListener('resize', function () {
            engine.resize();
        });

        return gameScene;
    };

    const switchScene = function (newScene) {
        if (currentScene) {
            currentScene.dispose();
        }
        currentScene = newScene;
        engine.runRenderLoop(() => {
            currentScene.render();
        });
    };

    const menuScene = createMenuScene();
    switchScene(menuScene);
});
