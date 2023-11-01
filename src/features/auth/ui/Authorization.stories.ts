import type { Meta, StoryObj } from "@storybook/react";

import { Authorization } from "../index";

const meta = {
    title: "features/auth/Authorization",
    component: Authorization,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof Authorization>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
