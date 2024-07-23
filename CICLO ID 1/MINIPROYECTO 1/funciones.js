// Constante para llenar el select
const opciones = [
    {id: 1, tipo: 'Ingreso' },
    {id: 2, tipo: 'Egreso' }
];

const dataTable = [];

// Funcion para llenar el select con mapeo
const llenarSelect = () => {
    const selectTipos = document.getElementById('tipo');
    const opcSelect = '<option value="" disabled selected>Selecciona un tipo</option>';
    const opcionesSelect = opcSelect +opciones.map(opcion => {
        return `<option value="${opcion.tipo}">${opcion.tipo}</option>`
    }).join('');

    selectTipos.innerHTML = opcionesSelect;
}

// Llamar a la funcion
document.addEventListener('DOMContentLoaded', llenarSelect);

// Funcion para agregar datos a la tabla
const agregar = (e) => {
    e.preventDefault();
    const tipo = document.getElementById('tipo').value;
    const monto = document.getElementById('monto').value;
    const descripcion = document.getElementById('descripcion').value;

    dataTable.push({tipo, monto, descripcion});
    llenarTabla();
    return false;
}

// Funcion para llenar la tabla
const llenarTabla = () => {
    const tbody = document.getElementById('tbody');

    // Calcular totales de ingresos y egresos
    const totalIngresos = dataTable
        .filter(data => data.tipo === 'Ingreso')
        .reduce((acc, { monto }) => acc + parseFloat(monto), 0);

    const totalEgresos = dataTable
        .filter(data => data.tipo === 'Egreso')
        .reduce((acc, { monto }) => acc + parseFloat(monto), 0);

    // Calcular balance
    const balance = totalIngresos - totalEgresos;

    // Lllenar tbody
    const datos = dataTable.map(data => {
        return `<tr>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${data.tipo}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${data.descripcion}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">$${parseFloat(data.monto).toFixed(2)}</td>
                </tr>`;
    }).join('');

    const rojo = 'text-red-500';
    const verde = 'text-green-500';
    const color = balance < 0 ? rojo : verde;

    const datosBalance = `<tr class="bg-gray-100">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-bold text-right text-purple-600" colspan="2">Balance</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-bold ${color}">$${balance.toFixed(2)}</td>
                </tr>`;

    tbody.innerHTML = datos + datosBalance;
}