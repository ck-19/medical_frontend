function Sidebar({ items = [], activeKey, onSelect }) {
  if (!items.length) return null;

  return (
    <aside className="w-48 bg-white border-r border-gray-200 min-h-[calc(100vh-53px)] pt-4 shrink-0">
      <nav className="flex flex-col">
        {items.map((item) => {
          const isActive = activeKey === item.key;
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => onSelect?.(item.key)}
              className={`w-full flex items-center justify-between gap-2 px-4 py-2.5 text-sm text-left border-l-2 transition-colors
                ${isActive
                  ? 'border-blue-600 bg-gray-50 text-gray-800 font-medium'
                  : 'border-transparent text-gray-400 hover:text-gray-600 hover:bg-gray-50'}`}>
              <span>{item.label}</span>
              {item.count !== undefined && (
                <span
                  className={`text-xs rounded-full px-2 py-0.5 ${
                    isActive ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'
                  }`}>
                  {item.count}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;
