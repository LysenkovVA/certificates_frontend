import type { Meta, StoryObj } from "@storybook/react";

import { SignUp } from "../index";

const meta = {
    title: "features/signUp/SignUp",
    component: SignUp,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof SignUp>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
