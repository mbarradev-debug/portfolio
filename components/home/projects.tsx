import { Flex, LinkBox, LinkOverlay, SimpleGrid, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatusBadge } from "@/components/ui/status-badge";
import { projects, type ProjectCard } from "@/lib/content";
import { ExtensionThumbnail, PulsoThumbnail } from "./project-thumbnails";

const thumbnails = {
  pulso: PulsoThumbnail,
  "pulso-extension": ExtensionThumbnail,
} satisfies Record<ProjectCard["slug"], () => React.JSX.Element>;

function Card({ project }: { project: ProjectCard }) {
  const Thumbnail = thumbnails[project.slug];
  const title = (
    <Text as="span" fontFamily="heading" fontWeight="700" fontSize="20px">
      {project.title}
    </Text>
  );

  return (
    <LinkBox
      as="article"
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap="8px"
      color="fg"
      borderRadius="12px"
      _focusWithin={{ outline: "2px solid", outlineColor: "link", outlineOffset: "4px" }}
    >
      <Thumbnail />
      <Flex align="center" gap="8px" mt="4px" wrap="wrap" justify="center">
        {project.href ? (
          <LinkOverlay asChild _focusVisible={{ outline: "none" }}>
            <NextLink href={project.href}>{title}</NextLink>
          </LinkOverlay>
        ) : (
          title
        )}
        <StatusBadge>{project.status}</StatusBadge>
      </Flex>
      <Text as="span" fontSize="14px" textAlign="center" lineHeight="1.5">
        {project.description}
      </Text>
    </LinkBox>
  );
}

export function Projects({ delay }: { delay: number }) {
  return (
    <Section delay={delay} id={projects.id} mt="40px">
      <SectionHeading>{projects.heading}</SectionHeading>
      <SimpleGrid columns={{ base: 1, sm: 2 }} gap="24px">
        {projects.items.map((project) => (
          <Card key={project.slug} project={project} />
        ))}
      </SimpleGrid>
    </Section>
  );
}
