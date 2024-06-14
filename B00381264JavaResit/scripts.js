// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {

    // Element 1: Basic Shapes, Lighting, and Motion
    const canvasElement1 = document.getElementById('renderCanvas1');

    if (canvasElement1) {
        const engine1 = new BABYLON.Engine(canvasElement1, true);

        createScene1(engine1, canvasElement1);

        // Resize the babylon engine when the window is resized
        window.addEventListener('resize', function () {
            engine1.resize();
        });
    }

    function createScene1(engine, canvas) {
        const scene = new BABYLON.Scene(engine);

        // Create your scene content here
        // Example: Basic shapes, lighting, and motion

        // Run the render loop
        engine.runRenderLoop(function () {
            scene.render();
        });
    }

    // Element 2: 3D Environment with Textures and Terrain
    const canvasElement2 = document.getElementById('renderCanvas2');

    if (canvasElement2) {
        const engine2 = new BABYLON.Engine(canvasElement2, true);

        createScene2(engine2, canvasElement2);

        window.addEventListener('resize', function () {
            engine2.resize();
        });
    }

    function createScene2(engine, canvas) {
        const scene = new BABYLON.Scene(engine);

        // Create your scene content here
        // Example: 3D environment with textures and terrain

        // Run the render loop
        engine.runRenderLoop(function () {
            scene.render();
        });
    }

    // Element 3: Movable Player Mesh with Animations
    const canvasElement3 = document.getElementById('renderCanvas3');

    if (canvasElement3) {
        const engine3 = new BABYLON.Engine(canvasElement3, true);

        createScene3(engine3, canvasElement3);

        window.addEventListener('resize', function () {
            engine3.resize();
        });
    }

    function createScene3(engine, canvas) {
        const scene = new BABYLON.Scene(engine);

        // Create your scene content here
        // Example: Movable player mesh with animations

        // Run the render loop
        engine.runRenderLoop(function () {
            scene.render();
        });
    }

    // Element 4: GUI with Menu and Transitions
    const canvasElement4 = document.getElementById('renderCanvas4');

    if (canvasElement4) {
        const engine4 = new BABYLON.Engine(canvasElement4, true);

        createScene4(engine4, canvasElement4);

        window.addEventListener('resize', function () {
            engine4.resize();
        });
    }

    function createScene4(engine, canvas) {
        const scene = new BABYLON.Scene(engine);

        // Create your scene content here
        // Example: GUI with menu and transitions

        // Run the render loop
        engine.runRenderLoop(function () {
            scene.render();
        });
    }

    // Element 5: Switchable Scenes
    const canvasElement5 = document.getElementById('renderCanvas5');

    if (canvasElement5) {
        const engine5 = new BABYLON.Engine(canvasElement5, true);

        createScene5(engine5, canvasElement5);

        window.addEventListener('resize', function () {
            engine5.resize();
        });
    }

    function createScene5(engine, canvas) {
        const scene = new BABYLON.Scene(engine);

        // Create your scene content here
        // Example: Switchable scenes

        // Run the render loop
        engine.runRenderLoop(function () {
            scene.render();
        });
    }

});
