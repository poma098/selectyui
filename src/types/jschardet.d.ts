declare module 'jschardet' {
  export function detect(text: string): { encoding: string, confidence: number };
}
