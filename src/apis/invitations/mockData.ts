const mockData = {
  invitations: [
    {
      id: 1,
      inviter: {
        nickname: '손동희',
        email: 'donghee@example.com',
        id: 101,
      },
      teamId: 'team-001',
      dashboard: {
        title: '프로덕트 디자인',
        id: 501,
      },
      invitee: {
        nickname: '홍길동',
        email: 'hong@example.com',
        id: 102,
      },
      inviteAccepted: false,
      createdAt: '2025-02-07T05:53:20.799Z',
      updatedAt: '2025-02-07T05:53:20.799Z',
    },
    {
      id: 2,
      inviter: {
        nickname: '이민재',
        email: 'minjae@example.com',
        id: 103,
      },
      teamId: 'team-002',
      dashboard: {
        title: '영업 대시보드',
        id: 502,
      },
      invitee: {
        nickname: '박지성',
        email: 'jiseong@example.com',
        id: 104,
      },
      inviteAccepted: true,
      createdAt: '2025-02-05T08:15:00.000Z',
      updatedAt: '2025-02-06T09:30:00.000Z',
    },
    {
      id: 3,
      inviter: {
        nickname: '김수현',
        email: 'soohyun@example.com',
        id: 105,
      },
      teamId: 'team-003',
      dashboard: {
        title: '마케팅 대시보드',
        id: 503,
      },
      invitee: {
        nickname: '최영',
        email: 'young@example.com',
        id: 106,
      },
      inviteAccepted: false,
      createdAt: '2025-02-01T11:00:00.000Z',
      updatedAt: '2025-02-01T11:00:00.000Z',
    },
  ],
};

export default mockData;
