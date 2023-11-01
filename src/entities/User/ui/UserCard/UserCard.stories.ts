import type { Meta, StoryObj } from "@storybook/react";

import { UserCard } from "./UserCard";

const meta = {
    title: "entities/User/UserCard",
    component: UserCard,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof UserCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
