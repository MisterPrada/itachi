import * as THREE from 'three'
import Experience from '../Experience.js'
import gsap from "gsap";
export default class Sun {
    constructor() {
        this.experience = new Experience()
        this.debug = this.experience.debug
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.camera = this.experience.camera
        this.debug = this.experience.debug
        this.renderer = this.experience.renderer.instance
        this.timeline = this.experience.timeline

        this.parameters = {
            position: new THREE.Vector3(0, -150, 0),
            scale: new THREE.Vector3(100, 100, 100),
        }


        this.setModel()
        //this.setDebug()
    }

    setModel() {
        this.itachi = this.experience.resources.items.itachiModel.scene
        this.itachi.position.copy(this.parameters.position);
        this.itachi.scale.copy(this.parameters.scale);

        this.itachi.traverse((child) => {
            if (child.isMesh && child.name == 'model_2001') {
                //child.layers.set(5)
                this.itachiBody = child
            }

            if (child.isMesh && child.name == 'model_1') {
                this.itachiEye = child

                this.itachiEye.material.color = new THREE.Color(0xffffff)
                this.itachiEye.material.transparent = true
                this.itachiEye.material.opacity = 0.0
            }

            if (child.isMesh && child.name == 'model_2001') {
                //child.layers.enable(5)
                //child.material.emissive = new THREE.Color(0xffffff)
                child.material = new THREE.MeshLambertMaterial({
                    color: 0x000000,
                });

                child.material.side = THREE.DoubleSide
            }
        });

        this.scene.add(this.itachi);
    }

    setEyeAnimation() {
        this.timeline.add(
            gsap.to(this.itachiEye.material, {
                duration: 4,
                delay: 3,
                opacity: 1.0,
                ease: "expo.out",
                onStart: () => {
                    this.experience.sound.sharinganSound.play()
                }
            }),
            "start"
        )


        this.timeline.add(
            gsap.to(this.experience.world.godRays.postprocessing.godrayCombineUniforms.fGodRayIntensity, {
                duration: 12,
                delay: 4,
                value: 0.45,
                ease: "Power4.out",
            }),
            "start"
        )

        this.timeline.add(
            gsap.to(this.experience.world.environment.ambientLight, {
                duration: 12,
                delay: 4,
                intensity: 0.1,
                ease: "Power4.out",
            }),
            "start"
        )

        this.timeline.add(
            gsap.to(this.experience.world.godRays.sunPosition, {
                duration: 16,
                delay: 5,
                y: 1000.0,
                ease: "Power4.out",
            }),
            "start"
        )

        this.timeline.add(
            gsap.to(this.experience.world.godRays.bloomPass, {
                duration: 4,
                //delay: 1,
                strength: 2.59,
                ease: "Power4.out",
            }),
            "start"
        )
    }

    update() {
        this.material.uniforms.uTime.value = this.time.elapsed * 0.1
        this.sun.lookAt(this.camera.instance.position)
    }

    setDebug() {
        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('Sun')
            this.debugFolder.add(this.sun.position, 'x').min(-10).max(10).step(0.1).name('position x')
            this.debugFolder.add(this.sun.position, 'y').min(-10).max(10).step(0.1).name('position y')
            this.debugFolder.add(this.sun.position, 'z').min(-10).max(10).step(0.1).name('position z')

            this.debugFolder.add(this.sun.scale, 'x').min(-20).max(20).step(0.1).name('scale x')
            this.debugFolder.add(this.sun.scale, 'y').min(-20).max(20).step(0.1).name('scale y')
            this.debugFolder.add(this.sun.scale, 'z').min(-20).max(20).step(0.1).name('scale z')
        }
    }
}
