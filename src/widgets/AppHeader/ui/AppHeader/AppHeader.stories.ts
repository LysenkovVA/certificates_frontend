import type { Meta, StoryObj } from "@storybook/react";

import { StateSchema } from "@/app/providers/StoreProvider";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator";
import { AppHeader } from "./AppHeader";

const meta = {
    title: "widgets/AppHeader",
    component: AppHeader,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof AppHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

const initialState: DeepPartial<StateSchema> = {
    user: {
        authenticatedUser: {
            id: "1",
            email: "sb@mail.ru",
            token: "TOKEN",
            avatar: "",
            birthDate: new Date().toDateString(),
            surname: "Ivanov",
            name: "Ivan",
            patronymic: "Ivanovich",
        },
    },
};

export const Primary: Story = {
    args: {},
    decorators: [(S) => StoreDecorator(initialState as StateSchema, S)],
};
