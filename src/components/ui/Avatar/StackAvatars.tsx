import Avatar from './Avatar';

interface StackAvatarsProps {
  members: { email: string; profileImageUrl?: string }[];
  visibleCount: number;
}

export default function StackAvatars({ members, visibleCount = 3 }: StackAvatarsProps) {
  const chunkedMembers = members.slice(0, visibleCount);
  const restMembersCount = members.length - visibleCount;

  return (
    <ul className='flex pl-2 leading-none'>
      {chunkedMembers.map((member) => (
        <li key={member.email} className='-ml-2'>
          <Avatar email={member.email} profileImageUrl={member.profileImageUrl} />
        </li>
      ))}
      {restMembersCount > 0 && (
        <li className='-ml-2'>
          <span className='relative flex aspect-square h-full items-center justify-center rounded-full border-2 border-white bg-[#F4D7DA] font-medium text-[#D25B68]'>+{restMembersCount}</span>
        </li>
      )}
    </ul>
  );
}
