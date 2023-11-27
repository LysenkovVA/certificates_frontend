import type { Meta, StoryObj } from "@storybook/react";
import { OrganizationCard } from "./OrganizationCard";

const meta = {
    title: "entities/Organization/OrganizationCard",
    component: OrganizationCard,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof OrganizationCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: { organization: { id: "1", name: "Рога и копыта" } },
};
