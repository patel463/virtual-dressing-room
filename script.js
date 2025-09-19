// script.js
// Image upload और outfit drag-drop handle करने वाला JS code

// photo upload handle करना
const uploadInput = document.getElementById("upload");
const userPhoto = document.getElementById("user-photo");
const outputCanvas = document.getElementById("output");
const ctx = outputCanvas.getContext("2d");

uploadInput.addEventListener("change", function (e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (event) {
      userPhoto.onload = () => {
        outputCanvas.width = userPhoto.width;
        outputCanvas.height = userPhoto.height;
        ctx.clearRect(0, 0, outputCanvas.width, outputCanvas.height);
        ctx.drawImage(userPhoto, 0, 0);
      };
      userPhoto.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }
});

// drag and drop outfits
let selectedOutfit = null;

document.querySelectorAll(".outfit").forEach((img) => {
  img.addEventListener("dragstart", (e) => {
    selectedOutfit = e.target;
  });
});

outputCanvas.addEventListener("dragover", (e) => {
  e.preventDefault();
});

outputCanvas.addEventListener("drop", (e) => {
  e.preventDefault();
  if (selectedOutfit) {
    const rect = outputCanvas.getBoundingClientRect();
    const x = e.clientX - rect.left - selectedOutfit.width / 2;
    const y = e.clientY - rect.top - selectedOutfit.height / 2;

    ctx.drawImage(selectedOutfit, x, y, selectedOutfit.width, selectedOutfit.height);
  }
});

// "Try On" button पर दबाने से photo + outfits final दिखें
document.getElementById("try-on").addEventListener("click", () => {
  alert("Your virtual try-on is ready!");
});
