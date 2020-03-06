if (!Detector.webgl) Detector.addGetWebGLMessage();

var container, stats, controls;
var camera, scene, renderer, light;
//document.body.appendChild( renderer.domElement );
var ancho = 600;
var alto = 600;
var startTime = Date.now();

var niebla;

var afterimagePass;
var proceso = {
  enable: true
};

var color;
//var clock = new THREE.Clock();
var params = {
  scale: 1
};

//var mixers = [];

init();
//createGUI();
animate();

function init() {
  container = document.getElementById("my3D");
  Barco = new THREE.Object3D();

  //document.body.appendChild(container);

  camera = new THREE.PerspectiveCamera(45, ancho / alto, 1, 2000);
  camera.lookAt(Barco.position);
  camera.position.set(150, 0, 150);
  camera.rotation.x = 15 * (Math.PI / 180);
  //camera.rotation.y = 165;
  //camera.rotation.y = (90 * Math.PI) / 180;

  scene = new THREE.Scene();
  //scene.background = new THREE.Color(0x3aafa9);

  // scene.add( new THREE.CameraHelper( light.shadow.camera ) );

  // PISO

  // scene.add( mesh );

  var material = new THREE.MeshLambertMaterial({
    color: 0x3aafa9,
    //specular: 0x83ccd2,
    //shininess: 30,

    opacity: 0.1,
    transparent: true
  });

  var geometry = new THREE.PlaneBufferGeometry(3000, 3000);
  var mesh2 = new THREE.Mesh(geometry, material);
  mesh2.position.set(0, -30, 0);
  mesh2.rotation.x = -Math.PI / 2;
  mesh2.castShadow = true;
  mesh2.receiveShadow = true;
  //scene.add(mesh2);
  var loader = new THREE.GLTFLoader();
  loader.load("fbx/5/scene.gltf", function(gltf) {
    gltf.scene.traverse(function(child) {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    car = gltf.scene.children[0];

    car.scale.set(12, 12, 12);
    car.position.set(80, 40, -80);
    Barco.add(gltf.scene);
    Barco.rotation.y = 20 * (Math.PI / 180);
    Barco.castShadow = true;
    Barco.receiveShadow = true;
    scene.add(Barco);
    animate();
  });

  var loader = new THREE.FBXLoader();
  loader.load("fbx/14.fbx", function(object) {
    object.traverse(function(child) {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    //Barco.add(object);

    //scene.add(Barco);
  });

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(ancho, alto);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  container.appendChild(renderer.domElement);

  window.addEventListener("resize", onWindowResize, false);

  // stats
  //stats = new Stats();
  //container.appendChild(stats.dom);

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  controls.target.set(-100, -50, 0);
  //controls.minDistance = 300;
  //controls.maxDistance = 800;
  controls.enableRotate = false;
  controls.enablePan = false;
  controls.enableZoom = false;

  controls.update();

  //LIGHTS
  lightP1 = new THREE.PointLight(0xff9000, 1);
  lightP1.position.set(0, 300, 500);
  scene.add(lightP1);
  lightP2 = new THREE.PointLight(0x546aff, 1);
  lightP2.position.set(500, 100, 0);
  scene.add(lightP2);
  lightP3 = new THREE.PointLight(0xff9000, 1);
  lightP3.position.set(0, 100, -500);
  scene.add(lightP3);
  lightP4 = new THREE.PointLight(0x546aff, 1);

  lightP4.position.set(-500, 300, 500);
  scene.add(lightP4);

  light = new THREE.HemisphereLight(0xffffff, 0x444444);
  light.castShadow = true;
  light.position.set(0, 200, 0);
  //scene.add(light);

  lightDR = new THREE.DirectionalLight(0x450c40, 5);
  lightDR.position.set(0, 200, 100);
  lightDR.castShadow = true;
  lightDR.shadow.camera.top = 180;
  lightDR.shadow.camera.bottom = -100;
  lightDR.shadow.camera.left = -120;
  lightDR.shadow.camera.right = 120;
  lightDR.shadowMapWidth = 1024;
  lightDR.shadowMapHeight = 1024;
  //scene.add(lightDR);

  var lightA = new THREE.AmbientLight(0x514493, 0.5);
  scene.add(lightA);

  niebla = new THREE.Fog(0x8ce7f4, 0, 750);
  scene.fog = niebla;

  composer = new THREE.EffectComposer(renderer);
  composer.addPass(new THREE.RenderPass(scene, camera));
  afterimagePass = new THREE.AfterimagePass();
  afterimagePass.renderToScreen = true;
  composer.addPass(afterimagePass);
  //window.addEventListener( 'resize', onWindowResize, false );
}

var t = 0;
function animate() {
  requestAnimationFrame(animate);
  var dtime = Date.now() - startTime;

  /*if ( mixers.length > 0 ) {

					for ( var i = 0; i < mixers.length; i ++ ) {

						mixers[ i ].update( clock.getDelta() );

					}

				}*/
  t += 0.1;
  //Barco.rotation.y = Math.sin(t / 100);
  camera.position.y = 6 * Math.sin(t / 18);

  //camera.position.x = 100 * Math.cos(t / 100);
  //camera.position.z = 100 * Math.sin(t / 100);

  camera.lookAt(scene.position);
  //object.translate.y += 1.0 + 0.3*Math.sin(dtime/300);

  //renderer.render( scene, camera );

  //if (proceso.enable) {
  //composer.render();
  //} else {

  renderer.render(scene, camera);
  //}

  //stats.update();
}
