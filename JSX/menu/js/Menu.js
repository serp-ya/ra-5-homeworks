function Menu(data) {
  const isOpened = data.opened;
  const itemsData = data.items;

  const menuItems = itemsData.map((item, index) => {
    return (
      <li key={index}>
        <a href={item.href}>{item.title}</a>
      </li>
    );
  });

  return (
    <div className={(isOpened ? "menu menu-open" : "menu")}>
      <div className="menu-toggle"><span></span></div>
      {isOpened && (
        <nav>
          <ul>
            {menuItems}
          </ul>
        </nav>
      )}
    </div>
  );
}