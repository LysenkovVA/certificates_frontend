import type { Meta, StoryObj } from "@storybook/react";

import { PageLoader } from "../index";

const meta = {
    title: "widgets/PageLoader",
    component: PageLoader,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof PageLoader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
