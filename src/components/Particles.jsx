import React, {  useEffect } from "react";
import "./particles.css";
const Particles = ({imageData}) => {
  useEffect(() => {
    if (imageData && imageData.length > 0) {
    for (let i = 0; i < imageData.length; i++) {
      const canvas = document.getElementById(`canvas${i}`);
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const vw = window.innerWidth / 100;
      canvas.width = 22 * vw;
      canvas.height = 22 * vw;
      // One Particle
      class Particle {
        constructor(effect, x, y, color) {
          this.effect = effect;
          this.x = Math.random() * this.effect.width;
          this.y = Math.random() * this.effect.height;
          this.originX = Math.floor(x);
          this.originY = Math.floor(y);
          this.color = color;
          this.size = this.effect.gap;
          this.vx = Math.random() * 2 - 1;
          this.vy = Math.random() * 2 - 1;
          this.ease = 0.1;
          this.friction = 0.95;
          //   for mouse Events
          this.dx = 0;
          this.dy = 0;
          this.distance = 0;
          this.force = 0;
          this.angle = 0;
        }

        draw(context) {
          context.fillStyle = this.color;
          // context.fillRect(this.x, this.y, this.size, this.size); // for rectangles
          context.beginPath();
          context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          context.fill();
        }
        update() {
          this.dx = this.effect.mouse.x - this.x;
          this.dy = this.effect.mouse.y - this.y;
          this.distance = (this.dx * this.dx + this.dy * this.dy);
          this.force = -this.effect.mouse.radius / this.distance;

          if (this.distance < this.effect.mouse.radius) {
            this.angle = Math.atan2(this.dy, this.dx);
            this.vx += this.force * Math.cos(this.angle);
            this.vy += this.force * Math.sin(this.angle);
          }
          this.x +=
            (this.vx *= this.friction) + (this.originX - this.x) * this.ease;
          this.y +=
            (this.vy *= this.friction) + (this.originY - this.y) * this.ease;
        }
        
      }

      // Handling  Particles at the same time
      class Effect {
        constructor(width, height,canvas) {
          this.width = width;
          this.height = height;
          this.canvas =canvas;
          this.particlesArray = [];
          this.image = document.getElementById(`image${i}`);
          //   to Center The Image in canvas
          this.centerX = this.width * 0.5;
          this.centerY = this.height * 0.5;
          this.x = this.centerX - this.image.width * 0.5;
          this.y = this.centerY - this.image.height * 0.5;
          //   to Center The Image in canvas
          this.gap = 2;
          // mouse interactions
          this.mouse = { radius: 500, x: undefined, y: undefined };
          this.handleMouseMove = this.handleMouseMove.bind(this);
          this.canvas.addEventListener('mousemove', this.handleMouseMove);
            // this.canvas.addEventListener("mousemove", (event) => {
            //   console.log(`Mouse event is trigered`);
            //   this.mouse.x = event.clientX;
            //   this.mouse.y = event.clientY;
            //   console.log(`Mouse: x=${this.mouse.x}, y=${this.mouse.y}`)
            // });
        }

        handleMouseMove(event) {
          const rect = this.canvas.getBoundingClientRect();
          this.mouse.x = event.clientX - rect.left;
          this.mouse.y = event.clientY - rect.top;
        }

        init(context) {
          context.drawImage(this.image, this.x, this.y);
          const pixels = context.getImageData(
            0,
            0,
            this.width,
            this.height
          ).data;
          for (let y = 0; y < this.height; y += this.gap) {
            for (let x = 0; x < this.width; x += this.gap) {
              const index = (y * this.width + x) * 4;
              const red = pixels[index];
              const green = pixels[index + 1];
              const blue = pixels[index + 2];
              const alpha = pixels[index + 3];
              const color = "rgb(" + red + "," + green + "," + blue + ")";
              if (alpha > 0) {
                this.particlesArray.push(new Particle(this, x, y, color));
              }
            }
          }
        }

        draw(context) {
          this.particlesArray.forEach((particle) => {
            particle.draw(context);
          });
          //   context.drawImage(this.image, this.x, this.y);
        }

        update() {
          this.particlesArray.forEach((particle) => particle.update());
          //   const effect = new effect(canvas.width, canvas.height);
          //   effect.init(ctx);
        }
      }
      const effect = new Effect(canvas.width, canvas.height,canvas);
      effect.init(ctx);

      // Animate the Particles
      function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        effect.draw(ctx);
        effect.update();
        requestAnimationFrame(animate);
      }
      animate();
    }
  }
  }, [imageData]);

  // if (!imageData || imageData.length === 0) {
  //   return <div>Loading...</div>;
  // }

  return (
    <>
      {imageData.map((image, index) => (
        <div className="icon" key={`This is the key${index}`}>
          <canvas
            id={`canvas${index}`}
          ></canvas>
          <img src={image.image64} id={`image${index}`} />
        </div>
      ))}
    </>
  );
};

export default Particles;
