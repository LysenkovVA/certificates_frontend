import type { Meta, StoryObj } from "@storybook/react";
import { InspectionsInfiniteList } from "./InspectionsInfiniteList";

const meta = {
    title: "features/Inspections/InspectionsInfiniteList",
    component: InspectionsInfiniteList,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof InspectionsInfiniteList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
