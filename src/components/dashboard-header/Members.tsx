import React from 'react';

interface MembersProps {
  users: { profileImageUrl: string }[];
}

export default function Members({ users }: MembersProps) {
  return (
    <div className='flex'>
      {users.map((user, index) => (
        <span key={index} className='-ml-[8px] flex h-[34px] w-[34px] items-center justify-center rounded-full border-2 border-white bg-green-30 text-white sm:h-[38px] sm:w-[38px]'>
          {user.profileImageUrl}
        </span>
      ))}
    </div>
  );
}
