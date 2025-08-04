import type { IconType } from "react-icons";

export type Item = {
  id: string;
  title: string;
  href: string;
};

export type SocialItem = {
  id: string;
  href: string;
  icon: IconType;
};
