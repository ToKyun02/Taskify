import setting_img_1 from '@/assets/landings/setting-1.png';
import setting_img_2 from '@/assets/landings/setting-2.png';
import setting_img_3 from '@/assets/landings/setting-3.png';
import Image from 'next/image';

const SETTING_CONTENT = [
  {
    title: '대시보드 설정',
    desc: '대시보드 사진과 이름을 변경할 수 있어요.',
    image: setting_img_1,
  },
  {
    title: '초대',
    desc: '새로운 팀원을 초대할 수 있어요.',
    image: setting_img_2,
  },
  {
    title: '구성원',
    desc: '구성원을 초대하고 내보낼 수 있어요.',
    image: setting_img_3,
  },
];

export default function Setting() {
  return (
    <section className='mx-auto mb-12 max-w-[23.625rem] py-[5.625rem] lg:max-w-full'>
      <h2 className='mb-[2.625rem] text-center text-2xl font-bold md:text-[1.75rem] lg:text-left'>생산성을 높이는 다양한 설정 ⚡</h2>
      <ul className='flex flex-col gap-10 md:gap-12 lg:flex-row lg:gap-8'>
        {SETTING_CONTENT.map((item, index) => (
          <div key={index} className='overflow-hidden rounded-lg bg-gray-80'>
            <figure className='bg-gray-60'>
              <Image src={item.image} alt={item.title} className='h-auto w-full' />
            </figure>
            <div className='px-8 py-[1.688rem] md:py-8'>
              <h3 className='mb-4 text-2lg font-bold'>{item.title}</h3>
              <div className='font-medium'>{item.desc}</div>
            </div>
          </div>
        ))}
      </ul>
    </section>
  );
}
