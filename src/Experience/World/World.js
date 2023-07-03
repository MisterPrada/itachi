import Experience from '../Experience.js'
import Environment from './Environment.js'
import Itachi from './Itachi.js'
import GodRays from './GodRays.js'
import Crow from './Crow.js'

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.camera = this.experience.camera;
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.html = this.experience.html
        this.sound = this.experience.sound

        // Wait for resources
        this.resources.on('ready', () =>
        {
            this.html.playButton.classList.add("fade-in");
            this.html.playButton.addEventListener('click', () => {

                this.html.playButton.classList.replace("fade-in", "fade-out");
                this.sound.createSounds();

                setTimeout(() => {
                    this.experience.time.start = Date.now()
                    this.experience.time.elapsed = 0

                    // Setup
                    this.godRays = new GodRays()
                    this.itachi = new Itachi()
                    this.crow = new Crow()
                    this.environment = new Environment()

                    // Remove preloader
                    this.html.preloader.classList.add("preloaded");
                    setTimeout(() => {
                        this.html.preloader.remove();
                    }, 2500);

                    // Animation timeline
                    this.animationPipeline();
                }, 100);
            }, { once: true });
        })
    }

    animationPipeline() {
        if (this.itachi)
            this.itachi.setEyeAnimation()

        if (this.camera)
            this.camera.animateCameraPosition();
    }

    resize() {
        if (this.godRays)
            this.godRays.resize()
    }

    update()
    {
        if (this.godRays)
            this.godRays.update()

        if (this.crow)
            this.crow.update()

        if (this.itachi)
            this.itachi.update()
    }
}
