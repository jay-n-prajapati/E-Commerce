import Analytics from './Analytics';
import Categories from './Categories';
import RecentOrders from './RecentOrders';

export default function DashBoard() {
  return (
    <div className="flex flex-col gap-4">
      <Analytics />
      <div className="flex flex-grow flex-col gap-4 lg:flex-row">
        <RecentOrders />
        <Categories />
      </div>
    </div>
  );
}
