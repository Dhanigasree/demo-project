const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let stations = [
  {
    id: 1,
    name: "Chennai Central EV Hub",
    location: "Chennai Central",
    slots: ["09:00 AM", "10:00 AM", "11:00 AM"]
  },
  {
    id: 2,
    name: "Velachery Fast Charge",
    location: "Velachery",
    slots: ["01:00 PM", "02:00 PM", "03:00 PM"]
  },
  {
    id: 3,
    name: "OMR Tech Park Charger",
    location: "OMR",
    slots: ["04:00 PM", "05:00 PM", "06:00 PM"]
  }
];

let bookings = [];

app.get("/stations", (req, res) => {
  res.json(stations);
});

app.post("/book", (req, res) => {
  const { name, stationId, slot } = req.body;

  const alreadyBooked = bookings.find(
    b => b.stationId == stationId && b.slot === slot
  );

  if (alreadyBooked) {
    return res.json({ success: false, message: "Slot already booked" });
  }

  bookings.push({ name, stationId, slot });

  res.json({
    success: true,
    message: "Booking Confirmed"
  });
});

app.get("/bookings", (req, res) => {
  res.json(bookings);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
