export default function DefaultPage({ page }) {
  return (
    <section>
      <h1 className="h1">{page.title}</h1>
      <p className="sub">{page.desc}</p>
      <div className="stats">
        {page.cards.map(([t, v, s]) => (
          <div className="card stat" key={t}>
            <small>{t}</small>
            <b>{v}</b>
            <span>{s}</span>
          </div>
        ))}
      </div>
      <div className="card blank">
        <h4>{page.label}</h4>
        This is a default page. Replace this card with your own content.
      </div>
    </section>
  );
}
