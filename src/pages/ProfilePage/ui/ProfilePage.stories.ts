import type { Meta, StoryObj } from "@storybook/react";

import { ProfilePage } from "../index";

const meta = {
    title: "pages/ProfilePage",
    component: ProfilePage,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof ProfilePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
