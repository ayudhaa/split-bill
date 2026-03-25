function Summary({ items }) {
  const total = items.reduce((sum, i) => sum + i.price, 0);
  const totalPeople = items.reduce((sum, i) => sum + i.people, 0);
  const perPerson = totalPeople ? total / totalPeople : 0;
  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number);
  };

  return (
    <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-xl">
      <div className="flex justify-between mb-1">
        <span>Total Bill</span>
        <span>Rp {total}</span>
      </div>

      <div className="flex justify-between mb-1">
        <span>Total Orang</span>
        <span>{totalPeople}</span>
      </div>

      <div className="flex justify-between font-bold text-lg">
        <span>Per Orang</span>
        <span>Rp {perPerson.toFixed(0)}</span>
      </div>

    </div>
  );
}

export default Summary;