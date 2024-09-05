import * as THREE from "three";
import { OrbitControls, GLTFLoader } from "three/examples/jsm/Addons.js";
//
import GUI from "lil-gui";
// import gsap from "gsap";
// import CANNON from "cannon";

/**
 * @description Debug UI - lil-ui
 */
const gui = new GUI({
  width: 340,
  title: "Tweak it",
  closeFolders: false,
});

// gui.hide();
// gui parameters
const parameters = {
  // floorMaterialColor: "#89898b",
};

const sizes = {
  // width: 800,
  width: window.innerWidth,
  // height: 600,
  height: window.innerHeight,
};

const canvas: HTMLCanvasElement | null = document.querySelector("canvas.webgl");

if (canvas) {
  const scene = new THREE.Scene();

  const gltfLoader = new GLTFLoader();

  gltfLoader.load("/models/FlightHelmet/glTF/FlightHelmet.gltf", (gltf) => {
    console.log("model loaded");
    console.log({ gltf });
    gltf.scene.scale.setScalar(10);

    scene.add(gltf.scene);
  });

  // ------ LIGHTS ---------------------------------------------------
  // -----------------------------------------------------------------
  // -----------------------------------------------------------------
  // -----------------------------------------------------------------

  /**
   * Lights
   */
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(7, 9, -7);
  scene.add(directionalLight);

  // ---------------------------- setup-------------------------------
  // -----------------------------------------------------------------
  const torusKnot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(1, 0.4),
    new THREE.MeshBasicMaterial({ color: "white" })
  );
  torusKnot.position.x = -6;
  scene.add(torusKnot);

  // -----------------------------------------------------------------
  // -----------------------------------------------------------------

  //  GUI

  /* gui.addColor(parameters, "floorMaterialColor").onChange(() => {
    floorMaterial.color.set(parameters.floorMaterialColor);
  }); */

  // -----------------------------------------------------------------------
  // -----------------------------------------------------------------------
  // -----------------------------------------------------------------------

  // we don't need this, it is from previous group of lessons to show how we can move group
  // instead of camera
  // I kept this for no reason
  const cameraGroup = new THREE.Group();
  scene.add(cameraGroup);

  const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,

    0.1,
    100
  );

  camera.position.z = 8;
  camera.position.x = 4;
  camera.position.y = 4;

  cameraGroup.add(camera);
  // scene.add(camera);

  // ------ HELPERS ----------------------------------
  // -------------------------------------------------
  // -------------------------------------------------
  // -------------------------------------------------

  const axHelp = new THREE.AxesHelper(4);
  axHelp.setColors("red", "green", "blue");
  scene.add(axHelp);

  const directionalLightCameraHelper = new THREE.CameraHelper(
    directionalLight.shadow.camera
  );
  scene.add(directionalLightCameraHelper);

  axHelp.visible = false;
  directionalLightCameraHelper.visible = false;

  // -------------------------------------------------
  // -------------------------------------------------
  // -------------------------------------------------
  // -------------------------------------------------

  // orbit controls
  const orbit_controls = new OrbitControls(camera, canvas);
  // orbit_controls.enabled = false
  orbit_controls.enableDamping = true;
  // -------------------------------------------------
  // -------------------------------------------------
  // -------------------------------------------------
  // -------------------------------------------------

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
  });

  // for shadows to work
  // ------ ACTIVATE SHADOW MAP ------
  //--------------------------------------------------
  renderer.shadowMap.enabled = true;
  // shadow algos
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  //--------------------------------------------------
  //--------------------------------------------------

  // handle pixel ratio
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(sizes.width, sizes.height);
  renderer.render(scene, camera);

  // -------------------------------------------------
  // -------------------------------------------------
  // -------------------------------------------------
  // -------------------------------------------------
  // -------------------------------------------------
  // -------------------------------------------------
  // toggle debug ui on key `h`
  window.addEventListener("keydown", (e) => {
    if (e.key === "h") {
      gui.show(gui._hidden);
    }
  });

  // --------------------------------------------------
  // --------------------------------------------------

  // ON mousemove HANDLER
  // -------------------------------------------------------
  // -------------------------------------------------------
  // -------------------------------------------------------
  // -------------------------------------------------------
  /**
   *  Mousemove
   */
  const mouse = new THREE.Vector2();
  window.addEventListener("mousemove", (_event) => {
    mouse.x = (_event.clientX / sizes.width) * 2 - 1;
    mouse.y = -(_event.clientY / sizes.height) * 2 + 1;

    // console.log({ mouse });
  });
  // -------------------------------------------------------
  // -------------------------------------------------------
  // -------------------------------------------------------
  // -------------------------------------------------------
  // -------------------------------------------------------

  // --------------------------------------------------

  //

  // -----------------------------------------------
  // -----------------------------------------------
  // -----------------------------------------------
  // -----------------------------------------------
  // ------------- Animation loop ------------------
  const clock = new THREE.Clock();

  const tick = () => {
    //
    const elapsedTime = clock.getElapsedTime();

    // const objectsToIntersect = [object1, object2, object3];

    // from previous example

    // for dumping to work
    orbit_controls.update();

    renderer.render(scene, camera);

    window.requestAnimationFrame(tick);
  };

  tick();

  // ------------------------------------------------------
  // --------------- handle resize ------------------------
  window.addEventListener("resize", (e) => {
    console.log("resizing");
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  // ------------------------------------------------------
  // ----------------- enter fulll screen with double click

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
}
