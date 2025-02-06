export const SIGNUP_FORM_PLACEHOLDER = {
  EMAIL: '이메일을 입력해 주세요',
  NICKNAME: '닉네임을 입력해 주세요',
  PASSWORD: '8자 이상 입력해주세요',
  PASSWORD_CONFIRM: '비밀번호를 한번 더 입력해 주세요',
} as const;

export const SINGUP_FORM_VALID_LENGTH = {
  EMAIL: {
    MIN: 1,
  },
  NICKNAME: {
    MIN: 1,
    MAX: 10,
  },
  PASSWORD: {
    MIN: 8,
  },
} as const;

export const SIGNUP_FORM_ERROR_MESSAGE = {
  EMAIL: {
    MIN: '이메일을 입력해 주세요',
    NOT_FORM: '이메일 형식으로 작성해 주세요',
  },
  NICKNAME: {
    MIN: '닉네임을 작성해 주세요',
    MAX: '열 자 이하로 작성해 주세요',
  },
  PASSWORD: {
    MIN: '8자 이상 입력해 주세요',
  },
  PASSWORD_CONFIRM: {
    NOT_MATCH: '비밀번호가 일치하지 않습니다.',
  },
  TERMS: {
    NOT_TOS: '이용약관에 동의해야 합니다.',
  },
} as const;

export const LOGIN_FORM_PLACEHOLDER = {
  EMAIL: '이메일을 입력해 주세요',
  PASSWORD: '비밀번호를 입력해 주세요',
} as const;

export const LOGIN_FORM_VALID_LENGTH = {
  EMAIL: {
    MIN: 1,
  },
  PASSWORD: {
    MIN: 8,
  },
} as const;

export const LOGIN_FORM_ERROR_MESSAGE = {
  EMAIL: {
    MIN: '이메일을 입력해 주세요',
    NOT_FORM: '이메일 형식으로 작성해 주세요',
  },
  PASSWORD: {
    MIN: '8자 이상 작성해 주세요',
  },
} as const;

export const PASSWORD_PUT_FORM_VALID_LENGTH = {
  PASSWORD: {
    MIN: 8,
  },
  NEW_PASSWORD: {
    MIN: 8,
  },
} as const;

export const PASSWORD_PUT_FORM_ERROR_MESSAGE = {
  PASSWORD: {
    MIN: '8자 이상 입력해 주세요',
  },
  NEW_PASSWORD: {
    MIN: '8자 이상 입력해 주세요',
  },
  NEW_PASSWORD_CONFRIM: {
    NOT_MATCH: '비밀번호가 일치하지 않습니다',
  },
} as const;
