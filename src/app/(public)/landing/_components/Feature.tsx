import feature_img_1 from '@/assets/landings/feature-1.png';
import feature_img_2 from '@/assets/landings/feature-2.png';
import Image from 'next/image';

const FEATURE_CONTENT = [
  {
    point: 1,
    title: '일의 우선순위를\n관리하세요',
    image: feature_img_1,
    imageClassName: 'pl-[10%] md:pl-[20%] lg:p-0',
  },
  {
    point: 2,
    title: '해야 할 일을\n등록하세요',
    image: feature_img_2,
  },
];

export default function Feature() {
  return (
    <section className='grid gap-[5.625rem] py-5'>
      {FEATURE_CONTENT.map((item, index) => (
        <div key={index} className='overflow-hidden rounded-lg bg-gray-80 lg:flex lg:h-[37.5rem] [&:nth-child(2)]:lg:flex-row-reverse'>
          <div className='p-[3.75rem] text-center md:text-left lg:w-[48%] lg:pt-[7.5rem]'>
            <div className='mb-[5.375rem] text-2lg text-[1.375rem] text-gray-40 md:mb-[6.25rem]'>Point {item.point}</div>
            <h2 className='whitespace-pre-wrap text-[2.25rem] font-bold md:text-[3rem]'>{item.title}</h2>
          </div>
          {/* TODO: clsx 패키지 추가되면, 클래스 정리 필요 */}
          <figure className={`${item.imageClassName ?? ''} lg:flex lg:w-[52%] lg:items-end`}>
            <Image src={item.image} alt={item.title} className='h-auto w-full' />
          </figure>
        </div>
      ))}
    </section>
  );
}
