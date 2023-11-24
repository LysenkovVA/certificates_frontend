import type { Meta, StoryObj } from "@storybook/react";
import { InspectionCard } from "./InspectionCard";

const meta = {
    title: "entities/InspectionCard",
    component: InspectionCard,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof InspectionCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
