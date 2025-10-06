// Basic front-end behaviour and sample data storage (localStorage). Replace with backend API calls later.
const state = {
  orders: [],
  customers: [],
  staff: [],
  reservations: [],
  dishes: [],
};

function saveState() {
  localStorage.setItem("rest_state", JSON.stringify(state));
}
function loadState() {
  const s = localStorage.getItem("rest_state");
  if (s) Object.assign(state, JSON.parse(s));
}
loadState();

// Sidebar toggle for mobile
const sidebar = document.getElementById("sidebar");
const sidebarToggle = document.getElementById("sidebarToggle");
if (sidebarToggle)
  sidebarToggle.addEventListener("click", () =>
    sidebar.classList.toggle("hidden")
  );

// Simple modal helpers for various pages
function openAddDish() {
  document.getElementById("dishModal").classList.remove("hidden");
}
function closeDishModal() {
  document.getElementById("dishModal").classList.add("hidden");
}
function saveDish() {
  const name = document.getElementById("dishName").value;
  const cat = document.getElementById("dishCategory").value;
  const price = parseFloat(document.getElementById("dishPrice").value || 0);
  state.dishes.push({ id: Date.now(), name, cat, price });
  saveState();
  closeDishModal();
  alert("Dish saved (frontend only)");
}

function openOrderForm() {
  document.getElementById("orderModal").classList.remove("hidden");
}
function closeOrderModal() {
  document.getElementById("orderModal").classList.add("hidden");
}
function saveOrder() {
  const table = document.getElementById("orderTable").value;
  const items = document.getElementById("orderItems").value;
  const total = document.getElementById("orderTotal").value;
  const status = document.getElementById("orderStatus").value;
  state.orders.push({ id: Date.now(), table, items, total, status });
  saveState();
  closeOrderModal();
  renderOrders();
}
function renderOrders() {
  const tbody = document.getElementById("ordersTbody");
  if (!tbody) return;
  tbody.innerHTML = "";
  state.orders.forEach((o, i) => {
    const tr = document.createElement("tr");
    tr.className = "border-t";
    tr.innerHTML = `<td>${i + 1}</td><td>${o.table}</td><td>${
      o.items
    }</td><td>$${o.total}</td><td>${
      o.status
    }</td><td><button onclick="editOrder(${o.id})">Edit</button></td>`;
    tbody.appendChild(tr);
  });
}

function openCustomerForm() {
  document.getElementById("customerModal").classList.remove("hidden");
}
function closeCustomerModal() {
  document.getElementById("customerModal").classList.add("hidden");
}
function saveCustomer() {
  const name = document.getElementById("custName").value;
  const phone = document.getElementById("custPhone").value;
  const email = document.getElementById("custEmail").value;
  state.customers.push({ id: Date.now(), name, phone, email });
  saveState();
  closeCustomerModal();
  renderCustomers();
}
function renderCustomers() {
  const tbody = document.getElementById("customersTbody");
  if (!tbody) return;
  tbody.innerHTML = "";
  state.customers.forEach((c, i) => {
    const tr = document.createElement("tr");
    tr.className = "border-t";
    tr.innerHTML = `<td>${i + 1}</td><td>${c.name}</td><td>${c.phone}</td><td>${
      c.email || ""
    }</td><td><button onclick="editCustomer(${c.id})">Edit</button></td>`;
    tbody.appendChild(tr);
  });
}

function openReservationForm() {
  document.getElementById("reservationModal").classList.remove("hidden");
}
function closeReservationModal() {
  document.getElementById("reservationModal").classList.add("hidden");
}
function saveReservation() {
  const name = document.getElementById("resName").value;
  const phone = document.getElementById("resPhone").value;
  const dt = document.getElementById("resDateTime").value;
  const party = document.getElementById("resParty").value;
  const table = document.getElementById("resTable").value;
  state.reservations.push({ id: Date.now(), name, phone, dt, party, table });
  saveState();
  closeReservationModal();
  renderReservations();
}
function renderReservations() {
  const tbody = document.getElementById("reservationsTbody");
  if (!tbody) return;
  tbody.innerHTML = "";
  state.reservations.forEach((r, i) => {
    const tr = document.createElement("tr");
    tr.className = "border-t";
    tr.innerHTML = `<td>${i + 1}</td><td>${r.dt}</td><td>${r.name}</td><td>${
      r.party
    }</td><td>${r.table || ""}</td><td><button onclick="editReservation(${
      r.id
    })">Edit</button></td>`;
    tbody.appendChild(tr);
  });
}

function openStaffForm() {
  document.getElementById("staffModal").classList.remove("hidden");
}
function closeStaffModal() {
  document.getElementById("staffModal").classList.add("hidden");
}
function saveStaff() {
  const name = document.getElementById("staffName").value;
  const role = document.getElementById("staffRole").value;
  const phone = document.getElementById("staffPhone").value;
  const email = document.getElementById("staffEmail").value;
  state.staff.push({ id: Date.now(), name, role, phone, email });
  saveState();
  closeStaffModal();
  renderStaff();
}
function renderStaff() {
  const tbody = document.getElementById("staffTbody");
  if (!tbody) return;
  tbody.innerHTML = "";
  state.staff.forEach((s, i) => {
    const tr = document.createElement("tr");
    tr.className = "border-t";
    tr.innerHTML = `<td>${i + 1}</td><td>${s.name}</td><td>${s.role}</td><td>${
      s.phone || ""
    }</td><td><button onclick="editStaff(${s.id})">Edit</button></td>`;
    tbody.appendChild(tr);
  });
}

function saveSettings() {
  alert("Settings saved (frontend only)");
}

// Initial renders
renderOrders();
renderCustomers();
renderReservations();
renderStaff();

// Charts on dashboard and reports
function initCharts() {
  // revenue chart
  const ctx = document.getElementById("revenueChart");
  if (ctx) {
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          { label: "Revenue", data: [120, 150, 100, 200, 170, 230, 190] },
        ],
      },
    });
  }
  const ctx2 = document.getElementById("monthlySales");
  if (ctx2) {
    new Chart(ctx2, {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          { label: "Sales", data: [1200, 1500, 900, 2000, 1700, 2300] },
        ],
      },
    });
  }
  const ctx3 = document.getElementById("categoryChart");
  if (ctx3) {
    new Chart(ctx3, {
      type: "doughnut",
      data: {
        labels: ["Pizza", "Grill", "Drinks", "Dessert"],
        datasets: [{ data: [45, 25, 20, 10] }],
      },
    });
  }
}
window.addEventListener("load", initCharts);
