import type { Meta, StoryObj } from "@storybook/react";
import { EmployeeDetailsPage } from "../../index";

const meta = {
    title: "pages/EmployeeDetailsPage",
    component: EmployeeDetailsPage,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof EmployeeDetailsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
