import Image from 'next/image';
import Button from '../ui/Button/Button';
import searchIc from '@/assets/icons/search.svg';
import mockData from '@/apis/invitations/mockData';

export default function InvitedDashboardCard() {
  return (
    <div className='w-[260px] rounded-lg bg-white py-6 md:w-[504px] md:py-4 lg:w-[1022px] lg:py-8'>
      <div className='flex flex-col gap-6'>
        <div className='flex flex-col gap-8 px-8 lg:px-14'>
          <h3 className='text-2xl font-bold text-gray-70'>초대받은 대시보드</h3>
          <div className='flex h-10 items-center gap-2 rounded-md border px-4 py-1.5'>
            <Image src={searchIc} width={16} height={16} alt='search' />
            <input placeholder='검색' className='w-full flex-1 outline-none' />
          </div>
        </div>
        <div className='px-8 lg:px-14'>
          <div className='hidden md:block'>
            <div className='mb-4 grid grid-cols-[1fr_1fr_2fr] gap-5 text-lg text-gray-40 lg:pl-10'>
              <span>이름</span>
              <span>초대자</span>
              <span>수락 여부</span>
            </div>
            <div className='flex flex-col gap-5'>
              {mockData.invitations.map((item) => (
                <div key={item.id} className='grid grid-cols-[1fr_1fr_2fr] items-center gap-5 border-b pb-4 text-lg text-gray-70 lg:pl-10'>
                  <span>{item.dashboard.title}</span>
                  <span>{item.inviter.nickname}</span>
                  <div className='flex gap-2.5'>
                    <Button size='sm' className='flex-0'>
                      수락
                    </Button>
                    <Button variant='outline' size='sm' className='flex-0'>
                      거절
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className='md:hidden'>
            <div className='flex flex-col'>
              {mockData.invitations.map((item) => (
                <div key={item.id} className='border-b pb-4 pt-3.5'>
                  <div className='flex flex-col gap-3.5'>
                    <div className='flex gap-6'>
                      <span className='text-md text-gray-40'>이름</span>
                      <span className='text-md text-gray-70'>{item.dashboard.title}</span>
                    </div>
                    <div className='flex gap-3'>
                      <span className='text-md text-gray-40'>초대자</span>
                      <span className='text-md text-gray-70'>{item.inviter.nickname}</span>
                    </div>
                    <div className='flex gap-2.5'>
                      <Button size='sm'>수락</Button>
                      <Button variant='outline' size='sm'>
                        거절
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
