import type { Meta, StoryObj } from "@storybook/react";
import { OrganizationsList } from "./OrganizationsList";

const meta = {
    title: ".../OrganizationsList",
    component: OrganizationsList,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof OrganizationsList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
