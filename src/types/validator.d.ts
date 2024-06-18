// KUDOS to trpc for the inspiration

export type ValidatorZod<TI, TPI> = {
  _input: TI;
  _output: TPI;
};

export type ValidatorValibot<TI, TPI> = {
  types?: {
    input: TI;
    output: TPI;
  };
};

export type ValidatorMyZod<TI> = {
  parse: (input: any) => TI;
};

export type ValidatorSuperstruct<TI> = {
  create: (input: unknown) => TI;
};

export type ValidatorCustomValidator<TI> = (input: unknown) => Promise<TI> | TI;

export type ValidatorYup<TI> = {
  validateSync: (input: unknown) => TI;
};

export type ValidatorWithoutInput<TI> =
  | ValidatorCustomValidator<TI>
  | ValidatorMyZod<TI>
  | ValidatorSuperstruct<TI>
  | ValidatorYup<TI>;

export type ValidatorWithInputOutput<TI, TPI> = ValidatorZod<TI, TPI> | ValidatorValibot<TI, TPI>;

export type Validator = ValidatorWithInputOutput<any, any> | ValidatorWithoutInput<any>;

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
