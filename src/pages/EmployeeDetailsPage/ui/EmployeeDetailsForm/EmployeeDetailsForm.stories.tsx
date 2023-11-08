import type { Meta, StoryObj } from "@storybook/react";
import { EmployeeDetailsForm } from "./EmployeeDetailsForm";

const meta = {
    title: "pages/EmployeeDetailsPage/EmployeeDetailsForm",
    component: EmployeeDetailsForm,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof EmployeeDetailsForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
