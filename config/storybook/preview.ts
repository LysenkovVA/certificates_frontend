import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema";
import { RouterDecorator } from "@/shared/config/storybook/RouterDecorator/RouterDecorator";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator";
import { StyleDecorator } from "@/shared/config/storybook/StyleDecorator/StyleDecorator";
import type { Preview } from "@storybook/react";

const initialState: DeepPartial<StateSchema> = {
    user: {
        authenticatedUser: {
            id: "1",
            email: "sb@mail.ru",
            token: "TOKEN",
            avatar: "",
            birthDate: new Date(),
            surname: "Ivanov",
            name: "Ivan",
            patronymic: "Ivanovich",
        },
    },
};

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: "^on[A-Z].*" },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
    },
    // Декораторы для всех историй
    decorators: [
        // Стили
        (Story) => StyleDecorator(Story),
        // Стейт
        (Story) => StoreDecorator(Story),
        // Роутер
        (Story) => RouterDecorator(Story),
    ],
};

export default preview;
