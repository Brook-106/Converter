async function convertToPDF() {
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();
  const files = document.getElementById("imageInput").files;

  if (files.length === 0) {
    alert("Please select at least one image");
    return;
  }

  for (let i = 0; i < files.length; i++) {
    const imgData = await readImage(files[i]);

    if (i !== 0) pdf.addPage();

    pdf.addImage(imgData, "JPEG", 10, 10, 190, 270);
  }

  pdf.save("output.pdf");
}

function readImage(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });
}