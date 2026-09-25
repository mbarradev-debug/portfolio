import { Heading, type HeadingProps } from "@chakra-ui/react";

/** Underlined h2 used by every section, as in craftz.dog. */
export function SectionHeading(props: HeadingProps) {
  return (
    <Heading
      as="h2"
      mt="12px"
      mb="16px"
      fontFamily="heading"
      fontWeight="700"
      fontSize="20px"
      lineHeight="1.4"
      textDecoration="underline"
      textUnderlineOffset="6px"
      textDecorationColor="headingRule"
      textDecorationThickness="4px"
      {...props}
    />
  );
}
