export const DASHBOARD_FORM_VALID_LENGTH = {
  TITLE: {
    MIN: 2,
    MAX: 10,
  },
} as const;

export const DASHBOARD_FORM_ERROR_MESSAGE = {
  TITLE: {
    MIN: '2자 이상 입력해 주세요',
    MAX: '10자 이하로 작성해 주세요',
  },
  EMAIL: {
    INVALID: '이메일 형식으로 작성해 주세요',
  },
} as const;
