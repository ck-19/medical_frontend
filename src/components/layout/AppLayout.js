import Navbar from './Navbar';
import Sidebar from './Sidebar';

function AppLayout({
  role,
  title,
  sidebarItems,
  activeTab,
  onTabChange,
  children,
  mainClassName = 'flex-1 p-6',
}) {
  const showSidebar = sidebarItems?.length > 0;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar role={role} title={title} />
      <div className="flex flex-1">
        {showSidebar && (
          <Sidebar items={sidebarItems} activeKey={activeTab} onSelect={onTabChange} />
        )}
        <main className={mainClassName}>{children}</main>
      </div>
    </div>
  );
}

export default AppLayout;
