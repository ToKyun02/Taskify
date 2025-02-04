import SubHeader from '../_components/SubHeader';
import { Heading3, List, ListItem, Paragraph, Section } from './_components/Typography';

export default function PrivacyPage() {
  return (
    <div className='py-20'>
      <SubHeader title='Privacy Policy' desc='개인정보처리방침' />
      <Section>
        <Paragraph>테스키파이(이하 &quot;회사&quot;)는 이용자의 개인정보를 중요하게 생각하며, 개인정보 보호법 등 관련 법령을 준수합니다.</Paragraph>
      </Section>
      <Section>
        <Heading3>1. 수집하는 개인정보</Heading3>
        <Paragraph>회사는 다음과 같은 개인정보를 수집합니다.</Paragraph>
        <List>
          <ListItem>필수 항목 : 이메일, 닉네임</ListItem>
        </List>
      </Section>
      <Section>
        <Heading3>2. 개인정보의 이용 목적</Heading3>
        <Paragraph>회사는 수집한 개인정보를 다음과 같은 목적으로 이용합니다.</Paragraph>
        <List>
          <ListItem>서비스 회원가입 및 관리 </ListItem>
          <ListItem>서비스 제공 및 운영 </ListItem>
          <ListItem>고객 문의 응대 및 지원</ListItem>
        </List>
      </Section>
      <Section>
        <Heading3>3. 개인정보 보관 및 파기</Heading3>
        <List>
          <ListItem>이용자의 개인정보는 서비스 제공 목적이 달성되면 지체 없이 파기됩니다.</ListItem>
          <ListItem>단, 관련 법령에 따라 일정 기간 보관이 필요한 경우 해당 법령을 따릅니다.</ListItem>
        </List>
      </Section>
      <Section>
        <Heading3>4. 개인정보 제공 및 위탁</Heading3>
        <List>
          <ListItem>회사는 이용자의 개인정보를 제3자에게 제공하지 않으며, 외부 업체에 위탁하지 않습니다.</ListItem>
        </List>
      </Section>
      <Section>
        <Heading3>5. 문의</Heading3>
        <Paragraph>
          개인정보 관련 문의 사항은 <strong>master@taskify.com</strong>로 연락해 주세요.
        </Paragraph>
        <Paragraph>본 방침은 변경될 수 있으며, 변경 시 공지사항을 통해 안내드립니다.</Paragraph>
      </Section>
      <span className='text-md opacity-50'>최종 수정일: 2024년 1월 16일</span>
    </div>
  );
}
