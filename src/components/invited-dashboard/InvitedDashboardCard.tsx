'use client';

import Image from 'next/image';
import Button from '../ui/Button/Button';
import searchIc from '@/assets/icons/search.svg';
import empty_dashboard from '@/assets/images/empty_dashboard.png';
import mockData from '@/apis/invitations/mockData';
import { useState } from 'react';

export default function InvitedDashboardCard() {
  const { invitations } = mockData;
  const [searchKeyword, setSearchKeyword] = useState('');

  const filteredInvitations = invitations.filter((item) => item.dashboard.title.toLocaleLowerCase().includes(searchKeyword.toLocaleLowerCase()));

  return (
    <div className='w-full rounded-lg bg-white py-6 md:w-full md:py-4 lg:w-[1022px] lg:py-8'>
      {invitations.length === 0 ? (
        <div className='flex w-full flex-col gap-[105px] rounded-lg pb-20 pl-5 pr-5 pt-6 md:w-full md:gap-16 md:rounded-2xl md:pb-[120px] md:pl-10 md:pr-10 lg:w-[960px]'>
          <h3 className='text-md font-bold text-gray-70 md:text-2xl'>초대받은 대시보드</h3>
          <div className='mx-auto flex w-[158px] flex-col items-center gap-6 md:w-[238px]'>
            <Image src={empty_dashboard} width={60} height={60} alt='empty_dashboard' className='md:h-[75px] md:w-[87.5px]' />
            <span className='text-xs text-gray-40 md:text-2lg'>아직 초대받은 대시보드가 없어요.</span>
          </div>
        </div>
      ) : (
        <>
          <div className='flex flex-col gap-6'>
            <div className='flex flex-col gap-8 px-8 lg:px-14'>
              <h3 className='text-2xl font-bold text-gray-70'>초대받은 대시보드</h3>
              <div className='flex h-10 items-center gap-2 rounded-md border px-4 py-1.5'>
                <Image src={searchIc} width={16} height={16} alt='search' />
                <input placeholder='검색' className='w-full flex-1 outline-none' value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} />
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
                  {filteredInvitations.map((item) => (
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
                  {filteredInvitations.map((item) => (
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
        </>
      )}
    </div>
  );
}
