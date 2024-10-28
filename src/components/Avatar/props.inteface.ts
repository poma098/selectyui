export interface AvatarProps {
  path: string;
  title?: string;
  onClick?: () => void;
  size?: AvatarSize;
  style?: React.CSSProperties;
}

export interface AvatarsProps {
  paths: Omit<AvatarProps, "size">[];
  size?: AvatarSize;
  limit?: AvatarsLimit<number>;
  gap?: number;
  style?: React.CSSProperties;
}

export type AvatarsLimit<T extends number> = T extends 0 ? never : T;

export type AvatarSize = "xs" | "s" | "m" | "l" | "xl"