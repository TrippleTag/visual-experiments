// 1. Movimiento del orbe con el ratón
const orb = document.getElementById('orb');

document.addEventListener('mousemove', (e) => {
  orb.style.left = `${e.clientX}px`;
  orb.style.top = `${e.clientY}px`;
});

// 2. Generación e interactividad de la Matriz Cinética
const grid = document.getElementById('kineticGrid');
const totalNodes = 48; // 8 columnas x 6 filas

for (let i = 0; i < totalNodes; i++) {
  const node = document.createElement('div');
  node.classList.add('node');

  // Al pasar el ratón, se activa y vuelve a su estado tras 1 segundo
  node.addEventListener('mouseenter', () => {
    node.classList.add('active');
    setTimeout(() => {
      node.classList.remove('active');
    }, 1000);
  });

  grid.appendChild(node);
}
