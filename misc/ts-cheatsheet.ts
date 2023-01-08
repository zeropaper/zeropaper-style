/**
 * This file contains some examples of TypeScript usage that I found useful.
 */
type ArrayFlatten<Type> = Type extends Array<infer Item> ? Item : Type;

type UA = "a" | "b";
type UB = "b" | "c";

type U = UA | UB;

const item: U = "a";
// @ts-ignore
const invalidItem: U = "d";

type InputType = string[];

type test = ArrayFlatten<InputType>;

const someArray = [1, 2, null];

const yep: ArrayFlatten<typeof someArray> = 1000;
const alsoYep: ArrayFlatten<typeof someArray> = null;
// @ts-ignore
const nope: ArrayFlatten<typeof someArray> = "1000";

type Attrs<EType> = EType extends HTMLElement
  ? {
      [AName in keyof EType]?: EType[AName];
    }
  : never;

function create<TName extends keyof HTMLElementTagNameMap>(
  tagName: TName,
  attrs: Attrs<HTMLElementTagNameMap[TName]>
): HTMLElementTagNameMap[TName] {
  const el = document.createElement(tagName);
  if (!attrs) return el;

  Object.entries(attrs).forEach(([key, value]) => {
    el.setAttribute(key, value.toString());
  });

  return el;
}

type AsyncReturnType<T extends (...args: any) => Promise<any>> = T extends (
  ...args: any
) => Promise<infer R>
  ? R
  : any;

async function asyncFn(): Promise<string> {
  return "a";
}

const returned: AsyncReturnType<typeof asyncFn> = "1";
// @ts-ignore
const notANumber: AsyncReturnType<typeof asyncFn> = 2;

export {};
