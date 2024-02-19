export default function roundAllNumbers(arrayOfNumbers: number[]): number[] {
  return [...arrayOfNumbers].map((number) => Math.round(number));
}
