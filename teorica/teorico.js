// PUNTO A
function generarHistograma(input_id) {
  let miArreglo = [1, 2, 1, 3, 3, 1, 2, 1, 5, 1];
  let histograma = {};
  const obj_input = document.getElementById(input_id);
  const obj_resultado = document.getElementById("mostrar_histograma");
  obj_resultado.innerHTML = "";
  const info_input = obj_input.value;
  if (info_input.length === 19) {
    miArreglo = info_input.split(",");
    hacer_histograma = true;
    for (let index = 0; index < miArreglo.length; index++) {
      const element = miArreglo[index];
      if (element < 0 || element > 5) {
        alert(
          "El elemento de la posición " +
            index +
            " debe ser positivo menor o igual a cinco(5)"
        );
        hacer_histograma = false;
      }
    }

    if (hacer_histograma) {
      miArreglo.forEach((element) => {
        histograma[element] = (histograma[element] || 0) + 1;
      });
    }
    for (const index in histograma) {
      obj_resultado.innerHTML +=
        "<p>" + index + ": " + getCantAsteriscos(histograma[index]) + "</p>";
    }
  } else {
    alert("Ingrese 10 números del 1 al 5 separados por una coma");
  }
}

function getCantAsteriscos(num) {
  let asteroides = "";
  for (let index = 0; index < num; index++) {
    asteroides += "*";
  }
  return asteroides;
}

// PUNTO B
async function generarMovimiento(input_id) {
  const obj_input = document.getElementById(input_id);
  const obj_resultado = document.getElementById("mostrar_movimiento");
  const movimiento = await obtenerMovimiento(obj_input);
  let mostrar = true;
  if (movimiento.length % 2 === 0) {
    let max_x = 4,
      max_y = 4;
    let miMatriz = await generarMatriz(max_x, max_y);
    miMatriz = await moverElemento(movimiento, miMatriz, max_x, max_y);

    if (!miMatriz) {
      mostrar = false;
    }
    if (mostrar) {
      const success = await mostrarMatriz(obj_resultado, miMatriz);
      console.warn(success);
    } else {
      alert("Posición no permitida");
      const btn_mover = document.getElementById("btn_mover");
      let restaurar = obj_input.value;
      restaurar = restaurar.split(",");
      input_restart = "";
      for (let index = 0; index < restaurar.length - 2; index++) {
        if (index !== restaurar.length - 3) {
          input_restart += restaurar[index] + ",";
        } else {
          input_restart += restaurar[index];
        }
      }
      obj_input.value = input_restart;
      btn_mover.click();
    }
  } else {
    alert("Cada 2 numeros es un movimiento, por favor separelos con una coma");
  }
}

async function generarMatriz(max_x, max_y) {
  let miMatriz = [];
  for (let i = 0; i < max_y; i++) {
    miMatriz[i] = [];
    for (let j = 0; j < max_x; j++) {
      miMatriz[i].push("O");
    }
  }
  return miMatriz;
}

async function obtenerMovimiento(obj_input) {
  const info_input = obj_input.value;
  const movimiento = info_input.split(",");
  return movimiento;
}

async function mostrarMatriz(obj_resultado, miMatriz) {
  let mostrar = false;
  try {
    let dom_matriz = "<br>";
    for (let i = 0; i < miMatriz.length; i++) {
      for (let j = 0; j < miMatriz[i].length; j++) {
        dom_matriz += miMatriz[i][j] + " ";
      }
      dom_matriz += "<br>";
    }
    obj_resultado.innerHTML = dom_matriz;
    mostrar = true;
    return mostrar;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function moverElemento(movimiento, miMatriz, max_x, max_y) {
  let en_x = 0,
    en_y = 0;
  for (let index = 0; index < movimiento.length; index++) {
    if (index % 2 === 0) {
      en_x += parseInt(movimiento[index]);
      if (en_x > max_x) {
        en_x -= parseInt(movimiento[index]);
      }
      if (en_y >= 0 && en_x >= 0 && en_x < max_x && en_y < max_y) {
        miMatriz[en_y][en_x] = "O";
      }
    } else {
      en_y += parseInt(movimiento[index]);
      if (en_y >= max_y) {
        en_y -= parseInt(movimiento[index]);
      }
    }
  }
  if (en_y >= 0 && en_x >= 0 && en_x < max_x && en_y < max_y) {
    miMatriz[en_y][en_x] = "X";
  } else {
    return false;
  }
  return miMatriz;
}

// VALIDAR
function numeros(e) {
  key = e.keyCode || e.which;
  tecla = String.fromCharCode(key).toLowerCase();
  letras = "12345,-";
  especiales = [37, 39, 46];
  tecla_especial = false;
  for (var i in especiales) {
    if (key == especiales[i]) {
      tecla_especial = true;
      break;
    }
  }
  if (letras.indexOf(tecla) == -1 && !tecla_especial) return false;
}