import type { Meta, StoryObj } from "@storybook/react";
import { EmployeeDetailsView } from "./EmployeeDetailsView";

const meta = {
    title: "pages/EmployeeDetailsPage/EmployeeDetailsView",
    component: EmployeeDetailsView,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof EmployeeDetailsView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
