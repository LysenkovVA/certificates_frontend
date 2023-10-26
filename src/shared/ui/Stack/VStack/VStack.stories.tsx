import type { Meta, StoryObj } from "@storybook/react";

import { Text } from "@/shared/ui/Text";
import { Fragment } from "react";
import { VStack } from "../index";

const meta = {
    title: "shared/VStack",
    component: VStack,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof VStack>;

export default meta;
type Story = StoryObj<typeof meta>;

const children = (
    <Fragment>
        <Text title={"Element 1"} text={"Text text text"} />
        <Text title={"Element 2"} text={"Text text text"} />
        <Text title={"Element 3"} text={"Text text text"} />
    </Fragment>
);

export const Primary: Story = {
    args: {
        children,
    },
};
