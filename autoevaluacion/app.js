class Ticket_form extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.attachEvents();
  }

  render() {
    this.innerHTML = `
      <form id="ticketForm">
        <label for="type">Tipo:</label>
        <select id="type" name="type">
          <option value="falla">Falla</option>
          <option value="nuevo requerimiento">Nuevo requerimiento</option>
        </select>
        <br><br>
        <label for="priority">Prioridad:</label>
        <select id="priority" name="priority">
          <option value="baja">Baja</option>
          <option value="media">Media</option>
          <option value="alta">Alta</option>
        </select>
        <br><br>
        <label for="description">Descripción:</label>
        <textarea id="description" name="description"></textarea>
        <br><br>
        <input type="submit" value="Agregar">
      </form>
      <table id="ticketTable">
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Prioridad</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    `;
  }

  attachEvents() {
    const form = this.querySelector('#ticketForm');
    form.addEventListener('submit', this.handleSubmit.bind(this));
  }

  handleSubmit(event) {
    event.preventDefault();

    const type = this.querySelector('#type').value;
    const priority = this.querySelector('#priority').value;
    const description = this.querySelector('#description').value;

    const ticket = {
      type: type,
      priority: priority,
      description: description
    };

    const confirmMessage = '¿Estás seguro de enviar el formulario?';
    if (confirm(confirmMessage)) {
      this.addTicketToTable(ticket);
      event.target.reset(); // Restablece los valores del formulario
    }
  }

  addTicketToTable(ticket) {
    const tableBody = this.querySelector('#ticketTable tbody');

    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td>${ticket.type}</td>
      <td>${ticket.priority}</td>
      <td>${ticket.description}</td>
    `;

    tableBody.appendChild(newRow);
  }
}

customElements.define('ticket-form', Ticket_form);


