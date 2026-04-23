function Card({ title, children }) {
  return (
    <section className="card">
      {title ? (
        <div className="card-header">
          <h2>{title}</h2>
        </div>
      ) : null}
      {children}
    </section>
  );
}

export default Card;
