const api = "http://localhost:5000";

let stations = [];

async function loadStations() {
  const res = await fetch(api + "/stations");
  stations = await res.json();

  const stationSelect = document.getElementById("stationSelect");
  stationSelect.innerHTML = "";

  stations.forEach(station => {
    stationSelect.innerHTML +=
      `<option value="${station.id}">${station.name}</option>`;
  });

  loadSlots();
}

function loadSlots() {
  const stationId = document.getElementById("stationSelect").value;

  const station = stations.find(s => s.id == stationId);

  const slotSelect = document.getElementById("slotSelect");
  slotSelect.innerHTML = "";

  station.slots.forEach(slot => {
    slotSelect.innerHTML += `<option>${slot}</option>`;
  });
}

async function bookSlot() {
  const name = document.getElementById("username").value;
  const stationId = document.getElementById("stationSelect").value;
  const slot = document.getElementById("slotSelect").value;

  const res = await fetch(api + "/book", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, stationId, slot })
  });

  const data = await res.json();

  document.getElementById("message").innerText = data.message;

  loadBookings();
}

async function loadBookings() {
  const res = await fetch(api + "/bookings");
  const data = await res.json();

  const list = document.getElementById("bookingList");
  list.innerHTML = "";

  data.forEach(b => {
    list.innerHTML +=
      `<li>${b.name} booked Station ${b.stationId} at ${b.slot}</li>`;
  });
}

document
  .getElementById("stationSelect")
  .addEventListener("change", loadSlots);

loadStations();
loadBookings();
