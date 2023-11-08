import type { Meta, StoryObj } from "@storybook/react";
import { ProfileCardView } from "./ProfileCardView";

const meta = {
    title: ".../ProfileCardView",
    component: ProfileCardView,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof ProfileCardView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
