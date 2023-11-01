import type { Meta, StoryObj } from "@storybook/react";

import { AppSideMenu } from "./AppSideMenu";

const meta = {
    title: "widgets/AppSideMenu",
    component: AppSideMenu,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof AppSideMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};

export const Collapsed: Story = {
    args: { collapsed: true },
};
