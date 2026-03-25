import { useState } from "react";
import Notiflix from "notiflix";

function ItemForm({ addItem }) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [people, setPeople] = useState(1);

  const formatRupiah = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handlePrice = (e) => {
    setPrice(formatRupiah(e.target.value));
  };

  const submit = (e) => {
    e.preventDefault();

    if (!title) {
      Notiflix.Notify.failure("Nama item belum diisi");
      return;
    }

    if (!price) {
      Notiflix.Notify.failure("Harga belum diisi");
      return;
    }

    if (!people || Number(people) === 0 || Number(people) == 1) {
      Notiflix.Notify.failure("Jumlah orangnya harus lebih dari 1 yaaa");
      return;
    }

    addItem({
      id: Date.now(),
      title,
      price: Number(price.replace(/\./g, "")),
      people: Number(people),
    });

    Notiflix.Notify.success("Item berhasil ditambahkan");

    setTitle("");
    setPrice("");
    setPeople(1);
  };

  return (
    <form
      onSubmit={submit}
      className="mt-4 bg-gray-50 dark:bg-gray-700 p-4 rounded-xl shadow"
    >
      <input
        type="text"
        placeholder="Nama item"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full mb-3 p-3 rounded-lg border dark:bg-gray-800"
      />

      <div className="grid grid-cols-2 gap-2 mb-3">
        <input
          type="text"
          placeholder="Harga"
          value={price}
          onChange={handlePrice}
          className="p-3 rounded-lg border dark:bg-gray-800"
        />

        <input
          type="number"
          placeholder="Jumlah orang"
          value={people}
          onChange={(e) => setPeople(e.target.value)}
          className="p-3 rounded-lg border dark:bg-gray-800"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-lg dark:bg-gray-200 dark:text-black"
      >
        Tambah Item
      </button>
    </form>
  );
}

export default ItemForm;