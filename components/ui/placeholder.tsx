import { Flex, type FlexProps } from "@chakra-ui/react";

/**
 * Dashed box that marks content still missing (screenshots).
 * Every usage is listed in the README.
 */
export function Placeholder({ label, ...rest }: FlexProps & { label: string }) {
  return (
    <Flex
      role="img"
      aria-label={label}
      w="100%"
      borderRadius="12px"
      bg="glass"
      border="1px dashed"
      borderColor="border"
      align="center"
      justify="center"
      color="fg.muted"
      fontSize="14px"
      textAlign="center"
      px="16px"
      {...rest}
    >
      {label}
    </Flex>
  );
}
