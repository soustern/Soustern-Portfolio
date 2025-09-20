// src/js/WebGL.js

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Flowmap from './hero_video_hover.js';

// NEW: Import EffectComposer and the necessary passes
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';

// Import your existing shaders
import vertex from '../shader/vertex.glsl';
import fragment from '../shader/fragment.glsl';

// NEW: Import our new post-processing shaders
import postproVertex from '../shader/postproVertex.glsl';
import gradientMapFragment from '../shader/gradientMapFragment.glsl';

export default class WebGL {
  constructor() {
    this.container = document.querySelector('[data-webgl]');

    this.links = [...document.querySelectorAll('[data-webgl-link]')];
    this.links.forEach((link) => {
      link.addEventListener('mouseenter', () => {
        this.flowmap.mouseMoved = true;
      });
    });

    // NEW: Define composer properties that will be created in the setup methods
    this.composer = null;
    this.gradientMapPass = null;
  }

  init() {
    this._setRenderer();
    this._setCamera();
    this._setMesh();
    this._setControlls();
    
    // NEW: Call the post-processing setup method
    this._setPostProcess();
    
    this._setClock();
    this._setEvents();
  }

  _setRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
    this.container.appendChild(this.renderer.domElement);
  }

  _setCamera() {
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 0, 1);
    this.camera.lookAt(0, 0, 0);

    this.scene = new THREE.Scene();
  }

  _setControlls() {
    this.controlls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controlls.enableDamping = true;
  }

  _setMesh() {
    this.geometry = new THREE.PlaneGeometry(2, 2);

    this.video = document.createElement('video');
    this.video.src = '/mov/mov.mp4';
    this.video.muted = true;
    this.video.loop = true;
    this.video.play();
    const videoTexture = new THREE.VideoTexture(this.video);

    this.flowmap = new Flowmap(this.renderer);

    this.material = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms: {
        uTime: {
          value: 0,
        },
        uRatio: {
          value: window.innerWidth / window.innerHeight,
        },
        tDiffuse: {
          value: videoTexture,
        },
        tFlow: {
          value: this.flowmap.texture,
        },
      },
      side: THREE.DoubleSide,
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);
  }

  // NEW: This entire method sets up the post-processing pipeline
  _setPostProcess() {
    // 1. Create the EffectComposer. This object will manage our render passes.
    this.composer = new EffectComposer(this.renderer);

    // 2. The first pass is always to render the original scene.
    const renderPass = new RenderPass(this.scene, this.camera);
    this.composer.addPass(renderPass);

    // 3. Define our custom gradient shader as the second pass.
    this.gradientMapPass = new ShaderPass({
      uniforms: {
        'tDiffuse': { value: null }, // Provided by the composer with the scene's rendered texture
        'uColorA': { value: new THREE.Color(0x2424fa) }, // A deep blue for darks
        'uColorB': { value: new THREE.Color(0xfab124) }, // A warm orange for lights
        'uMixAmount': { value: 0.8 } // Start with a strong, but not total, effect
      },
      vertexShader: postproVertex,
      fragmentShader: gradientMapFragment
    });

    // 4. Add our custom pass to the composer's pipeline.
    this.composer.addPass(this.gradientMapPass);
  }

  _setClock() {
    this.clock = new THREE.Clock();
  }

  _setEvents() {
    this.renderer.setAnimationLoop(() => {
      this.render();
    });

    window.addEventListener('resize', () => {
      this.onResize();
    });
  }

  render() {
    const elapsedTime = this.clock.getElapsedTime();

    this.flowmap.update();
    this.controlls.update();
    this.material.uniforms.uTime.value = elapsedTime;

    // CHANGED: We now render using the composer instead of the renderer directly.
    // The composer will handle calling the renderer for the initial pass.
    // this.renderer.render(this.scene, this.camera); // This line is no longer needed.
    
    if (this.composer) {
      this.composer.render();
    }
  }

  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth, window.innerHeight);

    // NEW: It's crucial to also resize the composer.
    if (this.composer) {
      this.composer.setSize(window.innerWidth, window.innerHeight);
    }
  }
}