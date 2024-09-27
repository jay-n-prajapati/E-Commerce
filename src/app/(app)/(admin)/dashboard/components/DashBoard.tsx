import Analytics from './Analytics';
import Categories from './Categories';
import Tags from './Tags';

export default function DashBoard() {
  return (
    <div className="flex flex-col gap-4">
      <Analytics />
      <div className="flex flex-grow flex-col gap-4 lg:flex-row">
        <Tags />
        <Categories />
      </div>
    </div>
  );
}
