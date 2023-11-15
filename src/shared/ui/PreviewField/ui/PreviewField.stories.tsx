import type { Meta, StoryObj } from "@storybook/react";
import { PreviewField } from "./PreviewField";

const meta = {
    title: ".../PreviewField",
    component: PreviewField,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof PreviewField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
