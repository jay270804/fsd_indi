

function locomotiveAnimation(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".main-container"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".main-container" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".main-container", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector(".main-container").style.transform ? "transform" : "fixed"
});




// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();
}
locomotiveAnimation()

function navbarAnimation() {
    gsap.to(".logo svg", {
      transform: "translateY(-100%)",
      scrollTrigger: {
        trigger: ".page-1",
        scroller: ".main-container",
        start: "top 0",
        end: "top -5%",
        scrub: true,
      },
    });
    gsap.to(".right-panel .links", {
      transform: "translateY(-100%)",
      opacity: 0,
      scrollTrigger: {
        trigger: ".page-1",
        scroller: ".main-container",
        start: "top 0",
        end: "top -5%",
        scrub: true,
      },
    });
  }

navbarAnimation()

function videoAnimation() {
    const videoContainer = document.querySelector(".video-container")
    const play = document.querySelector(".play")

    videoContainer.addEventListener("mouseenter", function () {
        gsap.to(play, {
            opacity: 1,
            scale: 1
        })
    })
    videoContainer.addEventListener("mouseleave", function () {
        gsap.to(play, {
            opacity: 0,
            scale: 0
        })
    })
    videoContainer.addEventListener("mousemove", function (dets) {
        gsap.to(play, {
            left: dets.x,
            top: dets.y
        })
    })
}

videoAnimation()

function loadingAnimation() {
    gsap.from(".page-1 h1", {
        y: 70,
        opacity: 0,
        duration: 1,
        stagger: 0.4
    })

    gsap.from(".video-container", {
        scale: 0.9,
        opacity: 0,
        duration: 0.5,
        delay: 1.2

    })
}

loadingAnimation()

function contentBlob() {
    document.querySelectorAll(".content").forEach(function (elem) {
        elem.addEventListener("mousemove", function (dets) {
            gsap.to(".cursor", {
                left: dets.x,
                top: dets.y,
                scale:1
            })
        })
        
        elem.addEventListener("mouseenter", function (dets) {
            gsap.to(".cursor", {
                transform: `translate(-50%,-50%) scale(1)`

            })
        })
        elem.addEventListener("mouseleave", function (dets) {
            gsap.to(".cursor", {
                transform: `translate(-50%,-50%) scale(0)`

            })
        })
    })
}

contentBlob()


