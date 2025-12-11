declare module "*.svg?react" {
  import { FC, SVGProps } from "react";
  const Component: FC<SVGProps<SVGSVGElement>>;
  export default Component;
}

declare module "*.svg" {
  const src: string;
  export default src;
}
