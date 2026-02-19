import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Loader from "../components/Loader";
import { calculateEvent } from "../api/endpoints";
import { useAppContext } from "../context/AppContext";

const MENU_OPTIONS = [
  "Paneer Butter Masala",
  "Dal Tadka",
  "Veg Biryani",
  "Chicken Curry",
  "Jeera Rice"
];

function CreateEventPage() {
  const navigate = useNavigate();
  const { setCalculationResult } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    guests: "",
    preference: "veg",
    menuItems: [],
    eventDate: "",
    deliveryAddress: ""
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onMenuChange = (e) => {
    const values = Array.from(e.target.selectedOptions).map((option) => option.value);
    setForm((prev) => ({ ...prev, menuItems: values }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        numberOfGuests: Number(form.guests),
        foodPreference: form.preference,
        menuItems: form.menuItems,
        eventDate: form.eventDate,
        deliveryAddress: form.deliveryAddress
      };
      const { data } = await calculateEvent(payload);
      setCalculationResult({ ...data, eventDetails: payload });
      navigate("/result");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to calculate materials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Create Event">
      <form className="form-grid" onSubmit={onSubmit}>
        <label>
          Number of guests
          <input
            type="number"
            min="1"
            name="guests"
            value={form.guests}
            onChange={onChange}
            required
          />
        </label>

        <label>
          Veg / Non-Veg
          <select name="preference" value={form.preference} onChange={onChange}>
            <option value="veg">Veg</option>
            <option value="non-veg">Non-Veg</option>
          </select>
        </label>

        <label>
          Select menu items
          <select
            multiple
            name="menuItems"
            value={form.menuItems}
            onChange={onMenuChange}
            required
            size={5}
          >
            {MENU_OPTIONS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label>
          Event date
          <input type="date" name="eventDate" value={form.eventDate} onChange={onChange} required />
        </label>

        <label className="full-width">
          Delivery address
          <textarea
            rows={3}
            name="deliveryAddress"
            value={form.deliveryAddress}
            onChange={onChange}
            required
          />
        </label>

        <button type="submit" className="btn primary" disabled={loading}>
          {loading ? "Calculating..." : "Submit Event"}
        </button>
      </form>
      {loading ? <Loader /> : null}
    </Card>
  );
}

export default CreateEventPage;
