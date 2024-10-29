let scale = 1;
let offsetX = 0;
let offsetY = 0;
let startX, startY;

function chooseFile() {
  document.getElementById('fileInput').click();
}

document.getElementById('fileInput').addEventListener('change', function(event) {
  const reader = new FileReader();
  reader.onload = function(e) {
    const img = document.getElementById('profileImage');
    img.src = e.target.result;
    img.classList.remove('hidden');
    document.getElementById('placeholderText').classList.add('hidden');
    document.getElementById('adjustControls').classList.remove('hidden');

    // Inicializar posição e escala
    scale = 1;
    offsetX = 0;
    offsetY = 0;
    img.style.transform = `scale(${scale}) translate(${offsetX}px, ${offsetY}px)`;
  };
  reader.readAsDataURL(event.target.files[0]);
});

document.getElementById('zoomRange').addEventListener('input', function() {
  scale = parseFloat(this.value);
  updateImageTransform();
});

document.getElementById('imageContainer').addEventListener('mousedown', function(e) {
  e.preventDefault();
  startX = e.clientX;
  startY = e.clientY;

  function onMouseMove(e) {
    offsetX += (e.clientX - startX) / scale;
    offsetY += (e.clientY - startY) / scale;
    startX = e.clientX;
    startY = e.clientY;
    updateImageTransform();
  }

  function onMouseUp() {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

function updateImageTransform() {
  const img = document.getElementById('profileImage');
  img.style.transform = `scale(${scale}) translate(${offsetX}px, ${offsetY}px)`;
}

function saveImage() {
  document.getElementById('adjustControls').classList.add('hidden');
  alert('Imagem de perfil atualizada!');
}

function saveChanges() {
  const name = document.getElementById('name').value;
  const nickname = document.getElementById('nickname').value;
  const description = document.getElementById('description').value;

  // Aqui você pode adicionar código para enviar os dados para o servidor

  alert('Alterações salvas com sucesso!');
}
