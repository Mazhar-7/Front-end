import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import Loader from "./components/Loader.jsx";
import { projectsData, imageData } from "./assets/data";
import Particles from "./components/Particles.jsx";
import Resume from "./assets/Front-end-webDev.pdf";

function App() {
  const [imageScale, setImageScale] = useState({ 0: 0, 1: 0, 2: 0 });
  console.log(`this is state  value for  value:${imageScale}`);
  const [textReveals, setTextReveals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [click, setClick] = useState(false);
  const cursorRef = useRef(null);
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const section4Ref = useRef(null);
  // (*********** To Add loader**************)
  // // // / / / / / / /  / / / / / / / / /  / / / / / / / / / / / / / / / / / / / /
  //  // // // / / / / / / /  / / / / / / / / /  / / / / / / / / / / / / / / / / / / / /

  useEffect(() => {
    // Simulate a delay to demonstrate the loader
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  // (*********** To Add Cursor**************)
  // // // / / / / / / /  / / / / / / / / /  / / / / / / / / / / / / / / / / / / / /
  //  // // // / / / / / / /  / / / / / / / / /  / / / / / / / / / / / / / / / / / / / /
  useEffect(() => {
    if (!loading) {
      const handleMouseMove = ({ clientX, clientY }) => {
        const scrollLeft =
          document.documentElement.scrollLeft || document.body.scrollLeft;
        const scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop;
        const absoluteX = clientX + scrollLeft;
        const absoluteY = clientY + scrollTop;

        if (cursorRef.current) {
          cursorRef.current.style.position = "absolute";
          cursorRef.current.style.left = `${absoluteX}px`;
          cursorRef.current.style.top = `${absoluteY}px`;
        }
      };

      document.addEventListener("mousemove", handleMouseMove);

      const triggerElements = document.querySelectorAll(
        "img,a,ul,li,span,p,[textContent]"
      );
      const handleMouseOver = () => {
        cursorRef.current.style.transform = "scale(1.8)";
      };
      const handleMouseOut = () => {
        cursorRef.current.style.transform = "scale(1)";
      };

      triggerElements.forEach((element) => {
        element.addEventListener("mouseover", handleMouseOver);
        element.addEventListener("mouseout", handleMouseOut);
      });

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        triggerElements.forEach((element) => {
          element.removeEventListener("mouseover", handleMouseOver);
          element.removeEventListener("mouseout", handleMouseOut);
        });
      };
    }
  }, [loading]);

  // (*********** To Add Text Reveal Animation**************)
  // // // / / / / / / /  / / / / / / / / /  / / / / / / / / / / / / / / / / / / / /
  //  // // // / / / / / / /  / / / / / / / / /  / / / / / / / / / / / / / / / / / / / /

  useEffect(() => {
    if (!loading) {
      const callback = (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const spans = entry.target.querySelectorAll("span");
            spans.forEach((span, idx) => {
              span.style.transform = `translateY(100%)`; // reset the transform
              setTimeout(() => {
                span.style.transform = `translateY(0)`;
              }, (idx + 1) * 50);
            });
          } else {
            const spans = entry.target.querySelectorAll("span");
            spans.forEach((span, idx) => {
              span.style.transform = `translateY(100%)`; // reset the transform
            });
          }
        });
      };

      const options = {
        rootMargin: "0px",
        threshold: 1.0,
      };

      const observer = new IntersectionObserver(callback, options);

      const textElements = document.querySelectorAll(".text__reveal");
      setTextReveals(textElements);

      textElements.forEach((text) => {
        const string = text.innerText;
        let html = "";
        for (let i = 0; i < string.length; i++) {
          html += `<span>${string[i]}</span>`;
        }
        text.innerHTML = html;
        observer.observe(text);
      });
    }
  }, [loading]);
  // (*********** To Add Animations when  project section is in view**************)
  // // // / / / / / / /  / / / / / / / / /  / / / / / / / / / / / / / / / / / / / /
  //  // // // / / / / / / /  / / / / / / / / /  / / / / / / / / / / / / / / / / / / / /
  useEffect(() => {
    if (!loading) {
      function scrollImage() {
        const projectContainerTop = document
          .querySelector(".f")
          .getBoundingClientRect().top;
        const imageElements = document.querySelectorAll("#image");
        imageElements.forEach((image, index) => {
          if (image.parentElement.getBoundingClientRect().top <= 1) {
            let offset =
              (projectContainerTop + window.innerHeight * index) * 0.0005;
              console.log(`this is offset value for index ${index}, value:${offset}`);
            offset = offset < -1 ? -1 : offset >= 0 ? 0 : offset;
            setImageScale((prevScale) => ({
              ...prevScale,
              [index]: 1+offset ,
            }));
          }
        });
      }

      window.addEventListener("scroll", scrollImage);

      return () => {
        window.removeEventListener("scroll", scrollImage);
      };
    }
  }, [loading]);

  // (*********** To Add Animations when Circle section is in view**************)
  // // // / / / / / / /  / / / / / / / / /  / / / / / / / / / / / / / / / / / / / /
  //  // // // / / / / / / /  / / / / / / / / /  / / / / / / / / / / / / / / / / / / / /

  useEffect(() => {
    if (!loading) {
      const circleSection = document.getElementById("skills__section");
      const circle = document.querySelector(".circle");
      const opaEl = document.getElementById("opacity");
      function scrollCircle() {
        const { top } = circleSection.getBoundingClientRect();
        const scaleTop = Math.abs(top);
        let scale = scaleTop / window.innerHeight;
        scale = scale < 0 ? 0 : scale > 1 ? 1 : scale;
        if (top <= 0) {
          circle.style.transform = `translate(-50%, -50%) scale(${scale})`;
          opaEl.style.opacity = `1`;
        } else {
          circle.style.transform = `translate(-50%, -50%) scale(${0})`;
          opaEl.style.opacity = `0`;
        }
      }
      window.addEventListener("scroll", scrollCircle);

      return () => {
        window.removeEventListener("scroll", scrollCircle);
      };
    }
  }, [loading]);

  // (*********** TO animate Navbar**************)
  // (*******************************************)
  //  (*******************************************)
  const [hiddenTextWidth, setHiddenTextWidth] = useState(0);
  document.documentElement.style.setProperty(
    "--hidden-text-width",
    `${hiddenTextWidth}px`
  );
  document.documentElement.style.setProperty("--opacity", `${hiddenTextWidth}`);
  const handleMouseEnter = (event) => {
    const hiddenText = event.target.querySelector(".hidden-text");
    setHiddenTextWidth(hiddenText.offsetWidth);
  };

  const handleMouseLeave = () => {
    setHiddenTextWidth(0);
  };

  const handleClcik = () => {
    setClick(!click);
  };
  const handleScroll = (sectionRef, event) => {
    event.preventDefault();
    sectionRef.current.scrollIntoView({
      behavior: "smooth",
      scrollBehavior: "auto",
      block: "start",
      inline: "center",
      animation: {
        duration: 10000,
        easing: "cubic-bezier(.28,.59,1,.3)",
      },
    });
  };
  // (*********** Add cursor-following hover effect on image section **************)
  // (*******************************************)
  //  (*******************************************)

  const handleImageHover = (e, index) => {
    const viewButton = document.querySelector(`.hover-${index}`);
    const x = e.clientX;
    const y = e.clientY;
    const move = 30;
    const viewButtonRect = viewButton.getBoundingClientRect();
    const viewButtonLeft = (x / viewButtonRect.width) * (move * 2) - move;
    const viewButtonTop = (y / viewButtonRect.height) * (move * 2) - move;

    // viewButton.style.transform = `translate(${viewButtonLeft}px,${viewButtonTop}px)`;
    viewButton.style.top = `${viewButtonTop}px`;
    viewButton.style.left = `${viewButtonLeft}px`;
  };
  const handleImageHoverLeave = (e, index) => {
    const viewButton = document.querySelector(`.hover-${index}`);
    viewButton.style.top = `50%`;
    viewButton.style.left = `50%`;
    // viewButton.style.transform = `translate(0px, 0px)`;
  };

  return (
    <>
      {/***************************** Wrapper    Everything Anything*****************************/}
      {/***************************** Wrapper    Everything Anything*****************************/}
      {/***************************** Wrapper    Everything Anything*****************************/}
      {loading ? (
        <Loader />
      ) : (
        <div className="container">
          <div className="line__container">
            <div className="separator"></div>
            <div className="separator"></div>
            <div className="separator"></div>
          </div>
          <div ref={cursorRef} className="follower-cursor" />
          <div className={`toggle-div ${!click ? "show" : ""}`}>
            <ul>
              <li>
                <a onClick={(event) => handleScroll(section2Ref, event)}>
                  Projects
                </a>
              </li>
              <li>
                <a onClick={(event) => handleScroll(section3Ref, event)}>
                  About
                </a>
              </li>
              <li>
                <a onClick={(event) => handleScroll(section4Ref, event)}>
                  Contact
                </a>
              </li>
            </ul>
          </div>
          {/***************************** Hero Section    *****************************/}
          {/***************************** Hero Section    *****************************/}
          {/***************************** Hero Section    *****************************/}
          <section ref={section1Ref}>
            <div className="hero-container">
              <div className="a">
                <nav className="navigation">
                  <ul className="navigation-links">
                    <li
                      className="navigation-link"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <a onClick={(event) => handleScroll(section1Ref, event)}>
                        ( M<span className="hidden-text">azhar</span>{" "}
                        <span className="parenthesis-x">)</span>
                      </a>
                    </li>

                    <li
                      className="navigation-link"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <a onClick={(event) => handleScroll(section2Ref, event)}>
                        ( P<span className="hidden-text">rojects</span>{" "}
                        <span className="parenthesis-x">)</span>
                      </a>
                    </li>
                    <li
                      className="navigation-link"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <a onClick={(event) => handleScroll(section3Ref, event)}>
                        ( A<span className="hidden-text">bout</span>
                        <span className="parenthesis-x">)</span>
                      </a>
                    </li>

                    <li
                      className="navigation-link"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <a onClick={(event) => handleScroll(section4Ref, event)}>
                        ( C<span className="hidden-text">ontact</span>
                        <span className="parenthesis-x">)</span>
                      </a>
                    </li>
                  </ul>
                </nav>

                {/**********************************  NAVBAR Responsive ***********/}
                <nav className="navigation-resp">
                  <ul className="navigation-resp-links">
                    <li className="navigation-resp-link">
                      <a onClick={(event) => handleScroll(section1Ref, event)}>
                        <span>(</span>M<span>)</span>
                      </a>
                    </li>
                    <li className="navigation-resp-link" onClick={handleClcik}>
                      {" "}
                      <span>(</span>
                      {click ? "X" : "Menu"}
                      <span>)</span>
                    </li>
                  </ul>
                </nav>
              </div>

              <div className="b">
                <h1 className="text__reveal">Mazhar</h1>
                <div className="name-btn">
                  <svg
                    width="95"
                    height="46"
                    viewBox="0 0 95 46"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="Group_2">
                      <text x="18" y="30" fill="#D9D9D9" stroke="#D9D9D9">
                        <a xlinkHref={Resume} target="_blank">
                          Meet
                        </a>
                      </text>
                      <path
                        id="Vector"
                        d="M7.71 38.8208C3.28 34.7908 0.5 28.9908 0.5 22.5308C0.5 16.0708 3.28 10.2708 7.71 6.2408"
                        stroke="white"
                      />
                      <path
                        id="Vector_2"
                        d="M7.70996 6.24081C11.62 2.69081 16.81 0.530807 22.5 0.530807H47.5"
                        stroke="white"
                        strokeDasharray="100%"
                        strokeDashoffset="100%"
                      />
                      <path
                        id="Vector_2"
                        d="M7.70996 38.8208C11.62 42.3708 16.81 44.5308 22.5 44.5308H47.5"
                        stroke="white"
                        strokeDasharray="100%"
                        strokeDashoffset="100%"
                      />
                      <path
                        id="Vector_4"
                        d="M87.29 38.8208C91.72 34.7908 94.5 28.9908 94.5 22.5308C94.5 16.0708 91.72 10.2708 87.29 6.2408"
                        stroke="white"
                      />
                      <path
                        id="Vector_2"
                        d="M87.29 6.24081C83.38 2.69081 78.19 0.530807 72.5 0.530807H47.5"
                        stroke="white"
                        strokeDasharray="100%"
                        strokeDashoffset="100%"
                      />
                      <path
                        id="Vector_2"
                        d="M87.29 38.8208C83.38 42.3708 78.19 44.5308 72.5 44.5308H47.5"
                        stroke="white"
                        strokeDasharray="100%"
                        strokeDashoffset="100%"
                      />
                    </g>
                  </svg>
                </div>
              </div>
              <div className="c">
                <div className="hero-text">
                  <p>
                    Crafting intuitive and responsive web experiences, a
                    front-end developer bridges design with functionality. Every
                    project is a step forward, blending past expertise with a
                    passion for future innovation and user-focused solutions.
                    The journey is driven by a commitment to stay ahead,
                    delivering modern, impactful interfaces.
                  </p>
                </div>
              </div>
            </div>
          </section>
          {/***************************** Projects Section *****************************/}
          {/***************************** Projects Section *****************************/}
          {/***************************** Projects Section *****************************/}

          <section ref={section2Ref} id="project-section">
            <div className="project-container">
              <div className="e">
                <span className="text__reveal">
                  <span>Explore</span>
                  <span>&nbsp;</span>
                  <span>Projects</span>
                </span>
              </div>
              <div className="f">
                {projectsData.map((project, index) => (
                  <div id="image" key={`This is the Key ${index}`}>
                    <figure
                      style={{
                        transform: `scale(${imageScale[index] || 1})`,
                        transition: "0.3s linear",
                      }}
                    >
                      <img
                        src={project.imgUrl}
                        alt="Gradients"
                        onMouseMove={(e) => {
                          handleImageHover(e, index);
                        }}
                        onMouseLeave={(e) => {
                          handleImageHoverLeave(e, index);
                        }}
                      />
                      <figcaption>
                        <div className="fig-caption">
                          <div>{project.title}</div>
                          <div>{project.technology}</div>
                        </div>
                      </figcaption>
                    </figure>
                    <div className={`hover__img__content hover-${index}`}>
                      <div className="hover-link">
                        <a href={project.live} target="_blank">
                          View
                        </a>
                      </div>
                      <div className="hover-icon">
                        <i className="fa-solid fa-arrow-right"></i>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/***************************** circle/ Skills Section *****************************/}
          {/***************************** circle/ Skills Section *****************************/}
          {/***************************** circle/ Skills Section *****************************/}

          <section ref={section3Ref} id="skills__section">
            <div className="circle__sticky">
              <h1 className="text__reveal" id="opacity">
                skills
              </h1>
              <div className="circle__container">
                <div className="circle"></div>
              </div>
            </div>
          </section>
          <section>
            <div className="skills-container">
              <div className="m">
                <Particles imageData={imageData} />
              </div>
              <div className="n">
                <p className=".hero-text">
                  The journey of a front-end developer is fueled by creativity
                  and a passion for crafting seamless digital experiences. From
                  transforming ideas into visually engaging interfaces to
                  optimizing performance, it requires a balance of design and
                  technical expertise.
                </p>
              </div>
            </div>
          </section>

          {/***************************** Footer Section *****************************/}
          {/***************************** Footer Section *****************************/}
          {/***************************** Footer Section *****************************/}

          <section ref={section4Ref}>
            <div className="footer-container">
              <div className="r">
                <ul className="footer-links">
                  <li>
                    <svg
                      width="95"
                      height="48"
                      viewBox="0 0 95 46"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="Group_2">
                        <text x="6" y="30" fill="#000" stroke="#000">
                          <a href="https://github.com/Mazhar-7" target="_blank">
                            Github
                          </a>
                        </text>
                        <path
                          id="Vector"
                          d="M7.71 38.8208C3.28 34.7908 0.5 28.9908 0.5 22.5308C0.5 16.0708 3.28 10.2708 7.71 6.2408"
                          stroke="black"
                        />
                        <path
                          id="Vector_2"
                          d="M7.70996 6.24081C11.62 2.69081 16.81 0.530807 22.5 0.530807H47.5"
                          stroke="black"
                          strokeDasharray="100%"
                          strokeDashoffset="100%"
                        />
                        <path
                          id="Vector_2"
                          d="M7.70996 38.8208C11.62 42.3708 16.81 44.5308 22.5 44.5308H47.5"
                          stroke="black"
                          strokeDasharray="100%"
                          strokeDashoffset="100%"
                        />
                        <path
                          id="Vector_4"
                          d="M87.29 38.8208C91.72 34.7908 94.5 28.9908 94.5 22.5308C94.5 16.0708 91.72 10.2708 87.29 6.2408"
                          stroke="black"
                        />
                        <path
                          id="Vector_2"
                          d="M87.29 6.24081C83.38 2.69081 78.19 0.530807 72.5 0.530807H47.5"
                          stroke="black"
                          strokeDasharray="100%"
                          strokeDashoffset="100%"
                        />
                        <path
                          id="Vector_2"
                          d="M87.29 38.8208C83.38 42.3708 78.19 44.5308 72.5 44.5308H47.5"
                          stroke="black"
                          strokeDasharray="100%"
                          strokeDashoffset="100%"
                        />
                      </g>
                    </svg>
                  </li>
                  <li>
                    <svg
                      width="95"
                      height="43"
                      viewBox="0 0 95 46"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="Group_2">
                        <text x="12" y="30" fill="#000" stroke="#000">
                          <a
                            href="https://www.linkedin.com/in/maz-har/"
                            target="_balnk"
                          >
                            Linked
                          </a>
                        </text>
                        <path
                          id="Vector"
                          d="M7.71 38.8208C3.28 34.7908 0.5 28.9908 0.5 22.5308C0.5 16.0708 3.28 10.2708 7.71 6.2408"
                          stroke="black"
                        />
                        <path
                          id="Vector_2"
                          d="M7.70996 6.24081C11.62 2.69081 16.81 0.530807 22.5 0.530807H47.5"
                          stroke="black"
                          strokeDasharray="100%"
                          strokeDashoffset="100%"
                        />
                        <path
                          id="Vector_2"
                          d="M7.70996 38.8208C11.62 42.3708 16.81 44.5308 22.5 44.5308H47.5"
                          stroke="black"
                          strokeDasharray="100%"
                          strokeDashoffset="100%"
                        />
                        <path
                          id="Vector_4"
                          d="M87.29 38.8208C91.72 34.7908 94.5 28.9908 94.5 22.5308C94.5 16.0708 91.72 10.2708 87.29 6.2408"
                          stroke="black"
                        />
                        <path
                          id="Vector_2"
                          d="M87.29 6.24081C83.38 2.69081 78.19 0.530807 72.5 0.530807H47.5"
                          stroke="black"
                          strokeDasharray="100%"
                          strokeDashoffset="100%"
                        />
                        <path
                          id="Vector_2"
                          d="M87.29 38.8208C83.38 42.3708 78.19 44.5308 72.5 44.5308H47.5"
                          stroke="black"
                          strokeDasharray="100%"
                          strokeDashoffset="100%"
                        />
                      </g>
                    </svg>
                  </li>
                  <li>
                    <svg
                      width="95"
                      height="48"
                      viewBox="0 0 95 46"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="Group_2">
                        <text x="18" y="30" fill="#000" stroke="#000">
                          <a
                            href="mailto:mazharfareed2250@gmail.com?subject=Hello%20from%20your%20website&body=This%20is%20a%20test%20email"
                            target="_blank"
                          >
                            email
                          </a>
                        </text>
                        <path
                          id="Vector"
                          d="M7.71 38.8208C3.28 34.7908 0.5 28.9908 0.5 22.5308C0.5 16.0708 3.28 10.2708 7.71 6.2408"
                          stroke="black"
                        />
                        <path
                          id="Vector_2"
                          d="M7.70996 6.24081C11.62 2.69081 16.81 0.530807 22.5 0.530807H47.5"
                          stroke="black"
                          strokeDasharray="100%"
                          strokeDashoffset="100%"
                        />
                        <path
                          id="Vector_2"
                          d="M7.70996 38.8208C11.62 42.3708 16.81 44.5308 22.5 44.5308H47.5"
                          stroke="black"
                          strokeDasharray="100%"
                          strokeDashoffset="100%"
                        />
                        <path
                          id="Vector_4"
                          d="M87.29 38.8208C91.72 34.7908 94.5 28.9908 94.5 22.5308C94.5 16.0708 91.72 10.2708 87.29 6.2408"
                          stroke="black"
                        />
                        <path
                          id="Vector_2"
                          d="M87.29 6.24081C83.38 2.69081 78.19 0.530807 72.5 0.530807H47.5"
                          stroke="black"
                          strokeDasharray="100%"
                          strokeDashoffset="100%"
                        />
                        <path
                          id="Vector_2"
                          d="M87.29 38.8208C83.38 42.3708 78.19 44.5308 72.5 44.5308H47.5"
                          stroke="black"
                          strokeDasharray="100%"
                          strokeDashoffset="100%"
                        />
                      </g>
                    </svg>
                  </li>
                </ul>
              </div>
              <div className="s">
                <h1 className="text__reveal">thanks</h1>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export default App;
