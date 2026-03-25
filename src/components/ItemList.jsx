function ItemList({ items, deleteItem }) {
  const rupiah = (number) => {
    return "Rp. " + Number(number).toLocaleString("id-ID");
  };

  return (
    <div className="mt-4 max-h-64 overflow-y-auto">
      {items.map((i) => (
        <div
          key={i.id}
          className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg mb-2"
        >
          <div className="flex justify-between">
            <div>
              <div className="font-medium">{i.name}</div>
              <div className="text-sm opacity-70">
                {i.people} orang
              </div>
            </div>

            <div className="text-right">
              <div>{rupiah(i.price)}</div>
              <div className="text-sm opacity-70">
                {rupiah((i.price / i.people).toFixed(0))} / org
              </div>
            </div>

            <button onClick={() => deleteItem(i.id)}>❌</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ItemList;