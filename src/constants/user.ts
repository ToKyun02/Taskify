export const PROFILEEDIT_FORM_PLACEHOLDER = {
  NICKNAME: '닉네임을 입력해 주세요',
} as const;

export const PROFILEEDIT_FORM_VALID_LENGTH = {
  NICKNAME: {
    MAX: 10,
  },
} as const;

export const PROFILEEDIT_FORM_ERROR_MESSAGE = {
  NICKNAME: {
    MAX: '열 자 이하로 작성해 주세요',
  },
  IMAGE: {
    TYPE: '지원되지 않는 이미지 파일입니다.',
    SIZE: 'MB이하로 올려주세요',
  },
} as const;
