import type { Meta, StoryObj } from "@storybook/react";

import { Text } from "../index";

const meta = {
    title: "shared/Text",
    component: Text,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        colorStyle: "base",
        align: "center",
        text: "Текст статьи, которая описывает тренды в области ОТ и ТБ",
        title: "Новое в охране труда",
    },
};
