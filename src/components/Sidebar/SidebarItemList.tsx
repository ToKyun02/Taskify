import MyDashboardCard from '../mydashboard-card/MyDashboardCard';

interface ItemList {
  id: number;
  title: string;
  color: 'green-30' | 'blue-20' | 'orange-20' | 'purple' | 'pink-20';
  createdByMe: boolean | undefined;
}

interface SidebarItemListProps {
  currentGroups: ItemList[][];
}

export default function SidebarItemList({ currentGroups }: SidebarItemListProps) {
  return (
    <div className='flex flex-col gap-4'>
      {currentGroups.map((group, groupIndex) => (
        <div key={groupIndex} className='flex flex-col gap-2'>
          {group.map((item) => (
            <MyDashboardCard key={item.id} title={item.title} color={item.color} createdByMe={item.createdByMe} variant='sidebar' />
          ))}
        </div>
      ))}
    </div>
  );
}
