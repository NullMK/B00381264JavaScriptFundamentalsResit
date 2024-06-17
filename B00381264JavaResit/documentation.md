# My BabylonJS Portfolio Documentation

Welcome to the documentation for my BabylonJS portfolio. This document provides an overview of the project, details on the interactive scenes, instructions for running the game, and contact information.

## Table of Contents

1. [About the Project](#about-the-project)
2. [Website Structure](#website-structure)
3. [Interactive Scenes](#interactive-scenes)
4. [How to Run the Game](#how-to-run-the-game)
5. [Code Snippets](#code-snippets)
6. [Contact](#contact)
7. [Screenshots](#screenshots)

## About the Project

This project is a portfolio website showcasing various interactive scenes created with BabylonJS. The website includes a main game and several other scenes demonstrating different features and capabilities of BabylonJS.

## Website Structure

The website consists of the following main components:

1. **Home Page (`index.html`)**: The landing page of the portfolio website.
2. **Interactive Scenes**: A collection of HTML pages, each featuring a different BabylonJS scene.
3. **Documentation Page**: This Markdown document converted to HTML for easy viewing.

### Home Page

The home page provides an introduction to the portfolio and links to various interactive scenes. It uses Bootstrap for styling to enhance the user experience.

#### HTML Structure

Below is the `index.html` file content:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home - Interactive BabylonJS Scenes</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
</head>
<body>
    <header class="bg-dark text-white text-center py-4">
        <h1>Welcome to My BabylonJS Portfolio</h1>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <ul class="navbar-nav mx-auto">
                <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown">Elements</a>
                    <div class="dropdown-menu">
                        <a class="dropdown-item" href="babylon-elements/element1.html">Element 1</a>
                        <a class="dropdown-item" href="babylon-elements/element2.html">Element 2</a>
                        <a class="dropdown-item" href="babylon-elements/element3.html">Element 3</a>
                        <a class="dropdown-item" href="babylon-elements/element4.html">Element 4</a>
                        <a class="dropdown-item" href="babylon-elements/element5.html">Element 5</a>
                        <a class="dropdown-item" href="babylon-elements/element6.html">Element 6</a>
                    </div>
                </li>
                <li class="nav-item"><a class="nav-link" href="documentation.html">Documentation</a></li>
            </ul>
        </nav>
    </header>
    <main class="container mt-5">
        <section>
            <h2>About Me</h2>
            <p>Hi! I'm Makar. I created this website to showcase my work with Babylon.js.</p>
        </section>
        <section>
            <h2>Interactive Scenes</h2>
            <ul>
                <li><a href="babylon-elements/element1.html">Basic Shapes, Lighting, and Motion</a></li>
                <li><a href="babylon-elements/element2.html">3D Environment with Textures and Terrain</a></li>
                <li><a href="babylon-elements/element3.html">Movable Player Mesh with Animations</a></li>
                <li><a href="babylon-elements/element4.html">GUI with Menu and Transitions</a></li>
                <li><a href="babylon-elements/element5.html">Switchable Scenes</a></li>
                <li><a href="babylon-elements/element6.html">Main Game</a></li>
            </ul>
        </section>
    </main>
    <footer class="bg-dark text-white text-center py-3">
        <p>&copy; 2024 Makar Klyuev. All rights reserved.</p>
    </footer>
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>
</html>

// Function to create the basic scene
const createBasicScene = function () {
    // Create a new BabylonJS scene
    const scene = new BABYLON.Scene(engine);

    // Create and position an ArcRotateCamera
    const camera = new BABYLON.ArcRotateCamera('camera', Math.PI / 2, Math.PI / 4, 20, new BABYLON.Vector3(0, 1, 0), scene);
    camera.attachControl(canvas, true);

    // Create a hemispheric light
    const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), scene);

    // Create a sphere and position it
    const sphere = BABYLON.MeshBuilder.CreateSphere('sphere', { diameter: 2 }, scene);
    sphere.position.y = 1;

    // Render loop to continuously render the scene
    engine.runRenderLoop(function () {
        scene.render();
    });

    return scene;
};
// Function to create the environment scene
const createEnvironmentScene = function () {
    // Create a new BabylonJS scene
    const scene = new BABYLON.Scene(engine);

    // Create and position an ArcRotateCamera
    const camera = new BABYLON.ArcRotateCamera('camera', Math.PI / 2, Math.PI / 4, 20, new BABYLON.Vector3(0, 1, 0), scene);
    camera.attachControl(canvas, true);

    // Create a hemispheric light
    const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), scene);

    // Create a ground mesh and apply a texture
    const ground = BABYLON.MeshBuilder.CreateGround('ground', { width: 50, height: 50 }, scene);
    const groundMaterial = new BABYLON.StandardMaterial('groundMaterial', scene);
    groundMaterial.diffuseTexture = new BABYLON.Texture('textures/grass.jpg', scene);
    ground.material = groundMaterial;

    // Render loop to continuously render the scene
    engine.runRenderLoop(function () {
        scene.render();
    });

    return scene;
};
// Function to create the player scene
const createPlayerScene = function () {
    // Create a new BabylonJS scene
    const scene = new BABYLON.Scene(engine);

    // Create and position an ArcRotateCamera
    const camera = new BABYLON.ArcRotateCamera('camera', Math.PI / 2, Math.PI / 4, 20, new BABYLON.Vector3(0, 1, 0), scene);
    camera.attachControl(canvas, true);

    // Create a hemispheric light
    const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), scene);

    // Create a player mesh and position it
    const player = BABYLON.MeshBuilder.CreateBox('player', { size: 1 }, scene);
    player.position.y = 1;

    // Add keyboard controls to move the player
    scene.onKeyboardObservable.add((kbInfo) => {
        switch (kbInfo.type) {
            case BABYLON.KeyboardEventTypes.KEYDOWN:
                if (kbInfo.event.key === 'w') {
                    player.position.z -= 0.1;
                }
                if (kbInfo.event.key === 's') {
                    player.position.z += 0.1;
                }
                if (kbInfo.event.key === 'a') {
                    player.position.x -= 0.1;
                }
                if (kbInfo.event.key === 'd') {
                    player.position.x += 0.1;
                }
                break;
        }
    });

    // Render loop to continuously render the scene
    engine.runRenderLoop(function () {
        scene.render();
    });

    return scene;
};
// Function to create the menu scene
const createMenuScene = function () {
    // Create a new BabylonJS scene
    const menuScene = new BABYLON.Scene(engine);

    // Create and position a FreeCamera
    const menuCamera = new BABYLON.FreeCamera('menuCamera', new BABYLON.Vector3(0, 0, -10), menuScene);

    // Create a hemispheric light
    const menuLight = new BABYLON.HemisphericLight('menuLight', new BABYLON.Vector3(0, 1, 0), menuScene);

    // Create a fullscreen UI for the menu
    const advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI', true, menuScene);

    // Create a play button
    const playButton = BABYLON.GUI.Button.CreateSimpleButton('playButton', 'Play Game');
    playButton.width = '200px';
    playButton.height = '50px';
    playButton.color = 'white';
    playButton.background = 'green';
    playButton.onPointerUpObservable.add(function () {
        // Transition to the main game scene when the button is clicked
        engine.stopRenderLoop();
        createMainGameScene();
    });
    advancedTexture.addControl(playButton);

    // Render loop to continuously render the scene
    engine.runRenderLoop(function () {
        menuScene.render();
    });

    return menuScene;
};
