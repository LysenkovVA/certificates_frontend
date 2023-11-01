import type { Meta, StoryObj } from "@storybook/react";

import { AppHeader } from "./AppHeader";

const meta = {
    title: "widgets/AppHeader",
    component: AppHeader,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof AppHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
