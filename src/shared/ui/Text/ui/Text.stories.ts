import type { Meta, StoryObj } from "@storybook/react";

import { Text } from "../index";

const meta = {
    title: "shared/Text",
    component: Text,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        variant: "primary",
        align: "center",
        text: "Sample text",
        title: "Sample title",
    },
};
