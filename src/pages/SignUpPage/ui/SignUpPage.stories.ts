import type { Meta, StoryObj } from "@storybook/react";

import { StateSchema } from "@/app/providers/StoreProvider";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator";
import { SignUpPage } from "../index";

const meta = {
    title: "pages/SignUpPage",
    component: SignUpPage,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof SignUpPage>;

export default meta;
type Story = StoryObj<typeof meta>;

const initialState: DeepPartial<StateSchema> = {
    signUp: {
        email: "email@email.ru",
        password: "123",
        repeatedPassword: "123",
    },
};

export const Primary: Story = {
    args: {},
    decorators: [(S) => StoreDecorator(initialState as StateSchema, S)],
};

const initialStateIsLoading: DeepPartial<StateSchema> = {
    signUp: {
        email: "email@email.ru",
        password: "123",
        repeatedPassword: "123",
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
    signUp: {
        email: "email@email.ru",
        password: "123",
        repeatedPassword: "1234",
        error: "Пароли не совпадают!",
    },
};

export const Error: Story = {
    args: {},
    decorators: [(S) => StoreDecorator(initialStateError as StateSchema, S)],
};

const initialStateSuccessRegistration: DeepPartial<StateSchema> = {
    signUp: {
        email: "email@email.ru",
        password: "123",
        repeatedPassword: "123",
    },
    user: {
        registeredUserId: "1",
    },
};

export const SuccessRegistration: Story = {
    args: {},
    decorators: [
        (S) =>
            StoreDecorator(initialStateSuccessRegistration as StateSchema, S),
    ],
};
