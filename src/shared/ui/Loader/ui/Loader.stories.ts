import type { Meta, StoryObj } from "@storybook/react";

import { Loader } from "../index";

const meta = {
    title: "shared/Loader",
    component: Loader,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof Loader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
