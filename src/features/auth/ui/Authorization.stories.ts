import type { Meta, StoryObj } from "@storybook/react";

import { StateSchema } from "@/app/providers/StoreProvider";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator";
import { Authorization } from "../index";

const meta = {
    title: "features/auth/Authorization",
    component: Authorization,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof Authorization>;

export default meta;
type Story = StoryObj<typeof meta>;

const initialState: DeepPartial<StateSchema> = {
    auth: {
        email: "email@email.ru",
        password: "123",
    },
};

export const Primary: Story = {
    args: {},
    decorators: [(S) => StoreDecorator(initialState as StateSchema, S)],
};

const initialStateIsLoading: DeepPartial<StateSchema> = {
    auth: {
        email: "email@email.ru",
        password: "123",
        isLoading: true,
    },
};

export const IsLoading: Story = {
    args: {},
    decorators: [
        (S) => StoreDecorator(initialStateIsLoading as StateSchema, S),
    ],
};

const initialStateError: DeepPartial<StateSchema> = {
    auth: {
        email: "email@email.ru",
        password: "123",
        error: "Произошла ошибка!",
    },
};

export const Error: Story = {
    args: {},
    decorators: [(S) => StoreDecorator(initialStateError as StateSchema, S)],
};
