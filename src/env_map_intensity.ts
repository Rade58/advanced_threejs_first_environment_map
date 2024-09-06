import * as THREE from "three";

import GUI from "lil-gui";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

// I had problem with changing environmentMapIntensity
// when environment map is set to reflect
// to all of our materials by using
// scene.environment = environmentMap;
// so instead we will set
// individualMesh,material,envMap = environmentMap

// we want to change intensity of environment map for every material
// of every mesh
// in this case we need to "traverse" over every material and change intensity
// because we have a model and model have bunch of meshes, and
// those meshes have material we need to chenge environment map intensity
// for

// we will use traverse method from THRE.Object3D.prototype
// we use this method on scene
// we will create function to do this (updateAllMaterials)

// we will also define with dat.gui the changing of envMapIntesity of our torus mesh material
// for material of every mesh of our model

// ------------ gui -------------------
/**
 * @description Debug UI - lil-ui
 */
const gui = new GUI({
  width: 340,
  title: "Tweak it",
  closeFolders: false,
});

/**
 * @description gui parmeters
 */
const parameters = {
  //
  "rotate model": 0,
  // default is 1 I think
  "envMapIntensity for every material of model": 5,
  "envMapIntensity for material of torusKnot": 5,
};
// gui.hide()
// ----------------------------------

//------------ canvas settings -----------
/**
 * @description canvas settings
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
// ----------------------------------------

const canvas: HTMLCanvasElement | null = document.querySelector("canvas.webgl");

if (canvas) {
  // ---- loaders -------
  /**
   * @description loaders
   */

  const gltfLoader = new GLTFLoader();
  const cubeTextureLoader = new THREE.CubeTextureLoader();

  // ------- Scene
  const scene = new THREE.Scene();

  function setEnvironmentMapForMaterialsOfModel() {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (
          child.material instanceof THREE.MeshStandardMaterial &&
          !(child.geometry instanceof THREE.TorusKnotGeometry)
        ) {
          child.material.envMap = environmentMap;
        }
      }
    });
  }

  gui
    .add(parameters, "envMapIntensity for every material of model")
    .min(1)
    .max(10)
    .step(0.001)
    .onChange(updateAllMaterials);

  // we are using this method as
  // onChange as you already saw
  /**
   * @description Update All Materials
   */
  function updateAllMaterials() {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // console.log({ child });

        // I could but I won't do anything in here
        // that is related to TorusKnow
        // We would include everything in production
        // but I won't do this here
        // because for torus knot I want to do everything separetly
        if (
          child.material instanceof THREE.MeshStandardMaterial &&
          !(child.geometry instanceof THREE.TorusKnotGeometry)
        ) {
          // we can now define setting intensity with
          // gui

          child.material.envMapIntensity =
            parameters["envMapIntensity for every material of model"];
          child.material.needsUpdate = true;
        }
      }
    });
  }

  // -------- Camera
  const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    100
  );
  camera.position.set(4, 1, -4);
  scene.add(camera);

  // -------------------------------------------

  //------------------------------------------------
  //------------------------------------------------
  //------------------------------------------------
  //------------------------------------------------
  // ----------    ENVIRONMENT MAP
  const environmentMap = cubeTextureLoader.load(
    [
      "/textures/environmentMaps/underpass/px.png",
      "/textures/environmentMaps/underpass/nx.png",
      "/textures/environmentMaps/underpass/py.png",
      "/textures/environmentMaps/underpass/ny.png",
      "/textures/environmentMaps/underpass/pz.png",
      "/textures/environmentMaps/underpass/nz.png",
    ],
    () => {
      console.log("environment map loaded");
    },
    () => {
      console.log("environment map progress");
    },
    (err) => {
      console.log("environment map loading error");
      console.error(err);
    }
  );

  scene.background = environmentMap;
  // if we do it like this
  // scene.environment = environmentMap;
  // for some reason we can't change environmentMapIntensity
  // with mentioned setting
  // so we used   individualMesh.material.envMap = environmentMap
  // after this changing on environmentMapIntensity worked

  // ----------------------------------------------
  // ----------------------------------------------
  // Meshes, Geometries, Materials
  // ----------------------------------------------
  // ----------------------------------------------
  const torusKnot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(1, 0.4, 100, 16),
    // new THREE.MeshBasicMaterial({ color: "white" })
    new THREE.MeshStandardMaterial({
      roughness: 0.3,
      metalness: 1,
      color: 0xaaaaaa,
    })
  );
  torusKnot.position.x = -4;

  // instead of single material
  // torusKnot.material.envMap = environmentMap;
  // we setted for all materials, after we load our model
  // scene.environment = environmentMap;
  // but that didn't work so we defined it like this this
  torusKnot.material.envMap = environmentMap;
  //
  // we want to change environmentMapIntensity for torus know
  // to see change we want to do it with lil gui

  scene.add(torusKnot);
  gui
    .add(parameters, "envMapIntensity for material of torusKnot")
    .min(1)
    .max(10)
    .step(0.001)
    .onChange((val: number) => {
      // console.log({ val });

      torusKnot.material.envMapIntensity = val;
      torusKnot.material.needsUpdate = true;

      // renderer.render(scene, camera); // don't need to do this
    });

  // ----------------------------------------------
  // ----------------------------------------------
  // ----------------------------------------------
  // ----------------------------------------------
  // -----------------   MODELs
  gltfLoader.load("/models/FlightHelmet/glTF/FlightHelmet.gltf", (gltf) => {
    console.log("model loaded");
    gltf.scene.scale.setScalar(10);
    gltf.scene.position.y = -4;

    gui
      .add(parameters, "rotate model")
      .onChange((a: number) => {
        gltf.scene.rotation.y = Math.PI * a;
      })
      .min(0)
      .max(2);

    scene.add(gltf.scene);

    setEnvironmentMapForMaterialsOfModel();
  });

  // -------- Controls and helpers

  const orbit_controls = new OrbitControls(camera, canvas);
  orbit_controls.enableDamping = true;

  // ----------------------------------------------
  // ----------------------------------------------

  // -------------- RENDERER
  // ----------------------------------
  const renderer = new THREE.WebGLRenderer({
    canvas,
    //To make the edges of the objects more smooth
    antialias: true,
    // alpha: true,
  });

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  // maybe this should be only inside       tick

  // ---------------------------------------------------------
  // ---------------------------------------------------------
  // ---------------------------------------------------------
  // ---------------------------------------------------------
  /**
   * Event Listeners
   */

  window.addEventListener("resize", (e) => {
    console.log("resizing");
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "h") {
      gui.show(gui._hidden);
    }
  });

  const mouse = new THREE.Vector2();
  window.addEventListener("mousemove", (_event) => {
    mouse.x = (_event.clientX / sizes.width) * 2 - 1;
    mouse.y = -(_event.clientY / sizes.height) * 2 + 1;

    // console.log({ mouse });
  });

  /* window.addEventListener("dblclick", () => {
    console.log("double click");

    // handling safari
    const fullscreenElement =
      // @ts-ignore webkit
      document.fullscreenElement || document.webkitFullScreenElement;
    //

    // if (!document.fullscreenElement) {
    if (!fullscreenElement) {
      if (canvas.requestFullscreen) {
        // go fullscreen
        canvas.requestFullscreen();

        // @ts-ignore webkit
      } else if (canvas.webkitRequestFullScreen) {
        // @ts-ignore webkit
        canvas.webkitRequestFullScreen();
      }
    } else {
      // @ts-ignore
      if (document.exitFullscreen) {
        document.exitFullscreen();

        // @ts-ignore webkit
      } else if (document.webkitExitFullscreen) {
        // @ts-ignore webkit
        document.webkitExitFullscreen();
      }
    }
  }); */

  // ---------------------- TICK -----------------------------
  // ---------------------------------------------------------
  // ---------------------------------------------------------
  // ---------------------------------------------------------

  const clock = new THREE.Clock();

  /**
   * @description tick
   */
  function tick() {
    // for dumping to work
    orbit_controls.update();

    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
  }

  tick();
}
