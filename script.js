document
  .getElementById("name")
  .innerText = "Rylie";
document
  .getElementById("special")
document
  .getElementById("style-me")
  .style.backgroundColor = "lightblue";
document
  .getElementById("name")
  .innerText = "Rylie";
document
  .getElementById("special")
  .classList.add("special-class");
document
  .getElementById("style-me")
  .style.color = "blue";
document
  .querySelectorAll('li').forEach((item, index) => {
    let colors = ["violet", "indigo", "blue", "gree", "yellow", "orange", "red"];
    item.style.color = colors[index %
      colors.length];
  });
document
  .getElementById("colors")
  .addEventListener("click", function() {
    let randomColor = '#' +
      Math.floor(Math.random() * 16777215).toString(16);
    this.style.backgroundColor = randomColor;
  });
document
  .querySelector(".togglable")
  .addEventListener("click", function() {
    if (this.style.fontStyle === "italic") {
      this.style.fontStyle = "normal";
    } else {
      this.style.fontStyle = "italic";
    }
  });
document
  .addEventListener('mousemove', function(e) {
    let div = document.getElementById('fly');
    div.style.position = 'absolute';
    div.style.top = e.clientY + 'px';
    div.style.left = e.clientX + 'px';
  });
document
  .querySelectorAll("li li")
  .forEach(item => {
    item.addEventListener("click", function() {
      this.style.color = "green";
    });
  });
document
  .querySelectorAll(".close").forEach(button => {
    button.addEventListener("click", function() {
      this.parentNode.style.display = "none";
    });
  });
document.querySelectorAll("li").forEach((item, index, array) => {
  item.addEventListener("click", function() {
    this.style.color = "grey";
    if (index + 1 < array.length) {
      array[index + 1].style.backgroundColor =
        "yellow";
    }
  });
});