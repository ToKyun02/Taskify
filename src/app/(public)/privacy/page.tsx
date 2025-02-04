import SubHeader from '../_components/SubHeader';

type PRIVACY_CONTENT = {
  title: string;
  contents: string[];
  items?: string[];
};

const PRIVACY_CONTENT_DATA: PRIVACY_CONTENT[] = [
  {
    title: '개인정보 처리방침 안내',
    contents: ['테스키파이(이하 "회사")는 이용자의 개인정보를 중요하게 생각하며, 개인정보 보호법 등 관련 법령을 준수합니다.'],
  },
  {
    title: '1. 수집하는 개인정보',
    contents: ['회사는 다음과 같은 개인정보를 수집합니다.'],
    items: ['필수 항목 : 이메일, 닉네임'],
  },
  {
    title: '2. 개인정보의 이용 목적',
    contents: ['회사는 수집한 개인정보를 다음과 같은 목적으로 이용합니다.'],
    items: ['서비스 회원가입 및 관리', '서비스 제공 및 운영', '고객 문의 응대 및 지원'],
  },
  {
    title: '3. 개인정보 보관 및 파기',
    contents: [],
    items: ['이용자의 개인정보는 서비스 제공 목적이 달성되면 지체 없이 파기됩니다.', '단, 관련 법령에 따라 일정 기간 보관이 필요한 경우 해당 법령을 따릅니다.'],
  },
  {
    title: '4. 개인정보 제공 및 위탁',
    contents: [],
    items: ['회사는 이용자의 개인정보를 제3자에게 제공하지 않으며, 외부 업체에 위탁하지 않습니다.'],
  },
  {
    title: '5. 문의',
    contents: ['개인정보 관련 문의 사항은 master@taskify.com로 연락해 주세요.', '본 방침은 변경될 수 있으며, 변경 시 공지사항을 통해 안내드립니다.'],
  },
];

export default function PrivacyPage() {
  return (
    <div className='py-20'>
      <SubHeader title='Privacy Policy' desc='개인정보처리방침' />

      {PRIVACY_CONTENT_DATA.map((section) => (
        <section key={section.title} className='mb-10 space-y-3'>
          <h3 className='mb-3 text-lg font-semibold'>{section.title}</h3>

          {section.contents?.map((content) => (
            <p key={content} className='text-md'>
              {content}
            </p>
          ))}

          {section.items && (
            <ul className='list-inside list-disc space-y-1 text-md'>
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </section>
      ))}

      <span className='text-md opacity-50'>최종 수정일: 2024년 1월 16일</span>
    </div>
  );
}
