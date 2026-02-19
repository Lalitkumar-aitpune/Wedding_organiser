function MaterialList({ materials = [] }) {
  if (!materials.length) return <p>No raw materials calculated.</p>;

  return (
    <ul className="material-list">
      {materials.map((material) => (
        <li key={material.product}>
          <span>{material.product}</span>
          <strong>{material.quantityKg.toFixed(2)} kg</strong>
        </li>
      ))}
    </ul>
  );
}

export default MaterialList;
