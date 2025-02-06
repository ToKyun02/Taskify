import SubHeader from '@/components/landing/layout/SubHeader';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/landing/Accordion';

const FAQ_CONTENTS = [
  {
    id: 'faq-1',
    title: 'Taskify는 어떤 기능을 제공하나요?',
    content:
      'Taskify는 업무 관리를 쉽고 효율적으로 할 수 있도록 도와주는 도구입니다. 사용자는 할 일을 추가하고 상태를 업데이트할 수 있으며, 여러 프로젝트를 생성해 태스크를 그룹화할 수 있습니다. 또한 각 태스크에 마감일을 설정하여 기한을 관리할 수 있고, 팀원을 초대해 함께 업무를 진행할 수도 있습니다. 마감일이 다가오거나 업데이트가 있을 때 알림을 받을 수 있는 기능도 제공합니다.',
  },
  {
    id: 'faq-2',
    title: 'Taskify는 무료로 사용할 수 있나요?',
    content:
      'Taskify는 모든 기능을 완전히 무료로 사용할 수 있습니다. 사용자는 프로젝트를 무제한으로 생성할 수 있으며, 태스크도 제한 없이 추가할 수 있습니다. 또한 팀원을 초대해 협업할 수 있고, 마감일 관리와 알림 기능도 자유롭게 이용할 수 있습니다. .',
  },

  {
    id: 'faq-3',
    title: '팀원을 초대하려면 어떻게 해야 하나요?',
    content:
      'Taskify에서 팀원을 초대하는 방법은 간단합니다. 먼저 프로젝트 페이지로 이동한 뒤, 오른쪽 상단에 있는 "초대하기" 버튼을 클릭합니다. 이후 초대할 팀원의 이메일 주소를 입력하고 "생성" 버튼을 누르면 됩니다.',
  },

  {
    id: 'faq-4',
    title: '태스크의 상태를 변경하려면 어떻게 하나요?',
    content:
      '태스크의 상태를 변경하려면 먼저 태스크 목록에서 변경할 태스크를 클릭한 후, 태스크 상세 페이지로 이동합니다. 그곳에서 "상태" 드롭다운 메뉴를 클릭하면 "할 일", "진행 중", "완료" 등의 상태를 선택할 수 있습니다. ',
  },
];

export default function FaqPage() {
  return (
    <div className='py-20'>
      <SubHeader title='FAQ' desc='자주묻는 질문' />
      <Accordion>
        {FAQ_CONTENTS.map((item) => (
          <AccordionItem key={item.id} value={item.id}>
            <AccordionTrigger>{item.title}</AccordionTrigger>
            <AccordionContent>{item.content}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
