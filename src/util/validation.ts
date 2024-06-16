import type { Parser, inferParser } from "../types/parser.js";

export type ParseFn<TType> = (value: unknown) => Promise<TType> | TType;

/**
 * Get the validation function depending on the parser type
 */
export function getParseFn<TType>(procedureParser: Parser): ParseFn<TType> {
  const parser = procedureParser as any;

  if (typeof parser === "function") {
    // ParserCustomValidatorEsque
    return parser;
  }

  if (typeof parser.parseAsync === "function") {
    // ParserZodEsque
    return parser.parseAsync.bind(parser);
  }

  if (typeof parser.parse === "function") {
    // ParserZodEsque
    // ParserValibotEsque (<= v0.12.X)
    return parser.parse.bind(parser);
  }

  if (typeof parser.validateSync === "function") {
    // ParserYupEsque
    return parser.validateSync.bind(parser);
  }

  if (typeof parser.create === "function") {
    // ParserSuperstructEsque
    return parser.create.bind(parser);
  }

  throw new Error("Could not find a validator fn");
}

/**
 * Validate the input against the schema
 * This function will infer the output type from the parser
 * @param input The input to validate
 * @param schema The schema to validate against (must be a parser definition)
 */
export function validate<$Parser extends Parser>(input: unknown, schema: $Parser): inferParser<$Parser>["out"] {
  const parser = getParseFn(schema);
  return parser(input);
}
