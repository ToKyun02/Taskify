import { Member } from '@/apis/members/types';
import Avatar from '@/components/ui/Avatar';

interface StackAvatarsProps {
  members: Pick<Member, 'email' | 'profileImageUrl'>[];
  visibleCount: number;
  totalCount: number;
}

export default function StackAvatars({ members, visibleCount = 3, totalCount }: StackAvatarsProps) {
  const chunkedMembers = members.slice(0, visibleCount);
  const restMembersCount = totalCount - visibleCount;

  return (
    <div className='pl-2'>
      <ul className='flex leading-none'>
        {chunkedMembers.map((member) => (
          <li key={member.email} className='-ml-2 w-10'>
            <Avatar email={member.email} profileImageUrl={member.profileImageUrl} />
          </li>
        ))}
        {restMembersCount > 0 && (
          <li className='-ml-2 w-10'>
            <span className='relative flex aspect-square h-full items-center justify-center rounded-full border-2 border-white bg-[#F4D7DA] font-medium text-[#D25B68]'>+{restMembersCount}</span>
          </li>
        )}
      </ul>
    </div>
  );
}
