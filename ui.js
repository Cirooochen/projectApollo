const navbar = document.getElementById("navbar");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;

  // Change background when scrolled past 50px
  //   if (currentScroll > 50) {
  //     navbar.classList.add("backdrop-blur-xl", "text-white", "shadow-md");
  //     navbar.classList.remove("bg-white/10", "text-black");
  //   } else {
  //     navbar.classList.remove(
  //       "bg-white/80",
  //       "backdrop-blur-xl",
  //       "text-black",
  //       "shadow-md"
  //     );
  //     navbar.classList.add("bg-white/10", "text-white");
  //   }

  // Hide on scroll down, show on scroll up
  if (currentScroll > lastScroll && currentScroll > 200) {
    navbar.style.transform = "translateY(-150%)";
    navbar.classList.add("transition-transform", "duration-500", "ease-in-out");
  } else {
    navbar.style.transform = "translateY(0)";
  }

  lastScroll = currentScroll;
});
