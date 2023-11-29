import type { Meta, StoryObj } from "@storybook/react";
import { InspectionsList } from "./InspectionsList";

const meta = {
    title: "features/Inspections/InspectionsList",
    component: InspectionsList,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof InspectionsList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
