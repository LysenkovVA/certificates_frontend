import type { Meta, StoryObj } from "@storybook/react";

import { EmployeesPage } from "../index";

const meta = {
    title: "pages/EmployeesPage",
    component: EmployeesPage,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof EmployeesPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
