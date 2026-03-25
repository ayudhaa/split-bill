import { useState, useEffect } from "react";
import ItemForm from "./components/ItemForm";
import ItemList from "./components/ItemList";
import Footer from "./components/Footer";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [items, setItems] = useLocalStorage("items", []);
  const [dark, setDark] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    localStorage.setItem("darkMode", dark);

    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  const addItem = (item) => {
    setItems([item, ...items]);
  };

  const deleteItem = (id) => {
    setItems(items.filter((i) => i.id !== id));
  };

  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number);
  };

  const total = items.reduce((sum, i) => sum + i.price, 0);
  const totalPeople = items.reduce((sum, i) => sum + i.people, 0);
  const perPerson = totalPeople ? total / totalPeople : 0;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex justify-center py-6 px-3">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 text-gray-800 dark:text-white">
        <div className="flex justify-between items-center mb-3">
          <h1 className="text-lg font-bold">Split Bill</h1>

          <button
            onClick={() => setDark(!dark)}
            className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-700"
          >
            {dark ? "☀️" : "🌙"}
          </button>
        </div>

        <ItemForm addItem={addItem} />
        <ItemList items={items} deleteItem={deleteItem} />

        <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-xl">
          <div className="flex justify-between mb-1">
            <span>Total Bill</span>
            <span>{rupiah(total)}</span>
          </div>

          <div className="flex justify-between mb-1">
            <span>Total Orang</span>
            <span>{totalPeople}</span>
          </div>

          <div className="flex justify-between font-bold text-lg">
            <span>Per Orang</span>
            <span>{rupiah(perPerson.toFixed(0))}</span>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;