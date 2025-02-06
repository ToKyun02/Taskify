import { StaticImageData } from 'next/image';

export type BaseLinkItem = {
  path: string;
  label: string;
};

export type IconLinkItem = BaseLinkItem & {
  icon: StaticImageData;
};
