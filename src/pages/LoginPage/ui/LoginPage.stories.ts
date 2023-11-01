import type { Meta, StoryObj } from "@storybook/react";

import { LoginPage } from "../index";

const meta = {
    title: "pages/LoginPage",
    component: LoginPage,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof LoginPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
