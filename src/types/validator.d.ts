// KUDOS to trpc for the inspiration

/**
 * Represents a Zod validator with input and parsed output types.
 * @template TI - The expected input type.
 * @template TPI - The parsed output type.
 */
export type ValidatorZod<TI, TPI> = {
  _input: TI;
  _output: TPI;
};

/**
 * Represents a Valibot validator with optional input and output types specification.
 * @template TI - The expected input type.
 * @template TPI - The output type after validation.
 */
export type ValidatorValibot<TI, TPI> = {
  types?: {
    input: TI;
    output: TPI;
  };
};

/**
 * Represents a MyZod validator which contains a parse method for input data.
 * @template TI - The type into which the input data will be parsed.
 */
export type ValidatorMyZod<TI> = {
  parse: (input: any) => TI;
};

/**
 * Represents a Superstruct validator which contains a create method to construct a typed object.
 * @template TI - The type that the input will be validated against and created as.
 */
export type ValidatorSuperstruct<TI> = {
  create: (input: unknown) => TI;
};

/**
 * Represents a generic validator function that may return a promise or a direct value.
 * @template TI - The type that the input is validated against and returned.
 */
export type ValidatorCustomValidator<TI> = (input: unknown) => Promise<TI> | TI;

/**
 * Represents a Yup validator which contains a synchronous validate method.
 * @template TI - The type that the input is validated against and returned.
 */
export type ValidatorYup<TI> = {
  validateSync: (input: unknown) => TI;
};

/**
 * A union type for validators that do not distinguish between input and output types.
 * @template TI - The type for input which is also used as the output type.
 */
export type ValidatorWithoutInput<TI> =
  | ValidatorCustomValidator<TI>
  | ValidatorMyZod<TI>
  | ValidatorSuperstruct<TI>
  | ValidatorYup<TI>;

/**
 * A union type for validators that clearly separate input and output types.
 * @template TI - The input type.
 * @template TPI - The output type.
 */
export type ValidatorWithInputOutput<TI, TPI> = ValidatorZod<TI, TPI> | ValidatorValibot<TI, TPI>;

/**
 * A base type representing any kind of validator, either distinguishing between input/output types or not.
 */
export type Validator = ValidatorWithInputOutput<any, any> | ValidatorWithoutInput<any>;

/**
 * Type utility to infer input and output types from a Validator type.
 * @template $Validator - The validator type.
 * @returns The inferred input and output types based on the validator specification.
 */
export type inferValidator<$Validator extends Validator> = $Validator extends ValidatorWithInputOutput<
  infer $TIn,
  infer $TOut
>
  ? {
      in: $TIn;
      out: $TOut;
    }
  : $Validator extends ValidatorWithoutInput<infer $InOut>
    ? {
        in: $InOut;
        out: $InOut;
      }
    : never;
