import type { Meta, StoryObj } from "@storybook/react";

import { SignUpPage } from "../index";

const meta = {
    title: "pages/SignUpPage",
    component: SignUpPage,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof SignUpPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
