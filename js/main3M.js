if (!Detector.webgl) Detector.addGetWebGLMessage();

var containerM, stats, controls;
var cameraM, sceneM, rendererM, light;
var ancho = 500;
var alto = 500;
var niebla;
var clock = new THREE.Clock();

var mixers = [];

init();
animateM();

function init() {
  containerM = document.getElementById("my3M");
  Materia = new THREE.Object3D();

  cameraM = new THREE.PerspectiveCamera(45, ancho / alto, 1, 2000);
  //camera.lookAt(Materia.position);
  cameraM.position.set(60, 5, 0);

  controls = new THREE.OrbitControls(cameraM);
  controls.target.set(0, 15, 0);
  //controls.minDistance = 70;
  //controls.maxDistance = 600;
  controls.enablePan = false;
  controls.enableZoom = false;
  controls.update();

  sceneM = new THREE.Scene();
  //scene.background = new THREE.Color( 0xa0a0a0 );
  //sceneM.fog = new THREE.Fog(0x3aafa9, 50, 400);
  lightP1 = new THREE.PointLight(0xdd3ef0, 0.35);
  lightP1.position.set(0, 300, 500);
  sceneM.add(lightP1);
  lightP2 = new THREE.PointLight(0x3ef0da, 0.35);
  lightP2.position.set(500, 100, 0);
  sceneM.add(lightP2);
  lightP3 = new THREE.PointLight(0xdd3ef0, 0.35);
  lightP3.position.set(0, 100, -500);
  sceneM.add(lightP3);
  lightP4 = new THREE.PointLight(0x3ef0da, 0.35);

  lightP4.position.set(-500, 300, 500);
  sceneM.add(lightP4);

  light = new THREE.HemisphereLight(0xffffff, 0x444444);
  light.position.set(0, 200, 0);
  sceneM.add(light);

  light = new THREE.DirectionalLight(0x3ef0da, 1);
  light.position.set(0, 200, 100);
  light.castShadow = true;
  light.shadow.camera.top = 180;
  light.shadow.camera.bottom = -100;
  light.shadow.camera.left = -120;
  light.shadow.camera.right = 120;
  light.shadowMapWidth = 1024;
  light.shadowMapHeight = 1024;
  sceneM.add(light);

  var lightA = new THREE.AmbientLight(0xa0eee1, 0.5);

  sceneM.add(lightA);

  // sceneM.add( new THREE.CameraHelper( light.shadow.camera ) );

  // ground
  /*
  var mesh = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(2000, 2000),
    new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false })
  );
  mesh.rotation.x = -Math.PI / 2;
  mesh.receiveShadow = true;
  //scene.add( mesh );*/

  // model

  var loader = new THREE.FBXLoader();
  loader.load("fbx/Idle.fbx", function(object) {
    object.mixer = new THREE.AnimationMixer(object);
    mixers.push(object.mixer);

    var action = object.mixer.clipAction(object.animations[0]);
    action.play();

    object.traverse(function(child) {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    //scene.add( object );
    Materia.add(object);
    Materia.rotation.y = 80 * (Math.PI / 180);

    sceneM.add(Materia);
  });

  rendererM = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  rendererM.setPixelRatio(window.devicePixelRatio);
  rendererM.setSize(ancho, alto);
  rendererM.shadowMap.enabled = true;
  containerM.appendChild(rendererM.domElement);

  window.addEventListener("resize", onWindowResize, false);
}

function onWindowResize() {
  cameraM.aspect = ancho / alto;
  cameraM.updateProjectionMatrix();

  rendererM.setSize(ancho, alto);
}

//

function animateM() {
  requestAnimationFrame(animateM);
  if (mixers.length > 0) {
    for (var i = 0; i < mixers.length; i++) {
      mixers[i].update(clock.getDelta());
    }
  }

  rendererM.render(sceneM, cameraM);

  //stats.update();
}
