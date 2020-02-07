if (!Detector.webgl) Detector.addGetWebGLMessage();

var container, stats, controls;
var camera, scene, renderer, light;
//document.body.appendChild( renderer.domElement );
var ancho = 400;
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
  camera.position.set(-300, 180, 150);

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

  var loader = new THREE.FBXLoader();
  loader.load("fbx/Barco_04.fbx", function(object) {
    object.traverse(function(child) {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    Barco.add(object);

    scene.add(Barco);
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

  controls.target.set(0, 100, 0);
  //controls.minDistance = 300;
  //controls.maxDistance = 800;
  controls.enablePan = false;
  controls.enableZoom = false;

  controls.update();

  //LIGHTS

  //light = new THREE.HemisphereLight( 0xfff68f, 0xfa8072, 0.1);
  //light.position.set( 0, 200, 0 );
  //scene.add( light );

  lightA = new THREE.AmbientLight(0xfff68f, 1);
  scene.add(lightA);

  light = new THREE.DirectionalLight(0xfff68f, 1.4);

  light.position.set(50, 200, 200);
  light.castShadow = true;
  light.shadow.camera.top = 180;
  light.shadow.camera.bottom = -100;
  light.shadow.camera.left = -120;
  light.shadow.camera.right = 120;
  light.shadow.mapSize.width = 2048 * 2;
  light.shadow.mapSize.height = 2048 * 2;
  light.target = Barco;

  scene.add(light);

  niebla = new THREE.Fog(0x3aafa9, 50, 460);
  scene.fog = niebla;

  composer = new THREE.EffectComposer(renderer);
  composer.addPass(new THREE.RenderPass(scene, camera));
  afterimagePass = new THREE.AfterimagePass();
  afterimagePass.renderToScreen = true;
  composer.addPass(afterimagePass);
  //window.addEventListener( 'resize', onWindowResize, false );
}
/*
function createGUI() {
  var gui = new dat.GUI();

  var parametro = {
    "light color": light.color.getHex(),
    "niebla color": niebla.color.getHex()
  };

  var geo = gui.addFolder("Geometria");
  //geo.add(Barco.scale, 'x', 0.5, 1.5).name('Width').listen();
  //geo.add(Barco.scale, 'y', 0.5, 1.5).name('Height').listen();
  //geo.add(Barco.scale, 'z', 0.5, 1.5).name('Depth').listen();
  geo
    .add(params, "scale", 0.4, 1.2)
    .name("Escala")
    .onChange(function(value) {
      setScale();
    });

  geo.open();

  var sce = gui.addFolder("Escenario");
  sce
    .add(niebla, "near", 0, 400)
    .name("Niebla Near")
    .listen();
  sce
    .add(niebla, "far", 400, 1000)
    .name("Niebla Far")
    .listen();
  sce
    .add(light, "intensity", 0, 5)
    .name("Intensidad Luz")
    .listen();
  sce
    .addColor(parametro, "light color")
    .name("Color Luz")
    .onChange(function(val) {
      light.color.setHex(val);
      //render();
    });

  sce
    .addColor(parametro, "niebla color")
    .name("Color nie")
    .onChange(function(val) {
      niebla.color.setHex(val);
      //render();
    });

  sce.open();
  //sce.add(light.intensity, 1, 100).name('Luz').listen();

  var post = gui.addFolder("Post-Proceso");
  post
    .add(afterimagePass.uniforms["damp"], "value", 0, 1)
    .name("Valor")
    .step(0.001);
  post.add(proceso, "enable");
  post.open();
}*/

function onWindowResize() {
  camera.aspect = ancho / alto;
  camera.updateProjectionMatrix();

  renderer.setSize(ancho, alto);
  composer.setSize(ancho, alto);
}

//
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
  Barco.position.y = 5 * Math.sin(t / 1.5);
  Barco.position.x = 3 * Math.sin(t / 1.7);
  Barco.position.z = 2 * Math.sin(t / 2.3);
  //object.translate.y += 1.0 + 0.3*Math.sin(dtime/300);

  //renderer.render( scene, camera );

  if (proceso.enable) {
    composer.render();
  } else {
    renderer.render(scene, camera);
  }

  //stats.update();
}
