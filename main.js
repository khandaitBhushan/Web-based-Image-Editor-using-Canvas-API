const canvas = document.getElementById("canvas");
const canvasContainer = document.querySelector(".canvasContainer");

const canvasContext = canvas.getContext("2d");
let image = new Image();

document.getElementById("upload").addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    console.log("upload successful");
    reader.onload = function (e) {
        image.src = e.target.result;
    }
    reader.readAsDataURL(file);
    console.log("don");
});

image.onload = function () {
    canvas.width = image.width;
    canvas.height = image.height;
    canvasContext.drawImage(image, 0, 0);
    canvasContainer.style.display = "block";
}


function applyFilter() {
    const brightness = document.getElementById('brightness').value;
    const contrast = document.getElementById('contrast').value;
    const grayscale = document.getElementById('grayscale').value;

    canvasContext.filter = `
        brightness(${brightness}%)
        contrast(${contrast}%)
        grayscale(${grayscale}%)
    `;

    canvasContext.drawImage(image, 0, 0);
}


document.getElementById('brightness').addEventListener("input", applyFilter);
document.getElementById('contrast').addEventListener("input", applyFilter);
document.getElementById('grayscale').addEventListener("input", applyFilter);

document.getElementById("download").addEventListener('click', function () {
    const link = document.createElement("a");
    link.href = canvas.toDataURL();
    link.download = 'edited-image.png';
    link.click();
});

function resetFilterInputs() {
    document.getElementById('brightness').value = 100;
    document.getElementById('contrast').value = 100;
    document.getElementById('grayscale').value = 0;
}
