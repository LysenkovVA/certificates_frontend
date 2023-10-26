import type { Meta, StoryObj } from "@storybook/react";

import { TextBox } from "../index";

const meta = {
    title: "shared/TextBox",
    component: TextBox,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof TextBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        label: "Login",
        value: "user@mail.ru",
    },
};
