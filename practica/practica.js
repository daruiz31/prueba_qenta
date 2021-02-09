function listarJugadores() {
  fetch("https://www.balldontlie.io/api/v1/players")
    .then((res) => res.json())
    .then((data) => {
      setTablaJugadores(data.data);
    });
}

function setTablaJugadores(jugadores) {
  $("#jugadores").DataTable().destroy();
  $("#jugadores").DataTable({
    data: jugadores,
    columns: [
      { data: "id" },
      { data: "first_name" },
      { data: "height_feet" },
      { data: "last_name" },
      { data: "position" },
      { data: "weight_pounds" },
      { data: "height_inches" },
      {
        data: "id",
        render: function (data, type, full) {
          let btn_detalle =
            '<button class="btn btn-primary btn-sm" data-toggle="modal"' +
            'data-target=".modal-jugador" onclick="getDetalleJugador(' +
            full["id"] +
            ')">Detail</button<br> ' +
            '<button class="btn btn-secondary btn-sm" data-toggle="modal"' +
            'data-target=".modal-editar-jugador" onclick="editarJugador(' +
            full["id"] +
            ')">Edit</button>';
          return btn_detalle;
        },
      },
    ],
    language: {
      lengthMenu: "Mostrar _MENU_ por página",
      zeroRecords: "No hay resultados",
      info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
      infoEmpty: "No hay resultados",
      infoFiltered: "(filtrando sobre _MAX_ registros)",
      search: "buscar",
      paginate: {
        first: "Primer",
        last: "Último",
        next: "Siguiente",
        previous: "Anterior",
      },
    },
    lengthChange: false,
    pageLength: 5,
  });
}

function getDetalleJugador(id) {
  fetch("https://www.balldontlie.io/api/v1/players/" + id)
    .then((res) => res.json())
    .then((data) => {
      verDetalleJugador(data);
    });
}

function verDetalleJugador(jugador) {
  console.log(jugador.team);
  const equipo = jugador.team;
  $("#id").text(equipo.id);
  $("#abbreviation").text(equipo.abbreviation);
  $("#city").text(equipo.city);
  $("#conference").text(equipo.conference);
  $("#division").text(equipo.division);
  $("#full_name").text(equipo.full_name);
  $("#name").text(equipo.name);
}

function editarJugador(id) {
  fetch("https://www.balldontlie.io/api/v1/players/" + id)
    .then((res) => res.json())
    .then((jugador) => {
      const equipo = jugador.team;
      $("#input_abbreviation").val(equipo.abbreviation);
      $("#input_city").val(equipo.city);
      $("#input_onference").val(equipo.conference);
      $("#input_division").val(equipo.division);
      $("#input_full_name").val(equipo.full_name);
      $("#input_name").val(equipo.name);

      $("#input_first_name").val(jugador.first_name);
      $("#input_height_feet").val(jugador.height_feet);
      $("#input_height_inches").val(jugador.height_inches);
      $("#input_last_name").val(jugador.last_name);
      $("#input_position").val(jugador.position);
      $("#input_weight_pounds").val(jugador.weight_pounds);
    });
  $("#btn_guardar_jugador").attr("onclick", "guardarJugador(" + id + ")");
}

function guardarJugador(id) {
  let equipo = {
    input_abbreviation: $("#input_abbreviation").val(),
    input_city: $("#input_city").val(),
    input_onference: $("#input_onference").val(),
    input_division: $("#input_division").val(),
    input_full_name: $("#input_full_name").val(),
    input_name: $("#input_name").val(),
  };
  guardarEnLocalStorage(
    id,
    $("#input_first_name").val(),
    $("#input_height_feet").val(),
    $("#input_height_inches").val(),
    $("#input_last_name").val(),
    $("#input_position").val(),
    $("#input_weight_pounds").val(),
    equipo
  );
}

function guardarEnLocalStorage(
  id,
  first_name,
  height_feet,
  last_name,
  position,
  weight_pounds,
  height_inches,
  team
) {
  let jugador = {
    id: id,
    first_name: first_name,
    height_feet: height_feet,
    last_name: last_name,
    position: position,
    weight_pounds: weight_pounds,
    height_inches: height_inches,
    team: { team },
  };

  localStorage.setItem(id, JSON.stringify(jugador));
  alert("La información fue guardada en el LocalStorage exitosamente");
  $('.modal-editar-jugador').modal('hide');
}
