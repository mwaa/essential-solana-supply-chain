/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import {
  addDecoderSizePrefix,
  addEncoderSizePrefix,
  combineCodec,
  fixDecoderSize,
  fixEncoderSize,
  getAddressEncoder,
  getArrayDecoder,
  getArrayEncoder,
  getBytesDecoder,
  getBytesEncoder,
  getOptionDecoder,
  getOptionEncoder,
  getProgramDerivedAddress,
  getStructDecoder,
  getStructEncoder,
  getU32Decoder,
  getU32Encoder,
  getUtf8Decoder,
  getUtf8Encoder,
  transformEncoder,
  type AccountMeta,
  type AccountSignerMeta,
  type Address,
  type Codec,
  type Decoder,
  type Encoder,
  type Instruction,
  type InstructionWithAccounts,
  type InstructionWithData,
  type Option,
  type OptionOrNullable,
  type ReadonlyAccount,
  type ReadonlyUint8Array,
  type TransactionSigner,
  type WritableAccount,
  type WritableSignerAccount,
} from 'gill';
import { SUPPLY_CHAIN_PROGRAM_PROGRAM_ADDRESS } from '../programs';
import {
  expectAddress,
  expectSome,
  getAccountMetaFactory,
  type ResolvedAccount,
} from '../shared';
import {
  getStageDecoder,
  getStageEncoder,
  type Stage,
  type StageArgs,
} from '../types';

export const INITIALIZE_PRODUCT_DISCRIMINATOR = new Uint8Array([
  251, 245, 7, 123, 247, 50, 14, 2,
]);

export function getInitializeProductDiscriminatorBytes() {
  return fixEncoderSize(getBytesEncoder(), 8).encode(
    INITIALIZE_PRODUCT_DISCRIMINATOR
  );
}

export type InitializeProductInstruction<
  TProgram extends string = typeof SUPPLY_CHAIN_PROGRAM_PROGRAM_ADDRESS,
  TAccountProductAccount extends string | AccountMeta<string> = string,
  TAccountOwner extends string | AccountMeta<string> = string,
  TAccountSystemProgram extends
    | string
    | AccountMeta<string> = '11111111111111111111111111111111',
  TRemainingAccounts extends readonly AccountMeta<string>[] = [],
> = Instruction<TProgram> &
  InstructionWithData<ReadonlyUint8Array> &
  InstructionWithAccounts<
    [
      TAccountProductAccount extends string
        ? WritableAccount<TAccountProductAccount>
        : TAccountProductAccount,
      TAccountOwner extends string
        ? WritableSignerAccount<TAccountOwner> &
            AccountSignerMeta<TAccountOwner>
        : TAccountOwner,
      TAccountSystemProgram extends string
        ? ReadonlyAccount<TAccountSystemProgram>
        : TAccountSystemProgram,
      ...TRemainingAccounts,
    ]
  >;

export type InitializeProductInstructionData = {
  discriminator: ReadonlyUint8Array;
  serialNumber: string;
  description: string;
  stages: Option<Array<Stage>>;
};

export type InitializeProductInstructionDataArgs = {
  serialNumber: string;
  description: string;
  stages: OptionOrNullable<Array<StageArgs>>;
};

export function getInitializeProductInstructionDataEncoder(): Encoder<InitializeProductInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', fixEncoderSize(getBytesEncoder(), 8)],
      ['serialNumber', addEncoderSizePrefix(getUtf8Encoder(), getU32Encoder())],
      ['description', addEncoderSizePrefix(getUtf8Encoder(), getU32Encoder())],
      ['stages', getOptionEncoder(getArrayEncoder(getStageEncoder()))],
    ]),
    (value) => ({ ...value, discriminator: INITIALIZE_PRODUCT_DISCRIMINATOR })
  );
}

export function getInitializeProductInstructionDataDecoder(): Decoder<InitializeProductInstructionData> {
  return getStructDecoder([
    ['discriminator', fixDecoderSize(getBytesDecoder(), 8)],
    ['serialNumber', addDecoderSizePrefix(getUtf8Decoder(), getU32Decoder())],
    ['description', addDecoderSizePrefix(getUtf8Decoder(), getU32Decoder())],
    ['stages', getOptionDecoder(getArrayDecoder(getStageDecoder()))],
  ]);
}

export function getInitializeProductInstructionDataCodec(): Codec<
  InitializeProductInstructionDataArgs,
  InitializeProductInstructionData
> {
  return combineCodec(
    getInitializeProductInstructionDataEncoder(),
    getInitializeProductInstructionDataDecoder()
  );
}

export type InitializeProductAsyncInput<
  TAccountProductAccount extends string = string,
  TAccountOwner extends string = string,
  TAccountSystemProgram extends string = string,
> = {
  productAccount?: Address<TAccountProductAccount>;
  owner: TransactionSigner<TAccountOwner>;
  systemProgram?: Address<TAccountSystemProgram>;
  serialNumber: InitializeProductInstructionDataArgs['serialNumber'];
  description: InitializeProductInstructionDataArgs['description'];
  stages: InitializeProductInstructionDataArgs['stages'];
};

export async function getInitializeProductInstructionAsync<
  TAccountProductAccount extends string,
  TAccountOwner extends string,
  TAccountSystemProgram extends string,
  TProgramAddress extends Address = typeof SUPPLY_CHAIN_PROGRAM_PROGRAM_ADDRESS,
>(
  input: InitializeProductAsyncInput<
    TAccountProductAccount,
    TAccountOwner,
    TAccountSystemProgram
  >,
  config?: { programAddress?: TProgramAddress }
): Promise<
  InitializeProductInstruction<
    TProgramAddress,
    TAccountProductAccount,
    TAccountOwner,
    TAccountSystemProgram
  >
> {
  // Program address.
  const programAddress =
    config?.programAddress ?? SUPPLY_CHAIN_PROGRAM_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    productAccount: { value: input.productAccount ?? null, isWritable: true },
    owner: { value: input.owner ?? null, isWritable: true },
    systemProgram: { value: input.systemProgram ?? null, isWritable: false },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  // Original args.
  const args = { ...input };

  // Resolve default values.
  if (!accounts.productAccount.value) {
    accounts.productAccount.value = await getProgramDerivedAddress({
      programAddress,
      seeds: [
        getBytesEncoder().encode(
          new Uint8Array([112, 114, 111, 100, 117, 99, 116])
        ),
        getAddressEncoder().encode(expectAddress(accounts.owner.value)),
        addEncoderSizePrefix(getUtf8Encoder(), getU32Encoder()).encode(
          expectSome(args.serialNumber)
        ),
      ],
    });
  }
  if (!accounts.systemProgram.value) {
    accounts.systemProgram.value =
      '11111111111111111111111111111111' as Address<'11111111111111111111111111111111'>;
  }

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.productAccount),
      getAccountMeta(accounts.owner),
      getAccountMeta(accounts.systemProgram),
    ],
    programAddress,
    data: getInitializeProductInstructionDataEncoder().encode(
      args as InitializeProductInstructionDataArgs
    ),
  } as InitializeProductInstruction<
    TProgramAddress,
    TAccountProductAccount,
    TAccountOwner,
    TAccountSystemProgram
  >;

  return instruction;
}

export type InitializeProductInput<
  TAccountProductAccount extends string = string,
  TAccountOwner extends string = string,
  TAccountSystemProgram extends string = string,
> = {
  productAccount: Address<TAccountProductAccount>;
  owner: TransactionSigner<TAccountOwner>;
  systemProgram?: Address<TAccountSystemProgram>;
  serialNumber: InitializeProductInstructionDataArgs['serialNumber'];
  description: InitializeProductInstructionDataArgs['description'];
  stages: InitializeProductInstructionDataArgs['stages'];
};

export function getInitializeProductInstruction<
  TAccountProductAccount extends string,
  TAccountOwner extends string,
  TAccountSystemProgram extends string,
  TProgramAddress extends Address = typeof SUPPLY_CHAIN_PROGRAM_PROGRAM_ADDRESS,
>(
  input: InitializeProductInput<
    TAccountProductAccount,
    TAccountOwner,
    TAccountSystemProgram
  >,
  config?: { programAddress?: TProgramAddress }
): InitializeProductInstruction<
  TProgramAddress,
  TAccountProductAccount,
  TAccountOwner,
  TAccountSystemProgram
> {
  // Program address.
  const programAddress =
    config?.programAddress ?? SUPPLY_CHAIN_PROGRAM_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    productAccount: { value: input.productAccount ?? null, isWritable: true },
    owner: { value: input.owner ?? null, isWritable: true },
    systemProgram: { value: input.systemProgram ?? null, isWritable: false },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  // Original args.
  const args = { ...input };

  // Resolve default values.
  if (!accounts.systemProgram.value) {
    accounts.systemProgram.value =
      '11111111111111111111111111111111' as Address<'11111111111111111111111111111111'>;
  }

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.productAccount),
      getAccountMeta(accounts.owner),
      getAccountMeta(accounts.systemProgram),
    ],
    programAddress,
    data: getInitializeProductInstructionDataEncoder().encode(
      args as InitializeProductInstructionDataArgs
    ),
  } as InitializeProductInstruction<
    TProgramAddress,
    TAccountProductAccount,
    TAccountOwner,
    TAccountSystemProgram
  >;

  return instruction;
}

export type ParsedInitializeProductInstruction<
  TProgram extends string = typeof SUPPLY_CHAIN_PROGRAM_PROGRAM_ADDRESS,
  TAccountMetas extends readonly AccountMeta[] = readonly AccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    productAccount: TAccountMetas[0];
    owner: TAccountMetas[1];
    systemProgram: TAccountMetas[2];
  };
  data: InitializeProductInstructionData;
};

export function parseInitializeProductInstruction<
  TProgram extends string,
  TAccountMetas extends readonly AccountMeta[],
>(
  instruction: Instruction<TProgram> &
    InstructionWithAccounts<TAccountMetas> &
    InstructionWithData<ReadonlyUint8Array>
): ParsedInitializeProductInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 3) {
    // TODO: Coded error.
    throw new Error('Not enough accounts');
  }
  let accountIndex = 0;
  const getNextAccount = () => {
    const accountMeta = instruction.accounts![accountIndex]!;
    accountIndex += 1;
    return accountMeta;
  };
  return {
    programAddress: instruction.programAddress,
    accounts: {
      productAccount: getNextAccount(),
      owner: getNextAccount(),
      systemProgram: getNextAccount(),
    },
    data: getInitializeProductInstructionDataDecoder().decode(instruction.data),
  };
}
