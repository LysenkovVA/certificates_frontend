import type { Meta, StoryObj } from "@storybook/react";
import { DepartmentsList } from "./DepartmentsList";

const meta = {
    title: "features/Departments/DepartmentsList",
    component: DepartmentsList,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof DepartmentsList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
