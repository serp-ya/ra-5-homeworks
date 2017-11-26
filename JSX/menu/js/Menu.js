function Menu(data) {
  const isOpened = data.opened;
  const itemsData = data.items;

  if (!isOpened) {
    return (
      <div className="menu">
        <div className="menu-toggle"><span></span></div>
      </div>
    );
  }

  const menuItems = itemsData.map((item, index) => {
    return (
      <li key={item.index}>
        <a href={item.href}>{item.title}</a>
      </li>
    );
  });

  return (
    <div className="menu menu-open">
      <div className="menu-toggle"><span></span></div>
      <nav>
        <ul>
          {menuItems}
        </ul>
      </nav>
    </div>
  );
}