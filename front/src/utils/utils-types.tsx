export enum ResponsiveBreakpoint {
  XXS = "XXS",
  XS = "XS",
  SM = "SM",
  MD = "MD",
  LG = "LG",
  XL = "XL",
  XXL = "XXL"
}

export const BreakpointsMap: { [key: number]: keyof typeof ResponsiveBreakpoint } = {
  400: "XXS",
  480: "XS",
  576: "SM",
  768: "MD",
  992: "LG",
  1200: "XL",
  1600: "XXL",
}