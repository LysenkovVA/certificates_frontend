import type { Meta, StoryObj } from "@storybook/react";
import { EmployeesList } from "./EmployeesList";

const meta = {
    title: ".../EmployeesList",
    component: EmployeesList,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof EmployeesList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
