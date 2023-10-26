import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../index";

const meta = {
    title: "shared/Button",
    component: Button,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: { children: "Press me", variant: "outline", colorStyle: "base" },
};
